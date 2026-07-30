from selenium.webdriver.common.by import By
from automation.pages.base_page import BasePage

class DownloadsPage(BasePage):
    """Page Object for Downloads Page ('/downloads/:id')"""

    DOWNLOAD_BUTTONS = (By.XPATH, "//button[contains(text(), 'Download')]")

    def open_downloads(self, paper_id: str = "demo-1"):
        self.open(f"/downloads/{paper_id}")
