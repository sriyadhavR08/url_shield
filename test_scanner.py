import requests
import json

# Replace with the user's login details or we can just bypass and test the service directly.
# Let's test the URLScanner service directly to be sure.

from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
import sys
import os

# Add backend to path
sys.path.append(os.path.join(os.getcwd(), 'backend'))

from app.services.url_scanner import URLScanner

scanner = URLScanner(db_keywords=[])
result = scanner.analyze("http://free-login-update.com")
print(json.dumps(result, indent=2))
