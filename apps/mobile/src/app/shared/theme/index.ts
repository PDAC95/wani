/**
 * Theme Configuration
 * Design system colors, spacing, typography based on docs/design.md
 */

// Brand Colors
export const colors = {
  // Primary Brand Colors
  coral: '#FB923C',
  coralLight: '#FED7AA',
  coralDeep: '#F97316',

  // Neutrals
  brown: '#292524',
  cream: '#FFF7ED',
  white: '#FFFFFF',

  // Functional Colors
  success: '#10B981',
  error: '#EF4444',
  warning: '#F59E0B',
  warningDark: '#D97706',
  info: '#3B82F6',

  // Text Colors
  textPrimary: '#1F2937',
  textSecondary: '#6B7280',

  // Borders & Backgrounds
  border: '#E5E7EB',
  bgGray: '#F9FAFB',

  // Transparent variants for opacity
  brownTransparent: 'rgba(41, 37, 36, 0.6)',
}

// Spacing Scale (4px base unit)
export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
}

// Border Radius
export const borderRadius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  full: 9999,
}

// Typography
export const typography = {
  sizes: {
    xs: 12,
    sm: 14,
    base: 16,
    lg: 18,
    xl: 20,
    xxl: 24,
    xxxl: 32,
    xxxxl: 40,
    xxxxxl: 48,
  },
  weights: {
    regular: '400' as const,
    medium: '500' as const,
    semibold: '600' as const,
    bold: '700' as const,
  },
}

// Shadows
export const shadows = {
  sm: {
    shadowColor: colors.brown,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  md: {
    shadowColor: colors.brown,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  lg: {
    shadowColor: colors.brown,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 15,
    elevation: 6,
  },
  xl: {
    shadowColor: colors.brown,
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 0.1,
    shadowRadius: 25,
    elevation: 10,
  },
}

// Common styles for reuse
export const commonStyles = {
  container: {
    flex: 1,
    backgroundColor: colors.cream,
  },
  card: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.xl,
    padding: spacing.lg,
    ...shadows.md,
  },
  textPrimary: {
    color: colors.textPrimary,
    fontSize: typography.sizes.base,
    fontWeight: typography.weights.regular,
  },
  textSecondary: {
    color: colors.textSecondary,
    fontSize: typography.sizes.sm,
    fontWeight: typography.weights.regular,
  },
  heading: {
    color: colors.brown,
    fontSize: typography.sizes.xxl,
    fontWeight: typography.weights.bold,
  },
}
