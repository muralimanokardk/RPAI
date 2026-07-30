import asyncio
import logging
from app.core.celery_app import celery_app
from app.core.db import SessionLocal
from app.models.models import Paper, Citation, Report, Document, Subscription, User
from app.services.paper_generator import paper_generator_service
from app.services.integrity_service import integrity_service
from app.services.document_renderer import document_renderer_service

logger = logging.getLogger(__name__)

def run_async(coro):
    """Utility helper to run async function inside synchronous Celery worker task"""
    loop = asyncio.get_event_loop()
    if loop.is_running():
        return asyncio.ensure_future(coro)
    else:
        return loop.run_until_complete(coro)

@celery_app.task(name="tasks.generate_paper_task")
def generate_paper_task(paper_id: str):
    """
    Celery background task to process paper generation pipeline asynchronously without blocking HTTP requests.
    """
    db = SessionLocal()
    try:
        paper = db.query(Paper).filter(Paper.id == paper_id).first()
        if not paper:
            logger.error(f"Paper ID {paper_id} not found.")
            return

        paper.status = "processing"
        db.commit()

        # 1. Async fetch real citations & generate structured paper
        structured_content = run_async(paper_generator_service.generate_paper(
            topic=paper.topic,
            target_format=paper.target_format,
            journal_template=paper.journal_template,
            citation_style=paper.citation_style
        ))

        paper.structured_content_json = structured_content

        # 2. Persist real citations into database
        verified_citations = structured_content.get("verified_citations", [])
        for c in verified_citations:
            citation_rec = Citation(
                paper_id=paper.id,
                doi=c.get("doi"),
                title=c.get("title"),
                authors=c.get("authors"),
                year=c.get("year"),
                source_api=c.get("source_api", "CrossRef"),
                verified_bool=c.get("verified_bool", True)
            )
            db.add(citation_rec)

        # 3. Perform Plagiarism & AI Integrity Check
        integrity_res = integrity_service.analyze_paper_integrity(structured_content)
        
        plag_data = integrity_res["plagiarism"]
        ai_data = integrity_res["ai_detection"]

        plag_report = Report(
            paper_id=paper.id,
            report_type="plagiarism",
            provider=plag_data["provider"],
            score=plag_data["score"],
            raw_report_json=plag_data
        )
        db.add(plag_report)

        ai_report = Report(
            paper_id=paper.id,
            report_type="ai_detection",
            provider=ai_data["provider"],
            score=ai_data["score"],
            raw_report_json=ai_data
        )
        db.add(ai_report)

        # 4. Render All Deliverables
        # Deliverable 1 & 5: original and formatted docx/pdf
        original_docx_url = document_renderer_service.render_docx(structured_content, template_type="Standard")
        original_pdf_url = document_renderer_service.render_pdf(structured_content, title=paper.topic)
        formatted_docx_url = document_renderer_service.render_docx(structured_content, template_type=paper.journal_template)

        db.add(Document(paper_id=paper.id, document_type="original", file_format="docx", file_url=original_docx_url))
        db.add(Document(paper_id=paper.id, document_type="original", file_format="pdf", file_url=original_pdf_url))
        db.add(Document(paper_id=paper.id, document_type="formatted", file_format="docx", file_url=formatted_docx_url))

        # Deliverable 2 & 3: Plagiarism & AI reports PDF
        plag_pdf_url = document_renderer_service.render_report_pdf("plagiarism", plag_data["score"], plag_data)
        ai_pdf_url = document_renderer_service.render_report_pdf("ai_detection", ai_data["score"], ai_data)

        db.add(Document(paper_id=paper.id, document_type="plagiarism_report", file_format="pdf", file_url=plag_pdf_url))
        db.add(Document(paper_id=paper.id, document_type="ai_detection_report", file_format="pdf", file_url=ai_pdf_url))

        # Deliverable 4: AI Assisted Rewrite Drafting Aid
        rewrite_url = document_renderer_service.render_ai_rewrite_docx(structured_content)
        db.add(Document(paper_id=paper.id, document_type="rewrite", file_format="docx", file_url=rewrite_url))

        # Update Subscription Usage
        sub = db.query(Subscription).filter(Subscription.user_id == paper.user_id, Subscription.status == "active").first()
        if sub:
            sub.generations_used += 1

        paper.status = "completed"
        db.commit()
        logger.info(f"Paper generation task completed successfully for paper_id={paper_id}")

    except Exception as e:
        logger.error(f"Error executing paper generation task for paper_id={paper_id}: {e}")
        if paper:
            paper.status = "failed"
            db.commit()
    finally:
        db.close()
