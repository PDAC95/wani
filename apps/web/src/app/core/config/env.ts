/**
 * Environment Configuration
 * Centralized environment variables with validation
 */

interface EnvConfig {
  // API Configuration
  API_BASE_URL: string
  API_VERSION: string
  API_TIMEOUT: number

  // App Configuration
  APP_ENV: 'development' | 'staging' | 'production'
  APP_NAME: string

  // Feature Flags
  ENABLE_DEVTOOLS: boolean
  ENABLE_LOGS: boolean
}

// Validate required environment variables
const getEnvVar = (key: string, defaultValue?: string): string => {
  const value = import.meta.env[key] || defaultValue
  if (!value) {
    throw new Error(`Missing required environment variable: ${key}`)
  }
  return value
}

// Environment configuration
export const env: EnvConfig = {
  // API
  API_BASE_URL: getEnvVar('VITE_API_BASE_URL', 'http://localhost:8000'),
  API_VERSION: getEnvVar('VITE_API_VERSION', 'v1'),
  API_TIMEOUT: Number(getEnvVar('VITE_API_TIMEOUT', '30000')),

  // App
  APP_ENV: (import.meta.env.MODE as EnvConfig['APP_ENV']) || 'development',
  APP_NAME: getEnvVar('VITE_APP_NAME', 'Wani'),

  // Feature Flags
  ENABLE_DEVTOOLS: import.meta.env.DEV,
  ENABLE_LOGS: import.meta.env.DEV,
}

// Computed values
export const isDevelopment = env.APP_ENV === 'development'
export const isProduction = env.APP_ENV === 'production'
export const isStaging = env.APP_ENV === 'staging'

// API URL builder
export const getApiUrl = (path: string): string => {
  const cleanPath = path.startsWith('/') ? path : `/${path}`
  return `${env.API_BASE_URL}/api/${env.API_VERSION}${cleanPath}`
}
