/**
 * RegisterPage Example
 *
 * Example of how to use the RegisterForm component in a page.
 * This file serves as documentation and can be used as a starting point
 * for creating your registration page.
 */

import { RegisterForm } from './RegisterForm'

/**
 * Register Page Component
 *
 * Full-page registration view with centered form.
 */
export function RegisterPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <RegisterForm
        onSuccess={() => {
          console.log('Registration successful!')
          // Optional: Show success toast
          // toast.success('Account created successfully!')
        }}
        onError={(error) => {
          console.error('Registration failed:', error)
          // Optional: Show error toast
          // toast.error('Registration failed. Please try again.')
        }}
        // Optional: Custom redirect
        // redirectTo="/onboarding"
      />
    </div>
  )
}

/**
 * Alternative: Register Page with Brand Header
 */
export function RegisterPageWithHeader() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900">Wani</h1>
            <a
              href="/login"
              className="text-sm font-medium text-blue-600 hover:text-blue-500"
            >
              Sign in
            </a>
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
 * Alternative: Two-Column Layout
 */
export function RegisterPageTwoColumn() {
  return (
    <div className="min-h-screen flex">
      {/* Left Side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-blue-600 text-white">
        <div className="flex flex-col justify-center px-12">
          <h1 className="text-4xl font-bold mb-4">Welcome to Wani</h1>
          <p className="text-xl mb-8">
            Peace of mind in every transaction
          </p>
          <ul className="space-y-4">
            <li className="flex items-start">
              <svg
                className="h-6 w-6 mr-3 flex-shrink-0"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <span>Fast and secure remittances</span>
            </li>
            <li className="flex items-start">
              <svg
                className="h-6 w-6 mr-3 flex-shrink-0"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <span>Digital wallet for everyday transactions</span>
            </li>
            <li className="flex items-start">
              <svg
                className="h-6 w-6 mr-3 flex-shrink-0"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <span>Bank-level security</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="flex-1 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <RegisterForm />
      </div>
    </div>
  )
}

export default RegisterPage
