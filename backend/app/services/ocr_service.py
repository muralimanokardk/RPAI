import re
import random
from typing import Dict, Any

class OCRService:
    @staticmethod
    def process_student_id_card(image_bytes: bytes, filename: str) -> Dict[str, Any]:
        """
        Processes uploaded Student ID card.
        Extracts student name, institution name, student ID number, and confidence score.
        If confidence < 0.85, status is flagged as 'pending' for manual review.
        """
        # Simulated OCR text extraction (or PIL image parsing)
        # In production, pytesseract / Cloud Vision OCR reads image_bytes
        filename_lower = filename.lower()
        
        # Default mock extraction defaults for demo/testing
        extracted_name = "Julian Vance"
        extracted_institution = "Stanford University"
        extracted_id = "SU-8942019"
        expiry_date = "June 2026"
        confidence = 0.92

        if "low" in filename_lower or "blur" in filename_lower:
            confidence = 0.55
            extracted_institution = "Unclear Academy (Low Resolution)"

        status = "approved" if confidence >= 0.85 else "pending"

        return {
            "extracted_data": {
                "student_name": extracted_name,
                "institution": extracted_institution,
                "student_id": extracted_id,
                "expiry_date": expiry_date
            },
            "confidence_score": round(confidence, 2),
            "status": status,
            "requires_manual_review": confidence < 0.85,
            "reviewer_notes": "Automated OCR scan completed. High confidence." if confidence >= 0.85 else "Low image clarity. Flagged for administrator manual review."
        }

    @staticmethod
    def process_scanned_title(image_bytes: bytes) -> str:
        """
        Processes scanned handwritten or printed paper title image into clean text transcript.
        """
        # Simulates converting scanned topic image to text string
        return "Empirical Study of Quantum Error Correction Algorithms in Distributed Systems"

ocr_service = OCRService()
