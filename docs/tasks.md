# TASK MANAGEMENT - WANI REMITTANCE PLATFORM

## UPDATE RULES

1. Mark [x] when complete with format: `[x] [YYYY-MM-DD HH:MM]`
2. Never delete tasks, move to COMPLETED section
3. Add newly discovered tasks to current sprint
4. Use priority levels: P0 (Critical/Blocker), P1 (Core Feature), P2 (Enhancement)
5. Each task should be completable in 15-60 minutes
6. Include files to modify and acceptance criteria

## PROJECT OVERVIEW

**MVP Timeline:** 8 weeks to beta launch (50 users)
**Tech Stack:** FastAPI + React/React Native + PostgreSQL (Supabase) + Stellar
**Core Features:** Remittances, Wallet, NFC Payments, Cash-out, Merchant Dashboard

---

SPRINT 1: Foundation & Authentication
Start Date: 2025-10-16
Sprint Goal: Setup project infrastructure, authentication system, and basic wallet structure
🎭 PERSONAS IDENTIFICADAS
Persona 1: Developer

Rol: Desarrollador del equipo
Necesidad: Infraestructura confiable para construir features
Pain point: Setup manual repetitivo y propenso a errores

Persona 2: DevOps Engineer

Rol: Responsable de infraestructura
Necesidad: Sistema monitoreable y mantenible
Pain point: Falta de estandarización en configuración

🗺️ JOURNEY MAP
Developer Journey:

Clona repositorio → 2. Configura ambiente → 3. Instala dependencias → 4. Conecta servicios → 5. Valida setup → 6. Comienza desarrollo

DevOps Journey:

Define arquitectura → 2. Configura servicios → 3. Establece monitoreo → 4. Define CI/CD → 5. Documenta procesos

📋 USER STORIES COMPLETADAS
ÉPICA: Project Setup & Infrastructure

[x]US-001: Setup FastAPI Structure
Como Developer, quiero una estructura de proyecto FastAPI estandarizada, para comenzar el desarrollo sin configuración manual.
Criterios de Aceptación:

DADO que clono el repositorio
CUANDO navego a backend/
ENTONCES encuentro estructura app/ con main.py configurado
Y el endpoint /health responde 200 OK
Y CORS está configurado correctamente

Tasks Técnicas:

Backend: Crear estructura backend/app/
Backend: Configurar FastAPI app con CORS
Backend: Implementar endpoint /health

DoD:

Health endpoint probado y funcionando
CORS permite requests del frontend
Estructura de carpetas documentada

Story Points: 1
Prioridad: P0
Status: ✅ COMPLETADO [2025-10-16 14:30]

[ ] US-002: Database Connection Setup
Como Developer, quiero conexión configurada con Supabase, para persistir datos sin configuración manual.
Criterios de Aceptación:

DADO que tengo las credenciales de Supabase
CUANDO inicio la aplicación
ENTONCES se establece pool de conexiones (20)
Y puedo realizar queries a la base de datos
Y las credenciales están en variables de entorno

Tasks Técnicas:

Backend: Instalar asyncpg y supabase-py
Backend: Crear database.py con connection pool
Backend: Configurar variables de entorno

DoD:

Conexión a Supabase exitosa
Pool de conexiones configurado
.env.example creado con variables necesarias

Story Points: 2
Prioridad: P0
Status: ✅ COMPLETADO [2025-10-16 14:45]

[ ] US-003: Dependencies Management
Como Developer, quiero un archivo requirements.txt completo, para instalar todas las dependencias con un comando.
Criterios de Aceptación:

DADO que clono el proyecto
CUANDO ejecuto pip install -r requirements.txt
ENTONCES se instalan todas las dependencias necesarias
Y las versiones están fijadas para consistencia

Tasks Técnicas:

Backend: Crear requirements.txt con todas las dependencias
Backend: Especificar versiones exactas
Backend: Incluir dependencias de testing

DoD:

Todas las dependencias core incluidas
Versiones específicas definidas
Instalación probada en ambiente limpio

Story Points: 1
Prioridad: P0
Status: ✅ COMPLETADO [2025-10-16 14:15]

[ ] US-004: Environment Configuration
Como DevOps Engineer, quiero configuración centralizada con validación, para evitar errores por variables faltantes.
Criterios de Aceptación:

DADO que configuro el ambiente
CUANDO faltan variables requeridas
ENTONCES la aplicación falla con mensaje claro
Y todas las configuraciones vienen de un lugar centralizado

Tasks Técnicas:

Backend: Crear settings class con pydantic-settings
Backend: Implementar carga desde .env
Backend: Agregar validación de variables requeridas

DoD:

Settings carga correctamente desde .env
Validación de variables requeridas funciona
.env.example actualizado

Story Points: 1
Prioridad: P0
Status: ✅ COMPLETADO [2025-10-16 15:00]

[ ] US-005: Logging System
Como DevOps Engineer, quiero sistema de logging estructurado, para debuggear y monitorear la aplicación.
Criterios de Aceptación:

DADO que la aplicación está corriendo
CUANDO ocurre un evento o error
ENTONCES se registra en formato estructurado
Y aparece en consola y archivo según el nivel

Tasks Técnicas:

Backend: Configurar Python logging
Backend: Implementar file y console handlers
Backend: Configurar niveles por ambiente

DoD:

Logs aparecen en consola y archivo
Formato estructurado implementado
Niveles configurables por ambiente

Story Points: 1
Prioridad: P1
Status: ✅ COMPLETADO [2025-10-16 15:15]

[ ] US-006: Error Handling Middleware
Como Developer, quiero manejo consistente de errores, para debugging eficiente y respuestas estandarizadas.
Criterios de Aceptación:

DADO que ocurre un error en la aplicación
CUANDO el cliente recibe la respuesta
ENTONCES viene en formato estándar con request ID
Y el error se loguea apropiadamente

Tasks Técnicas:

Backend: Crear global exception handler
Backend: Implementar formato estándar de error
Backend: Agregar request ID tracking

DoD:

Errores retornan formato consistente
Request ID incluido en respuestas
Todos los tipos de error manejados

Story Points: 1
Prioridad: P1
Status: ✅ COMPLETADO [2025-10-16 15:30]

#### Day 2: Database Schema & Models

- [ ] [P0] Create SQLAlchemy models for users table

  - Define User model with all fields (id, email, phone, KYC data)
  - Add indexes on email and phone
  - Include timestamps (created_at, updated_at)
  - Test: Model creates correct table structure
  - Files: backend/app/models/user.py, backend/app/models/**init**.py
  - Est: 45 min

- [ ] [P0] Create wallet model with balance tracking

  - Define Wallet model (balance_usdc, balance_mxn, locked_balance)
  - Add foreign key relationship to User
  - Include transaction counters
  - Test: One-to-one relationship works
  - Files: backend/app/models/wallet.py
  - Est: 30 min

- [ ] [P0] Create transaction model for history

  - Define Transaction model with all fields
  - Add indexes for query optimization
  - Include enum for transaction types and status
  - Test: Can create and query transactions
  - Files: backend/app/models/transaction.py
  - Est: 45 min

- [ ] [P0] Setup Alembic for database migrations

  - Initialize Alembic configuration
  - Create initial migration for all models
  - Test migration on local database
  - Test: Tables created in Supabase
  - Files: backend/alembic.ini, backend/alembic/env.py
  - Est: 30 min

- [ ] [P1] Create audit_logs model for compliance
  - Define AuditLog model for tracking changes
  - Add indexes for user_id and timestamp
  - Include IP address and user agent tracking
  - Test: Audit entries created correctly
  - Files: backend/app/models/audit_log.py
  - Est: 30 min

#### Day 3-4: Authentication System

- [ ] [P0] Implement user registration endpoint

  - Create POST /api/v1/auth/register endpoint
  - Add Pydantic schema for validation
  - Hash passwords with bcrypt (12 rounds)
  - Create user and wallet in transaction
  - Test: User can register successfully
  - Files: backend/app/api/routes/auth.py, backend/app/schemas/user.py
  - Est: 60 min

- [ ] [P0] Implement JWT token generation

  - Create token generation utilities
  - Implement access and refresh tokens
  - Set proper expiration times (24h access, 30d refresh)
  - Test: Valid JWT tokens generated
  - Files: backend/app/core/security.py
  - Est: 45 min

- [ ] [P0] Implement login endpoint with JWT

  - Create POST /api/v1/auth/login endpoint
  - Verify email/password credentials
  - Return JWT tokens on success
  - Test: User can login and receive tokens
  - Files: backend/app/api/routes/auth.py
  - Est: 45 min

- [ ] [P0] Create authentication dependency for protected routes

  - Implement get_current_user dependency
  - Verify JWT token validity
  - Extract user from token
  - Test: Protected routes require valid token
  - Files: backend/app/api/deps.py
  - Est: 30 min

- [ ] [P1] Implement refresh token endpoint

  - Create POST /api/v1/auth/refresh endpoint
  - Validate refresh token
  - Issue new access token
  - Implement token rotation
  - Test: Can refresh expired access token
  - Files: backend/app/api/routes/auth.py
  - Est: 30 min

- [ ] [P1] Add phone verification with OTP

  - Integrate Twilio for SMS
  - Generate and store OTP (6 digits, 10 min expiry)
  - Create verification endpoint
  - Test: OTP sent and verified correctly
  - Files: backend/app/integrations/twilio.py, backend/app/api/routes/auth.py
  - Est: 60 min

- [ ] [P1] Implement password reset flow

  - Create forgot password endpoint
  - Generate reset token and send email
  - Create reset password endpoint
  - Test: Password reset works end-to-end
  - Files: backend/app/api/routes/auth.py, backend/app/integrations/sendgrid.py
  - Est: 45 min

- [ ] [P2] Add rate limiting to auth endpoints
  - Implement rate limiter with Redis
  - Apply to login (5 attempts/15 min)
  - Apply to registration (10/hour)
  - Test: Rate limiting blocks excessive requests
  - Files: backend/app/middleware/rate_limit.py
  - Est: 30 min

### Frontend Web - Initial Setup

#### Day 5: React Project Setup

- [ ] [P0] Initialize React project with Vite and TypeScript

  - Create frontend-web/ directory
  - Setup Vite config with proper plugins
  - Configure TypeScript with strict mode
  - Test: Dev server runs on port 5173
  - Files: frontend-web/vite.config.ts, frontend-web/tsconfig.json
  - Est: 30 min

- [ ] [P0] Setup Tailwind CSS and shadcn/ui

  - Install and configure Tailwind
  - Setup shadcn/ui components library
  - Configure global styles
  - Test: Tailwind classes work
  - Files: frontend-web/tailwind.config.js, frontend-web/src/styles/global.css
  - Est: 30 min

- [ ] [P0] Configure React Router for navigation

  - Setup router with protected routes
  - Create route definitions
  - Add navigation guards
  - Test: Routing works correctly
  - Files: frontend-web/src/routes/index.tsx
  - Est: 30 min

- [ ] [P1] Setup TanStack Query for API calls

  - Configure query client
  - Setup default options
  - Add error handling
  - Test: Query client initialized
  - Files: frontend-web/src/core/api/queryClient.ts
  - Est: 20 min

- [ ] [P1] Create API client with Axios

  - Setup base configuration
  - Add request/response interceptors
  - Handle authentication headers
  - Test: API calls work correctly
  - Files: frontend-web/src/core/api/client.ts
  - Est: 30 min

- [ ] [P1] Setup Zustand for state management
  - Create auth store
  - Create wallet store structure
  - Setup persistence
  - Test: State persists across refresh
  - Files: frontend-web/src/core/store/authStore.ts
  - Est: 30 min

#### Day 6: Authentication UI

- [ ] [P0] Create login page with form

  - Build login form component
  - Add email/password validation
  - Integrate with auth API
  - Handle errors and loading states
  - Test: User can login successfully
  - Files: frontend-web/src/features/auth/components/LoginForm.tsx
  - Est: 60 min

- [ ] [P0] Create registration page

  - Build multi-step registration form
  - Add client-side validation
  - Integrate with registration API
  - Test: User can register account
  - Files: frontend-web/src/features/auth/components/RegisterForm.tsx
  - Est: 60 min

- [ ] [P1] Implement protected route wrapper

  - Create PrivateRoute component
  - Check authentication status
  - Redirect to login if needed
  - Test: Unauthenticated users redirected
  - Files: frontend-web/src/shared/components/PrivateRoute.tsx
  - Est: 30 min

- [ ] [P1] Create app layout with navigation

  - Build main layout component
  - Add navigation menu
  - Include logout functionality
  - Test: Navigation works correctly
  - Files: frontend-web/src/shared/layouts/AppLayout.tsx
  - Est: 45 min

- [ ] [P2] Add loading and error components
  - Create reusable loading spinner
  - Build error boundary component
  - Add toast notifications
  - Test: Components display correctly
  - Files: frontend-web/src/shared/components/Loading.tsx
  - Est: 30 min

### Frontend Mobile - Initial Setup

#### Day 7: React Native Setup

- [ ] [P0] Initialize Expo project with TypeScript

  - Create frontend-mobile/ directory
  - Setup Expo SDK 50
  - Configure TypeScript
  - Test: Expo starts successfully
  - Files: frontend-mobile/app.json, frontend-mobile/tsconfig.json
  - Est: 30 min

- [ ] [P0] Setup Expo Router for navigation

  - Configure file-based routing
  - Create initial route structure
  - Setup navigation types
  - Test: Navigation works
  - Files: frontend-mobile/app/\_layout.tsx
  - Est: 30 min

- [ ] [P1] Configure NativeWind for styling

  - Install and setup NativeWind
  - Configure with Tailwind classes
  - Test styling works
  - Test: Styles apply correctly
  - Files: frontend-mobile/tailwind.config.js
  - Est: 30 min

- [ ] [P1] Setup API client for mobile

  - Configure Axios for React Native
  - Handle auth token storage
  - Setup error handling
  - Test: API calls work
  - Files: frontend-mobile/services/api.ts
  - Est: 30 min

- [ ] [P1] Create authentication screens
  - Build login screen
  - Build registration screen
  - Add form validation
  - Test: Auth flow works
  - Files: frontend-mobile/app/(auth)/login.tsx
  - Est: 60 min

---

## SPRINT 2: Wallet Core & Remittance Flow (Week 3-4)

**Goal:** Implement wallet operations, balance tracking, and remittance sending
**Story Points:** 0/55

### Backend - Wallet Operations

#### Week 3, Day 1-2: Wallet Services

- [ ] [P0] Create wallet service for balance operations

  - Implement get_balance method
  - Add balance update logic
  - Include transaction atomicity
  - Test: Balance queries work correctly
  - Files: backend/app/services/wallet_service.py
  - Est: 45 min

- [ ] [P0] Implement internal transfer logic (P2P)

  - Create transfer_internal method
  - Validate sender has sufficient balance
  - Update both wallets atomically
  - Create transaction record
  - Test: P2P transfers work correctly
  - Files: backend/app/services/wallet_service.py
  - Est: 60 min

- [ ] [P0] Create transaction history endpoint

  - Implement GET /api/v1/wallet/transactions
  - Add pagination support
  - Include filtering by type/status
  - Test: Returns paginated transaction list
  - Files: backend/app/api/routes/wallet.py
  - Est: 45 min

- [ ] [P0] Add balance endpoint with real-time data

  - Create GET /api/v1/wallet/balance
  - Include USDC and MXN equivalent
  - Cache exchange rate (30s TTL)
  - Test: Returns current balance
  - Files: backend/app/api/routes/wallet.py
  - Est: 30 min

- [ ] [P1] Implement wallet locking mechanism

  - Add pessimistic locking for transfers
  - Prevent race conditions
  - Include timeout handling
  - Test: Concurrent transfers handled safely
  - Files: backend/app/services/wallet_service.py
  - Est: 45 min

- [ ] [P1] Create transaction detail endpoint
  - Implement GET /api/v1/wallet/transactions/:id
  - Include related user info
  - Add receipt generation
  - Test: Returns complete transaction details
  - Files: backend/app/api/routes/wallet.py
  - Est: 30 min

### Backend - Stellar Integration

#### Week 3, Day 3-4: Blockchain Setup

- [ ] [P0] Setup Stellar SDK integration

  - Initialize Stellar client
  - Configure for testnet
  - Create wrapper service
  - Test: Can connect to Horizon
  - Files: backend/app/core/stellar.py
  - Est: 45 min

- [ ] [P0] Create hot wallet on Stellar testnet

  - Generate keypair for hot wallet
  - Fund with testnet friendbot
  - Store keys securely in env
  - Test: Wallet exists on network
  - Files: backend/scripts/setup_stellar_wallets.py
  - Est: 30 min

- [ ] [P0] Setup USDC trustline for hot wallet

  - Add trustline to USDC asset
  - Configure issuer address
  - Test trustline establishment
  - Test: Can hold USDC
  - Files: backend/app/core/stellar.py
  - Est: 30 min

- [ ] [P1] Implement Stellar transaction builder

  - Create payment transaction method
  - Add memo support for tracking
  - Include fee calculation
  - Test: Can build valid transactions
  - Files: backend/app/integrations/stellar_service.py
  - Est: 45 min

- [ ] [P1] Add Stellar transaction monitoring

  - Implement webhook listener
  - Update internal balances on confirmations
  - Handle failed transactions
  - Test: Transactions tracked correctly
  - Files: backend/app/tasks/stellar_monitor.py
  - Est: 60 min

- [ ] [P2] Create cold wallet management
  - Setup cold wallet keypair
  - Implement hot wallet replenishment
  - Add balance threshold alerts
  - Test: Replenishment triggers correctly
  - Files: backend/app/services/hot_wallet_service.py
  - Est: 45 min

### Backend - Remittance Flow

#### Week 3, Day 5 & Week 4, Day 1: Send Money

- [ ] [P0] Create remittance send endpoint

  - Implement POST /api/v1/remittance/send
  - Validate recipient exists
  - Calculate fees (2% standard)
  - Test: Remittance initiated successfully
  - Files: backend/app/api/routes/remittance.py
  - Est: 60 min

- [ ] [P0] Implement remittance processing service

  - Create RemittanceService class
  - Handle USD to USDC conversion logic
  - Update recipient wallet immediately
  - Test: Money credited to recipient
  - Files: backend/app/services/remittance_service.py
  - Est: 60 min

- [ ] [P0] Add ACH payment initiation (mock for MVP)

  - Create mock ACH service
  - Simulate bank transfer initiation
  - Queue for background processing
  - Test: ACH marked as pending
  - Files: backend/app/integrations/ach_mock.py
  - Est: 45 min

- [ ] [P1] Create remittance quote endpoint

  - Implement GET /api/v1/remittance/quote
  - Calculate fees and exchange rate
  - Lock rate for 5 minutes
  - Test: Returns accurate quote
  - Files: backend/app/api/routes/remittance.py
  - Est: 30 min

- [ ] [P1] Add recipient management

  - Create recipient CRUD endpoints
  - Store favorite recipients
  - Validate recipient details
  - Test: Can save/retrieve recipients
  - Files: backend/app/api/routes/recipients.py
  - Est: 45 min

- [ ] [P1] Implement remittance status tracking
  - Add status update logic
  - Create status history
  - Send notifications on changes
  - Test: Status updates tracked
  - Files: backend/app/services/remittance_service.py
  - Est: 30 min

### Frontend Web - Wallet Features

#### Week 4, Day 2-3: Wallet UI

- [ ] [P0] Create wallet dashboard page

  - Build balance display component
  - Show USDC and MXN amounts
  - Add quick actions menu
  - Test: Dashboard loads correctly
  - Files: frontend-web/src/features/wallet/pages/Dashboard.tsx
  - Est: 60 min

- [ ] [P0] Implement transaction list component

  - Build transaction card component
  - Add infinite scroll pagination
  - Include transaction type icons
  - Test: Transactions display correctly
  - Files: frontend-web/src/features/wallet/components/TransactionList.tsx
  - Est: 45 min

- [ ] [P0] Create send money form

  - Build multi-step form
  - Add recipient search/select
  - Show fee calculation
  - Test: Can initiate transfer
  - Files: frontend-web/src/features/remittance/components/SendMoneyForm.tsx
  - Est: 60 min

- [ ] [P1] Add transaction detail modal

  - Show complete transaction info
  - Include status timeline
  - Add receipt download
  - Test: Details display correctly
  - Files: frontend-web/src/features/wallet/components/TransactionDetail.tsx
  - Est: 30 min

- [ ] [P1] Implement real-time balance updates

  - Setup WebSocket connection
  - Listen for balance changes
  - Update UI automatically
  - Test: Balance updates live
  - Files: frontend-web/src/features/wallet/hooks/useRealtimeBalance.ts
  - Est: 45 min

- [ ] [P2] Create transaction filters
  - Add date range picker
  - Filter by type and status
  - Include search functionality
  - Test: Filters work correctly
  - Files: frontend-web/src/features/wallet/components/TransactionFilters.tsx
  - Est: 30 min

### Circle API Integration (Week 4, Day 4)

- [ ] [P0] Setup Circle API client

  - Configure sandbox credentials
  - Create service wrapper
  - Add error handling
  - Test: Can connect to Circle
  - Files: backend/app/integrations/circle.py
  - Est: 45 min

- [ ] [P0] Implement USD to USDC conversion

  - Create conversion method
  - Handle Circle API responses
  - Update wallet balance
  - Test: Conversion works in sandbox
  - Files: backend/app/services/circle_service.py
  - Est: 60 min

- [ ] [P1] Add Circle webhook handler
  - Setup webhook endpoint
  - Verify webhook signatures
  - Process payment confirmations
  - Test: Webhooks processed correctly
  - Files: backend/app/api/routes/webhooks.py
  - Est: 45 min

---

## SPRINT 3: NFC & QR Payments (Week 5-6)

**Goal:** Implement merchant payments via NFC and QR codes
**Story Points:** 0/50

### Backend - Payment Infrastructure

#### Week 5, Day 1-2: Payment Processing

- [ ] [P0] Create payment session model

  - Define PaymentSession schema
  - Add expiration logic (5 min)
  - Include merchant association
  - Test: Sessions created correctly
  - Files: backend/app/models/payment_session.py
  - Est: 30 min

- [ ] [P0] Implement NFC session creation endpoint

  - Create POST /api/v1/payments/nfc/create-session
  - Generate unique session ID
  - Store session in Redis
  - Test: Merchant can create session
  - Files: backend/app/api/routes/payments.py
  - Est: 45 min

- [ ] [P0] Create NFC payment confirmation endpoint

  - Implement POST /api/v1/payments/nfc/confirm
  - Validate session exists and not expired
  - Process payment atomically
  - Test: Payment completes successfully
  - Files: backend/app/api/routes/payments.py
  - Est: 60 min

- [ ] [P0] Add payment processing service

  - Create PaymentService class
  - Handle balance checks
  - Apply merchant fees (1%)
  - Create transaction records
  - Test: Payments processed correctly
  - Files: backend/app/services/payment_service.py
  - Est: 60 min

- [ ] [P1] Implement QR code generation

  - Create QR generation endpoint
  - Encode payment data
  - Return base64 image
  - Test: Valid QR codes generated
  - Files: backend/app/api/routes/payments.py
  - Est: 30 min

- [ ] [P1] Add PIN verification for large payments

  - Implement PIN check for >$50
  - Rate limit PIN attempts
  - Lock after failures
  - Test: PIN required and verified
  - Files: backend/app/services/payment_service.py
  - Est: 45 min

- [ ] [P2] Create payment receipt generation
  - Generate PDF receipts
  - Include all transaction details
  - Send via email
  - Test: Receipts generated correctly
  - Files: backend/app/services/receipt_service.py
  - Est: 45 min

### Backend - Merchant Features

#### Week 5, Day 3-4: Merchant Dashboard

- [ ] [P0] Create merchant model and registration

  - Define Merchant schema
  - Add business validation
  - Create registration endpoint
  - Test: Merchants can register
  - Files: backend/app/models/merchant.py
  - Est: 45 min

- [ ] [P0] Implement merchant dashboard endpoint

  - Create GET /api/v1/merchants/dashboard
  - Return today's sales summary
  - Include pending settlements
  - Test: Dashboard data returned
  - Files: backend/app/api/routes/merchants.py
  - Est: 45 min

- [ ] [P1] Add merchant sales history

  - Create sales endpoint with pagination
  - Include filtering options
  - Calculate totals
  - Test: Sales history accurate
  - Files: backend/app/api/routes/merchants.py
  - Est: 30 min

- [ ] [P1] Implement merchant settlement

  - Create cash-out for merchants
  - Batch daily transactions
  - Process to bank account
  - Test: Settlements process correctly
  - Files: backend/app/services/merchant_service.py
  - Est: 60 min

- [ ] [P2] Add merchant analytics
  - Calculate daily/weekly/monthly stats
  - Identify peak hours
  - Track customer frequency
  - Test: Analytics accurate
  - Files: backend/app/services/analytics_service.py
  - Est: 45 min

### Frontend Mobile - NFC Implementation

#### Week 5, Day 5 & Week 6, Day 1: NFC Payments

- [ ] [P0] Setup NFC capabilities in Expo

  - Configure expo-nfc module
  - Add iOS entitlements
  - Setup Android manifest
  - Test: NFC permissions granted
  - Files: frontend-mobile/app.json
  - Est: 45 min

- [ ] [P0] Create NFC payment screen (Customer)

  - Build NFC reader component
  - Handle NFC tag detection
  - Parse session data
  - Test: Can read NFC tags
  - Files: frontend-mobile/app/(tabs)/payments.tsx
  - Est: 60 min

- [ ] [P0] Implement payment confirmation flow

  - Show payment details
  - Add PIN input for >$50
  - Handle confirmation
  - Test: Payments complete
  - Files: frontend-mobile/components/payments/PaymentConfirm.tsx
  - Est: 45 min

- [ ] [P1] Create merchant NFC generation screen

  - Build amount input
  - Generate NFC session
  - Show NFC write screen
  - Test: Merchant can create sessions
  - Files: frontend-mobile/app/merchant/generate-nfc.tsx
  - Est: 45 min

- [ ] [P1] Add QR code scanner

  - Implement camera scanner
  - Parse QR data
  - Fallback for no NFC
  - Test: QR payments work
  - Files: frontend-mobile/components/payments/QRScanner.tsx
  - Est: 45 min

- [ ] [P2] Implement payment success animations
  - Add success feedback
  - Include haptic feedback
  - Show receipt option
  - Test: Good user experience
  - Files: frontend-mobile/components/payments/PaymentSuccess.tsx
  - Est: 30 min

### Frontend Web - Merchant Dashboard

#### Week 6, Day 2-3: Merchant Interface

- [ ] [P0] Create merchant dashboard page

  - Build sales summary cards
  - Show today's transactions
  - Add quick actions
  - Test: Dashboard displays correctly
  - Files: frontend-web/src/features/merchant/pages/Dashboard.tsx
  - Est: 60 min

- [ ] [P0] Implement QR code generator

  - Build QR generation form
  - Display QR code
  - Add print functionality
  - Test: QR codes generated
  - Files: frontend-web/src/features/merchant/components/GenerateQR.tsx
  - Est: 45 min

- [ ] [P1] Create sales report page

  - Build data table
  - Add export to CSV
  - Include date filters
  - Test: Reports accurate
  - Files: frontend-web/src/features/merchant/pages/SalesReport.tsx
  - Est: 45 min

- [ ] [P1] Add real-time payment notifications

  - Setup WebSocket for merchants
  - Show toast on payment
  - Update dashboard live
  - Test: Notifications work
  - Files: frontend-web/src/features/merchant/hooks/usePaymentNotifications.ts
  - Est: 30 min

- [ ] [P2] Implement sales analytics charts
  - Add daily sales chart
  - Show peak hours graph
  - Include comparison view
  - Test: Charts display correctly
  - Files: frontend-web/src/features/merchant/components/SalesCharts.tsx
  - Est: 45 min

---

## SPRINT 4: Cash-Out Integration (Week 7)

**Goal:** Enable withdrawal to Mexican banks via Bitso + SPEI
**Story Points:** 0/35

### Backend - Bitso Integration

#### Week 7, Day 1-2: Bitso Setup

- [ ] [P0] Setup Bitso API client

  - Configure API credentials
  - Create service wrapper
  - Handle authentication
  - Test: Can connect to Bitso
  - Files: backend/app/integrations/bitso.py
  - Est: 45 min

- [ ] [P0] Implement USDC to MXN conversion

  - Create conversion method
  - Get current exchange rate
  - Handle Bitso responses
  - Test: Conversion rate accurate
  - Files: backend/app/services/bitso_service.py
  - Est: 60 min

- [ ] [P0] Create cash-out request model

  - Define CashoutRequest schema
  - Add status tracking
  - Include bank details
  - Test: Model works correctly
  - Files: backend/app/models/cashout.py
  - Est: 30 min

- [ ] [P0] Implement cash-out endpoint
  - Create POST /api/v1/cashout/request
  - Validate bank account
  - Calculate fees (0.5%)
  - Test: Cash-out initiated
  - Files: backend/app/api/routes/cashout.py
  - Est: 60 min

### Backend - SPEI Processing

#### Week 7, Day 3-4: Bank Integration

- [ ] [P0] Implement SPEI transfer via Bitso

  - Create SPEI transfer method
  - Include CLABE validation
  - Handle transfer responses
  - Test: SPEI transfers work
  - Files: backend/app/services/spei_service.py
  - Est: 60 min

- [ ] [P0] Add cash-out status monitoring

  - Create background task
  - Poll Bitso for status
  - Update request status
  - Test: Status updates correctly
  - Files: backend/app/tasks/cashout_monitor.py
  - Est: 45 min

- [ ] [P1] Create bank account management

  - Add bank account CRUD
  - Validate CLABE format
  - Store encrypted
  - Test: Accounts managed safely
  - Files: backend/app/api/routes/bank_accounts.py
  - Est: 45 min

- [ ] [P1] Implement cash-out webhooks

  - Handle Bitso webhooks
  - Update transaction status
  - Send user notifications
  - Test: Webhooks processed
  - Files: backend/app/api/routes/webhooks.py
  - Est: 30 min

- [ ] [P2] Add cash-out limits and validation
  - Implement daily/monthly limits
  - Check KYC status
  - Validate sufficient balance
  - Test: Limits enforced
  - Files: backend/app/services/cashout_service.py
  - Est: 30 min

### Frontend - Cash-Out Features

#### Week 7, Day 5: Cash-Out UI

- [ ] [P0] Create bank account management page

  - Build account form
  - List saved accounts
  - Add delete functionality
  - Test: Accounts managed
  - Files: frontend-web/src/features/cashout/pages/BankAccounts.tsx
  - Est: 45 min

- [ ] [P0] Implement cash-out form

  - Build withdrawal form
  - Show fee calculation
  - Display MXN amount
  - Test: Cash-out requested
  - Files: frontend-web/src/features/cashout/components/WithdrawForm.tsx
  - Est: 45 min

- [ ] [P1] Add cash-out status tracker

  - Show progress steps
  - Update in real-time
  - Include time estimates
  - Test: Status displays correctly
  - Files: frontend-web/src/features/cashout/components/WithdrawStatus.tsx
  - Est: 30 min

- [ ] [P1] Create cash-out history page
  - List past withdrawals
  - Show status for each
  - Include filters
  - Test: History accurate
  - Files: frontend-web/src/features/cashout/pages/History.tsx
  - Est: 30 min

---

## SPRINT 5: Security & Testing (Week 8)

**Goal:** Security hardening, comprehensive testing, and production readiness
**Story Points:** 0/40

### Security Implementation

#### Week 8, Day 1-2: Security Hardening

- [ ] [P0] Implement comprehensive input validation

  - Add Pydantic validators for all endpoints
  - Sanitize user inputs
  - Prevent injection attacks
  - Test: Invalid inputs rejected
  - Files: backend/app/schemas/\*.py
  - Est: 60 min

- [ ] [P0] Add rate limiting to all endpoints

  - Configure per-endpoint limits
  - Implement IP-based limiting
  - Add user-based limits
  - Test: Rate limits enforced
  - Files: backend/app/middleware/rate_limit.py
  - Est: 45 min

- [ ] [P0] Setup audit logging for financial transactions

  - Log all money movements
  - Include user context
  - Add IP tracking
  - Test: Audit trail complete
  - Files: backend/app/services/audit_service.py
  - Est: 45 min

- [ ] [P0] Implement fraud detection rules

  - Add velocity checks
  - Monitor unusual patterns
  - Flag suspicious activity
  - Test: Fraud rules trigger
  - Files: backend/app/services/fraud_service.py
  - Est: 60 min

- [ ] [P1] Add 2FA support (SMS)

  - Implement 2FA enrollment
  - Add verification on sensitive operations
  - Include backup codes
  - Test: 2FA works correctly
  - Files: backend/app/services/two_factor_service.py
  - Est: 45 min

- [ ] [P1] Secure hot wallet management
  - Implement key rotation schedule
  - Add multi-sig for large transfers
  - Monitor balance thresholds
  - Test: Wallet secured
  - Files: backend/app/services/hot_wallet_service.py
  - Est: 45 min

### Testing & Quality Assurance

#### Week 8, Day 3-4: Comprehensive Testing

- [ ] [P0] Write unit tests for wallet service

  - Test balance operations
  - Test transfer logic
  - Test error cases
  - Coverage: >80%
  - Files: backend/tests/test_services/test_wallet_service.py
  - Est: 60 min

- [ ] [P0] Write integration tests for remittance flow

  - Test end-to-end flow
  - Include ACH simulation
  - Test status updates
  - Coverage: Critical paths
  - Files: backend/tests/test_integration/test_remittance.py
  - Est: 60 min

- [ ] [P0] Write API tests for all endpoints

  - Test authentication required
  - Test validation works
  - Test error responses
  - Coverage: All endpoints
  - Files: backend/tests/test_api/\*.py
  - Est: 60 min

- [ ] [P1] Implement load testing

  - Create k6 test scripts
  - Test 100 concurrent users
  - Verify <200ms p95 latency
  - Test: Performance acceptable
  - Files: tests/load/api_load.js
  - Est: 45 min

- [ ] [P1] Write E2E tests for critical flows

  - Test send money flow
  - Test NFC payment flow
  - Test cash-out flow
  - Coverage: Happy paths
  - Files: frontend-web/tests/e2e/\*.spec.ts
  - Est: 60 min

- [ ] [P2] Add frontend unit tests
  - Test key components
  - Test hooks logic
  - Test utilities
  - Coverage: >70%
  - Files: frontend-web/tests/unit/\*.test.tsx
  - Est: 45 min

### Monitoring & Deployment

#### Week 8, Day 5: Production Setup

- [ ] [P0] Setup Sentry error tracking

  - Configure for all environments
  - Add context capture
  - Setup alerts
  - Test: Errors tracked
  - Files: All main entry points
  - Est: 30 min

- [ ] [P0] Configure production environment variables

  - Setup Railway/Fly.io secrets
  - Configure Vercel env vars
  - Document all variables
  - Test: Deploys work
  - Files: Deployment configs
  - Est: 30 min

- [ ] [P0] Setup CI/CD pipeline

  - Configure GitHub Actions
  - Add test automation
  - Setup auto-deploy
  - Test: Pipeline works
  - Files: .github/workflows/ci.yml
  - Est: 45 min

- [ ] [P1] Implement health monitoring

  - Add health check endpoints
  - Setup uptime monitoring
  - Configure alerts
  - Test: Monitoring active
  - Files: backend/app/api/routes/health.py
  - Est: 30 min

- [ ] [P1] Create backup and recovery procedures

  - Setup database backups
  - Document recovery steps
  - Test restore process
  - Test: Backups work
  - Files: scripts/backup.sh
  - Est: 45 min

- [ ] [P2] Setup Telegram alerts
  - Configure bot
  - Add critical alerts
  - Include daily summaries
  - Test: Alerts received
  - Files: backend/app/integrations/telegram.py
  - Est: 30 min

---

## BACKLOG - Post-MVP Features

### High Priority (v2.0)

- [ ] [P1] Plaid integration for automatic ACH
- [ ] [P1] Instant remittance via debit card (3.5% fee)
- [ ] [P1] Biometric authentication (Face ID/Fingerprint)
- [ ] [P1] Scheduled and recurring transfers
- [ ] [P1] Advanced KYC with document upload
- [ ] [P1] Multi-language support (Full Spanish)
- [ ] [P1] Push notification system
- [ ] [P1] Referral program ($10 bonus)

### Medium Priority

- [ ] [P2] Bill pay integration
- [ ] [P2] Split bill feature
- [ ] [P2] Request money functionality
- [ ] [P2] Virtual debit card
- [ ] [P2] Cashback rewards (1% on payments)
- [ ] [P2] Dark mode support
- [ ] [P2] Export tax documents
- [ ] [P2] In-app customer support chat

### Low Priority

- [ ] [P2] Additional corridors (Colombia, Guatemala)
- [ ] [P2] Cryptocurrency support beyond USDC
- [ ] [P2] Business accounts with API access
- [ ] [P2] Physical debit card
- [ ] [P2] Investment features
- [ ] [P2] Loyalty points system
- [ ] [P2] Social features (contacts, activity feed)

---

## RECURRING TASKS

### Daily

- [ ] Check error logs in Sentry
- [ ] Review hot wallet balance
- [ ] Monitor transaction volumes
- [ ] Check for failed cash-outs
- [ ] Review fraud alerts
- [ ] Update PROGRESS.md

### Weekly

- [ ] Database backup verification
- [ ] Security scan (dependencies)
- [ ] Performance metrics review
- [ ] User growth analysis
- [ ] Sprint planning/review
- [ ] Team sync meeting

### Monthly

- [ ] Full security audit
- [ ] Update documentation
- [ ] Review and archive completed tasks
- [ ] Analyze user feedback
- [ ] Update roadmap
- [ ] Financial reconciliation

---

## BUGS & ISSUES

### 🐛 Active Bugs

_No bugs reported yet - MVP in development_

### ⚠️ Known Issues

- [ ] [P2] Stellar testnet occasionally slow (use retry logic)
- [ ] [P2] Expo NFC not supported on all Android devices
- [ ] [P2] Circle sandbox has daily limits

---

## BLOCKED TASKS

_No blocked tasks currently_

---

## COMPLETED TASKS

_No completed tasks yet - project starting_

---

## TECHNICAL DEBT

### Backend

- [ ] [P2] Add comprehensive API documentation (OpenAPI)
- [ ] [P2] Implement database connection retry logic
- [ ] [P2] Add request ID tracking for debugging
- [ ] [P2] Optimize database queries with EXPLAIN
- [ ] [P2] Implement circuit breaker for external APIs

### Frontend

- [ ] [P2] Add proper TypeScript types for all API responses
- [ ] [P2] Implement proper error boundaries
- [ ] [P2] Add skeleton loading states
- [ ] [P2] Optimize bundle size with code splitting
- [ ] [P2] Add accessibility improvements (ARIA labels)

### Infrastructure

- [ ] [P2] Setup staging environment
- [ ] [P2] Implement blue-green deployment
- [ ] [P2] Add application performance monitoring (APM)
- [ ] [P2] Setup log aggregation service
- [ ] [P2] Implement database read replicas

---

## NOTES & DECISIONS

### Technical Decisions

- Using custodial wallet model for MVP (simpler compliance)
- Stellar testnet for development, mainnet for production
- ACH via manual process for MVP, Plaid for v2
- Starting with 2% flat fee, may adjust based on volume
- Hot wallet maintains 20% of monthly volume

### Important Reminders

- Always validate CLABE format (18 digits)
- Phone numbers must include country code
- All amounts stored as Decimal to prevent float errors
- USDC has 6 decimal places
- MXN has 2 decimal places
- JWT tokens expire in 24 hours
- Refresh tokens expire in 30 days
- Transaction sessions expire in 5 minutes
- OTP codes expire in 10 minutes

### Compliance Notes

- Basic KYC required for all users
- Enhanced KYC for >$500/month
- All financial transactions must be logged
- Suspicious activity must be reported
- User data retention: 7 years
- PCI DSS compliance required when adding cards

---

**Last Updated:** 2025-10-16
**Updated By:** Claude (Product Manager Agent)
**Total Tasks:** ~240
**Estimated Hours:** ~200 hours
**Target Completion:** 8 weeks

---

## SPRINT VELOCITY TARGETS

- **Sprint 1 (Week 1-2):** 45 tasks - Foundation & Auth
- **Sprint 2 (Week 3-4):** 55 tasks - Wallet & Remittance
- **Sprint 3 (Week 5-6):** 50 tasks - NFC Payments
- **Sprint 4 (Week 7):** 35 tasks - Cash-out
- **Sprint 5 (Week 8):** 40 tasks - Security & Launch

**Total MVP Tasks:** 225 tasks
**Average per week:** ~28 tasks
**Daily average:** ~5-6 tasks

---

## SUCCESS CRITERIA FOR BETA LAUNCH

### Must Have (P0)

- [x] User registration and login
- [x] Send remittance USA → Mexico
- [x] Receive money in wallet
- [x] View balance and history
- [x] P2P transfers
- [x] NFC payments (basic)
- [x] Cash-out to bank
- [x] Basic merchant dashboard

### Should Have (P1)

- [x] Phone verification
- [x] QR code payments
- [x] Saved recipients
- [x] Transaction receipts
- [x] Real-time notifications
- [x] Basic fraud detection

### Nice to Have (P2)

- [ ] 2FA authentication
- [ ] Advanced analytics
- [ ] Dark mode
- [ ] Export features
- [ ] Multiple languages

**Beta Launch Ready When:**

- All P0 tasks complete
- 80% of P1 tasks complete
- Security audit passed
- Load testing passed (100 users)
- 50 beta users recruited
