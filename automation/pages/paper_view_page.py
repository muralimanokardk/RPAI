from selenium.webdriver.common.by import By
from automation.pages.base_page import BasePage

class PaperViewPage(BasePage):
    """Page Object for Paper View Page ('/papers/:id')"""

    PAPER_TITLE = (By.XPATH, "//h1")
    EXPORT_PDF_BTN = (By.XPATH, "//button[contains(text(), 'Export PDF') or contains(text(), 'PDF')]")
    EXPORT_TEX_BTN = (By.XPATH, "//button[contains(text(), 'Export TeX') or contains(text(), 'LaTeX')]")

    def open_paper(self, paper_id: str = "demo-1"):
        self.open(f"/papers/{paper_id}")
