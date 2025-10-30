/**
 * Application Routes
 * React Router v7 configuration with lazy loading
 */

import { createBrowserRouter, Navigate } from 'react-router-dom'
import { lazy, Suspense } from 'react'

// Layouts
const PublicLayout = lazy(() => import('../layouts/PublicLayout'))
const AuthLayout = lazy(() => import('../layouts/AuthLayout'))
const DashboardLayout = lazy(() => import('../layouts/DashboardLayout'))

// Pages - Lazy loaded for code splitting
const HomePage = lazy(() => import('../../pages/Home'))
const LoginPage = lazy(() => import('../../pages/Login'))
const RegisterPage = lazy(() => import('../../pages/Register'))
const DashboardPage = lazy(() => import('../../pages/Dashboard'))
const WalletPage = lazy(() => import('../../pages/Wallet'))
const SendMoneyPage = lazy(() => import('../../pages/SendMoney'))
const TransactionsPage = lazy(() => import('../../pages/Transactions'))
const ProfilePage = lazy(() => import('../../pages/Profile'))
const NotFoundPage = lazy(() => import('../../pages/NotFound'))

// Loading fallback component
const PageLoader = () => (
  <div className="flex items-center justify-center min-h-screen bg-cream">
    <div className="text-center">
      <div className="w-16 h-16 border-4 border-coral border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
      <p className="text-brown-light">Loading...</p>
    </div>
  </div>
)

// Wrapper component for lazy loaded routes
const LazyRoute = ({ children }: { children: React.ReactNode }) => (
  <Suspense fallback={<PageLoader />}>{children}</Suspense>
)

/**
 * Router Configuration
 */
export const router = createBrowserRouter([
  // Public Routes
  {
    path: '/',
    element: (
      <LazyRoute>
        <PublicLayout />
      </LazyRoute>
    ),
    children: [
      {
        index: true,
        element: (
          <LazyRoute>
            <HomePage />
          </LazyRoute>
        ),
      },
    ],
  },

  // Auth Routes (Login, Register)
  {
    path: '/auth',
    element: (
      <LazyRoute>
        <AuthLayout />
      </LazyRoute>
    ),
    children: [
      {
        path: 'login',
        element: (
          <LazyRoute>
            <LoginPage />
          </LazyRoute>
        ),
      },
      {
        path: 'register',
        element: (
          <LazyRoute>
            <RegisterPage />
          </LazyRoute>
        ),
      },
      {
        path: '',
        element: <Navigate to="/auth/login" replace />,
      },
    ],
  },

  // Protected Routes (Dashboard)
  {
    path: '/dashboard',
    element: (
      <LazyRoute>
        <DashboardLayout />
      </LazyRoute>
    ),
    children: [
      {
        index: true,
        element: (
          <LazyRoute>
            <DashboardPage />
          </LazyRoute>
        ),
      },
      {
        path: 'wallet',
        element: (
          <LazyRoute>
            <WalletPage />
          </LazyRoute>
        ),
      },
      {
        path: 'send',
        element: (
          <LazyRoute>
            <SendMoneyPage />
          </LazyRoute>
        ),
      },
      {
        path: 'transactions',
        element: (
          <LazyRoute>
            <TransactionsPage />
          </LazyRoute>
        ),
      },
      {
        path: 'profile',
        element: (
          <LazyRoute>
            <ProfilePage />
          </LazyRoute>
        ),
      },
    ],
  },

  // Redirects for convenience
  {
    path: '/login',
    element: <Navigate to="/auth/login" replace />,
  },
  {
    path: '/register',
    element: <Navigate to="/auth/register" replace />,
  },

  // 404 Not Found
  {
    path: '*',
    element: (
      <LazyRoute>
        <NotFoundPage />
      </LazyRoute>
    ),
  },
])

/**
 * Route Paths - Centralized route constants
 */
export const ROUTES = {
  HOME: '/',
  LOGIN: '/auth/login',
  REGISTER: '/auth/register',
  DASHBOARD: '/dashboard',
  WALLET: '/dashboard/wallet',
  SEND_MONEY: '/dashboard/send',
  TRANSACTIONS: '/dashboard/transactions',
  PROFILE: '/dashboard/profile',
} as const

export type RouteKey = keyof typeof ROUTES
