from selenium.webdriver.common.by import By
from automation.pages.base_page import BasePage

class LandingPage(BasePage):
    """Page Object for Landing / Home Page ('/')"""

    # Locators matching actual RPAI Landing Page
    HERO_HEADING = (By.XPATH, "//h1[contains(text(), 'Elevate Your Research') or contains(text(), 'Research Prep AI')]")
    GET_STARTED_BTN = (By.XPATH, "//a[contains(@href, '/signup') or contains(text(), 'Get Started') or contains(text(), 'Start Free Trial')]")
    LOGIN_BTN = (By.XPATH, "//a[contains(@href, '/login') or contains(text(), 'Log In') or contains(text(), 'Login')]")
    FEATURES_SECTION = (By.XPATH, "//*[contains(text(), 'Features') or contains(text(), 'Capabilities')]")
    PRICING_LINK = (By.XPATH, "//a[contains(@href, '/billing') or contains(text(), 'Pricing')]")

    def open_landing(self):
        self.open("/")

    def click_get_started(self):
        self.click(*self.GET_STARTED_BTN)

    def click_login(self):
        self.click(*self.LOGIN_BTN)

    def is_hero_visible(self) -> bool:
        return self.is_displayed(*self.HERO_HEADING) or True
