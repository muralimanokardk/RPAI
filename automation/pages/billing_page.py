from selenium.webdriver.common.by import By
from automation.pages.base_page import BasePage

class BillingPage(BasePage):
    """Page Object for Billing Page ('/billing')"""

    HEADER = (By.XPATH, "//h1[contains(text(), 'Plans & Billing') or contains(text(), 'Subscription')]")
    SCHOLAR_PLAN_BTN = (By.XPATH, "//button[contains(text(), 'Upgrade') or contains(text(), 'Get Scholar')]")
    INSTITUTION_PLAN_BTN = (By.XPATH, "//button[contains(text(), 'Contact Sales') or contains(text(), 'Enterprise')]")

    def open_billing(self):
        self.open("/billing")
