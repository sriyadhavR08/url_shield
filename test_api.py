import requests

# We need a token to hit /scan. Let's register a test user and login.
base_url = "http://127.0.0.1:8000"

# Register
resp = requests.post(f"{base_url}/auth/register", json={
    "email": "test_scanner2@example.com",
    "password": "password123",
    "full_name": "Test User"
})

# Login
resp = requests.post(f"{base_url}/auth/login", data={
    "username": "test_scanner2@example.com",
    "password": "password123"
})
token = resp.json().get("access_token")

# Scan URL
headers = {"Authorization": f"Bearer {token}"}
resp = requests.post(f"{base_url}/scan", json={"url": "http://free-login-update.com"}, headers=headers)
print("API Response:", resp.json())
