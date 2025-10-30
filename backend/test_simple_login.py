"""Simple test to debug 405 error"""
import httpx

# Test login without rate limiting first
response = httpx.post(
    "http://localhost:8000/api/v1/auth/login",
    json={"email": "test@example.com", "password": "Wrong123"},
    timeout=5.0
)

print(f"Status: {response.status_code}")
print(f"Headers: {dict(response.headers)}")
print(f"Body: {response.text}")
