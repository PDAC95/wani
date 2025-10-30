# CLAUDE.md - Wani Development Rules

**Version:** 1.0
**Last Updated:** 2024-12-20
**Current Sprint:** Sprint 1
**Sprint Goal:** "Establecer infraestructura completa del proyecto y permitir que usuarios se registren, autentiquen y tengan wallet Stellar lista."

---

## 💻 ENVIRONMENT NOTES

### Development Environment
- **Operating System:** Windows
- **Shell:** PowerShell (NOT Bash)
- **Backend Port:** 9000 (http://localhost:9000)
- **Mobile Testing:** Using `npx expo start --tunnel` (computer and phone not on same network)
- **Important:** All shell commands should be PowerShell-compatible

### Backend Server Startup (CRITICAL)
⚠️ **ALWAYS use `run_server.py` to start the backend server:**
```powershell
cd backend
./venv/Scripts/python.exe run_server.py
```

❌ **DO NOT run uvicorn directly** - it bypasses the Windows event loop configuration required for psycopg3:
```powershell
# DON'T DO THIS:
uvicorn app.main:app --host 0.0.0.0 --port 9000
```

**Why:** The backend uses psycopg3 async driver which requires SelectorEventLoop on Windows. The `run_server.py` script configures the event loop BEFORE uvicorn starts, which is essential for proper database connectivity.

---

## 🎯 CURRENT SPRINT CONTEXT (Updated each sprint)

### Sprint Information

- **Sprint Number:** 1
- **Sprint Goal:** Establecer infraestructura completa del proyecto y permitir que usuarios se registren, autentiquen y tengan wallet Stellar lista
- **Sprint Duration:** 2024-12-23 to 2025-01-03 (2 weeks)
- **Days Remaining:** 10 days
- **Current Day:** Day 1 of 10

### Active User Stories

1. **US-000:** Project Infrastructure Setup - 13 SP - Status: Not Started (CRITICAL)
2. **US-001:** User Registration with Email/Password - 5 SP - Status: Not Started
3. **US-002:** User Login & JWT Token Management - 5 SP - Status: Not Started
4. **US-003:** KYC Basic - Document Upload - 8 SP - Status: Not Started
5. **US-004:** Create Stellar Wallet Automatically - 8 SP - Status: Not Started
6. **US-005:** View Wallet Balance (MXN) - 3 SP - Status: Not Started

### Next Priority Task

**TASK-001** - Create GitHub repository and clone locally

- Priority: P0 (CRITICAL - blocks everything)
- Estimated: XS (15 min)
- Description: Create repo "wani", add .gitignore (Python, Node, Env), clone to local
- Files: N/A
- Dependencies: None

### Sprint Health

- Progress: 0% complete (Day 1 starting)
- Status: 🟢 On Track (just starting)
- Blockers: 0 active

---

## 🚀 MANDATORY WORKFLOW

### START OF EVERY SESSION

**CRITICAL: Read files in this EXACT order:**

1. **CLAUDE.md** (this file - you're reading it now ✅)
2. **ARCHITECTURE.md** - Technical setup and conventions
3. **docs/sprints/sprint-01/tasks.md** - Find next P0 task to work on
4. **docs/sprints/sprint-01/planning.md** - Current sprint context
5. **PRODUCT-BACKLOG.md** - Overall product context

**Then announce your work plan:**

```
📋 Files loaded successfully.

Current Sprint: Sprint 1 - Foundation & Auth
Next Task: TASK-001 - Create GitHub repository
Priority: P0
Estimated Time: 15 min
Files to modify: Repository setup

Starting work...
```

### DURING DEVELOPMENT

#### Before Writing ANY Code

1. **Verify you're working on correct task:**

   - Is it the next P0 task from TASKS.md?
   - Or explicitly requested by user?

2. **Announce what you'll do:**

```
Modifying: backend/app/services/user_service.py
Component/Function: UserService.register()
Purpose: Implement user registration with email verification
User Story: US-001
Task: TASK-041
```

3. **Check constraints:**
   - Does it follow ARCHITECTURE.md conventions?
   - Does it respect folder structure?
   - Does it use correct naming?
   - Security considerations addressed?

#### While Coding

**ALWAYS:**

- Use try-catch for async operations (backend) / try-except (Python)
- Validate and sanitize ALL inputs using Pydantic (backend) or Zod (frontend)
- Check for null/undefined/None before using variables
- Follow exact conventions from ARCHITECTURE.md
- Add inline comments for complex logic (especially Stellar blockchain operations)
- Use environment variables for ALL configuration
- Implement proper error handling with user-friendly messages
- Follow API response format (see below)
- NEVER use localStorage/sessionStorage in React artifacts (not supported)

**NEVER:**

- Skip error handling
- Use console.log/print in production code
- Hardcode credentials, API keys, or secrets
- Delete code without commenting why
- Ignore TypeScript/Python type errors or linting errors
- Work outside current task scope
- Add packages without mentioning it explicitly
- Use localStorage/sessionStorage in Claude artifacts

#### After Each Change

1. **Test immediately:**

   - Run the code locally
   - Verify expected behavior
   - Check console/terminal for errors
   - Test edge cases (null, empty, invalid input)

2. **If error occurs:**
   - STOP
   - Copy EXACT error message
   - Note file and line number
   - Attempt to fix
   - If can't fix in 10 minutes → mark task as blocked

### END OF SESSION OR TASK COMPLETION

#### When Task is Complete

1. **Update TASKS.md immediately:**

```markdown
- ✅ [2024-12-23 10:30] TASK-001 [US-000] Create GitHub repository - Actual: 12min
  - Notes: Repo created at github.com/username/wani, .gitignore includes Python, Node, .env
```

2. **Move completed task to "Completed Tasks" section in TASKS.md**

3. **Announce completion:**

```
✅ Task TASK-001 completed

What was done:
- Created GitHub repository "wani"
- Added comprehensive .gitignore
- Cloned to local machine
- Verified git working correctly

Files modified:
- New repository created

Testing: Git commands tested, push/pull working
Ready for: TASK-002 (Create root folder structure)
```

#### Session Summary

At end of work session, provide:

```
📊 Session Summary

Duration: 2.5 hours
Tasks Completed: 3
- TASK-001: Create GitHub repository
- TASK-002: Create root folder structure
- TASK-003: Add documentation files to root

Tasks In Progress: 1
- TASK-004: Initialize FastAPI project - 60% complete - Next: Add dependencies

Blockers Encountered: 0

Next Session Priority:
1. Complete TASK-004 (FastAPI setup)
2. TASK-005 (Python dependencies)
3. TASK-006 (FastAPI entry point)

Sprint Progress: 0% → 4% (increased 4%)
```

---

## 💻 TECHNICAL STANDARDS

### Technology Stack

**CRITICAL: Use ONLY these technologies**

#### Frontend Web

- **Framework:** React 18.2+
- **Language:** TypeScript 5.0+
- **UI Library:** Tailwind CSS 3.3+
- **State Management:** Zustand 4.4+
- **HTTP Client:** TanStack Query (React Query) 5.0+
- **Router:** React Router 6.20+
- **Form Handling:** React Hook Form 7.48+
- **Validation:** Zod
- **Build Tool:** Vite 5.0+

#### Frontend Mobile

- **Framework:** React Native 0.73+
- **Runtime:** Expo SDK 50+
- **Language:** TypeScript 5.0+
- **Styling:** NativeWind (Tailwind for RN)
- **State Management:** Zustand 4.4+
- **HTTP Client:** TanStack Query 5.0+
- **Navigation:** React Navigation 6+
- **NFC:** expo-nfc
- **Camera/QR:** expo-camera + expo-barcode-scanner
- **Secure Storage:** expo-secure-store

#### Backend API

- **Language:** Python 3.11+
- **Framework:** FastAPI 0.108+
- **Database:** PostgreSQL 15+ (via Supabase)
- **ORM:** SQLAlchemy 2.0+
- **Migrations:** Alembic
- **Cache:** Redis 7+ (Upstash)
- **Queue:** Celery 5.3+
- **Authentication:** Supabase Auth + Custom JWT
- **Validation:** Pydantic 2.5+
- **Blockchain:** Stellar SDK (py-stellar-base 9.0+)
- **Password Hashing:** passlib with bcrypt
- **JWT:** python-jose

#### External Services

- **Database:** Supabase (PostgreSQL)
- **Cache:** Upstash (Redis)
- **Blockchain:** Stellar Network (testnet for development, mainnet for production)
- **Email:** Resend
- **File Storage:** Cloudinary (MVP) or AWS S3
- **Cash-in:** Circular API
- **Cash-out:** Bitso API
- **Deployment:** Railway (backend), Vercel (web), EAS (mobile)

### File Structure

**CRITICAL: Follow this structure exactly**

```
wani/
├── backend/
│   ├── app/
│   │   ├── api/
│   │   │   ├── v1/
│   │   │   │   └── routes/
│   │   │   │       ├── auth.py
│   │   │   │       ├── users.py
│   │   │   │       ├── wallets.py
│   │   │   │       └── transactions.py
│   │   │   └── deps.py
│   │   ├── core/
│   │   │   ├── config.py
│   │   │   ├── security.py
│   │   │   └── database.py
│   │   ├── models/
│   │   │   ├── user.py
│   │   │   ├── wallet.py
│   │   │   └── transaction.py
│   │   ├── schemas/
│   │   │   ├── user.py
│   │   │   ├── wallet.py
│   │   │   └── transaction.py
│   │   ├── services/
│   │   │   ├── user_service.py
│   │   │   ├── wallet_service.py
│   │   │   ├── stellar_service.py
│   │   │   └── email_service.py
│   │   ├── workers/
│   │   │   ├── celery_app.py
│   │   │   └── notification_tasks.py
│   │   ├── middleware/
│   │   │   ├── auth.py
│   │   │   └── rate_limit.py
│   │   ├── utils/
│   │   └── main.py
│   ├── alembic/
│   ├── tests/
│   ├── requirements.txt
│   └── .env.example
│
├── apps/
│   ├── web/
│   │   ├── src/
│   │   │   ├── app/
│   │   │   │   ├── features/
│   │   │   │   │   ├── auth/
│   │   │   │   │   │   ├── components/
│   │   │   │   │   │   ├── hooks/
│   │   │   │   │   │   ├── services/
│   │   │   │   │   │   └── types/
│   │   │   │   │   ├── wallet/
│   │   │   │   │   └── payments/
│   │   │   │   ├── shared/
│   │   │   │   │   ├── components/
│   │   │   │   │   ├── hooks/
│   │   │   │   │   └── utils/
│   │   │   │   ├── core/
│   │   │   │   │   ├── api/
│   │   │   │   │   ├── store/
│   │   │   │   │   └── config/
│   │   │   │   └── routes/
│   │   │   └── main.tsx
│   │   └── package.json
│   │
│   └── mobile/
│       ├── src/
│       │   ├── app/
│       │   │   ├── features/ (same as web)
│       │   │   ├── shared/
│       │   │   ├── core/
│       │   │   ├── navigation/
│       │   │   └── screens/
│       │   └── App.tsx
│       └── package.json
│
├── docs/
│   ├── PRD.md
│   ├── ARCHITECTURE.md
│   ├── PRODUCT-BACKLOG.md
│   └── sprints/
│       └── sprint-01/
│           ├── planning.md
│           ├── tasks.md
│           └── review.md
│
├── CLAUDE.md
└── README.md
```

### Naming Conventions

**CRITICAL: Follow these naming rules**

#### Frontend (TypeScript/React)

```typescript
// Files
UserProfile.tsx; // Components (PascalCase)
useAuth.ts; // Hooks (camelCase with 'use' prefix)
walletService.ts; // Services (camelCase)
user.types.ts; // Types (camelCase)
constants.ts; // Constants
formatCurrency.ts; // Utilities (camelCase)

// Code
interface User {} // Interfaces (PascalCase)
type UserRole = string; // Types (PascalCase)
const API_URL = "..."; // Constants (UPPER_SNAKE_CASE)
function fetchUser() {} // Functions (camelCase)
const userName = ""; // Variables (camelCase)

// Components
export const UserProfile = () => {}; // Named export (preferred)
export default UserProfile; // Default export (use sparingly)

// React Native specific
HomeScreen.tsx; // Screens (PascalCase + Screen suffix)
useNFC.ts; // Native hooks
```

#### Backend (Python/FastAPI)

```python
# Files
user_service.py         # Services (snake_case)
wallet.py              # Models (snake_case)
auth_schemas.py        # Schemas (snake_case)
stellar_client.py      # Clients (snake_case)

# Code
class UserService:                    # Classes (PascalCase)
class TransactionModel(Base):        # Models (PascalCase + Model suffix)

def create_user():                   # Functions (snake_case)
def get_wallet_balance():           # Functions (snake_case)

user_id = "..."                     # Variables (snake_case)
API_VERSION = "v1"                  # Constants (UPPER_SNAKE_CASE)

# Pydantic schemas
class UserCreate(BaseModel):        # Schema classes (PascalCase)
class WalletResponse(BaseModel):
```

### Code Style

#### Frontend (TypeScript/React)

```typescript
// ✅ Functional components with TypeScript
interface UserProfileProps {
  userId: string;
  onUpdate?: (user: User) => void;
}

export const UserProfile: React.FC<UserProfileProps> = ({
  userId,
  onUpdate,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchUser(userId);
  }, [userId]);

  const fetchUser = async (id: string) => {
    setIsLoading(true);
    try {
      const data = await userService.getById(id);
      setUser(data);
      onUpdate?.(data);
    } catch (error) {
      toast.error("Failed to load user");
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) return <LoadingSpinner />;
  if (!user) return <ErrorState />;

  return (
    <div className="p-4 bg-white rounded-lg shadow">
      <h2 className="text-xl font-bold">{user.name}</h2>
      <p className="text-gray-600">{user.email}</p>
    </div>
  );
};

// ✅ Custom hooks
export const useWallet = (userId: string) => {
  return useQuery({
    queryKey: ["wallet", userId],
    queryFn: () => walletService.getBalance(userId),
    staleTime: 30000, // 30 seconds
  });
};

// ✅ Service pattern
class WalletService {
  async getBalance(userId: string): Promise<WalletBalance> {
    const response = await apiClient.get(`/wallets/${userId}`);
    return response.data;
  }
}
```

#### Backend (Python/FastAPI)

```python
# ✅ Pydantic schemas for validation
class UserCreate(BaseModel):
    email: EmailStr
    password: str = Field(..., min_length=8, max_length=100)
    full_name: str = Field(..., min_length=2, max_length=100)

class UserResponse(BaseModel):
    id: str
    email: EmailStr
    full_name: str
    created_at: datetime

    class Config:
        from_attributes = True

# ✅ Route handlers with dependency injection
@router.post("/users", response_model=UserResponse, status_code=201)
async def create_user(
    user_data: UserCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_admin_user)
):
    """Create a new user (admin only)."""
    try:
        user = await user_service.create(db, user_data)
        return user
    except EmailAlreadyExistsError as e:
        raise HTTPException(
            status_code=409,
            detail={"message": str(e), "code": "EMAIL_EXISTS"}
        )
    except Exception as e:
        logger.error(f"Error creating user: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")

# ✅ Service layer with business logic
class UserService:
    async def create(self, db: Session, user_data: UserCreate) -> User:
        # Check if email exists
        existing = db.query(User).filter(User.email == user_data.email).first()
        if existing:
            raise EmailAlreadyExistsError("Email already registered")

        # Hash password
        hashed_password = get_password_hash(user_data.password)

        # Create user
        user = User(
            email=user_data.email,
            password=hashed_password,
            full_name=user_data.full_name
        )

        db.add(user)
        db.commit()
        db.refresh(user)

        return user
```

### API Response Format

**CRITICAL: ALL API responses must follow this format**

```json
// Success Response
{
  "success": true,
  "data": {
    "id": "user_123",
    "email": "carlos@example.com",
    "full_name": "Carlos Rodriguez"
  },
  "message": "User created successfully"
}

// Success with Pagination
{
  "success": true,
  "data": [
    { "id": "tx_1", "amount": 500 },
    { "id": "tx_2", "amount": 250 }
  ],
  "meta": {
    "pagination": {
      "page": 1,
      "limit": 20,
      "total": 156,
      "total_pages": 8
    }
  }
}

// Error Response
{
  "success": false,
  "error": {
    "message": "Validation failed",
    "code": "VALIDATION_ERROR",
    "status_code": 400,
    "details": [
      {
        "field": "email",
        "message": "Invalid email format"
      }
    ]
  }
}
```

### Git Commit Convention

**CRITICAL: ALL commits must follow Conventional Commits format**

```
<type>(<scope>): <subject>

<body> (opcional)
<footer> (opcional)
```

**Types:**

- `feat`: Nueva funcionalidad
- `fix`: Corrección de bug
- `docs`: Cambios en documentación
- `style`: Formato (sin cambio de código)
- `refactor`: Refactorización
- `perf`: Mejoras de performance
- `test`: Agregar o corregir tests
- `chore`: Cambios en build, configs
- `security`: Fixes de seguridad

**Examples:**

```
feat(auth): add JWT refresh token support
fix(stellar): resolve transaction timeout on testnet
docs(readme): update installation instructions
refactor(wallet): simplify balance calculation logic
security(auth): add rate limiting to login endpoint
```

---

## 🚫 FORBIDDEN ACTIONS

**NEVER do these under ANY circumstance:**

1. ❌ Start coding without reading TASKS.md first
2. ❌ Work on P1/P2 tasks when P0 tasks exist
3. ❌ Skip updating TASKS.md after completion
4. ❌ Ignore errors or warnings
5. ❌ Delete code without backup/comment explaining why
6. ❌ Work outside current sprint scope (unless explicitly asked)
7. ❌ Commit sensitive data (.env files, API keys, passwords, Stellar secret keys)
8. ❌ Use console.log (frontend) or print (backend) in production code
9. ❌ Skip input validation (use Zod frontend, Pydantic backend)
10. ❌ Ignore error handling (always try-catch/try-except)
11. ❌ Add npm/pip packages without announcing explicitly
12. ❌ Change database schemas without Alembic migration
13. ❌ Modify ARCHITECTURE.md conventions without permission
14. ❌ Work on multiple tasks simultaneously
15. ❌ Make assumptions - ASK if unclear
16. ❌ Use localStorage/sessionStorage in React artifacts (not supported in Claude.ai)
17. ❌ Store Stellar secret keys unencrypted
18. ❌ Skip rate limiting on authentication endpoints
19. ❌ Hardcode Stellar network URLs (use environment variables)
20. ❌ Test with real money on mainnet during development

---

## ✅ REQUIRED ACTIONS

**ALWAYS do these:**

1. ✅ Read all context files at session start (CLAUDE.md, ARCHITECTURE.md, TASKS.md)
2. ✅ Work on highest priority (P0) task first
3. ✅ Announce what you're about to do before starting
4. ✅ Follow ARCHITECTURE.md conventions exactly
5. ✅ Use try-except for ALL async operations in Python
6. ✅ Use try-catch for ALL async operations in TypeScript
7. ✅ Validate ALL user inputs (Pydantic backend, Zod frontend)
8. ✅ Check for None/null/undefined before using variables
9. ✅ Use proper TypeScript types (no `any` unless absolutely necessary)
10. ✅ Implement comprehensive error handling with user-friendly messages
11. ✅ Test code immediately after writing (run locally)
12. ✅ Update TASKS.md after each completion with actual time spent
13. ✅ Use environment variables for ALL configuration
14. ✅ Write descriptive commit messages following Conventional Commits
15. ✅ Add comments for complex logic (especially Stellar transactions)
16. ✅ Ask for clarification if requirements unclear
17. ✅ Encrypt Stellar secret keys before storing in database (use Fernet)
18. ✅ Use Stellar testnet for development (mainnet only for production)
19. ✅ Implement rate limiting on authentication endpoints (slowapi)
20. ✅ Hash passwords with bcrypt (10 rounds minimum)

---

## 📋 TASK PRIORITY SYSTEM

### P0 - CRITICAL (Do IMMEDIATELY)

**Drop everything else and fix these:**

- System down / broken
- Security vulnerabilities (exposed secrets, SQL injection, XSS)
- Data loss risks
- Authentication/Authorization failures
- Stellar wallet security issues
- Production-breaking bugs
- Blockers preventing other work
- Setup tasks (US-000) - blocks all development

**When you see P0:**

```
🚨 P0 DETECTED
Dropping current work.
Switching to: TASK-001
Reason: Infrastructure setup blocks all development
```

### P1 - IMPORTANT (Do after all P0)

**Core sprint work:**

- User Stories from Sprint Backlog (US-001 to US-005)
- Core features for Sprint Goal
- Important integrations (Stellar, Supabase, Resend)
- Significant user-facing functionality
- Backend API endpoints
- Frontend components connecting to APIs
- Mobile screens implementation

### P2 - NICE TO HAVE (Only if no P0/P1)

**Enhancement work:**

- UI polish and animations
- Refactoring for code quality
- Documentation improvements (README, inline comments)
- Minor optimizations
- Technical debt cleanup
- Code formatting and linting fixes

**Priority Rule:**

> P0 tasks ALWAYS come first, even if you're in the middle of P1.
> P1 tasks come before P2, no exceptions.
> If user explicitly requests different priority, confirm with them first.

---

## 🛠️ ERROR HANDLING PROTOCOL

### When Error Occurs

1. **Immediate actions:**

```
⚠️ ERROR ENCOUNTERED

File: backend/app/services/stellar_service.py:45
Error: stellar_sdk.exceptions.ConnectionError: Unable to connect to Horizon
Context: Attempting to create test wallet for US-004
Task: TASK-030
```

2. **Attempt to fix (10 minutes max):**

   - Read error message carefully
   - Check if Stellar testnet is down (check status page)
   - Review similar code that works
   - Try logical fixes (check network URL, API key, etc.)

3. **If can't fix in 10 minutes:**

```
🚧 TASK BLOCKED

Task: TASK-030 is now blocked
Blocker: Stellar Horizon testnet unreachable

Attempted fixes:
1. Verified STELLAR_HORIZON_URL in .env
2. Tested with curl - connection timeout
3. Checked Stellar status page - testnet operational

Moving to next P1 task: TASK-036 (Create users table migration)

Action needed: Wait for Stellar testnet to stabilize or use mock for testing
```

4. **Update TASKS.md:**

```markdown
- ⏸️ TASK-030 [US-000] Test Stellar connection - Blocked by: Stellar Horizon testnet unreachable
  - Attempted: Verified config, tested with curl, checked status
  - Needs: Stellar testnet to be stable OR implement mock for testing
  - Date Blocked: 2024-12-23
```

5. **Continue with next available task**

### Common Error Patterns

**Stellar SDK Errors:**

- `ConnectionError`: Horizon API down → Check status, use testnet backup URL
- `BadRequestError`: Invalid transaction → Verify account funded, check sequence number
- `NotFoundError`: Account doesn't exist → Fund account first on testnet

**Supabase Errors:**

- `AuthApiError`: Auth issues → Check SUPABASE_KEY is service key, not anon key
- `PostgrestError`: Database query failed → Check table exists, verify column names

**FastAPI Errors:**

- `ValidationError`: Pydantic validation failed → Check request body matches schema
- `422 Unprocessable Entity`: Input validation → Check required fields, data types

**React/React Native Errors:**

- `Cannot read property of undefined`: Null check missing → Add optional chaining `user?.name`
- `Network request failed`: API unreachable → Check VITE_API_URL or EXPO_PUBLIC_API_URL

---

## 🎯 PROJECT-SPECIFIC RULES

### Critical Business Logic

**Wani Financial Rules:**

1. **Money Handling:**

   - ALL amounts stored as Decimal in backend (never float)
   - MXN amounts: 2 decimal places max
   - USDC amounts: 6 decimal places max
   - Always validate amounts > 0 before transactions

2. **Authentication:**

   - Passwords MUST be hashed with bcrypt (10 rounds minimum)
   - Access tokens expire in 15 minutes
   - Refresh tokens expire in 7 days
   - Rate limit: Max 5 login attempts per 15 minutes per IP

3. **Stellar Wallet Security:**

   - Secret keys MUST be encrypted with Fernet before storing
   - NEVER log or display secret keys
   - Use testnet for development (STELLAR_NETWORK=testnet)
   - Verify transactions succeed before updating database

4. **KYC Levels:**

   - None: Max $1,000 MXN/transaction, $5,000 MXN/month
   - Basic: Max $10,000 MXN/transaction, $50,000 MXN/month
   - Full: Max $100,000 MXN/transaction, no monthly limit

5. **Transaction Idempotency:**
   - ALL financial transactions must have idempotency_key
   - Check for existing transaction with same key before processing
   - Prevent duplicate charges

### External Dependencies

**CRITICAL: These services are essential**

1. **Stellar Network:**

   - Development: `https://horizon-testnet.stellar.org`
   - Production: `https://horizon.stellar.org`
   - Uses USDC stablecoin for cross-border transfers
   - Transaction fees: ~$0.00001 (almost free)
   - Confirmation time: 3-5 seconds

2. **Supabase (PostgreSQL + Auth):**

   - Database: `DATABASE_URL` from Supabase
   - Auth: `SUPABASE_URL` + `SUPABASE_SERVICE_KEY`
   - Connection pooling: max 20 connections
   - Backup strategy: Daily automated backups

3. **Upstash (Redis):**

   - Cache: `REDIS_URL` from Upstash
   - Used for: rate limiting, session data, temporary data
   - TTL: Set appropriately per use case

4. **Resend (Email):**

   - API Key: `RESEND_API_KEY`
   - From: `noreply@wani.app`
   - Templates: HTML emails for verification, notifications

5. **Circular (Cash-in USA/CAN):**

   - API: `CIRCULAR_API_KEY` + `CIRCULAR_API_SECRET`
   - Webhook: `CIRCULAR_WEBHOOK_SECRET`
   - Purpose: Load funds from USA/Canada bank accounts

6. **Bitso (Cash-out MX):**
   - API: `BITSO_API_KEY` + `BITSO_API_SECRET`
   - Webhook: `BITSO_WEBHOOK_SECRET`
   - Purpose: Convert to MXN and transfer to Mexican banks

### Sensitive Areas

**⚠️ CRITICAL CODE - Test thoroughly, ask before major changes**

1. **`backend/app/services/stellar_service.py`**

   - Handles ALL blockchain transactions
   - Manages wallet creation and secret key encryption
   - Any bug here = money loss
   - ALWAYS test on testnet first

2. **`backend/app/core/security.py`**

   - Password hashing and JWT token generation
   - Encryption/decryption of secret keys
   - Security vulnerability = catastrophic

3. **`backend/app/services/wallet_service.py`**

   - Manages user balances
   - Updates after transactions
   - Bugs = incorrect balances

4. **Database Migrations (`backend/alembic/versions/`)**

   - Changes to production data
   - ALWAYS backup before running migration
   - Test migrations on staging first

5. **Authentication Flows:**
   - `backend/app/api/v1/routes/auth.py`
   - `apps/web/src/app/features/auth/`
   - `apps/mobile/src/app/features/auth/`
   - Security bugs = account takeover

### Testing Requirements

**Required for this sprint:**

1. **Manual Testing (Mandatory):**

   - Test happy path for every feature
   - Test error cases (invalid input, missing fields)
   - Test edge cases (empty strings, null, very large numbers)
   - Test on: Chrome (web), iOS simulator (mobile), Android emulator (mobile)

2. **Stellar Testing:**

   - ALWAYS use testnet for development
   - Fund test accounts with testnet lumens (XLM)
   - Verify transactions on Stellar Laboratory
   - Check balances after operations

3. **API Testing:**

   - Test all endpoints with curl or Postman
   - Verify correct status codes (200, 201, 400, 401, 404, 500)
   - Check response format matches API standard
   - Test rate limiting works (try >5 login attempts)

4. **UI/UX Testing:**
   - Verify all forms validate correctly
   - Check error messages are user-friendly
   - Ensure loading states work
   - Test on slow network (throttle to 3G)

---

## 📊 QUALITY CHECKLIST

Before marking ANY task as complete, verify ALL of these:

### Functionality

- [ ] Code runs without errors (no console errors, no exceptions)
- [ ] All Acceptance Criteria met (check TASKS.md)
- [ ] Expected behavior verified with manual testing
- [ ] Edge cases tested (null, undefined, empty, very large/small numbers)
- [ ] Works on target platforms (web: Chrome, mobile: iOS + Android)

### Code Quality

- [ ] Follows ARCHITECTURE.md conventions exactly
- [ ] Proper naming conventions used (PascalCase, camelCase, snake_case)
- [ ] No console.log (JS) or print (Python) statements in code
- [ ] TypeScript types used properly (no `any` except when necessary)
- [ ] Python type hints used where appropriate
- [ ] Code is readable and maintainable (clear variable names, logical structure)

### Error Handling

- [ ] Try-catch (JS) or try-except (Python) for ALL async operations
- [ ] Input validation implemented (Zod frontend, Pydantic backend)
- [ ] Null/undefined/None checks added where needed
- [ ] User-friendly error messages (not technical stack traces)
- [ ] Proper HTTP status codes used in API responses

### Security

- [ ] No hardcoded credentials (check for API keys, passwords, secrets)
- [ ] Input sanitization implemented (prevent SQL injection, XSS)
- [ ] Authentication/Authorization checked on protected routes
- [ ] Stellar secret keys encrypted before database storage
- [ ] Rate limiting implemented on sensitive endpoints (auth)
- [ ] Passwords hashed with bcrypt
- [ ] JWT tokens have proper expiration

### Performance

- [ ] No unnecessary re-renders (React) or query loops
- [ ] Database queries indexed appropriately
- [ ] API responses are reasonably fast (<200ms target for P95)
- [ ] Loading states implemented for async operations
- [ ] Caching used where appropriate (TanStack Query, Redis)

### Documentation

- [ ] Complex logic has inline comments explaining why (not just what)
- [ ] TASKS.md updated with completion timestamp and notes
- [ ] API documentation updated if endpoint changed
- [ ] Breaking changes noted if any
- [ ] README updated if setup steps changed

### Testing

- [ ] Manual testing completed for happy path
- [ ] Different scenarios tested (success, failure, edge cases)
- [ ] Error scenarios tested and handled gracefully
- [ ] No new bugs introduced (regression testing)
- [ ] Stellar transactions tested on testnet (if applicable)

---

## 📄 SCRUM INTEGRATION

### During Sprint

**Current Sprint Focus:**

- **Primary Goal:** Establish infrastructure complete + users can register, authenticate, and have Stellar wallet
- **Must complete for goal:** US-000 (Setup), US-001 (Registration), US-002 (Login), US-004 (Wallet)
- **Sprint ends:** 2025-01-03 (10 days remaining from start)

**Daily Work Pattern:**

1. Start session → Read CLAUDE.md, ARCHITECTURE.md, TASKS.md
2. Identify next P0 task from TASKS.md
3. Announce what you'll work on
4. Work on task following all rules
5. Test thoroughly before marking complete
6. Update TASKS.md with completion + actual time
7. Move to next task
8. At end of day session, provide Session Summary
9. Ensure TASKS.md reflects reality

**Mid-Sprint (Day 5 - Dec 27):**

- Progress should be ~50% (39 tasks completed out of 78)
- If behind schedule, flag to user immediately
- May need scope adjustment (move US-005 to Sprint 2)
- Run progress check: Are P0 tasks done? Is infrastructure working?

**Pre-Review (Day 9 - Jan 2):**

- Focus on completing started User Stories (don't start new ones)
- Don't start US-005 if US-001 to US-004 not done
- Prepare demos of completed work
- Test end-to-end flows (register → login → wallet created)

### Sprint Transitions

**End of Sprint:**

- Complete all in-progress tasks or document current status
- Don't start new tasks after Day 9 (focus on finishing)
- Ensure all work is properly documented in TASKS.md
- Archive sprint docs to `docs/sprints/sprint-01/`

**New Sprint (Sprint 2):**

- CLAUDE.md will be updated with Sprint 2 context
- New Sprint Planning will define priorities
- New TASKS.md will have new task breakdown
- Previous sprint (Sprint 1) will be archived

---

## 🆘 WHEN STUCK PROTOCOL

### First 10 Minutes (Initial Troubleshooting)

- Re-read error message word-by-word
- Check ARCHITECTURE.md for similar patterns
- Review working code that does something similar
- Try obvious fixes (restart server, clear cache, check env vars)
- Search documentation for specific error code

### After 10 Minutes (Still Stuck)

```
🤔 INVESTIGATING BLOCKER

Task: TASK-030
Issue: Stellar Horizon testnet returning 504 Gateway Timeout
Time spent: 10 minutes

Attempted:
1. Verified STELLAR_HORIZON_URL in .env is correct
2. Tested with curl - times out after 30 seconds
3. Checked Stellar status page - shows operational
4. Tried alternative testnet URL - same issue

Next: Will wait 5 minutes and retry, if still failing will use mock
Or: Will mark as blocked and move to TASK-036 (database work)
```

### After 20 Minutes (Can't Resolve)

```
🚧 MARKING AS BLOCKED

Task TASK-030 is blocked.
Reason: Stellar Horizon testnet unreachable, likely temporary outage
Impact: Can't test wallet creation, blocks US-004

Moving to: TASK-036 (Create users table migration - P0)
This task doesn't depend on Stellar, can proceed

User action needed:
- Check Stellar testnet status in 1-2 hours
- Consider using mock for testing if issue persists
- Could continue with other backend/frontend work
```

**Update TASKS.md:**

```markdown
- ⏸️ TASK-030 [US-000] Test Stellar connection - P0 - S (30min)
  - Blocked by: Stellar Horizon testnet unreachable (504 errors)
  - Attempted: Verified config, tested with curl, tried alternative URLs
  - Needs: Stellar testnet to stabilize OR implement mock for testing
  - Action: Retry in 1-2 hours or proceed with mock
  - Date Blocked: 2024-12-23 14:30
```

---

## 🎓 LEARNING MODE

### When Working with New Tech

If you encounter a library/pattern unfamiliar to you:

1. **Acknowledge:**

```
📚 NEW TERRITORY

Working with: expo-nfc for NFC payments
Confidence level: Medium (familiar with React Native, new to NFC)

Will: Read expo-nfc documentation, check existing React Native examples, start with simple implementation
```

2. **Research approach:**

   - Check official documentation (expo.dev for Expo packages)
   - Look for patterns in existing codebase (if any)
   - Start with simplest possible implementation
   - Test frequently with small iterations
   - Ask for clarification if unclear

3. **Document learnings:**

```typescript
// NFC payment implementation for Wani
// Reference: https://docs.expo.dev/versions/latest/sdk/nfc/
// Note: NFC requires physical device, doesn't work in simulator
// Gotcha: Must request permissions before using (VIBRATE, NFC)
export const initiateNFCPayment = async (amount: number) => {
  // Implementation here
};
```

---

## 📈 SUCCESS METRICS

**You're doing great when:**

- ✅ Completing P0 tasks before P1/P2
- ✅ TASKS.md always reflects current reality (updated after each task)
- ✅ No errors introduced (tests pass, code runs clean)
- ✅ Code follows all ARCHITECTURE.md conventions
- ✅ Sprint progressing on schedule (~10% per day target)
- ✅ All completions thoroughly tested before marking done
- ✅ Communication is clear and specific

**Signs you need to adjust:**

- ⚠️ P0 tasks being skipped for P1/P2
- ⚠️ TASKS.md not updated (out of sync with reality)
- ⚠️ Frequent bugs introduced by new code
- ⚠️ Sprint falling significantly behind schedule
- ⚠️ Convention violations (naming, structure, style)
- ⚠️ Skipping testing ("will test later")
- ⚠️ Working on multiple tasks simultaneously

---

## 📞 COMMUNICATION STYLE

### Good Communication

```
✅ "Implementing user authentication in backend/app/services/user_service.py"
✅ "Error: AttributeError: 'NoneType' object has no attribute 'id' at line 45"
✅ "Added null check before accessing user.id: if user is None: raise NotFoundError"
✅ "Completed 3 tasks: TASK-001 (repo setup), TASK-002 (folder structure), TASK-003 (docs)"
```

### Poor Communication

```
❌ "Working on backend"
❌ "There's an error"
❌ "Fixed"
❌ "Done with stuff"
```

**Always be:**

- **Specific:** Name exact files, functions, line numbers
- **Clear:** Describe problems and solutions concretely
- **Honest:** Report actual progress, don't hide blockers
- **Proactive:** Ask clarifying questions before making assumptions

---

## 🔐 SECURITY STANDARDS

**CRITICAL SECURITY RULES:**

### 1. Authentication

- **Password Storage:** Hash with bcrypt, 10 rounds minimum
- **JWT Tokens:**
  - Access token: 15 minutes expiration
  - Refresh token: 7 days expiration
  - Store refresh token securely (httpOnly cookie or secure storage)
- **Rate Limiting:** Max 5 login attempts per 15 minutes per IP (use slowapi)

### 2. Stellar Wallet Security

- **Secret Key Storage:** ALWAYS encrypt with Fernet before storing in database
- **Encryption Key:** Store `ENCRYPTION_KEY` in .env, never commit
- **Key Generation:** Use Stellar SDK's `Keypair.random()` for new wallets
- **Never Log:** Secret keys should NEVER appear in logs, console, or error messages

```python
# ✅ CORRECT: Encrypt secret key
from cryptography.fernet import Fernet

cipher = Fernet(settings.ENCRYPTION_KEY)
encrypted_secret = cipher.encrypt(secret_key.encode()).decode()
wallet.stellar_secret_key = encrypted_secret

# ❌ WRONG: Store plaintext
wallet.stellar_secret_key = secret_key  # NEVER DO THIS
```

### 3. Input Validation

- **Backend:** Use Pydantic models for ALL request validation
- **Frontend:** Use Zod schemas for ALL form validation
- **Sanitization:** Strip/escape HTML, prevent SQL injection
- **File Uploads:** Validate file type, size, scan for malware if possible

```python
# ✅ Backend validation
class SendMoneyRequest(BaseModel):
    to_wallet_address: str = Field(..., min_length=56, max_length=56)
    amount_mxn: Decimal = Field(..., gt=0, le=100000)

    @validator('to_wallet_address')
    def validate_stellar_address(cls, v):
        if not v.startswith('G'):
            raise ValueError('Invalid Stellar address')
        return v
```

```typescript
// ✅ Frontend validation
const sendMoneySchema = z.object({
  toAddress: z.string().min(56).max(56).startsWith("G"),
  amount: z.number().positive().max(100000),
});
```

### 4. Environment Variables

**ALL secrets MUST be in .env files:**

```bash
# Backend .env
DATABASE_URL=postgresql://...
REDIS_URL=redis://...
JWT_SECRET=your-super-secret-min-32-chars
ENCRYPTION_KEY=your-fernet-key
STELLAR_SECRET_KEY=SXXXXXXXXXXXXX
RESEND_API_KEY=re_xxxx
CIRCULAR_API_KEY=xxx
BITSO_API_KEY=xxx

# Frontend .env
VITE_API_URL=https://api.wani.app/v1
EXPO_PUBLIC_API_URL=https://api.wani.app/v1
```

**NEVER commit .env files to git**

### 5. API Security

- **CORS:** Only allow specific origins (not `*` in production)
- **Rate Limiting:** Implement on ALL endpoints (especially auth)
- **HTTPS Only:** Force HTTPS in production (no HTTP)
- **Security Headers:** Use helmet.js equivalent (FastAPI middleware)

### 6. Data Protection

- **Passwords:** bcrypt with 10+ rounds
- **Sensitive Data:** Encrypt before storing (Stellar keys, API keys)
- **SQL Injection:** Use ORM (SQLAlchemy), never raw SQL with string interpolation
- **XSS Prevention:** Sanitize user input, escape output
- **CSRF Protection:** Use CSRF tokens for state-changing operations

---

## 🔧 COMMON CODE PATTERNS

### Error Handling Pattern (Backend - Python)

```python
@router.post("/auth/login", response_model=LoginResponse)
async def login(
    credentials: LoginRequest,
    db: Session = Depends(get_db)
):
    """User login endpoint."""
    try:
        # Authenticate user
        user = await user_service.authenticate(
            db,
            credentials.email,
            credentials.password
        )

        # Generate tokens
        access_token = create_access_token(user.id)
        refresh_token = create_refresh_token(user.id)

        return {
            "success": True,
            "data": {
                "user": user,
                "access_token": access_token,
                "refresh_token": refresh_token,
                "token_type": "Bearer"
            },
            "message": "Login successful"
        }

    except InvalidCredentialsError as e:
        raise HTTPException(
            status_code=401,
            detail={
                "success": False,
                "error": {
                    "message": "Invalid email or password",
                    "code": "INVALID_CREDENTIALS",
                    "status_code": 401
                }
            }
        )
    except Exception as e:
        logger.error(f"Login error: {e}")
        raise HTTPException(
            status_code=500,
            detail={
                "success": False,
                "error": {
                    "message": "Internal server error",
                    "code": "INTERNAL_ERROR",
                    "status_code": 500
                }
            }
        )
```

### API Call Pattern (Frontend - TypeScript)

```typescript
// Service
class AuthService {
  async login(email: string, password: string): Promise<LoginResponse> {
    try {
      const response = await apiClient.post("/auth/login", {
        email,
        password,
      });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.error?.message || "Login failed");
      }
      throw error;
    }
  }
}

// Hook
export const useLogin = () => {
  const navigate = useNavigate();
  const { login: setAuthState } = useAuthStore();

  return useMutation({
    mutationFn: ({ email, password }: LoginRequest) =>
      authService.login(email, password),
    onSuccess: (data) => {
      // Save tokens and user to state
      setAuthState(data.data.user, {
        access_token: data.data.access_token,
        refresh_token: data.data.refresh_token,
      });

      // Redirect to dashboard
      navigate("/dashboard");
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
};

// Component usage
const LoginForm = () => {
  const { mutate: login, isPending } = useLogin();

  const handleSubmit = (data: LoginFormData) => {
    login(data);
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Form fields */}
      <button type="submit" disabled={isPending}>
        {isPending ? "Logging in..." : "Login"}
      </button>
    </form>
  );
};
```

### Stellar Transaction Pattern

```python
from stellar_sdk import Server, Keypair, TransactionBuilder, Network, Asset

class StellarService:
    def __init__(self):
        self.server = Server(horizon_url=settings.STELLAR_HORIZON_URL)

    async def send_usdc(
        self,
        from_secret: str,  # Encrypted secret (decrypt first)
        to_public: str,
        amount: Decimal
    ) -> str:
        """Send USDC via Stellar. Returns transaction hash."""
        try:
            # Decrypt sender's secret key
            from_keypair = Keypair.from_secret(from_secret)

            # Load source account
            source_account = await self.server.load_account(
                from_keypair.public_key
            )

            # Build transaction
            transaction = (
                TransactionBuilder(
                    source_account=source_account,
                    network_passphrase=Network.TESTNET_NETWORK_PASSPHRASE,
                    base_fee=100
                )
                .append_payment_op(
                    destination=to_public,
                    asset=USDC_ASSET,  # Define USDC asset constant
                    amount=str(amount)
                )
                .set_timeout(30)
                .build()
            )

            # Sign and submit
            transaction.sign(from_keypair)
            response = await self.server.submit_transaction(transaction)

            logger.info(f"Stellar transaction successful: {response['hash']}")
            return response['hash']

        except Exception as e:
            logger.error(f"Stellar transaction failed: {e}")
            raise StellarTransactionError(str(e))
```

---

## 🎯 SPRINT COMMITMENT

**Sprint Goal:**

> Establecer infraestructura completa del proyecto y permitir que usuarios se registren, autentiquen y tengan wallet Stellar lista.

**To achieve this goal, we must complete:**

1. **US-000:** Project Infrastructure Setup (CRITICAL - blocks everything)
2. **US-001:** User Registration with Email/Password
3. **US-002:** User Login & JWT Token Management
4. **US-004:** Create Stellar Wallet Automatically

**Current progress toward goal:** 0% (Day 1 just starting)

**Days remaining:** 10 days

**Blockers to goal:** None yet

**Minimum viable success:** If we complete US-000, US-001, US-002, and US-004, the Sprint Goal is achieved. US-003 (KYC) and US-005 (Balance Display) are important but can move to Sprint 2 if needed.

---

## 📚 QUICK REFERENCE

### File Reading Order (Every Session Start)

1. **CLAUDE.md** (this file) ← You're here
2. **ARCHITECTURE.md** (technical details)
3. **docs/sprints/sprint-01/tasks.md** (what to work on)
4. **docs/sprints/sprint-01/planning.md** (sprint context)
5. **PRODUCT-BACKLOG.md** (overall product vision)

### Priority Order (Always)

1. **P0 (Critical)** - Setup, blockers, security issues → Do FIRST, always
2. **P1 (Important)** - Sprint backlog stories → After all P0
3. **P2 (Nice to have)** - Polish, refactoring → Only if no P0/P1

### Update Requirements

- ✅ **TASKS.md** after EVERY task completion (with timestamp + actual time)
- ✅ **Session summary** at end of work session
- ✅ **Blockers** immediately when discovered (don't wait)
- ✅ **Sprint health** if falling behind schedule

### Quality Gates (Before marking task complete)

- ✅ All Acceptance Criteria met
- ✅ Code tested and working (no errors)
- ✅ Conventions followed (naming, structure, style)
- ✅ Error handling implemented
- ✅ Security checks passed
- ✅ Documentation updated (if needed)

---

## 📄 DOCUMENT UPDATES

**This document is updated:**

- At start of each new sprint (Sprint context section)
- When ARCHITECTURE.md changes (Technical standards section)
- When project-specific rules change (Business logic section)
- When new patterns emerge (Common code patterns section)

**Last Sprint Update:** Sprint 1 - 2024-12-20  
**Next Scheduled Update:** Sprint 2 - 2025-01-06

**Archive Process:**

- At end of Sprint 1, archive this version to `docs/sprints/sprint-01/CLAUDE.md`
- Generate new version for Sprint 2 with updated context

---

## ⚡ TL;DR - CRITICAL RULES

**If you remember ONLY these 10 rules:**

1. 📖 **Read CLAUDE.md, ARCHITECTURE.md, TASKS.md at EVERY session start**
2. 🔴 **P0 tasks ALWAYS come first** (drop everything for P0)
3. ✏️ **Update TASKS.md after EVERY completion** (with timestamp)
4. 🎯 **Stay focused on Sprint Goal** (Infrastructure + Auth + Wallet)
5. 🏗️ **Follow ARCHITECTURE.md conventions exactly** (naming, structure, patterns)
6. 🧪 **Test everything before marking complete** (manual testing mandatory)
7. 🚫 **Never skip error handling** (try-catch/except ALL async ops)
8. 💬 **Communicate clearly and specifically** (exact files, line numbers, errors)
9. ⏸️ **Mark blockers immediately** (don't waste >10 min stuck)
10. ✅ **Complete Quality Checklist before task done** (all checkboxes)

**Bonus Security Rules:**

- 🔐 Encrypt Stellar secret keys before database storage
- 🔑 Hash passwords with bcrypt (10 rounds min)
- 🚫 Never commit .env files or secrets
- ⏱️ Rate limit auth endpoints (5 attempts/15 min)

---

**"Quality code, properly documented, delivered on time. That's the Wani standard."**

---

**Current Sprint:** Sprint 1  
**Sprint Goal:** Infrastructure + Auth + Wallet  
**Days Remaining:** 10  
**Next P0 Task:** TASK-001 (Create GitHub repository)

**Status:** 🟢 Ready to start

---

_This is your source of truth. Follow it strictly. When in doubt, refer back to this document._
