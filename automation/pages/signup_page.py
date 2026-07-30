from selenium.webdriver.common.by import By
from automation.pages.base_page import BasePage

class SignupPage(BasePage):
    """Page Object for Signup Page ('/signup')"""

    NAME_INPUT = (By.XPATH, "//input[@placeholder='Julian Vance' or contains(@placeholder, 'Name')]")
    EMAIL_INPUT = (By.XPATH, "//input[@type='email']")
    PASSWORD_INPUT = (By.XPATH, "(//input[@type='password'])[1]")
    CONFIRM_PASSWORD_INPUT = (By.XPATH, "(//input[@type='password'])[2]")
    AGREE_CHECKBOX = (By.XPATH, "//input[@id='agree' or @type='checkbox']")
    SUBMIT_BTN = (By.XPATH, "//button[@type='submit']")
    GOOGLE_BTN = (By.XPATH, "//button[contains(text(), 'Google')]")
    LOGIN_LINK = (By.XPATH, "//a[contains(@href, '/login')]")
    ERROR_ALERT = (By.XPATH, "//div[contains(@class, 'bg-red-50') or contains(@class, 'text-red')]")

    def open_signup(self):
        self.open("/signup")

    def fill_signup_form(self, name: str, email: str, password: str, confirm_password: str, agree: bool = True):
        self.send_keys(*self.NAME_INPUT, name)
        self.send_keys(*self.EMAIL_INPUT, email)
        self.send_keys(*self.PASSWORD_INPUT, password)
        self.send_keys(*self.CONFIRM_PASSWORD_INPUT, confirm_password)
        checkbox = self.find_element(*self.AGREE_CHECKBOX)
        if checkbox.is_selected() != agree:
            checkbox.click()

    def submit_signup(self):
        self.click(*self.SUBMIT_BTN)

    def get_error_message(self) -> str:
        if self.is_displayed(*self.ERROR_ALERT, timeout=3):
            return self.get_text(*self.ERROR_ALERT)
        return ""
