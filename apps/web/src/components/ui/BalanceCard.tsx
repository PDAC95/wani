/**
 * BalanceCard Component - Ultra-Modern Edition
 * Premium glassmorphic balance card with gradient and animations
 */

interface BalanceCardProps {
  currency: string
  amount: number
  change?: number
  exchangeRate?: string
  onToggleVisibility?: () => void
  isVisible?: boolean
  className?: string
}

export function BalanceCard({
  currency = 'USD',
  amount,
  change,
  exchangeRate,
  onToggleVisibility,
  isVisible = true,
  className = '',
}: BalanceCardProps) {
  const isPositiveChange = change !== undefined && change >= 0

  return (
    <div className={`card-balance group ${className}`}>
      {/* Decorative Gradient Overlay */}
      <div className="absolute inset-0 opacity-30 group-hover:opacity-40 transition-opacity duration-500">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full blur-3xl" />
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
              <svg
                className="w-5 h-5 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <div>
              <h3 className="text-sm font-bold text-white/90 tracking-wider uppercase">
                {currency}
              </h3>
              {exchangeRate && (
                <p className="text-xs text-white/60 mt-0.5">{exchangeRate}</p>
              )}
            </div>
          </div>

          {/* Toggle Visibility Button */}
          <button
            onClick={onToggleVisibility}
            className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-sm hover:bg-white/20 flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95"
            aria-label={isVisible ? 'Hide balance' : 'Show balance'}
          >
            {isVisible ? (
              <svg
                className="w-5 h-5 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                />
              </svg>
            ) : (
              <svg
                className="w-5 h-5 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                />
              </svg>
            )}
          </button>
        </div>

        {/* Amount - Hero Section */}
        <div className="my-6">
          <h1 className="text-6xl lg:text-7xl font-black text-white tracking-tight">
            {isVisible ? (
              <>
                $
                {amount.toLocaleString('en-US', {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </>
            ) : (
              <span className="text-white/40">••••••</span>
            )}
          </h1>
        </div>

        {/* Change Indicator */}
        {change !== undefined && isVisible && (
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-white/20 backdrop-blur-sm">
            <div
              className={`flex items-center gap-1 text-sm font-bold ${
                isPositiveChange ? 'text-white' : 'text-white/90'
              }`}
            >
              {isPositiveChange ? (
                <svg
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.5}
                    d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                  />
                </svg>
              ) : (
                <svg
                  className="w-5 h-5 rotate-180"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.5}
                    d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                  />
                </svg>
              )}
              <span>
                {isPositiveChange ? '+' : ''}$
                {Math.abs(change).toLocaleString('en-US', {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </span>
            </div>
            <span className="text-xs text-white/70">today</span>
          </div>
        )}
      </div>
    </div>
  )
}

export default BalanceCard
