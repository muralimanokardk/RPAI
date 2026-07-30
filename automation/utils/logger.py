import logging
import sys
from pathlib import Path
from automation.config.config import LOGS_DIR

def setup_logger(name: str = "RPAI_Automation") -> logging.Logger:
    """Configures console and file logger for test automation."""
    logger = logging.getLogger(name)
    logger.setLevel(logging.INFO)

    if not logger.handlers:
        # Console Handler
        c_handler = logging.StreamHandler(sys.stdout)
        c_handler.setLevel(logging.INFO)
        c_format = logging.Formatter('%(asctime)s - [%(levelname)s] - %(name)s - %(message)s')
        c_handler.setFormatter(c_format)

        # File Handler
        log_file = LOGS_DIR / "execution.log"
        f_handler = logging.FileHandler(log_file, encoding='utf-8')
        f_handler.setLevel(logging.DEBUG)
        f_format = logging.Formatter('%(asctime)s - [%(levelname)s] - %(name)s - %(filename)s:%(lineno)d - %(message)s')
        f_handler.setFormatter(f_format)

        logger.addHandler(c_handler)
        logger.addHandler(f_handler)

    return logger

logger = setup_logger()
