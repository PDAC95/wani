/**
 * Register Screen - Future Implementation
 *
 * This shows how RegisterScreen will look after integrating:
 * - useRegister hook (TanStack Query)
 * - Auth store (Zustand)
 *
 * TODO: Replace current RegisterScreen with this once hooks are ready
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
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native'
import type { NativeStackNavigationProp } from '@react-navigation/native-stack'
import type { AuthStackParamList } from '../../navigation/types'
import type { RegisterRequest, AuthFormErrors } from '@/features/auth/types'

// TODO: Uncomment when hooks are created
// import { useRegister } from '@/features/auth/hooks'
// import { useAuthStore } from '@/core/store/authStore'

type NavigationProp = NativeStackNavigationProp<AuthStackParamList, 'Register'>

export default function RegisterScreen() {
  const navigation = useNavigation<NavigationProp>()

  // TODO: Uncomment when hooks are ready
  // const registerMutation = useRegister()
  // const setAuth = useAuthStore((state) => state.setAuth)

  // Form state
  const [formData, setFormData] = useState<RegisterRequest>({
    email: '',
    password: '',
    full_name: '',
    phone: '',
  })

  // UI state
  const [errors, setErrors] = useState<AuthFormErrors>({})
  const [showPassword, setShowPassword] = useState(false)

  /**
   * Validate form fields
   */
  const validateForm = (): boolean => {
    const newErrors: AuthFormErrors = {}

    if (!formData.full_name.trim()) {
      newErrors.full_name = 'Full name is required'
    } else if (formData.full_name.trim().length < 2) {
      newErrors.full_name = 'Full name must be at least 2 characters'
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email'
    }

    if (formData.phone && formData.phone.trim()) {
      const phoneRegex = /^\+?[\d\s\-()]+$/
      if (!phoneRegex.test(formData.phone)) {
        newErrors.phone = 'Please enter a valid phone number'
      }
    }

    if (!formData.password) {
      newErrors.password = 'Password is required'
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters'
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password = 'Password must contain uppercase, lowercase, and number'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  /**
   * Handle registration submission
   * FUTURE: This version uses TanStack Query mutation
   */
  const handleRegister = () => {
    // Validate form
    if (!validateForm()) {
      return
    }

    // Clear errors
    setErrors({})

    // TODO: Replace with actual hook
    // registerMutation.mutate(formData, {
    //   onSuccess: (response) => {
    //     // Store auth tokens
    //     setAuth(response.user, response.tokens)
    //
    //     // Show success message
    //     Alert.alert(
    //       'Success',
    //       'Account created successfully!',
    //       [{ text: 'OK', onPress: () => navigation.navigate('Home') }]
    //     )
    //   },
    //   onError: (error) => {
    //     // Handle specific error codes
    //     if (error.code === 'EMAIL_ALREADY_EXISTS') {
    //       setErrors({ email: 'This email is already registered' })
    //     } else {
    //       setErrors({ general: error.message })
    //     }
    //   },
    // })
  }

  /**
   * Update form field
   */
  const updateField = (field: keyof RegisterRequest, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }))
    }
  }

  // TODO: Get loading state from mutation
  // const loading = registerMutation.isPending
  const loading = false

  return (
    <SafeAreaView className="flex-1 bg-cream">
      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
      >
        <ScrollView
          className="flex-1"
          contentContainerClassName="p-6 py-8"
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View className="bg-white rounded-2xl shadow-lg p-8">
            {/* Header */}
            <Text className="text-4xl font-bold text-brown text-center mb-2">
              Create Account
            </Text>
            <Text className="text-brown-light text-center mb-8">
              Join Wani today
            </Text>

            {/* General Error */}
            {errors.general && (
              <View className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
                <Text className="text-red-600 text-sm text-center">
                  {errors.general}
                </Text>
              </View>
            )}

            {/* Full Name Input */}
            <View className="mb-4">
              <Text className="text-sm font-medium text-brown mb-2">
                Full Name <Text className="text-red-500">*</Text>
              </Text>
              <TextInput
                className={`bg-cream-dark px-4 py-4 rounded-xl text-brown ${
                  errors.full_name ? 'border border-red-500' : ''
                }`}
                placeholder="John Doe"
                placeholderTextColor="#9CA3AF"
                value={formData.full_name}
                onChangeText={(value) => updateField('full_name', value)}
                autoCapitalize="words"
                editable={!loading}
              />
              {errors.full_name && (
                <Text className="text-red-500 text-xs mt-1">
                  {errors.full_name}
                </Text>
              )}
            </View>

            {/* Email Input */}
            <View className="mb-4">
              <Text className="text-sm font-medium text-brown mb-2">
                Email <Text className="text-red-500">*</Text>
              </Text>
              <TextInput
                className={`bg-cream-dark px-4 py-4 rounded-xl text-brown ${
                  errors.email ? 'border border-red-500' : ''
                }`}
                placeholder="you@example.com"
                placeholderTextColor="#9CA3AF"
                value={formData.email}
                onChangeText={(value) => updateField('email', value.toLowerCase())}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                editable={!loading}
              />
              {errors.email && (
                <Text className="text-red-500 text-xs mt-1">{errors.email}</Text>
              )}
            </View>

            {/* Phone Input */}
            <View className="mb-4">
              <Text className="text-sm font-medium text-brown mb-2">
                Phone Number (Optional)
              </Text>
              <TextInput
                className={`bg-cream-dark px-4 py-4 rounded-xl text-brown ${
                  errors.phone ? 'border border-red-500' : ''
                }`}
                placeholder="+1 (555) 000-0000"
                placeholderTextColor="#9CA3AF"
                value={formData.phone}
                onChangeText={(value) => updateField('phone', value)}
                keyboardType="phone-pad"
                editable={!loading}
              />
              {errors.phone && (
                <Text className="text-red-500 text-xs mt-1">{errors.phone}</Text>
              )}
            </View>

            {/* Password Input */}
            <View className="mb-2">
              <Text className="text-sm font-medium text-brown mb-2">
                Password <Text className="text-red-500">*</Text>
              </Text>
              <View className="relative">
                <TextInput
                  className={`bg-cream-dark px-4 py-4 rounded-xl text-brown pr-12 ${
                    errors.password ? 'border border-red-500' : ''
                  }`}
                  placeholder="••••••••"
                  placeholderTextColor="#9CA3AF"
                  value={formData.password}
                  onChangeText={(value) => updateField('password', value)}
                  secureTextEntry={!showPassword}
                  autoCapitalize="none"
                  autoCorrect={false}
                  editable={!loading}
                />
                <TouchableOpacity
                  className="absolute right-4 top-4"
                  onPress={() => setShowPassword(!showPassword)}
                >
                  <Text className="text-brown-light text-sm">
                    {showPassword ? 'Hide' : 'Show'}
                  </Text>
                </TouchableOpacity>
              </View>
              {errors.password && (
                <Text className="text-red-500 text-xs mt-1">
                  {errors.password}
                </Text>
              )}
            </View>

            {/* Password Requirements */}
            <View className="mb-6">
              <Text className="text-xs text-brown-light">
                Password must be at least 8 characters with uppercase, lowercase, and
                number
              </Text>
            </View>

            {/* Register Button */}
            <TouchableOpacity
              className={`py-4 rounded-xl mb-4 ${
                loading ? 'bg-coral/50' : 'bg-coral'
              }`}
              onPress={handleRegister}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="#FFFFFF" />
              ) : (
                <Text className="text-white text-center font-semibold text-lg">
                  Create Account
                </Text>
              )}
            </TouchableOpacity>

            {/* Login Link */}
            <View className="flex-row justify-center">
              <Text className="text-brown-light">Already have an account? </Text>
              <TouchableOpacity
                onPress={() => navigation.navigate('Login')}
                disabled={loading}
              >
                <Text className="text-coral font-semibold">Sign In</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Terms and Privacy */}
          <Text className="text-xs text-brown-light text-center mt-6 px-4">
            By creating an account, you agree to our{' '}
            <Text className="text-coral">Terms of Service</Text> and{' '}
            <Text className="text-coral">Privacy Policy</Text>
          </Text>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}
