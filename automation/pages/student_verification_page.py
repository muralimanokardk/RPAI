from selenium.webdriver.common.by import By
from automation.pages.base_page import BasePage

class StudentVerificationPage(BasePage):
    """Page Object for Student Verification Page ('/onboarding/student-verification')"""

    EDU_EMAIL_INPUT = (By.XPATH, "//input[@type='email']")
    FILE_UPLOAD_INPUT = (By.XPATH, "//input[@type='file']")
    SUBMIT_VERIFICATION_BTN = (By.XPATH, "//button[contains(text(), 'Verify') or contains(text(), 'Submit')]")

    def open_verification(self):
        self.open("/onboarding/student-verification")
