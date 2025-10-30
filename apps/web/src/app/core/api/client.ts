/**
 * API Client
 * Axios instance with interceptors for authenticated requests
 */

import axios, { type AxiosInstance } from 'axios'
import { env } from '../config/env'
import { setupRequestInterceptor, setupResponseInterceptor } from './interceptors'

/**
 * API Response Type
 */
export interface ApiResponse<T = any> {
  success: true
  data: T
  message: string
}

/**
 * Create Axios instance
 */
const createApiClient = (): AxiosInstance => {
  const instance = axios.create({
    baseURL: `${env.API_BASE_URL}/api/${env.API_VERSION}`,
    timeout: env.API_TIMEOUT,
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    withCredentials: false, // Set to true if using cookies
  })

  // Setup interceptors
  setupRequestInterceptor(instance)
  setupResponseInterceptor(instance)

  return instance
}

// Export API client instance
export const apiClient = createApiClient()

/**
 * API Client Methods
 * Wrapper methods for common HTTP operations
 */
export const api = {
  /**
   * GET request
   */
  get: <T = any>(url: string, config = {}) =>
    apiClient.get<ApiResponse<T>>(url, config).then((res) => res.data),

  /**
   * POST request
   */
  post: <T = any>(url: string, data?: any, config = {}) =>
    apiClient.post<ApiResponse<T>>(url, data, config).then((res) => res.data),

  /**
   * PUT request
   */
  put: <T = any>(url: string, data?: any, config = {}) =>
    apiClient.put<ApiResponse<T>>(url, data, config).then((res) => res.data),

  /**
   * PATCH request
   */
  patch: <T = any>(url: string, data?: any, config = {}) =>
    apiClient.patch<ApiResponse<T>>(url, data, config).then((res) => res.data),

  /**
   * DELETE request
   */
  delete: <T = any>(url: string, config = {}) =>
    apiClient.delete<ApiResponse<T>>(url, config).then((res) => res.data),
}

/**
 * Usage Examples:
 *
 * 1. Simple GET request:
 * const response = await api.get('/users')
 * console.log(response.data)
 *
 * 2. POST request with data:
 * const response = await api.post('/auth/login', {
 *   email: 'user@example.com',
 *   password: 'password123'
 * })
 *
 * 3. With TypeScript type:
 * interface User {
 *   id: string
 *   name: string
 * }
 * const response = await api.get<User>('/users/123')
 * console.log(response.data.name) // TypeScript knows this is a string
 *
 * 4. Error handling:
 * try {
 *   const response = await api.post('/auth/login', credentials)
 * } catch (error) {
 *   console.error(getErrorMessage(error))
 * }
 */

export default api
