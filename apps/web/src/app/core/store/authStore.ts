/**
 * Authentication Store
 *
 * Manages user authentication state using Zustand with localStorage persistence.
 * Integrates with authService and maintains user session data.
 */

import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import type { User, AuthTokens } from '@/app/features/auth/types/auth.types'

/**
 * Auth Store State Interface
 */
interface AuthState {
  // State
  user: User | null
  tokens: AuthTokens | null
  isAuthenticated: boolean
  isLoading: boolean

  // Actions
  login: (user: User, tokens: AuthTokens) => void
  logout: () => void
  setUser: (user: User) => void
  setTokens: (tokens: AuthTokens) => void
  updateUser: (updates: Partial<User>) => void
  setLoading: (isLoading: boolean) => void
  clearAuth: () => void

  // Getters
  getToken: () => string | null
  getAccessToken: () => string | null
  getRefreshToken: () => string | null
  isTokenExpired: () => boolean
}

/**
 * Initial state
 */
const initialState = {
  user: null,
  tokens: null,
  isAuthenticated: false,
  isLoading: false,
}

/**
 * Auth Store
 *
 * Persists to localStorage under key 'wani-auth-storage'
 * Only persists: user, tokens, isAuthenticated
 */
export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      ...initialState,

      /**
       * Login
       * Sets user and tokens, marks as authenticated
       *
       * @param user - User data from backend
       * @param tokens - JWT tokens from backend
       *
       * @example
       * const { login } = useAuthStore()
       * const response = await authService.login(credentials)
       * login(response.user, response.tokens)
       */
      login: (user, tokens) => {
        set({
          user,
          tokens,
          isAuthenticated: true,
          isLoading: false,
        })
      },

      /**
       * Logout
       * Clears all authentication data and resets to initial state
       *
       * @example
       * const { logout } = useAuthStore()
       * logout()
       */
      logout: () => {
        set(initialState)
      },

      /**
       * Set User
       * Updates user data and marks as authenticated
       *
       * @param user - User data to set
       */
      setUser: (user) => {
        set({
          user,
          isAuthenticated: true,
        })
      },

      /**
       * Set Tokens
       * Updates authentication tokens
       *
       * @param tokens - JWT tokens to set
       */
      setTokens: (tokens) => {
        set({
          tokens,
        })
      },

      /**
       * Update User
       * Partially updates user data
       *
       * @param updates - Partial user data to update
       *
       * @example
       * updateUser({ full_name: 'New Name', is_verified: true })
       */
      updateUser: (updates) => {
        set((state) => ({
          user: state.user ? { ...state.user, ...updates } : null,
        }))
      },

      /**
       * Set Loading
       * Updates loading state (useful for async operations)
       *
       * @param isLoading - Loading state
       */
      setLoading: (isLoading) => {
        set({ isLoading })
      },

      /**
       * Clear Auth
       * Alias for logout() - clears all auth data
       */
      clearAuth: () => {
        set(initialState)
      },

      /**
       * Get Token
       * Returns the access token if available
       *
       * @returns Access token string or null
       *
       * @example
       * const token = useAuthStore.getState().getToken()
       * // Use in API calls: Authorization: `Bearer ${token}`
       */
      getToken: () => {
        const { tokens } = get()
        return tokens?.access_token || null
      },

      /**
       * Get Access Token
       * Returns the access token if available
       *
       * @returns Access token string or null
       */
      getAccessToken: () => {
        const { tokens } = get()
        return tokens?.access_token || null
      },

      /**
       * Get Refresh Token
       * Returns the refresh token if available
       *
       * @returns Refresh token string or null
       */
      getRefreshToken: () => {
        const { tokens } = get()
        return tokens?.refresh_token || null
      },

      /**
       * Is Token Expired
       * Checks if the access token has expired based on expires_in
       *
       * NOTE: Backend returns expires_in in seconds (e.g., 86400 for 24h)
       * We need to track when the token was issued to calculate expiration
       *
       * @returns True if token is expired or not available
       */
      isTokenExpired: () => {
        const { tokens } = get()
        if (!tokens) return true

        // TODO: Implement proper token expiration checking
        // For now, assume token is valid if it exists
        // In production, store token issue time and compare with expires_in
        return false
      },
    }),
    {
      name: 'wani-auth-storage', // LocalStorage key
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        // Only persist these fields to localStorage
        user: state.user,
        tokens: state.tokens,
        isAuthenticated: state.isAuthenticated,
        // isLoading is NOT persisted (always starts false)
      }),
    }
  )
)

/**
 * Selectors
 * Use these for optimal performance with React components
 */
export const selectUser = (state: AuthState) => state.user
export const selectIsAuthenticated = (state: AuthState) => state.isAuthenticated
export const selectTokens = (state: AuthState) => state.tokens
export const selectIsLoading = (state: AuthState) => state.isLoading
export const selectAccessToken = (state: AuthState) => state.tokens?.access_token || null
export const selectRefreshToken = (state: AuthState) => state.tokens?.refresh_token || null

/**
 * Usage Examples:
 *
 * 1. Login after successful authentication:
 * ```tsx
 * const { login } = useAuthStore()
 * const response = await authService.login({ email, password })
 * login(response.user, response.tokens)
 * ```
 *
 * 2. Logout:
 * ```tsx
 * const { logout } = useAuthStore()
 * logout()
 * ```
 *
 * 3. Check authentication:
 * ```tsx
 * const isAuthenticated = useAuthStore((state) => state.isAuthenticated)
 * const user = useAuthStore(selectUser)
 * ```
 *
 * 4. Get token for API calls:
 * ```tsx
 * const token = useAuthStore.getState().getToken()
 * // or with selector
 * const token = useAuthStore(selectAccessToken)
 * ```
 *
 * 5. Update user after profile edit:
 * ```tsx
 * const { updateUser } = useAuthStore()
 * updateUser({ full_name: 'New Name' })
 * ```
 */

export default useAuthStore
