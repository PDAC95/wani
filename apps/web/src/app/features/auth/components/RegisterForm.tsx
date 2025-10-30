/**
 * RegisterForm Component
 *
 * User registration form with validation using React Hook Form and Zod.
 * Includes fields for email, password, full name, and phone (optional).
 */

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { useRegister, getRegisterErrorMessage } from '../hooks/useRegister'
import type { RegisterRequest } from '../types/auth.types'
import { useState } from 'react'

/**
 * Zod validation schema for registration form
 * Matches backend UserCreate schema requirements
 */
const registerSchema = z.object({
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Please enter a valid email address'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      'Password must contain at least one uppercase letter, one lowercase letter, and one number'
    ),
  full_name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must not exceed 100 characters')
    .regex(/^[a-zA-Z\s]+$/, 'Name must contain only letters and spaces'),
  phone: z
    .string()
    .max(20, 'Phone number must not exceed 20 characters')
    .regex(/^[+]?[\d\s()-]+$/, 'Please enter a valid phone number')
    .optional()
    .or(z.literal('')),
})

type RegisterFormData = z.infer<typeof registerSchema>

/**
 * RegisterForm Props
 */
interface RegisterFormProps {
  /**
   * Callback fired on successful registration
   */
  onSuccess?: () => void
  /**
   * Callback fired on registration error
   */
  onError?: (error: Error) => void
  /**
   * Custom redirect path after successful registration
   */
  redirectTo?: string
  /**
   * Additional CSS classes for the form container
   */
  className?: string
}

/**
 * RegisterForm Component
 *
 * @example
 * ```tsx
 * <RegisterForm
 *   onSuccess={() => console.log('Registration successful!')}
 *   redirectTo="/onboarding"
 * />
 * ```
 */
export function RegisterForm({
  onSuccess,
  onError,
  redirectTo,
  className = '',
}: RegisterFormProps) {
  const [showPassword, setShowPassword] = useState(false)

  // React Hook Form setup
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    mode: 'onBlur', // Validate on blur for better UX
  })

  // Register mutation hook
  const { mutate: registerUser, isPending, error } = useRegister({
    onSuccess,
    onError,
    redirectTo,
  })

  // Form submit handler
  const onSubmit = (data: RegisterFormData) => {
    // Convert empty phone string to undefined
    const requestData: RegisterRequest = {
      ...data,
      phone: data.phone || undefined,
    }
    registerUser(requestData)
  }

  return (
    <div className={`w-full max-w-md ${className}`}>
      {/* Form Card with Glassmorphism */}
      <div className="glass rounded-2xl p-8 border border-wani-200/40 animate-slide-up">
        {/* Registration Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Full Name Field */}
          <div>
            <label
              htmlFor="full_name"
              className="block text-sm font-semibold text-dark mb-2"
            >
              Full Name <span className="text-wani-500">*</span>
            </label>
            <input
              id="full_name"
              type="text"
              {...register('full_name')}
              disabled={isPending}
              className={`
                w-full px-4 py-3 border rounded-xl glass-input
                focus:outline-none focus:ring-2 focus:ring-wani-500 focus:border-wani-500
                disabled:bg-gray-100 disabled:cursor-not-allowed
                transition-all duration-200
                ${errors.full_name ? 'border-red-500' : 'border-wani-200/40'}
              `}
              placeholder="John Doe"
            />
            {errors.full_name && (
              <p className="mt-1 text-sm text-red-600">
                {errors.full_name.message}
              </p>
            )}
          </div>

          {/* Email Field */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-semibold text-dark mb-2"
            >
              Email Address <span className="text-wani-500">*</span>
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
            <label
              htmlFor="password"
              className="block text-sm font-semibold text-dark mb-2"
            >
              Password <span className="text-wani-500">*</span>
            </label>
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
                autoComplete="new-password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-4 flex items-center text-dark/60 hover:text-wani-600 transition-colors"
                disabled={isPending}
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
              <p className="mt-2 text-sm text-red-600">
                {errors.password.message}
              </p>
            )}
            <p className="mt-2 text-xs text-dark/60">
              Must be at least 8 characters with uppercase, lowercase, and numbers
            </p>
          </div>

          {/* Phone Field (Optional) */}
          <div>
            <label
              htmlFor="phone"
              className="block text-sm font-semibold text-dark mb-2"
            >
              Phone Number <span className="text-dark/40">(optional)</span>
            </label>
            <input
              id="phone"
              type="tel"
              {...register('phone')}
              disabled={isPending}
              className={`
                w-full px-4 py-3 border rounded-xl glass-input
                focus:outline-none focus:ring-2 focus:ring-wani-500 focus:border-wani-500
                disabled:bg-gray-100 disabled:cursor-not-allowed
                transition-all duration-200
                ${errors.phone ? 'border-red-500' : 'border-wani-200/40'}
              `}
              placeholder="+1234567890"
              autoComplete="tel"
            />
            {errors.phone && (
              <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
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
                    {getRegisterErrorMessage(error)}
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
                Creating account...
              </>
            ) : (
              'Create Account'
            )}
          </button>
        </form>

        {/* Footer - Login Link */}
        <div className="mt-6 text-center">
          <p className="text-sm text-dark/70">
            Already have an account?{' '}
            <a
              href="/login"
              className="font-bold text-wani-600 hover:text-wani-700 transition-colors"
            >
              Sign in
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}

export default RegisterForm
