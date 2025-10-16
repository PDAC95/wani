# ERROR LOG - Wani Platform

**Project Name:** Wani (和 - Peace, Harmony)

## HOW TO DOCUMENT ERRORS

**CRITICAL:** Document ALL errors immediately when they occur. This prevents wasting time on the same problem twice.

Each error entry must include:

1. **Date & Time** - When error occurred (YYYY-MM-DD HH:MM)
2. **File & Line** - Exact location (path/to/file.py:lineNumber)
3. **Error Message** - Complete and exact error text
4. **Context** - What operation was being attempted
5. **Stack Trace** - If applicable (first 10-20 lines)
6. **Solution Attempts** - Everything tried (numbered list)
7. **Status** - ACTIVE, RESOLVED, or BLOCKED
8. **Solution** - How it was fixed (if resolved)

**Format:**

````markdown
- [ ] [2025-10-15 14:30] Brief error description
  - **File:** backend/app/services/wallet_service.py:45
  - **Error:** `ValueError: insufficient balance for transfer`
  - **Context:** Processing P2P transfer of $500
  - **Stack:**
    ```
    File "wallet_service.py", line 45, in transfer_money
      raise ValueError("insufficient balance")
    ```
  - **Attempted:**
    1. ❌ Checked balance calculation logic - correct
    2. ❌ Verified database balance - correct
    3. ✅ Found: Balance check used wrong decimal precision
  - **Status:** RESOLVED
  - **Solution:** Changed Decimal comparison to use quantize(Decimal('0.000001'))
  - **Prevention:** Added unit test for decimal precision edge case
````

---

## 🔴 CRITICAL ERRORS (Blockers)

**Definition:** Errors that completely prevent development, block MVP launch, or cause data loss.

### Active Critical Errors:

_No critical errors currently. Add immediately if any occur._

**Example:**

````markdown
- [ ] [2025-10-16 10:00] Stellar transaction fails with bad_auth
  - **File:** backend/app/core/stellar.py:87
  - **Error:** `stellar_sdk.exceptions.BadRequestError: transaction failed: tx_bad_auth`
  - **Context:** Attempting to send 500 USDC from hot wallet to recipient
  - **Stack:**
    ```
    File "stellar.py", line 87, in send_usdc
      response = self.server.submit_transaction(transaction)
    File "stellar_sdk/call_builder/base_call_builder.py", line 234
      raise BadRequestError(response)
    ```
  - **Environment:**
    - Stellar Network: Testnet
    - SDK Version: stellar-sdk 9.1.0
    - Hot Wallet: Loaded from env var
  - **Attempted:**
    1. ❌ Verified hot wallet secret is correct (matches public key)
    2. ❌ Checked account exists on testnet (confirmed via Horizon)
    3. ❌ Tried with different destination address (same error)
    4. ⏳ Checking if account has USDC trustline established
  - **Status:** ACTIVE - Blocking P0 task "Stellar integration"
  - **Blocker Impact:** Cannot complete remittance flow testing
  - **Next Steps:**
    - Verify trustline for USDC asset exists
    - Try with native XLM transfer first to isolate issue
    - Check network passphrase matches (testnet vs public)
  - **Workaround:** Using mocked responses for frontend development
````

---

## 🟡 ACTIVE ERRORS (Non-Critical)

**Definition:** Errors that don't block MVP but need fixing before launch.

### Active Non-Critical Errors:

_No active non-critical errors. Document here as they occur._

**Example:**

````markdown
- [ ] [2025-10-17 15:45] Transaction history pagination slow
  - **File:** backend/app/api/routes/wallet.py:156
  - **Error:** No explicit error, but query takes 3+ seconds with 10k+ transactions
  - **Context:** Loading transaction history page 50+ in dashboard
  - **Query:**
    ```sql
    SELECT * FROM transactions
    WHERE user_id = '...'
    ORDER BY created_at DESC
    LIMIT 20 OFFSET 1000
    ```
  - **Attempted:**
    1. ⏳ Checked for index on (user_id, created_at) - missing!
    2. ⏳ Planning to add composite index
  - **Status:** ACTIVE - Not blocking but degraded UX
  - **Priority:** P1 - Fix before Week 7 (performance testing)
  - **Solution:** Pending - Will add index in next migration
````

---

## 🟢 RESOLVED ERRORS (Reference)

**Keep for 30 days, then archive to PROGRESS.md**

### Recently Resolved:

_Resolved errors will be added here. Valuable for future reference._

**Example:**

````markdown
- [x] [2025-10-15 11:20] RESOLVED - Supabase connection pool exhausted
  - **File:** backend/app/core/database.py:23
  - **Error:** `sqlalchemy.exc.TimeoutError: QueuePool limit of size 5 overflow 0 reached`
  - **Context:** Running load test with 50 concurrent requests to /wallet/balance
  - **Attempted:**
    1. ❌ Increased pool_size to 10 - still failed at 40 requests
    2. ❌ Added pool_pre_ping=True - no improvement
    3. ✅ Set pool_size=20, max_overflow=0, pool_recycle=3600
  - **Status:** RESOLVED (2025-10-15 12:00)
  - **Solution:**
    ```python
    engine = create_async_engine(
        DATABASE_URL,
        pool_size=20,        # Increased from 5
        max_overflow=0,      # No overflow
        pool_pre_ping=True,
        pool_recycle=3600    # Recycle connections every hour
    )
    ```
  - **Root Cause:** Default pool_size=5 too small for concurrent load
  - **Prevention:**
    - Documented pool size requirements in PLANNING.md
    - Added load test to catch regression
    - Set up alert for connection pool metrics
  - **Time Lost:** 1 hour
  - **Lesson:** Always load test connection pooling early
````

---

## ⚠️ PROBLEMATIC PATTERNS

**Common issues and their solutions specific to this project**

### Pattern 1: Decimal Precision in Financial Calculations

**Problem:** Python Decimal type loses precision in comparisons

```python
# BAD - Can cause incorrect balance checks
if wallet.balance_usdc >= amount:
    # This might fail due to floating point precision
```

**Solution:** Always use quantize for financial comparisons

```python
# GOOD - Ensures 6 decimal place precision for USDC
from decimal import Decimal, ROUND_DOWN

USDC_PRECISION = Decimal('0.000001')

def safe_decimal_compare(value1: Decimal, value2: Decimal) -> bool:
    """Compare two Decimal values with proper USDC precision"""
    v1 = value1.quantize(USDC_PRECISION, rounding=ROUND_DOWN)
    v2 = value2.quantize(USDC_PRECISION, rounding=ROUND_DOWN)
    return v1 >= v2

# Usage
if safe_decimal_compare(wallet.balance_usdc, amount):
    # Safe comparison
```

**Prevention:** Use helper functions for all financial comparisons

---

### Pattern 2: Stellar Transaction Signing Errors

**Problem:** Transaction fails with bad_auth or bad_seq

```python
# Common causes:
# 1. Wrong network passphrase
# 2. Incorrect secret key
# 3. Sequence number out of sync
# 4. Account doesn't have trustline for USDC
```

**Solution:** Comprehensive validation before transaction

```python
async def send_usdc_safely(
    destination: str,
    amount: Decimal
) -> dict:
    """Send USDC with proper validation"""

    # 1. Verify network passphrase
    network_passphrase = (
        Network.TESTNET_NETWORK_PASSPHRASE
        if settings.STELLAR_NETWORK == "testnet"
        else Network.PUBLIC_NETWORK_PASSPHRASE
    )

    # 2. Load and verify source account
    try:
        source_account = self.server.load_account(
            self.hot_wallet_address
        )
    except Exception as e:
        raise Exception(f"Failed to load account: {str(e)}")

    # 3. Verify destination has USDC trustline
    dest_account = self.server.load_account(destination)
    has_trustline = False
    for balance in dest_account['balances']:
        if (balance.get('asset_code') == 'USDC' and
            balance.get('asset_issuer') == settings.STELLAR_USDC_ISSUER):
            has_trustline = True
            break

    if not has_trustline:
        raise Exception("Destination doesn't have USDC trustline")

    # 4. Build transaction with correct network
    transaction = (
        TransactionBuilder(
            source_account=source_account,
            network_passphrase=network_passphrase,
            base_fee=100
        )
        .append_payment_op(
            destination=destination,
            asset=self.usdc_asset,
            amount=str(amount)
        )
        .set_timeout(30)  # 30 second timeout
        .build()
    )

    # 5. Sign with correct keypair
    transaction.sign(self.hot_wallet_keypair)

    # 6. Submit with retry logic
    try:
        response = self.server.submit_transaction(transaction)
        return {
            "success": True,
            "hash": response['hash'],
            "ledger": response['ledger']
        }
    except Exception as e:
        logger.error(f"Transaction failed: {str(e)}")
        raise
```

**Prevention:**

- Always verify trustlines before sending assets
- Use correct network passphrase
- Implement retry logic for sequence number issues
- Log all transaction attempts

---

### Pattern 3: Race Conditions in Balance Updates

**Problem:** Concurrent transfers can cause incorrect balances

```python
# BAD - Not atomic
def transfer_money(from_id, to_id, amount):
    from_wallet = get_wallet(from_id)
    to_wallet = get_wallet(to_id)

    from_wallet.balance -= amount  # Race condition here!
    to_wallet.balance += amount    # And here!

    save_wallet(from_wallet)
    save_wallet(to_wallet)
```

**Solution:** Use database transactions with row locking

```python
# GOOD - Atomic with pessimistic locking
async def transfer_money(
    from_user_id: UUID,
    to_user_id: UUID,
    amount: Decimal
):
    async with db.begin():  # Start transaction
        # Lock rows with FOR UPDATE
        from_wallet = await db.execute(
            select(Wallet)
            .where(Wallet.user_id == from_user_id)
            .with_for_update()
        ).scalar_one()

        to_wallet = await db.execute(
            select(Wallet)
            .where(Wallet.user_id == to_user_id)
            .with_for_update()
        ).scalar_one()

        # Check balance
        if from_wallet.balance_usdc < amount:
            raise InsufficientBalanceError()

        # Update balances
        from_wallet.balance_usdc -= amount
        to_wallet.balance_usdc += amount

        # Create transaction record
        transaction = Transaction(
            from_user_id=from_user_id,
            to_user_id=to_user_id,
            amount=amount,
            status="completed"
        )
        db.add(transaction)

        # Commit happens automatically at end of 'async with'

    return transaction
```

**Prevention:**

- Always use database transactions for financial operations
- Use row-level locking (FOR UPDATE) for concurrent access
- Test with concurrent requests

---

### Pattern 4: JWT Token Expiration Not Handled

**Problem:** Frontend breaks when token expires mid-session

```typescript
// BAD - No token refresh
const api = axios.create({
  headers: {
    Authorization: `Bearer ${token}`,
  },
});
```

**Solution:** Automatic token refresh with interceptor

```typescript
// GOOD - Auto-refresh on 401
let isRefreshing = false;
let failedQueue: any[] = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        // Queue failed requests
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        }).then((token) => {
          originalRequest.headers["Authorization"] = `Bearer ${token}`;
          return api(originalRequest);
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        // Refresh token
        const refreshToken = getRefreshToken();
        const { data } = await axios.post("/api/v1/auth/refresh", {
          refresh_token: refreshToken,
        });

        const newToken = data.data.token;
        setToken(newToken);

        api.defaults.headers.common["Authorization"] = `Bearer ${newToken}`;
        originalRequest.headers["Authorization"] = `Bearer ${newToken}`;

        processQueue(null, newToken);
        isRefreshing = false;

        return api(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError, null);
        isRefreshing = false;

        // Token refresh failed, logout user
        logout();
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);
```

**Prevention:**

- Implement token refresh from day 1
- Test token expiration scenarios
- Have clear error messages for auth failures

---

### Pattern 5: Missing NFC Permissions (Mobile)

**Problem:** NFC functionality fails silently on iOS

```typescript
// BAD - No permission check
const nfcData = await NFC.readTag();
```

**Solution:** Check and request permissions properly

```typescript
// GOOD - Proper permission handling
import * as NFC from "expo-nfc";

async function readNFCTag() {
  // 1. Check if NFC is available
  const isAvailable = await NFC.isAvailableAsync();
  if (!isAvailable) {
    Alert.alert(
      "NFC Not Available",
      "Your device does not support NFC or it is disabled."
    );
    return null;
  }

  // 2. Check if NFC is enabled
  const isEnabled = await NFC.isEnabledAsync();
  if (!isEnabled) {
    Alert.alert("Enable NFC", "Please enable NFC in your device settings.", [
      { text: "Cancel", style: "cancel" },
      { text: "Settings", onPress: () => Linking.openSettings() },
    ]);
    return null;
  }

  // 3. Read tag with timeout
  try {
    const tag = await Promise.race([
      NFC.readTag(),
      new Promise((_, reject) =>
        setTimeout(() => reject(new Error("Timeout")), 30000)
      ),
    ]);

    return tag;
  } catch (error) {
    if (error.message === "Timeout") {
      Alert.alert("Timeout", "No NFC tag detected. Please try again.");
    } else {
      Alert.alert("Error", `Failed to read NFC: ${error.message}`);
    }
    return null;
  }
}
```

**Prevention:**

- Always check device capabilities before using NFC
- Provide clear error messages
- Add fallback to QR codes

---

## 📚 LESSONS LEARNED

### Database Issues

- ✅ Always use connection pooling (pool_size ≥ 20 for production)
- ✅ Add composite indexes on (user_id, created_at) for transaction queries
- ✅ Use row-level locking (FOR UPDATE) for financial operations
- ✅ Test with concurrent requests early
- ✅ Monitor connection pool metrics

### Blockchain (Stellar) Issues

- ✅ Always verify trustlines before sending assets
- ✅ Use correct network passphrase (testnet vs public)
- ✅ Implement retry logic for sequence number conflicts
- ✅ Log all transaction attempts with full context
- ✅ Test on testnet thoroughly before mainnet

### Authentication Issues

- ✅ Implement token refresh from day 1
- ✅ Store refresh tokens securely (httpOnly cookies web, SecureStore mobile)
- ✅ Handle 401 errors gracefully with auto-retry
- ✅ Logout user if refresh fails
- ✅ Test token expiration scenarios

### Frontend Issues (React/React Native)

- ✅ Always unsubscribe from queries on unmount
- ✅ Use React Query for server state (don't use useState for API data)
- ✅ Implement proper loading and error states
- ✅ Test on actual devices, not just simulators
- ✅ Check permissions before using native features (NFC, Camera)

### API Issues

- ✅ Always validate input with Pydantic schemas
- ✅ Implement rate limiting on all public endpoints
- ✅ Use proper HTTP status codes (400 vs 404 vs 500)
- ✅ Return user-friendly error messages (not stack traces)
- ✅ Log errors with context (user_id, timestamp, request_id)

### Financial Operations

- ✅ Use Decimal type for all amounts (never float)
- ✅ Always quantize Decimal values for comparisons
- ✅ Use database transactions for balance updates
- ✅ Create audit log entries for all financial operations
- ✅ Test edge cases (zero amounts, negative, very large numbers)

---

## 🔧 COMMON SOLUTION SNIPPETS

### Robust Database Connection with Retry

```python
# backend/app/core/database.py
import asyncio
from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
from sqlalchemy.orm import sessionmaker
from app.core.config import settings
import logging

logger = logging.getLogger(__name__)

async def create_db_engine(max_retries=5):
    """Create database engine with retry logic"""

    for attempt in range(max_retries):
        try:
            engine = create_async_engine(
                settings.DATABASE_URL,
                pool_size=20,
                max_overflow=0,
                pool_pre_ping=True,
                pool_recycle=3600,
                echo=settings.DEBUG
            )

            # Test connection
            async with engine.begin() as conn:
                await conn.execute("SELECT 1")

            logger.info("Database connected successfully")
            return engine

        except Exception as e:
            logger.error(f"Database connection attempt {attempt + 1} failed: {str(e)}")

            if attempt == max_retries - 1:
                raise Exception(f"Failed to connect to database after {max_retries} attempts")

            # Exponential backoff
            wait_time = 2 ** attempt
            logger.info(f"Retrying in {wait_time} seconds...")
            await asyncio.sleep(wait_time)

# Create engine and session factory
engine = None
async_session_factory = None

async def init_db():
    global engine, async_session_factory
    engine = await create_db_engine()
    async_session_factory = sessionmaker(
        engine,
        class_=AsyncSession,
        expire_on_commit=False
    )

async def get_db() -> AsyncSession:
    """Dependency for getting database session"""
    async with async_session_factory() as session:
        try:
            yield session
            await session.commit()
        except Exception:
            await session.rollback()
            raise
        finally:
            await session.close()
```

---

### JWT Token Verification with Proper Error Handling

```python
# backend/app/core/security.py
from jose import jwt, JWTError
from fastapi import HTTPException, status
from datetime import datetime, timedelta
from app.core.config import settings

def create_access_token(data: dict, expires_delta: timedelta = None):
    """Create JWT access token"""
    to_encode = data.copy()

    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=settings.JWT_EXPIRE_MINUTES)

    to_encode.update({"exp": expire, "type": "access"})
    encoded_jwt = jwt.encode(
        to_encode,
        settings.JWT_SECRET,
        algorithm=settings.JWT_ALGORITHM
    )
    return encoded_jwt

def verify_token(token: str):
    """Verify and decode JWT token"""
    try:
        payload = jwt.decode(
            token,
            settings.JWT_SECRET,
            algorithms=[settings.JWT_ALGORITHM]
        )

        # Check token type
        if payload.get("type") != "access":
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid token type"
            )

        # Check expiration (handled by jose, but explicit check for clarity)
        exp = payload.get("exp")
        if exp and datetime.fromtimestamp(exp) < datetime.utcnow():
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Token has expired"
            )

        return payload

    except JWTError as e:
        if "Signature has expired" in str(e):
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Token has expired"
            )
        elif "Invalid signature" in str(e):
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid token signature"
            )
        else:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail=f"Token verification failed: {str(e)}"
            )
```

---

### Comprehensive API Error Handler

```python
# backend/app/api/deps.py
from fastapi import Request, status
from fastapi.responses import JSONResponse
from fastapi.exceptions import RequestValidationError
from sqlalchemy.exc import SQLAlchemyError
from datetime import datetime
import logging

logger = logging.getLogger(__name__)

# Custom exceptions
class AppError(Exception):
    """Base application error"""
    def __init__(self, message: str, status_code: int = 500, code: str = "INTERNAL_ERROR"):
        self.message = message
        self.status_code = status_code
        self.code = code
        super().__init__(self.message)

class InsufficientBalanceError(AppError):
    def __init__(self, balance: float, required: float):
        super().__init__(
            message=f"Insufficient balance. Available: {balance}, Required: {required}",
            status_code=status.HTTP_400_BAD_REQUEST,
            code="INSUFFICIENT_BALANCE"
        )
        self.balance = balance
        self.required = required

class UserNotFoundError(AppError):
    def __init__(self, user_id: str):
        super().__init__(
            message=f"User not found: {user_id}",
            status_code=status.HTTP_404_NOT_FOUND,
            code="USER_NOT_FOUND"
        )

# Error handlers
async def app_error_handler(request: Request, exc: AppError):
    """Handle custom application errors"""
    logger.error(
        f"Application error: {exc.code}",
        extra={
            "code": exc.code,
            "message": exc.message,
            "path": request.url.path,
            "method": request.method
        }
    )

    return JSONResponse(
        status_code=exc.status_code,
        content={
            "success": False,
            "data": None,
            "error": {
                "code": exc.code,
                "message": exc.message
            },
            "timestamp": datetime.utcnow().isoformat()
        }
    )

async def validation_error_handler(request: Request, exc: RequestValidationError):
    """Handle Pydantic validation errors"""
    errors = []
    for error in exc.errors():
        errors.append({
            "field": ".".join(str(loc) for loc in error["loc"]),
            "message": error["msg"],
            "type": error["type"]
        })

    logger.warning(
        "Validation error",
        extra={
            "path": request.url.path,
            "errors": errors
        }
    )

    return JSONResponse(
        status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
        content={
            "success": False,
            "data": None,
            "error": {
                "code": "VALIDATION_ERROR",
                "message": "Invalid request data",
                "details": errors
            },
            "timestamp": datetime.utcnow().isoformat()
        }
    )

async def database_error_handler(request: Request, exc: SQLAlchemyError):
    """Handle database errors"""
    logger.error(
        "Database error",
        exc_info=True,
        extra={
            "path": request.url.path,
            "error": str(exc)
        }
    )

    return JSONResponse(
        status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
        content={
            "success": False,
            "data": None,
            "error": {
                "code": "DATABASE_ERROR",
                "message": "A database error occurred. Please try again."
            },
            "timestamp": datetime.utcnow().isoformat()
        }
    )

async def generic_error_handler(request: Request, exc: Exception):
    """Handle all other errors"""
    logger.error(
        "Unhandled error",
        exc_info=True,
        extra={
            "path": request.url.path,
            "error": str(exc)
        }
    )

    return JSONResponse(
        status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
        content={
            "success": False,
            "data": None,
            "error": {
                "code": "INTERNAL_ERROR",
                "message": "An unexpected error occurred. Please try again."
            },
            "timestamp": datetime.utcnow().isoformat()
        }
    )

# Register handlers in main.py
# app.add_exception_handler(AppError, app_error_handler)
# app.add_exception_handler(RequestValidationError, validation_error_handler)
# app.add_exception_handler(SQLAlchemyError, database_error_handler)
# app.add_exception_handler(Exception, generic_error_handler)
```

---

### File Upload Validation (KYC Documents)

```python
# backend/app/utils/file_validation.py
from fastapi import UploadFile, HTTPException, status
from pathlib import Path
import magic  # python-magic for MIME type detection

ALLOWED_EXTENSIONS = {'.jpg', '.jpeg', '.png', '.pdf'}
ALLOWED_MIME_TYPES = {
    'image/jpeg',
    'image/png',
    'application/pdf'
}
MAX_FILE_SIZE = 5 * 1024 * 1024  # 5MB

async def validate_upload_file(file: UploadFile) -> bool:
    """
    Validate uploaded file for KYC documents

    Raises:
        HTTPException: If validation fails
    """
    # 1. Check file extension
    file_ext = Path(file.filename).suffix.lower()
    if file_ext not in ALLOWED_EXTENSIONS:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail={
                "code": "INVALID_FILE_TYPE",
                "message": f"File type not allowed. Allowed: {', '.join(ALLOWED_EXTENSIONS)}"
            }
        )

    # 2. Read file content
    content = await file.read()
    file_size = len(content)

    # Reset file pointer for later use
    await file.seek(0)

    # 3. Check file size
    if file_size > MAX_FILE_SIZE:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail={
                "code": "FILE_TOO_LARGE",
                "message": f"File size exceeds limit. Max: {MAX_FILE_SIZE / 1024 / 1024}MB"
            }
        )

    # 4. Verify MIME type (prevents file extension spoofing)
    mime = magic.from_buffer(content, mime=True)
    if mime not in ALLOWED_MIME_TYPES:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail={
                "code": "INVALID_MIME_TYPE",
                "message": f"Invalid file type. Detected: {mime}"
            }
        )

    return True
```

---

## 🚨 PROJECT-SPECIFIC ERROR CATEGORIES

### Stellar Blockchain Errors

_Document Stellar-specific errors here as they occur_

### Circle API Errors

_Document Circle API errors here_

### Bitso API Errors

_Document Bitso API errors here_

### Supabase Errors

_Document Supabase/PostgreSQL errors here_

### Redis Errors

_Document Redis caching errors here_

### Mobile (Expo) Errors

_Document React Native/Expo errors here_

---

## 📊 ERROR LOG STATISTICS

### Current Week (Week X)

- **Total Errors:** 0
- **Critical:** 0
- **Non-Critical:** 0
- **Resolved:** 0
- **Active:** 0
- **Average Resolution Time:** N/A

### Previous Weeks

_Update weekly with statistics_

---

## 🔍 DEBUGGING CHECKLIST

**When encountering a NEW error:**

### 1. Immediate Actions (First 2 minutes)

- [ ] Copy exact error message (don't paraphrase)
- [ ] Note file path and line number
- [ ] Check console for additional errors
- [ ] Verify environment variables loaded (.env exists)
- [ ] Check if services are running (backend, Redis, database)

### 2. Investigation (Next 5-10 minutes)

- [ ] Search THIS file (ERRORS.md) for similar errors
- [ ] Search PROGRESS.md for related changes
- [ ] Check recent git commits (`git log --oneline -10`)
- [ ] Verify dependencies installed (`pip list`, `npm list`)
- [ ] Check service status (Supabase dashboard, Redis ping)
- [ ] Review logs for patterns (backend, frontend)

### 3. Attempted Solutions (10-30 minutes)

- [ ] Try obvious fix (restart service, clear cache)
- [ ] Check official documentation
- [ ] Search error message on Google/Stack Overflow
- [ ] Review similar working code in project
- [ ] Try minimal reproduction case

### 4. Documentation (Required after 15 minutes)

- [ ] Add error to appropriate section in THIS file
- [ ] Include ALL attempted solutions (even failed ones)
- [ ] Set correct status (ACTIVE/BLOCKED)
- [ ] Update TASKS.md if blocking a task
- [ ] Add context for future reference

### 5. If Stuck After 1 Hour

- [ ] Add as BLOCKER in critical section
- [ ] Document in detail for team/future reference
- [ ] Consider workaround or alternative approach
- [ ] Move to next priority task
- [ ] Schedule for later review with fresh perspective

---

## 📝 QUICK REFERENCE

### Common Error Codes

- `INSUFFICIENT_BALANCE` - User doesn't have enough funds
- `USER_NOT_FOUND` - User ID doesn't exist
- `INVALID_TOKEN` - JWT token invalid or expired
- `VALIDATION_ERROR` - Pydantic validation failed
- `DATABASE_ERROR` - Database operation failed
- `STELLAR_ERROR` - Stellar transaction failed
- `RATE_LIMIT_EXCEEDED` - Too many requests

### HTTP Status Codes

- `400` - Bad Request (validation errors, insufficient balance)
- `401` - Unauthorized (invalid/expired token)
- `403` - Forbidden (insufficient permissions)
- `404` - Not Found (user, transaction not found)
- `422` - Unprocessable Entity (Pydantic validation)
- `429` - Too Many Requests (rate limit)
- `500` - Internal Server Error (unexpected errors)

### Log Levels

- `DEBUG` - Detailed information for debugging
- `INFO` - General informational messages
- `WARNING` - Warning messages (e.g., approaching limits)
- `ERROR` - Error messages (operation failed but app continues)
- `CRITICAL` - Critical errors (app may crash)

---

**Last Updated:** 2025-10-15 (Document created)  
**Total Documented Errors:** 0  
**Resolution Rate:** N/A (no errors yet)  
**Average Resolution Time:** N/A

**Update this file immediately when errors occur!**
