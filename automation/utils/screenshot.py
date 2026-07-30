import time
from pathlib import Path
from selenium.webdriver.remote.webdriver import WebDriver
from automation.config.config import SCREENSHOTS_DIR
from automation.utils.logger import logger

def capture_screenshot(driver: WebDriver, test_id: str) -> str:
    """Captures a screenshot of the current browser state and returns the file path."""
    try:
        timestamp = time.strftime("%Y%m%d_%H%M%S")
        filename = f"{test_id}_{timestamp}.png"
        filepath = SCREENSHOTS_DIR / filename
        driver.save_screenshot(str(filepath))
        logger.info(f"Saved failure screenshot to: {filepath}")
        return filename
    except Exception as e:
        logger.error(f"Failed to capture screenshot for test {test_id}: {str(e)}")
        return ""
