"""
Wani - Stellar Blockchain Service
Handles all Stellar network operations including wallet creation, payments, and balance queries
"""

from stellar_sdk import Server, Keypair, TransactionBuilder, Network, Account, Asset
from stellar_sdk.exceptions import (
    NotFoundError,
    BadRequestError,
    BadResponseError,
    ConnectionError as StellarConnectionError
)
from typing import Dict, Optional, Tuple
from decimal import Decimal
import logging

from app.core.config import settings

logger = logging.getLogger(__name__)


class StellarService:
    """
    Service for interacting with Stellar blockchain network

    Handles:
    - Wallet creation and management
    - USDC payments on Stellar
    - Balance queries
    - Transaction building and submission
    - Network selection (testnet/public)
    """

    def __init__(self):
        """Initialize Stellar service with Horizon server connection"""
        self.horizon_url = settings.STELLAR_HORIZON_URL
        self.network = settings.STELLAR_NETWORK
        self.server = Server(horizon_url=self.horizon_url)

        # Set network passphrase based on configuration
        if self.network == "testnet":
            self.network_passphrase = Network.TESTNET_NETWORK_PASSPHRASE
        else:
            self.network_passphrase = Network.PUBLIC_NETWORK_PASSPHRASE

        # USDC asset configuration
        self.usdc_issuer = settings.STELLAR_USDC_ISSUER
        self.usdc_asset = Asset("USDC", self.usdc_issuer)

        logger.info(
            f"StellarService initialized - Network: {self.network}, "
            f"Horizon: {self.horizon_url}"
        )

    async def create_wallet(self) -> Tuple[str, str]:
        """
        Create a new Stellar wallet (keypair)

        Returns:
            Tuple[str, str]: (public_key, secret_key)

        Example:
            public_key, secret_key = await stellar_service.create_wallet()
        """
        try:
            keypair = Keypair.random()
            public_key = keypair.public_key
            secret_key = keypair.secret

            logger.info(f"Created new Stellar wallet: {public_key}")

            return public_key, secret_key

        except Exception as e:
            logger.error(f"Failed to create wallet: {str(e)}")
            raise Exception("Failed to create Stellar wallet") from e

    async def get_account(self, public_key: str) -> Optional[Account]:
        """
        Get account details from Stellar network

        Args:
            public_key: Stellar public key (G...)

        Returns:
            Account object if exists, None if not found

        Raises:
            Exception: If network error occurs
        """
        try:
            account = self.server.accounts().account_id(public_key).call()
            return account

        except NotFoundError:
            logger.warning(f"Account not found: {public_key}")
            return None

        except (BadRequestError, BadResponseError, StellarConnectionError) as e:
            logger.error(f"Error fetching account {public_key}: {str(e)}")
            raise Exception("Failed to fetch account from Stellar network") from e

    async def is_account_funded(self, public_key: str) -> bool:
        """
        Check if a Stellar account exists and is funded

        Args:
            public_key: Stellar public key

        Returns:
            bool: True if account exists on network, False otherwise
        """
        account = await self.get_account(public_key)
        return account is not None

    async def get_xlm_balance(self, public_key: str) -> Decimal:
        """
        Get XLM (Lumens) balance for an account

        Args:
            public_key: Stellar public key

        Returns:
            Decimal: XLM balance (0 if account not found)
        """
        try:
            account = await self.get_account(public_key)

            if not account:
                return Decimal("0")

            # Find native (XLM) balance
            for balance in account["balances"]:
                if balance["asset_type"] == "native":
                    return Decimal(balance["balance"])

            return Decimal("0")

        except Exception as e:
            logger.error(f"Error getting XLM balance for {public_key}: {str(e)}")
            raise

    async def get_usdc_balance(self, public_key: str) -> Decimal:
        """
        Get USDC balance for an account

        Args:
            public_key: Stellar public key

        Returns:
            Decimal: USDC balance (0 if account not found or no USDC trustline)
        """
        try:
            account = await self.get_account(public_key)

            if not account:
                return Decimal("0")

            # Find USDC balance
            for balance in account["balances"]:
                if (
                    balance["asset_type"] != "native"
                    and balance.get("asset_code") == "USDC"
                    and balance.get("asset_issuer") == self.usdc_issuer
                ):
                    return Decimal(balance["balance"])

            return Decimal("0")

        except Exception as e:
            logger.error(f"Error getting USDC balance for {public_key}: {str(e)}")
            raise

    async def get_all_balances(self, public_key: str) -> Dict[str, Decimal]:
        """
        Get all asset balances for an account

        Args:
            public_key: Stellar public key

        Returns:
            Dict mapping asset codes to balances
            Example: {"XLM": Decimal("100.50"), "USDC": Decimal("50.00")}
        """
        try:
            account = await self.get_account(public_key)

            if not account:
                return {}

            balances = {}

            for balance in account["balances"]:
                if balance["asset_type"] == "native":
                    balances["XLM"] = Decimal(balance["balance"])
                else:
                    asset_code = balance.get("asset_code", "UNKNOWN")
                    balances[asset_code] = Decimal(balance["balance"])

            return balances

        except Exception as e:
            logger.error(f"Error getting balances for {public_key}: {str(e)}")
            raise

    async def has_usdc_trustline(self, public_key: str) -> bool:
        """
        Check if account has USDC trustline established

        Args:
            public_key: Stellar public key

        Returns:
            bool: True if USDC trustline exists
        """
        try:
            account = await self.get_account(public_key)

            if not account:
                return False

            for balance in account["balances"]:
                if (
                    balance["asset_type"] != "native"
                    and balance.get("asset_code") == "USDC"
                    and balance.get("asset_issuer") == self.usdc_issuer
                ):
                    return True

            return False

        except Exception as e:
            logger.error(f"Error checking USDC trustline for {public_key}: {str(e)}")
            raise

    def validate_public_key(self, public_key: str) -> bool:
        """
        Validate if a string is a valid Stellar public key

        Args:
            public_key: String to validate

        Returns:
            bool: True if valid Stellar public key
        """
        try:
            Keypair.from_public_key(public_key)
            return True
        except Exception:
            return False

    def validate_secret_key(self, secret_key: str) -> bool:
        """
        Validate if a string is a valid Stellar secret key

        Args:
            secret_key: String to validate

        Returns:
            bool: True if valid Stellar secret key
        """
        try:
            Keypair.from_secret(secret_key)
            return True
        except Exception:
            return False

    async def fund_testnet_account(self, public_key: str) -> bool:
        """
        Fund a testnet account using Friendbot (TESTNET ONLY)

        Args:
            public_key: Stellar public key to fund

        Returns:
            bool: True if funding successful

        Raises:
            Exception: If not on testnet or funding fails
        """
        if self.network != "testnet":
            raise Exception("Friendbot only available on testnet")

        try:
            import requests
            friendbot_url = f"https://friendbot.stellar.org?addr={public_key}"
            response = requests.get(friendbot_url)
            response.raise_for_status()
            logger.info(f"Funded testnet account: {public_key}")
            return True

        except Exception as e:
            logger.error(f"Failed to fund testnet account {public_key}: {str(e)}")
            raise Exception("Failed to fund testnet account") from e

    async def get_account_info(self, public_key: str) -> Dict:
        """
        Get comprehensive account information

        Args:
            public_key: Stellar public key

        Returns:
            Dict with account details including balances, sequence, etc.
        """
        try:
            account = await self.get_account(public_key)

            if not account:
                return {
                    "exists": False,
                    "public_key": public_key,
                    "balances": {},
                    "sequence": None
                }

            balances = await self.get_all_balances(public_key)
            has_usdc = await self.has_usdc_trustline(public_key)

            return {
                "exists": True,
                "public_key": public_key,
                "balances": balances,
                "sequence": account.get("sequence"),
                "has_usdc_trustline": has_usdc,
                "subentry_count": account.get("subentry_count", 0),
                "num_sponsoring": account.get("num_sponsoring", 0),
                "num_sponsored": account.get("num_sponsored", 0)
            }

        except Exception as e:
            logger.error(f"Error getting account info for {public_key}: {str(e)}")
            raise


# Create singleton instance
stellar_service = StellarService()
