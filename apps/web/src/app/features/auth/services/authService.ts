/**
 * Auth Service
 *
 * API service for authentication operations.
 * Handles user registration, login, logout, token refresh, and password management.
 */

import { api } from '@/app/core/api/client'
import type {
  RegisterRequest,
  RegisterResponse,
  LoginRequest,
  LoginResponse,
  RefreshTokenRequest,
  RefreshTokenResponse,
  PasswordResetRequest,
  ChangePasswordRequest,
  User,
} from '../types/auth.types'

/**
 * Authentication API endpoints
 */
const AUTH_ENDPOINTS = {
  REGISTER: '/auth/register',
  LOGIN: '/auth/login',
  LOGOUT: '/auth/logout',
  REFRESH: '/auth/refresh',
  ME: '/auth/me',
  PASSWORD_RESET_REQUEST: '/auth/password-reset',
  PASSWORD_RESET_CONFIRM: '/auth/password-reset/confirm',
  CHANGE_PASSWORD: '/auth/change-password',
} as const

/**
 * Auth Service
 */
export const authService = {
  /**
   * Register a new user
   * @param data - User registration data
   * @returns User data and authentication tokens
   * @throws Error if registration fails
   *
   * @example
   * const response = await authService.register({
   *   email: 'user@example.com',
   *   password: 'SecurePass123!',
   *   full_name: 'John Doe',
   *   phone: '+1234567890'
   * })
   */
  register: async (data: RegisterRequest): Promise<RegisterResponse> => {
    try {
      const response = await api.post<RegisterResponse>(AUTH_ENDPOINTS.REGISTER, data)
      return response.data
    } catch (error) {
      console.error('Registration error:', error)
      throw error
    }
  },

  /**
   * Login user with credentials
   * @param credentials - Login credentials (email and password)
   * @returns User data and authentication tokens
   * @throws Error if login fails
   *
   * @example
   * const response = await authService.login({
   *   email: 'user@example.com',
   *   password: 'SecurePass123!'
   * })
   */
  login: async (credentials: LoginRequest): Promise<LoginResponse> => {
    try {
      const response = await api.post<LoginResponse>(AUTH_ENDPOINTS.LOGIN, credentials)
      return response.data
    } catch (error) {
      console.error('Login error:', error)
      throw error
    }
  },

  /**
   * Logout current user
   * Invalidates the current session and clears tokens
   * @throws Error if logout fails
   *
   * @example
   * await authService.logout()
   */
  logout: async (): Promise<void> => {
    try {
      await api.post(AUTH_ENDPOINTS.LOGOUT)
    } catch (error) {
      console.error('Logout error:', error)
      throw error
    }
  },

  /**
   * Refresh authentication tokens
   * @param data - Refresh token request
   * @returns New authentication tokens
   * @throws Error if refresh fails
   *
   * @example
   * const response = await authService.refreshToken({
   *   refresh_token: 'your_refresh_token'
   * })
   */
  refreshToken: async (data: RefreshTokenRequest): Promise<RefreshTokenResponse> => {
    try {
      const response = await api.post<RefreshTokenResponse>(AUTH_ENDPOINTS.REFRESH, data)
      return response.data
    } catch (error) {
      console.error('Token refresh error:', error)
      throw error
    }
  },

  /**
   * Get current authenticated user
   * @returns Current user data
   * @throws Error if not authenticated or request fails
   *
   * @example
   * const user = await authService.getCurrentUser()
   */
  getCurrentUser: async (): Promise<User> => {
    try {
      const response = await api.get<User>(AUTH_ENDPOINTS.ME)
      return response.data
    } catch (error) {
      console.error('Get current user error:', error)
      throw error
    }
  },

  /**
   * Request password reset
   * Sends a password reset email to the user
   * @param data - Password reset request data (email)
   * @throws Error if request fails
   *
   * @example
   * await authService.requestPasswordReset({
   *   email: 'user@example.com'
   * })
   */
  requestPasswordReset: async (data: PasswordResetRequest): Promise<void> => {
    try {
      await api.post(AUTH_ENDPOINTS.PASSWORD_RESET_REQUEST, data)
    } catch (error) {
      console.error('Password reset request error:', error)
      throw error
    }
  },

  /**
   * Confirm password reset with token
   * @param token - Password reset token from email
   * @param newPassword - New password
   * @throws Error if reset fails
   *
   * @example
   * await authService.confirmPasswordReset({
   *   token: 'reset_token_from_email',
   *   new_password: 'NewSecurePass123!'
   * })
   */
  confirmPasswordReset: async (token: string, newPassword: string): Promise<void> => {
    try {
      await api.post(AUTH_ENDPOINTS.PASSWORD_RESET_CONFIRM, {
        token,
        new_password: newPassword,
      })
    } catch (error) {
      console.error('Password reset confirm error:', error)
      throw error
    }
  },

  /**
   * Change password for authenticated user
   * @param data - Current and new password
   * @throws Error if change fails
   *
   * @example
   * await authService.changePassword({
   *   current_password: 'OldPass123!',
   *   new_password: 'NewSecurePass123!'
   * })
   */
  changePassword: async (data: ChangePasswordRequest): Promise<void> => {
    try {
      await api.post(AUTH_ENDPOINTS.CHANGE_PASSWORD, data)
    } catch (error) {
      console.error('Change password error:', error)
      throw error
    }
  },
}

/**
 * Type guard to check if error is an authentication error
 */
export const isAuthError = (error: unknown): boolean => {
  if (typeof error === 'object' && error !== null) {
    const err = error as any
    return err.response?.status === 401 || err.response?.status === 403
  }
  return false
}

/**
 * Get error message from API error
 */
export const getAuthErrorMessage = (error: unknown): string => {
  if (typeof error === 'object' && error !== null) {
    const err = error as any
    return err.response?.data?.message || err.message || 'An error occurred'
  }
  return 'An unknown error occurred'
}

export default authService
