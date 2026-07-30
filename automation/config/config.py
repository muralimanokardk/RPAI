import os
from pathlib import Path

# Base Paths
BASE_DIR = Path(__file__).resolve().parent.parent
REPO_ROOT = BASE_DIR.parent
REPORTS_DIR = BASE_DIR / "reports"
SCREENSHOTS_DIR = BASE_DIR / "screenshots"
LOGS_DIR = BASE_DIR / "logs"
DATA_DIR = BASE_DIR / "data"
RESULTS_LATEST_DIR = REPO_ROOT / "test-results" / "latest"

# Ensure directories exist
for directory in [REPORTS_DIR, SCREENSHOTS_DIR, LOGS_DIR, DATA_DIR, RESULTS_LATEST_DIR]:
    directory.mkdir(parents=True, exist_ok=True)

# Application & Environment Settings
BASE_URL = os.getenv("BASE_URL", "https://muralimanokardk.github.io/RPAI/").rstrip("/")
BROWSER = os.getenv("BROWSER", "chrome").lower()
HEADLESS = os.getenv("HEADLESS", "true").lower() == "true"
DEFAULT_TIMEOUT = int(os.getenv("DEFAULT_TIMEOUT", "10"))
MAX_RETRIES = int(os.getenv("MAX_RETRIES", "2"))

# Credentials for Test Accounts
TEST_USER_EMAIL = os.getenv("TEST_USER_EMAIL", "julian@university.edu")
TEST_USER_PASSWORD = os.getenv("TEST_USER_PASSWORD", "password123")
TEST_USER_NAME = os.getenv("TEST_USER_NAME", "Julian Vance")

# Critical Failure Threshold (e.g. 5% max allowed failures for Critical priority tests)
CRITICAL_FAILURE_THRESHOLD = float(os.getenv("CRITICAL_FAILURE_THRESHOLD", "0.05"))
