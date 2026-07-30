import time
from typing import List, Tuple
from selenium.webdriver.remote.webdriver import WebDriver
from selenium.webdriver.remote.webelement import WebElement
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.by import By
from automation.config.config import BASE_URL, DEFAULT_TIMEOUT
from automation.utils.logger import logger

class BasePage:
    """Base class for all Page Objects providing explicit wait wrappers and helper functions."""

    def __init__(self, driver: WebDriver):
        self.driver = driver
        self.base_url = BASE_URL.rstrip('/')

    def open(self, relative_url: str = "") -> None:
        """Navigates to relative path off BASE_URL."""
        full_url = f"{self.base_url}{relative_url}" if relative_url.startswith('/') or relative_url == "" else f"{self.base_url}/{relative_url}"
        logger.info(f"Navigating to: {full_url}")
        self.driver.get(full_url)

    def get_current_url(self) -> str:
        return self.driver.current_url

    def get_title(self) -> str:
        return self.driver.title

    def find_element(self, by: By, value: str, timeout: int = DEFAULT_TIMEOUT) -> WebElement:
        """Finds an element with explicit wait."""
        return WebDriverWait(self.driver, timeout).until(
            EC.presence_of_element_located((by, value))
        )

    def find_elements(self, by: By, value: str, timeout: int = DEFAULT_TIMEOUT) -> List[WebElement]:
        """Finds all matching elements with explicit wait."""
        try:
            return WebDriverWait(self.driver, timeout).until(
                EC.presence_of_all_elements_located((by, value))
            )
        except Exception:
            return []

    def click(self, by: By, value: str, timeout: int = DEFAULT_TIMEOUT) -> None:
        """Clicks an element after ensuring it's clickable."""
        element = WebDriverWait(self.driver, timeout).until(
            EC.element_to_be_clickable((by, value))
        )
        element.click()

    def send_keys(self, by: By, value: str, text: str, clear_first: bool = True, timeout: int = DEFAULT_TIMEOUT) -> None:
        """Sends text to an element."""
        element = self.find_element(by, value, timeout)
        if clear_first:
            element.clear()
        element.send_keys(text)

    def get_text(self, by: By, value: str, timeout: int = DEFAULT_TIMEOUT) -> str:
        """Gets text of an element."""
        element = self.find_element(by, value, timeout)
        return element.text.strip()

    def is_displayed(self, by: By, value: str, timeout: int = 3) -> bool:
        """Checks if element is displayed within timeout."""
        try:
            return WebDriverWait(self.driver, timeout).until(
                EC.visibility_of_element_located((by, value))
            ).is_displayed()
        except Exception:
            return False

    def scroll_to_element(self, by: By, value: str) -> None:
        """Scrolls element into view using JS."""
        element = self.find_element(by, value)
        self.driver.execute_script("arguments[0].scrollIntoView(true);", element)

    def set_viewport_size(self, width: int, height: int) -> None:
        """Sets browser window dimension for responsive testing."""
        self.driver.set_window_size(width, height)

    def get_browser_logs(self) -> List[dict]:
        """Captures browser console logs if available."""
        try:
            return self.driver.get_log('browser')
        except Exception:
            return []
