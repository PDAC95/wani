/**
 * Auth Service Usage Examples
 *
 * Complete examples showing how to use the auth service
 * in React Native components with TypeScript
 */

import { useState } from 'react'
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native'
import { useMutation } from '@tanstack/react-query'
import { authService } from './authService'
import type { LoginRequest, RegisterRequest, AuthError } from '../types'

/**
 * Example 1: Login Component with Direct Service Call
 */
export function LoginExample1() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const handleLogin = async () => {
    try {
      setLoading(true)

      const credentials: LoginRequest = { email, password }
      const response = await authService.login(credentials)

      console.log('Login successful:', response.data.user)
      // Store tokens in Zustand or AsyncStorage
      // Navigate to home screen

      Alert.alert('Success', `Welcome ${response.data.user.full_name}!`)
    } catch (error) {
      const authError = error as AuthError
      Alert.alert('Login Failed', authError.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <View className="p-4">
      <Text className="text-2xl font-bold mb-4">Login</Text>

      <TextInput
        className="border border-gray-300 rounded-lg p-3 mb-4"
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TextInput
        className="border border-gray-300 rounded-lg p-3 mb-4"
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <TouchableOpacity
        className="bg-blue-500 p-4 rounded-lg"
        onPress={handleLogin}
        disabled={loading}
      >
        <Text className="text-white text-center font-semibold">
          {loading ? 'Loading...' : 'Login'}
        </Text>
      </TouchableOpacity>
    </View>
  )
}

/**
 * Example 2: Login with TanStack Query (Recommended)
 */
export function LoginExample2() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const loginMutation = useMutation({
    mutationFn: authService.login,
    onSuccess: (data) => {
      Alert.alert('Success', `Welcome ${data.data.user.full_name}!`)
      // Store tokens and navigate
    },
    onError: (error: AuthError) => {
      Alert.alert('Login Failed', error.message)
    },
  })

  const handleLogin = () => {
    loginMutation.mutate({ email, password })
  }

  return (
    <View className="p-4">
      <Text className="text-2xl font-bold mb-4">Login</Text>

      <TextInput
        className="border border-gray-300 rounded-lg p-3 mb-4"
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        editable={!loginMutation.isPending}
      />

      <TextInput
        className="border border-gray-300 rounded-lg p-3 mb-4"
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        editable={!loginMutation.isPending}
      />

      {loginMutation.isError && (
        <Text className="text-red-500 mb-4">{loginMutation.error.message}</Text>
      )}

      <TouchableOpacity
        className="bg-blue-500 p-4 rounded-lg"
        onPress={handleLogin}
        disabled={loginMutation.isPending}
      >
        <Text className="text-white text-center font-semibold">
          {loginMutation.isPending ? 'Loading...' : 'Login'}
        </Text>
      </TouchableOpacity>
    </View>
  )
}

/**
 * Example 3: Register Component
 */
export function RegisterExample() {
  const [formData, setFormData] = useState<RegisterRequest>({
    email: '',
    password: '',
    full_name: '',
    phone: '',
  })

  const registerMutation = useMutation({
    mutationFn: authService.register,
    onSuccess: (data) => {
      Alert.alert('Success', `Account created for ${data.data.user.email}!`)
      // Navigate to verification screen (no tokens returned, requires email verification)
    },
    onError: (error: AuthError) => {
      if (error.code === 'EMAIL_ALREADY_EXISTS') {
        Alert.alert('Error', 'This email is already registered')
      } else {
        Alert.alert('Error', error.message)
      }
    },
  })

  const handleRegister = () => {
    registerMutation.mutate(formData)
  }

  return (
    <View className="p-4">
      <Text className="text-2xl font-bold mb-4">Create Account</Text>

      <TextInput
        className="border border-gray-300 rounded-lg p-3 mb-4"
        placeholder="Full Name"
        value={formData.full_name}
        onChangeText={(full_name) => setFormData({ ...formData, full_name })}
      />

      <TextInput
        className="border border-gray-300 rounded-lg p-3 mb-4"
        placeholder="Email"
        value={formData.email}
        onChangeText={(email) => setFormData({ ...formData, email })}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TextInput
        className="border border-gray-300 rounded-lg p-3 mb-4"
        placeholder="Phone (optional)"
        value={formData.phone}
        onChangeText={(phone) => setFormData({ ...formData, phone })}
        keyboardType="phone-pad"
      />

      <TextInput
        className="border border-gray-300 rounded-lg p-3 mb-4"
        placeholder="Password"
        value={formData.password}
        onChangeText={(password) => setFormData({ ...formData, password })}
        secureTextEntry
      />

      <TouchableOpacity
        className="bg-blue-500 p-4 rounded-lg"
        onPress={handleRegister}
        disabled={registerMutation.isPending}
      >
        <Text className="text-white text-center font-semibold">
          {registerMutation.isPending ? 'Creating Account...' : 'Sign Up'}
        </Text>
      </TouchableOpacity>
    </View>
  )
}

/**
 * Example 4: Password Reset Flow
 */
export function PasswordResetExample() {
  const [email, setEmail] = useState('')
  const [step, setStep] = useState<'request' | 'confirm'>('request')
  const [token, setToken] = useState('')
  const [newPassword, setNewPassword] = useState('')

  const requestMutation = useMutation({
    mutationFn: authService.requestPasswordReset,
    onSuccess: () => {
      Alert.alert('Success', 'Check your email for reset instructions')
      setStep('confirm')
    },
  })

  const confirmMutation = useMutation({
    mutationFn: authService.confirmPasswordReset,
    onSuccess: () => {
      Alert.alert('Success', 'Password has been reset')
      // Navigate to login
    },
  })

  if (step === 'request') {
    return (
      <View className="p-4">
        <Text className="text-2xl font-bold mb-4">Reset Password</Text>

        <TextInput
          className="border border-gray-300 rounded-lg p-3 mb-4"
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <TouchableOpacity
          className="bg-blue-500 p-4 rounded-lg"
          onPress={() => requestMutation.mutate({ email })}
          disabled={requestMutation.isPending}
        >
          <Text className="text-white text-center font-semibold">
            Send Reset Email
          </Text>
        </TouchableOpacity>
      </View>
    )
  }

  return (
    <View className="p-4">
      <Text className="text-2xl font-bold mb-4">Enter New Password</Text>

      <TextInput
        className="border border-gray-300 rounded-lg p-3 mb-4"
        placeholder="Reset Token (from email)"
        value={token}
        onChangeText={setToken}
      />

      <TextInput
        className="border border-gray-300 rounded-lg p-3 mb-4"
        placeholder="New Password"
        value={newPassword}
        onChangeText={setNewPassword}
        secureTextEntry
      />

      <TouchableOpacity
        className="bg-blue-500 p-4 rounded-lg"
        onPress={() => confirmMutation.mutate({ token, new_password: newPassword })}
        disabled={confirmMutation.isPending}
      >
        <Text className="text-white text-center font-semibold">
          Reset Password
        </Text>
      </TouchableOpacity>
    </View>
  )
}

/**
 * Example 5: Get Current User
 */
export function CurrentUserExample() {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  const fetchCurrentUser = async () => {
    try {
      setLoading(true)
      const userData = await authService.getCurrentUser()
      setUser(userData)
    } catch (error) {
      Alert.alert('Error', 'Failed to load user data')
    } finally {
      setLoading(false)
    }
  }

  return (
    <View className="p-4">
      <TouchableOpacity
        className="bg-blue-500 p-4 rounded-lg mb-4"
        onPress={fetchCurrentUser}
        disabled={loading}
      >
        <Text className="text-white text-center font-semibold">
          Load User Data
        </Text>
      </TouchableOpacity>

      {user && (
        <View className="bg-gray-100 p-4 rounded-lg">
          <Text className="font-bold mb-2">User Info:</Text>
          <Text>Name: {user.full_name}</Text>
          <Text>Email: {user.email}</Text>
          <Text>Phone: {user.phone || 'N/A'}</Text>
        </View>
      )}
    </View>
  )
}
