/**
 * Axios API Client
 *
 * Configured axios instance for making API requests to the backend.
 * Includes request/response interceptors for authentication and error handling.
 */

import axios, { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from 'axios'
import Constants from 'expo-constants'
import { getToken, saveTokens, clearAll, STORAGE_KEYS } from '@/core/storage'

/**
 * API Error Response Structure
 * Matches the backend error response format
 */
interface ApiErrorResponse {
  message?: string
  code?: string
  details?: Record<string, unknown>
}

// Get API URL from Expo config
const API_URL = Constants.expoConfig?.extra?.apiUrl || 'http://localhost:8000'

// Debug: Log API URL
console.log('🔗 API Configuration:')
console.log('   API_URL:', API_URL)
console.log('   baseURL:', `${API_URL}/api/v1`)

// Create axios instance
export const api = axios.create({
  baseURL: `${API_URL}/api/v1`,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
})

/**
 * Public endpoints that don't require authentication
 */
const PUBLIC_ENDPOINTS = ['/auth/login', '/auth/register', '/auth/refresh', '/health']

/**
 * Check if endpoint is public
 */
function isPublicEndpoint(url?: string): boolean {
  if (!url) return false
  return PUBLIC_ENDPOINTS.some((endpoint) => url.includes(endpoint))
}

/**
 * Request Interceptor
 * Adds authentication token to all requests (except public endpoints)
 */
api.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    // Skip auth token for public endpoints
    if (isPublicEndpoint(config.url)) {
      return config
    }

    try {
      // Get access token from secure storage
      const accessToken = await getToken(STORAGE_KEYS.ACCESS_TOKEN)

      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`
      }
    } catch (error) {
      // Silently skip if no token available (user not logged in)
      // This is normal for apps that haven't authenticated yet
    }

    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

/**
 * Response Interceptor
 * Handles common response scenarios and errors
 */
api.interceptors.response.use(
  (response: AxiosResponse) => {
    // Return successful response
    return response
  },
  async (error: AxiosError<ApiErrorResponse>) => {
    const originalRequest = error.config

    // Handle 401 Unauthorized
    if (error.response?.status === 401 && originalRequest) {
      try {
        // Get refresh token from secure storage
        const refreshToken = await getToken(STORAGE_KEYS.REFRESH_TOKEN)

        if (refreshToken) {
          // Try to refresh token
          const response = await axios.post(
            `${API_URL}/api/v1/auth/refresh`,
            { refresh_token: refreshToken }
          )

          const newTokens = response.data.data // Backend returns { success, message, data: tokens }

          // Update stored tokens in secure storage
          await saveTokens({
            accessToken: newTokens.access_token,
            refreshToken: newTokens.refresh_token,
          })

          // Retry original request with new token
          if (originalRequest.headers) {
            originalRequest.headers.Authorization = `Bearer ${newTokens.access_token}`
          }
          return api(originalRequest)
        }
      } catch (refreshError) {
        // Refresh failed, clear all auth data
        await clearAll()
        // Note: Navigation to login will be handled by RootNavigator based on auth state
        console.error('Token refresh failed:', refreshError)
      }
    }

    // Transform error to a consistent format
    const errorMessage = error.response?.data?.message || error.message || 'An error occurred'
    const errorCode = error.response?.data?.code || 'UNKNOWN_ERROR'

    return Promise.reject({
      code: errorCode,
      message: errorMessage,
      details: error.response?.data?.details,
      status: error.response?.status,
    })
  }
)

/**
 * API Client configuration
 */
export const apiConfig = {
  baseURL: API_URL,
  version: 'v1',
  timeout: 30000,
}

/**
 * Helper to check if error is from API
 */
export function isApiError(error: unknown): error is {
  code: string
  message: string
  details?: Record<string, unknown>
  status?: number
} {
  return (
    typeof error === 'object' &&
    error !== null &&
    'code' in error &&
    'message' in error
  )
}
