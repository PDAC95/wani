/**
 * Application Providers
 * Combines all providers into a single component
 */

import { type ReactNode } from 'react'
import { QueryProvider } from './QueryProvider'

interface AppProvidersProps {
  children: ReactNode
}

export const AppProviders = ({ children }: AppProvidersProps) => {
  return (
    <QueryProvider>
      {/* Add more providers here as needed */}
      {/* <AuthProvider> */}
      {/* <ThemeProvider> */}
      {children}
    </QueryProvider>
  )
}

// Re-export individual providers for flexibility
export { QueryProvider } from './QueryProvider'
export { queryClient } from './QueryProvider'
