from selenium.webdriver.common.by import By
from automation.pages.base_page import BasePage

class NewPaperPage(BasePage):
    """Page Object for Paper Generator Page ('/generator')"""

    TOPIC_INPUT = (By.XPATH, "//input[@placeholder or contains(@class, 'input')]")
    PROMPT_TEXTAREA = (By.XPATH, "//textarea")
    GENERATE_BTN = (By.XPATH, "//button[contains(text(), 'Generate') or contains(text(), 'Start Generation')]")
    ACADEMIC_TIER_SELECT = (By.XPATH, "//select[contains(@name, 'tier') or contains(@class, 'select')]")
    CITATION_STYLE_SELECT = (By.XPATH, "//select[contains(@name, 'citation') or contains(@class, 'select')]")

    def open_generator(self):
        self.open("/generator")

    def create_new_paper(self, topic: str, prompt: str = ""):
        if self.is_displayed(*self.TOPIC_INPUT, timeout=3):
            self.send_keys(*self.TOPIC_INPUT, topic)
        if prompt and self.is_displayed(*self.PROMPT_TEXTAREA, timeout=3):
            self.send_keys(*self.PROMPT_TEXTAREA, prompt)
        if self.is_displayed(*self.GENERATE_BTN, timeout=3):
            self.click(*self.GENERATE_BTN)
