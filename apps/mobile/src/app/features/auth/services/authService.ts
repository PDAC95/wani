/**
 * Auth Service
 *
 * Handles all authentication-related API calls to the backend.
 * Provides methods for login, register, token refresh, and password management.
 */

import { api } from '@/core/api'
import type {
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  RegisterResponse,
  RefreshTokenRequest,
  RefreshTokenResponse,
  PasswordResetRequest,
  PasswordResetConfirm,
  ChangePasswordRequest,
  User,
} from '../types'

/**
 * Authentication Service
 * All methods return promises that resolve with the API response data
 */
export const authService = {
  /**
   * Login user with email and password
   * @param credentials - User login credentials
   * @returns Promise with user data and auth tokens
   */
  login: async (credentials: LoginRequest): Promise<LoginResponse> => {
    const response = await api.post<LoginResponse>('/auth/login', credentials)
    return response.data
  },

  /**
   * Register new user
   * @param userData - User registration data
   * @returns Promise with created user and auth tokens
   */
  register: async (userData: RegisterRequest): Promise<RegisterResponse> => {
    const response = await api.post<RegisterResponse>('/auth/register', userData)
    return response.data
  },

  /**
   * Refresh authentication tokens
   * @param request - Refresh token request
   * @returns Promise with new auth tokens
   */
  refreshToken: async (request: RefreshTokenRequest): Promise<RefreshTokenResponse> => {
    const response = await api.post<RefreshTokenResponse>('/auth/refresh', request)
    return response.data
  },

  /**
   * Get current authenticated user
   * @returns Promise with current user data
   */
  getCurrentUser: async (): Promise<User> => {
    const response = await api.get<User>('/auth/me')
    return response.data
  },

  /**
   * Logout user (invalidate tokens on backend)
   * @returns Promise that resolves when logout is complete
   */
  logout: async (): Promise<void> => {
    await api.post('/auth/logout')
  },

  /**
   * Request password reset email
   * @param request - Password reset request with email
   * @returns Promise that resolves when email is sent
   */
  requestPasswordReset: async (request: PasswordResetRequest): Promise<void> => {
    await api.post('/auth/password-reset', request)
  },

  /**
   * Confirm password reset with token
   * @param request - Password reset confirmation with token and new password
   * @returns Promise that resolves when password is reset
   */
  confirmPasswordReset: async (request: PasswordResetConfirm): Promise<void> => {
    await api.post('/auth/password-reset/confirm', request)
  },

  /**
   * Change password for authenticated user
   * @param request - Change password request with current and new password
   * @returns Promise that resolves when password is changed
   */
  changePassword: async (request: ChangePasswordRequest): Promise<void> => {
    await api.post('/auth/change-password', request)
  },

  /**
   * Verify email address with token
   * @param token - Email verification token
   * @returns Promise that resolves when email is verified
   */
  verifyEmail: async (token: string): Promise<void> => {
    await api.post('/auth/verify-email', { token })
  },

  /**
   * Resend email verification
   * @returns Promise that resolves when verification email is sent
   */
  resendVerificationEmail: async (): Promise<void> => {
    await api.post('/auth/resend-verification')
  },
}
