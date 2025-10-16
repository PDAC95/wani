# PLANNING.md - Technical Architecture & Development Guide

## Wani - Remittance & Digital Wallet Platform

**Project Name:** Wani (和 - Peace, Harmony)

## Project Vision

Building a next-generation remittance and digital wallet platform that enables instant, low-cost money transfers from USA to Mexico via Stellar blockchain, combined with NFC payment capabilities for recipients to spend directly at merchants. Wani charges 2% for remittances (vs 6-8% traditional), provides instant wallet credit, and allows cash-out to Mexican banks in 7-10 minutes via SPEI.

**MVP Scope:** User registration with KYC, ACH-funded remittances (USA→Mexico), custodial wallet management, P2P transfers, NFC/QR payments at merchants (1% fee), and cash-out to Mexican banks via Bitso + SPEI.

**Current Status:** Pre-development / Planning phase

**Target Launch:** 8 weeks from development start (Beta with 50 users)

---

## Technical Architecture

### System Architecture Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                    USER APPLICATIONS                        │
│  ┌──────────────────┐              ┌────────────────────┐  │
│  │   Web App (PWA)  │              │   Mobile App       │  │
│  │   Vercel CDN     │              │   iOS + Android    │  │
│  │   React 18 +     │              │   React Native +   │  │
│  │   TypeScript     │              │   Expo             │  │
│  └────────┬─────────┘              └─────────┬──────────┘  │
└───────────┼──────────────────────────────────┼─────────────┘
            │                                  │
            │         HTTPS/WSS                │
            └───────────┬──────────────────────┘
                        │
            ┌───────────▼────────────────────────┐
            │    API GATEWAY / LOAD BALANCER     │
            │       Railway / Fly.io             │
            └───────────┬────────────────────────┘
                        │
            ┌───────────▼────────────────────────┐
            │      FASTAPI BACKEND               │
            │      Python 3.11+                  │
            │                                    │
            │  Routes:                           │
            │  ├─ /api/auth                      │
            │  ├─ /api/wallet                    │
            │  ├─ /api/remittance               │
            │  ├─ /api/payments                  │
            │  ├─ /api/cashout                   │
            │  └─ /api/merchants                 │
            └────┬──────────┬──────────┬─────────┘
                 │          │          │
     ┌───────────▼──┐  ┌───▼────┐  ┌──▼──────────┐
     │  Supabase    │  │ Redis  │  │   Celery    │
     │              │  │ Cache  │  │   Workers   │
     │ ├─PostgreSQL │  │        │  │             │
     │ ├─Auth (JWT) │  │ ├─Rate │  │ ├─Monitor   │
     │ ├─Storage    │  │ │ Limit│  │ │  ACH      │
     │ └─Realtime   │  │ ├─Queue│  │ ├─Monitor   │
     │              │  │ └─Cache│  │ │  Cash-out │
     └──────────────┘  └────────┘  │ ├─Hot Wallet│
                                    │ │  Alerts   │
                                    │ └─Reports   │
                                    └─────────────┘
                 │
     ┌───────────▼─────────────────────────────────┐
     │       EXTERNAL INTEGRATIONS                 │
     ├─────────────────────────────────────────────┤
     │                                             │
     │  ┌──────────┐  ┌───────────┐  ┌─────────┐ │
     │  │  Circle  │  │   Bitso   │  │ Stellar │ │
     │  │   API    │  │  Business │  │ Network │ │
     │  │          │  │           │  │ (USDC)  │ │
     │  │ USD→USDC │  │ USDC→MXN  │  │Transfer │ │
     │  └──────────┘  └───────────┘  └─────────┘ │
     │                                             │
     │  ┌──────────┐  ┌───────────┐  ┌─────────┐ │
     │  │  Twilio  │  │ SendGrid  │  │ Sentry  │ │
     │  │   SMS    │  │   Email   │  │ Errors  │ │
     │  └──────────┘  └───────────┘  └─────────┘ │
     └─────────────────────────────────────────────┘
```

---

### Frontend Architecture

#### Web App (PWA)

- **Framework:** React 18 + TypeScript
- **Build Tool:** Vite
- **Component Structure:**
  ```
  frontend-web/
  ├── src/
  │   ├── app/
  │   │   ├── features/
  │   │   │   ├── auth/
  │   │   │   │   ├── components/
  │   │   │   │   │   ├── LoginForm.tsx
  │   │   │   │   │   ├── RegisterForm.tsx
  │   │   │   │   │   └── VerifyOTP.tsx
  │   │   │   │   ├── hooks/
  │   │   │   │   │   └── useAuth.ts
  │   │   │   │   └── services/
  │   │   │   │       └── authService.ts
  │   │   │   ├── wallet/
  │   │   │   │   ├── components/
  │   │   │   │   │   ├── BalanceCard.tsx
  │   │   │   │   │   ├── TransactionList.tsx
  │   │   │   │   │   └── TransactionDetail.tsx
  │   │   │   │   ├── hooks/
  │   │   │   │   │   └── useWallet.ts
  │   │   │   │   └── services/
  │   │   │   │       └── walletService.ts
  │   │   │   ├── remittance/
  │   │   │   │   ├── components/
  │   │   │   │   │   ├── SendMoneyForm.tsx
  │   │   │   │   │   ├── RecipientSelector.tsx
  │   │   │   │   │   └── TransferStatus.tsx
  │   │   │   │   └── services/
  │   │   │   │       └── remittanceService.ts
  │   │   │   ├── payments/
  │   │   │   │   └── components/
  │   │   │   │       ├── QRScanner.tsx
  │   │   │   │       └── PaymentConfirm.tsx
  │   │   │   ├── cashout/
  │   │   │   │   └── components/
  │   │   │   │       ├── BankAccountForm.tsx
  │   │   │   │       ├── WithdrawForm.tsx
  │   │   │   │       └── WithdrawStatus.tsx
  │   │   │   └── merchant/
  │   │   │       └── components/
  │   │   │           ├── Dashboard.tsx
  │   │   │           ├── GenerateQR.tsx
  │   │   │           └── SalesReport.tsx
  │   │   ├── shared/
  │   │   │   ├── components/
  │   │   │   │   ├── Button.tsx
  │   │   │   │   ├── Input.tsx
  │   │   │   │   ├── Card.tsx
  │   │   │   │   ├── Modal.tsx
  │   │   │   │   └── Loading.tsx
  │   │   │   ├── layouts/
  │   │   │   │   ├── AppLayout.tsx
  │   │   │   │   ├── AuthLayout.tsx
  │   │   │   │   └── MerchantLayout.tsx
  │   │   │   └── utils/
  │   │   │       ├── formatters.ts
  │   │   │       └── validators.ts
  │   │   ├── core/
  │   │   │   ├── api/
  │   │   │   │   └── client.ts
  │   │   │   ├── store/
  │   │   │   │   ├── authStore.ts
  │   │   │   │   └── walletStore.ts
  │   │   │   └── types/
  │   │   │       └── index.ts
  │   │   └── routes/
  │   │       └── index.tsx
  │   ├── assets/
  │   │   ├── images/
  │   │   └── icons/
  │   ├── styles/
  │   │   └── global.css
  │   └── main.tsx
  ├── public/
  │   └── manifest.json
  └── package.json
  ```
- **State Management:**
  - Server state: TanStack Query
  - Client state: Zustand
- **Routing:** React Router v6 with protected routes
- **Build Optimization:** Code splitting, lazy loading

#### Mobile App (iOS/Android)

- **Framework:** React Native + TypeScript
- **Platform:** Expo (managed workflow)
- **Component Structure:**
  ```
  frontend-mobile/
  ├── app/
  │   ├── (auth)/
  │   │   ├── login.tsx
  │   │   ├── register.tsx
  │   │   └── verify-otp.tsx
  │   ├── (tabs)/
  │   │   ├── index.tsx         # Home/Wallet
  │   │   ├── send.tsx          # Send money
  │   │   ├── payments.tsx      # NFC payments
  │   │   └── profile.tsx       # User profile
  │   ├── merchant/
  │   │   ├── index.tsx         # Merchant dashboard
  │   │   ├── generate-qr.tsx
  │   │   └── sales.tsx
  │   └── _layout.tsx
  ├── components/
  │   ├── auth/
  │   ├── wallet/
  │   ├── payments/
  │   └── shared/
  ├── services/
  │   ├── api.ts
  │   ├── nfc.ts
  │   └── storage.ts
  ├── store/
  │   ├── authStore.ts
  │   └── walletStore.ts
  ├── utils/
  └── types/
  ```
- **State Management:** Same as web (TanStack Query + Zustand)
- **Native Features:**
  - expo-nfc (NFC payments)
  - expo-camera (QR scanning)
  - expo-notifications (Push)
  - expo-local-authentication (Biometrics v2)

---

### Backend Architecture

- **Framework:** FastAPI (Python 3.11+)
- **Folder Structure:**
  ```
  backend/
  ├── app/
  │   ├── api/
  │   │   ├── routes/
  │   │   │   ├── auth.py          # Authentication endpoints
  │   │   │   ├── wallet.py        # Wallet operations
  │   │   │   ├── remittance.py    # Remittance operations
  │   │   │   ├── payments.py      # NFC/QR payments
  │   │   │   ├── cashout.py       # Cash-out operations
  │   │   │   └── merchants.py     # Merchant operations
  │   │   └── deps.py              # Shared dependencies
  │   ├── core/
  │   │   ├── config.py            # Settings (env vars)
  │   │   ├── security.py          # JWT, hashing
  │   │   └── stellar.py           # Stellar client wrapper
  │   ├── integrations/
  │   │   ├── circle.py            # Circle API (USD→USDC)
  │   │   ├── bitso.py             # Bitso API (USDC→MXN)
  │   │   ├── supabase.py          # Supabase client
  │   │   └── twilio.py            # SMS OTP
  │   ├── models/
  │   │   ├── user.py              # SQLAlchemy models
  │   │   ├── wallet.py
  │   │   ├── transaction.py
  │   │   ├── cashout.py
  │   │   └── merchant.py
  │   ├── schemas/
  │   │   ├── user.py              # Pydantic schemas
  │   │   ├── wallet.py
  │   │   ├── transaction.py
  │   │   └── response.py
  │   ├── services/
  │   │   ├── wallet_service.py    # Business logic
  │   │   ├── remittance_service.py
  │   │   ├── payment_service.py
  │   │   ├── cashout_service.py
  │   │   └── kyc_service.py
  │   ├── tasks/
  │   │   ├── celery_app.py        # Celery config
  │   │   ├── wallet_tasks.py      # Background jobs
  │   │   ├── cashout_tasks.py
  │   │   └── alerts_tasks.py
  │   ├── middleware/
  │   │   ├── rate_limit.py
  │   │   ├── error_handler.py
  │   │   └── cors.py
  │   ├── utils/
  │   │   ├── validators.py
  │   │   ├── formatters.py
  │   │   └── helpers.py
  │   └── main.py                  # FastAPI app entry
  ├── alembic/                     # Database migrations
  │   ├── versions/
  │   └── env.py
  ├── tests/
  │   ├── test_api/
  │   ├── test_services/
  │   └── conftest.py
  ├── requirements.txt
  └── .env.example
  ```
- **API Design:** RESTful
- **Authentication:** JWT via Supabase Auth
- **Database ORM:** SQLAlchemy 2.0

---

### Database Design

- **Type:** PostgreSQL 15+ (Supabase hosted)

- **Main Tables:**

  - **users**: User accounts and KYC data
  - **wallets**: Internal balance tracking (custodial)
  - **transactions**: All transaction history
  - **cashout_requests**: Bank withdrawal requests
  - **merchants**: Merchant business accounts
  - **bank_accounts**: User bank account info
  - **audit_logs**: Security and compliance audit trail
  - **hot_wallet_balances**: Hot wallet monitoring

- **Key Indexes:**

  - `users.email` (unique)
  - `users.phone` (unique)
  - `wallets.user_id` (unique, foreign key)
  - `transactions.from_user_id` (foreign key)
  - `transactions.to_user_id` (foreign key)
  - `transactions.created_at` (DESC for sorting)
  - `transactions.stellar_tx_hash` (for lookups)
  - `cashout_requests.user_id, status` (compound for queries)
  - `audit_logs.user_id, created_at` (compound)

- **Relationships:**
  - User 1:1 Wallet
  - User 1:N Transactions (as sender)
  - User 1:N Transactions (as receiver)
  - User 1:N CashoutRequests
  - User 1:N BankAccounts
  - User 1:1 Merchant (optional)
  - Transaction 1:1 CashoutRequest (optional)

---

## Technology Stack

### Frontend (Web)

```yaml
Framework: React 18.2.0
Language: TypeScript 5.0+
Build Tool: Vite 5.0
UI Library: Tailwind CSS 3.3 + shadcn/ui
State Management:
  Server: TanStack Query (React Query) 5.0
  Client: Zustand 4.4
Forms: React Hook Form 7.48 + Zod 3.22
Routing: React Router 6.20
HTTP Client: Axios 1.6
PWA: vite-plugin-pwa + Workbox
i18n: react-i18next 13.5
Icons: Lucide React
Charts: Recharts 2.10 (for merchant analytics)
Testing:
  Unit: Vitest 1.0
  E2E: Playwright 1.40
Linting: ESLint 8.55 + Prettier 3.1
```

### Frontend (Mobile)

```yaml
Framework: React Native 0.73
Platform: Expo SDK 50
Language: TypeScript 5.0+
Routing: Expo Router 3.0 (file-based)
Styling: NativeWind 4.0 (Tailwind for RN)
State Management:
  Server: TanStack Query 5.0
  Client: Zustand 4.4
Native Features:
  - expo-nfc: 0.7.0 (NFC payments)
  - expo-camera: 14.0.0 (QR scanning)
  - expo-notifications: 0.24.0 (Push)
  - expo-local-authentication: 13.8.0 (Biometrics)
  - @react-native-community/netinfo: 11.0.0
HTTP Client: Axios 1.6
Testing:
  Unit: Jest 29.7
  E2E: Detox (optional v2)
Build: EAS (Expo Application Services)
```

### Backend

```yaml
Language: Python 3.11+
Framework: FastAPI 0.104.1
ASGI Server: Uvicorn 0.24.0
Database: PostgreSQL 15+ (Supabase)
ORM: SQLAlchemy 2.0.23
Database Driver: asyncpg 0.29.0
Migrations: Alembic 1.13.0
Authentication: Supabase Auth (JWT)
Cache: Redis 7+ (via redis-py 5.0.1)
Queue: Celery 5.3.4 + Redis
Blockchain: stellar-sdk 9.1.0
External APIs:
  - Circle API (requests 2.31.0)
  - Bitso API (requests 2.31.0)
  - Twilio (twilio 8.10.0)
  - SendGrid (sendgrid 6.10.0)
Validation: Pydantic 2.5.0
Security:
  - python-jose 3.3.0 (JWT)
  - passlib 1.7.4 (password hashing)
  - bcrypt 4.1.1
Error Tracking: sentry-sdk 1.40.0
Logging: Python logging + structlog
Testing: Pytest 7.4.3 + httpx 0.25.2
API Docs: FastAPI auto-generated (OpenAPI/Swagger)
```

### DevOps & Tools

```yaml
Version Control: Git + GitHub
CI/CD: GitHub Actions
Hosting:
  Web: Vercel (auto CDN, edge functions)
  Mobile: EAS (build + submit)
  Backend: Railway or Fly.io
  Database: Supabase
  Cache: Redis (included Railway/Fly.io)
Container: Docker (Railway/Fly.io managed)
Monitoring:
  Errors: Sentry
  Logs: Railway/Fly.io logs
  Alerts: Telegram Bot
  APM: Railway/Fly.io metrics
Analytics: PostHog (optional)
Package Managers:
  Web: pnpm
  Mobile: npm/yarn
  Backend: pip + venv
Linting:
  Frontend: ESLint + Prettier
  Backend: Black + isort + flake8
Environment: dotenv (python-dotenv)
```

---

## Code Conventions

### Naming Conventions

#### Frontend (React/TypeScript)

```typescript
// Components
components/Button.tsx          // PascalCase
components/TransactionList.tsx

// Hooks
hooks/useAuth.ts              // camelCase with 'use' prefix
hooks/useWallet.ts

// Services
services/walletService.ts     // camelCase
services/apiClient.ts

// Types/Interfaces
types/User.ts                 // PascalCase
interface User { ... }
type Transaction = { ... }

// Constants
constants/APP_CONFIG.ts       // UPPER_SNAKE_CASE
export const API_BASE_URL = "..."

// Utils
utils/formatCurrency.ts       // camelCase
utils/validators.ts
```

#### Backend (Python)

```python
# Modules/files
models/user.py               # snake_case
services/wallet_service.py

# Classes
class User(Base):            # PascalCase
class WalletService:

# Functions
def get_user_balance():      # snake_case
async def process_transaction():

# Constants
API_VERSION = "v1"           # UPPER_SNAKE_CASE
MAX_TRANSACTION_AMOUNT = 10000

# Private methods
def _internal_helper():      # leading underscore
```

---

### Git Commit Format

```
type(scope): subject

Types:
- feat: New feature
- fix: Bug fix
- docs: Documentation only
- style: Code formatting (no logic change)
- refactor: Code restructuring (no feature change)
- perf: Performance improvement
- test: Adding/updating tests
- chore: Build process, dependencies
- security: Security fixes

Scopes:
- auth: Authentication
- wallet: Wallet operations
- payments: NFC/QR payments
- cashout: Cash-out operations
- stellar: Blockchain integration
- ui: User interface
- api: Backend API

Examples:
feat(wallet): add real-time balance updates via websocket
fix(payments): resolve NFC session timeout issue
docs(api): update cashout endpoint documentation
refactor(stellar): extract transaction signing to separate service
```

---

### API Response Format

#### Success Response

```json
{
  "success": true,
  "data": {
    "user": {
      "id": "uuid",
      "email": "user@example.com"
    }
  },
  "error": null,
  "timestamp": "2025-10-15T10:30:00Z"
}
```

#### Error Response

```json
{
  "success": false,
  "data": null,
  "error": {
    "code": "INSUFFICIENT_BALANCE",
    "message": "Insufficient balance for this transaction",
    "details": {
      "balance": "100.50",
      "required": "500.00"
    }
  },
  "timestamp": "2025-10-15T10:30:00Z"
}
```

#### Pagination Response

```json
{
  "success": true,
  "data": {
    "results": [...],
    "pagination": {
      "page": 1,
      "limit": 20,
      "total": 150,
      "pages": 8
    }
  }
}
```

---

### Error Handling Pattern

#### Backend (FastAPI)

```python
from fastapi import HTTPException
from app.schemas.response import ErrorResponse

# Service layer
async def transfer_money(from_user: UUID, to_user: UUID, amount: Decimal):
    try:
        # Check balance
        wallet = await get_wallet(from_user)
        if wallet.balance_usdc < amount:
            raise InsufficientBalanceError(
                balance=wallet.balance_usdc,
                required=amount
            )

        # Process transfer
        transaction = await create_transaction(...)
        await update_balances(...)

        return transaction

    except InsufficientBalanceError as e:
        raise HTTPException(
            status_code=400,
            detail={
                "code": "INSUFFICIENT_BALANCE",
                "message": str(e),
                "details": {"balance": e.balance, "required": e.required}
            }
        )
    except Exception as e:
        logger.error(f"Transfer failed: {str(e)}", exc_info=True)
        raise HTTPException(
            status_code=500,
            detail={
                "code": "INTERNAL_ERROR",
                "message": "Transaction failed. Please try again."
            }
        )

# Route handler
@router.post("/transfer")
async def transfer_endpoint(request: TransferRequest):
    result = await transfer_money(
        from_user=request.from_user,
        to_user=request.to_user,
        amount=request.amount
    )
    return {
        "success": True,
        "data": result,
        "timestamp": datetime.utcnow().isoformat()
    }
```

#### Frontend (React)

```typescript
// Using React Query
const {
  mutate: transferMoney,
  isLoading,
  error,
} = useMutation({
  mutationFn: (data: TransferRequest) =>
    apiClient.post("/api/wallet/transfer", data),
  onSuccess: (response) => {
    toast.success("Transfer successful!");
    queryClient.invalidateQueries(["wallet", "balance"]);
  },
  onError: (error: AxiosError<ErrorResponse>) => {
    const errorCode = error.response?.data?.error?.code;

    if (errorCode === "INSUFFICIENT_BALANCE") {
      toast.error("Insufficient balance");
    } else {
      toast.error("Transfer failed. Please try again.");
    }

    // Log to Sentry
    Sentry.captureException(error);
  },
});
```

---

## Environment Configuration

### Backend Environment Variables (.env)

```bash
# Server
NODE_ENV=development
PORT=8000
API_VERSION=v1
DEBUG=True

# Database (Supabase)
DATABASE_URL=postgresql://user:pass@host:5432/dbname
SUPABASE_URL=https://xxx.supabase.co
SUPABASE_KEY=xxx
SUPABASE_JWT_SECRET=xxx

# Redis
REDIS_URL=redis://localhost:6379/0

# Authentication
JWT_SECRET=your-secret-key-change-in-production
JWT_ALGORITHM=HS256
JWT_EXPIRE_MINUTES=1440  # 24 hours
REFRESH_TOKEN_EXPIRE_DAYS=30

# Stellar Blockchain
STELLAR_NETWORK=testnet  # 'testnet' or 'public'
STELLAR_HOT_WALLET_SECRET=SXXX...  # ENCRYPTED IN RAILWAY SECRETS
STELLAR_COLD_WALLET_PUBLIC=GXXX...
STELLAR_USDC_ISSUER=GBBD47IF6LWK7P7MDEVSCWR7DPUWV3NY3DTQEVFL4NAT4AQH3ZLLFLA5

# Circle (USD → USDC)
CIRCLE_API_KEY=xxx
CIRCLE_ACCOUNT_ID=xxx
CIRCLE_API_BASE_URL=https://api-sandbox.circle.com/v1  # sandbox for testing

# Bitso (USDC → MXN, Cash-out)
BITSO_API_KEY=xxx
BITSO_API_SECRET=xxx
BITSO_API_BASE_URL=https://api.bitso.com/v3
BITSO_STELLAR_DEPOSIT_ADDRESS=GXXX...

# Twilio (SMS OTP)
TWILIO_ACCOUNT_SID=xxx
TWILIO_AUTH_TOKEN=xxx
TWILIO_PHONE_NUMBER=+1234567890

# SendGrid (Email)
SENDGRID_API_KEY=xxx
SENDGRID_FROM_EMAIL=noreply@yourapp.com
SENDGRID_FROM_NAME=YourApp

# Sentry (Error Tracking)
SENTRY_DSN=https://xxx@sentry.io/xxx
SENTRY_ENVIRONMENT=development

# Telegram (Alerts)
TELEGRAM_BOT_TOKEN=xxx
TELEGRAM_CHAT_ID=xxx

# Rate Limiting
RATE_LIMIT_PER_MINUTE=60
RATE_LIMIT_PER_HOUR=1000

# Hot Wallet Limits
HOT_WALLET_MIN_BALANCE=20000  # $20k USD
HOT_WALLET_MAX_BALANCE=100000 # $100k USD
HOT_WALLET_ALERT_THRESHOLD=0.3  # Alert at 30% capacity

# KYC Limits (USDC)
KYC_PENDING_DAILY_LIMIT=100
KYC_PENDING_MONTHLY_LIMIT=500
KYC_APPROVED_DAILY_LIMIT=10000
KYC_APPROVED_MONTHLY_LIMIT=50000

# CORS
FRONTEND_WEB_URL=http://localhost:5173
FRONTEND_MOBILE_URL=exp://localhost:8081
ALLOWED_ORIGINS=http://localhost:5173,http://localhost:3000

# File Upload
MAX_UPLOAD_SIZE_MB=5
ALLOWED_FILE_TYPES=image/jpeg,image/png,application/pdf

# Celery (Background Jobs)
CELERY_BROKER_URL=redis://localhost:6379/0
CELERY_RESULT_BACKEND=redis://localhost:6379/0
```

### Frontend Environment Variables

#### Web (environment.ts)

```typescript
export const environment = {
  production: false,
  apiUrl: "http://localhost:8000/api/v1",
  wsUrl: "ws://localhost:8000/ws",
  supabaseUrl: "https://xxx.supabase.co",
  supabaseKey: "xxx",
  sentryDsn: "https://xxx@sentry.io/xxx",
  appVersion: "1.0.0",
  features: {
    biometricAuth: false, // MVP: disabled
    instantRemittance: false, // MVP: disabled, v2 only
  },
};
```

#### Mobile (app.config.js)

```javascript
export default {
  expo: {
    name: "YourApp",
    slug: "yourapp",
    version: "1.0.0",
    extra: {
      apiUrl: process.env.API_URL || "http://localhost:8000/api/v1",
      supabaseUrl: process.env.SUPABASE_URL,
      supabaseKey: process.env.SUPABASE_KEY,
      sentryDsn: process.env.SENTRY_DSN,
    },
    plugins: [
      "expo-router",
      [
        "expo-build-properties",
        {
          ios: {
            deploymentTarget: "13.0",
            infoPlist: {
              NFCReaderUsageDescription: "We need NFC to process payments",
            },
          },
          android: {
            minSdkVersion: 21,
            usesCleartextTraffic: true,
          },
        },
      ],
    ],
  },
};
```

---

## API Design Patterns

### RESTful Endpoints Structure

#### Authentication

```
POST   /api/v1/auth/register          # Create account
POST   /api/v1/auth/login             # Login (get JWT)
POST   /api/v1/auth/refresh           # Refresh token
POST   /api/v1/auth/logout            # Logout
POST   /api/v1/auth/verify-email      # Verify email
POST   /api/v1/auth/verify-phone      # Verify phone with OTP
POST   /api/v1/auth/forgot-password   # Request password reset
POST   /api/v1/auth/reset-password    # Reset password with token
```

#### Wallet

```
GET    /api/v1/wallet/balance                  # Get balance
GET    /api/v1/wallet/transactions             # Get transaction history
GET    /api/v1/wallet/transactions/:id         # Get transaction detail
POST   /api/v1/wallet/transfer                 # P2P transfer
```

#### Remittance

```
POST   /api/v1/remittance/send                 # Send remittance
GET    /api/v1/remittance/quote                # Get quote
GET    /api/v1/remittance/:id/status           # Check status
GET    /api/v1/remittance/recipients           # Get saved recipients
POST   /api/v1/remittance/recipients           # Add recipient
```

#### Payments (NFC/QR)

```
POST   /api/v1/payments/nfc/create-session     # Merchant: create session
POST   /api/v1/payments/nfc/confirm            # Customer: confirm payment
POST   /api/v1/payments/qr/generate            # Merchant: generate QR
POST   /api/v1/payments/qr/scan                # Customer: scan QR
GET    /api/v1/payments/:id                    # Get payment details
```

#### Cash-out

```
POST   /api/v1/cashout/request                 # Request withdrawal
GET    /api/v1/cashout/:id/status              # Check status
GET    /api/v1/cashout/history                 # Withdrawal history
POST   /api/v1/cashout/bank-accounts           # Add bank account
GET    /api/v1/cashout/bank-accounts           # List bank accounts
DELETE /api/v1/cashout/bank-accounts/:id       # Remove bank account
```

#### Merchant

```
GET    /api/v1/merchants/dashboard             # Dashboard stats
GET    /api/v1/merchants/sales                 # Sales history
GET    /api/v1/merchants/sales/today           # Today's sales
GET    /api/v1/merchants/sales/report          # Generate report
POST   /api/v1/merchants/cashout               # Merchant cash-out
```

#### Admin (Internal)

```
GET    /api/v1/admin/users                     # List all users
GET    /api/v1/admin/users/:id                 # Get user details
PATCH  /api/v1/admin/users/:id/kyc             # Approve/reject KYC
POST   /api/v1/admin/users/:id/suspend         # Suspend user
GET    /api/v1/admin/transactions              # All transactions
GET    /api/v1/admin/hot-wallet/balance        # Hot wallet status
POST   /api/v1/admin/hot-wallet/replenish      # Trigger replenishment
GET    /api/v1/admin/analytics                 # Platform analytics
```

### Query Parameters Convention

```
# Pagination
?page=1&limit=20

# Sorting
?sort=created_at&order=desc

# Filtering
?status=completed&type=remittance_inbound

# Date range
?start_date=2025-10-01&end_date=2025-10-31

# Search
?search=john

# Multiple filters
?status=completed&type=nfc_payment&page=2&limit=50
```

---

## Security Standards

### Authentication & Authorization

- **JWT with Refresh Tokens:**
  - Access token: 24 hours
  - Refresh token: 30 days with rotation
  - Stored in httpOnly cookies (web) or secure storage (mobile)
- **Role-Based Access Control (RBAC):**
  - Roles: user, merchant, admin
  - Permissions checked at route level
- **Session Management:**
  - Redis-backed sessions
  - Logout invalidates tokens
  - Concurrent session detection
- **2FA (Optional v2):**
  - SMS OTP
  - Authenticator app (TOTP)

### Data Protection

```python
# Input Validation (Pydantic)
class TransferRequest(BaseModel):
    to_user_id: UUID
    amount: Decimal = Field(gt=0, le=10000)
    note: Optional[str] = Field(max_length=200)

    @validator('amount')
    def validate_amount(cls, v):
        if v <= 0:
            raise ValueError('Amount must be positive')
        return v

# SQL Injection Prevention (SQLAlchemy)
# Always use ORM or parameterized queries
stmt = select(User).where(User.email == email)
result = await session.execute(stmt)

# XSS Prevention
# FastAPI auto-escapes JSON responses
# Frontend: React auto-escapes JSX

# CSRF Protection
# Stateless JWT = no CSRF vulnerability
# For state-changing operations: verify token freshness

# Rate Limiting
@router.post("/transfer")
@limiter.limit("10/minute")
async def transfer(...):
    ...
```

### Security Headers

```python
# FastAPI middleware
from fastapi.middleware.cors import CORSMiddleware
from fastapi.middleware.trustedhost import TrustedHostMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=[settings.FRONTEND_WEB_URL],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Security headers (via middleware)
@app.middleware("http")
async def add_security_headers(request, call_next):
    response = await call_next(request)
    response.headers["X-Content-Type-Options"] = "nosniff"
    response.headers["X-Frame-Options"] = "DENY"
    response.headers["X-XSS-Protection"] = "1; mode=block"
    response.headers["Strict-Transport-Security"] = "max-age=31536000; includeSubDomains"
    return response
```

### Secrets Management

```python
# NEVER in code
hot_wallet_secret = "SXXX..."  # ❌ WRONG

# Railway/Fly.io Secrets (CLI)
railway variables set STELLAR_HOT_WALLET_SECRET="SXXX..."

# Access in code
from app.core.config import settings
hot_wallet_secret = settings.STELLAR_HOT_WALLET_SECRET  # ✅ CORRECT

# Supabase Vault (alternative)
from supabase import create_client
secret = supabase.rpc('get_secret', {'name': 'stellar_hot_wallet'})
```

---

## Performance Optimization

### Backend Optimization

```python
# Database Query Optimization
# 1. Use select() for specific columns
stmt = select(Transaction.id, Transaction.amount).where(...)

# 2. Eager loading relationships
stmt = select(Transaction).options(
    joinedload(Transaction.from_user),
    joinedload(Transaction.to_user)
)

# 3. Connection pooling (SQLAlchemy)
engine = create_async_engine(
    DATABASE_URL,
    pool_size=20,
    max_overflow=0,
    pool_pre_ping=True
)

# 4. Pagination
@router.get("/transactions")
async def get_transactions(page: int = 1, limit: int = 20):
    offset = (page - 1) * limit
    stmt = select(Transaction).limit(limit).offset(offset)
    ...

# 5. Caching with Redis
@cached(ttl=30)  # Cache for 30 seconds
async def get_usdc_mxn_rate():
    rate = await fetch_rate_from_bitso()
    return rate

# 6. Index usage
# Already defined in models with index=True
# Compound indexes in alembic migrations
```

### Frontend Optimization

```typescript
// 1. Code Splitting (React.lazy)
const MerchantDashboard = lazy(() => import("./features/merchant/Dashboard"));

// 2. Memoization
const MemoizedTransactionList = memo(TransactionList);

const calculateTotal = useMemo(() => {
  return transactions.reduce((sum, tx) => sum + tx.amount, 0);
}, [transactions]);

// 3. Virtualization for long lists
import { VirtualList } from "@tanstack/react-virtual";

// 4. Image Optimization
<img
  src={image}
  loading="lazy"
  srcSet="image-small.jpg 480w, image-large.jpg 800w"
/>;

// 5. Service Worker (PWA)
// Configured via vite-plugin-pwa
// Caches static assets automatically

// 6. React Query caching
const { data } = useQuery({
  queryKey: ["balance"],
  queryFn: fetchBalance,
  staleTime: 30000, // 30 seconds
  cacheTime: 300000, // 5 minutes
});
```

### Monitoring Metrics

```yaml
Backend (Target):
  - API p95 latency: < 200ms
  - API p99 latency: < 500ms
  - Database query p95: < 100ms
  - Error rate: < 0.5%
  - Uptime: > 99.9%

Frontend (Target):
  - FCP (First Contentful Paint): < 1.5s
  - LCP (Largest Contentful Paint): < 2.5s
  - FID (First Input Delay): < 100ms
  - CLS (Cumulative Layout Shift): < 0.1
  - Bundle size: < 200KB gzipped

Mobile (Target):
  - App launch time: < 2s
  - Screen render time: < 500ms
  - Crash rate: < 0.1%
  - ANR rate: < 0.05%
```

---

## Testing Strategy

### Unit Testing

#### Backend (Pytest)

```python
# tests/test_services/test_wallet_service.py
import pytest
from decimal import Decimal
from app.services.wallet_service import WalletService

@pytest.mark.asyncio
async def test_transfer_success(db_session, test_users):
    service = WalletService(db_session)

    # Arrange
    from_user = test_users[0]
    to_user = test_users[1]
    amount = Decimal("100.50")

    # Act
    transaction = await service.transfer(
        from_user_id=from_user.id,
        to_user_id=to_user.id,
        amount=amount
    )

    # Assert
    assert transaction.status == "completed"
    assert transaction.amount == amount

    # Verify balances updated
    from_wallet = await service.get_wallet(from_user.id)
    to_wallet = await service.get_wallet(to_user.id)
    assert from_wallet.balance_usdc == Decimal("399.50")  # 500 - 100.50
    assert to_wallet.balance_usdc == Decimal("100.50")

@pytest.mark.asyncio
async def test_transfer_insufficient_balance(db_session, test_users):
    service = WalletService(db_session)

    with pytest.raises(InsufficientBalanceError):
        await service.transfer(
            from_user_id=test_users[0].id,
            to_user_id=test_users[1].id,
            amount=Decimal("1000.00")  # More than balance
        )

# Coverage target: >80%
```

#### Frontend (Vitest)

```typescript
// tests/components/TransactionList.test.tsx
import { render, screen } from "@testing-library/react";
import { TransactionList } from "@/features/wallet/components/TransactionList";

describe("TransactionList", () => {
  const mockTransactions = [
    {
      id: "1",
      type: "remittance_inbound",
      amount: "500.00",
      status: "completed",
      created_at: "2025-10-15T10:00:00Z",
    },
  ];

  it("renders transactions correctly", () => {
    render(<TransactionList transactions={mockTransactions} />);

    expect(screen.getByText("$500.00")).toBeInTheDocument();
    expect(screen.getByText("Remittance Received")).toBeInTheDocument();
  });

  it("shows empty state when no transactions", () => {
    render(<TransactionList transactions={[]} />);

    expect(screen.getByText("No transactions yet")).toBeInTheDocument();
  });
});

// Coverage target: >80%
```

### Integration Testing

#### API Tests (Pytest + httpx)

```python
# tests/test_api/test_wallet_routes.py
import pytest
from httpx import AsyncClient

@pytest.mark.asyncio
async def test_get_balance(client: AsyncClient, auth_headers):
    response = await client.get(
        "/api/v1/wallet/balance",
        headers=auth_headers
    )

    assert response.status_code == 200
    data = response.json()
    assert data["success"] is True
    assert "balance_usdc" in data["data"]

@pytest.mark.asyncio
async def test_transfer_endpoint(client: AsyncClient, auth_headers, test_users):
    payload = {
        "to_user_id": str(test_users[1].id),
        "amount": "100.00",
        "note": "Test transfer"
    }

    response = await client.post(
        "/api/v1/wallet/transfer",
        json=payload,
        headers=auth_headers
    )

    assert response.status_code == 200
    data = response.json()
    assert data["success"] is True
    assert data["data"]["transaction"]["status"] == "completed"
```

### E2E Testing (Playwright)

```typescript
// tests/e2e/remittance.spec.ts
import { test, expect } from "@playwright/test";

test.describe("Send Remittance Flow", () => {
  test("should send money successfully", async ({ page }) => {
    // Login
    await page.goto("/login");
    await page.fill('input[name="email"]', "sender@example.com");
    await page.fill('input[name="password"]', "password123");
    await page.click('button[type="submit"]');

    // Navigate to send money
    await page.click("text=Send Money");

    // Fill form
    await page.fill('input[name="phone"]', "+525512345678");
    await page.fill('input[name="amount"]', "500");

    // Verify fee calculation
    await expect(page.locator("text=/Total: \\$510.00/")).toBeVisible();

    // Submit
    await page.click('button:has-text("Send")');

    // Wait for success
    await expect(page.locator("text=/Transfer initiated/")).toBeVisible();

    // Verify transaction appears in history
    await page.click("text=History");
    await expect(page.locator("text=/\\$500.00/")).toBeVisible();
  });
});

// Critical flows to test:
// 1. Send remittance (USA → Mexico)
// 2. NFC payment (customer → merchant)
// 3. Cash-out (wallet → bank)
// 4. P2P transfer
// 5. Merchant generate QR
```

### Performance Testing (k6)

```javascript
// tests/load/api_load.js
import http from "k6/http";
import { check, sleep } from "k6";

export let options = {
  stages: [
    { duration: "2m", target: 100 }, // Ramp up to 100 users
    { duration: "5m", target: 100 }, // Stay at 100 users
    { duration: "2m", target: 0 }, // Ramp down
  ],
  thresholds: {
    http_req_duration: ["p(95)<200"], // 95% of requests < 200ms
    http_req_failed: ["rate<0.01"], // Error rate < 1%
  },
};

export default function () {
  let response = http.get("https://api.yourapp.com/api/v1/wallet/balance", {
    headers: { Authorization: "Bearer token" },
  });

  check(response, {
    "status is 200": (r) => r.status === 200,
    "response time < 200ms": (r) => r.timings.duration < 200,
  });

  sleep(1);
}

// Run: k6 run api_load.js
```

---

## Deployment Architecture

### Development Environment

```yaml
Frontend Web:
  - Local: npm run dev (Vite dev server)
  - URL: http://localhost:5173
  - Hot reload: Enabled
  - Source maps: Enabled

Frontend Mobile:
  - Local: npx expo start
  - URL: exp://localhost:8081
  - Hot reload: Enabled
  - Expo Go app for testing

Backend:
  - Local: uvicorn app.main:app --reload
  - URL: http://localhost:8000
  - Debug mode: Enabled
  - Auto-reload: Enabled

Database:
  - Supabase (hosted)
  - Or local PostgreSQL via Docker

Redis:
  - Docker: docker run -p 6379:6379 redis

External Services:
  - Stellar: Testnet
  - Circle: Sandbox
  - Bitso: Sandbox/Demo
```

### Staging Environment

```yaml
Frontend Web:
  - Host: Vercel (auto-deploy from 'staging' branch)
  - URL: https://staging.yourapp.com
  - Environment: staging
  - Preview deployments: Enabled

Frontend Mobile:
  - Build: EAS Build (development profile)
  - Distribution: Internal testing (TestFlight, Firebase App Distribution)

Backend:
  - Host: Railway/Fly.io (staging environment)
  - URL: https://api-staging.yourapp.com
  - Replicas: 1
  - Resources: 512MB RAM, 0.5 CPU
  - Auto-deploy: From 'staging' branch

Database:
  - Supabase (separate staging project)
  - Sanitized production data

Monitoring:
  - Sentry: staging environment
  - Logs: Railway/Fly.io dashboard
```

### Production Environment

```yaml
Frontend Web:
  - Host: Vercel (auto-deploy from 'main' branch)
  - URL: https://app.yourapp.com
  - CDN: Automatic (Vercel Edge Network)
  - SSL: Auto-managed
  - Environment: production

Frontend Mobile:
  - Build: EAS Build (production profile)
  - Distribution: App Store + Google Play
  - OTA Updates: Enabled (Expo Updates)

Backend:
  - Host: Railway/Fly.io (production environment)
  - URL: https://api.yourapp.com
  - Replicas: 2+ (auto-scaling)
  - Resources: 2GB RAM, 1 CPU (per replica)
  - Load Balancer: Included
  - Health checks: Enabled (/health endpoint)

Database:
  - Supabase (Pro plan)
  - Backup: Daily automated
  - Retention: 30 days
  - Point-in-time recovery: Enabled

Redis:
  - Railway/Fly.io managed Redis
  - Persistence: Enabled
  - Max memory: 1GB

Monitoring:
  - Sentry: production environment
  - Uptime: UptimeRobot / Better Uptime
  - Alerts: Telegram bot
  - APM: Railway/Fly.io metrics
  - Logs: Centralized logging
```

---

### CI/CD Pipeline

```yaml
# .github/workflows/ci.yml

name: CI/CD Pipeline

on:
  push:
    branches: [main, staging, develop]
  pull_request:
    branches: [main, staging]

jobs:
  # Backend Pipeline
  backend-test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - name: Setup Python
        uses: actions/setup-python@v4
        with:
          python-version: "3.11"

      - name: Install dependencies
        run: |
          cd backend
          pip install -r requirements.txt
          pip install pytest pytest-asyncio

      - name: Run linting
        run: |
          cd backend
          black --check .
          isort --check-only .
          flake8 .

      - name: Run unit tests
        run: |
          cd backend
          pytest tests/ --cov=app --cov-report=xml

      - name: Upload coverage
        uses: codecov/codecov-action@v3

  backend-deploy:
    needs: backend-test
    if: github.ref == 'refs/heads/main'
    runs-on: ubuntu-latest
    steps:
      - name: Deploy to Railway
        uses: railway/deploy@v1
        with:
          railway-token: ${{ secrets.RAILWAY_TOKEN }}
          service: backend

  # Frontend Web Pipeline
  frontend-web-test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: "18"

      - name: Install dependencies
        run: |
          cd frontend-web
          pnpm install

      - name: Run linting
        run: |
          cd frontend-web
          pnpm lint

      - name: Run tests
        run: |
          cd frontend-web
          pnpm test

      - name: Build
        run: |
          cd frontend-web
          pnpm build

  frontend-web-deploy:
    needs: frontend-web-test
    if: github.ref == 'refs/heads/main'
    runs-on: ubuntu-latest
    steps:
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
          vercel-args: "--prod"

  # Frontend Mobile Pipeline
  frontend-mobile-build:
    if: github.ref == 'refs/heads/main'
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: "18"

      - name: Setup Expo
        uses: expo/expo-github-action@v8
        with:
          expo-version: latest
          token: ${{ secrets.EXPO_TOKEN }}

      - name: Install dependencies
        run: |
          cd frontend-mobile
          npm install

      - name: Build (EAS)
        run: |
          cd frontend-mobile
          eas build --platform all --non-interactive --no-wait

  # E2E Tests (Post-Deploy)
  e2e-tests:
    needs: [backend-deploy, frontend-web-deploy]
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3

      - name: Install Playwright
        run: |
          cd frontend-web
          npx playwright install --with-deps

      - name: Run E2E tests
        run: |
          cd frontend-web
          npm run test:e2e
        env:
          BASE_URL: https://app.yourapp.com
```

---

## Scaling Strategy

### Horizontal Scaling (MVP → 10k users)

```yaml
Load Balancer:
  - Railway/Fly.io automatic
  - Round-robin distribution
  - Health check: GET /health

Backend Replicas:
  - MVP: 1 instance
  - 1k users: 2 instances
  - 10k users: 3-5 instances
  - Auto-scaling policy:
      CPU: > 70% for 5 min → scale up
      Memory: > 80% → scale up

Stateless Design:
  - Session in Redis (not in-memory)
  - No local file storage (use Supabase Storage)
  - JWT tokens (no server-side session)

Database:
  - Read replicas for scaling reads
  - Connection pooling (20 connections per instance)
```

### Vertical Scaling (10k → 100k users)

```yaml
Backend Resources:
  - 10k users: 512MB RAM, 0.5 CPU
  - 50k users: 2GB RAM, 1 CPU
  - 100k users: 4GB RAM, 2 CPU

Database:
  - Supabase Pro → Team plan
  - Dedicated resources
  - More concurrent connections

Redis:
  - 10k users: 256MB
  - 50k users: 1GB
  - 100k users: 2GB
```

### Caching Strategy

```python
# 1. Database Query Results (Redis)
@cached(ttl=60)  # 1 minute
async def get_trending_merchants():
    return await db.query(...)

# 2. API Responses (Redis)
@cached(ttl=30)  # 30 seconds
async def get_exchange_rate():
    return await bitso.get_rate()

# 3. User Sessions (Redis)
# Already handled by auth system

# 4. Static Assets (CDN)
# Vercel automatic CDN for web
# Supabase Storage + CDN for uploads

# 5. Hot Wallet Balance (Redis)
await redis.set('hot_wallet:balance', balance, ex=10)  # 10 sec
```

### Database Optimization

```python
# 1. Partitioning (by date)
# Create partitions for transactions table
CREATE TABLE transactions_2025_10 PARTITION OF transactions
FOR VALUES FROM ('2025-10-01') TO ('2025-11-01');

# 2. Archiving old data
# Move transactions >1 year to archive table
# Keep main table lean

# 3. Compound indexes
CREATE INDEX idx_transactions_user_date
ON transactions(user_id, created_at DESC);

# 4. Query optimization
# Use EXPLAIN ANALYZE to find slow queries
# Add indexes as needed
```

---

**Document Status:**

- **Created:** October 15, 2025
- **Last Updated:** October 15, 2025
- **Version:** 1.0
- **Maintained by:** Engineering Team
- **Next Review:** Weekly during development
