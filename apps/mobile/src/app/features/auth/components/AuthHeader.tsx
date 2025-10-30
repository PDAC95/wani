/**
 * AuthHeader Component
 *
 * Header component for authentication screens (Login/Register)
 * Displays the Wani logo and branding
 */

import React from 'react'
import { View, Image, Text } from 'react-native'

interface AuthHeaderProps {
  title?: string
  subtitle?: string
  showLogo?: boolean
}

export default function AuthHeader({
  title = 'Wani',
  subtitle = 'Cross-Border Payments Made Simple',
  showLogo = true,
}: AuthHeaderProps) {
  return (
    <View className="items-center mb-8">
      {/* Logo */}
      {showLogo && (
        <Image
          source={require('@/../../assets/images/logo-vertical-naranja.png')}
          className="w-40 h-40 mb-4"
          resizeMode="contain"
          accessibilityLabel="Wani Logo"
        />
      )}

      {/* Title */}
      <Text className="text-3xl font-bold text-slate-800 mb-2">
        {title}
      </Text>

      {/* Subtitle */}
      <Text className="text-base text-slate-600 text-center px-4">
        {subtitle}
      </Text>
    </View>
  )
}

// Ejemplo de uso:
// <AuthHeader
//   title="Welcome Back"
//   subtitle="Sign in to continue to Wani"
// />
