/**
 * QuickActionButton Component - Ultra-Modern Edition
 * Glassmorphic action buttons with gradient hover effects
 */

import { type ReactNode } from 'react'

interface QuickActionButtonProps {
  icon: ReactNode
  label: string
  onClick?: () => void
  variant?: 'primary' | 'secondary'
  className?: string
}

export function QuickActionButton({
  icon,
  label,
  onClick,
  variant = 'primary',
  className = '',
}: QuickActionButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`flex flex-col items-center gap-3 group ${className}`}
    >
      {/* Icon Container with Glassmorphism */}
      <div
        className={`
          relative w-16 h-16 rounded-3xl flex items-center justify-center
          transition-all duration-500 transform
          group-hover:scale-110 group-hover:-translate-y-2 group-hover:rotate-3
          group-active:scale-95 group-active:translate-y-0 group-active:rotate-0
          ${
            variant === 'primary'
              ? 'bg-white/70 backdrop-blur-xl shadow-card group-hover:bg-gradient-wani group-hover:shadow-glow'
              : 'bg-white/50 backdrop-blur-lg shadow-card group-hover:bg-white/80'
          }
        `}
        style={{
          border: '1px solid rgba(255, 255, 255, 0.8)',
        }}
      >
        {/* Glow effect on hover */}
        <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-wani-400/20 to-coral-500/20 blur-xl" />

        <div className={`relative z-10 transition-colors duration-300 ${
          variant === 'primary' ? 'text-dark group-hover:text-white' : 'text-dark'
        }`}>
          {icon}
        </div>
      </div>

      {/* Label */}
      <span className="text-sm font-bold text-dark/80 group-hover:text-dark transition-colors duration-300">
        {label}
      </span>
    </button>
  )
}

// Premium icon components with better styling
export const PayIcon = () => (
  <svg
    className="w-7 h-7"
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
)

export const TransferIcon = () => (
  <svg
    className="w-7 h-7"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
    />
  </svg>
)

export const ReceiveIcon = () => (
  <svg
    className="w-7 h-7"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
)

export const ScanIcon = () => (
  <svg
    className="w-7 h-7"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z"
    />
  </svg>
)

export default QuickActionButton
