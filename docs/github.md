# GITHUB.md - Version Control & CI/CD Guide

## Wani - Remittance & Digital Wallet Platform

---

## 📋 Project Context

- **Repository Name:** `wani-platform`
- **Owner/Organization:** [YOUR_GITHUB_USERNAME]
- **Project Path:** `~/projects/wani` (adjust to your path)
- **Visibility:** Private (contains financial logic and API keys)
- **Tech Stack:**
  - Frontend Web: React 18 + TypeScript + Vite
  - Frontend Mobile: React Native + Expo SDK 50
  - Backend: FastAPI (Python 3.11+)
  - Database: PostgreSQL (Supabase)
  - Cache: Redis
  - Blockchain: Stellar Network
- **Deployment Platforms:**
  - Web: Vercel
  - Mobile: EAS (Expo Application Services)
  - Backend: Railway
  - Database: Supabase (hosted)
- **Team Size:** Solo/Small team (1-3 developers)

---

## 🚀 Repository Setup

### Initial Configuration

```bash
# 1. Initialize Git repository
cd ~/projects/wani
git init

# 2. Configure Git user (if not done globally)
git config user.name "Your Name"
git config user.email "your.email@example.com"

# 3. Create initial structure
mkdir -p backend frontend-web frontend-mobile docs .github/workflows

# 4. Create initial files
touch README.md .gitignore .gitattributes

# 5. Add all files
git add .

# 6. Initial commit
git commit -m "chore: initial project structure"

# 7. Create repository on GitHub (via CLI or web)
# If using GitHub CLI:
gh repo create wani-platform --private --source=. --remote=origin

# Or manually add remote:
git remote add origin https://github.com/YOUR_USERNAME/wani-platform.git

# 8. Create and push main branch
git branch -M main
git push -u origin main

# 9. Create develop branch
git checkout -b develop
git push -u origin develop

# 10. Set develop as default branch for new features
git checkout develop
```

---

### Branch Structure

```
main (production - protected)
  │
  ├── Deployments:
  │   ├── Vercel (frontend-web)
  │   ├── EAS (frontend-mobile)
  │   └── Railway (backend)
  │
  └── develop (staging - protected)
      │
      ├── feature/auth-jwt-refresh
      │   └── Implementation: JWT token refresh logic
      │
      ├── feature/nfc-payments
      │   └── Implementation: NFC payment flow
      │
      ├── feature/bitso-integration
      │   └── Implementation: Cash-out via Bitso
      │
      ├── bugfix/balance-precision
      │   └── Fix: Decimal precision in balance calculations
      │
      ├── bugfix/stellar-trustline
      │   └── Fix: Check trustline before USDC transfer
      │
      ├── chore/update-dependencies
      │   └── Update: npm and pip dependencies
      │
      └── hotfix/critical-auth-bug
          └── Emergency fix deployed directly to main
```

**Branch Naming Convention:**

- `feature/descriptive-name` - New features
- `bugfix/issue-description` - Bug fixes
- `hotfix/critical-issue` - Emergency production fixes
- `chore/task-name` - Maintenance tasks
- `refactor/component-name` - Code refactoring
- `docs/section-name` - Documentation updates

---

## 📄 Git Configuration Files

### .gitignore

```gitignore
# ============================================
# DEPENDENCIES
# ============================================

# Node.js
node_modules/
npm-debug.log*
yarn-debug.log*
yarn-error.log*
pnpm-debug.log*
.pnpm-store/

# Python
venv/
env/
ENV/
.venv/
__pycache__/
*.py[cod]
*$py.class
*.so
.Python
build/
develop-eggs/
dist/
downloads/
eggs/
.eggs/
lib/
lib64/
parts/
sdist/
var/
wheels/
pip-wheel-metadata/
share/python-wheels/
*.egg-info/
.installed.cfg
*.egg
MANIFEST

# ============================================
# ENVIRONMENT & SECRETS
# ============================================

# Environment variables
.env
.env.local
.env.development
.env.test
.env.production
.env*.local

# Secrets
*.pem
*.key
*.cert
secrets/
.secrets/

# API Keys (extra protection)
**/config/keys.js
**/config/secrets.py

# ============================================
# BUILD OUTPUTS
# ============================================

# Frontend Web (Vite + React)
frontend-web/dist/
frontend-web/build/
frontend-web/.vite/
frontend-web/.cache/

# Frontend Mobile (Expo)
frontend-mobile/.expo/
frontend-mobile/dist/
frontend-mobile/build/
frontend-mobile/ios/
frontend-mobile/android/

# Backend (Python)
backend/.pytest_cache/
backend/.coverage
backend/htmlcov/
backend/.mypy_cache/
backend/.ruff_cache/

# ============================================
# DATABASES
# ============================================

# SQLite
*.sqlite
*.sqlite3
*.db

# PostgreSQL dumps
*.sql
*.dump

# Redis
dump.rdb

# Alembic (keep migrations, ignore temp files)
backend/alembic/versions/__pycache__/

# ============================================
# IDE & EDITORS
# ============================================

# VS Code
.vscode/
!.vscode/settings.json
!.vscode/tasks.json
!.vscode/launch.json
!.vscode/extensions.json
*.code-workspace

# JetBrains (PyCharm, WebStorm, etc.)
.idea/
*.iml
*.iws
*.ipr
out/

# Sublime Text
*.sublime-project
*.sublime-workspace

# Vim
*.swp
*.swo
*~

# Emacs
*~
\#*\#
.\#*

# ============================================
# LOGS
# ============================================

# Application logs
logs/
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Python logs
*.log
pip-log.txt
pip-delete-this-directory.txt

# ============================================
# OPERATING SYSTEM
# ============================================

# macOS
.DS_Store
.AppleDouble
.LSOverride
._*
.Spotlight-V100
.Trashes

# Windows
Thumbs.db
ehthumbs.db
Desktop.ini
$RECYCLE.BIN/
*.lnk

# Linux
.directory
.Trash-*

# ============================================
# TESTING
# ============================================

# Coverage reports
coverage/
.coverage
.coverage.*
htmlcov/
.pytest_cache/
.tox/
.nox/

# Test results
test-results/
junit.xml
coverage.xml

# Playwright
frontend-web/test-results/
frontend-web/playwright-report/
frontend-web/playwright/.cache/

# ============================================
# TEMPORARY FILES
# ============================================

# General
tmp/
temp/
*.tmp
*.bak
*.swp
*.swo
*.old

# Python
*.pyc
*.pyo
*.pyd
.Python

# Node
.npm
.eslintcache

# ============================================
# DEPLOYMENT & CI/CD
# ============================================

# Vercel
.vercel

# Railway
.railway/

# EAS (Expo)
.eas/

# Docker
docker-compose.override.yml

# ============================================
# PROJECT-SPECIFIC
# ============================================

# Stellar testnet keys (development only, NEVER production)
backend/stellar_testnet_keys.json

# Uploaded files (local development)
backend/uploads/
backend/temp_uploads/

# Generated documentation
docs/build/

# Mock data
backend/mock_data/

# Local scripts
scripts/local/

# ============================================
# KEEP THESE FILES (Examples)
# ============================================
# !.gitkeep files to keep empty directories
# !example.env (template for environment variables)
```

---

### .gitattributes

```gitattributes
# ============================================
# TEXT FILES - Normalize line endings to LF
# ============================================

# Source code
*.js text eol=lf
*.jsx text eol=lf
*.ts text eol=lf
*.tsx text eol=lf
*.py text eol=lf
*.html text eol=lf
*.css text eol=lf
*.scss text eol=lf
*.json text eol=lf
*.yml text eol=lf
*.yaml text eol=lf
*.md text eol=lf
*.xml text eol=lf

# Configuration files
*.config.js text eol=lf
*.conf text eol=lf
.env* text eol=lf
.gitignore text eol=lf
.gitattributes text eol=lf

# Shell scripts
*.sh text eol=lf
*.bash text eol=lf

# ============================================
# BINARY FILES - Do not modify
# ============================================

# Images
*.png binary
*.jpg binary
*.jpeg binary
*.gif binary
*.ico binary
*.svg binary
*.webp binary

# Fonts
*.woff binary
*.woff2 binary
*.ttf binary
*.eot binary
*.otf binary

# Documents
*.pdf binary
*.doc binary
*.docx binary

# Archives
*.zip binary
*.tar binary
*.gz binary
*.7z binary
*.rar binary

# ============================================
# LANGUAGE-SPECIFIC SETTINGS
# ============================================

# Python
*.py linguist-language=Python
requirements.txt linguist-language=Text

# TypeScript/JavaScript
*.ts linguist-language=TypeScript
*.tsx linguist-language=TypeScript
*.js linguist-language=JavaScript
*.jsx linguist-language=JavaScript

# Ignore generated files in language stats
frontend-web/dist/** linguist-generated=true
frontend-mobile/ios/** linguist-generated=true
frontend-mobile/android/** linguist-generated=true
backend/__pycache__/** linguist-generated=true

# ============================================
# DIFF SETTINGS
# ============================================

# Make diffs for lockfiles more readable
package-lock.json -diff
yarn.lock -diff
poetry.lock -diff
Pipfile.lock -diff
```

---

## 📝 Commit Conventions

### Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

**Rules:**

- Subject line max 72 characters
- Use imperative mood ("add" not "added")
- No period at end of subject line
- Body and footer are optional
- Reference issues in footer: `Closes #123`

---

### Types

| Type       | Description      | When to Use                          |
| ---------- | ---------------- | ------------------------------------ |
| `feat`     | New feature      | Adding new functionality             |
| `fix`      | Bug fix          | Fixing a bug                         |
| `docs`     | Documentation    | Only documentation changes           |
| `style`    | Code style       | Formatting, missing semicolons, etc. |
| `refactor` | Code refactoring | Neither fixes bug nor adds feature   |
| `perf`     | Performance      | Improves performance                 |
| `test`     | Testing          | Adding or updating tests             |
| `chore`    | Maintenance      | Build process, dependencies, etc.    |
| `ci`       | CI/CD            | Changes to CI configuration          |
| `revert`   | Revert           | Reverts a previous commit            |

---

### Scope Examples

**Backend:**

- `auth` - Authentication system
- `wallet` - Wallet operations
- `stellar` - Stellar blockchain integration
- `bitso` - Bitso API integration
- `payments` - Payment processing
- `api` - API endpoints
- `db` - Database changes

**Frontend Web:**

- `ui` - User interface components
- `auth` - Auth screens/logic
- `wallet` - Wallet screens
- `payments` - Payment screens
- `forms` - Form components

**Frontend Mobile:**

- `nfc` - NFC functionality
- `qr` - QR code features
- `nav` - Navigation
- `ui` - Mobile UI components

**General:**

- `deps` - Dependencies
- `config` - Configuration
- `ci` - CI/CD
- `docs` - Documentation

---

### Commit Message Examples

```bash
# Feature: New functionality
git commit -m "feat(auth): implement JWT refresh token rotation

- Add refresh token endpoint
- Store refresh tokens in Redis with 30-day TTL
- Implement automatic token refresh in API client
- Add unit tests for token refresh logic

Closes #45"

# Bug fix: Critical issue
git commit -m "fix(wallet): resolve decimal precision error in balance calculations

The balance comparison was using Python float instead of Decimal,
causing incorrect 'insufficient balance' errors for amounts with
more than 2 decimal places.

Changed all financial calculations to use Decimal with proper
quantization to 6 decimal places (USDC standard).

Fixes #67"

# Chore: Dependency update
git commit -m "chore(deps): update fastapi to 0.105.0 and pydantic to 2.6.0

- FastAPI: 0.104.1 -> 0.105.0
- Pydantic: 2.5.0 -> 2.6.0
- No breaking changes
- Updated type hints to match Pydantic v2.6"

# Docs: Documentation
git commit -m "docs(api): add OpenAPI examples for all wallet endpoints

Added request/response examples to improve auto-generated
API documentation in FastAPI /docs"

# Refactor: Code improvement
git commit -m "refactor(stellar): extract transaction signing to separate service

- Created StellarTransactionService class
- Moved all transaction logic from routes to service
- Added comprehensive error handling
- No functional changes, purely structural"

# Performance: Optimization
git commit -m "perf(db): add composite index on transactions table

Added index on (user_id, created_at) to optimize transaction
history queries. Reduces query time from 800ms to 45ms for
users with 10k+ transactions.

Related to #89"

# CI: Pipeline changes
git commit -m "ci: add Playwright E2E tests to GitHub Actions workflow

- Added Playwright installation step
- Run E2E tests on pull requests to main/develop
- Upload test artifacts on failure"

# Hotfix: Emergency production fix
git commit -m "fix(stellar)!: prevent transaction submission with expired sequence number

BREAKING CHANGE: Stellar client now throws SequenceExpiredError
instead of retrying indefinitely.

This was causing the hot wallet to lock up when sequence numbers
got out of sync. Emergency fix deployed directly to production.

Fixes PROD-001"
```

---

## ⚙️ GitHub Actions Workflows

### CI/CD Pipeline (.github/workflows/ci.yml)

```yaml
name: CI/CD Pipeline

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main, develop]

env:
  NODE_VERSION: "18"
  PYTHON_VERSION: "3.11"
  PNPM_VERSION: "8"

jobs:
  # ================================================
  # BACKEND TESTS
  # ================================================
  backend-test:
    name: Backend Tests
    runs-on: ubuntu-latest

    services:
      postgres:
        image: postgres:15
        env:
          POSTGRES_USER: test_user
          POSTGRES_PASSWORD: test_password
          POSTGRES_DB: test_db
        options: >-
          --health-cmd pg_isready
          --health-interval 10s
          --health-timeout 5s
          --health-retries 5
        ports:
          - 5432:5432

      redis:
        image: redis:7-alpine
        options: >-
          --health-cmd "redis-cli ping"
          --health-interval 10s
          --health-timeout 5s
          --health-retries 5
        ports:
          - 6379:6379

    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Setup Python
        uses: actions/setup-python@v5
        with:
          python-version: ${{ env.PYTHON_VERSION }}
          cache: "pip"

      - name: Install dependencies
        working-directory: ./backend
        run: |
          python -m pip install --upgrade pip
          pip install -r requirements.txt
          pip install pytest pytest-asyncio pytest-cov

      - name: Run linting
        working-directory: ./backend
        run: |
          pip install black isort flake8
          black --check app/
          isort --check-only app/
          flake8 app/ --max-line-length=100

      - name: Run type checking
        working-directory: ./backend
        run: |
          pip install mypy
          mypy app/

      - name: Run unit tests
        working-directory: ./backend
        env:
          DATABASE_URL: postgresql://test_user:test_password@localhost:5432/test_db
          REDIS_URL: redis://localhost:6379/0
          JWT_SECRET: test_secret_key_for_ci
          STELLAR_NETWORK: testnet
        run: |
          pytest tests/ \
            --cov=app \
            --cov-report=xml \
            --cov-report=html \
            --cov-report=term \
            -v

      - name: Upload coverage to Codecov
        uses: codecov/codecov-action@v3
        with:
          file: ./backend/coverage.xml
          flags: backend
          name: backend-coverage

      - name: Upload coverage artifacts
        if: always()
        uses: actions/upload-artifact@v3
        with:
          name: backend-coverage
          path: backend/htmlcov/

  # ================================================
  # FRONTEND WEB TESTS
  # ================================================
  frontend-web-test:
    name: Frontend Web Tests
    runs-on: ubuntu-latest

    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: ${{ env.NODE_VERSION }}

      - name: Setup pnpm
        uses: pnpm/action-setup@v2
        with:
          version: ${{ env.PNPM_VERSION }}
          run_install: false

      - name: Get pnpm store directory
        id: pnpm-cache
        shell: bash
        run: |
          echo "STORE_PATH=$(pnpm store path)" >> $GITHUB_OUTPUT

      - name: Setup pnpm cache
        uses: actions/cache@v3
        with:
          path: ${{ steps.pnpm-cache.outputs.STORE_PATH }}
          key: ${{ runner.os }}-pnpm-store-${{ hashFiles('**/pnpm-lock.yaml') }}
          restore-keys: |
            ${{ runner.os }}-pnpm-store-

      - name: Install dependencies
        working-directory: ./frontend-web
        run: pnpm install --frozen-lockfile

      - name: Run linting
        working-directory: ./frontend-web
        run: pnpm lint

      - name: Run type checking
        working-directory: ./frontend-web
        run: pnpm type-check

      - name: Run unit tests
        working-directory: ./frontend-web
        run: pnpm test -- --coverage --run

      - name: Build application
        working-directory: ./frontend-web
        env:
          VITE_API_URL: https://api-staging.example.com
        run: pnpm build

      - name: Upload build artifacts
        uses: actions/upload-artifact@v3
        with:
          name: frontend-web-build
          path: frontend-web/dist/

  # ================================================
  # FRONTEND MOBILE BUILD
  # ================================================
  frontend-mobile-check:
    name: Frontend Mobile Checks
    runs-on: ubuntu-latest

    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: ${{ env.NODE_VERSION }}

      - name: Setup Expo
        uses: expo/expo-github-action@v8
        with:
          expo-version: latest
          token: ${{ secrets.EXPO_TOKEN }}

      - name: Install dependencies
        working-directory: ./frontend-mobile
        run: npm install

      - name: Run linting
        working-directory: ./frontend-mobile
        run: npm run lint

      - name: Run type checking
        working-directory: ./frontend-mobile
        run: npm run type-check

      - name: Run tests
        working-directory: ./frontend-mobile
        run: npm test -- --coverage --watchAll=false

  # ================================================
  # E2E TESTS (Only on PR to main/develop)
  # ================================================
  e2e-tests:
    name: E2E Tests
    runs-on: ubuntu-latest
    if: github.event_name == 'pull_request'
    needs: [backend-test, frontend-web-test]

    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: ${{ env.NODE_VERSION }}

      - name: Setup pnpm
        uses: pnpm/action-setup@v2
        with:
          version: ${{ env.PNPM_VERSION }}

      - name: Install dependencies
        working-directory: ./frontend-web
        run: pnpm install --frozen-lockfile

      - name: Install Playwright browsers
        working-directory: ./frontend-web
        run: pnpm exec playwright install --with-deps chromium

      - name: Run E2E tests
        working-directory: ./frontend-web
        env:
          BASE_URL: http://localhost:5173
        run: pnpm test:e2e

      - name: Upload test results
        if: always()
        uses: actions/upload-artifact@v3
        with:
          name: playwright-report
          path: frontend-web/playwright-report/
          retention-days: 7

  # ================================================
  # DEPLOY TO STAGING (develop branch)
  # ================================================
  deploy-staging:
    name: Deploy to Staging
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/develop' && github.event_name == 'push'
    needs: [backend-test, frontend-web-test, frontend-mobile-check]
    environment:
      name: staging
      url: https://staging.example.com

    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      # Deploy Backend to Railway (Staging)
      - name: Deploy Backend (Railway)
        uses: railway/deploy@v1
        with:
          railway-token: ${{ secrets.RAILWAY_TOKEN }}
          service: backend
          environment: staging

      # Deploy Frontend to Vercel (Staging)
      - name: Deploy Frontend (Vercel)
        uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
          working-directory: ./frontend-web
          scope: ${{ secrets.VERCEL_ORG_ID }}

      # Build Mobile (Staging)
      - name: Build Mobile App (EAS)
        working-directory: ./frontend-mobile
        env:
          EXPO_TOKEN: ${{ secrets.EXPO_TOKEN }}
        run: |
          npm install -g eas-cli
          eas build --platform all --profile preview --non-interactive --no-wait

  # ================================================
  # DEPLOY TO PRODUCTION (main branch)
  # ================================================
  deploy-production:
    name: Deploy to Production
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main' && github.event_name == 'push'
    needs: [backend-test, frontend-web-test, frontend-mobile-check]
    environment:
      name: production
      url: https://app.example.com

    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      # Deploy Backend to Railway (Production)
      - name: Deploy Backend (Railway)
        uses: railway/deploy@v1
        with:
          railway-token: ${{ secrets.RAILWAY_TOKEN }}
          service: backend
          environment: production

      # Deploy Frontend to Vercel (Production)
      - name: Deploy Frontend (Vercel)
        uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
          vercel-args: "--prod"
          working-directory: ./frontend-web

      # Build and Submit Mobile to Stores
      - name: Build Mobile App (Production)
        working-directory: ./frontend-mobile
        env:
          EXPO_TOKEN: ${{ secrets.EXPO_TOKEN }}
        run: |
          npm install -g eas-cli
          eas build --platform all --profile production --non-interactive --no-wait

      # Create GitHub Release
      - name: Create Release
        uses: actions/create-release@v1
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
        with:
          tag_name: v${{ github.run_number }}
          release_name: Release v${{ github.run_number }}
          body: |
            Automated release from main branch

            **Changes in this release:**
            ${{ github.event.head_commit.message }}
          draft: false
          prerelease: false
```

---

### Dependabot Config (.github/dependabot.yml)

```yaml
version: 2
updates:
  # Backend (Python)
  - package-ecosystem: "pip"
    directory: "/backend"
    schedule:
      interval: "weekly"
      day: "monday"
      time: "09:00"
    open-pull-requests-limit: 5
    reviewers:
      - "YOUR_GITHUB_USERNAME"
    labels:
      - "dependencies"
      - "backend"
    commit-message:
      prefix: "chore(deps)"
      include: "scope"

  # Frontend Web (npm/pnpm)
  - package-ecosystem: "npm"
    directory: "/frontend-web"
    schedule:
      interval: "weekly"
      day: "monday"
      time: "09:00"
    open-pull-requests-limit: 5
    reviewers:
      - "YOUR_GITHUB_USERNAME"
    labels:
      - "dependencies"
      - "frontend-web"
    commit-message:
      prefix: "chore(deps)"
      include: "scope"
    ignore:
      # Ignore major version updates for now
      - dependency-name: "react"
        update-types: ["version-update:semver-major"]
      - dependency-name: "react-dom"
        update-types: ["version-update:semver-major"]

  # Frontend Mobile (npm)
  - package-ecosystem: "npm"
    directory: "/frontend-mobile"
    schedule:
      interval: "weekly"
      day: "monday"
      time: "09:00"
    open-pull-requests-limit: 5
    reviewers:
      - "YOUR_GITHUB_USERNAME"
    labels:
      - "dependencies"
      - "frontend-mobile"
    commit-message:
      prefix: "chore(deps)"
      include: "scope"
    ignore:
      # Expo SDK updates manually
      - dependency-name: "expo"
        update-types: ["version-update:semver-major"]

  # GitHub Actions
  - package-ecosystem: "github-actions"
    directory: "/"
    schedule:
      interval: "weekly"
      day: "monday"
      time: "09:00"
    open-pull-requests-limit: 3
    labels:
      - "dependencies"
      - "ci"
    commit-message:
      prefix: "ci"
      include: "scope"
```

---

## 🔐 Repository Secrets

### Required Secrets (Settings → Secrets and variables → Actions)

```yaml
# ============================================
# DEPLOYMENT TOKENS
# ============================================

# Vercel (Frontend Web)
VERCEL_TOKEN: vercel_xxxxxxxxxxxxxxxxxxxxx
VERCEL_ORG_ID: team_xxxxxxxxxxxxxxxxxxxxx
VERCEL_PROJECT_ID: prj_xxxxxxxxxxxxxxxxxxxxx

# Railway (Backend)
RAILWAY_TOKEN: railway_xxxxxxxxxxxxxxxxxxxxx

# Expo (Mobile)
EXPO_TOKEN: expo_xxxxxxxxxxxxxxxxxxxxx

# ============================================
# DATABASE & CACHE
# ============================================

# Supabase (used in tests)
SUPABASE_URL: https://xxxxxxxxxxxxx.supabase.co
SUPABASE_KEY: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# Redis (if needed for CI)
REDIS_URL: redis://default:xxxxx@redis-xxxx.upstash.io:6379

# ============================================
# EXTERNAL APIS (Production)
# ============================================

# Stellar
STELLAR_HOT_WALLET_SECRET: SXXXxxxxxxxxxxxxxxxxxxxxxxxxx
STELLAR_USDC_ISSUER: GBBDxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

# Circle
CIRCLE_API_KEY: circle_api_key_live_xxxxxxxxxxxxx
CIRCLE_ACCOUNT_ID: circle_account_xxxxxxxxxxxxx

# Bitso
BITSO_API_KEY: bitso_api_key_xxxxxxxxxxxxx
BITSO_API_SECRET: bitso_api_secret_xxxxxxxxxxxxx

# Twilio (SMS)
TWILIO_ACCOUNT_SID: ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
TWILIO_AUTH_TOKEN: twilio_token_xxxxxxxxxxxxx

# SendGrid (Email)
SENDGRID_API_KEY: SG.xxxxxxxxxxxxxxxxxxxxx

# ============================================
# MONITORING & ALERTS
# ============================================

# Sentry
SENTRY_DSN: https://xxxxx@sentry.io/xxxxx
SENTRY_AUTH_TOKEN: sentry_auth_token_xxxxx

# Telegram (Alerts)
TELEGRAM_BOT_TOKEN: bot_token_xxxxxxxxxxxxx
TELEGRAM_CHAT_ID: -xxxxxxxxxxxxx

# ============================================
# CODE QUALITY
# ============================================

# Codecov
CODECOV_TOKEN: codecov_token_xxxxxxxxxxxxx
```

### How to Add Secrets

```bash
# Using GitHub CLI
gh secret set VERCEL_TOKEN -b "your_token_here"
gh secret set RAILWAY_TOKEN -b "your_token_here"

# Or via GitHub Web UI:
# Repository → Settings → Secrets and variables → Actions → New repository secret
```

---

## 👨‍💻 Development Workflow

### Daily Workflow

```bash
# ============================================
# STARTING WORK
# ============================================

# 1. Pull latest changes from develop
git checkout develop
git pull origin develop

# 2. Create feature branch
git checkout -b feature/your-feature-name

# Example: Working on NFC payments
git checkout -b feature/nfc-payment-flow

# ============================================
# DURING DEVELOPMENT
# ============================================

# 3. Make changes to your code
# ... code, code, code ...

# 4. Check what changed
git status
git diff

# 5. Stage specific files
git add backend/app/api/routes/payments.py
git add backend/app/services/payment_service.py

# Or stage all changes
git add .

# 6. Commit with conventional message
git commit -m "feat(payments): implement NFC payment confirmation endpoint

- Add POST /api/v1/payments/nfc/confirm endpoint
- Validate NFC session before processing
- Update wallet balances atomically
- Return transaction receipt

Closes #42"

# 7. Continue working, making multiple commits
# (Commit frequently, push at end of day or when complete)

# ============================================
# BEFORE PUSHING
# ============================================

# 8. Pull latest develop (in case team made changes)
git checkout develop
git pull origin develop
git checkout feature/your-feature-name

# 9. Rebase your branch on latest develop (optional but clean)
git rebase develop

# If conflicts occur:
# - Resolve conflicts in your editor
# - git add <resolved-files>
# - git rebase --continue

# ============================================
# PUSHING CHANGES
# ============================================

# 10. Push your feature branch
git push origin feature/your-feature-name

# If you rebased and need to force push:
git push --force-with-lease origin feature/your-feature-name

# ============================================
# CREATING PULL REQUEST
# ============================================

# 11. Create PR via GitHub CLI
gh pr create --base develop --head feature/your-feature-name \
  --title "feat(payments): implement NFC payment flow" \
  --body "Implements NFC payment confirmation endpoint and related services"

# Or create via GitHub Web UI:
# Go to repository → Pull requests → New pull request

# ============================================
# AFTER PR IS MERGED
# ============================================

# 12. Delete local feature branch
git checkout develop
git pull origin develop
git branch -d feature/your-feature-name

# 13. Delete remote feature branch (if not auto-deleted)
git push origin --delete feature/your-feature-name
```

---

### Pull Request Template (.github/pull_request_template.md)

```markdown
## 📝 Description

<!-- Provide a brief description of what this PR does -->

Closes #(issue_number)

## 🔄 Type of Change

<!-- Mark with an 'x' all that apply -->

- [ ] 🐛 Bug fix (non-breaking change which fixes an issue)
- [ ] ✨ New feature (non-breaking change which adds functionality)
- [ ] 💥 Breaking change (fix or feature that would cause existing functionality to not work as expected)
- [ ] 📝 Documentation update
- [ ] 🎨 Style update (formatting, renaming)
- [ ] ♻️ Code refactoring (no functional changes)
- [ ] ⚡ Performance improvement
- [ ] ✅ Test update
- [ ] 🔧 Build configuration change
- [ ] 🔒 Security fix

## 🧪 Testing

<!-- Describe the tests you ran and how to reproduce -->

### Tests Added/Updated

- [ ] Unit tests added/updated
- [ ] Integration tests added/updated
- [ ] E2E tests added/updated
- [ ] Manual testing completed

### How to Test

1. Step 1
2. Step 2
3. Step 3

### Test Coverage

- Coverage before: X%
- Coverage after: Y%

## 📸 Screenshots (if applicable)

<!-- Add screenshots to help explain your changes -->

## ✅ Checklist

<!-- Mark with an 'x' all that you have completed -->

### Code Quality

- [ ] My code follows the project's style guidelines
- [ ] I have performed a self-review of my own code
- [ ] I have commented my code, particularly in hard-to-understand areas
- [ ] I have made corresponding changes to the documentation
- [ ] My changes generate no new warnings
- [ ] I have removed any console.log or print statements

### Testing

- [ ] I have added tests that prove my fix is effective or that my feature works
- [ ] New and existing unit tests pass locally with my changes
- [ ] Any dependent changes have been merged and published

### Security

- [ ] No sensitive data (API keys, passwords) is exposed in the code
- [ ] Environment variables are used for configuration
- [ ] Input validation is implemented where necessary
- [ ] Authentication/authorization is properly handled

### Performance

- [ ] Database queries are optimized (no N+1 queries)
- [ ] API response times are within acceptable limits (<200ms p95)
- [ ] No unnecessary re-renders (React) or redundant operations

### Documentation

- [ ] README updated (if necessary)
- [ ] API documentation updated (if endpoints changed)
- [ ] TASKS.md updated (task marked as complete)
- [ ] PROGRESS.md updated with session summary

## 🔗 Related Issues/PRs

<!-- Link to related issues or PRs -->

- Related to #(issue_number)
- Depends on #(pr_number)
- Blocks #(issue_number)

## 📋 Deployment Notes

<!-- Any special deployment considerations -->

- [ ] Database migration required
- [ ] Environment variables added/changed
- [ ] External service configuration needed
- [ ] Cache needs to be cleared

## 👀 Reviewers

<!-- Tag specific reviewers if needed -->

@YOUR_GITHUB_USERNAME

## 📌 Additional Context

<!-- Add any other context about the PR here -->
```

---

### Issue Templates

#### Bug Report (.github/ISSUE_TEMPLATE/bug_report.yml)

```yaml
name: 🐛 Bug Report
description: Report a bug or unexpected behavior
title: "[BUG]: "
labels: ["bug", "triage"]
body:
  - type: markdown
    attributes:
      value: |
        Thanks for taking the time to fill out this bug report!

  - type: textarea
    id: description
    attributes:
      label: Bug Description
      description: A clear and concise description of what the bug is
      placeholder: Tell us what you see!
    validations:
      required: true

  - type: textarea
    id: steps
    attributes:
      label: Steps to Reproduce
      description: Steps to reproduce the behavior
      placeholder: |
        1. Go to '...'
        2. Click on '....'
        3. Scroll down to '....'
        4. See error
    validations:
      required: true

  - type: textarea
    id: expected
    attributes:
      label: Expected Behavior
      description: What you expected to happen
      placeholder: Describe what should happen
    validations:
      required: true

  - type: textarea
    id: actual
    attributes:
      label: Actual Behavior
      description: What actually happened
      placeholder: Describe what actually happens
    validations:
      required: true

  - type: dropdown
    id: environment
    attributes:
      label: Environment
      description: Where did this occur?
      options:
        - Development (Local)
        - Staging
        - Production
        - Mobile (iOS)
        - Mobile (Android)
        - Web (Chrome)
        - Web (Firefox)
        - Web (Safari)
    validations:
      required: true

  - type: dropdown
    id: severity
    attributes:
      label: Severity
      description: How severe is this bug?
      options:
        - Critical (System down, data loss)
        - High (Major functionality broken)
        - Medium (Minor functionality affected)
        - Low (Cosmetic issue)
    validations:
      required: true

  - type: textarea
    id: logs
    attributes:
      label: Error Logs
      description: Any relevant error messages or logs
      render: shell

  - type: textarea
    id: screenshots
    attributes:
      label: Screenshots
      description: If applicable, add screenshots to help explain the problem

  - type: textarea
    id: context
    attributes:
      label: Additional Context
      description: Add any other context about the problem here
```

#### Feature Request (.github/ISSUE_TEMPLATE/feature_request.yml)

```yaml
name: ✨ Feature Request
description: Suggest a new feature or enhancement
title: "[FEATURE]: "
labels: ["enhancement", "triage"]
body:
  - type: markdown
    attributes:
      value: |
        Thanks for suggesting a new feature!

  - type: textarea
    id: problem
    attributes:
      label: Problem Statement
      description: Is your feature request related to a problem? Please describe.
      placeholder: I'm always frustrated when...
    validations:
      required: true

  - type: textarea
    id: solution
    attributes:
      label: Proposed Solution
      description: Describe the solution you'd like
      placeholder: A clear and concise description of what you want to happen
    validations:
      required: true

  - type: textarea
    id: alternatives
    attributes:
      label: Alternatives Considered
      description: Describe alternatives you've considered
      placeholder: A clear and concise description of alternative solutions

  - type: dropdown
    id: priority
    attributes:
      label: Priority
      description: How important is this feature?
      options:
        - Critical (MVP blocker)
        - High (Important for launch)
        - Medium (Nice to have for v1)
        - Low (Future enhancement)
    validations:
      required: true

  - type: dropdown
    id: area
    attributes:
      label: Feature Area
      description: Which part of the application?
      multiple: true
      options:
        - Backend API
        - Frontend Web
        - Frontend Mobile
        - Authentication
        - Wallet
        - Payments
        - Cash-out
        - Merchant Dashboard
        - Database
        - DevOps/CI

  - type: textarea
    id: acceptance
    attributes:
      label: Acceptance Criteria
      description: What does "done" look like for this feature?
      placeholder: |
        - [ ] Criterion 1
        - [ ] Criterion 2
        - [ ] Criterion 3

  - type: textarea
    id: context
    attributes:
      label: Additional Context
      description: Add any other context or screenshots about the feature request
```

---

## 🛡️ Branch Protection Rules

### Settings → Branches → Branch protection rules

#### Main Branch (Production)

```yaml
Branch name pattern: main

Protect matching branches:
  ☑ Require a pull request before merging
    ☑ Require approvals: 1
    ☑ Dismiss stale pull request approvals when new commits are pushed
    ☑ Require review from Code Owners

  ☑ Require status checks to pass before merging
    ☑ Require branches to be up to date before merging
    Required status checks:
      - backend-test
      - frontend-web-test
      - frontend-mobile-check
      - e2e-tests

  ☑ Require conversation resolution before merging

  ☑ Require signed commits

  ☑ Require linear history

  ☑ Require deployments to succeed before merging
    Required deployment environment: staging

  ☐ Lock branch (not recommended for active development)

  ☐ Do not allow bypassing the above settings
      (enable in production with large team)

  Rules applied to administrators:
    ☑ Include administrators
```

#### Develop Branch (Staging)

```yaml
Branch name pattern: develop

Protect matching branches:
  ☑ Require a pull request before merging
    ☑ Require approvals: 1 (can be 0 for solo developer)
    ☐ Dismiss stale pull request approvals

  ☑ Require status checks to pass before merging
    ☑ Require branches to be up to date before merging
    Required status checks:
      - backend-test
      - frontend-web-test
      - frontend-mobile-check

  ☑ Require conversation resolution before merging

  ☐ Require signed commits (optional)

  ☐ Require linear history (optional for develop)

  ☐ Lock branch

  Rules applied to administrators:
    ☐ Include administrators (allow admins to push directly for hotfixes)
```

---

## 🚀 Release Strategy

### Versioning (Semantic Versioning)

**Format:** `MAJOR.MINOR.PATCH` (e.g., `1.4.2`)

- **MAJOR** (1.x.x): Breaking changes, incompatible API changes
- **MINOR** (x.4.x): New features, backwards-compatible
- **PATCH** (x.x.2): Bug fixes, backwards-compatible

**Examples:**

- `0.1.0` → MVP initial release
- `0.2.0` → Add NFC payments (new feature)
- `0.2.1` → Fix balance calculation bug
- `0.3.0` → Add merchant dashboard (new feature)
- `1.0.0` → Official production launch (breaking: API v1)
- `1.1.0` → Add scheduled transfers (new feature)
- `1.1.1` → Fix notification bug
- `2.0.0` → New authentication system (breaking change)

---

### Release Process

**1. Feature Development (develop branch)**

```bash
# All features merge to develop
git checkout develop
git merge feature/your-feature
```

**2. Create Release Branch**

```bash
# When ready for release, create release branch
git checkout develop
git checkout -b release/1.2.0

# Update version numbers
# - backend/pyproject.toml or setup.py
# - frontend-web/package.json
# - frontend-mobile/app.json (version and buildNumber)

git add .
git commit -m "chore(release): bump version to 1.2.0"
```

**3. Testing on Release Branch**

```bash
# Run final tests on release branch
# Fix any last-minute bugs
git commit -m "fix(release): fix last minute bug"
```

**4. Merge to Main (Production)**

```bash
# Merge release to main
git checkout main
git merge release/1.2.0
git tag -a v1.2.0 -m "Release version 1.2.0"
git push origin main --tags

# GitHub Actions will auto-deploy to production
```

**5. Merge Back to Develop**

```bash
# Merge release back to develop
git checkout develop
git merge release/1.2.0
git push origin develop

# Delete release branch
git branch -d release/1.2.0
git push origin --delete release/1.2.0
```

**6. Create GitHub Release**

```bash
# Via GitHub CLI
gh release create v1.2.0 \
  --title "Version 1.2.0" \
  --notes "See CHANGELOG.md for details"

# Or via GitHub Web UI:
# Repository → Releases → Draft a new release
```

**7. Monitor Deployment**

```bash
# Check deployment status
# - Vercel dashboard
# - Railway dashboard
# - Sentry for errors
# - User feedback
```

**8. Hotfix Process (if critical bug in production)**

```bash
# Create hotfix from main
git checkout main
git checkout -b hotfix/critical-bug-fix

# Fix the bug
git commit -m "fix(payments)!: resolve critical payment processing bug"

# Merge directly to main
git checkout main
git merge hotfix/critical-bug-fix
git tag -a v1.2.1 -m "Hotfix 1.2.1"
git push origin main --tags

# Merge back to develop
git checkout develop
git merge hotfix/critical-bug-fix
git push origin develop

# Delete hotfix branch
git branch -d hotfix/critical-bug-fix
```

---

## 📊 Monitoring & Alerts

### Integrations

#### Sentry (Error Tracking)

```bash
# Install Sentry
# Backend
pip install sentry-sdk[fastapi]

# Frontend Web
pnpm add @sentry/react @sentry/vite-plugin

# Frontend Mobile
npx expo install sentry-expo

# Configure in GitHub repository
# Settings → Integrations → Sentry
```

#### Slack/Discord (Notifications)

```yaml
# Add to .github/workflows/ci.yml

- name: Notify deployment
  if: success()
  uses: slackapi/slack-github-action@v1
  with:
    payload: |
      {
        "text": "✅ Deployment to ${{ github.ref }} successful!",
        "blocks": [
          {
            "type": "section",
            "text": {
              "type": "mrkdwn",
              "text": "*Deployment Status:* ✅ Success\n*Branch:* ${{ github.ref }}\n*Commit:* ${{ github.sha }}"
            }
          }
        ]
      }
  env:
    SLACK_WEBHOOK_URL: ${{ secrets.SLACK_WEBHOOK_URL }}
```

#### Dependabot Alerts

```bash
# Enable in GitHub repository
# Settings → Security → Dependabot alerts → Enable

# Configure notifications
# Settings → Notifications → Dependabot alerts
```

---

## 📖 README.md Template

````markdown
# 💰 Wani - Peace of Mind Remittance Platform

> Next-generation remittance platform enabling instant, low-cost money transfers from USA to Mexico with integrated digital wallet and NFC payment capabilities.

**Wani (和)** - Japanese for "peace, harmony" - bringing peace of mind to every cross-border transaction.

[![CI/CD](https://github.com/YOUR_USERNAME/wani-platform/actions/workflows/ci.yml/badge.svg)](https://github.com/YOUR_USERNAME/wani-platform/actions/workflows/ci.yml)
[![Coverage](https://codecov.io/gh/YOUR_USERNAME/wani-platform/branch/main/graph/badge.svg)](https://codecov.io/gh/YOUR_USERNAME/wani-platform)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

---

## ✨ Features

- 💸 **Low-Cost Remittances** - 2% fee vs 6-8% traditional services
- ⚡ **Instant Wallet Credit** - Recipients get money immediately
- 📱 **NFC Payments** - Pay merchants with a tap (0% fee)
- 🏦 **Fast Cash-Out** - Withdraw to Mexican bank in 7-10 minutes
- 🔒 **Secure** - Bank-level security with blockchain transparency
- 📊 **Merchant Dashboard** - Track sales and manage business

---

## 🚀 Quick Start

### Prerequisites

- **Backend:** Python 3.11+, PostgreSQL 15+, Redis 7+
- **Frontend Web:** Node.js 18+, pnpm 8+
- **Frontend Mobile:** Node.js 18+, Expo CLI
- **Accounts:** Supabase, Railway, Vercel, Circle, Bitso (sandbox)

### Installation

#### 1. Clone Repository

\`\`\`bash
git clone https://github.com/YOUR_USERNAME/wani-platform.git
cd wani-platform
\`\`\`

#### 2. Backend Setup

\`\`\`bash
cd backend

# Create virtual environment

python -m venv venv
source venv/bin/activate # Windows: venv\\Scripts\\activate

# Install dependencies

pip install -r requirements.txt

# Setup environment variables

cp .env.example .env

# Edit .env with your credentials

# Run migrations

alembic upgrade head

# Start server

uvicorn app.main:app --reload

# API available at http://localhost:8000

\`\`\`

#### 3. Frontend Web Setup

\`\`\`bash
cd frontend-web

# Install dependencies

pnpm install

# Setup environment variables

cp .env.example .env.local

# Edit .env.local with your API URL

# Start dev server

pnpm dev

# App available at http://localhost:5173

\`\`\`

#### 4. Frontend Mobile Setup

\`\`\`bash
cd frontend-mobile

# Install dependencies

npm install

# Start Expo

npx expo start

# Scan QR code with Expo Go app

\`\`\`

---

## 📚 Documentation

- [Product Requirements](docs/PRD.md)
- [Technical Architecture](docs/PLANNING.md)
- [Development Guide](docs/CLAUDE.md)
- [Task Roadmap](docs/TASKS.md)
- [API Documentation](http://localhost:8000/docs) (when backend running)
- [Git Workflow](docs/GITHUB.md)

---

## 🛠️ Tech Stack

### Backend

- **Framework:** FastAPI (Python 3.11+)
- **Database:** PostgreSQL 15 (Supabase)
- **Cache:** Redis 7
- **Queue:** Celery
- **Blockchain:** Stellar SDK
- **Testing:** Pytest

### Frontend Web

- **Framework:** React 18 + TypeScript
- **Build:** Vite
- **Styling:** Tailwind CSS + shadcn/ui
- **State:** TanStack Query + Zustand
- **Testing:** Vitest + Playwright

### Frontend Mobile

- **Framework:** React Native + Expo SDK 50
- **Styling:** NativeWind
- **Navigation:** Expo Router
- **Testing:** Jest

### Infrastructure

- **Hosting:** Vercel (web), Railway (backend), EAS (mobile)
- **Database:** Supabase
- **Monitoring:** Sentry
- **CI/CD:** GitHub Actions

---

## 🗺️ Roadmap

### MVP (8 Weeks) - In Progress

- [x] Week 1: Foundation & Authentication
- [x] Week 2: Wallet Core Features
- [ ] Week 3: Remittance Flow
- [ ] Week 4: NFC Payments
- [ ] Week 5: Cash-Out Integration
- [ ] Week 6: Merchant Dashboard
- [ ] Week 7: Security & Testing
- [ ] Week 8: Beta Launch

### v2.0 (Post-MVP)

- [ ] Instant remittance with debit card
- [ ] Biometric authentication
- [ ] Scheduled/recurring transfers
- [ ] Physical/virtual debit card
- [ ] Additional corridors (other LatAm countries)

---

## 🤝 Contributing

We welcome contributions to Wani! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for details.

### Development Workflow

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'feat(scope): add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👥 Team

- **Lead Developer:** [@YOUR_GITHUB_USERNAME](https://github.com/YOUR_GITHUB_USERNAME)

---

## 🙏 Acknowledgments

- [Stellar Development Foundation](https://stellar.org)
- [Circle](https://circle.com)
- [Bitso](https://bitso.com)
- [Supabase](https://supabase.com)

---

**Built with ❤️ for the global community**
\`\`\`

---

## 📝 Additional Files

### CONTRIBUTING.md (Outline)

```markdown
# Contributing to Wani Platform

## Code of Conduct

- Be respectful
- Be professional
- Focus on constructive feedback

## How to Contribute

### Reporting Bugs

1. Check if bug already reported
2. Use bug report template
3. Provide detailed reproduction steps

### Suggesting Features

1. Check if feature already requested
2. Use feature request template
3. Explain use case and benefits

### Pull Request Process

1. Fork repository
2. Create feature branch from `develop`
3. Follow commit conventions
4. Write/update tests
5. Update documentation
6. Submit PR with template

## Code Standards

### Backend (Python)

- Follow PEP 8
- Use type hints
- Write docstrings
- Test coverage >80%

### Frontend (TypeScript)

- Follow ESLint rules
- Use TypeScript strict mode
- Write prop types
- Test coverage >70%

### Commits

- Use conventional commits
- Reference issues
- Write descriptive messages

## Testing Requirements

- All new features must have tests
- All bug fixes must have regression tests
- Run full test suite before PR

## Documentation

- Update README for user-facing changes
- Update API docs for endpoint changes
- Add inline comments for complex logic
```
````

---

### LICENSE Options

**MIT License (Recommended for open source):**

```
MIT License

Copyright (c) 2025 [Your Name]

Permission is hereby granted, free of charge, to any person obtaining a copy...
```

**Proprietary (For closed source):**

```
Proprietary License

Copyright (c) 2025 [Your Company]. All rights reserved.

This software is proprietary and confidential...
```

---

**Last Updated:** 2025-10-15  
**Version:** 1.0.0  
**Maintained by:** Development Team  
**Questions?** Open an issue or contact [@YOUR_GITHUB_USERNAME](https://github.com/YOUR_GITHUB_USERNAME)
