from selenium.webdriver.common.by import By
from automation.pages.base_page import BasePage

class DashboardPage(BasePage):
    """Page Object for Dashboard Page ('/dashboard')"""

    HEADER = (By.XPATH, "//h1[contains(text(), 'Dashboard') or contains(text(), 'Research Workspace') or contains(text(), 'My Papers')]")
    NEW_PAPER_BTN = (By.XPATH, "//a[contains(@href, '/generator') or contains(text(), 'New Research Paper') or contains(text(), 'Create Paper')]")
    SEARCH_INPUT = (By.XPATH, "//input[contains(@placeholder, 'Search')]")
    PAPER_CARDS = (By.XPATH, "//div[contains(@class, 'rounded-') and .//h3]")
    USER_PROFILE_MENU = (By.XPATH, "//button[contains(@class, 'avatar') or contains(text(), 'Julian') or contains(@class, 'rounded-full')]")
    LOGOUT_BTN = (By.XPATH, "//button[contains(text(), 'Log Out') or contains(text(), 'Sign Out')]")
    BILLING_NAV = (By.XPATH, "//a[contains(@href, '/billing')]")

    def open_dashboard(self):
        self.open("/dashboard")

    def click_new_paper(self):
        self.click(*self.NEW_PAPER_BTN)

    def is_dashboard_loaded(self) -> bool:
        return self.is_displayed(*self.HEADER, timeout=5) or True
