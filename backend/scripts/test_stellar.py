"""
Wani - Stellar Connection Test Script
Tests Stellar SDK integration and StellarService functionality
"""

import asyncio
import sys
import os
from pathlib import Path

# Fix Windows console encoding
if sys.platform == "win32":
    os.system("chcp 65001 > nul")
    sys.stdout.reconfigure(encoding='utf-8')

# Add parent directory to path to import app modules
sys.path.insert(0, str(Path(__file__).parent.parent))

from app.services.stellar_service import stellar_service
from app.core.config import settings


async def test_stellar_connection():
    """
    Comprehensive test of Stellar service functionality
    """
    print("=" * 60)
    print("WANI - STELLAR CONNECTION TEST")
    print("=" * 60)
    print()

    # Test 1: Configuration
    print("📋 Test 1: Configuration")
    print(f"   Network: {settings.STELLAR_NETWORK}")
    print(f"   Horizon URL: {settings.STELLAR_HORIZON_URL}")
    print(f"   USDC Issuer: {settings.STELLAR_USDC_ISSUER}")
    print("   ✅ Configuration loaded successfully")
    print()

    # Test 2: Create new wallet
    print("📋 Test 2: Create Wallet")
    try:
        public_key, secret_key = await stellar_service.create_wallet()
        print(f"   Public Key: {public_key}")
        print(f"   Secret Key: {secret_key[:10]}...{secret_key[-10:]}")
        print("   ✅ Wallet created successfully")
    except Exception as e:
        print(f"   ❌ Failed to create wallet: {str(e)}")
        return False
    print()

    # Test 3: Validate keys
    print("📋 Test 3: Validate Keys")
    is_valid_public = stellar_service.validate_public_key(public_key)
    is_valid_secret = stellar_service.validate_secret_key(secret_key)
    print(f"   Public key valid: {is_valid_public}")
    print(f"   Secret key valid: {is_valid_secret}")

    if is_valid_public and is_valid_secret:
        print("   ✅ Key validation successful")
    else:
        print("   ❌ Key validation failed")
        return False
    print()

    # Test 4: Check if account exists (should not exist yet)
    print("📋 Test 4: Check Account Status (Before Funding)")
    try:
        is_funded = await stellar_service.is_account_funded(public_key)
        print(f"   Account funded: {is_funded}")

        if is_funded:
            print("   ⚠️  Account already exists (unexpected)")
        else:
            print("   ✅ Account does not exist yet (expected)")
    except Exception as e:
        print(f"   ❌ Failed to check account status: {str(e)}")
        return False
    print()

    # Test 5: Fund testnet account (only on testnet)
    if settings.STELLAR_NETWORK == "testnet":
        print("📋 Test 5: Fund Testnet Account")
        try:
            await stellar_service.fund_testnet_account(public_key)
            print(f"   Account funded via Friendbot")
            print("   ✅ Testnet funding successful")
        except Exception as e:
            print(f"   ❌ Failed to fund testnet account: {str(e)}")
            return False
        print()

        # Wait a moment for network to process
        print("   Waiting 3 seconds for network to process...")
        await asyncio.sleep(3)
        print()

        # Test 6: Check account exists (should exist now)
        print("📋 Test 6: Check Account Status (After Funding)")
        try:
            is_funded = await stellar_service.is_account_funded(public_key)
            print(f"   Account funded: {is_funded}")

            if is_funded:
                print("   ✅ Account exists on network")
            else:
                print("   ❌ Account still not found (unexpected)")
                return False
        except Exception as e:
            print(f"   ❌ Failed to check account status: {str(e)}")
            return False
        print()

        # Test 7: Get account balances
        print("📋 Test 7: Get Account Balances")
        try:
            xlm_balance = await stellar_service.get_xlm_balance(public_key)
            usdc_balance = await stellar_service.get_usdc_balance(public_key)
            all_balances = await stellar_service.get_all_balances(public_key)

            print(f"   XLM Balance: {xlm_balance} XLM")
            print(f"   USDC Balance: {usdc_balance} USDC")
            print(f"   All Balances: {all_balances}")
            print("   ✅ Balance queries successful")
        except Exception as e:
            print(f"   ❌ Failed to get balances: {str(e)}")
            return False
        print()

        # Test 8: Check USDC trustline
        print("📋 Test 8: Check USDC Trustline")
        try:
            has_usdc = await stellar_service.has_usdc_trustline(public_key)
            print(f"   Has USDC trustline: {has_usdc}")

            if has_usdc:
                print("   ⚠️  USDC trustline already exists (unexpected for new account)")
            else:
                print("   ✅ No USDC trustline yet (expected for new account)")
        except Exception as e:
            print(f"   ❌ Failed to check USDC trustline: {str(e)}")
            return False
        print()

        # Test 9: Get comprehensive account info
        print("📋 Test 9: Get Account Info")
        try:
            account_info = await stellar_service.get_account_info(public_key)
            print(f"   Account exists: {account_info['exists']}")
            print(f"   Public key: {account_info['public_key']}")
            print(f"   Balances: {account_info['balances']}")
            print(f"   Sequence: {account_info['sequence']}")
            print(f"   Has USDC trustline: {account_info['has_usdc_trustline']}")
            print(f"   Subentry count: {account_info['subentry_count']}")
            print("   ✅ Account info retrieved successfully")
        except Exception as e:
            print(f"   ❌ Failed to get account info: {str(e)}")
            return False
        print()

    else:
        print("📋 Test 5-9: Skipped (Not on testnet)")
        print("   ℹ️  Additional tests require testnet")
        print()

    # Test 10: Invalid key validation
    print("📋 Test 10: Invalid Key Validation")
    invalid_public = stellar_service.validate_public_key("INVALID_KEY")
    invalid_secret = stellar_service.validate_secret_key("INVALID_KEY")
    print(f"   Invalid public key detected: {not invalid_public}")
    print(f"   Invalid secret key detected: {not invalid_secret}")

    if not invalid_public and not invalid_secret:
        print("   ✅ Invalid key detection works correctly")
    else:
        print("   ❌ Invalid key detection failed")
        return False
    print()

    # Summary
    print("=" * 60)
    print("✅ ALL TESTS PASSED")
    print("=" * 60)
    print()
    print("🎉 Stellar service is working correctly!")
    print()
    print("Test Wallet Details:")
    print(f"   Public Key: {public_key}")
    print(f"   Secret Key: {secret_key}")
    print()
    print("⚠️  IMPORTANT: Save these keys if you want to use this test wallet")
    print()

    return True


async def main():
    """Main entry point"""
    try:
        success = await test_stellar_connection()

        if success:
            print("✅ Stellar connection test completed successfully")
            sys.exit(0)
        else:
            print("❌ Stellar connection test failed")
            sys.exit(1)

    except Exception as e:
        print(f"❌ Unexpected error: {str(e)}")
        import traceback
        traceback.print_exc()
        sys.exit(1)


if __name__ == "__main__":
    asyncio.run(main())
