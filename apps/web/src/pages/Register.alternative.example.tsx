/**
 * Alternative Register Page Examples
 *
 * Different layout options for the Register page.
 * These examples show various ways to structure the registration page.
 */

import { RegisterForm } from '@/app/features/auth/components/RegisterForm'
import { Link } from 'react-router-dom'
import { ROUTES } from '@/app/routes'

/**
 * Example 1: Simple Centered Layout (Default - Already Implemented)
 */
export function RegisterPageSimple() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <RegisterForm />
    </div>
  )
}

/**
 * Example 2: With Brand Header
 */
export function RegisterPageWithHeader() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link to={ROUTES.HOME} className="flex items-center">
              <h1 className="text-2xl font-bold text-blue-600">Wani</h1>
              <span className="ml-2 text-sm text-gray-500">和</span>
            </Link>
            <Link
              to={ROUTES.LOGIN}
              className="text-sm font-medium text-blue-600 hover:text-blue-500"
            >
              Sign in
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <RegisterForm />
      </main>
    </div>
  )
}

/**
 * Example 3: Two-Column Layout with Branding
 */
export function RegisterPageTwoColumn() {
  return (
    <div className="min-h-screen flex">
      {/* Left Side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-blue-600 to-blue-800 text-white">
        <div className="flex flex-col justify-center px-12 py-12">
          <div className="mb-8">
            <h1 className="text-5xl font-bold mb-2">Wani</h1>
            <p className="text-2xl text-blue-100">和 - Peace, Harmony</p>
          </div>

          <h2 className="text-3xl font-bold mb-6">
            Welcome to the Future of Remittances
          </h2>
          <p className="text-xl mb-8 text-blue-100">
            Peace of mind in every transaction
          </p>

          {/* Feature List */}
          <ul className="space-y-4">
            <li className="flex items-start">
              <svg
                className="h-6 w-6 mr-3 flex-shrink-0 text-blue-200"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <div>
                <h3 className="font-semibold mb-1">Fast & Secure</h3>
                <p className="text-blue-100">
                  Send money internationally in minutes with bank-level security
                </p>
              </div>
            </li>
            <li className="flex items-start">
              <svg
                className="h-6 w-6 mr-3 flex-shrink-0 text-blue-200"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <div>
                <h3 className="font-semibold mb-1">Digital Wallet</h3>
                <p className="text-blue-100">
                  Store and manage your money in multiple currencies
                </p>
              </div>
            </li>
            <li className="flex items-start">
              <svg
                className="h-6 w-6 mr-3 flex-shrink-0 text-blue-200"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <div>
                <h3 className="font-semibold mb-1">Low Fees</h3>
                <p className="text-blue-100">
                  Transparent pricing with no hidden charges
                </p>
              </div>
            </li>
          </ul>

          {/* Testimonial */}
          <div className="mt-12 p-6 bg-blue-700 bg-opacity-50 rounded-lg">
            <p className="text-lg mb-4">
              "Wani has completely transformed how I send money home. It's fast,
              secure, and I always know exactly what my family will receive."
            </p>
            <p className="font-semibold">— Maria S., Customer</p>
          </div>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="flex-1 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="w-full max-w-md">
          {/* Mobile Logo - Only visible on mobile */}
          <div className="lg:hidden mb-8 text-center">
            <h1 className="text-3xl font-bold text-blue-600">Wani</h1>
            <p className="text-sm text-gray-600">Peace of mind in every transaction</p>
          </div>

          <RegisterForm />
        </div>
      </div>
    </div>
  )
}

/**
 * Example 4: With Progress Indicator (Multi-step)
 */
export function RegisterPageWithProgress() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 py-12">
        {/* Progress Indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-center">
            <div className="flex items-center">
              <div className="flex items-center text-blue-600">
                <div className="rounded-full h-10 w-10 flex items-center justify-center bg-blue-600 text-white font-semibold">
                  1
                </div>
                <span className="ml-2 font-medium">Account Details</span>
              </div>
              <div className="w-16 h-1 bg-gray-300 mx-4"></div>
              <div className="flex items-center text-gray-400">
                <div className="rounded-full h-10 w-10 flex items-center justify-center border-2 border-gray-300 font-semibold">
                  2
                </div>
                <span className="ml-2 font-medium">Verification</span>
              </div>
              <div className="w-16 h-1 bg-gray-300 mx-4"></div>
              <div className="flex items-center text-gray-400">
                <div className="rounded-full h-10 w-10 flex items-center justify-center border-2 border-gray-300 font-semibold">
                  3
                </div>
                <span className="ml-2 font-medium">Complete</span>
              </div>
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="flex justify-center">
          <RegisterForm />
        </div>
      </div>
    </div>
  )
}

/**
 * Example 5: With Benefits Sidebar
 */
export function RegisterPageWithBenefits() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Form - Left Side */}
          <div className="lg:w-1/2">
            <RegisterForm />
          </div>

          {/* Benefits - Right Side */}
          <div className="lg:w-1/2">
            <div className="bg-white rounded-lg shadow-md p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                Why Choose Wani?
              </h3>

              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-12 w-12 rounded-lg bg-blue-100 flex items-center justify-center">
                    <svg
                      className="h-6 w-6 text-blue-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">
                      Lightning Fast
                    </h4>
                    <p className="text-gray-600">
                      Send money internationally in minutes, not days. Real-time
                      transfers to over 50 countries.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 h-12 w-12 rounded-lg bg-green-100 flex items-center justify-center">
                    <svg
                      className="h-6 w-6 text-green-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                      />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">
                      Bank-Level Security
                    </h4>
                    <p className="text-gray-600">
                      Your money and data are protected with 256-bit encryption and
                      two-factor authentication.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 h-12 w-12 rounded-lg bg-purple-100 flex items-center justify-center">
                    <svg
                      className="h-6 w-6 text-purple-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">
                      Transparent Pricing
                    </h4>
                    <p className="text-gray-600">
                      No hidden fees. Know exactly what you're paying upfront with
                      our competitive exchange rates.
                    </p>
                  </div>
                </div>
              </div>

              {/* Stats */}
              <div className="mt-8 pt-8 border-t border-gray-200">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <p className="text-3xl font-bold text-blue-600">50+</p>
                    <p className="text-sm text-gray-600">Countries</p>
                  </div>
                  <div>
                    <p className="text-3xl font-bold text-blue-600">100K+</p>
                    <p className="text-sm text-gray-600">Users</p>
                  </div>
                  <div>
                    <p className="text-3xl font-bold text-blue-600">$10M+</p>
                    <p className="text-sm text-gray-600">Transferred</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Export default (use the simple version by default)
export default RegisterPageSimple
