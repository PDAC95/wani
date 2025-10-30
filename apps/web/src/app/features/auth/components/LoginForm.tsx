/**
 * LoginForm Component
 *
 * User login form with validation using React Hook Form and Zod.
 * Includes fields for email and password with show/hide password toggle.
 */

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { useLogin, getLoginErrorMessage } from '../hooks/useLogin'
import type { LoginRequest } from '../types/auth.types'
import { useState } from 'react'
import { Link } from 'react-router-dom'

/**
 * Zod validation schema for login form
 * Matches backend LoginRequest schema requirements
 */
const loginSchema = z.object({
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Please enter a valid email address'),
  password: z
    .string()
    .min(1, 'Password is required')
    .min(8, 'Password must be at least 8 characters'),
})

type LoginFormData = z.infer<typeof loginSchema>

/**
 * LoginForm Props
 */
interface LoginFormProps {
  /**
   * Callback fired on successful login
   */
  onSuccess?: () => void
  /**
   * Callback fired on login error
   */
  onError?: (error: Error) => void
  /**
   * Custom redirect path after successful login
   * @default '/dashboard'
   */
  redirectTo?: string
  /**
   * Additional CSS classes for the form container
   */
  className?: string
  /**
   * Whether to show "Forgot Password?" link
   * @default true
   */
  showForgotPassword?: boolean
  /**
   * Whether to show "Don't have an account?" link
   * @default true
   */
  showRegisterLink?: boolean
}

/**
 * LoginForm Component
 *
 * @example
 * ```tsx
 * <LoginForm
 *   onSuccess={() => console.log('Login successful!')}
 *   redirectTo="/dashboard"
 * />
 * ```
 */
export function LoginForm({
  onSuccess,
  onError,
  redirectTo,
  className = '',
  showForgotPassword = true,
  showRegisterLink = true,
}: LoginFormProps) {
  const [showPassword, setShowPassword] = useState(false)

  // React Hook Form setup
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: 'onBlur', // Validate on blur for better UX
  })

  // Login mutation hook
  const { mutate: login, isPending, error } = useLogin({
    onSuccess,
    onError,
    redirectTo,
  })

  // Form submit handler
  const onSubmit = (data: LoginFormData) => {
    const requestData: LoginRequest = {
      email: data.email,
      password: data.password,
    }
    login(requestData)
  }

  return (
    <div className={`w-full max-w-md ${className}`}>
      {/* Form Card with Glassmorphism */}
      <div className="glass rounded-2xl p-8 border border-wani-200/40 animate-slide-up">
        {/* Login Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Email Field */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-semibold text-dark mb-2"
            >
              Email Address
            </label>
            <input
              id="email"
              type="email"
              {...register('email')}
              disabled={isPending}
              className={`
                w-full px-4 py-3 border rounded-xl glass-input
                focus:outline-none focus:ring-2 focus:ring-wani-500 focus:border-wani-500
                disabled:bg-gray-100 disabled:cursor-not-allowed
                transition-all duration-200
                ${errors.email ? 'border-red-500' : 'border-wani-200/40'}
              `}
              placeholder="john@example.com"
              autoComplete="email"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
            )}
          </div>

          {/* Password Field */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label
                htmlFor="password"
                className="block text-sm font-semibold text-dark"
              >
                Password
              </label>
              {showForgotPassword && (
                <Link
                  to="/forgot-password"
                  className="text-xs font-medium text-wani-600 hover:text-wani-700 transition-colors"
                >
                  Forgot password?
                </Link>
              )}
            </div>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                {...register('password')}
                disabled={isPending}
                className={`
                  w-full px-4 py-3 pr-12 border rounded-xl glass-input
                  focus:outline-none focus:ring-2 focus:ring-wani-500 focus:border-wani-500
                  disabled:bg-gray-100 disabled:cursor-not-allowed
                  transition-all duration-200
                  ${errors.password ? 'border-red-500' : 'border-wani-200/40'}
                `}
                placeholder="••••••••"
                autoComplete="current-password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-4 flex items-center text-dark/60 hover:text-wani-600 transition-colors"
                disabled={isPending}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? (
                  <svg
                    className="h-5 w-5"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                ) : (
                  <svg
                    className="h-5 w-5"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                  </svg>
                )}
              </button>
            </div>
            {errors.password && (
              <p className="mt-1 text-sm text-red-600">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* API Error Message */}
          {error && (
            <div className="rounded-md bg-red-50 p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg
                    className="h-5 w-5 text-red-400"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-red-800">
                    {getLoginErrorMessage(error)}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isPending}
            className={`
              w-full flex justify-center items-center
              px-6 py-3 border border-transparent rounded-xl
              text-base font-bold text-white
              focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-wani-500
              transition-all duration-300
              ${
                isPending
                  ? 'bg-wani-400 cursor-not-allowed'
                  : 'btn-primary shadow-glow hover:shadow-xl hover:scale-[1.02]'
              }
            `}
          >
            {isPending ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                Signing in...
              </>
            ) : (
              'Sign In'
            )}
          </button>
        </form>

        {/* Footer - Register Link */}
        {showRegisterLink && (
          <div className="mt-6 text-center">
            <p className="text-sm text-dark/70">
              Don't have an account?{' '}
              <Link
                to="/register"
                className="font-bold text-wani-600 hover:text-wani-700 transition-colors"
              >
                Sign up
              </Link>
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default LoginForm
