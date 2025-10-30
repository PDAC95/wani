# Wani

**Cross-border payment fintech platform powered by Stellar blockchain**

Send money from USA to Mexico instantly with USDC on Stellar, converting to MXN for cash-out.

---

## Overview

Wani is a fintech application that enables cross-border payments between the United States and Mexico using the Stellar blockchain network. Users can send USD from the US, which is converted to USDC on Stellar, and recipients can cash out in MXN in Mexico.

### Key Features

- 🚀 **Instant transfers** using Stellar blockchain
- 💰 **Low fees** compared to traditional remittance services
- 🔒 **Secure** with KYC verification and blockchain transparency
- 📱 **Mobile-first** with web support
- 💵 **USD → USDC → MXN** conversion flow
- 🌐 **Multi-platform**: Web app, iOS, and Android

---

## Tech Stack

### Backend
- **Framework:** FastAPI (Python 3.13)
- **Database:** PostgreSQL (Supabase)
- **Cache:** Redis (Upstash)
- **Blockchain:** Stellar SDK
- **Migrations:** Alembic
- **Background Jobs:** Celery
- **Deployment:** Railway

### Frontend Web
- **Framework:** React 18 + Vite
- **Language:** TypeScript
- **Routing:** React Router v7
- **State:** Zustand + TanStack Query
- **Styling:** Tailwind CSS
- **HTTP Client:** Axios
- **Deployment:** Vercel

### Mobile
- **Framework:** Expo + React Native
- **Language:** TypeScript
- **Navigation:** React Navigation + Expo Router
- **Styling:** NativeWind (Tailwind for RN)
- **State:** Zustand + TanStack Query
- **Deployment:** EAS (Expo Application Services)

### External Integrations
- **Circle API:** USD → USDC conversion
- **Bitso API:** USDC → MXN conversion and cash-out
- **Stellar Network:** USDC transfers on blockchain
- **Twilio:** SMS OTP authentication
- **SendGrid:** Email notifications
- **Sentry:** Error tracking

---

## Project Structure

```
wani/
├── backend/                 # FastAPI backend
│   ├── app/
│   │   ├── core/           # Config, database, cache
│   │   ├── models/         # SQLAlchemy models
│   │   ├── services/       # Business logic (Stellar, payments)
│   │   ├── api/            # API routes
│   │   └── middleware/     # Error handling, CORS
│   ├── alembic/            # Database migrations
│   ├── scripts/            # Utility scripts
│   ├── requirements.txt    # Python dependencies
│   └── Dockerfile          # Docker configuration
│
├── apps/
│   ├── web/                # React web app
│   │   ├── src/
│   │   │   ├── app/        # Application code
│   │   │   │   ├── core/   # Providers, API client, stores
│   │   │   │   ├── routes/ # React Router configuration
│   │   │   │   ├── pages/  # Page components
│   │   │   │   └── components/ # Reusable components
│   │   │   └── styles/     # Global styles
│   │   ├── package.json
│   │   └── vite.config.ts
│   │
│   └── mobile/             # React Native mobile app
│       ├── src/
│       │   └── app/
│       │       ├── navigation/  # Navigation setup
│       │       ├── screens/     # Screen components
│       │       ├── components/  # Reusable components
│       │       └── core/        # API, stores
│       ├── app.json        # Expo configuration
│       ├── eas.json        # EAS build profiles
│       └── package.json
│
├── docs/                   # Project documentation
│   ├── 1. PRD.md
│   ├── 2. Architecture.md
│   ├── 3. Product Backlog.md
│   ├── 4. Sprint Plan s.1.md
│   └── 5. Tasks s.1.md
│
├── .github/
│   ├── workflows/          # GitHub Actions CI/CD
│   └── SECRETS_SETUP.md    # Secrets configuration guide
│
└── README.md               # This file
```

---

## Prerequisites

### Required

- **Node.js:** v20 or higher
- **Python:** 3.13 or higher
- **Git:** Latest version
- **PostgreSQL:** 14+ (or Supabase account)
- **Redis:** 6+ (or Upstash account)

### Optional (for mobile development)

- **Expo CLI:** `npm install -g expo-cli`
- **EAS CLI:** `npm install -g eas-cli`
- **iOS Simulator** (macOS only)
- **Android Studio** (for Android emulator)

---

## Getting Started

### 1. Clone Repository

```bash
git clone https://github.com/PDAC95/wani.git
cd wani
```

### 2. Backend Setup

#### Install Dependencies

```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
```

#### Configure Environment

```bash
cp .env.example .env
```

Edit `.env` and fill in your credentials:

```env
# Database (Supabase)
DATABASE_URL=postgresql://postgres:password@db.xxx.supabase.co:5432/postgres
SUPABASE_URL=https://xxx.supabase.co
SUPABASE_KEY=your-supabase-anon-key
SUPABASE_JWT_SECRET=your-jwt-secret

# Redis (Upstash)
REDIS_URL=redis://:password@xxx.upstash.io:6379

# JWT
JWT_SECRET=your-super-secret-jwt-key-min-32-chars

# Stellar (Testnet for development)
STELLAR_NETWORK=testnet
STELLAR_HORIZON_URL=https://horizon-testnet.stellar.org
STELLAR_HOT_WALLET_SECRET=SXXXXX...
STELLAR_COLD_WALLET_PUBLIC=GXXXXX...
```

**Generate JWT Secret:**
```bash
openssl rand -base64 32
```

**Generate Stellar Wallet:**
```bash
python scripts/test_stellar.py
```

#### Run Migrations

```bash
alembic upgrade head
```

#### Start Backend

⚠️ **IMPORTANT (Windows users):** Always use `run_server.py` to start the backend:

```bash
python run_server.py
```

**DO NOT** use `uvicorn app.main:app` directly on Windows - it bypasses the event loop configuration required for psycopg3.

Backend running at: **http://localhost:9000**

API docs: **http://localhost:9000/api/docs**

### 3. Web Frontend Setup

```bash
cd apps/web
npm install
```

#### Configure Environment

```bash
cp .env.example .env
```

Edit `.env`:

```env
VITE_API_URL=http://localhost:9000
```

#### Start Web App

```bash
npm run dev
```

Web app running at: **http://localhost:5173**

### 4. Mobile App Setup

```bash
cd apps/mobile
npm install
```

#### Login to Expo

```bash
npx expo login
```

Credentials:
- Email: `dev@jappi.ca`
- Password: `Password123`

#### Start Mobile App

**Same Network (recommended):**
```bash
npx expo start
```

**Different Networks (using tunnel):**
```bash
npx expo start --tunnel
```

Scan QR code with:
- **iOS:** Camera app
- **Android:** Expo Go app

---

## Development Workflow

### Backend Development

1. **Create migration:**
   ```bash
   cd backend
   alembic revision --autogenerate -m "description"
   ```

2. **Apply migration:**
   ```bash
   alembic upgrade head
   ```

3. **Run tests:**
   ```bash
   pytest
   ```

4. **Code formatting:**
   ```bash
   black .
   isort .
   ```

5. **Linting:**
   ```bash
   flake8 app/
   mypy app/
   ```

### Frontend Development

1. **Run linting:**
   ```bash
   npm run lint
   ```

2. **Format code:**
   ```bash
   npx prettier --write "src/**/*.{ts,tsx}"
   ```

3. **Type check:**
   ```bash
   npx tsc --noEmit
   ```

4. **Build:**
   ```bash
   npm run build
   ```

### Mobile Development

1. **Run on iOS simulator:**
   ```bash
   npx expo start --ios
   ```

2. **Run on Android emulator:**
   ```bash
   npx expo start --android
   ```

3. **Clear cache:**
   ```bash
   npx expo start --clear
   ```

4. **Build APK (development):**
   ```bash
   eas build --profile development --platform android
   ```

---

## Testing

### Backend Tests

```bash
cd backend
pytest
pytest --cov=app tests/  # With coverage
```

### Stellar Service Test

```bash
cd backend
python scripts/test_stellar.py
```

This will:
- Create a test wallet
- Fund it on testnet
- Verify Stellar connection
- Test all service methods

---

## Deployment

### Backend (Railway)

1. **Install Railway CLI:**
   ```bash
   npm install -g @railway/cli
   ```

2. **Login:**
   ```bash
   railway login
   ```

3. **Deploy:**
   ```bash
   cd backend
   railway up
   ```

See: [backend/RAILWAY_DEPLOYMENT.md](backend/RAILWAY_DEPLOYMENT.md)

### Frontend Web (Vercel)

1. **Install Vercel CLI:**
   ```bash
   npm install -g vercel
   ```

2. **Deploy:**
   ```bash
   cd apps/web
   vercel
   ```

See: [apps/web/VERCEL_DEPLOYMENT.md](apps/web/VERCEL_DEPLOYMENT.md)

### Mobile (EAS)

1. **Configure EAS:**
   ```bash
   cd apps/mobile
   eas build:configure
   ```

2. **Build APK:**
   ```bash
   eas build --profile production --platform android
   ```

3. **Build IPA:**
   ```bash
   eas build --profile production --platform ios
   ```

4. **Submit to stores:**
   ```bash
   eas submit --platform android
   eas submit --platform ios
   ```

See: [apps/mobile/EAS_SETUP.md](apps/mobile/EAS_SETUP.md)

---

## Environment Variables

### Backend (.env)

| Variable | Required | Description |
|----------|----------|-------------|
| `DATABASE_URL` | Yes | PostgreSQL connection string |
| `REDIS_URL` | Yes | Redis connection string |
| `JWT_SECRET` | Yes | JWT signing secret (min 32 chars) |
| `STELLAR_NETWORK` | Yes | `testnet` or `public` |
| `STELLAR_HORIZON_URL` | Yes | Stellar Horizon API URL |
| `STELLAR_HOT_WALLET_SECRET` | Yes | Hot wallet secret key |
| `CIRCLE_API_KEY` | No | Circle API key (USD → USDC) |
| `BITSO_API_KEY` | No | Bitso API key (USDC → MXN) |
| `TWILIO_ACCOUNT_SID` | No | Twilio SMS SID |
| `SENDGRID_API_KEY` | No | SendGrid email API key |
| `SENTRY_DSN` | No | Sentry error tracking DSN |

### Frontend Web (.env)

| Variable | Required | Description |
|----------|----------|-------------|
| `VITE_API_URL` | Yes | Backend API URL |

### Mobile (eas.json)

Environment variables configured per build profile in `eas.json`:

- **development:** `http://localhost:9000`
- **preview:** `https://wani-api-preview.railway.app`
- **production:** `https://wani-api.railway.app`

---

## CI/CD

### GitHub Actions Workflows

1. **Backend CI** (`.github/workflows/ci-backend.yml`)
   - Runs on push to `main`/`develop`
   - Black, Flake8, isort, mypy
   - Bandit security scan

2. **Frontend CI** (`.github/workflows/ci-web.yml`)
   - Runs on push to `main`/`develop`
   - ESLint, Prettier, TypeScript check
   - Build verification

### GitHub Secrets Required

See: [.github/SECRETS_SETUP.md](.github/SECRETS_SETUP.md)

Required secrets:
- `DATABASE_URL`
- `REDIS_URL`
- `JWT_SECRET`
- `RAILWAY_TOKEN`
- `VERCEL_TOKEN`
- `STELLAR_HOT_WALLET_SECRET`

---

## Troubleshooting

### Backend won't start

**Problem:** `ModuleNotFoundError` or import errors

**Solution:**
```bash
cd backend
pip install -r requirements.txt
```

### Database connection fails

**Problem:** `sqlalchemy.exc.OperationalError`

**Solution:**
- Verify `DATABASE_URL` in `.env`
- Check Supabase project is not paused
- Verify network connectivity

### psycopg3 ProactorEventLoop error (Windows only)

**Problem:** `psycopg.InterfaceError: Psycopg cannot use the 'ProactorEventLoop' to run in async mode`

**Solution:**
This happens when starting the backend with `uvicorn app.main:app` directly instead of using `run_server.py`.

**ALWAYS start the backend with:**
```bash
cd backend
python run_server.py
```

**Why:** The psycopg3 async driver requires SelectorEventLoop on Windows. The `run_server.py` script sets up the correct event loop policy BEFORE uvicorn starts, which is essential for database connectivity on Windows.

### Mobile app shows no styles

**Problem:** NativeWind styles not applying

**Solution:**
```bash
cd apps/mobile
rm -rf node_modules/.cache
rm -rf .expo
npx expo start --clear
```

### Stellar service fails

**Problem:** Account not found or funding fails

**Solution:**
- Verify `STELLAR_NETWORK=testnet` in `.env`
- Check `STELLAR_HORIZON_URL=https://horizon-testnet.stellar.org`
- Run test script: `python scripts/test_stellar.py`

---

## Documentation

- **PRD:** [docs/1. PRD.md](docs/1.%20PRD.md)
- **Architecture:** [docs/2. Architecture.md](docs/2.%20Architecture.md)
- **Product Backlog:** [docs/3. Product Backlog.md](docs/3.%20Product%20Backlog.md)
- **Sprint Plan:** [docs/4. Sprint Plan s.1.md](docs/4.%20Sprint%20Plan%20s.1.md)
- **Tasks:** [docs/5. Tasks s.1.md](docs/5.%20Tasks%20s.1.md)

---

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Code Style

- **Python:** Black, Flake8, isort
- **TypeScript:** ESLint, Prettier
- **Commits:** Conventional Commits format

---

## License

This project is proprietary and confidential.

---

## Contact

**Email:** dev@jappi.ca

**Repository:** https://github.com/PDAC95/wani

---

## Acknowledgments

- **Stellar Development Foundation** - Blockchain infrastructure
- **Circle** - USD to USDC conversion
- **Bitso** - USDC to MXN conversion
- **Supabase** - Database and auth infrastructure
- **Upstash** - Redis caching
- **Railway** - Backend hosting
- **Vercel** - Frontend hosting
- **Expo** - Mobile development platform
