/**
 * Store Index
 * Central export for all Zustand stores
 */

// Auth Store
export {
  useAuthStore,
  selectUser,
  selectIsAuthenticated,
  selectTokens,
  selectIsLoading as selectAuthIsLoading,
  selectAccessToken,
  selectRefreshToken,
} from './authStore'

export type { User, AuthTokens } from '@/app/features/auth/types/auth.types'

// Wallet Store
export {
  useWalletStore,
  selectWallet,
  selectBalance,
  selectIsLoading as selectWalletIsLoading,
  selectError as selectWalletError,
} from './walletStore'

export type { Wallet, WalletBalance } from './walletStore'

/**
 * Usage Examples:
 *
 * 1. Using stores in components:
 *
 * import { useAuthStore, useWalletStore } from '@/app/core/store'
 *
 * function MyComponent() {
 *   const user = useAuthStore((state) => state.user)
 *   const login = useAuthStore((state) => state.login)
 *   const wallet = useWalletStore((state) => state.wallet)
 *
 *   // Or use selectors for better performance
 *   const isAuthenticated = useAuthStore(selectIsAuthenticated)
 * }
 *
 * 2. Accessing store outside components:
 *
 * import { useAuthStore } from '@/app/core/store'
 *
 * // Get current state
 * const user = useAuthStore.getState().user
 *
 * // Call actions
 * useAuthStore.getState().logout()
 *
 * 3. Subscribing to changes:
 *
 * const unsubscribe = useAuthStore.subscribe(
 *   (state) => state.user,
 *   (user) => {
 *     console.log('User changed:', user)
 *   }
 * )
 */
