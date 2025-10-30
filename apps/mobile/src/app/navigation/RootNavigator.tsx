/**
 * Root Navigator
 * Main navigation structure for the app
 */

import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { useAuthStore } from '@/core/store'
import type { RootStackParamList, AuthStackParamList } from './types'

// Screens
import WelcomeScreen from '../screens/auth/WelcomeScreen.v2'
import LoginScreen from '../screens/auth/LoginScreen'
import RegisterScreen from '../screens/auth/RegisterScreen'
import { TabNavigator } from './TabNavigator'

const RootStack = createNativeStackNavigator<RootStackParamList>()
const AuthStack = createNativeStackNavigator<AuthStackParamList>()

/**
 * Auth Navigator
 * Contains authentication screens
 */
function AuthNavigator() {
  return (
    <AuthStack.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
      }}
      initialRouteName="Welcome"
    >
      <AuthStack.Screen name="Welcome" component={WelcomeScreen} />
      <AuthStack.Screen name="Login" component={LoginScreen} />
      <AuthStack.Screen name="Register" component={RegisterScreen} />
    </AuthStack.Navigator>
  )
}

/**
 * Root Navigator
 * Main app navigation
 *
 * Auto-navigation based on authentication state:
 * - When user logs in or registers, isAuthenticated becomes true → navigates to Main (Dashboard)
 * - When user logs out, isAuthenticated becomes false → navigates to Auth (Welcome)
 */
export default function RootNavigator() {
  // Get authentication state from Zustand store
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)

  return (
    <NavigationContainer>
      <RootStack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        {!isAuthenticated ? (
          // Auth Stack (Welcome, Login, Register)
          <RootStack.Screen name="Auth" component={AuthNavigator} />
        ) : (
          // Main App with Tabs (Dashboard, etc.)
          <RootStack.Screen name="Main" component={TabNavigator} />
        )}
      </RootStack.Navigator>
    </NavigationContainer>
  )
}
