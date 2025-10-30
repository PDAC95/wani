/**
 * Button Component
 * Reusable button with multiple variants
 */

import { TouchableOpacity, Text, ActivityIndicator, StyleSheet, type TouchableOpacityProps, type ViewStyle, type TextStyle } from 'react-native'
import { colors, spacing, borderRadius, typography } from '../../theme'

interface ButtonProps extends TouchableOpacityProps {
  variant?: 'primary' | 'secondary' | 'ghost' | 'circular'
  size?: 'sm' | 'md' | 'lg'
  isLoading?: boolean
  children: React.ReactNode
}

export function Button({
  variant = 'primary',
  size = 'md',
  isLoading = false,
  children,
  style,
  disabled,
  ...props
}: ButtonProps) {
  const buttonStyle: ViewStyle[] = [
    styles.base,
    styles[`${variant}Variant`],
    variant !== 'circular' && styles[`${size}Size`],
    (disabled || isLoading) && styles.disabled,
    style as ViewStyle,
  ]

  const textStyle: TextStyle[] = [
    styles.text,
    styles[`${variant}Text`],
    styles[`${size}Text`],
  ]

  return (
    <TouchableOpacity
      style={buttonStyle}
      disabled={disabled || isLoading}
      activeOpacity={0.7}
      {...props}
    >
      {isLoading ? (
        <ActivityIndicator color={variant === 'primary' ? colors.white : colors.brown} />
      ) : (
        <Text style={textStyle}>
          {children}
        </Text>
      )}
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  // Base styles
  base: {
    borderRadius: borderRadius.lg,
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Variant styles
  primaryVariant: {
    backgroundColor: colors.brown,
  },
  secondaryVariant: {
    backgroundColor: colors.white,
    borderWidth: 2,
    borderColor: colors.brown,
  },
  ghostVariant: {
    backgroundColor: 'transparent',
  },
  circularVariant: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.full,
    aspectRatio: 1,
  },

  // Size styles
  smSize: {
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
  },
  mdSize: {
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
  },
  lgSize: {
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.xl,
  },

  // Text styles
  text: {
    fontWeight: typography.weights.semibold,
  },
  primaryText: {
    color: colors.white,
  },
  secondaryText: {
    color: colors.brown,
  },
  ghostText: {
    color: colors.brown,
  },
  circularText: {
    color: colors.brown,
  },

  // Text sizes
  smText: {
    fontSize: typography.sizes.sm,
  },
  mdText: {
    fontSize: typography.sizes.base,
  },
  lgText: {
    fontSize: typography.sizes.lg,
  },

  // Disabled state
  disabled: {
    opacity: 0.5,
  },
})
