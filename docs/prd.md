# Product Requirements Document (PRD)

## Wani - Remittance & Digital Wallet Platform

**Product Name:** Wani (和 - Peace, Harmony)
**Tagline:** "Peace of mind in every transaction"
**Version:** 1.0
**Date:** October 15, 2025
**Author:** Product Team
**Status:** Planning

---

## Executive Summary

We are building a next-generation remittance and digital wallet platform that enables instant, low-cost money transfers from the USA to Mexico, combined with a powerful digital wallet that allows recipients to spend their money via NFC payments at local merchants without cash-out fees.

**The Problem:** Traditional remittance services (Western Union, Wise, etc.) charge 3-8% in fees and take 1-3 days for money to arrive. Recipients then need to cash out at physical locations or wait for bank deposits, facing additional friction and costs.

**Our Solution:** A blockchain-powered platform (Stellar Network + USDC) that charges only 2% for remittances with instant settlement, plus a digital wallet with NFC payment capabilities. Recipients can either spend directly at merchants (0% fee) or cash out to their bank via SPEI (7-10 minutes).

**Target Market:**

- Primary: Mexican immigrants in the USA sending money home ($60B annual corridor)
- Secondary: Mexican merchants wanting cheaper payment processing (1% vs 2.5-3.5%)
- Tertiary: Mexican consumers wanting a modern digital wallet

**Key Differentiators:**

- 2% fee vs 6-8% traditional (3-4X cheaper)
- Instant wallet credit vs 1-3 days traditional
- NFC payments at 0% fee (encourages ecosystem retention)
- Cash-out in 7-10 minutes vs 24-48 hours traditional
- No hardware needed for merchants (just smartphone)

**Current Status:** Pre-development planning phase. MVP timeline: 8 weeks to beta launch with 50 users.

**Vision:** Become the default financial platform for cross-border workers and their families in Latin America, processing $100M+ annually by Year 2.

---

## Problem Statement

### Identified Problems

**Problem 1: Expensive Remittance Fees**
Traditional remittance services charge exorbitant fees that hurt low-income workers the most. Western Union charges 6-8%, Wise charges 3-4%, and hidden forex spreads add another 1-2%. For a worker sending $500 home monthly, they lose $360-480 annually just in fees.

**Problem 2: Slow Settlement Times**
Current services take 1-3 days for money to arrive, creating uncertainty and delaying access to funds for urgent needs (medical bills, rent, emergencies). Recipients often can't plan effectively.

**Problem 3: Cash-Out Friction**
Even after money "arrives," recipients face additional friction:

- Physical pickup locations (Western Union) require travel and waiting
- Bank deposits take another 24-48 hours
- ATM withdrawals have limits and fees
- No easy way to spend digitally

**Problem 4: Expensive Merchant Payment Processing**
Small Mexican businesses pay 2.5-3.5% for card terminals, plus monthly rental fees ($500-1,500 MXN). This makes accepting digital payments unaffordable for many small merchants, forcing a cash-based economy.

**Problem 5: Limited Financial Infrastructure**
Many recipients and merchants lack access to modern financial tools, banking services, or are underbanked. Traditional banks don't serve this market well.

### Problem Impact

**For Senders (USA):**

- Lose $360-480/year in fees (based on $500/month)
- Anxiety about whether money arrived
- Limited transparency on exchange rates
- Poor mobile experience with legacy providers

**For Recipients (Mexico):**

- Wait 1-3 days to access funds
- Travel to pickup locations (time + cost)
- Bank deposits take additional 1-2 days
- Pay additional fees to cash out
- Limited options to spend digitally

**For Merchants (Mexico):**

- Pay 2.5-3.5% on all card transactions
- $500-1,500 MXN monthly terminal rental
- 24-48 hour settlement to bank
- Excluded from digital economy if can't afford terminals
- High cash handling risks

**Market Quantification:**

- USA→Mexico corridor: $60B annually
- Average fee: 5% = $3B in fees paid yearly
- 11M+ Mexican immigrants in USA
- Target: Capture 0.1% in Year 1 = $60M volume

---

## Target Users

### Primary User: Remittance Sender (USA)

**Profile:** Mexican immigrant, 25-45 years old, blue-collar worker (construction, hospitality, services), earning $30-50k annually, tech-comfortable (smartphone user)

**Needs:**

- Send $200-800 monthly to family in Mexico
- Lowest possible fees
- Fast, reliable service
- Transparent pricing and exchange rates
- Mobile-first experience
- Track transfer status in real-time

**Frustrations:**

- High fees eating into earnings
- Waiting days to confirm money arrived
- Confusing exchange rate markups
- Having to go to physical locations
- Legacy apps with poor UX

**Technology:** High smartphone adoption (iOS/Android), uses Venmo/CashApp, comfortable with banking apps, primarily mobile-first

**Behavior:**

- Sends money 2-4 times per month
- Typically evenings/weekends
- Price-sensitive but values speed
- Trusts recommendations from community

---

### Secondary User: Remittance Recipient (Mexico)

**Profile:** Family member in Mexico, 20-60 years old, varied occupations, may be underbanked, smartphone owner

**Needs:**

- Receive money quickly and reliably
- Easy access to funds (spend or cash out)
- No additional fees to access money
- Ability to pay bills, buy groceries digitally
- Simple app interface (may be less tech-savvy)

**Frustrations:**

- Waiting days for money to arrive
- Having to travel to pickup locations
- Bank deposit delays
- ATM fees and limits
- Carrying large amounts of cash

**Technology:** Smartphone user (primarily Android), uses WhatsApp extensively, may have limited banking app experience, needs intuitive UI

**Behavior:**

- Checks app frequently when expecting money
- Prefers to spend digitally when possible
- Values convenience over complexity
- May cash out for bills/rent, spend rest digitally

---

### Tertiary User: Merchant (Mexico)

**Profile:** Small business owner, 30-55 years old, operates retail, restaurant, or service business, looking to reduce costs

**Needs:**

- Accept digital payments affordably
- No expensive hardware investment
- Fast settlement (same-day preferred)
- Simple reconciliation and reporting
- Reliable system with good support

**Frustrations:**

- High card processing fees (2.5-3.5%)
- Monthly terminal rental costs
- 24-48 hour settlement delays
- Complex reporting
- Hardware maintenance issues

**Technology:** Smartphone user, may use point-of-sale systems, comfortable with business apps, wants simple setup

**Behavior:**

- Processes 50-200 transactions daily
- Checks daily sales reports
- Needs cash flow visibility
- Values cost savings highly

---

## User Stories

### Onboarding & Authentication

1. **As a sender**, I want to register with just email and password so that I can start quickly without complicated forms
2. **As a sender**, I want to verify my identity with basic KYC so that I can send larger amounts safely
3. **As a recipient**, I want to receive an invite link via SMS so that I can create my wallet account easily
4. **As a merchant**, I want to apply for a merchant account so that I can accept payments from customers

### Sending Remittances

5. **As a sender**, I want to connect my US bank account via ACH so that I can fund transfers at 0% fee
6. **As a sender**, I want to enter recipient's phone number and amount so that sending money is as easy as Venmo
7. **As a sender**, I want to see total cost upfront (amount + fee) so that there are no surprises
8. **As a sender**, I want to choose between Standard (1-2 days, 2%) or Instant (1 hour, 3.5%) so that I can control cost vs speed
9. **As a sender**, I want to track my transfer status in real-time so that I know when money arrives
10. **As a sender**, I want to save favorite recipients so that I can send money faster next time

### Receiving & Wallet Management

11. **As a recipient**, I want to receive instant push notification when money arrives so that I know funds are available
12. **As a recipient**, I want to see my balance in both USD and MXN so that I understand my purchasing power
13. **As a recipient**, I want to view my transaction history so that I can track all money received and spent
14. **As a recipient**, I want to send money P2P to other users so that I can pay friends/family locally
15. **As a recipient**, I want to request money from others so that splitting bills is easy

### Spending with NFC/QR

16. **As a recipient**, I want to pay at merchants with NFC tap so that checkout is instant and I avoid cash-out fees
17. **As a recipient**, I want to scan a QR code to pay so that I have an alternative if NFC isn't available
18. **As a recipient**, I want to enter a 4-digit PIN for payments over $50 so that my money is secure
19. **As a recipient**, I want to see instant payment confirmation so that I know the transaction succeeded
20. **As a recipient**, I want digital receipts for all purchases so that I can track spending

### Cash-Out

21. **As a recipient**, I want to add my Mexican bank account (CLABE) so that I can withdraw to my bank when needed
22. **As a recipient**, I want to see the exact MXN amount I'll receive before confirming so that I understand the exchange rate
23. **As a recipient**, I want to withdraw money and receive it in 7-10 minutes so that I can access cash quickly when needed
24. **As a recipient**, I want to track cash-out status so that I know when money hits my bank

### Merchant Features

25. **As a merchant**, I want to generate NFC payment sessions so that customers can tap and pay
26. **As a merchant**, I want to generate QR codes for payments so that customers without NFC can still pay
27. **As a merchant**, I want to see incoming payments in real-time so that I can confirm transactions immediately
28. **As a merchant**, I want to view daily sales reports so that I can reconcile my business
29. **As a merchant**, I want to cash out my balance to my business bank account so that I can pay suppliers
30. **As a merchant**, I want to set daily transaction limits so that I can manage risk

### Support & Safety

31. **As any user**, I want to enable 2FA so that my account is more secure
32. **As any user**, I want to report a problem transaction so that I can get support when needed
33. **As any user**, I want to freeze my account if phone is stolen so that I can protect my funds
34. **As any user**, I want to see my account activity log so that I can detect unauthorized access

---

## Functional Requirements

### Authentication & Onboarding

- Email/password registration with email verification
- Phone number verification via SMS OTP
- Basic KYC: Name, DOB, address for USA senders
- CURP verification for Mexican recipients (via Bitso)
- Facial verification optional for higher limits
- 2FA optional (SMS or authenticator app)
- Session management with JWT tokens
- Password reset via email
- Account recovery flow

### Wallet Management

- Display balance in USDC and equivalent MXN
- Real-time balance updates
- Transaction history with filters (date, type, status)
- Search transactions
- Export transaction history (CSV, PDF)
- Multiple wallet types: Personal, Merchant
- Lock/unlock wallet feature
- Balance notifications (low balance, large transactions)

### Remittance Sending (USA → Mexico)

- Enter recipient phone number or select from contacts
- Amount input with real-time fee calculation
- Display total cost: amount + fee
- Show recipient will receive amount in USDC/MXN
- Choose payment method:
  - ACH (Standard: 2%, 1-2 days)
  - Debit card (Instant: 3.5%, <1 hour) [v2]
- Save recipient as favorite
- Schedule recurring transfers [v2]
- Transfer status tracking:
  - Pending ACH
  - Processing
  - Completed
  - Failed (with reason)
- Push notifications for status changes
- In-app transfer history

### P2P Transfers (Internal)

- Send money to other users via phone number
- Request money from other users
- Split bill feature [v2]
- Add note/memo to transfers
- Instant settlement (internal ledger)
- 0% fee for P2P transfers

### NFC Payments

- Merchant generates NFC session with amount
- Customer taps phone to merchant's phone
- Read NFC tag data (session ID, merchant ID)
- Display payment confirmation screen
- Optional PIN for amounts >$50
- Submit payment to backend
- Instant confirmation (2-3 seconds)
- Digital receipt generation
- Push notification to both parties
- Fallback to QR if NFC unavailable

### QR Code Payments

- Merchant generates QR code with amount
- Customer scans QR code with camera
- Display payment confirmation screen
- Submit payment (same flow as NFC)
- Support for static QR (merchant ID only, customer enters amount)
- Dynamic QR (includes amount, expires in 5 minutes)

### Cash-Out (Wallet → Bank)

- Add Mexican bank account:
  - Bank name (dropdown)
  - CLABE (18 digits, validation)
  - Beneficiary name (must match account)
- Save multiple bank accounts
- Select account for withdrawal
- Enter amount to withdraw
- Show conversion rate USDC → MXN
- Display fees (0.5% Bitso + SPEI)
- Show exact MXN amount to receive
- Confirm withdrawal
- Process via Bitso + SPEI
- Status tracking:
  - Pending
  - Processing Stellar
  - Processing Bitso
  - Processing SPEI
  - Completed
  - Failed
- Estimated completion: 7-10 minutes
- Push notification when completed
- Transaction receipt with tracking ID

### Merchant Dashboard

- Current balance display
- Today's sales summary (count, volume)
- Generate payment QR/NFC session
- Incoming payment notifications
- Transaction list with filters
- Settlement to bank account
- Sales analytics:
  - Daily/weekly/monthly graphs
  - Average transaction size
  - Peak hours
  - Top customers [v2]
- Export reports (CSV, PDF)
- Manage payment limits

### Admin Dashboard [Internal]

- User management (view, suspend, delete)
- Transaction monitoring (all transactions)
- Fraud detection alerts
- Hot wallet balance monitoring
- System health metrics
- Manual transaction overrides
- Customer support tools
- KYC approval workflow
- Analytics dashboard:
  - User growth
  - Transaction volume
  - Revenue metrics
  - Retention rates

---

## Non-Functional Requirements

### Performance

- API response time: <200ms p95
- Mobile app launch: <2 seconds
- NFC payment processing: <3 seconds end-to-end
- Dashboard page load: <1 second
- Support 10,000 concurrent users (MVP)
- Support 100 transactions per second (MVP)
- Database query optimization for <100ms

### Security

- HTTPS/TLS 1.3 for all communications
- JWT authentication with 24-hour expiration
- Refresh token rotation
- Hot wallet private key in encrypted secrets (Railway Secrets or Supabase Vault)
- Rate limiting on all endpoints:
  - Auth: 5 attempts per 15 min
  - Payments: 10 per minute
  - Cash-out: 3 per hour
- Input validation and sanitization
- SQL injection prevention (parameterized queries)
- XSS prevention
- CSRF protection
- PCI DSS compliance considerations [v2]
- Regular security audits
- Audit logging for all financial transactions
- Two-factor authentication optional
- Session timeout after 30 minutes inactivity
- Biometric authentication on mobile [v2]

### Scalability

- Horizontal scaling for FastAPI backend (load balancer ready)
- PostgreSQL read replicas for scaling reads
- Redis cluster for session management at scale
- CDN for static assets (Vercel automatic)
- Database partitioning by date for transactions table
- Hot wallet auto-replenishment from cold wallet
- Queue system (Celery) for background jobs
- Microservices migration path documented
- Support growth from 1k to 100k users without rewrite

### Usability

- Mobile-first design (90% of users on mobile)
- Responsive web design (desktop support)
- Maximum 3 taps to complete any primary action
- Onboarding completion in <3 minutes
- English and Spanish language support
- Accessibility: WCAG 2.1 AA compliance
- Offline mode for viewing balance/history [v2]
- Intuitive navigation (no user manual needed)
- Consistent UI patterns across platforms
- Dark mode support [v2]

### Availability

- 99.9% uptime target (8.7 hours downtime/year max)
- Automated database backups (daily, retained 30 days)
- Point-in-time recovery capability
- Disaster recovery plan documented
- Monitoring and alerting:
  - Sentry for error tracking
  - Telegram alerts for critical issues
  - Hot wallet balance alerts (<20% threshold)
- Scheduled maintenance windows: Sundays 2-4 AM CST
- Graceful degradation if external services fail
- Retry logic for failed transactions
- Circuit breaker pattern for external APIs

### Compliance

- KYC/AML compliance:
  - Basic KYC for accounts <$500/month
  - Enhanced KYC for accounts >$500/month
  - Transaction monitoring for suspicious activity
- Data retention: 7 years for financial records
- GDPR compliance for user data (right to deletion, export)
- Privacy policy and terms of service
- Cookie consent management
- User data encryption at rest
- PCI DSS compliance pathway [when adding cards]
- Money Transmitter License strategy:
  - MVP: Partner model (Bitso/Circle have licenses)
  - Scale: Acquire own licenses at >$1M monthly volume

---

## Technology Stack

### Frontend Web (PWA)

- **Framework:** React 18 + TypeScript
- **Build Tool:** Vite
- **Styling:** Tailwind CSS
- **UI Components:** shadcn/ui (Radix UI primitives)
- **Forms:** React Hook Form + Zod validation
- **State Management:**
  - Server state: TanStack Query (React Query)
  - Client state: Zustand
- **Routing:** React Router v6
- **PWA:** vite-plugin-pwa + Workbox
- **i18n:** react-i18next

### Frontend Mobile (iOS/Android)

- **Framework:** React Native + TypeScript
- **Platform:** Expo (managed workflow)
- **Routing:** Expo Router (file-based)
- **Styling:** NativeWind (Tailwind for React Native)
- **State Management:**
  - Server state: TanStack Query
  - Client state: Zustand
- **Native Features:**
  - expo-nfc (NFC payments)
  - expo-camera (QR scanning)
  - expo-notifications (Push)
  - expo-local-authentication (Biometrics)

### Backend

- **API Framework:** FastAPI (Python 3.11+)
- **Database:** PostgreSQL 15+ (Supabase hosted)
- **ORM:** SQLAlchemy 2.0
- **Cache:** Redis 7+
- **Queue:** Celery + Redis
- **Auth:** Supabase Auth (JWT)
- **Storage:** Supabase Storage
- **Blockchain:**
  - stellar-sdk 9.1.0 (Stellar integration)
  - Horizon API client
- **External APIs:**
  - Circle API (USD → USDC)
  - Bitso API (USDC → MXN, cash-out)
  - Plaid (ACH bank connections) [v2]

### Infrastructure & DevOps

- **Web Hosting:** Vercel (automatic CDN, edge functions)
- **Mobile Build:** EAS (Expo Application Services)
- **Backend Hosting:** Railway or Fly.io
- **Database:** Supabase (PostgreSQL + Auth + Storage)
- **Cache:** Redis (included in Railway/Fly.io)
- **CDN:** Cloudflare (for Supabase Storage)
- **CI/CD:** GitHub Actions
- **Monitoring:**
  - Sentry (error tracking)
  - Railway/Fly.io metrics
  - Telegram bot (alerts)
- **Domain:** Custom domain + SSL (Vercel managed)

### External Integrations

- **Circle:** USD to USDC conversion (0% fee)
- **Bitso Business:** USDC to MXN conversion + SPEI cash-out
- **Stellar Network:** Blockchain for USDC transfers
- **Supabase:** Database, Auth, Storage, Realtime
- **Plaid:** Bank account connections (USA) [v2]
- **Twilio:** SMS verification (OTP)
- **SendGrid:** Transactional emails
- **PostHog:** Analytics (optional)

---

## Success Metrics

### Adoption Metrics (Month 1-3)

- **Target Users:** 500 registered users
- **Active Users:** 200 monthly active users (MAU)
- **Sender:Recipient Ratio:** 1:2 (1 sender, 2 recipients)
- **Merchant Adoption:** 20 active merchants
- **Registration Conversion:** >60% (invite to signup)
- **Onboarding Completion:** >80% complete profile

### Engagement Metrics

- **Sender Frequency:** 2-4 transactions per month
- **Recipient App Opens:** 8-12 per month
- **NFC Payment Usage:** 40% of recipients use at least once
- **Cash-out Rate:** <50% (goal: keep money in ecosystem)
- **Session Duration:** 2-3 minutes average
- **Return Rate:** >60% month-over-month retention

### Business Metrics

- **Transaction Volume:** $50,000 in Month 1, $200,000 by Month 3
- **Revenue:** $1,000 in Month 1 (2% of $50k), $4,000 by Month 3
- **Average Transaction:** $100-150
- **Cost per Transaction:** $0.50 (Bitso fee when cash-out)
- **Gross Margin:** 1.5% (cash-out) to 2% (wallet spending)
- **Break-even Volume:** $3,000/month (covers $45 infrastructure)
- **Customer Acquisition Cost:** <$10 per user (organic + referrals)

### Technical Metrics

- **API Latency:** p95 <200ms, p99 <500ms
- **Error Rate:** <0.5% of all requests
- **Uptime:** >99.5% (measured weekly)
- **NFC Payment Success:** >98% first-attempt success
- **Failed Transactions:** <1% (Stellar, Bitso, payment failures)
- **Database Query Time:** p95 <100ms
- **Mobile App Crash Rate:** <0.1%

### Financial Health Metrics

- **Hot Wallet Utilization:** 60-80% of capacity
- **Reserves Ratio:** 20% of monthly volume in hot wallet
- **Cash-out Rate:** Track daily (target <50%)
- **Float Revenue:** Track interest earned on USDC reserves [v2]

---

## MVP vs Full Version

### MVP (Minimum Viable Product)

**Timeline:** 8 weeks

**Included Features:**

- User registration and basic KYC
- ACH bank connection (manual wire for MVP, Plaid v2)
- Send remittance (Standard 2%, 1-2 days)
- Receive remittance (instant wallet credit from our reserves)
- Wallet balance display (USDC + MXN equivalent)
- Transaction history
- P2P transfers between users
- NFC payments (customer → merchant)
- QR code payments (fallback)
- Cash-out to Mexican bank (SPEI via Bitso)
- Push notifications (basic: money received, payment confirmed)
- Merchant dashboard (basic: generate payment, view sales)
- Web app (PWA)
- Mobile app (iOS + Android via Expo)

**Excluded Features (v2):**

- Plaid integration (use manual wire for MVP)
- Instant remittance (debit card, 3.5%)
- Scheduled/recurring transfers
- Split bill feature
- Biometric authentication
- Advanced analytics
- Referral program
- Cashback/loyalty points
- Bill pay integration
- Top-up from Mexican bank
- Multi-currency support beyond USD/MXN

**MVP Scope Limitations:**

- USA → Mexico corridor only
- English + Spanish only
- Manual KYC approval (admin reviews)
- Single bank account per user
- Basic fraud detection (rule-based)
- Limited customer support (email only)

### Full Version (v2)

**Timeline:** Months 4-6 post-launch

**Additional Features:**

- Plaid ACH integration (automatic)
- Instant remittance option (debit card)
- Scheduled and recurring transfers
- Split bill with friends
- Biometric authentication (Face ID, fingerprint)
- Advanced merchant analytics (charts, insights)
- Referral program ($10 bonus for referrer + referee)
- Cashback program (1% on merchant spending)
- Bill pay (utilities, phone, internet)
- Top-up from Mexican bank (reverse cash-out)
- Request money feature
- Physical card (virtual card first) [v3]
- Additional corridors (USA → other LatAm countries)
- Business accounts with API access
- Automated fraud detection (ML-based)
- In-app customer support chat
- Advanced reporting and tax documents

---

## Data Model Specification

### Users Schema

```javascript
{
  id: UUID (primary key),
  email: String (unique, required),
  phone: String (unique, required),
  first_name: String (required),
  last_name: String (required),
  country_code: String (default: 'MX'), // 'US' or 'MX'
  kyc_status: Enum ['pending', 'approved', 'rejected'],
  kyc_data: JSONB {
    dob: Date,
    address: Object,
    curp: String (Mexico),
    ssn: String (USA, encrypted),
    documents: Array
  },
  is_active: Boolean (default: true),
  created_at: Timestamp,
  updated_at: Timestamp
}
```

### Wallets Schema

```javascript
{
  id: UUID (primary key),
  user_id: UUID (foreign key → users, unique),
  balance_usdc: Decimal(18,6) (default: 0),
  balance_mxn: Decimal(18,2) (default: 0),
  locked_balance_usdc: Decimal(18,6) (default: 0),
  total_received_usdc: Decimal(18,6) (default: 0),
  total_sent_usdc: Decimal(18,6) (default: 0),
  created_at: Timestamp,
  updated_at: Timestamp
}
```

### Transactions Schema

```javascript
{
  id: UUID (primary key),
  from_user_id: UUID (foreign key → users, nullable),
  to_user_id: UUID (foreign key → users, nullable),
  amount: Decimal(18,6) (required),
  currency: String (default: 'USDC'), // 'USDC', 'MXN', 'USD'
  fee_amount: Decimal(18,6) (default: 0),
  net_amount: Decimal(18,6) (required),
  type: Enum [
    'remittance_inbound',
    'remittance_outbound',
    'p2p_transfer',
    'nfc_payment',
    'qr_payment',
    'cash_out',
    'cash_in',
    'fee',
    'refund'
  ],
  status: Enum [
    'pending',
    'processing',
    'completed',
    'failed',
    'cancelled',
    'refunded'
  ],
  stellar_tx_hash: String (nullable),
  bitso_tx_id: String (nullable),
  reference_id: String (nullable),
  metadata: JSONB {
    nfc_device_id: String,
    location: Object {lat, lng},
    merchant_name: String,
    bank_clabe: String,
    exchange_rate: Decimal
  },
  error_message: String (nullable),
  created_at: Timestamp,
  completed_at: Timestamp (nullable),
  updated_at: Timestamp
}
```

### Cash-Out Requests Schema

```javascript
{
  id: UUID (primary key),
  user_id: UUID (foreign key → users),
  transaction_id: UUID (foreign key → transactions),
  amount_usdc: Decimal(18,6) (required),
  amount_mxn: Decimal(18,2) (required),
  exchange_rate: Decimal(10,4) (required),
  fee_amount: Decimal(18,6) (default: 0),
  bank_name: String (required),
  bank_clabe: String (required, 18 digits),
  beneficiary_name: String (required),
  status: Enum ['pending', 'processing', 'completed', 'failed'],
  bitso_tx_id: String (nullable),
  bitso_response: JSONB (nullable),
  requested_at: Timestamp,
  processed_at: Timestamp (nullable),
  completed_at: Timestamp (nullable),
  error_message: String (nullable),
  retry_count: Integer (default: 0)
}
```

### Merchants Schema

```javascript
{
  id: UUID (primary key),
  user_id: UUID (foreign key → users, unique),
  business_name: String (required),
  business_type: String, // 'restaurant', 'retail', 'services'
  tax_id: String, // RFC in Mexico
  commission_rate: Decimal(5,4) (default: 0.01), // 1%
  nfc_enabled: Boolean (default: true),
  qr_enabled: Boolean (default: true),
  daily_limit_usdc: Decimal(18,6) (nullable),
  monthly_limit_usdc: Decimal(18,6) (nullable),
  total_transactions: Integer (default: 0),
  total_volume_usdc: Decimal(18,6) (default: 0),
  is_active: Boolean (default: true),
  verified_at: Timestamp (nullable),
  created_at: Timestamp,
  updated_at: Timestamp
}
```

### Bank Accounts Schema

```javascript
{
  id: UUID (primary key),
  user_id: UUID (foreign key → users),
  bank_name: String (required),
  bank_clabe: String (required, 18 digits),
  beneficiary_name: String (required),
  is_default: Boolean (default: false),
  is_verified: Boolean (default: false),
  created_at: Timestamp,
  updated_at: Timestamp
}
```

### Audit Logs Schema

```javascript
{
  id: UUID (primary key),
  user_id: UUID (foreign key → users, nullable),
  action: String (required), // 'login', 'transfer', 'cash_out'
  entity_type: String, // 'transaction', 'wallet', 'user'
  entity_id: UUID (nullable),
  old_values: JSONB (nullable),
  new_values: JSONB (nullable),
  ip_address: INET (nullable),
  user_agent: String (nullable),
  created_at: Timestamp
}
```

---

## System Architecture

### High-Level Architecture

```
┌─────────────────────────────────────────────────┐
│              USER DEVICES                       │
│  ┌──────────────┐         ┌──────────────┐    │
│  │   Web PWA    │         │  Mobile App  │    │
│  │   (Vercel)   │         │    (Expo)    │    │
│  └──────┬───────┘         └──────┬───────┘    │
└─────────┼──────────────────────────┼───────────┘
          │                          │
          └──────────┬───────────────┘
                     │ HTTPS/WSS
                     ▼
┌─────────────────────────────────────────────────┐
│           API GATEWAY / LOAD BALANCER           │
│              (Railway/Fly.io)                   │
└──────────────────────┬──────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────┐
│            FASTAPI BACKEND                      │
│  ┌──────────────────────────────────────────┐  │
│  │  /api/auth      - Authentication         │  │
│  │  /api/wallet    - Balance, history       │  │
│  │  /api/remittance- Send/receive money     │  │
│  │  /api/payments  - NFC/QR payments        │  │
│  │  /api/cashout   - Bank withdrawals       │  │
│  │  /api/merchants - Merchant features      │  │
│  └──────────────────────────────────────────┘  │
└─────┬────────────────────┬───────────────┬─────┘
      │                    │               │
      ▼                    ▼               ▼
┌──────────┐      ┌──────────────┐   ┌─────────┐
│ Supabase │      │  Celery      │   │  Redis  │
│          │      │  Workers     │   │  Cache  │
│ ├─PostgreSQL    │              │   │         │
│ ├─Auth     │    │ ├─Monitor    │   │ ├─Session
│ ├─Storage  │    │ │  ACH       │   │ ├─Rate   │
│ └─Realtime │    │ ├─Monitor    │   │ │  Limit │
│            │    │ │  Cash-out  │   │ └─Queue  │
│            │    │ ├─Hot Wallet │   │         │
│            │    │ │  Alerts    │   │         │
│            │    │ └─Daily      │   │         │
│            │    │    Reports   │   │         │
└──────────┘      └──────────────┘   └─────────┘
      │
      ▼
┌─────────────────────────────────────────────────┐
│         EXTERNAL INTEGRATIONS                   │
├─────────────────────────────────────────────────┤
│                                                 │
│  ┌────────────┐  ┌────────────┐  ┌──────────┐│
│  │   Circle   │  │   Bitso    │  │ Stellar  ││
│  │    API     │  │  Business  │  │ Network  ││
│  │            │  │            │  │          ││
│  │ USD→USDC   │  │ USDC→MXN   │  │ Transfer ││
│  └────────────┘  └────────────┘  └──────────┘│
│                                                 │
│  ┌────────────┐  ┌────────────┐  ┌──────────┐│
│  │   Twilio   │  │ SendGrid   │  │  Sentry  ││
│  │    SMS     │  │   Email    │  │ Errors   ││
│  └────────────┘  └────────────┘  └──────────┘│
└─────────────────────────────────────────────────┘
```

### User Flow: Send Remittance (USA → Mexico)

```
[User USA Opens App]
         │
         ▼
[Enter Recipient Phone + Amount]
         │
         ▼
[Show Fee: 2%, Total: $510]
         │
         ▼
[Confirm Transfer]
         │
         ▼
[Initiate ACH from Bank] ←─────┐
         │                     │
         ▼                     │
[Backend: Create Transaction]  │
[Status: pending_ach]          │
         │                     │
         ▼                     │
[Credit Recipient Immediately]─┘ (from our reserves)
[From our Hot Wallet]
         │
         ▼
[Recipient Gets Push Notification]
[Balance Updated Instantly]
         │
         ▼
[Background: Monitor ACH]
[1-2 days later ACH completes]
         │
         ▼
[Circle: USD → USDC]
         │
         ▼
[Replenish Hot Wallet]
         │
         ▼
[Transaction: completed]
```

### User Flow: NFC Payment

```
[Merchant: Enter Amount $50]
         │
         ▼
[Generate NFC Session]
[Session ID + Merchant ID]
         │
         ▼
[Display: "Tap to Pay"]
         │
         ▼
[Customer: Taps Phone] ◄───────┐
         │                     │
         ▼                     │
[Read NFC Tag]                │
[Extract Session Data]        │
         │                     │
         ▼                     │
[Display Confirmation]         │
["Pay $50 to Merchant X?"]    │
         │                     │
         ▼                     │
[Customer: Confirm]            │
[Optional: Enter PIN]          │
         │                     │
         ▼                     │
[Backend: Process Payment]     │
[Internal Transfer]            │
[No Blockchain]                │
         │                     │
         ▼                     │
[Update Balances in DB]        │
[Customer: -$50]               │
[Merchant: +$49.50 (1% fee)]  │
         │                     │
         ▼                     │
[Push Notifications]           │
[Customer: "Paid $50"]         │
[Merchant: "Received $49.50"]  │
         │                     │
         ▼                     │
[Show Success Screen] ─────────┘
[Digital Receipt]
[Time: <3 seconds total]
```

---

## API Specification

### Base URL

```
Production: https://api.yourapp.com/v1
Staging: https://api-staging.yourapp.com/v1
```

### Authentication

All authenticated endpoints require Bearer token:

```
Authorization: Bearer <jwt_token>
```

### Standard Response Format

```json
{
  "success": true,
  "data": { ... },
  "error": null,
  "timestamp": "2025-10-15T10:30:00Z"
}
```

### Error Response Format

```json
{
  "success": false,
  "data": null,
  "error": {
    "code": "INSUFFICIENT_BALANCE",
    "message": "Insufficient balance for this transaction",
    "details": { ... }
  },
  "timestamp": "2025-10-15T10:30:00Z"
}
```

---

### Authentication Endpoints

#### POST /api/auth/register

Register new user

**Request:**

```json
{
  "email": "user@example.com",
  "password": "SecurePass123!",
  "phone": "+525512345678",
  "first_name": "Juan",
  "last_name": "Perez",
  "country_code": "MX"
}
```

**Response (201):**

```json
{
  "success": true,
  "data": {
    "user": {
      "id": "uuid",
      "email": "user@example.com",
      "phone": "+525512345678",
      "kyc_status": "pending"
    },
    "token": "jwt_token_here",
    "refresh_token": "refresh_token_here"
  }
}
```

#### POST /api/auth/login

Login user

**Request:**

```json
{
  "email": "user@example.com",
  "password": "SecurePass123!"
}
```

**Response (200):**

```json
{
  "success": true,
  "data": {
    "user": { ... },
    "token": "jwt_token",
    "refresh_token": "refresh_token"
  }
}
```

#### POST /api/auth/verify-phone

Verify phone with OTP

**Request:**

```json
{
  "phone": "+525512345678",
  "otp": "123456"
}
```

**Response (200):**

```json
{
  "success": true,
  "data": {
    "verified": true
  }
}
```

---

### Wallet Endpoints

#### GET /api/wallet/balance

Get current wallet balance

**Headers:** `Authorization: Bearer <token>`

**Response (200):**

```json
{
  "success": true,
  "data": {
    "balance_usdc": "500.000000",
    "balance_mxn": "10250.00",
    "locked_balance_usdc": "0.000000",
    "exchange_rate": 20.5,
    "last_updated": "2025-10-15T10:30:00Z"
  }
}
```

#### GET /api/wallet/transactions

Get transaction history

**Headers:** `Authorization: Bearer <token>`

**Query Parameters:**

- `page` - Page number (default: 1)
- `limit` - Items per page (default: 20, max: 100)
- `type` - Filter by type (optional)
- `status` - Filter by status (optional)
- `start_date` - Filter from date (optional)
- `end_date` - Filter to date (optional)

**Response (200):**

```json
{
  "success": true,
  "data": {
    "transactions": [
      {
        "id": "uuid",
        "type": "remittance_inbound",
        "amount": "500.000000",
        "currency": "USDC",
        "status": "completed",
        "from_user": {
          "id": "uuid",
          "name": "Maria Lopez"
        },
        "created_at": "2025-10-15T10:00:00Z",
        "completed_at": "2025-10-15T10:01:00Z"
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 20,
      "total": 45,
      "pages": 3
    }
  }
}
```

---

### Remittance Endpoints

#### POST /api/remittance/send

Send money to recipient

**Headers:** `Authorization: Bearer <token>`

**Request:**

```json
{
  "recipient_phone": "+525512345678",
  "amount_usd": 500.0,
  "payment_method": "ach",
  "note": "For rent"
}
```

**Response (201):**

```json
{
  "success": true,
  "data": {
    "transaction_id": "uuid",
    "amount": "500.000000",
    "fee": "10.000000",
    "total": "510.000000",
    "recipient": {
      "name": "Juan Perez",
      "phone": "+525512345678"
    },
    "status": "pending_ach",
    "estimated_completion": "2025-10-17T10:00:00Z"
  }
}
```

#### GET /api/remittance/quote

Get quote for remittance

**Headers:** `Authorization: Bearer <token>`

**Query Parameters:**

- `amount` - Amount in USD
- `payment_method` - 'ach' or 'debit_card'

**Response (200):**

```json
{
  "success": true,
  "data": {
    "amount_usd": 500.0,
    "fee_percentage": 2.0,
    "fee_amount": 10.0,
    "total_usd": 510.0,
    "recipient_receives_usdc": "500.000000",
    "recipient_receives_mxn": "10250.00",
    "exchange_rate": 20.5,
    "payment_method": "ach",
    "estimated_time": "1-2 business days",
    "quote_expires_at": "2025-10-15T10:35:00Z"
  }
}
```

---

### Payment Endpoints

#### POST /api/payments/nfc/create-session

Create NFC payment session (Merchant)

**Headers:** `Authorization: Bearer <token>`

**Request:**

```json
{
  "amount": 50.0,
  "currency": "USDC",
  "description": "Coffee and pastry"
}
```

**Response (201):**

```json
{
  "success": true,
  "data": {
    "session_id": "uuid",
    "amount": "50.000000",
    "merchant_id": "uuid",
    "merchant_name": "Cafe Mexicano",
    "expires_at": "2025-10-15T10:35:00Z",
    "nfc_data": "session_id:merchant_id:amount"
  }
}
```

#### POST /api/payments/nfc/confirm

Confirm NFC payment (Customer)

**Headers:** `Authorization: Bearer <token>`

**Request:**

```json
{
  "session_id": "uuid",
  "pin": "1234"
}
```

**Response (200):**

```json
{
  "success": true,
  "data": {
    "transaction_id": "uuid",
    "amount": "50.000000",
    "merchant": {
      "id": "uuid",
      "name": "Cafe Mexicano"
    },
    "status": "completed",
    "receipt_url": "https://...",
    "completed_at": "2025-10-15T10:30:00Z"
  }
}
```

#### POST /api/payments/qr/generate

Generate QR code for payment (Merchant)

**Headers:** `Authorization: Bearer <token>`

**Request:**

```json
{
  "amount": 50.0,
  "description": "Product purchase"
}
```

**Response (200):**

```json
{
  "success": true,
  "data": {
    "qr_code_data": "payment:uuid:merchant_id:amount",
    "qr_code_image": "data:image/png;base64,...",
    "session_id": "uuid",
    "expires_at": "2025-10-15T10:35:00Z"
  }
}
```

---

### Cash-Out Endpoints

#### POST /api/cashout/request

Request cash-out to bank

**Headers:** `Authorization: Bearer <token>`

**Request:**

```json
{
  "amount_usdc": 500.0,
  "bank_account_id": "uuid"
}
```

**Response (201):**

```json
{
  "success": true,
  "data": {
    "cashout_id": "uuid",
    "amount_usdc": "500.000000",
    "amount_mxn": "10250.00",
    "exchange_rate": 20.5,
    "fee_amount": "2.500000",
    "bank_account": {
      "bank_name": "BBVA",
      "clabe": "012345******4567"
    },
    "status": "pending",
    "estimated_completion": "7-10 minutes"
  }
}
```

#### GET /api/cashout/:id/status

Check cash-out status

**Headers:** `Authorization: Bearer <token>`

**Response (200):**

```json
{
  "success": true,
  "data": {
    "cashout_id": "uuid",
    "status": "processing_spei",
    "status_history": [
      {
        "status": "pending",
        "timestamp": "2025-10-15T10:00:00Z"
      },
      {
        "status": "processing_stellar",
        "timestamp": "2025-10-15T10:01:00Z"
      },
      {
        "status": "processing_bitso",
        "timestamp": "2025-10-15T10:02:00Z"
      },
      {
        "status": "processing_spei",
        "timestamp": "2025-10-15T10:05:00Z"
      }
    ],
    "estimated_completion": "2025-10-15T10:10:00Z"
  }
}
```

#### POST /api/cashout/bank-accounts

Add bank account

**Headers:** `Authorization: Bearer <token>`

**Request:**

```json
{
  "bank_name": "BBVA",
  "bank_clabe": "012345678901234567",
  "beneficiary_name": "Juan Perez"
}
```

**Response (201):**

```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "bank_name": "BBVA",
    "bank_clabe": "012345******4567",
    "beneficiary_name": "Juan Perez",
    "is_verified": false,
    "created_at": "2025-10-15T10:30:00Z"
  }
}
```

---

## Risks and Mitigations

### Technical Risks

**Risk: Hot Wallet Private Key Compromise**

- **Probability:** Low
- **Impact:** Critical ($20k-100k loss)
- **Mitigation:**
  - Store in Railway/Supabase encrypted secrets (never in code)
  - Rate limiting on withdrawals
  - Hot wallet balance alerts if drops >20% in 1 hour
  - Multi-sig for cold wallet
  - Insurance consideration (Lloyd's of London)
  - Regular security audits

**Risk: Stellar Network Downtime**

- **Probability:** Very Low
- **Impact:** High (transactions blocked)
- **Mitigation:**
  - Multiple Horizon nodes (redundancy)
  - Queue transactions locally during downtime
  - Exponential backoff retry logic
  - User communication: "Network delay, processing..."
  - Historical uptime: 99.99%

**Risk: Bitso API Failure**

- **Probability:** Medium
- **Impact:** High (cash-outs fail)
- **Mitigation:**
  - Webhook + polling hybrid approach
  - Celery retry queue (up to 24 hours)
  - Manual override capability in admin panel
  - User notification: "Processing delay, please wait"
  - Alternative exchange as backup [v2]

**Risk: ACH Payment Failure (NSF)**

- **Probability:** Medium (5-10% of ACH fails)
- **Impact:** Medium (we advanced funds, need recovery)
- **Mitigation:**
  - User scoring system (trust score)
  - Start with low limits ($100) for new users
  - Increase limits with successful history
  - Recover via subsequent transactions (auto-deduction)
  - Legal terms cover failed payments

**Risk: Database Corruption/Loss**

- **Probability:** Very Low
- **Impact:** Critical
- **Mitigation:**
  - Daily automated backups (Supabase)
  - Point-in-time recovery enabled
  - Backup retention: 30 days
  - Monthly backup restore testing
  - Audit logs as secondary record

---

### Business Risks

**Risk: Regulatory Changes (FinTech laws)**

- **Probability:** Medium
- **Impact:** High (compliance costs, restrictions)
- **Mitigation:**
  - KYC/AML from day 1
  - Partner model (leverage Bitso/Circle licenses)
  - Legal counsel at $100k+ volume
  - Conservative transaction limits pre-KYC
  - Monitor regulatory landscape monthly

**Risk: Competition from Established Players**

- **Probability:** High
- **Impact:** Medium (price pressure)
- **Mitigation:**
  - Differentiate with wallet + NFC (not just remittances)
  - Network effects (more merchants = more value)
  - Superior mobile UX
  - Cashback/loyalty program
  - Community building (trust)

**Risk: Low User Adoption**

- **Probability:** Medium
- **Impact:** High (business viability)
- **Mitigation:**
  - Referral program ($10 bonus both sides)
  - Partner with community organizations
  - Localized marketing (Spanish language)
  - Superior onboarding UX (<3 minutes)
  - Educational content (how to use)
  - Influencer partnerships in Mexican communities

**Risk: High Cash-Out Rate (>70%)**

- **Probability:** Medium
- **Impact:** Medium (lower margins)
- **Mitigation:**
  - Incentivize in-wallet spending:
    - 0% fee for wallet payments
    - 1% fee for cash-out (disincentive)
    - Cashback on merchant payments
    - Exclusive merchant discounts
  - Recruit high-traffic merchants
  - Bill pay integration [v2]

---

### Financial Risks

**Risk: Exchange Rate Volatility (USDC/MXN)**

- **Probability:** High
- **Impact:** Low (user dissatisfaction)
- **Mitigation:**
  - Lock rate at transaction initiation (5-minute quote)
  - ±0.5% slippage tolerance
  - Auto-refresh quote if exceeded
  - Display rate clearly upfront
  - Small buffer in our pricing

**Risk: Insufficient Hot Wallet Liquidity**

- **Probability:** Low
- **Impact:** High (can't process transactions)
- **Mitigation:**
  - Maintain 20% of monthly volume in hot wallet
  - Auto-replenishment from cold wallet (daily check)
  - Daily transaction limits per user
  - Alert system at 30% capacity
  - Emergency top-up process (same-day)

**Risk: Fraud/Money Laundering**

- **Probability:** Medium
- **Impact:** High (regulatory, financial)
- **Mitigation:**
  - Transaction monitoring (velocity, patterns)
  - KYC verification required
  - Limits based on KYC tier
  - Flag suspicious activity for manual review
  - AML policy documented
  - User behavior scoring
  - Block/freeze account capability

---

## Timeline

### Phase 1: Foundation (Weeks 1-2)

**Week 1:**

- Day 1-2: Project setup (repos, deployment pipelines)
- Day 3-4: Database schema + migrations
- Day 5-7: Auth system (Supabase integration, JWT)

**Week 2:**

- Day 1-3: Stellar SDK integration, create hot/cold wallets (testnet)
- Day 4-5: Circle API sandbox setup
- Day 6-7: Basic wallet endpoints (balance, transactions)

**Deliverables:**

- User can register and login
- Backend can interact with Stellar testnet
- Hot wallet functional in testnet

---

### Phase 2: Core Features (Weeks 3-4)

**Week 3:**

- Day 1-2: Remittance send endpoint + logic
- Day 3-4: Internal balance tracking (custodial model)
- Day 5-7: P2P transfer functionality

**Week 4:**

- Day 1-3: Circle integration for USD→USDC (testnet)
- Day 4-5: Transaction history UI (web + mobile)
- Day 6-7: Testing and bug fixes

**Deliverables:**

- User A can send money to User B
- Balance updates correctly
- Transaction history visible

---

### Phase 3: Payments & NFC (Weeks 5-6)

**Week 5:**

- Day 1-2: Expo NFC setup (mobile)
- Day 3-4: Merchant app (generate NFC sessions)
- Day 5-7: Customer app (read NFC, confirm payment)

**Week 6:**

- Day 1-2: Backend payment processing endpoints
- Day 3-4: QR code payments (fallback)
- Day 5-6: Merchant dashboard (basic)
- Day 7: Testing end-to-end NFC flow

**Deliverables:**

- NFC payments working end-to-end
- Merchants can receive payments
- Customer can pay with tap

---

### Phase 4: Cash-Out & Polish (Weeks 7-8)

**Week 7:**

- Day 1-3: Bitso API integration
- Day 4-5: Cash-out flow (USDC→MXN→SPEI)
- Day 6-7: Status monitoring (webhooks, polling)

**Week 8:**

- Day 1-2: Security hardening (rate limiting, audit logs)
- Day 3-4: Monitoring setup (Sentry, Telegram alerts)
- Day 5-6: Final testing (load tests, E2E)
- Day 7: Beta launch preparation

**Deliverables:**

- Cash-out to bank working (7-10 min)
- All security measures in place
- Ready for 50 beta users

---

## Next Steps

### Immediate Actions (This Week)

**1. Setup Development Environment**

- Create GitHub organization and repos
- Setup Railway/Fly.io accounts
- Configure Supabase project
- Setup CI/CD with GitHub Actions
- **Owner:** Tech Lead
- **Timeline:** 2 days

**2. Apply to External Services**

- Circle Business account application
- Bitso Business contact/application
- Setup Twilio account (SMS OTP)
- Setup SendGrid account (emails)
- **Owner:** Founder
- **Timeline:** 3 days (applications), 2-4 weeks (approval)

**3. Legal & Compliance Setup**

- Register business entity (LLC/Inc)
- Open business bank account (USA)
- Draft Terms of Service
- Draft Privacy Policy
- Consult FinTech lawyer (initial call)
- **Owner:** Founder
- **Timeline:** 1-2 weeks

**4. Design & Branding**

- Finalize app name
- Design logo and branding
- Create Figma designs for key screens:
  - Onboarding flow
  - Send money flow
  - NFC payment flow
  - Wallet dashboard
- **Owner:** Designer (or Founder if solo)
- **Timeline:** 1 week

---

### Week 1 Development Tasks

**Backend:**

- [ ] Initialize FastAPI project structure
- [ ] Setup Supabase connection
- [ ] Create database schema (users, wallets, transactions)
- [ ] Implement user registration endpoint
- [ ] Implement login endpoint
- [ ] Implement JWT authentication
- [ ] Setup Redis for sessions
- [ ] Write unit tests for auth endpoints

**Frontend (Web):**

- [ ] Initialize React + Vite project
- [ ] Setup Tailwind CSS + shadcn/ui
- [ ] Create authentication screens (login, register)
- [ ] Implement auth state management (Zustand)
- [ ] Setup React Query for API calls
- [ ] Create protected route wrapper

**Frontend (Mobile):**

- [ ] Initialize React Native + Expo project
- [ ] Setup NativeWind
- [ ] Create authentication screens
- [ ] Implement auth flow
- [ ] Test on iOS and Android simulators

**DevOps:**

- [ ] Setup GitHub Actions CI/CD
- [ ] Deploy backend to Railway (staging)
- [ ] Deploy web app to Vercel (staging)
- [ ] Configure environment variables
- [ ] Setup Sentry error tracking

---

**Document Control:**

- **Last Updated:** October 15, 2025
- **Next Review:** October 22, 2025 (weekly during development)
- **Owner:** Product Team
- **Stakeholders:** Founder, Tech Lead, Design Lead
