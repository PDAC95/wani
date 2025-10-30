/**
 * Auth Types
 * Export all authentication-related TypeScript types and interfaces
 */

export type {
  // Request/Response types
  RegisterRequest,
  RegisterResponse,
  LoginRequest,
  LoginResponse,
  RefreshTokenRequest,
  RefreshTokenResponse,
  PasswordResetRequest,
  PasswordResetConfirm,
  ChangePasswordRequest,

  // Entity types
  User,
  AuthTokens,

  // State types
  AuthState,

  // Error types
  AuthError,
  AuthFormErrors,
} from './auth.types'

// Validation schemas and types
export {
  registerSchema,
  loginSchema,
  passwordResetRequestSchema,
  passwordResetConfirmSchema,
  changePasswordSchema,
  type RegisterFormData,
  type LoginFormData,
  type PasswordResetRequestData,
  type PasswordResetConfirmData,
  type ChangePasswordData,
} from './validation.schema'