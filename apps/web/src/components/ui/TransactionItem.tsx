/**
 * TransactionItem Component
 * Displays a transaction with avatar, name, status, and amount
 */

import Avatar from './Avatar'

export interface Transaction {
  id: string
  name: string
  avatar?: string
  amount: number
  type: 'received' | 'paid'
  timestamp: string
  icon?: string
}

interface TransactionItemProps {
  transaction: Transaction
  onClick?: () => void
  className?: string
}

export function TransactionItem({
  transaction,
  onClick,
  className = '',
}: TransactionItemProps) {
  const isPositive = transaction.type === 'received'
  const amountClass = isPositive ? 'amount-positive' : 'amount-negative'
  const sign = isPositive ? '+' : '-'

  return (
    <div
      className={`transaction-item ${onClick ? 'cursor-pointer' : ''} ${className}`}
      onClick={onClick}
    >
      {/* Avatar */}
      <Avatar
        src={transaction.avatar}
        fallback={transaction.name}
        size="md"
      />

      {/* Transaction Info */}
      <div className="flex-1 min-w-0">
        <h4 className="font-semibold text-dark truncate">{transaction.name}</h4>
        <p className="text-sm text-dark/60 flex items-center gap-1">
          {transaction.type === 'received' ? 'Received' : 'Paid'}
          <span className="inline-flex items-center">
            <svg
              className="w-3 h-3"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </span>
        </p>
      </div>

      {/* Amount */}
      <div className="text-right">
        <p className={`text-lg font-bold ${amountClass}`}>
          {sign}${Math.abs(transaction.amount).toLocaleString('en-US', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </p>
      </div>
    </div>
  )
}

export default TransactionItem
