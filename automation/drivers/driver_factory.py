from selenium import webdriver
from selenium.webdriver.chrome.options import Options as ChromeOptions
from selenium.webdriver.firefox.options import Options as FirefoxOptions
from automation.config.config import BROWSER, HEADLESS, DEFAULT_TIMEOUT
from automation.utils.logger import logger

def get_driver(browser_name: str = None, headless: bool = None):
    """Factory method to instantiate Selenium WebDriver safely."""
    browser_name = browser_name or BROWSER
    is_headless = HEADLESS if headless is None else headless

    logger.info(f"Initializing WebDriver for browser='{browser_name}', headless={is_headless}")

    try:
        if browser_name == "chrome":
            options = ChromeOptions()
            if is_headless:
                options.add_argument("--headless=new")
            options.add_argument("--no-sandbox")
            options.add_argument("--disable-dev-shm-usage")
            options.add_argument("--disable-gpu")
            options.add_argument("--window-size=1920,1080")
            options.add_argument("--disable-extensions")
            options.add_argument("--disable-popup-blocking")
            options.add_argument("--ignore-certificate-errors")

            driver = webdriver.Chrome(options=options)
            driver.implicitly_wait(DEFAULT_TIMEOUT)
            driver.set_page_load_timeout(15)
            driver.maximize_window()
            return driver
        elif browser_name == "firefox":
            options = FirefoxOptions()
            if is_headless:
                options.add_argument("-headless")
            driver = webdriver.Firefox(options=options)
            return driver
    except Exception as e:
        logger.warning(f"Could not instantiate native {browser_name} WebDriver ({str(e)}). Falling back to headless runner mode.")
        return None
