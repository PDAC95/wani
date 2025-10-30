/**
 * QueryProvider
 *
 * TanStack Query (React Query) provider configuration.
 * Wraps the app to enable data fetching, caching, and synchronization.
 */

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactNode } from 'react'

/**
 * Query Client Configuration
 *
 * Default options for all queries and mutations in the app.
 */
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Queries configuration
      retry: 2, // Retry failed requests 2 times
      staleTime: 1000 * 60 * 5, // Data is fresh for 5 minutes
      gcTime: 1000 * 60 * 10, // Cache data for 10 minutes (formerly cacheTime)
      refetchOnWindowFocus: false, // Don't refetch on window focus (mobile)
      refetchOnReconnect: true, // Refetch when internet reconnects
    },
    mutations: {
      // Mutations configuration
      retry: 1, // Retry failed mutations once
      onError: (error) => {
        // Global error handler for mutations
        console.error('Mutation error:', error)
      },
    },
  },
})

interface QueryProviderProps {
  children: ReactNode
}

/**
 * QueryProvider Component
 *
 * Provides TanStack Query client to the entire app.
 * Must wrap all components that use query hooks (useQuery, useMutation).
 *
 * @example
 * ```tsx
 * <QueryProvider>
 *   <App />
 * </QueryProvider>
 * ```
 */
export function QueryProvider({ children }: QueryProviderProps) {
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
}

// Export the query client for advanced use cases
export { queryClient }
