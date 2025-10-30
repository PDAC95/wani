/**
 * Secure Storage Service
 *
 * Provides secure storage for sensitive data like authentication tokens.
 * Uses platform-specific secure storage:
 * - iOS: Keychain
 * - Android: EncryptedSharedPreferences
 *
 * This module provides functions for storing, retrieving, and deleting
 * authentication tokens securely on the device.
 */

import * as SecureStore from 'expo-secure-store'
import { Platform } from 'react-native'

/**
 * Storage Keys
 * Constants for secure storage keys
 */
export const STORAGE_KEYS = {
  ACCESS_TOKEN: 'wani_access_token',
  REFRESH_TOKEN: 'wani_refresh_token',
  USER_ID: 'wani_user_id',
  USER_EMAIL: 'wani_user_email',
} as const

/**
 * Token Storage Interface
 * Represents the structure of stored tokens
 */
export interface StoredTokens {
  accessToken: string
  refreshToken: string
}

/**
 * Storage Error
 * Custom error for storage operations
 */
export class SecureStorageError extends Error {
  constructor(
    message: string,
    public code: 'SAVE_FAILED' | 'RETRIEVE_FAILED' | 'DELETE_FAILED' | 'NOT_AVAILABLE',
    public originalError?: Error
  ) {
    super(message)
    this.name = 'SecureStorageError'
  }
}

/**
 * Check if secure storage is available on the device
 * Note: SecureStore is not available on web
 */
export function isSecureStorageAvailable(): boolean {
  return Platform.OS !== 'web'
}

/**
 * Save a single token to secure storage
 *
 * @param key - Storage key
 * @param value - Token value to store
 * @throws {SecureStorageError} If storage is not available or save fails
 *
 * @example
 * ```typescript
 * await saveToken(STORAGE_KEYS.ACCESS_TOKEN, 'eyJhbGc...')
 * ```
 */
export async function saveToken(key: string, value: string): Promise<void> {
  try {
    if (!isSecureStorageAvailable()) {
      throw new SecureStorageError(
        'Secure storage is not available on this platform',
        'NOT_AVAILABLE'
      )
    }

    await SecureStore.setItemAsync(key, value)
  } catch (error) {
    throw new SecureStorageError(
      `Failed to save token with key: ${key}`,
      'SAVE_FAILED',
      error as Error
    )
  }
}

/**
 * Retrieve a single token from secure storage
 *
 * @param key - Storage key
 * @returns Token value or null if not found
 * @throws {SecureStorageError} If storage is not available or retrieval fails
 *
 * @example
 * ```typescript
 * const token = await getToken(STORAGE_KEYS.ACCESS_TOKEN)
 * if (token) {
 *   // Use token
 * }
 * ```
 */
export async function getToken(key: string): Promise<string | null> {
  try {
    if (!isSecureStorageAvailable()) {
      throw new SecureStorageError(
        'Secure storage is not available on this platform',
        'NOT_AVAILABLE'
      )
    }

    const value = await SecureStore.getItemAsync(key)
    return value
  } catch (error) {
    throw new SecureStorageError(
      `Failed to retrieve token with key: ${key}`,
      'RETRIEVE_FAILED',
      error as Error
    )
  }
}

/**
 * Remove a single token from secure storage
 *
 * @param key - Storage key
 * @throws {SecureStorageError} If storage is not available or deletion fails
 *
 * @example
 * ```typescript
 * await removeToken(STORAGE_KEYS.ACCESS_TOKEN)
 * ```
 */
export async function removeToken(key: string): Promise<void> {
  try {
    if (!isSecureStorageAvailable()) {
      throw new SecureStorageError(
        'Secure storage is not available on this platform',
        'NOT_AVAILABLE'
      )
    }

    await SecureStore.deleteItemAsync(key)
  } catch (error) {
    throw new SecureStorageError(
      `Failed to remove token with key: ${key}`,
      'DELETE_FAILED',
      error as Error
    )
  }
}

/**
 * Save authentication tokens (access + refresh) to secure storage
 *
 * @param tokens - Object containing access and refresh tokens
 * @throws {SecureStorageError} If storage is not available or save fails
 *
 * @example
 * ```typescript
 * await saveTokens({
 *   accessToken: 'eyJhbGc...',
 *   refreshToken: 'eyJhbGc...'
 * })
 * ```
 */
export async function saveTokens(tokens: StoredTokens): Promise<void> {
  try {
    await Promise.all([
      saveToken(STORAGE_KEYS.ACCESS_TOKEN, tokens.accessToken),
      saveToken(STORAGE_KEYS.REFRESH_TOKEN, tokens.refreshToken),
    ])
  } catch (error) {
    throw new SecureStorageError(
      'Failed to save authentication tokens',
      'SAVE_FAILED',
      error as Error
    )
  }
}

/**
 * Retrieve authentication tokens (access + refresh) from secure storage
 *
 * @returns Object with tokens or null if tokens don't exist
 * @throws {SecureStorageError} If storage is not available or retrieval fails
 *
 * @example
 * ```typescript
 * const tokens = await getTokens()
 * if (tokens) {
 *   console.log('Access token:', tokens.accessToken)
 *   console.log('Refresh token:', tokens.refreshToken)
 * }
 * ```
 */
export async function getTokens(): Promise<StoredTokens | null> {
  try {
    const [accessToken, refreshToken] = await Promise.all([
      getToken(STORAGE_KEYS.ACCESS_TOKEN),
      getToken(STORAGE_KEYS.REFRESH_TOKEN),
    ])

    if (!accessToken || !refreshToken) {
      return null
    }

    return {
      accessToken,
      refreshToken,
    }
  } catch (error) {
    throw new SecureStorageError(
      'Failed to retrieve authentication tokens',
      'RETRIEVE_FAILED',
      error as Error
    )
  }
}

/**
 * Remove all authentication tokens from secure storage
 *
 * @throws {SecureStorageError} If storage is not available or deletion fails
 *
 * @example
 * ```typescript
 * await clearTokens()
 * console.log('All tokens cleared')
 * ```
 */
export async function clearTokens(): Promise<void> {
  try {
    await Promise.all([
      removeToken(STORAGE_KEYS.ACCESS_TOKEN),
      removeToken(STORAGE_KEYS.REFRESH_TOKEN),
    ])
  } catch (error) {
    throw new SecureStorageError(
      'Failed to clear authentication tokens',
      'DELETE_FAILED',
      error as Error
    )
  }
}

/**
 * Clear all secure storage data (tokens + user info)
 * Use this when user logs out completely
 *
 * @throws {SecureStorageError} If storage is not available or deletion fails
 *
 * @example
 * ```typescript
 * await clearAll()
 * console.log('All secure data cleared')
 * ```
 */
export async function clearAll(): Promise<void> {
  try {
    await Promise.all([
      removeToken(STORAGE_KEYS.ACCESS_TOKEN),
      removeToken(STORAGE_KEYS.REFRESH_TOKEN),
      removeToken(STORAGE_KEYS.USER_ID),
      removeToken(STORAGE_KEYS.USER_EMAIL),
    ])
  } catch (error) {
    throw new SecureStorageError(
      'Failed to clear all secure storage data',
      'DELETE_FAILED',
      error as Error
    )
  }
}

/**
 * Save user information to secure storage
 *
 * @param userId - User ID
 * @param userEmail - User email
 * @throws {SecureStorageError} If storage is not available or save fails
 *
 * @example
 * ```typescript
 * await saveUserInfo('user-uuid', 'user@example.com')
 * ```
 */
export async function saveUserInfo(userId: string, userEmail: string): Promise<void> {
  try {
    await Promise.all([
      saveToken(STORAGE_KEYS.USER_ID, userId),
      saveToken(STORAGE_KEYS.USER_EMAIL, userEmail),
    ])
  } catch (error) {
    throw new SecureStorageError(
      'Failed to save user information',
      'SAVE_FAILED',
      error as Error
    )
  }
}

/**
 * Retrieve user information from secure storage
 *
 * @returns Object with user info or null if not found
 * @throws {SecureStorageError} If storage is not available or retrieval fails
 *
 * @example
 * ```typescript
 * const userInfo = await getUserInfo()
 * if (userInfo) {
 *   console.log('User ID:', userInfo.userId)
 *   console.log('User Email:', userInfo.userEmail)
 * }
 * ```
 */
export async function getUserInfo(): Promise<{ userId: string; userEmail: string } | null> {
  try {
    const [userId, userEmail] = await Promise.all([
      getToken(STORAGE_KEYS.USER_ID),
      getToken(STORAGE_KEYS.USER_EMAIL),
    ])

    if (!userId || !userEmail) {
      return null
    }

    return {
      userId,
      userEmail,
    }
  } catch (error) {
    throw new SecureStorageError(
      'Failed to retrieve user information',
      'RETRIEVE_FAILED',
      error as Error
    )
  }
}

/**
 * Default export with all storage functions
 */
export default {
  // Core functions
  saveToken,
  getToken,
  removeToken,

  // Token management
  saveTokens,
  getTokens,
  clearTokens,

  // User info management
  saveUserInfo,
  getUserInfo,

  // Utilities
  clearAll,
  isSecureStorageAvailable,

  // Constants
  STORAGE_KEYS,
}
