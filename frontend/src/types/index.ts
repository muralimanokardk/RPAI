export interface User {
  id: string;
  email: string;
  name: string;
  auth_provider: string;
  plan_tier: 'student' | 'standard';
  is_verified: boolean;
  created_at: string;
}

export interface StudentVerification {
  id: string;
  user_id: string;
  id_card_url: string;
  ocr_extracted_json?: {
    student_name?: string;
    institution?: string;
    student_id?: string;
    expiry_date?: string;
  };
  status: 'pending' | 'approved' | 'rejected';
  confidence_score: number;
  reviewer_notes?: string;
  created_at: string;
}

export interface Subscription {
  id: string;
  plan: string;
  status: 'active' | 'cancelled' | 'expired';
  generations_used: number;
  generations_included: number;
  current_period_end?: string;
}

export interface Citation {
  id: string;
  doi?: string;
  title: string;
  authors?: string;
  year?: number;
  source_api: string;
  verified_bool: boolean;
}

export interface Report {
  id: string;
  report_type: 'plagiarism' | 'ai_detection';
  provider: string;
  score: number;
  raw_report_json?: any;
}

export interface Document {
  id: string;
  document_type: 'original' | 'plagiarism_report' | 'ai_detection_report' | 'rewrite' | 'formatted';
  file_format: 'docx' | 'pdf';
  file_url: string;
}

export interface Paper {
  id: string;
  topic: string;
  input_mode: 'text' | 'voice' | 'scan';
  target_format: string;
  journal_template: 'IEEE' | 'Springer' | 'Elsevier';
  citation_style: 'IEEE' | 'APA' | 'MLA' | 'Chicago';
  status: 'queued' | 'processing' | 'completed' | 'failed';
  created_at: string;
}

export interface PaperDetail extends Paper {
  structured_content_json?: {
    topic: string;
    abstract: string;
    introduction: string[];
    literature_review: Array<{
      citation_marker: string;
      title: string;
      authors: string;
      year: number;
      doi: string;
      summary: string;
      gap_identified: string;
    }>;
    methodology: any;
    results_and_discussion: any;
    conclusion: string;
    future_scope?: string[];
    references: Array<{
      index: number;
      marker: string;
      formatted_citation: string;
    }>;
  };
  citations: Citation[];
  reports: Report[];
  documents: Document[];
}
