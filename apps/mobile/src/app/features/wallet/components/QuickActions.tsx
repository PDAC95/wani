/**
 * Quick Actions Component
 * Pay, Transfer, Receive action buttons
 */

import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { Icon, type IconName } from '../../../shared/components/ui/Icon'
import { colors, spacing, typography, shadows } from '../../../shared/theme'

interface QuickAction {
  id: string
  label: string
  icon: IconName
  onPress: () => void
}

interface QuickActionsProps {
  actions?: QuickAction[]
}

const defaultActions: QuickAction[] = [
  {
    id: 'pay',
    label: 'Pay',
    icon: 'send',
    onPress: () => {},
  },
  {
    id: 'transfer',
    label: 'Transfer',
    icon: 'transfer',
    onPress: () => {},
  },
  {
    id: 'receive',
    label: 'Receive',
    icon: 'receive',
    onPress: () => {},
  },
]

export function QuickActions({ actions = defaultActions }: QuickActionsProps) {
  return (
    <View style={styles.container}>
      {actions.map((action) => (
        <TouchableOpacity
          key={action.id}
          onPress={action.onPress}
          style={styles.actionButton}
          activeOpacity={0.7}
        >
          <View style={styles.iconContainer}>
            <Icon name={action.icon} size="md" />
          </View>
          <Text style={styles.label}>{action.label}</Text>
        </TouchableOpacity>
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: spacing.md,
  },
  actionButton: {
    alignItems: 'center',
  },
  iconContainer: {
    width: 56,
    height: 56,
    backgroundColor: colors.white,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.sm,
    ...shadows.md,
  },
  label: {
    color: colors.brown,
    fontSize: typography.sizes.sm,
    fontWeight: typography.weights.medium,
  },
})
