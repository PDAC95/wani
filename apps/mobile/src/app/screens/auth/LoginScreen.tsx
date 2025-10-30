/**
 * Login Screen
 * User authentication screen with React Hook Form + Zod validation
 */

import { useState } from 'react'
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  Alert,
  Image,
  StyleSheet,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native'
import type { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import type { AuthStackParamList } from '../../navigation/types'
import { useLogin } from '@/features/auth/hooks'
import { colors, spacing, borderRadius, typography, shadows } from '../../shared/theme'

type NavigationProp = NativeStackNavigationProp<AuthStackParamList, 'Login'>

// Login validation schema
const loginSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
})

type LoginFormData = z.infer<typeof loginSchema>

export default function LoginScreen() {
  const navigation = useNavigation<NavigationProp>()

  // UI state
  const [showPassword, setShowPassword] = useState(false)
  const [apiError, setApiError] = useState<string>('')

  // Login mutation hook
  const { mutate: login, isPending } = useLogin({
    onSuccess: (response) => {
      // Login successful - tokens saved automatically
      Alert.alert('Success', response.message, [
        {
          text: 'OK',
          onPress: () => {
            // Navigation will be handled by RootNavigator based on auth state
            console.log('Login successful:', response.data.user.email)
          },
        },
      ])
    },
    onError: (error: any) => {
      console.error('Login error:', error)
      const errorMessage =
        error?.message || 'Failed to sign in. Please check your credentials.'
      setApiError(errorMessage)
      Alert.alert('Login Failed', errorMessage)
    },
  })

  // React Hook Form with Zod validation
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: 'onBlur',
    defaultValues: {
      email: '',
      password: '',
    },
  })

  /**
   * Handle login submission
   */
  const onSubmit = (data: LoginFormData) => {
    setApiError('')
    login(data)
  }

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.keyboardView}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
      >
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.card}>
            {/* Logo */}
            <View style={styles.logoContainer}>
              <Image
                source={require('../../../../assets/images/logo-horizontal-naranja.png')}
                style={styles.logo}
                resizeMode="contain"
              />
            </View>

            {/* Header */}
            <Text style={styles.title}>
              Welcome Back
            </Text>
            <Text style={styles.subtitle}>
              Sign in to your Wani account
            </Text>

            {/* General API Error */}
            {apiError && (
              <View style={styles.errorContainer}>
                <Text style={styles.errorText}>{apiError}</Text>
              </View>
            )}

            {/* Email Input */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>
                Email <Text style={styles.required}>*</Text>
              </Text>
              <Controller
                control={control}
                name="email"
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    style={[styles.input, errors.email && styles.inputError]}
                    placeholder="you@example.com"
                    placeholderTextColor="#9CA3AF"
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                    editable={!isPending}
                  />
                )}
              />
              {errors.email && (
                <Text style={styles.errorFieldText}>{errors.email.message}</Text>
              )}
            </View>

            {/* Password Input */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>
                Password <Text style={styles.required}>*</Text>
              </Text>
              <Controller
                control={control}
                name="password"
                render={({ field: { onChange, onBlur, value } }) => (
                  <View style={styles.passwordContainer}>
                    <TextInput
                      style={[styles.input, errors.password && styles.inputError, styles.passwordInput]}
                      placeholder="••••••••"
                      placeholderTextColor="#9CA3AF"
                      value={value}
                      onChangeText={onChange}
                      onBlur={onBlur}
                      secureTextEntry={!showPassword}
                      autoCapitalize="none"
                      autoCorrect={false}
                      editable={!isPending}
                    />
                    <TouchableOpacity
                      style={styles.showPasswordButton}
                      onPress={() => setShowPassword(!showPassword)}
                    >
                      <Text style={styles.showPasswordText}>
                        {showPassword ? 'Hide' : 'Show'}
                      </Text>
                    </TouchableOpacity>
                  </View>
                )}
              />
              {errors.password && (
                <Text style={styles.errorFieldText}>
                  {errors.password.message}
                </Text>
              )}
            </View>

            {/* Forgot Password Link */}
            <TouchableOpacity style={styles.forgotPasswordContainer} disabled={isPending}>
              <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
            </TouchableOpacity>

            {/* Login Button */}
            <TouchableOpacity
              style={[styles.submitButton, isPending && styles.submitButtonDisabled]}
              onPress={handleSubmit(onSubmit)}
              disabled={isPending}
            >
              {isPending ? (
                <ActivityIndicator color={colors.white} />
              ) : (
                <Text style={styles.submitButtonText}>
                  Sign In
                </Text>
              )}
            </TouchableOpacity>

            {/* Register Link */}
            <View style={styles.linkContainer}>
              <Text style={styles.linkText}>Don't have an account? </Text>
              <TouchableOpacity
                onPress={() => navigation.navigate('Register')}
                disabled={isPending}
              >
                <Text style={styles.linkTextAccent}>Sign Up</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.cream,
  },
  keyboardView: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: spacing.lg,
    paddingVertical: spacing.xl,
  },
  card: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.xl,
    padding: spacing.xl,
    ...shadows.lg,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  logo: {
    height: 80,
    width: 240,
  },
  title: {
    fontSize: typography.sizes.xxxxl,
    fontWeight: typography.weights.bold,
    color: colors.brown,
    textAlign: 'center',
    marginBottom: spacing.sm,
  },
  subtitle: {
    fontSize: typography.sizes.base,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: spacing.xl,
  },
  errorContainer: {
    backgroundColor: '#FEE2E2',
    borderWidth: 1,
    borderColor: '#FECACA',
    borderRadius: borderRadius.md,
    padding: spacing.md,
    marginBottom: spacing.md,
  },
  errorText: {
    color: '#DC2626',
    fontSize: typography.sizes.sm,
    textAlign: 'center',
  },
  inputGroup: {
    marginBottom: spacing.md,
  },
  label: {
    fontSize: typography.sizes.sm,
    fontWeight: typography.weights.medium,
    color: colors.brown,
    marginBottom: spacing.sm,
  },
  required: {
    color: '#EF4444',
  },
  input: {
    backgroundColor: colors.bgGray,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    borderRadius: borderRadius.md,
    color: colors.brown,
    fontSize: typography.sizes.base,
  },
  inputError: {
    borderWidth: 1,
    borderColor: '#EF4444',
  },
  passwordContainer: {
    position: 'relative',
  },
  passwordInput: {
    paddingRight: 60,
  },
  showPasswordButton: {
    position: 'absolute',
    right: spacing.md,
    top: spacing.md,
  },
  showPasswordText: {
    color: colors.textSecondary,
    fontSize: typography.sizes.sm,
  },
  errorFieldText: {
    color: '#EF4444',
    fontSize: typography.sizes.xs,
    marginTop: 4,
  },
  forgotPasswordContainer: {
    marginBottom: spacing.lg,
  },
  forgotPasswordText: {
    color: colors.coral,
    fontSize: typography.sizes.sm,
    textAlign: 'right',
  },
  submitButton: {
    backgroundColor: colors.coral,
    paddingVertical: spacing.md,
    borderRadius: borderRadius.md,
    marginBottom: spacing.md,
    ...shadows.md,
  },
  submitButtonDisabled: {
    opacity: 0.5,
  },
  submitButtonText: {
    color: colors.white,
    textAlign: 'center',
    fontWeight: typography.weights.semibold,
    fontSize: typography.sizes.lg,
  },
  linkContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  linkText: {
    color: colors.textSecondary,
    fontSize: typography.sizes.base,
  },
  linkTextAccent: {
    color: colors.coral,
    fontWeight: typography.weights.semibold,
    fontSize: typography.sizes.base,
  },
})
