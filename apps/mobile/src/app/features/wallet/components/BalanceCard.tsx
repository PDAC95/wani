/**
 * Balance Card Component
 * Main balance display card with yellow background
 */

import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { Card } from '../../../shared/components/ui/Card'
import { Icon } from '../../../shared/components/ui/Icon'
import { colors, spacing, borderRadius, typography } from '../../../shared/theme'

interface BalanceCardProps {
  balance: number
  currency: string
  change?: number
  exchangeRate?: string
  onToggleVisibility?: () => void
  isVisible?: boolean
}

export function BalanceCard({
  balance,
  currency,
  change,
  exchangeRate,
  onToggleVisibility,
  isVisible = true,
}: BalanceCardProps) {
  const formatBalance = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'decimal',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount)
  }

  const formatChange = (amount: number) => {
    const prefix = amount >= 0 ? '+' : ''
    return `${prefix}$${formatBalance(Math.abs(amount))}`
  }

  return (
    <Card variant="balance" style={styles.container}>
      {/* Currency Badge */}
      <View style={styles.header}>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{currency}</Text>
        </View>

        <TouchableOpacity
          onPress={onToggleVisibility}
          style={styles.eyeButton}
        >
          <Icon name={isVisible ? 'eye' : 'eye-off'} size="sm" />
        </TouchableOpacity>
      </View>

      {/* Exchange Rate */}
      {exchangeRate && (
        <Text style={styles.exchangeRate}>{exchangeRate}</Text>
      )}

      {/* Balance */}
      <Text style={styles.balance}>
        {isVisible ? `$${formatBalance(balance)}` : '****'}
      </Text>

      {/* Change */}
      {change !== undefined && (
        <View style={styles.changeContainer}>
          <Text
            style={[
              styles.changeText,
              { color: change >= 0 ? colors.success : colors.error }
            ]}
          >
            {formatChange(change)}
          </Text>
          <Icon
            name={change >= 0 ? 'arrow-up' : 'arrow-down'}
            size="sm"
            textStyle={{ color: change >= 0 ? colors.success : colors.error }}
          />
        </View>
      )}
    </Card>
  )
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.md,
  },
  badge: {
    backgroundColor: colors.brown + '1A', // 10% opacity
    paddingHorizontal: spacing.md,
    paddingVertical: 6,
    borderRadius: borderRadius.full,
  },
  badgeText: {
    color: colors.brown,
    fontWeight: typography.weights.semibold,
    fontSize: typography.sizes.sm,
  },
  eyeButton: {
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  exchangeRate: {
    color: colors.brownTransparent,
    fontSize: typography.sizes.xs,
    marginBottom: spacing.sm,
  },
  balance: {
    color: colors.brown,
    fontSize: typography.sizes.xxxxxl,
    fontWeight: typography.weights.bold,
    marginBottom: spacing.sm,
  },
  changeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  changeText: {
    fontSize: typography.sizes.base,
    fontWeight: typography.weights.semibold,
  },
})
