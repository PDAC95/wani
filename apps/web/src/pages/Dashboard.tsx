/**
 * Dashboard Page - Ultra-Modern Edition
 * Premium design with glassmorphism, gradients, and animations
 */

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  BalanceCard,
  QuickActionButton,
  PayIcon,
  TransferIcon,
  ReceiveIcon,
  ScanIcon,
  TransactionItem,
  type Transaction,
  Avatar,
} from '@/components/ui'

// Mock data - replace with real data from API
const mockTransactions: Transaction[] = [
  {
    id: '1',
    name: 'Eva Novak',
    amount: 5710.20,
    type: 'received',
    timestamp: '2 min ago',
  },
  {
    id: '2',
    name: 'Binance',
    amount: 714.00,
    type: 'received',
    timestamp: '1h ago',
  },
  {
    id: '3',
    name: 'Henrik Jansen',
    amount: 428.00,
    type: 'received',
    timestamp: 'Yesterday',
  },
  {
    id: '4',
    name: 'Multiplex',
    amount: 124.55,
    type: 'paid',
    timestamp: 'Yesterday',
  },
  {
    id: '5',
    name: 'Nike Store',
    amount: 328.96,
    type: 'paid',
    timestamp: '19 Nov',
  },
]

const DashboardPage = () => {
  const navigate = useNavigate()
  const [isBalanceVisible, setIsBalanceVisible] = useState(true)

  // Mock user data - replace with real data from auth store
  const userName = 'Leandro'
  const balance = 26887.09
  const balanceChange = 421.03
  const currency = 'USD'
  const exchangeRate = '1 USD = EUR 0.95 = GBR 0.79'

  return (
    <div className="min-h-screen pb-24">
      {/* Premium Header with Glassmorphism */}
      <div className="sticky top-0 z-50 glass border-b border-white/40">
        <div className="container-wani py-5">
          <div className="flex items-center justify-between">
            {/* User Info */}
            <div className="flex items-center gap-4">
              <Avatar fallback={userName} size="lg" />
              <div>
                <p className="text-sm text-dark/60 font-medium">Welcome back,</p>
                <h2 className="text-xl font-bold text-dark">{userName}</h2>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-3">
              <button className="btn-icon group">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                  />
                </svg>
                {/* Notification Badge */}
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-coral-500 rounded-full border-2 border-white" />
              </button>

              <button
                className="btn-icon"
                onClick={() => navigate('/profile')}
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container-wani pt-6 space-y-8">
        {/* Hero Balance Card with Animation */}
        <div className="animate-slide-up">
          <BalanceCard
            currency={currency}
            amount={balance}
            change={balanceChange}
            exchangeRate={exchangeRate}
            onToggleVisibility={() => setIsBalanceVisible(!isBalanceVisible)}
            isVisible={isBalanceVisible}
          />
        </div>

        {/* Quick Actions Grid */}
        <div className="animate-fade-in" style={{ animationDelay: '100ms' }}>
          <div className="grid grid-cols-4 gap-4 px-2">
            <QuickActionButton
              icon={<PayIcon />}
              label="Pay"
              onClick={() => navigate('/send-money')}
            />
            <QuickActionButton
              icon={<TransferIcon />}
              label="Transfer"
              onClick={() => navigate('/send-money')}
            />
            <QuickActionButton
              icon={<ReceiveIcon />}
              label="Receive"
              onClick={() => navigate('/wallet')}
            />
            <QuickActionButton
              icon={<ScanIcon />}
              label="Scan"
              variant="secondary"
              onClick={() => {}}
            />
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 gap-4 animate-fade-in" style={{ animationDelay: '200ms' }}>
          <div className="stats-card">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-success to-success/80 flex items-center justify-center">
                <svg
                  className="w-5 h-5 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M7 11l5-5m0 0l5 5m-5-5v12"
                  />
                </svg>
              </div>
              <div>
                <p className="text-xs text-dark/60 font-medium">This Month</p>
                <p className="text-2xl font-black text-dark">$12,487</p>
              </div>
            </div>
            <p className="text-xs text-success font-bold">+24.5% from last month</p>
          </div>

          <div className="stats-card">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-wani-400 to-coral-500 flex items-center justify-center">
                <svg
                  className="w-5 h-5 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
              <div>
                <p className="text-xs text-dark/60 font-medium">Total Saved</p>
                <p className="text-2xl font-black text-dark">$48,293</p>
              </div>
            </div>
            <p className="text-xs text-dark/60 font-bold">4 active goals</p>
          </div>
        </div>

        {/* Latest Transactions */}
        <div className="space-y-5 animate-fade-in" style={{ animationDelay: '300ms' }}>
          {/* Section Header */}
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-black text-dark">
              Latest <span className="text-gradient-wani">Transactions</span>
            </h2>
            <button
              onClick={() => navigate('/transactions')}
              className="px-4 py-2 rounded-2xl bg-white/60 backdrop-blur-lg hover:bg-white transition-all duration-300 text-sm font-bold text-dark hover:shadow-card"
            >
              See All
            </button>
          </div>

          {/* Transactions List */}
          {mockTransactions.length > 0 ? (
            <div className="space-y-3">
              {mockTransactions.map((transaction, index) => (
                <div
                  key={transaction.id}
                  className="animate-slide-up"
                  style={{ animationDelay: `${400 + index * 50}ms` }}
                >
                  <TransactionItem
                    transaction={transaction}
                    onClick={() => navigate(`/transactions/${transaction.id}`)}
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="card text-center py-16">
              <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-wani-100 to-coral-100 flex items-center justify-center">
                <svg
                  className="w-10 h-10 text-wani-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                  />
                </svg>
              </div>
              <p className="text-lg font-bold text-dark mb-2">No transactions yet</p>
              <p className="text-sm text-dark/60">
                Your transactions will appear here
              </p>
            </div>
          )}
        </div>

        {/* Currency Converter Card */}
        <div className="card animate-fade-in" style={{ animationDelay: '800ms' }}>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-black text-dark">
              Currency <span className="text-gradient-wani">Rates</span>
            </h3>
            <button className="text-sm font-bold text-wani-500 hover:text-wani-600 transition-colors">
              View All
            </button>
          </div>

          <div className="grid grid-cols-3 gap-4">
            {/* Euro */}
            <div className="stats-card text-center">
              <div className="text-3xl font-bold mb-2">€</div>
              <p className="text-xs text-dark/60 mb-2">Euro</p>
              <p className="text-lg font-black text-dark">0.97</p>
              <p className="text-xs text-success mt-1">+0.02%</p>
            </div>

            {/* British Pound */}
            <div className="stats-card text-center">
              <div className="text-3xl font-bold mb-2">£</div>
              <p className="text-xs text-dark/60 mb-2">GBP</p>
              <p className="text-lg font-black text-dark">0.82</p>
              <p className="text-xs text-danger mt-1">-0.01%</p>
            </div>

            {/* Add Currency */}
            <button className="card-dark hover:scale-105 text-center flex flex-col items-center justify-center gap-2 min-h-[120px]">
              <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 4v16m8-8H4"
                  />
                </svg>
              </div>
              <p className="text-sm font-bold">Add Currency</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DashboardPage
