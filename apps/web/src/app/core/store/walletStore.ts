/**
 * Wallet Store
 * Manages wallet state using Zustand
 */

import { create } from 'zustand'

// Types
export interface WalletBalance {
  available: number
  pending: number
  total: number
  currency: string
}

export interface Wallet {
  id: string
  publicKey: string
  balance: WalletBalance
  isActivated: boolean
  createdAt: string
  updatedAt: string
}

interface WalletState {
  // State
  wallet: Wallet | null
  isLoading: boolean
  error: string | null

  // Actions
  setWallet: (wallet: Wallet) => void
  updateBalance: (balance: WalletBalance) => void
  clearWallet: () => void
  setLoading: (isLoading: boolean) => void
  setError: (error: string | null) => void

  // Helpers
  getAvailableBalance: () => number
  hasWallet: () => boolean
}

// Initial state
const initialState = {
  wallet: null,
  isLoading: false,
  error: null,
}

// Create wallet store
export const useWalletStore = create<WalletState>((set, get) => ({
  ...initialState,

  // Set wallet
  setWallet: (wallet) =>
    set({
      wallet,
      error: null,
    }),

  // Update balance
  updateBalance: (balance) =>
    set((state) => ({
      wallet: state.wallet ? { ...state.wallet, balance } : null,
    })),

  // Clear wallet
  clearWallet: () => set(initialState),

  // Set loading
  setLoading: (isLoading) => set({ isLoading }),

  // Set error
  setError: (error) => set({ error }),

  // Get available balance
  getAvailableBalance: () => {
    const { wallet } = get()
    return wallet?.balance.available || 0
  },

  // Check if user has wallet
  hasWallet: () => {
    const { wallet } = get()
    return wallet !== null && wallet.isActivated
  },
}))

// Selectors
export const selectWallet = (state: WalletState) => state.wallet
export const selectBalance = (state: WalletState) => state.wallet?.balance
export const selectIsLoading = (state: WalletState) => state.isLoading
export const selectError = (state: WalletState) => state.error
