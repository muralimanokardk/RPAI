import datetime
import uuid
from sqlalchemy import Column, String, Integer, DateTime, Boolean, ForeignKey, JSON, Float, Text
from sqlalchemy.orm import relationship
from app.core.db import Base

def generate_uuid():
    return str(uuid.uuid4())

class User(Base):
    __tablename__ = "users"

    id = Column(String, primary_key=True, default=generate_uuid)
    email = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=True)
    auth_provider = Column(String, default="email")  # email, google, apple
    name = Column(String, nullable=False)
    plan_tier = Column(String, default="standard")  # student, standard
    is_verified = Column(Boolean, default=False)
    password_reset_token = Column(String, nullable=True)
    reset_token_expires = Column(DateTime, nullable=True)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

    student_verifications = relationship("StudentVerification", back_populates="user", cascade="all, delete-orphan")
    subscriptions = relationship("Subscription", back_populates="user", cascade="all, delete-orphan")
    papers = relationship("Paper", back_populates="user", cascade="all, delete-orphan")

class StudentVerification(Base):
    __tablename__ = "student_verifications"

    id = Column(String, primary_key=True, default=generate_uuid)
    user_id = Column(String, ForeignKey("users.id"), nullable=False)
    id_card_url = Column(String, nullable=False)
    ocr_extracted_json = Column(JSON, nullable=True)
    status = Column(String, default="pending")  # pending, approved, rejected
    confidence_score = Column(Float, default=0.0)
    reviewer_notes = Column(Text, nullable=True)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

    user = relationship("User", back_populates="student_verifications")

class Subscription(Base):
    __tablename__ = "subscriptions"

    id = Column(String, primary_key=True, default=generate_uuid)
    user_id = Column(String, ForeignKey("users.id"), nullable=False)
    razorpay_subscription_id = Column(String, nullable=True)
    plan = Column(String, default="standard_plan")
    status = Column(String, default="active")  # active, cancelled, expired
    current_period_end = Column(DateTime, nullable=True)
    generations_used = Column(Integer, default=0)
    generations_included = Column(Integer, default=3)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

    user = relationship("User", back_populates="subscriptions")

class Paper(Base):
    __tablename__ = "papers"

    id = Column(String, primary_key=True, default=generate_uuid)
    user_id = Column(String, ForeignKey("users.id"), nullable=False)
    topic = Column(Text, nullable=False)
    input_mode = Column(String, default="text")  # text, voice, scan
    target_format = Column(String, default="IEEE")  # IEEE, Generic SCI
    journal_template = Column(String, default="IEEE")  # IEEE, Springer, Elsevier
    citation_style = Column(String, default="IEEE")  # IEEE, APA, MLA, Chicago
    status = Column(String, default="queued")  # queued, processing, completed, failed
    structured_content_json = Column(JSON, nullable=True)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

    user = relationship("User", back_populates="papers")
    citations = relationship("Citation", back_populates="paper", cascade="all, delete-orphan")
    reports = relationship("Report", back_populates="paper", cascade="all, delete-orphan")
    documents = relationship("Document", back_populates="paper", cascade="all, delete-orphan")

class Citation(Base):
    __tablename__ = "citations"

    id = Column(String, primary_key=True, default=generate_uuid)
    paper_id = Column(String, ForeignKey("papers.id"), nullable=False)
    doi = Column(String, nullable=True)
    title = Column(Text, nullable=False)
    authors = Column(Text, nullable=True)
    year = Column(Integer, nullable=True)
    source_api = Column(String, default="CrossRef")  # CrossRef, SemanticScholar
    verified_bool = Column(Boolean, default=True)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

    paper = relationship("Paper", back_populates="citations")

class Report(Base):
    __tablename__ = "reports"

    id = Column(String, primary_key=True, default=generate_uuid)
    paper_id = Column(String, ForeignKey("papers.id"), nullable=False)
    report_type = Column(String, nullable=False)  # plagiarism, ai_detection
    provider = Column(String, default="IntegrityEngine")
    score = Column(Float, default=0.0)
    raw_report_json = Column(JSON, nullable=True)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

    paper = relationship("Paper", back_populates="reports")

class Document(Base):
    __tablename__ = "documents"

    id = Column(String, primary_key=True, default=generate_uuid)
    paper_id = Column(String, ForeignKey("papers.id"), nullable=False)
    document_type = Column(String, nullable=False)  # original, plagiarism_report, ai_detection_report, rewrite, formatted
    file_format = Column(String, default="docx")  # docx, pdf
    file_url = Column(String, nullable=False)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

    paper = relationship("Paper", back_populates="documents")
