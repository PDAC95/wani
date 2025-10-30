/**
 * useLogin Hook
 *
 * TanStack Query mutation hook for user login.
 * Handles login API call, loading states, and auth store updates.
 */

import { useMutation, type UseMutationResult } from '@tanstack/react-query'
import { useAuthStore } from '@/app/core/store/authStore'
import { authService } from '../services/authService'
import type { LoginRequest, LoginResponse } from '../types/auth.types'
import { useNavigate } from 'react-router-dom'

/**
 * Options for useLogin hook
 */
interface UseLoginOptions {
  /**
   * Callback fired on successful login
   */
  onSuccess?: (data: LoginResponse) => void
  /**
   * Callback fired on login error
   */
  onError?: (error: Error) => void
  /**
   * Whether to automatically navigate to dashboard after login
   * @default true
   */
  navigateToDashboard?: boolean
  /**
   * Custom navigation path after successful login
   * @default '/dashboard'
   */
  redirectTo?: string
}

/**
 * Hook return type
 */
export type UseLoginReturn = UseMutationResult<
  LoginResponse,
  Error,
  LoginRequest,
  unknown
>

/**
 * useLogin Hook
 *
 * Handles user login with automatic auth state management.
 * On success, automatically stores user and tokens in authStore.
 *
 * @param options - Configuration options
 * @returns TanStack Query mutation result
 *
 * @example
 * ```tsx
 * function LoginForm() {
 *   const { mutate: login, isPending, error } = useLogin({
 *     onSuccess: () => {
 *       console.log('Login successful!')
 *     }
 *   })
 *
 *   const onSubmit = (data: LoginRequest) => {
 *     login(data)
 *   }
 *
 *   return (
 *     <form onSubmit={handleSubmit(onSubmit)}>
 *       {error && <div>Error: {error.message}</div>}
 *       <button disabled={isPending}>
 *         {isPending ? 'Logging in...' : 'Login'}
 *       </button>
 *     </form>
 *   )
 * }
 * ```
 */
export const useLogin = (options?: UseLoginOptions): UseLoginReturn => {
  const navigate = useNavigate()
  const { login: storeLogin } = useAuthStore()

  return useMutation<LoginResponse, Error, LoginRequest>({
    mutationKey: ['auth', 'login'],
    mutationFn: authService.login,

    onSuccess: (response) => {
      // Store user and tokens in authStore
      storeLogin(response.user, response.tokens)

      // Call user's onSuccess callback if provided
      options?.onSuccess?.(response)

      // Navigate to dashboard or custom path
      if (options?.navigateToDashboard !== false) {
        const redirectPath = options?.redirectTo || '/dashboard'
        navigate(redirectPath)
      }
    },

    onError: (error) => {
      console.error('Login error:', error)
      options?.onError?.(error)
    },
  })
}

/**
 * Get error message from mutation error
 * Extracts user-friendly error messages from API errors
 *
 * @param error - Error from mutation
 * @returns User-friendly error message
 */
export const getLoginErrorMessage = (error: Error | null): string => {
  if (!error) return ''

  const apiError = error as any

  // Extract API error message
  if (apiError.response?.data?.message) {
    return apiError.response.data.message
  }

  // Extract API error from detail
  if (apiError.response?.data?.detail?.message) {
    return apiError.response.data.detail.message
  }

  // HTTP status specific messages
  if (apiError.response?.status === 401) {
    return 'Invalid email or password'
  }

  if (apiError.response?.status === 403) {
    return 'Your account has been deactivated. Please contact support.'
  }

  if (apiError.response?.status === 429) {
    return 'Too many login attempts. Please try again later.'
  }

  if (apiError.response?.status === 500) {
    return 'Server error. Please try again later.'
  }

  // Network errors
  if (apiError.message === 'Network Error') {
    return 'Network error. Please check your internet connection.'
  }

  // Timeout errors
  if (apiError.code === 'ECONNABORTED') {
    return 'Request timeout. Please try again.'
  }

  // Default fallback
  return error.message || 'Login failed. Please try again.'
}

/**
 * Usage Examples:
 *
 * 1. Basic login:
 * ```tsx
 * const { mutate: login, isPending } = useLogin()
 *
 * const handleSubmit = (data: LoginRequest) => {
 *   login(data)
 * }
 * ```
 *
 * 2. Login with custom callback:
 * ```tsx
 * const { mutate: login } = useLogin({
 *   onSuccess: (response) => {
 *     console.log('Welcome', response.user.full_name)
 *   },
 *   onError: (error) => {
 *     alert('Login failed!')
 *   }
 * })
 * ```
 *
 * 3. Login without auto navigation:
 * ```tsx
 * const { mutate: login } = useLogin({
 *   navigateToDashboard: false
 * })
 * ```
 *
 * 4. Login with custom redirect:
 * ```tsx
 * const { mutate: login } = useLogin({
 *   redirectTo: '/profile'
 * })
 * ```
 *
 * 5. Display error message:
 * ```tsx
 * const { mutate: login, error } = useLogin()
 *
 * return (
 *   <>
 *     {error && <Alert>{getLoginErrorMessage(error)}</Alert>}
 *     <LoginForm onSubmit={login} />
 *   </>
 * )
 * ```
 */

export default useLogin
