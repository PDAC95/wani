# 💰 Wani - Peace of Mind Remittance Platform

> Next-generation remittance platform enabling instant, low-cost money transfers from USA to Mexico with integrated digital wallet and NFC payment capabilities.

**Wani (和)** - Japanese for "peace, harmony" - bringing peace of mind to every cross-border transaction.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Status: Planning](https://img.shields.io/badge/Status-Planning-blue.svg)](https://github.com/YOUR_USERNAME/wani-platform)

---

## ✨ Features

- 💸 **Low-Cost Remittances** - 2% fee vs 6-8% traditional services
- ⚡ **Instant Wallet Credit** - Recipients get money immediately
- 📱 **NFC Payments** - Pay merchants with a tap (0% fee)
- 🏦 **Fast Cash-Out** - Withdraw to Mexican bank in 7-10 minutes
- 🔒 **Secure** - Bank-level security with blockchain transparency
- 📊 **Merchant Dashboard** - Track sales and manage business

---

## 🎯 Mission

Wani empowers cross-border workers and their families by providing:

- **Peace (和 - Wa):** Financial security through low fees and instant transfers
- **Connection:** Keeping families connected across borders
- **Prosperity:** More money reaching loved ones, less to intermediaries
- **Accessibility:** Easy-to-use platform for everyone, regardless of tech skills

---

## 📚 Documentation

- [📄 Product Requirements (PRD)](docs/prd.md) - Complete product specification
- [🏗️ Technical Architecture (PLANNING)](docs/planning.md) - System design and tech stack
- [📋 Task Roadmap (TASKS)](docs/tasks.md) - 8-week development plan
- [🎨 Design System (DESIGN)](docs/design.md) - Brand identity and color palette
- [🔧 Development Rules (CLAUDE)](docs/claude.md) - Development framework and standards
- [📊 Progress Tracking (PROGRESS)](docs/progress.md) - Daily development log
- [🐛 Error Log (ERRORS)](docs/errors.md) - Known issues and solutions
- [🔄 Git Workflow (GITHUB)](docs/github.md) - Version control and CI/CD

---

## 🛠️ Tech Stack

### Backend
- **Framework:** FastAPI (Python 3.11+)
- **Database:** PostgreSQL 15 (Supabase)
- **Cache:** Redis 7
- **Queue:** Celery
- **Blockchain:** Stellar SDK (USDC)
- **Testing:** Pytest

### Frontend Web
- **Framework:** React 18 + TypeScript
- **Build:** Vite
- **Styling:** Tailwind CSS + shadcn/ui
- **State:** TanStack Query + Zustand
- **Testing:** Vitest + Playwright

### Frontend Mobile
- **Framework:** React Native + Expo SDK 50
- **Styling:** NativeWind (Tailwind for RN)
- **Navigation:** Expo Router
- **Testing:** Jest

### Infrastructure
- **Hosting:** Vercel (web), Railway (backend), EAS (mobile)
- **Database:** Supabase
- **Monitoring:** Sentry
- **CI/CD:** GitHub Actions

---

## 🚀 Quick Start

### Prerequisites

- **Backend:** Python 3.11+, PostgreSQL 15+, Redis 7+
- **Frontend Web:** Node.js 18+, pnpm 8+
- **Frontend Mobile:** Node.js 18+, Expo CLI
- **Accounts:** Supabase, Railway, Vercel, Circle, Bitso (sandbox)

### Installation

#### 1. Clone Repository

```bash
git clone https://github.com/YOUR_USERNAME/wani-platform.git
cd wani-platform
```

#### 2. Backend Setup

```bash
cd backend

# Create virtual environment
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate

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
```

#### 3. Frontend Web Setup

```bash
cd frontend-web

# Install dependencies
pnpm install

# Setup environment variables
cp .env.example .env.local
# Edit .env.local with your API URL

# Start dev server
pnpm dev
# App available at http://localhost:5173
```

#### 4. Frontend Mobile Setup

```bash
cd frontend-mobile

# Install dependencies
npm install

# Start Expo
npx expo start
# Scan QR code with Expo Go app
```

---

## 🗺️ Roadmap

### MVP (8 Weeks) - In Progress

- [ ] **Week 1:** Foundation & Authentication
- [ ] **Week 2:** Wallet Core Features
- [ ] **Week 3:** Remittance Flow
- [ ] **Week 4:** NFC Payments
- [ ] **Week 5:** Cash-Out Integration
- [ ] **Week 6:** Merchant Dashboard
- [ ] **Week 7:** Security & Testing
- [ ] **Week 8:** Beta Launch (50 users)

### v2.0 (Post-MVP)

- [ ] Instant remittance with debit card
- [ ] Biometric authentication
- [ ] Scheduled/recurring transfers
- [ ] Physical/virtual debit card
- [ ] Additional corridors (Colombia, Guatemala, El Salvador)

---

## 🎨 Brand Identity

**Colors:**
- **Coral Primary:** #FB923C (Warmth, family connection, prosperity)
- **Brown Neutral:** #292524 (Stability, security, grounding)
- **Cream Background:** #FFF7ED (Approachable, warm, comfortable)

**Logo:** Flowing "W" with three circles representing community and the flow of money across borders.

See [DESIGN.md](docs/design.md) for complete design system.

---

## 📊 Key Metrics (Target)

**Month 1:**
- $50,000 in remittance volume
- 200 registered users
- 20 active merchants

**Month 3:**
- $200,000 in remittance volume
- 500 registered users
- 50 active merchants

**Year 1:**
- $5M in remittance volume
- 5,000 registered users
- 200 active merchants
- Expansion to 2 additional countries

---

## 🤝 Contributing

We welcome contributions to Wani! Please see our contributing guidelines:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes using conventional commits (`git commit -m 'feat(scope): add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

See [GITHUB.md](docs/github.md) for detailed workflow.

---

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

## 👥 Team

- **Lead Developer:** [@YOUR_GITHUB_USERNAME](https://github.com/YOUR_GITHUB_USERNAME)

---

## 🙏 Acknowledgments

- [Stellar Development Foundation](https://stellar.org) - Blockchain infrastructure
- [Circle](https://circle.com) - USDC stablecoin provider
- [Bitso](https://bitso.com) - Mexican cash-out partner
- [Supabase](https://supabase.com) - Database hosting

---

## 📞 Contact

- **Website:** [Coming Soon]
- **Email:** support@wani.app
- **Twitter:** [@WaniApp](https://twitter.com/WaniApp)

---

**Built with ❤️ for the global community**

_Wani - Peace of mind in every transaction (和 - Wa: Peace, Harmony)_
