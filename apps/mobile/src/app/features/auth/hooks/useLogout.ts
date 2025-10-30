/**
 * useLogout Hook
 *
 * TanStack Query mutation hook for user logout.
 * Handles logout API call and clears auth store.
 */

import { useMutation } from '@tanstack/react-query'
import { useAuthStore } from '@/core/store'
import { authService } from '../services'

/**
 * Logout mutation options
 */
interface UseLogoutOptions {
  onSuccess?: () => void
  onError?: (error: Error) => void
}

/**
 * useLogout Hook
 *
 * @param options - Optional callbacks for success/error
 * @returns TanStack Query mutation object
 *
 * @example
 * ```typescript
 * const { mutate: logout, isPending } = useLogout({
 *   onSuccess: () => {
 *     Alert.alert('Success', 'Logged out successfully')
 *     navigation.navigate('Login')
 *   }
 * })
 *
 * // Trigger logout
 * logout()
 * ```
 */
export function useLogout(options?: UseLogoutOptions) {
  const logout = useAuthStore((state) => state.logout)

  return useMutation({
    mutationFn: () => authService.logout(),

    onSuccess: async () => {
      try {
        // Clear auth data from Zustand + secure storage
        await logout()

        // Call custom success callback
        options?.onSuccess?.()
      } catch (error) {
        console.error('Failed to clear auth data after logout:', error)
        options?.onError?.(error as Error)
      }
    },

    onError: (error) => {
      console.error('Logout failed:', error)

      // Even if API logout fails, clear local data
      logout()

      options?.onError?.(error as Error)
    },
  })
}
