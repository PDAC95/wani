/**
 * useRegister Hook
 *
 * TanStack Query mutation hook for user registration.
 * Handles registration API call, loading states, and auth store updates.
 */

import { useMutation, type UseMutationResult } from '@tanstack/react-query'
import { useAuthStore } from '@/app/core/store/authStore'
import { authService } from '../services/authService'
import type { RegisterRequest, RegisterResponse } from '../types/auth.types'
import { useNavigate } from 'react-router-dom'

/**
 * Options for useRegister hook
 */
interface UseRegisterOptions {
  /**
   * Callback fired on successful registration
   */
  onSuccess?: (data: RegisterResponse) => void
  /**
   * Callback fired on registration error
   */
  onError?: (error: Error) => void
  /**
   * Whether to automatically navigate to dashboard after registration
   * @default true
   */
  navigateToDashboard?: boolean
  /**
   * Custom navigation path after successful registration
   */
  redirectTo?: string
}

/**
 * Hook return type
 */
export type UseRegisterReturn = UseMutationResult<
  RegisterResponse,
  Error,
  RegisterRequest,
  unknown
>

/**
 * Map auth API response to authStore format
 * Transforms backend User to frontend User format
 */
const mapAuthResponse = (response: RegisterResponse) => {
  // Split full_name into firstName and lastName
  const nameParts = response.user.full_name.trim().split(' ')
  const firstName = nameParts[0] || ''
  const lastName = nameParts.slice(1).join(' ') || ''

  return {
    user: {
      id: response.user.id,
      email: response.user.email,
      phone: response.user.phone || '',
      firstName,
      lastName,
      countryCode: '', // Not provided by backend yet
      kycStatus: 'pending' as const,
      emailVerified: false,
      phoneVerified: false,
      createdAt: response.user.created_at,
      updatedAt: response.user.created_at,
    },
    tokens: response.tokens ? {
      accessToken: response.tokens.access_token || '',
      refreshToken: response.tokens.refresh_token || '',
      expiresAt: response.tokens.expires_in
        ? Date.now() + response.tokens.expires_in * 1000
        : Date.now() + 3600 * 1000, // Default 1 hour
    } : {
      accessToken: '',
      refreshToken: '',
      expiresAt: Date.now() + 3600 * 1000, // Default 1 hour
    },
  }
}

/**
 * useRegister Hook
 *
 * Handles user registration with automatic auth state management.
 *
 * @param options - Configuration options
 * @returns TanStack Query mutation result
 *
 * @example
 * ```tsx
 * function RegisterForm() {
 *   const { mutate: register, isPending, error } = useRegister({
 *     onSuccess: () => {
 *       console.log('Registration successful!')
 *     }
 *   })
 *
 *   const onSubmit = (data: RegisterRequest) => {
 *     register(data)
 *   }
 *
 *   return (
 *     <form onSubmit={handleSubmit(onSubmit)}>
 *       {error && <div>Error: {error.message}</div>}
 *       <button disabled={isPending}>
 *         {isPending ? 'Registering...' : 'Register'}
 *       </button>
 *     </form>
 *   )
 * }
 * ```
 */
export const useRegister = (options?: UseRegisterOptions): UseRegisterReturn => {
  const navigate = useNavigate()
  const login = useAuthStore((state) => state.login)

  return useMutation<RegisterResponse, Error, RegisterRequest>({
    mutationKey: ['auth', 'register'],
    mutationFn: (data: RegisterRequest) => authService.register(data),

    onSuccess: (response) => {
      // Map response to authStore format and update state
      const { user, tokens } = mapAuthResponse(response)
      login(user, tokens)

      // Call user's onSuccess callback if provided
      options?.onSuccess?.(response)

      // Navigate to dashboard or custom path
      if (options?.navigateToDashboard !== false) {
        const redirectPath = options?.redirectTo || '/dashboard'
        navigate(redirectPath)
      }
    },

    onError: (error) => {
      // Log error for debugging
      console.error('Registration error:', error)

      // Call user's onError callback if provided
      options?.onError?.(error)
    },
  })
}

/**
 * Get error message from mutation error
 * Helper function to extract user-friendly error messages
 */
export const getRegisterErrorMessage = (error: Error | null): string => {
  if (!error) return ''

  // Check if it's an API error with response data
  const apiError = error as any
  if (apiError.response?.data?.message) {
    return apiError.response.data.message
  }

  // Check for specific error codes
  if (apiError.response?.status === 409) {
    return 'An account with this email already exists'
  }

  if (apiError.response?.status === 400) {
    return 'Please check your registration information'
  }

  // Fallback to error message
  return error.message || 'Registration failed. Please try again.'
}

export default useRegister
