/**
 * Welcome Screen V2 - Based on Web Design
 * Modern landing page matching Wani web experience
 * First screen after splash
 */

import { View, Text, TouchableOpacity, ScrollView, Image, StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native'
import type { NativeStackNavigationProp } from '@react-navigation/native-stack'
import type { AuthStackParamList } from '../../navigation/types'
import { colors, spacing, borderRadius, typography, shadows } from '../../shared/theme'

type NavigationProp = NativeStackNavigationProp<AuthStackParamList, 'Welcome'>

export default function WelcomeScreenV2() {
  const navigation = useNavigation<NavigationProp>()

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Logo Section */}
        <View style={styles.logoSection}>
          <Image
            source={require('../../../../assets/images/logo-horizontal-naranja.png')}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>

        {/* Main Content */}
        <View style={styles.mainContent}>
          {/* Badge */}
          <View style={styles.badgeContainer}>
            <View style={styles.badge}>
              <View style={styles.badgeDot} />
              <Text style={styles.badgeText}>
                Your money. Your rules. Your speed.
              </Text>
            </View>
          </View>

          {/* Hero Title */}
          <View style={styles.heroTitle}>
            <Text style={styles.heroTextPrimary}>
              Money that moves
            </Text>
            <Text style={styles.heroTextAccent}>
              as fast as you do
            </Text>
          </View>

          {/* Subtitle */}
          <Text style={styles.subtitle}>
            Send money globally in seconds.{' '}
            <Text style={styles.subtitleAccent}>
              Zero hidden fees. Total control.
            </Text>
          </Text>
        </View>

        {/* Bottom Section */}
        <View style={styles.bottomSection}>
          {/* CTA Button */}
          <View style={styles.ctaContainer}>
            <TouchableOpacity
              onPress={() => navigation.navigate('Register')}
              style={styles.ctaButton}
              activeOpacity={0.9}
            >
              <Text style={styles.ctaButtonText}>
                Get Started
              </Text>
              <Text style={styles.ctaButtonArrow}>→</Text>
            </TouchableOpacity>

            {/* Login Link for Existing Users */}
            <TouchableOpacity
              onPress={() => navigation.navigate('Login')}
              activeOpacity={0.7}
              style={styles.loginLink}
            >
              <Text style={styles.loginText}>
                Already have an account?{' '}
                <Text style={styles.loginTextAccent}>
                  Sign in
                </Text>
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.cream,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    minHeight: '100%',
    justifyContent: 'space-between',
    paddingVertical: spacing.xl,
  },
  logoSection: {
    paddingTop: spacing.md,
    paddingHorizontal: spacing.lg,
    alignItems: 'center',
  },
  logo: {
    height: 96,
    width: 288,
  },
  mainContent: {
    flex: 1,
    justifyContent: 'center',
    marginTop: -64,
    paddingHorizontal: spacing.lg,
  },
  badgeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    marginBottom: spacing.lg,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.full,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.coral + '33', // 20% opacity
    ...shadows.sm,
  },
  badgeDot: {
    width: 8,
    height: 8,
    backgroundColor: colors.coral,
    borderRadius: 4,
  },
  badgeText: {
    fontSize: typography.sizes.sm,
    fontWeight: typography.weights.semibold,
    color: colors.coral,
  },
  heroTitle: {
    marginBottom: spacing.md,
  },
  heroTextPrimary: {
    fontSize: typography.sizes.xxxxl,
    fontWeight: typography.weights.bold,
    color: colors.brown,
    lineHeight: 48,
    marginBottom: spacing.sm,
  },
  heroTextAccent: {
    fontSize: typography.sizes.xxxxl,
    fontWeight: typography.weights.bold,
    color: colors.coral,
    lineHeight: 48,
  },
  subtitle: {
    fontSize: typography.sizes.lg,
    color: colors.brownTransparent,
    marginBottom: spacing.xl,
    lineHeight: 28,
  },
  subtitleAccent: {
    fontWeight: typography.weights.semibold,
    color: colors.coral,
  },
  bottomSection: {
    paddingBottom: spacing.md,
    paddingHorizontal: spacing.lg,
  },
  ctaContainer: {
    gap: spacing.md,
  },
  ctaButton: {
    backgroundColor: colors.coral,
    borderRadius: borderRadius.lg,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    ...shadows.lg,
  },
  ctaButtonText: {
    color: colors.white,
    textAlign: 'center',
    fontWeight: typography.weights.bold,
    fontSize: typography.sizes.lg,
  },
  ctaButtonArrow: {
    color: colors.white,
    fontSize: typography.sizes.xl,
    marginLeft: spacing.sm,
  },
  loginLink: {
    alignItems: 'center',
  },
  loginText: {
    textAlign: 'center',
    fontSize: typography.sizes.base,
    color: colors.brownTransparent,
  },
  loginTextAccent: {
    color: colors.coral,
    fontWeight: typography.weights.semibold,
  },
})
