/**
 * Auth TypeScript Types
 *
 * Type definitions for authentication features.
 * These types align with the FastAPI backend schemas.
 */

/**
 * User registration request payload
 * Maps to backend UserCreate schema
 */
export interface RegisterRequest {
  email: string
  password: string
  full_name: string
  phone?: string
}

/**
 * User registration response
 * Contains the created user (no tokens, requires email verification)
 * Matches backend SuccessResponse format
 */
export interface RegisterResponse {
  success: boolean
  message: string
  data: {
    user: User
  }
}

/**
 * User login request payload
 */
export interface LoginRequest {
  email: string
  password: string
}

/**
 * User login response
 * Contains the authenticated user and tokens
 * Matches backend SuccessResponse format
 */
export interface LoginResponse {
  success: boolean
  message: string
  data: {
    user: User
    tokens: AuthTokens
  }
}

/**
 * User entity
 * Maps to backend UserResponse schema
 */
export interface User {
  id: string
  email: string
  full_name: string
  phone?: string
  is_verified: boolean
  is_active: boolean
  kyc_level: number
  created_at: string
}

/**
 * Authentication tokens (JWT)
 * Used for maintaining user session
 */
export interface AuthTokens {
  access_token: string
  refresh_token: string
  token_type: string
  expires_in: number
}

/**
 * Token refresh request
 */
export interface RefreshTokenRequest {
  refresh_token: string
}

/**
 * Token refresh response
 * Matches backend SuccessResponse format
 */
export interface RefreshTokenResponse {
  success: boolean
  message: string
  data: AuthTokens
}

/**
 * Password reset request
 */
export interface PasswordResetRequest {
  email: string
}

/**
 * Password reset confirm
 */
export interface PasswordResetConfirm {
  token: string
  new_password: string
}

/**
 * Change password request (for authenticated users)
 */
export interface ChangePasswordRequest {
  current_password: string
  new_password: string
}

/**
 * Auth state for Zustand store (mobile)
 * Used with AsyncStorage persistence
 */
export interface AuthState {
  user: User | null
  tokens: AuthTokens | null
  isAuthenticated: boolean
  isLoading: boolean
}

/**
 * Auth error response from backend
 */
export interface AuthError {
  code: string
  message: string
  details?: Record<string, unknown>
}

/**
 * Auth form validation errors
 * Used for client-side form validation
 */
export interface AuthFormErrors {
  email?: string
  password?: string
  full_name?: string
  phone?: string
  current_password?: string
  new_password?: string
  general?: string
}
