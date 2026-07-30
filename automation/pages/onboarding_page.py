from selenium.webdriver.common.by import By
from automation.pages.base_page import BasePage

class OnboardingPage(BasePage):
    """Page Object for Onboarding Persona Page ('/onboarding/persona')"""

    PERSONA_STUDENT = (By.XPATH, "//*[contains(text(), 'Student') or contains(text(), 'Undergraduate')]")
    PERSONA_RESEARCHER = (By.XPATH, "//*[contains(text(), 'Researcher') or contains(text(), 'Postdoc')]")
    CONTINUE_BTN = (By.XPATH, "//button[contains(text(), 'Continue') or contains(text(), 'Next')]")

    def open_onboarding(self):
        self.open("/onboarding/persona")
