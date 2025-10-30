/**
 * Navigation Type Definitions
 * Type-safe navigation for React Navigation
 */

import type { NavigatorScreenParams } from '@react-navigation/native'

// Auth Stack
export type AuthStackParamList = {
  Welcome: undefined
  Login: undefined
  Register: undefined
  OTP: { phone: string }
  ForgotPassword: undefined
}

// Main Tab Navigator
export type MainTabParamList = {
  Home: undefined
  Wallet: undefined
  Send: undefined
  Transactions: undefined
  Profile: undefined
}

// Wallet Stack
export type WalletStackParamList = {
  WalletOverview: undefined
  WalletDetails: undefined
  AddFunds: undefined
  WithdrawFunds: undefined
}

// Transaction Stack
export type TransactionStackParamList = {
  TransactionList: undefined
  TransactionDetails: { transactionId: string }
  SendMoney: { recipientId?: string }
  ReceiveMoney: undefined
}

// Profile Stack
export type ProfileStackParamList = {
  ProfileOverview: undefined
  EditProfile: undefined
  Settings: undefined
  Security: undefined
  Documents: undefined
}

// Root Stack (contains all navigators)
export type RootStackParamList = {
  Auth: NavigatorScreenParams<AuthStackParamList>
  Main: NavigatorScreenParams<MainTabParamList>
  Wallet: NavigatorScreenParams<WalletStackParamList>
  Transaction: NavigatorScreenParams<TransactionStackParamList>
  Profile: NavigatorScreenParams<ProfileStackParamList>
}

// Navigation prop types
declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
