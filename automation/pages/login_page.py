from selenium.webdriver.common.by import By
from automation.pages.base_page import BasePage

class LoginPage(BasePage):
    """Page Object for Login Page ('/login')"""

    EMAIL_INPUT = (By.XPATH, "//input[@type='email']")
    PASSWORD_INPUT = (By.XPATH, "//input[@type='password' or @type='text']")
    LOGIN_SUBMIT_BTN = (By.XPATH, "//button[@type='submit']")
    GOOGLE_BTN = (By.XPATH, "//button[contains(text(), 'Google')]")
    APPLE_BTN = (By.XPATH, "//button[contains(text(), 'Apple')]")
    SHOW_PASSWORD_TOGGLE = (By.XPATH, "//button[contains(@class, 'text-slate-400')]")
    FORGOT_PASSWORD_LINK = (By.XPATH, "//a[contains(@href, '/forgot-password')]")
    SIGNUP_LINK = (By.XPATH, "//a[contains(@href, '/signup')]")
    ERROR_ALERT = (By.XPATH, "//div[contains(@class, 'bg-red-50') or contains(@class, 'text-red')]")

    def open_login(self):
        self.open("/login")

    def login_with_credentials(self, email: str, password: str):
        if self.is_displayed(*self.EMAIL_INPUT, timeout=3):
            self.send_keys(*self.EMAIL_INPUT, email)
        if self.is_displayed(*self.PASSWORD_INPUT, timeout=3):
            self.send_keys(*self.PASSWORD_INPUT, password)
        if self.is_displayed(*self.LOGIN_SUBMIT_BTN, timeout=3):
            self.click(*self.LOGIN_SUBMIT_BTN)

    def click_google_login(self):
        self.click(*self.GOOGLE_BTN)

    def get_error_message(self) -> str:
        if self.is_displayed(*self.ERROR_ALERT, timeout=3):
            return self.get_text(*self.ERROR_ALERT)
        return ""
