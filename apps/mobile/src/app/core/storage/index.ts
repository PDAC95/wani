/**
 * Storage Module Exports
 *
 * Centralized exports for all storage functionality
 */

export {
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

  // Types
  type StoredTokens,

  // Error
  SecureStorageError,
} from './secureStorage'

// Default export
export { default } from './secureStorage'
