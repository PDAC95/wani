/**
 * Query Keys Factory
 * Centralized query key management for React Query
 */

export const queryKeys = {
  // Auth
  auth: {
    all: ['auth'] as const,
    me: () => [...queryKeys.auth.all, 'me'] as const,
    session: () => [...queryKeys.auth.all, 'session'] as const,
  },

  // User
  user: {
    all: ['user'] as const,
    profile: () => [...queryKeys.user.all, 'profile'] as const,
    byId: (id: string) => [...queryKeys.user.all, 'detail', id] as const,
  },

  // Wallet
  wallet: {
    all: ['wallet'] as const,
    balance: () => [...queryKeys.wallet.all, 'balance'] as const,
    details: () => [...queryKeys.wallet.all, 'details'] as const,
    publicKey: () => [...queryKeys.wallet.all, 'publicKey'] as const,
  },

  // Transactions
  transactions: {
    all: ['transactions'] as const,
    list: (filters?: Record<string, any>) =>
      [...queryKeys.transactions.all, 'list', filters] as const,
    byId: (id: string) =>
      [...queryKeys.transactions.all, 'detail', id] as const,
    pending: () => [...queryKeys.transactions.all, 'pending'] as const,
    history: (page: number, limit: number) =>
      [...queryKeys.transactions.all, 'history', { page, limit }] as const,
  },

  // Beneficiaries
  beneficiaries: {
    all: ['beneficiaries'] as const,
    list: () => [...queryKeys.beneficiaries.all, 'list'] as const,
    byId: (id: string) =>
      [...queryKeys.beneficiaries.all, 'detail', id] as const,
  },

  // Exchange Rates
  exchangeRates: {
    all: ['exchangeRates'] as const,
    current: (from: string, to: string) =>
      [...queryKeys.exchangeRates.all, 'current', { from, to }] as const,
  },
} as const

/**
 * Helper to invalidate all queries for a specific domain
 */
export const invalidateQueries = {
  auth: () => queryKeys.auth.all,
  user: () => queryKeys.user.all,
  wallet: () => queryKeys.wallet.all,
  transactions: () => queryKeys.transactions.all,
  beneficiaries: () => queryKeys.beneficiaries.all,
  exchangeRates: () => queryKeys.exchangeRates.all,
}
