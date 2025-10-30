/**
 * Welcome Screen
 * First screen after splash - Onboarding/Landing page
 */

import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native'
import type { NativeStackNavigationProp } from '@react-navigation/native-stack'
import type { AuthStackParamList } from '../../navigation/types'
import { colors, spacing, borderRadius, typography, shadows } from '../../shared/theme'

type NavigationProp = NativeStackNavigationProp<AuthStackParamList, 'Welcome'>

const { width, height } = Dimensions.get('window')

export default function WelcomeScreen() {
  const navigation = useNavigation<NavigationProp>()

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <View style={styles.content}>
        {/* Top Section - Branding */}
        <View style={styles.topSection}>
          {/* Logo Container */}
          <View style={styles.logoContainer}>
            {/* Logo Placeholder - Replace with actual logo */}
            <View style={styles.logoCircle}>
              <Text style={styles.logoEmoji}>💰</Text>
            </View>

            {/* App Name */}
            <Text style={styles.appName}>Wani</Text>
            <Text style={styles.tagline}>
              Your money. Your rules. Your speed.{'\n'}
              Money that moves as fast as you do
            </Text>
          </View>

          {/* Feature Cards */}
          <View style={styles.featuresContainer}>
            {/* Feature 1 */}
            <View style={styles.featureCard}>
              <View style={[styles.featureIcon, { backgroundColor: colors.coralLight }]}>
                <Text style={styles.featureEmoji}>⚡</Text>
              </View>
              <View style={styles.featureContent}>
                <Text style={styles.featureTitle}>
                  Instant Transfers
                </Text>
                <Text style={styles.featureDescription}>
                  Send money in seconds worldwide
                </Text>
              </View>
            </View>

            {/* Feature 2 */}
            <View style={styles.featureCard}>
              <View style={[styles.featureIcon, { backgroundColor: colors.coralLight }]}>
                <Text style={styles.featureEmoji}>🔒</Text>
              </View>
              <View style={styles.featureContent}>
                <Text style={styles.featureTitle}>
                  Bank-Level Security
                </Text>
                <Text style={styles.featureDescription}>
                  Your money is always protected
                </Text>
              </View>
            </View>

            {/* Feature 3 */}
            <View style={styles.featureCard}>
              <View style={[styles.featureIcon, { backgroundColor: colors.coralLight }]}>
                <Text style={styles.featureEmoji}>💳</Text>
              </View>
              <View style={styles.featureContent}>
                <Text style={styles.featureTitle}>
                  Low Fees
                </Text>
                <Text style={styles.featureDescription}>
                  Save money on every transaction
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Bottom Section - CTA Buttons */}
        <View style={styles.bottomSection}>
          {/* Get Started Button - Primary */}
          <TouchableOpacity
            onPress={() => navigation.navigate('Register')}
            style={styles.primaryButton}
            activeOpacity={0.8}
          >
            <Text style={styles.primaryButtonText}>
              Get Started
            </Text>
          </TouchableOpacity>

          {/* Sign In Link */}
          <View style={styles.signInContainer}>
            <Text style={styles.signInText}>Already have an account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text style={styles.signInLink}>Sign in</Text>
            </TouchableOpacity>
          </View>

          {/* Terms Text */}
          <Text style={styles.termsText}>
            By continuing, you agree to our{' '}
            <Text style={styles.termsLink}>Terms of Service</Text>
            {' '}and{' '}
            <Text style={styles.termsLink}>Privacy Policy</Text>
          </Text>
        </View>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.cream,
  },
  content: {
    flex: 1,
  },
  topSection: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.lg,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  logoCircle: {
    width: 128,
    height: 128,
    backgroundColor: colors.coral,
    borderRadius: 64,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.lg,
    ...shadows.lg,
  },
  logoEmoji: {
    fontSize: 64,
  },
  appName: {
    color: colors.brown,
    fontSize: typography.sizes.xxxxxl,
    fontWeight: typography.weights.bold,
    marginBottom: spacing.sm,
  },
  tagline: {
    color: colors.brownTransparent,
    fontSize: typography.sizes.lg,
    textAlign: 'center',
    lineHeight: 26,
  },
  featuresContainer: {
    width: '100%',
    gap: spacing.md,
    marginBottom: spacing.xl,
  },
  featureCard: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.xl,
    padding: spacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
    ...shadows.md,
  },
  featureIcon: {
    width: 56,
    height: 56,
    borderRadius: borderRadius.lg,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  featureEmoji: {
    fontSize: 32,
  },
  featureContent: {
    flex: 1,
  },
  featureTitle: {
    color: colors.brown,
    fontSize: typography.sizes.base,
    fontWeight: typography.weights.bold,
    marginBottom: 4,
  },
  featureDescription: {
    color: colors.brownTransparent,
    fontSize: typography.sizes.sm,
  },
  bottomSection: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.lg,
  },
  primaryButton: {
    backgroundColor: colors.brown,
    borderRadius: borderRadius.lg,
    paddingVertical: spacing.lg,
    alignItems: 'center',
    ...shadows.md,
  },
  primaryButtonText: {
    color: colors.white,
    fontSize: typography.sizes.lg,
    fontWeight: typography.weights.bold,
  },
  signInContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: spacing.lg,
  },
  signInText: {
    color: colors.brownTransparent,
    fontSize: typography.sizes.base,
  },
  signInLink: {
    color: colors.brown,
    fontSize: typography.sizes.base,
    fontWeight: typography.weights.semibold,
  },
  termsText: {
    color: colors.brownTransparent,
    fontSize: typography.sizes.xs,
    textAlign: 'center',
    marginTop: spacing.md,
    paddingHorizontal: spacing.xl,
  },
  termsLink: {
    color: colors.brown,
    fontWeight: typography.weights.semibold,
  },
})
