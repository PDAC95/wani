/**
 * Transaction Item Component
 * Individual transaction in the list
 */

import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { Avatar } from '../../../shared/components/ui/Avatar'
import { colors, spacing, borderRadius, typography, shadows } from '../../../shared/theme'

export interface Transaction {
  id: string
  name: string
  type: 'sent' | 'received'
  amount: number
  currency: string
  timestamp: string
  avatar?: string
  status?: 'pending' | 'completed' | 'failed'
}

interface TransactionItemProps {
  transaction: Transaction
  onPress?: (transaction: Transaction) => void
}

export function TransactionItem({ transaction, onPress }: TransactionItemProps) {
  const { name, type, amount, currency, timestamp, avatar, status = 'completed' } = transaction

  const formatAmount = (amount: number, type: string) => {
    const prefix = type === 'received' ? '+' : '-'
    return `${prefix}$${amount.toFixed(2)}`
  }

  const getStatusIcon = () => {
    if (status === 'pending') return '⏱'
    if (status === 'failed') return '❌'
    return type === 'received' ? '↙️' : '↗️'
  }

  return (
    <TouchableOpacity
      onPress={() => onPress?.(transaction)}
      style={styles.container}
      activeOpacity={0.7}
    >
      {/* Left Side */}
      <View style={styles.leftSide}>
        <Avatar source={avatar} name={name} size="md" />

        <View style={styles.info}>
          <Text style={styles.name} numberOfLines={1}>
            {name}
          </Text>
          <View style={styles.statusRow}>
            <Text style={styles.statusText}>
              {type === 'received' ? 'Received' : 'Paid'}
            </Text>
            <Text style={styles.statusIcon}>{getStatusIcon()}</Text>
          </View>
        </View>
      </View>

      {/* Right Side */}
      <View style={styles.rightSide}>
        <Text
          style={[
            styles.amount,
            { color: type === 'received' ? colors.success : colors.brown }
          ]}
        >
          {formatAmount(amount, type)}
        </Text>
        <Text style={styles.timestamp}>{timestamp}</Text>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    marginBottom: spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    ...shadows.md,
  },
  leftSide: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  info: {
    marginLeft: spacing.md,
    flex: 1,
  },
  name: {
    color: colors.brown,
    fontWeight: typography.weights.semibold,
    fontSize: typography.sizes.base,
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  statusText: {
    color: colors.brownTransparent,
    fontSize: typography.sizes.xs,
    marginRight: 4,
  },
  statusIcon: {
    color: colors.brownTransparent,
    fontSize: typography.sizes.xs,
  },
  rightSide: {
    alignItems: 'flex-end',
    marginLeft: spacing.md,
  },
  amount: {
    fontSize: typography.sizes.base,
    fontWeight: typography.weights.bold,
  },
  timestamp: {
    color: colors.brownTransparent,
    fontSize: typography.sizes.xs,
    marginTop: 4,
  },
})
