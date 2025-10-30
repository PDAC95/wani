/**
 * useAuth Hook
 *
 * Main authentication hook that exposes auth state and actions.
 * Combines Zustand auth store with auth mutations.
 */

import { useAuthStore } from '@/app/core/store/authStore'
import { useLogin } from './useLogin'
import { useLogout } from './useLogout'
import { useRegister } from './useRegister'
import type { User } from '@/app/core/store/authStore'
import type { LoginRequest, RegisterRequest } from '../types/auth.types'

/**
 * useAuth return type
 */
export interface UseAuthReturn {
  // State
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  tokens: {
    accessToken: string | null
    refreshToken: string | null
  }

  // Actions
  login: (credentials: LoginRequest) => void
  logout: () => void
  register: (data: RegisterRequest) => void

  // Loading states
  isLoggingIn: boolean
  isLoggingOut: boolean
  isRegistering: boolean

  // Token helpers
  isTokenExpired: () => boolean
  getAccessToken: () => string | null
  getRefreshToken: () => string | null
}

/**
 * useAuth Hook
 *
 * Main hook for authentication in the app.
 * Provides auth state and mutation functions.
 *
 * @returns Auth state and actions
 *
 * @example
 * ```tsx
 * function MyComponent() {
 *   const {
 *     user,
 *     isAuthenticated,
 *     login,
 *     logout,
 *     isLoggingIn
 *   } = useAuth()
 *
 *   if (!isAuthenticated) {
 *     return <LoginPage />
 *   }
 *
 *   return (
 *     <div>
 *       <h1>Welcome {user?.firstName}!</h1>
 *       <button onClick={() => logout()}>Logout</button>
 *     </div>
 *   )
 * }
 * ```
 *
 * @example
 * ```tsx
 * // Using in a form
 * function LoginForm() {
 *   const { login, isLoggingIn } = useAuth()
 *   const { register, handleSubmit } = useForm<LoginRequest>()
 *
 *   const onSubmit = (data: LoginRequest) => {
 *     login(data)
 *   }
 *
 *   return (
 *     <form onSubmit={handleSubmit(onSubmit)}>
 *       <input {...register('email')} />
 *       <input {...register('password')} type="password" />
 *       <button disabled={isLoggingIn}>
 *         {isLoggingIn ? 'Logging in...' : 'Login'}
 *       </button>
 *     </form>
 *   )
 * }
 * ```
 */
export const useAuth = (): UseAuthReturn => {
  // Get auth state from Zustand store
  const user = useAuthStore((state) => state.user)
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)
  const storeIsLoading = useAuthStore((state) => state.isLoading)
  const authTokens = useAuthStore((state) => state.tokens)
  const isTokenExpired = useAuthStore((state) => state.isTokenExpired)
  const getAccessToken = useAuthStore((state) => state.getAccessToken)
  const getRefreshToken = useAuthStore((state) => state.getRefreshToken)

  // Get mutation hooks
  const { mutate: loginMutate, isPending: isLoggingIn } = useLogin()
  const { mutate: logoutMutate, isPending: isLoggingOut } = useLogout()
  const { mutate: registerMutate, isPending: isRegistering } = useRegister()

  // Combined loading state
  const isLoading = storeIsLoading || isLoggingIn || isLoggingOut || isRegistering

  return {
    // State
    user,
    isAuthenticated,
    isLoading,
    tokens: {
      accessToken: authTokens?.accessToken || null,
      refreshToken: authTokens?.refreshToken || null,
    },

    // Actions
    login: loginMutate,
    logout: logoutMutate,
    register: registerMutate,

    // Loading states
    isLoggingIn,
    isLoggingOut,
    isRegistering,

    // Token helpers
    isTokenExpired,
    getAccessToken,
    getRefreshToken,
  }
}

export default useAuth
