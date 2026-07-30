from selenium.webdriver.common.by import By
from automation.pages.base_page import BasePage

class ForgotPasswordPage(BasePage):
    """Page Object for Forgot Password Page ('/forgot-password')"""

    EMAIL_INPUT = (By.XPATH, "//input[@type='email']")
    SUBMIT_BTN = (By.XPATH, "//button[@type='submit']")
    SUCCESS_MSG = (By.XPATH, "//*[contains(text(), 'Reset link sent') or contains(text(), 'check your email')]")
    BACK_TO_LOGIN = (By.XPATH, "//a[contains(@href, '/login')]")

    def open_forgot_password(self):
        self.open("/forgot-password")

    def send_reset_link(self, email: str):
        self.send_keys(*self.EMAIL_INPUT, email)
        self.click(*self.SUBMIT_BTN)
