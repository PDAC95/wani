/**
 * Wani Mobile App
 * Root application component with navigation and providers
 */

import { StatusBar } from 'expo-status-bar'
import { QueryProvider } from './src/app/providers'
import { RootNavigator } from './src/app/navigation'
// import "./global.css" // Temporarily disabled - NativeWind compatibility issues on Windows

export default function App() {
  return (
    <QueryProvider>
      <RootNavigator />
      <StatusBar style="auto" />
    </QueryProvider>
  )
}
