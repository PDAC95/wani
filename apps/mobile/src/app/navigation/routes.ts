/**
 * Navigation Route Constants
 * Centralized route names for type-safe navigation
 */

export const AUTH_ROUTES = {
  LOGIN: 'Login',
  REGISTER: 'Register',
  OTP: 'OTP',
  FORGOT_PASSWORD: 'ForgotPassword',
} as const

export const MAIN_ROUTES = {
  HOME: 'Home',
  WALLET: 'Wallet',
  SEND: 'Send',
  TRANSACTIONS: 'Transactions',
  PROFILE: 'Profile',
} as const

export const WALLET_ROUTES = {
  OVERVIEW: 'WalletOverview',
  DETAILS: 'WalletDetails',
  ADD_FUNDS: 'AddFunds',
  WITHDRAW_FUNDS: 'WithdrawFunds',
} as const

export const TRANSACTION_ROUTES = {
  LIST: 'TransactionList',
  DETAILS: 'TransactionDetails',
  SEND_MONEY: 'SendMoney',
  RECEIVE_MONEY: 'ReceiveMoney',
} as const

export const PROFILE_ROUTES = {
  OVERVIEW: 'ProfileOverview',
  EDIT: 'EditProfile',
  SETTINGS: 'Settings',
  SECURITY: 'Security',
  DOCUMENTS: 'Documents',
} as const

export const ROOT_ROUTES = {
  AUTH: 'Auth',
  MAIN: 'Main',
  WALLET: 'Wallet',
  TRANSACTION: 'Transaction',
  PROFILE: 'Profile',
} as const
