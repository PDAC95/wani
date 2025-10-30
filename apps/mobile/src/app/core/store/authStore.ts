/**
 * Authentication Store (Zustand)
 *
 * Global state management for authentication.
 * Manages user session, tokens, and authentication status.
 * Integrates with expo-secure-store for secure token persistence.
 */

import { create } from 'zustand'
import type { User, AuthTokens } from '@/features/auth/types'
import { saveTokens, saveUserInfo, getTokens, getUserInfo, clearAll } from '@/core/storage'

/**
 * Auth Store State
 */
interface AuthState {
  // State
  user: User | null
  tokens: AuthTokens | null
  isAuthenticated: boolean
  isLoading: boolean

  // Actions
  login: (user: User, tokens: AuthTokens) => Promise<void>
  logout: () => Promise<void>
  setUser: (user: User) => void
  updateTokens: (tokens: AuthTokens) => Promise<void>
  loadStoredAuth: () => Promise<void>
  setLoading: (loading: boolean) => void
}

/**
 * Authentication Store
 *
 * Usage:
 * ```typescript
 * const { user, isAuthenticated, login, logout } = useAuthStore()
 * ```
 */
export const useAuthStore = create<AuthState>((set, get) => ({
  // Initial state
  user: null,
  tokens: null,
  isAuthenticated: false,
  isLoading: true,

  /**
   * Login action
   * Stores user and tokens in state and secure storage
   */
  login: async (user: User, tokens: AuthTokens) => {
    try {
      // Save tokens to secure storage
      await saveTokens({
        accessToken: tokens.access_token,
        refreshToken: tokens.refresh_token,
      })

      // Save user info to secure storage
      await saveUserInfo(user.id, user.email)

      // Update state
      set({
        user,
        tokens,
        isAuthenticated: true,
        isLoading: false,
      })
    } catch (error) {
      console.error('Failed to save auth data to secure storage:', error)
      throw error
    }
  },

  /**
   * Logout action
   * Clears user, tokens from state and secure storage
   */
  logout: async () => {
    try {
      // Clear all secure storage data
      await clearAll()

      // Reset state
      set({
        user: null,
        tokens: null,
        isAuthenticated: false,
        isLoading: false,
      })
    } catch (error) {
      console.error('Failed to clear auth data from secure storage:', error)
      // Reset state anyway
      set({
        user: null,
        tokens: null,
        isAuthenticated: false,
        isLoading: false,
      })
    }
  },

  /**
   * Update user data in store
   */
  setUser: (user: User) => {
    set({ user })
  },

  /**
   * Update tokens in store and secure storage
   * Used by token refresh interceptor
   */
  updateTokens: async (tokens: AuthTokens) => {
    try {
      // Save new tokens to secure storage
      await saveTokens({
        accessToken: tokens.access_token,
        refreshToken: tokens.refresh_token,
      })

      // Update state
      set({ tokens })
    } catch (error) {
      console.error('Failed to update tokens in secure storage:', error)
      throw error
    }
  },

  /**
   * Load stored auth data from secure storage
   * Called on app startup to restore session
   */
  loadStoredAuth: async () => {
    try {
      set({ isLoading: true })

      // Get tokens and user info from secure storage
      const [storedTokens, userInfo] = await Promise.all([
        getTokens(),
        getUserInfo(),
      ])

      if (storedTokens && userInfo) {
        // Restore state from storage
        const tokens: AuthTokens = {
          access_token: storedTokens.accessToken,
          refresh_token: storedTokens.refreshToken,
          token_type: 'bearer',
          expires_in: 86400, // 24 hours
        }

        // Create minimal user object from stored info
        // Full user data will be fetched from /auth/me endpoint
        const user: Partial<User> = {
          id: userInfo.userId,
          email: userInfo.userEmail,
          full_name: '', // Will be populated by /auth/me
          is_verified: false,
          is_active: true,
          kyc_level: 0,
          created_at: '',
        }

        set({
          user: user as User,
          tokens,
          isAuthenticated: true,
          isLoading: false,
        })
      } else {
        // No stored auth data
        set({
          user: null,
          tokens: null,
          isAuthenticated: false,
          isLoading: false,
        })
      }
    } catch (error) {
      console.error('Failed to load stored auth data:', error)
      // If loading fails, assume not authenticated
      set({
        user: null,
        tokens: null,
        isAuthenticated: false,
        isLoading: false,
      })
    }
  },

  /**
   * Set loading state
   */
  setLoading: (loading: boolean) => {
    set({ isLoading: loading })
  },
}))

/**
 * Selector hooks for optimized re-renders
 */
export const useUser = () => useAuthStore((state) => state.user)
export const useIsAuthenticated = () => useAuthStore((state) => state.isAuthenticated)
export const useAuthLoading = () => useAuthStore((state) => state.isLoading)
