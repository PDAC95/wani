/**
 * useLogout Hook
 *
 * TanStack Query mutation hook for user logout.
 * Handles logout API call and auth store cleanup.
 */

import { useMutation, type UseMutationResult } from '@tanstack/react-query'
import { useAuthStore } from '@/app/core/store/authStore'
import { authService } from '../services/authService'
import { useNavigate } from 'react-router-dom'

/**
 * Options for useLogout hook
 */
interface UseLogoutOptions {
  /**
   * Callback fired on successful logout
   */
  onSuccess?: () => void
  /**
   * Callback fired on logout error
   */
  onError?: (error: Error) => void
  /**
   * Whether to automatically navigate to login page after logout
   * @default true
   */
  navigateToLogin?: boolean
  /**
   * Custom navigation path after successful logout
   */
  redirectTo?: string
}

/**
 * Hook return type
 */
export type UseLogoutReturn = UseMutationResult<void, Error, void, unknown>

/**
 * useLogout Hook
 *
 * Handles user logout with automatic auth state cleanup.
 *
 * @param options - Configuration options
 * @returns TanStack Query mutation result
 *
 * @example
 * ```tsx
 * function LogoutButton() {
 *   const { mutate: logout, isPending } = useLogout()
 *
 *   return (
 *     <button onClick={() => logout()} disabled={isPending}>
 *       {isPending ? 'Logging out...' : 'Logout'}
 *     </button>
 *   )
 * }
 * ```
 */
export const useLogout = (options?: UseLogoutOptions): UseLogoutReturn => {
  const navigate = useNavigate()
  const clearAuth = useAuthStore((state) => state.clearAuth)

  return useMutation<void, Error, void>({
    mutationKey: ['auth', 'logout'],
    mutationFn: () => authService.logout(),

    onSuccess: () => {
      // Clear auth state from store
      clearAuth()

      // Call user's onSuccess callback if provided
      options?.onSuccess?.()

      // Navigate to login or custom path
      if (options?.navigateToLogin !== false) {
        const redirectPath = options?.redirectTo || '/login'
        navigate(redirectPath)
      }
    },

    onError: (error) => {
      console.error('Logout error:', error)

      // Even on error, we should clear local state
      // The user might not be able to logout from server,
      // but we can clear local tokens
      clearAuth()

      // Call user's onError callback if provided
      options?.onError?.(error)

      // Still navigate to login
      if (options?.navigateToLogin !== false) {
        const redirectPath = options?.redirectTo || '/login'
        navigate(redirectPath)
      }
    },
  })
}

export default useLogout
