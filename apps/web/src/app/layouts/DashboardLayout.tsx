/**
 * Dashboard Layout - Ultra-Modern Edition
 * Mobile-first layout with bottom navigation for authenticated pages
 */

import { Outlet, NavLink, useLocation } from 'react-router-dom'
import { useAuthStore } from '../core/store'

const DashboardLayout = () => {
  const user = useAuthStore((state) => state.user)
  const logout = useAuthStore((state) => state.logout)
  const location = useLocation()

  const handleLogout = () => {
    logout()
    window.location.href = '/auth/login'
  }

  return (
    <div className="min-h-screen">
      {/* Main Content - No Header, each page manages its own */}
      <main>
        <Outlet />
      </main>

      {/* Bottom Navigation - Ultra-Modern Mobile Design */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 glass border-t border-white/40 pb-safe">
        <div className="container-wani max-w-md mx-auto">
          <div className="flex items-center justify-around py-3">
            {/* Dashboard */}
            <NavLink
              to="/dashboard"
              end
              className="flex flex-col items-center gap-1 px-3 py-2 group"
            >
              <div
                className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-300 ${
                  location.pathname === '/dashboard'
                    ? 'bg-gradient-wani shadow-glow scale-110'
                    : 'bg-white/60 group-hover:bg-white/80 group-hover:scale-105'
                }`}
              >
                <svg
                  className={`w-6 h-6 transition-colors ${
                    location.pathname === '/dashboard'
                      ? 'text-white'
                      : 'text-dark group-hover:text-wani-500'
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                  />
                </svg>
              </div>
              <span
                className={`text-xs font-semibold transition-colors ${
                  location.pathname === '/dashboard'
                    ? 'text-wani-500'
                    : 'text-dark/60'
                }`}
              >
                Home
              </span>
            </NavLink>

            {/* Wallet */}
            <NavLink
              to="/dashboard/wallet"
              className="flex flex-col items-center gap-1 px-3 py-2 group"
            >
              <div
                className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-300 ${
                  location.pathname === '/dashboard/wallet'
                    ? 'bg-gradient-wani shadow-glow scale-110'
                    : 'bg-white/60 group-hover:bg-white/80 group-hover:scale-105'
                }`}
              >
                <svg
                  className={`w-6 h-6 transition-colors ${
                    location.pathname === '/dashboard/wallet'
                      ? 'text-white'
                      : 'text-dark group-hover:text-wani-500'
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                  />
                </svg>
              </div>
              <span
                className={`text-xs font-semibold transition-colors ${
                  location.pathname === '/dashboard/wallet'
                    ? 'text-wani-500'
                    : 'text-dark/60'
                }`}
              >
                Wallet
              </span>
            </NavLink>

            {/* Send Money - Center Action Button */}
            <NavLink
              to="/dashboard/send"
              className="flex flex-col items-center gap-1 px-3 py-2 -mt-8 group"
            >
              <div
                className={`w-16 h-16 rounded-3xl flex items-center justify-center shadow-glow transition-all duration-300 ${
                  location.pathname === '/dashboard/send'
                    ? 'bg-gradient-wani scale-110'
                    : 'bg-gradient-to-br from-wani-400 to-coral-500 group-hover:scale-105'
                }`}
              >
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                  />
                </svg>
              </div>
              <span className="text-xs font-semibold text-wani-500">Send</span>
            </NavLink>

            {/* Transactions */}
            <NavLink
              to="/dashboard/transactions"
              className="flex flex-col items-center gap-1 px-3 py-2 group"
            >
              <div
                className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-300 ${
                  location.pathname === '/dashboard/transactions'
                    ? 'bg-gradient-wani shadow-glow scale-110'
                    : 'bg-white/60 group-hover:bg-white/80 group-hover:scale-105'
                }`}
              >
                <svg
                  className={`w-6 h-6 transition-colors ${
                    location.pathname === '/dashboard/transactions'
                      ? 'text-white'
                      : 'text-dark group-hover:text-wani-500'
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                  />
                </svg>
              </div>
              <span
                className={`text-xs font-semibold transition-colors ${
                  location.pathname === '/dashboard/transactions'
                    ? 'text-wani-500'
                    : 'text-dark/60'
                }`}
              >
                Activity
              </span>
            </NavLink>

            {/* Profile */}
            <NavLink
              to="/dashboard/profile"
              className="flex flex-col items-center gap-1 px-3 py-2 group"
            >
              <div
                className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-300 ${
                  location.pathname === '/dashboard/profile'
                    ? 'bg-gradient-wani shadow-glow scale-110'
                    : 'bg-white/60 group-hover:bg-white/80 group-hover:scale-105'
                }`}
              >
                <svg
                  className={`w-6 h-6 transition-colors ${
                    location.pathname === '/dashboard/profile'
                      ? 'text-white'
                      : 'text-dark group-hover:text-wani-500'
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </div>
              <span
                className={`text-xs font-semibold transition-colors ${
                  location.pathname === '/dashboard/profile'
                    ? 'text-wani-500'
                    : 'text-dark/60'
                }`}
              >
                Profile
              </span>
            </NavLink>
          </div>
        </div>
      </nav>
    </div>
  )
}

export default DashboardLayout
