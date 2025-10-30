/**
 * useLogin Hook
 *
 * TanStack Query mutation hook for user login.
 * Handles login API call and updates auth store on success.
 */

import { useMutation } from '@tanstack/react-query'
import { useAuthStore } from '@/core/store'
import { authService } from '../services'
import type { LoginRequest, LoginResponse } from '../types'

/**
 * Login mutation options
 */
interface UseLoginOptions {
  onSuccess?: (data: LoginResponse) => void
  onError?: (error: Error) => void
}

/**
 * useLogin Hook
 *
 * @param options - Optional callbacks for success/error
 * @returns TanStack Query mutation object
 *
 * @example
 * ```typescript
 * const { mutate: login, isPending, isError, error } = useLogin({
 *   onSuccess: () => {
 *     Alert.alert('Success', 'Welcome back!')
 *     navigation.navigate('Home')
 *   },
 *   onError: (error) => {
 *     Alert.alert('Error', error.message)
 *   }
 * })
 *
 * // Trigger login
 * login({ email: 'user@example.com', password: 'password123' })
 * ```
 */
export function useLogin(options?: UseLoginOptions) {
  const login = useAuthStore((state) => state.login)

  return useMutation({
    mutationFn: (credentials: LoginRequest) => authService.login(credentials),

    onSuccess: async (response) => {
      // 🔍 DEBUGGING: Log complete response structure
      console.log('🔍 ========== LOGIN RESPONSE DEBUG ==========')
      console.log('🔍 Full response:', JSON.stringify(response, null, 2))
      console.log('🔍 Response data:', response.data)
      console.log('🔍 Response data.user:', response.data?.user)
      console.log('🔍 Response data.tokens:', response.data?.tokens)

      // Check if tokens exist
      if (!response.data?.tokens) {
        console.error('❌ NO TOKENS IN RESPONSE!')
        console.error('❌ Backend did not return tokens in response.data.tokens')
        console.error('❌ Expected structure: { success, message, data: { user, tokens } }')
        console.error('❌ Got:', JSON.stringify(response, null, 2))
        options?.onError?.(new Error('No tokens received from backend'))
        return
      }

      // Check if tokens have the required properties
      if (!response.data.tokens.access_token || !response.data.tokens.refresh_token) {
        console.error('❌ TOKENS MISSING REQUIRED PROPERTIES!')
        console.error('❌ access_token:', response.data.tokens.access_token)
        console.error('❌ refresh_token:', response.data.tokens.refresh_token)
        options?.onError?.(new Error('Tokens missing required properties'))
        return
      }

      console.log('✅ Tokens found! Proceeding to save...')
      console.log('✅ access_token:', response.data.tokens.access_token.substring(0, 20) + '...')
      console.log('✅ refresh_token:', response.data.tokens.refresh_token.substring(0, 20) + '...')
      console.log('🔍 ============================================')

      try {
        // Store auth data in Zustand + secure storage
        await login(response.data.user, response.data.tokens)

        // Call custom success callback
        options?.onSuccess?.(response)
      } catch (error) {
        console.error('Failed to store auth data after login:', error)
        // Even if storage fails, call error callback
        options?.onError?.(error as Error)
      }
    },

    onError: (error) => {
      console.error('Login failed:', error)
      options?.onError?.(error as Error)
    },
  })
}
