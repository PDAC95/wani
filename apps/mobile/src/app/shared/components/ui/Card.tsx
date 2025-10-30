/**
 * Card Component
 * Flexible card container with different variants
 */

import { View, StyleSheet, type ViewProps } from 'react-native'
import { colors, borderRadius, spacing, shadows } from '../../theme'

interface CardProps extends ViewProps {
  variant?: 'default' | 'balance' | 'flat'
  children: React.ReactNode
}

export function Card({ variant = 'default', children, style, ...props }: CardProps) {
  return (
    <View
      style={[styles.base, styles[variant], style]}
      {...props}
    >
      {children}
    </View>
  )
}

const styles = StyleSheet.create({
  base: {
    // Base styles shared by all variants
  },
  default: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.xl,
    padding: spacing.lg,
    ...shadows.lg,
  },
  balance: {
    backgroundColor: colors.coralLight,
    borderRadius: borderRadius.xl,
    padding: spacing.lg,
    ...shadows.lg,
  },
  flat: {
    backgroundColor: colors.bgGray,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
  },
})
