/**
 * Icon Component
 * Simple icon wrapper using emoji/text icons
 * TODO: Replace with proper icon library (like @expo/vector-icons) if needed
 */

import { Text, View, StyleSheet, type ViewStyle, type TextStyle } from 'react-native'
import { typography } from '../../theme'

interface IconProps {
  name: IconName
  size?: 'sm' | 'md' | 'lg'
  style?: ViewStyle
  textStyle?: TextStyle
}

export type IconName =
  | 'home'
  | 'send'
  | 'receive'
  | 'transfer'
  | 'transactions'
  | 'profile'
  | 'settings'
  | 'scan'
  | 'share'
  | 'more'
  | 'bell'
  | 'chart'
  | 'eye'
  | 'eye-off'
  | 'arrow-up'
  | 'arrow-down'
  | 'chevron-right'
  | 'check'
  | 'close'
  | 'plus'

const iconMap: Record<IconName, string> = {
  home: '🏠',
  send: '↗️',
  receive: '↙️',
  transfer: '↔️',
  transactions: '📝',
  profile: '👤',
  settings: '⚙️',
  scan: '📷',
  share: '↗️',
  more: '•••',
  bell: '🔔',
  chart: '📊',
  eye: '👁',
  'eye-off': '🙈',
  'arrow-up': '↑',
  'arrow-down': '↓',
  'chevron-right': '›',
  check: '✓',
  close: '✕',
  plus: '+',
}

export function Icon({ name, size = 'md', style, textStyle }: IconProps) {
  const sizeStyles: Record<string, TextStyle> = {
    sm: { fontSize: typography.sizes.base },
    md: { fontSize: typography.sizes.xxl },
    lg: { fontSize: typography.sizes.xxxxl },
  }

  return (
    <View style={[styles.container, style]}>
      <Text style={[sizeStyles[size], textStyle]}>
        {iconMap[name]}
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
})
