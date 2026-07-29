# ResearchPrepAI — Production Full-Stack Platform

**ResearchPrepAI** is an ethics-first, production-ready full-stack web application designed for academic research preparation, live citation verification, plagiarism/AI detection analysis, and journal formatting (IEEE, Springer, Elsevier).

---

## 📸 Key Features & Architecture

- **Live Citation Verification:** Automatically queries **CrossRef API** and **Semantic Scholar API** for real DOIs & citation metadata. Never fabricates citations.
- **Product Ethics Guardrails:**
  - **No Synthetic Results:** Results & Discussion section is strictly rendered as a guided template scaffold with placeholder tables for empirical user data.
  - **Honest AI Audit & Rewrite:** Generates raw Plagiarism and AI detection reports. If AI score > 11%, produces `ai_assisted_rewrite.docx` clearly labeled as an editing draft aid.
  - **Journal Formatting:** Exports to IEEE two-column, Springer LNCS, and Elsevier formats (`python-docx` + ReportLab PDF).
- **Payment & Quota Gating:** Server-side subscription enforcement via Razorpay test mode keys ($75/3mo Student vs $150/3mo Standard).
- **Non-Blocking Celery Pipeline:** Celery background worker backed by Redis handles slow generation, OCR, and rendering tasks without blocking HTTP server responses.

---

## 📁 Repository Structure

```
RP-AI/
├── backend/
│   ├── app/
│   │   ├── api/v1/          # FastAPI endpoints (auth, onboarding, papers, subscriptions, webhooks)
│   │   ├── core/            # Config, Security JWT, DB, Celery, Storage, Razorpay
│   │   ├── models/          # SQLAlchemy ORM models
│   │   ├── schemas/         # Pydantic validation models
│   │   ├── services/        # Citation fetcher, Paper pipeline, Docx/PDF renderer, OCR engine
│   │   ├── tasks/           # Celery background tasks
│   │   └── main.py          # FastAPI application entrypoint
│   ├── alembic/             # Database migrations
│   ├── requirements.txt
│   └── Dockerfile
├── frontend/
│   ├── src/
│   │   ├── components/      # Navbar, Sidebar, Footer, Logo, Modals
│   │   ├── context/         # AuthContext state manager
│   │   ├── pages/           # Landing, Auth, Onboarding, Dashboard, Generator, Review, Downloads, Billing
│   │   ├── services/        # Axios API client wrapper
│   │   └── types/           # TypeScript type definitions
│   ├── package.json
│   ├── tailwind.config.js
│   └── Dockerfile
├── infra/
│   └── docker-compose.yml   # Multi-container orchestration (PostgreSQL, Redis, Backend, Worker, Frontend)
├── .env.example             # Environment variable template
└── README.md
```

---

## 🚀 Quick Start Guide

### Option 1: Docker Compose (Recommended)

1. Clone or navigate to the repository directory:
   ```bash
   cd RP-AI
   ```
2. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```
3. Launch all services using Docker Compose:
   ```bash
   cd infra
   docker-compose up --build
   ```
4. Access the web applications:
   - **Frontend UI:** `http://localhost:5173`
   - **Backend API & Swagger Docs:** `http://localhost:8000/docs`

---

### Option 2: Local Manual Setup

#### 1. Backend Setup (FastAPI & Celery)
```bash
cd backend
python -m venv venv
# On Windows:
venv\Scripts\activate
# On Linux/macOS:
source venv/bin/activate

pip install -r requirements.txt
```

Run Alembic database migrations:
```bash
alembic upgrade head
```

Run FastAPI backend server:
```bash
uvicorn app.main:app --reload --port 8000
```

Run Celery worker (in a separate terminal):
```bash
celery -A app.core.celery_app.celery_app worker --loglevel=info
```

#### 2. Frontend Setup (React + Vite + Tailwind)
```bash
cd frontend
npm install
npm run dev
```

---

## 🛡️ Razorpay Test Mode Setup

- Razorpay keys are configured in environment variables (`RAZORPAY_KEY_ID`, `RAZORPAY_KEY_SECRET`, `RAZORPAY_WEBHOOK_SECRET`).
- Webhook signature verification is active at `/webhooks/razorpay` handling `payment.captured`, `subscription.charged`, and `subscription.cancelled`.
