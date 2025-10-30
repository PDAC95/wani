/**
 * useAuth Hook
 *
 * Convenient hook to access authentication state and actions.
 * Provides a clean interface to the auth store.
 */

import { useAuthStore } from '@/core/store'

/**
 * useAuth Hook
 *
 * @returns Auth state and actions
 *
 * @example
 * ```typescript
 * const { user, isAuthenticated, isLoading } = useAuth()
 *
 * if (isLoading) {
 *   return <LoadingScreen />
 * }
 *
 * if (!isAuthenticated) {
 *   return <LoginScreen />
 * }
 *
 * return <HomeScreen user={user} />
 * ```
 */
export function useAuth() {
  const user = useAuthStore((state) => state.user)
  const tokens = useAuthStore((state) => state.tokens)
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)
  const isLoading = useAuthStore((state) => state.isLoading)
  const login = useAuthStore((state) => state.login)
  const logout = useAuthStore((state) => state.logout)
  const setUser = useAuthStore((state) => state.setUser)
  const updateTokens = useAuthStore((state) => state.updateTokens)
  const loadStoredAuth = useAuthStore((state) => state.loadStoredAuth)

  return {
    // State
    user,
    tokens,
    isAuthenticated,
    isLoading,

    // Actions
    login,
    logout,
    setUser,
    updateTokens,
    loadStoredAuth,
  }
}
