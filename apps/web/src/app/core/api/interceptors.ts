/**
 * Axios Interceptors
 * Request and response interceptors for authentication and error handling
 */

import type { AxiosInstance, InternalAxiosRequestConfig, AxiosResponse, AxiosError } from 'axios'
import { useAuthStore } from '../store/authStore'
import { env } from '../config/env'

/**
 * Setup request interceptor
 * Adds authentication token to requests
 */
export const setupRequestInterceptor = (axiosInstance: AxiosInstance) => {
  axiosInstance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      // Get access token from auth store
      const token = useAuthStore.getState().getAccessToken()

      // Add token to Authorization header if available
      if (token && !config.headers.Authorization) {
        config.headers.Authorization = `Bearer ${token}`
      }

      // Add custom headers
      config.headers['Content-Type'] = config.headers['Content-Type'] || 'application/json'
      config.headers['X-Client-Version'] = '1.0.0'
      config.headers['X-Client-Platform'] = 'web'

      // Log request in development
      if (env.ENABLE_LOGS) {
        console.log('🚀 API Request:', {
          method: config.method?.toUpperCase(),
          url: config.url,
          data: config.data,
        })
      }

      return config
    },
    (error) => {
      console.error('❌ Request Error:', error)
      return Promise.reject(error)
    }
  )
}

/**
 * Setup response interceptor
 * Handles successful responses and errors
 */
export const setupResponseInterceptor = (axiosInstance: AxiosInstance) => {
  axiosInstance.interceptors.response.use(
    (response: AxiosResponse) => {
      // Log response in development
      if (env.ENABLE_LOGS) {
        console.log('✅ API Response:', {
          status: response.status,
          url: response.config.url,
          data: response.data,
        })
      }

      return response
    },
    async (error: AxiosError) => {
      const originalRequest = error.config as InternalAxiosRequestConfig & {
        _retry?: boolean
      }

      // Log error in development
      if (env.ENABLE_LOGS) {
        console.error('❌ API Error:', {
          status: error.response?.status,
          url: error.config?.url,
          message: error.message,
          data: error.response?.data,
        })
      }

      // Handle 401 Unauthorized - Token expired
      if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true

        try {
          // Try to refresh token
          const refreshToken = useAuthStore.getState().getRefreshToken()

          if (refreshToken) {
            // Call refresh token endpoint
            const response = await axiosInstance.post('/auth/refresh', {
              refresh_token: refreshToken,
            })

            const { access_token, refresh_token, token_type, expires_in } = response.data.data

            // Update tokens in store
            useAuthStore.getState().setTokens({
              access_token,
              refresh_token,
              token_type,
              expires_in,
            })

            // Retry original request with new token
            originalRequest.headers.Authorization = `Bearer ${access_token}`
            return axiosInstance(originalRequest)
          }
        } catch (refreshError) {
          // Refresh failed - logout user
          console.error('Token refresh failed:', refreshError)
          useAuthStore.getState().logout()

          // Redirect to login
          if (typeof window !== 'undefined') {
            window.location.href = '/login'
          }
        }
      }

      // Handle 403 Forbidden
      if (error.response?.status === 403) {
        console.error('Access forbidden:', error.response.data)
      }

      // Handle 404 Not Found
      if (error.response?.status === 404) {
        console.error('Resource not found:', error.config?.url)
      }

      // Handle 500 Server Error
      if (error.response?.status === 500) {
        console.error('Server error:', error.response.data)
      }

      // Handle network errors
      if (error.message === 'Network Error') {
        console.error('Network error - Check your internet connection')
      }

      // Handle timeout errors
      if (error.code === 'ECONNABORTED') {
        console.error('Request timeout - Server is taking too long to respond')
      }

      return Promise.reject(error)
    }
  )
}

/**
 * API Error Response Type
 */
export interface ApiErrorResponse {
  success: false
  message: string
  errors?: Record<string, string[]>
  code?: string
}

/**
 * Extract error message from API error
 */
export const getErrorMessage = (error: unknown): string => {
  if (error instanceof Error) {
    const axiosError = error as AxiosError<ApiErrorResponse>

    // API error response
    if (axiosError.response?.data?.message) {
      return axiosError.response.data.message
    }

    // Network error
    if (axiosError.message === 'Network Error') {
      return 'Network error. Please check your internet connection.'
    }

    // Timeout error
    if (axiosError.code === 'ECONNABORTED') {
      return 'Request timeout. Please try again.'
    }

    // Generic error
    return axiosError.message
  }

  return 'An unexpected error occurred'
}
