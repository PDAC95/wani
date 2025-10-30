"""
Test script for rate limiting functionality.

This script tests that rate limiting is working correctly on auth endpoints.
"""

import httpx
import time
import sys

BASE_URL = "http://localhost:8000/api/v1"

def test_login_rate_limit():
    """Test that login endpoint is rate-limited to 5 requests per 15 minutes."""
    print("\n" + "="*60)
    print("Testing Login Rate Limiting (5 requests / 15 minutes)")
    print("="*60)

    login_data = {
        "email": "test@example.com",
        "password": "WrongPassword123"
    }

    # Make 6 requests (5 should succeed, 6th should be rate-limited)
    for i in range(1, 7):
        print(f"\nRequest {i}:")
        try:
            response = httpx.post(
                f"{BASE_URL}/auth/login",
                json=login_data,
                timeout=5.0
            )
            print(f"  Status: {response.status_code}")

            if response.status_code == 429:
                print(f"  [PASS] Rate limit triggered! (as expected)")
                # Check rate limit headers
                if "X-RateLimit-Limit" in response.headers:
                    print(f"  Rate Limit: {response.headers['X-RateLimit-Limit']}")
                if "X-RateLimit-Remaining" in response.headers:
                    print(f"  Remaining: {response.headers['X-RateLimit-Remaining']}")
                if "X-RateLimit-Reset" in response.headers:
                    print(f"  Reset At: {response.headers['X-RateLimit-Reset']}")
                print(f"  Message: {response.json().get('detail', 'Rate limit exceeded')}")
                return True
            elif response.status_code == 401:
                print(f"  Request allowed (invalid credentials, but not rate-limited)")
            else:
                print(f"  Unexpected status code")

            # Add small delay between requests
            time.sleep(0.5)

        except Exception as e:
            print(f"  [ERROR] Error: {str(e)}")
            return False

    print("\n[FAIL] Expected rate limit after 5 requests, but didn't trigger!")
    return False


def test_forgot_password_rate_limit():
    """Test that forgot-password endpoint is rate-limited to 3 requests per hour."""
    print("\n" + "="*60)
    print("Testing Forgot Password Rate Limiting (3 requests / hour)")
    print("="*60)

    forgot_data = {
        "email": "test@example.com"
    }

    # Make 4 requests (3 should succeed, 4th should be rate-limited)
    for i in range(1, 5):
        print(f"\nRequest {i}:")
        try:
            response = httpx.post(
                f"{BASE_URL}/auth/forgot-password",
                json=forgot_data,
                timeout=5.0
            )
            print(f"  Status: {response.status_code}")

            if response.status_code == 429:
                print(f"  [PASS] Rate limit triggered! (as expected)")
                if "X-RateLimit-Limit" in response.headers:
                    print(f"  Rate Limit: {response.headers['X-RateLimit-Limit']}")
                if "X-RateLimit-Remaining" in response.headers:
                    print(f"  Remaining: {response.headers['X-RateLimit-Remaining']}")
                print(f"  Message: {response.json().get('detail', 'Rate limit exceeded')}")
                return True
            elif response.status_code == 200:
                print(f"  Request allowed")
            else:
                print(f"  Unexpected status code")

            # Add small delay between requests
            time.sleep(0.5)

        except Exception as e:
            print(f"  [ERROR] Error: {str(e)}")
            return False

    print("\n[FAIL] Expected rate limit after 3 requests, but didn't trigger!")
    return False


def test_resend_verification_rate_limit():
    """Test that resend-verification endpoint is rate-limited to 3 requests per hour."""
    print("\n" + "="*60)
    print("Testing Resend Verification Rate Limiting (3 requests / hour)")
    print("="*60)

    resend_data = {
        "email": "test@example.com"
    }

    # Make 4 requests (3 should succeed, 4th should be rate-limited)
    for i in range(1, 5):
        print(f"\nRequest {i}:")
        try:
            response = httpx.post(
                f"{BASE_URL}/auth/resend-verification",
                json=resend_data,
                timeout=5.0
            )
            print(f"  Status: {response.status_code}")

            if response.status_code == 429:
                print(f"  [PASS] Rate limit triggered! (as expected)")
                if "X-RateLimit-Limit" in response.headers:
                    print(f"  Rate Limit: {response.headers['X-RateLimit-Limit']}")
                if "X-RateLimit-Remaining" in response.headers:
                    print(f"  Remaining: {response.headers['X-RateLimit-Remaining']}")
                print(f"  Message: {response.json().get('detail', 'Rate limit exceeded')}")
                return True
            elif response.status_code == 200:
                print(f"  Request allowed")
            else:
                print(f"  Unexpected status code")

            # Add small delay between requests
            time.sleep(0.5)

        except Exception as e:
            print(f"  [ERROR] Error: {str(e)}")
            return False

    print("\n[FAIL] Expected rate limit after 3 requests, but didn't trigger!")
    return False


def main():
    """Run all rate limiting tests."""
    print("\n" + "="*60)
    print("RATE LIMITING TESTS")
    print("="*60)
    print("\nServer URL:", BASE_URL)
    print("\nNote: These tests will make multiple requests to trigger rate limits")
    print("      The server must be running on port 8000")
    print()

    # Check if server is running
    try:
        response = httpx.get(f"http://localhost:8000/health", timeout=5.0)
        if response.status_code == 200:
            print("[OK] Server is running\n")
        else:
            print("[ERROR] Server returned unexpected status code")
            sys.exit(1)
    except Exception as e:
        print(f"[ERROR] Server not running: {str(e)}")
        print("   Please start the server first: ./venv/Scripts/python.exe run_server.py")
        sys.exit(1)

    results = []

    # Test login rate limiting
    results.append(("Login", test_login_rate_limit()))

    # Test forgot-password rate limiting
    results.append(("Forgot Password", test_forgot_password_rate_limit()))

    # Test resend-verification rate limiting
    results.append(("Resend Verification", test_resend_verification_rate_limit()))

    # Summary
    print("\n" + "="*60)
    print("TEST SUMMARY")
    print("="*60)
    for name, result in results:
        status = "[PASS]" if result else "[FAIL]"
        print(f"{name}: {status}")

    all_passed = all(result for _, result in results)
    print()
    if all_passed:
        print("[SUCCESS] All rate limiting tests passed!")
        sys.exit(0)
    else:
        print("[WARNING] Some rate limiting tests failed")
        sys.exit(1)


if __name__ == "__main__":
    main()
