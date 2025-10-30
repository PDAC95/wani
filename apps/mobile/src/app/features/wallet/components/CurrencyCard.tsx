/**
 * Currency Card Component
 * Display currency exchange rate
 */

import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { colors, spacing, borderRadius, typography, shadows } from '../../../shared/theme'

interface CurrencyCardProps {
  symbol: string
  name: string
  rate: number
  onPress?: () => void
  variant?: 'default' | 'add'
}

export function CurrencyCard({ symbol, name, rate, onPress, variant = 'default' }: CurrencyCardProps) {
  if (variant === 'add') {
    return (
      <TouchableOpacity
        onPress={onPress}
        style={styles.addCard}
        activeOpacity={0.8}
      >
        <Text style={styles.addIcon}>+</Text>
        <Text style={styles.addText}>Add Currency</Text>
      </TouchableOpacity>
    )
  }

  return (
    <TouchableOpacity
      onPress={onPress}
      style={styles.card}
      activeOpacity={0.7}
    >
      <View style={styles.content}>
        {/* Currency Symbol */}
        <View style={styles.symbolContainer}>
          <Text style={styles.symbol}>{symbol}</Text>
        </View>

        {/* Currency Name */}
        <Text style={styles.name}>{name}</Text>

        {/* Exchange Rate */}
        <Text style={styles.rate}>{rate.toFixed(2)}</Text>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    minWidth: 120,
    ...shadows.md,
  },
  content: {
    alignItems: 'flex-start',
  },
  symbolContainer: {
    width: 40,
    height: 40,
    backgroundColor: colors.coralLight,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.md,
  },
  symbol: {
    color: colors.brown,
    fontSize: typography.sizes.xl,
    fontWeight: typography.weights.bold,
  },
  name: {
    color: colors.brownTransparent,
    fontSize: typography.sizes.xs,
    marginBottom: 4,
  },
  rate: {
    color: colors.brown,
    fontSize: typography.sizes.xl,
    fontWeight: typography.weights.bold,
  },
  addCard: {
    backgroundColor: colors.brown,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 120,
  },
  addIcon: {
    color: colors.white,
    fontSize: typography.sizes.xxxxl,
    marginBottom: spacing.sm,
  },
  addText: {
    color: colors.white,
    fontSize: typography.sizes.sm,
    fontWeight: typography.weights.medium,
  },
})
