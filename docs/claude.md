# CLAUDE.md - Development Framework Rules

## Wani - Remittance & Digital Wallet Platform

**Project Name:** Wani (和 - Peace, Harmony)

## MANDATORY RULES FOR CLAUDE CODE

### 🚀 START OF EACH SESSION

1. **ALWAYS read files in this exact order:**

   ```
   1. CLAUDE.md (this file - framework rules)
   2. PRD.md (product requirements)
   3. PLANNING.md (technical architecture)
   4. TASKS.md (find next P0 task)
   5. ERRORS.md (check active blockers)
   6. PROGRESS.md (review last session)
   ```

2. **Announce work plan:**

   ```
   "Files loaded. Working on: [Task #X - Description]
   Priority: P0/P1/P2
   Week: [Week X of 8]
   Estimated time: [X hours]
   Current focus: [Backend/Frontend/Integration/Testing]"
   ```

3. **Environment verification checklist:**
   - [ ] Supabase connection active
   - [ ] Backend packages installed (pip install -r requirements.txt)
   - [ ] Frontend packages installed (pnpm install)
   - [ ] Environment variables configured (.env exists)
   - [ ] Backend server running (port: 8000)
   - [ ] Frontend web running (port: 5173)
   - [ ] Redis running (port: 6379)
   - [ ] No conflicting processes on ports
   - [ ] Stellar testnet accessible
   - [ ] External API keys valid (Circle, Bitso sandbox)

---

## 💻 DURING DEVELOPMENT

### Code Standards Enforcement

**Technology Stack Compliance:**

- **Backend:** FastAPI 0.104+ only, Python 3.11+
- **Frontend Web:** React 18 + Vite + TypeScript
- **Frontend Mobile:** React Native + Expo SDK 50
- **Database:** PostgreSQL via Supabase only
- **Cache:** Redis only
- **No unauthorized package additions** without updating PLANNING.md
- Version compatibility checks before any upgrade
- Follow all conventions in PLANNING.md

**File Naming Conventions:**

```typescript
// Frontend Web (React + TypeScript)
components/
  ├─ Button.tsx                    // PascalCase
  ├─ TransactionList.tsx
  └─ BalanceCard.tsx

features/wallet/
  ├─ components/
  ├─ hooks/
  │   └─ useWallet.ts              // camelCase with 'use' prefix
  └─ services/
      └─ walletService.ts          // camelCase

types/
  └─ User.ts                       // PascalCase

utils/
  └─ formatCurrency.ts             // camelCase

constants/
  └─ API_CONFIG.ts                 // UPPER_SNAKE_CASE
```

```python
# Backend (FastAPI + Python)
app/
├── api/routes/
│   ├── auth.py                    # snake_case
│   ├── wallet.py
│   └── payments.py
├── models/
│   ├── user.py                    # snake_case
│   └── transaction.py
├── services/
│   ├── wallet_service.py          # snake_case
│   └── payment_service.py
└── integrations/
    ├── circle.py
    └── stellar.py
```

```typescript
// Frontend Mobile (React Native + Expo)
app/
├── (auth)/
│   ├── login.tsx                  # kebab-case for routes
│   └── register.tsx
├── (tabs)/
│   ├── index.tsx
│   └── send.tsx
└── _layout.tsx
```

**API Response Consistency:**

```python
# All API responses MUST follow this format
{
  "success": True,
  "data": {...},           # Required on success
  "error": None,           # Required on error
  "timestamp": "2025-10-15T10:30:00Z"
}

# Success example
{
  "success": True,
  "data": {
    "transaction_id": "uuid",
    "amount": "500.000000",
    "status": "completed"
  },
  "error": None,
  "timestamp": "2025-10-15T10:30:00Z"
}

# Error example
{
  "success": False,
  "data": None,
  "error": {
    "code": "INSUFFICIENT_BALANCE",
    "message": "Insufficient balance for transaction",
    "details": {
      "balance": "100.50",
      "required": "500.00"
    }
  },
  "timestamp": "2025-10-15T10:30:00Z"
}
```

---

### Before Writing Any Code

1. **Announce specific changes:**

   ```
   "Modifying: backend/app/services/wallet_service.py
   Function: transfer_money
   Purpose: Implement P2P transfer with balance validation
   Dependencies: Decimal from decimal, UUID from uuid
   Estimated changes: ~50 lines
   Tests needed: Yes - test_wallet_service.py"
   ```

2. **Check ERRORS.md for related issues:**

   - Search for file name
   - Check for similar error patterns (e.g., "balance", "transfer", "validation")
   - Apply documented solutions
   - **CRITICAL:** Avoid repeating previously fixed errors

3. **Verify against PLANNING.md:**

   - ✅ Follows folder structure?
   - ✅ Uses correct naming convention?
   - ✅ Implements security standards (JWT, input validation)?
   - ✅ Matches API response format?
   - ✅ Uses proper error handling pattern?
   - ✅ Includes audit logging if financial transaction?

4. **Security checklist for financial operations:**
   - [ ] Input validation with Pydantic
   - [ ] Balance check before debit
   - [ ] Transaction atomicity (BEGIN/COMMIT)
   - [ ] Audit log entry created
   - [ ] Rate limiting applied
   - [ ] Amount limits enforced (KYC-based)

---

### After Each Code Change

1. **Test immediately:**

   ```bash
   # Backend test
   cd backend
   pytest tests/test_services/test_wallet_service.py -v

   # Or specific test
   pytest tests/test_api/test_wallet_routes.py::test_transfer -v

   # Frontend test
   cd frontend-web
   pnpm test

   # Run backend server and verify
   uvicorn app.main:app --reload
   # Test endpoint: http://localhost:8000/api/v1/wallet/balance
   ```

2. **Verify expected behavior:**

   - Check console for errors (backend and frontend)
   - Verify database changes if applicable (Supabase dashboard)
   - Check Redis cache if using cached data
   - Test edge cases:
     - Empty values
     - Negative amounts
     - Insufficient balance
     - Invalid UUIDs
     - Expired tokens

3. **Update documentation:**
   - Add docstrings for new functions
   ```python
   async def transfer_money(from_user: UUID, to_user: UUID, amount: Decimal) -> Transaction:
       """
       Transfer money between two users.

       Args:
           from_user: UUID of sender
           to_user: UUID of recipient
           amount: Amount to transfer in USDC

       Returns:
           Transaction object with status

       Raises:
           InsufficientBalanceError: If sender balance < amount
           UserNotFoundError: If either user doesn't exist
       """
   ```
   - Update API docs if endpoint changed (FastAPI auto-generates, but verify)
   - Note breaking changes in PROGRESS.md

---

### Task Completion Protocol

1. **Update TASKS.md immediately:**

   ```markdown
   ### Week 1: Foundation

   - [x] [2025-10-15 14:30] [P0] Setup FastAPI project structure
     - Status: ✅ Completed
     - Duration: 2 hours
     - Files: backend/app/main.py, requirements.txt
     - Notes: Added CORS middleware, Supabase connection tested
   ```

2. **Add to PROGRESS.md:**

   ```markdown
   ## 2025-10-15 - Day 1, Week 1

   ### ✅ Completed Tasks

   **[P0] Setup FastAPI project structure**

   - Created: backend/app/main.py with FastAPI initialization
   - Added: CORS middleware for frontend communication
   - Configured: Supabase connection via environment variables
   - Tested: Health check endpoint (/health)
   - Database: Connection pool configured (20 connections)

   **Files Modified:**

   - backend/app/main.py (new)
   - backend/app/core/config.py (new)
   - backend/requirements.txt (new)
   - backend/.env.example (new)

   **Testing:**

   - Manual: Verified /health endpoint returns 200
   - Database: Tested Supabase connection
   - CORS: Verified from frontend can make requests

   ### ⚠️ Issues Encountered

   - None

   ### 📝 Notes

   - Using python-dotenv for environment variables
   - Supabase connection uses asyncpg driver
   - Remember to update .env with actual credentials

   ### ⏭️ Next Priority

   - Setup database schema (users, wallets tables)
   ```

3. **Document any errors in ERRORS.md:**

   ```markdown
   ## Active Errors

   - [ ] [2025-10-15 15:45] SQLAlchemy connection pool exhausted
     - **File:** backend/app/core/database.py:15
     - **Error:** `sqlalchemy.exc.TimeoutError: QueuePool limit exceeded`
     - **Context:** Running load test with 50 concurrent requests
     - **Root Cause:** Default pool_size=5 is too small
     - **Solution:** Increased pool_size to 20 in engine creation
     - **Attempted Solutions:**
       1. ❌ Tried pool_size=10 - still failed at 40 requests
       2. ✅ Set pool_size=20, max_overflow=0 - works for 50 requests
     - **Status:** Resolved
     - **Prevention:** Document pool size requirements in PLANNING.md
   ```

---

## 🔢 TASK PRIORITY SYSTEM

### P0 - CRITICAL (Do immediately, block all P1/P2)

**Examples in this project:**

- Authentication system completely broken
- Database connection failing
- Hot wallet private key exposed/compromised
- Payment processing failing (NFC/transfers)
- Cash-out to bank failing
- Stellar integration broken
- User cannot login/register
- Data loss occurring
- Security vulnerability discovered

**Response:** Drop everything, fix immediately, document thoroughly

---

### P1 - IMPORTANT (Do after all P0 cleared)

**Examples in this project:**

- Core features implementation (send money, NFC payment, cash-out)
- KYC verification flow
- Transaction history not loading
- Balance display incorrect
- Push notifications not working
- Merchant dashboard incomplete
- Performance issues (API >500ms)
- Integration with Circle/Bitso not working
- Major UI bugs affecting user experience
- Missing input validation on critical endpoints

**Response:** Complete by end of current week

---

### P2 - NICE TO HAVE (Only when no P0/P1 exist)

**Examples in this project:**

- UI enhancements (animations, styling tweaks)
- Refactoring for code quality
- Additional tests (beyond critical paths)
- Documentation improvements
- Minor optimizations
- Dark mode implementation
- Advanced analytics
- Non-critical feature additions
- Tech debt cleanup
- Performance micro-optimizations

**Response:** Fill time between sprints, deprioritize if needed

---

## 🚫 FORBIDDEN ACTIONS

### NEVER do these:

1. **Start coding without reading all .md files**

   - You'll miss context, repeat errors, work on wrong tasks

2. **Skip task documentation after completion**

   - Makes progress tracking impossible
   - Team loses context of what was done

3. **Ignore errors or warnings**

   - Small errors become big blockers
   - Warnings indicate code smell

4. **Delete code without commenting out first**

   - Always comment old code for reference
   - Delete only after verifying new code works

5. **Work outside current task scope (scope creep)**

   - Finish assigned task completely first
   - Note ideas for future in TASKS.md as P2

6. **Commit sensitive data**

   ```python
   # ❌ NEVER
   STELLAR_HOT_WALLET_SECRET = "SXXX..."
   DATABASE_URL = "postgresql://user:pass@host/db"

   # ✅ ALWAYS
   STELLAR_HOT_WALLET_SECRET = os.getenv("STELLAR_HOT_WALLET_SECRET")
   DATABASE_URL = os.getenv("DATABASE_URL")
   ```

7. **Use console.log/print in production code**

   ```python
   # ❌ NEVER in production
   print(f"User balance: {balance}")

   # ✅ ALWAYS use logger
   logger.info(f"User balance retrieved", extra={"user_id": user_id, "balance": balance})
   ```

8. **Skip input validation**

   ```python
   # ❌ NEVER
   @router.post("/transfer")
   async def transfer(from_user: str, to_user: str, amount: float):
       # No validation, accepts any input

   # ✅ ALWAYS validate with Pydantic
   class TransferRequest(BaseModel):
       from_user_id: UUID
       to_user_id: UUID
       amount: Decimal = Field(gt=0, le=10000)

   @router.post("/transfer")
   async def transfer(request: TransferRequest):
       # Validated automatically
   ```

9. **Ignore error handling**

   ```python
   # ❌ NEVER
   async def transfer_money(from_user, to_user, amount):
       wallet = get_wallet(from_user)  # Could fail
       wallet.balance -= amount        # Could fail
       save_wallet(wallet)             # Could fail

   # ✅ ALWAYS handle errors
   async def transfer_money(from_user, to_user, amount):
       try:
           wallet = await get_wallet(from_user)
           if wallet.balance < amount:
               raise InsufficientBalanceError()

           wallet.balance -= amount
           await save_wallet(wallet)

       except InsufficientBalanceError:
           logger.warning("Transfer failed: insufficient balance")
           raise HTTPException(status_code=400, detail="Insufficient balance")
       except Exception as e:
           logger.error(f"Transfer failed: {str(e)}")
           raise HTTPException(status_code=500, detail="Transfer failed")
   ```

10. **Make database changes without migration**

    ```bash
    # ❌ NEVER modify database directly

    # ✅ ALWAYS create migration
    cd backend
    alembic revision --autogenerate -m "add_transactions_table"
    alembic upgrade head
    ```

---

### ALWAYS do these:

1. **Use try-catch for all async operations**

   - Especially: Database queries, external API calls, file operations

2. **Validate and sanitize ALL inputs**

   - Use Pydantic models for request validation
   - Check types, ranges, formats

3. **Check for null/undefined/None**

   ```python
   # Check before accessing
   if user is not None and user.wallet is not None:
       balance = user.wallet.balance
   ```

4. **Use proper TypeScript types / Python type hints**

   ```typescript
   // TypeScript
   function getBalance(userId: string): Promise<number> { ... }
   ```

   ```python
   # Python
   async def get_balance(user_id: UUID) -> Decimal:
       ...
   ```

5. **Follow REST conventions**

   - GET for reads, POST for creates, PUT/PATCH for updates, DELETE for deletes
   - Use plural nouns for resources: `/users`, `/transactions`
   - Use nested routes: `/users/:id/transactions`

6. **Implement proper error messages**

   ```python
   # ❌ Generic
   raise HTTPException(status_code=400, detail="Error")

   # ✅ Specific and helpful
   raise HTTPException(
       status_code=400,
       detail={
           "code": "INSUFFICIENT_BALANCE",
           "message": "Cannot transfer $500. Current balance: $100",
           "balance": 100.00,
           "required": 500.00
       }
   )
   ```

7. **Use environment variables for ALL config**

   - API keys, secrets, URLs, ports, database credentials

8. **Write descriptive commit messages**

   ```bash
   # ❌ Bad
   git commit -m "fix"

   # ✅ Good
   git commit -m "fix(wallet): resolve race condition in transfer operation

   - Added transaction locking to prevent concurrent transfers
   - Implemented retry logic with exponential backoff
   - Added test case for concurrent transfer scenario"
   ```

9. **Test edge cases**

   - Zero amounts, negative amounts
   - Non-existent users
   - Expired tokens
   - Duplicate requests
   - Network failures

10. **Update relevant documentation**
    - Update API docs if endpoint changed
    - Update README if setup changed
    - Update PLANNING.md if architecture changed

---

## 📄 SESSION MANAGEMENT

### Starting a Session

```markdown
## Session Start: 2025-10-15 09:00 AM

**Previous Session Summary:**

- Week 1, Day 1
- Completed: FastAPI setup, database schema
- In Progress: Authentication endpoints
- Blockers: None

**Current Task:**

- Task #3: Implement user registration endpoint
- Priority: P0
- Estimated: 2 hours

**Blockers Checked:**

- None in ERRORS.md

**Environment Status:**

- ✅ Backend running (port 8000)
- ✅ Frontend running (port 5173)
- ✅ Database connected
- ✅ Redis running

**Plan for This Session:**

1. Implement POST /api/v1/auth/register endpoint
2. Add Pydantic validation schema
3. Hash password with bcrypt
4. Create user in database
5. Write unit tests
6. Test manually with curl/Postman
```

---

### During the Session

**Every 30 minutes:**

- Save all files (Ctrl+S / Cmd+S)
- Commit code with meaningful message
- Quick mental check: "Am I on the right task?"

**After each sub-task:**

- Run tests
- Verify in browser/Postman
- Document any issues immediately in ERRORS.md

**Taking notes:**

```markdown
## Session Notes - 2025-10-15

**09:15** - Started registration endpoint implementation
**09:30** - Added Pydantic schema for validation
**09:45** - Issue: Email validation regex not working - Solution: Used pydantic.EmailStr instead
**10:00** - Password hashing implemented with passlib
**10:15** - Database insert working
**10:30** - Writing tests
```

---

### Ending a Session

1. **Create comprehensive session summary in PROGRESS.md:**

```markdown
## Session Summary - 2025-10-15 (09:00 AM - 12:00 PM)

Duration: 3 hours
Week: 1, Day 1

### ✅ Completed Tasks

**[P0] User Registration Endpoint**

- Implemented: POST /api/v1/auth/register
- Added: Pydantic validation (email, password strength, phone format)
- Security: Password hashing with bcrypt (12 rounds)
- Database: User creation with error handling
- Tests: 5 unit tests written and passing
- Manual Testing: Verified with Postman, all cases work

**Files Created/Modified:**

- backend/app/api/routes/auth.py (created)
- backend/app/schemas/user.py (created)
- backend/app/models/user.py (modified - added unique constraint)
- backend/tests/test_api/test_auth_routes.py (created)
- backend/requirements.txt (added passlib[bcrypt])

**Database Changes:**

- Added unique constraint on users.email
- Added unique constraint on users.phone

### 🚧 In Progress

**[P0] User Login Endpoint**

- Started: JWT token generation logic
- 40% complete
- Next: Implement refresh token rotation
- Estimated remaining: 1 hour

### ⚠️ Issues Encountered

**Email validation initially failing:**

- Problem: Custom regex was too strict
- Solution: Switched to pydantic.EmailStr
- Time lost: 15 minutes
- Documented: ERRORS.md entry #5

**Database unique constraint error not handled:**

- Problem: Duplicate email crashed with unhandled exception
- Solution: Added try-except for IntegrityError
- Prevention: Now all database operations have error handling

### 📊 Metrics

- Lines of code written: ~200
- Tests written: 5
- Tests passing: 5/5 (100%)
- Bugs fixed: 2
- New bugs introduced: 0

### 🎯 Next Session Priority

**Must complete next session:**

1. [P0] Finish login endpoint (JWT + refresh token)
2. [P0] Test authentication flow end-to-end
3. [P1] Setup frontend auth context

**Can defer if needed:**

- [P2] Add 2FA support

### 📝 Important Notes

- Remember: JWT secret must be in .env, never hardcoded
- Phone validation: Currently US/Mexico format only (+1, +52)
- Password requirements: Min 8 chars, 1 uppercase, 1 number
- Registration sends verification email (SendGrid configured)

### 🔗 References

- JWT implementation: https://fastapi.tiangolo.com/tutorial/security/
- Passlib docs: https://passlib.readthedocs.io/
- Pydantic validation: https://docs.pydantic.dev/

---

**Status:** On track for Week 1 goals ✅
**Blockers:** None
**Team communication needed:** None
```

2. **Update all tracking files:**

   - ✅ TASKS.md: Mark completed tasks with [x]
   - ✅ PROGRESS.md: Add session summary above
   - ✅ ERRORS.md: Document new errors or mark resolved
   - ✅ Git commit: All code changes with good message

3. **Cleanup and confirmation:**

   ```
   "Session ended successfully at 12:00 PM.

   Summary:
   ✅ Completed: 1 task (User registration endpoint)
   🚧 In Progress: 1 task (User login endpoint - 40%)
   📝 Documented: All changes in PROGRESS.md
   🐛 Errors: 2 resolved, 0 active blockers

   Next Session:
   🎯 Priority: Complete login endpoint
   ⏱️ Estimated: 1-2 hours
   📅 Week 1, Day 2

   Sprint Progress: 2/15 tasks complete (13%)
   On track for Week 1 completion ✅"
   ```

---

## 🔧 CONTEXT RECOVERY PROTOCOL

**If context is lost or starting fresh session:**

### Step 1: Read Last 3 Session Summaries

```bash
# Open PROGRESS.md and read bottom-up
# Look for:
- What was completed recently
- What's currently in progress
- Any blockers mentioned
- Important decisions made
```

### Step 2: Check Git Status

```bash
cd backend
git status
# Look for uncommitted changes

git log --oneline -5
# See last 5 commits to understand recent work
```

### Step 3: Review Active Tasks

```bash
# Open TASKS.md
# Find current week section
# Look for tasks marked [ ] or [~] (in progress)
# Identify highest priority incomplete task
```

### Step 4: Check for Blockers

```bash
# Open ERRORS.md
# Look for entries marked:
# - [ ] (Active/Unresolved)
# Read through to understand current issues
```

### Step 5: Verify Environment

```bash
# Backend
cd backend
source venv/bin/activate  # or venv\Scripts\activate on Windows
pip list  # Verify packages installed
python -c "import app; print('OK')"  # Test imports
uvicorn app.main:app --reload  # Start server

# Frontend Web
cd frontend-web
pnpm install  # Ensure packages installed
pnpm dev  # Start dev server

# Database
# Check Supabase dashboard - connection active?

# Redis
redis-cli ping  # Should return PONG
```

### Step 6: Continue from Last Checkpoint

```
"Context recovered successfully.

Last session: 2025-10-15 09:00-12:00 (3 hours ago)
Last task completed: User registration endpoint
Current task: User login endpoint (40% complete)
Next step: Implement refresh token rotation

Environment verified:
✅ Backend running
✅ Frontend running
✅ Database connected
✅ No active blockers

Resuming work on: app/api/routes/auth.py
Function: login_endpoint
Estimated time to completion: 1 hour"
```

---

## 📊 QUALITY CHECKLIST

**Before marking ANY task as complete, verify ALL items:**

### Functionality

- [ ] Code runs without errors
- [ ] All acceptance criteria met
- [ ] Edge cases tested (null, empty, invalid inputs)
- [ ] Works on both success and failure paths

### Code Quality

- [ ] Follows project naming conventions
- [ ] Proper TypeScript types / Python type hints used
- [ ] No hardcoded values (use constants/config)
- [ ] No commented-out code left behind
- [ ] No console.log / print statements in production code
- [ ] Functions are single-purpose and reasonably sized (<50 lines)

### Security

- [ ] Input validation implemented (Pydantic schemas)
- [ ] Authentication/authorization checked where needed
- [ ] SQL injection prevented (using ORM only)
- [ ] XSS prevented (React auto-escapes, API returns JSON)
- [ ] Sensitive data not logged
- [ ] Rate limiting applied to public endpoints
- [ ] CORS configured correctly

### Error Handling

- [ ] Try-catch blocks around async operations
- [ ] Specific error types used (not generic Exception)
- [ ] User-friendly error messages
- [ ] Errors logged with context
- [ ] HTTP status codes correct (400 vs 404 vs 500)

### Database

- [ ] Migrations created if schema changed
- [ ] Transactions used for multi-step operations
- [ ] Indexes exist on frequently queried columns
- [ ] No N+1 query problems
- [ ] Connection pooling configured

### Testing

- [ ] Unit tests written for business logic
- [ ] Tests pass locally
- [ ] Manual testing completed
- [ ] Tested on both frontend and backend if fullstack feature

### Documentation

- [ ] Docstrings added to new functions
- [ ] TASKS.md updated with completion
- [ ] PROGRESS.md updated with details
- [ ] ERRORS.md updated if errors encountered
- [ ] API docs updated if endpoints changed (OpenAPI auto-generated)
- [ ] README updated if setup/deployment changed

### Performance

- [ ] No unnecessary API calls
- [ ] Proper caching where applicable (Redis)
- [ ] Images optimized if added
- [ ] Bundle size acceptable (<200KB for critical paths)
- [ ] No infinite loops or memory leaks

### User Experience

- [ ] Responsive design maintained (mobile + desktop)
- [ ] Loading states shown for async operations
- [ ] Error messages are user-friendly
- [ ] Success feedback provided
- [ ] Accessibility standards met (WCAG 2.1 AA)
- [ ] Navigation intuitive

### Git

- [ ] All changes committed
- [ ] Commit messages descriptive
- [ ] Branch up to date with main
- [ ] No merge conflicts

---

## 🆘 WHEN STUCK PROTOCOL

### Level 1: First 15 Minutes (Self-Debug)

1. **Read error message carefully**

   - Don't skim, read every word
   - Note: file, line number, error type

2. **Check ERRORS.md**

   ```bash
   # Search for similar errors
   # Keywords to search: error type, file name, function name
   ```

3. **Review working examples in codebase**

   ```bash
   # Find similar working code
   # Example: If struggling with authentication,
   # search for other authenticated endpoints
   grep -r "authenticate" backend/app/api/routes/
   ```

4. **Check official documentation**
   - FastAPI: https://fastapi.tiangolo.com/
   - React Query: https://tanstack.com/query/latest/docs/react/overview
   - Supabase: https://supabase.com/docs
   - Stellar SDK: https://stellar-sdk.readthedocs.io/

---

### Level 2: After 15 Minutes (Still Stuck)

1. **Document the error completely in ERRORS.md:**

````markdown
## Active Errors

- [ ] [2025-10-15 10:30] Stellar transaction fails with "bad auth" error
  - **File:** backend/app/core/stellar.py:45
  - **Function:** send_usdc()
  - **Error:** `stellar_sdk.exceptions.BadRequestError: transaction failed: tx_bad_auth`
  - **Context:**
    - Trying to send 500 USDC from hot wallet to test address
    - Hot wallet has sufficient balance (checked via Horizon)
    - Transaction builds successfully, fails on submit
  - **Code Snippet:**

    ```python
    transaction = TransactionBuilder(
        source_account=source_account,
        network_passphrase=Network.TESTNET_NETWORK_PASSPHRASE,
        base_fee=100
    ).append_payment_op(
        destination=destination_address,
        asset=self.usdc_asset,
        amount=str(amount)
    ).build()

    transaction.sign(self.hot_wallet_keypair)  # Line 45 - FAILS HERE
    response = self.server.submit_transaction(transaction)
    ```

  - **Environment:**
    - Stellar Network: Testnet
    - SDK version: stellar-sdk 9.1.0
    - Hot wallet loaded from env var
  - **Attempted Solutions:**
    1. ❌ Verified hot wallet secret is correct (it is)
    2. ❌ Checked account exists on testnet (it does)
    3. ❌ Tried with different test account (same error)
  - **Next Steps to Try:**
    - Check if account has trustline for USDC
    - Verify network passphrase matches (testnet vs public)
    - Try with native XLM transfer first
  - **Status:** Active - blocking P0 task "Stellar integration"
  - **Impact:** Cannot test remittance flow
  - **Workaround:** None available
````

2. **Mark task as blocked in TASKS.md:**

```markdown
- [~] [2025-10-15 10:00] [P0] Implement Stellar USDC transfer
  - Status: 🚫 BLOCKED
  - Blocker: Stellar auth error (see ERRORS.md #12)
  - Time spent: 1.5 hours
  - Next: Try trustline verification
```

3. **Move to next P1 task:**

```
"Task blocked after 15 minutes of debugging.

Blocked task: Stellar USDC transfer
Blocker documented: ERRORS.md entry #12

Moving to next available task:
Next task: [P1] Implement transaction history endpoint
Estimated time: 2 hours

Will return to blocked task after:
- Consultation with team
- Fresh perspective tomorrow
- More research completed"
```

---

### Level 3: Persistent Blocker (After 1 Hour Total)

1. **Add to ERRORS.md as HIGH PRIORITY BLOCKER:**

```markdown
## 🚨 HIGH PRIORITY BLOCKERS

- [ ] [2025-10-15 11:30] **[BLOCKER]** Stellar transaction authentication failure
  - **Priority:** P0 - Blocking core remittance feature
  - **Time Lost:** 1 hour
  - **Status:** Needs team consultation
  - [All details from Level 2 above]
  - **Escalation:** Scheduled for team review / Stack Overflow question posted
```

2. **Update sprint status:**

```markdown
## Week 1 Status

**At Risk:**

- Stellar integration blocked (1 hour lost)
- May need to adjust Week 1 goals if not resolved by end of day

**Mitigation:**

- Continuing with other P1 tasks
- Researching alternative approaches
- Team consultation scheduled
```

3. **Consider alternatives:**

   - Can we use mock Stellar responses for now?
   - Can we defer this feature and work on others?
   - Is there a simpler test case to start with?
   - Do we need external help (Discord, Stack Overflow)?

4. **Document decision and move forward:**

```
"After 1 hour on blocker, implementing mitigation:

Decision: Create mock Stellar service for testing
- Allows frontend development to continue
- Allows testing of other features
- Real Stellar integration becomes separate task

New tasks created:
- [P1] Create MockStellarService for testing
- [P0] Debug Stellar auth issue (separate session)

Current session focus:
- Proceeding with transaction history endpoint
- Using mocked blockchain responses

Blocker will be addressed:
- Next session (fresh perspective)
- After team consultation
- With additional research"
```

---

## 🎯 PROJECT-SPECIFIC FOCUS AREAS

### 1. Core Feature Priority (IN ORDER)

**Week 1-2: Foundation**

- ✅ Authentication (register, login, JWT)
- ✅ Database schema (users, wallets, transactions)
- ✅ Stellar integration (testnet)
- ✅ Basic wallet operations (balance, history)

**Week 3-4: Remittance Flow**

- ✅ Send money endpoint (USA → Mexico)
- ✅ Receive money endpoint
- ✅ Circle integration (USD → USDC)
- ✅ Internal balance tracking
- ✅ P2P transfers

**Week 5-6: Payments**

- ✅ NFC payment flow (merchant + customer)
- ✅ QR code payments (fallback)
- ✅ Merchant dashboard
- ✅ Payment processing

**Week 7: Cash-out**

- ✅ Bitso integration
- ✅ SPEI withdrawal
- ✅ Bank account management
- ✅ Status monitoring

**Week 8: Polish & Launch**

- ✅ Security hardening
- ✅ Monitoring setup
- ✅ Load testing
- ✅ Beta launch

### 2. Technical Excellence Standards

**Code Maintainability:**

- Functions < 50 lines
- Clear variable names (no `x`, `tmp`, `data`)
- Docstrings on all public functions
- Type hints everywhere (Python) / Types everywhere (TypeScript)
- DRY principle (Don't Repeat Yourself)

**Scalability Considerations:**

- Database queries optimized (use EXPLAIN ANALYZE)
- Caching where appropriate (Redis, React Query)
- Pagination on all list endpoints (default limit: 20)
- Connection pooling configured
- Rate limiting on all public endpoints

**Security First Approach:**

- Input validation on ALL endpoints (Pydantic)
- Authentication required on all non-public endpoints
- Authorization checks (user can only access their data)
- Audit logging on all financial transactions
- Secrets in environment variables only
- HTTPS only in production

**Performance Optimization:**

- API p95 latency < 200ms (measure with load tests)
- Frontend FCP < 1.5s (measure with Lighthouse)
- Database queries < 100ms (use indexes)
- Redis caching for expensive queries (30s TTL)
- Image optimization (lazy loading, proper formats)

### 3. User Experience Principles

**Intuitive Interface:**

- Maximum 3 taps to complete any primary action
- Clear error messages ("Insufficient balance" not "Error 400")
- Success feedback on every action (toast, animation)
- Consistent UI patterns (buttons, inputs, cards)
- Loading states on all async operations

**Fast Performance:**

- No loading spinners >2 seconds
- Optimistic UI updates where safe
- Background sync for non-critical operations
- Debounced search inputs
- Virtualized long lists

**Mobile Responsive:**

- Mobile-first design (90% of users)
- Touch targets ≥44px (accessibility)
- Readable text without zooming (16px minimum)
- Works offline for viewing balance/history (PWA)
- Native feel on mobile (smooth animations)

**Accessibility Compliance:**

- WCAG 2.1 AA standard
- Keyboard navigation works everywhere
- Screen reader friendly (semantic HTML, ARIA labels)
- Color contrast ratios ≥4.5:1
- Focus indicators visible
- Alt text on all images

---

## 📈 SUCCESS METRICS

### Your Performance Improves When You:

1. **Complete P0 tasks first** (every single time)

   - P0 means blocker, drop everything else
   - Document why it's P0 in task description

2. **Document immediately** (not "later")

   - Update TASKS.md right after completing task
   - Add to PROGRESS.md same session
   - Log errors in ERRORS.md as they happen

3. **Prevent bugs with validation** (before they occur)

   - Validate all inputs with Pydantic
   - Check for None/null before accessing
   - Use type hints to catch errors at dev time

4. **Write clean, readable code** (self-documenting)

   - Names are clear: `getUserBalance()` not `get()`
   - Functions do one thing: `validateEmail()` not `validate()`
   - Comments explain WHY not WHAT

5. **Follow all framework rules** (100% compliance)

   - Read .md files every session start
   - Use correct file naming
   - Follow API response format
   - Match error handling pattern

6. **Update tracking files promptly** (don't accumulate)

   - TASKS.md after each task
   - PROGRESS.md at end of session
   - ERRORS.md when errors occur
   - Never leave documentation for "later"

7. **Test thoroughly** (before marking complete)

   - Happy path works
   - Error cases handled
   - Edge cases covered
   - Manual testing done

8. **Communicate clearly** (in documentation)
   - Session summaries are detailed
   - Error descriptions are complete
   - Decisions are explained
   - Context is provided

---

### Signs of a Good Session:

✅ **No new P0 errors introduced**

- All code changes tested before commit
- Error handling implemented proactively

✅ **All tasks documented**

- TASKS.md updated
- PROGRESS.md has session summary
- ERRORS.md reflects current state

✅ **Code is tested**

- Unit tests pass
- Manual testing completed
- No console errors

✅ **Progress is measurable**

- Can quantify what was completed
- Clear view of remaining work
- Sprint goals advancing

✅ **Quality maintained**

- Follows all conventions
- Security standards met
- Performance acceptable

---

## 🔍 COMMON PATTERNS TO FOLLOW

### Pattern 1: Error Handling (FastAPI)

```python
# app/services/wallet_service.py

from fastapi import HTTPException
from app.models.wallet import Wallet
from app.core.logger import logger
from decimal import Decimal
from uuid import UUID

class InsufficientBalanceError(Exception):
    """Custom exception for insufficient balance"""
    pass

class WalletService:
    async def transfer_money(
        self,
        from_user_id: UUID,
        to_user_id: UUID,
        amount: Decimal
    ) -> dict:
        """
        Transfer money between users.

        Raises:
            HTTPException: 400 if insufficient balance
            HTTPException: 404 if user not found
            HTTPException: 500 if internal error
        """
        try:
            # 1. Get wallets
            from_wallet = await self.get_wallet(from_user_id)
            to_wallet = await self.get_wallet(to_user_id)

            if not from_wallet or not to_wallet:
                raise HTTPException(
                    status_code=404,
                    detail={
                        "code": "USER_NOT_FOUND",
                        "message": "One or both users not found"
                    }
                )

            # 2. Check balance
            if from_wallet.balance_usdc < amount:
                logger.warning(
                    "Transfer failed: insufficient balance",
                    extra={
                        "user_id": str(from_user_id),
                        "balance": str(from_wallet.balance_usdc),
                        "requested": str(amount)
                    }
                )
                raise HTTPException(
                    status_code=400,
                    detail={
                        "code": "INSUFFICIENT_BALANCE",
                        "message": f"Insufficient balance. Available: {from_wallet.balance_usdc}, Required: {amount}",
                        "balance": str(from_wallet.balance_usdc),
                        "required": str(amount)
                    }
                )

            # 3. Execute transfer (atomic transaction)
            async with self.db.begin():
                from_wallet.balance_usdc -= amount
                to_wallet.balance_usdc += amount

                transaction = await self.create_transaction(
                    from_user_id=from_user_id,
                    to_user_id=to_user_id,
                    amount=amount,
                    type="p2p_transfer"
                )

            # 4. Success logging
            logger.info(
                "Transfer completed successfully",
                extra={
                    "transaction_id": str(transaction.id),
                    "from_user": str(from_user_id),
                    "to_user": str(to_user_id),
                    "amount": str(amount)
                }
            )

            return {
                "transaction_id": str(transaction.id),
                "status": "completed",
                "amount": str(amount)
            }

        except HTTPException:
            # Re-raise HTTP exceptions (already formatted)
            raise

        except Exception as e:
            # Catch any unexpected errors
            logger.error(
                "Transfer failed with unexpected error",
                exc_info=True,
                extra={
                    "from_user": str(from_user_id),
                    "to_user": str(to_user_id),
                    "amount": str(amount),
                    "error": str(e)
                }
            )
            raise HTTPException(
                status_code=500,
                detail={
                    "code": "INTERNAL_ERROR",
                    "message": "Transfer failed. Please try again."
                }
            )
```

---

### Pattern 2: API Endpoint (FastAPI)

```python
# app/api/routes/wallet.py

from fastapi import APIRouter, Depends, HTTPException
from app.schemas.wallet import TransferRequest, TransferResponse
from app.services.wallet_service import WalletService
from app.api.deps import get_current_user, rate_limit
from app.models.user import User

router = APIRouter(prefix="/wallet", tags=["wallet"])

@router.post(
    "/transfer",
    response_model=TransferResponse,
    status_code=200,
    summary="Transfer money between users",
    description="Transfer USDC from authenticated user to another user"
)
async def transfer_money(
    request: TransferRequest,
    current_user: User = Depends(get_current_user),
    _: None = Depends(rate_limit(max_requests=10, window=60))  # 10 requests per minute
):
    """
    Transfer money from authenticated user to recipient.

    - **to_user_id**: Recipient user UUID
    - **amount**: Amount in USDC (must be > 0 and ≤ 10000)
    - **note**: Optional transfer note (max 200 chars)

    Returns transaction details with status.

    Raises:
    - 400: Insufficient balance or invalid input
    - 404: Recipient not found
    - 429: Rate limit exceeded
    - 500: Internal server error
    """
    wallet_service = WalletService()

    result = await wallet_service.transfer_money(
        from_user_id=current_user.id,
        to_user_id=request.to_user_id,
        amount=request.amount
    )

    return {
        "success": True,
        "data": result,
        "timestamp": datetime.utcnow().isoformat()
    }
```

---

### Pattern 3: Pydantic Validation Schema

```python
# app/schemas/wallet.py

from pydantic import BaseModel, Field, validator
from decimal import Decimal
from uuid import UUID
from typing import Optional

class TransferRequest(BaseModel):
    """Request schema for money transfer"""

    to_user_id: UUID = Field(
        ...,
        description="Recipient user ID"
    )

    amount: Decimal = Field(
        ...,
        gt=0,
        le=10000,
        decimal_places=6,
        description="Amount to transfer in USDC"
    )

    note: Optional[str] = Field(
        None,
        max_length=200,
        description="Optional note for transfer"
    )

    @validator('amount')
    def validate_amount(cls, v):
        """Ensure amount has max 6 decimal places"""
        if v.as_tuple().exponent < -6:
            raise ValueError('Amount can have maximum 6 decimal places')
        return v

    class Config:
        schema_extra = {
            "example": {
                "to_user_id": "123e4567-e89b-12d3-a456-426614174000",
                "amount": "100.50",
                "note": "Payment for dinner"
            }
        }

class TransferResponse(BaseModel):
    """Response schema for money transfer"""

    success: bool = Field(..., description="Operation success status")
    data: dict = Field(..., description="Transaction details")
    timestamp: str = Field(..., description="Response timestamp")

    class Config:
        schema_extra = {
            "example": {
                "success": True,
                "data": {
                    "transaction_id": "123e4567-e89b-12d3-a456-426614174000",
                    "status": "completed",
                    "amount": "100.50"
                },
                "timestamp": "2025-10-15T10:30:00Z"
            }
        }
```

---

### Pattern 4: React Component with Query

```typescript
// frontend-web/src/features/wallet/components/TransactionList.tsx

import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Transaction } from "@/types";
import { walletService } from "@/services/walletService";
import { TransactionCard } from "./TransactionCard";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert } from "@/components/ui/alert";

interface TransactionListProps {
  userId?: string;
}

export function TransactionList({ userId }: TransactionListProps) {
  const [page, setPage] = useState(1);
  const limit = 20;

  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["transactions", page, limit, userId],
    queryFn: () => walletService.getTransactions({ page, limit }),
    staleTime: 30000, // 30 seconds
    cacheTime: 300000, // 5 minutes
    retry: 2,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });

  // Loading state
  if (isLoading) {
    return (
      <div className="space-y-4">
        {[...Array(5)].map((_, i) => (
          <Skeleton key={i} className="h-20 w-full" />
        ))}
      </div>
    );
  }

  // Error state
  if (isError) {
    return (
      <Alert variant="destructive">
        <AlertTitle>Error loading transactions</AlertTitle>
        <AlertDescription>
          {error instanceof Error ? error.message : "Unknown error occurred"}
        </AlertDescription>
        <Button onClick={() => refetch()} className="mt-4">
          Try Again
        </Button>
      </Alert>
    );
  }

  // Empty state
  if (!data?.data?.transactions?.length) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">No transactions yet</p>
      </div>
    );
  }

  // Success state
  return (
    <div className="space-y-4">
      {data.data.transactions.map((transaction: Transaction) => (
        <TransactionCard key={transaction.id} transaction={transaction} />
      ))}

      {/* Pagination */}
      {data.data.pagination.pages > 1 && (
        <div className="flex justify-center gap-2 mt-6">
          <Button
            onClick={() => setPage(page - 1)}
            disabled={page === 1}
            variant="outline"
          >
            Previous
          </Button>
          <span className="py-2 px-4">
            Page {page} of {data.data.pagination.pages}
          </span>
          <Button
            onClick={() => setPage(page + 1)}
            disabled={page === data.data.pagination.pages}
            variant="outline"
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
}
```

---

## 🎯 REMEMBER

### The Framework Exists To:

1. **Maintain code quality**

   - Consistent patterns across codebase
   - Easy for anyone to understand
   - Reduces bugs and technical debt

2. **Track progress accurately**

   - Always know what's done, in progress, blocked
   - Sprint planning is reliable
   - Stakeholders have visibility

3. **Prevent repeated errors**

   - ERRORS.md documents solutions
   - Don't waste time on same problem twice
   - Build knowledge base

4. **Ensure project success**

   - MVP launches on time (8 weeks)
   - Features work reliably
   - Security is not compromised

5. **Facilitate collaboration**
   - Any developer can jump in
   - Context is documented
   - Handoffs are smooth

---

### Never Compromise On:

1. **Security standards**

   - Input validation (always)
   - Authentication checks (always)
   - Secrets management (environment variables only)
   - Audit logging (financial transactions)
   - Rate limiting (public endpoints)

2. **Code documentation**

   - Docstrings on public functions
   - Comments for complex logic
   - TASKS.md updates after completion
   - PROGRESS.md session summaries
   - ERRORS.md for all issues

3. **Error handling**

   - Try-catch around async operations
   - Specific error messages
   - Logging with context
   - User-friendly responses
   - Graceful degradation

4. **Task tracking**

   - Update TASKS.md immediately after completion
   - Document blockers in real-time
   - Keep PROGRESS.md current
   - Maintain accurate sprint status

5. **Testing discipline**
   - Test after every change
   - Cover edge cases
   - Manual verification
   - Unit tests for business logic
   - E2E tests for critical flows

---

## 📅 CURRENT SPRINT INFORMATION

**Sprint:** MVP Development (8 weeks)  
**Sprint Goal:** Launch beta with 50 users, all core features functional  
**Sprint Start Date:** [To be filled when development starts]  
**Sprint End Date:** [Start date + 8 weeks]

**Week Breakdown:**

- Week 1-2: Foundation (Auth, Database, Stellar)
- Week 3-4: Remittance Flow (Send/Receive, Circle)
- Week 5-6: Payments (NFC/QR, Merchant Dashboard)
- Week 7: Cash-out (Bitso Integration)
- Week 8: Polish & Launch (Security, Testing, Beta)

**Current Week:** [To be updated]  
**Current Day:** [To be updated]

**Sprint Velocity Target:**

- 15 tasks per week average
- 120 total tasks for MVP
- 2-3 hours per task average

**Definition of Done:**

- Code runs without errors
- All tests pass
- Documented in TASKS.md, PROGRESS.md
- Security checklist complete
- Manual testing verified
- Code reviewed (if team)
- Deployed to staging

---

_This document is the source of truth for development behavior. Follow it strictly for project success._

**Last Updated:** October 15, 2025  
**Version:** 1.0  
**Maintained By:** Engineering Team  
**Next Review:** Weekly during sprint
