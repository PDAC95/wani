/**
 * Send/Pay Screen
 * Screen for sending money with numpad
 */

import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useState } from 'react'
import { Avatar } from '../../shared/components/ui/Avatar'
import { Button } from '../../shared/components/ui/Button'
import { Icon } from '../../shared/components/ui/Icon'
import { colors, spacing, borderRadius, typography, shadows } from '../../shared/theme'

interface NumpadButtonProps {
  value: string
  onPress: (value: string) => void
}

function NumpadButton({ value, onPress }: NumpadButtonProps) {
  return (
    <TouchableOpacity
      onPress={() => onPress(value)}
      style={styles.numpadButton}
      activeOpacity={0.7}
    >
      <Text style={styles.numpadButtonText}>{value}</Text>
    </TouchableOpacity>
  )
}

export default function SendScreen() {
  const [amount, setAmount] = useState('0')
  const [note, setNote] = useState('')

  const handleNumberPress = (num: string) => {
    if (amount === '0') {
      setAmount(num)
    } else if (amount.length < 10) {
      setAmount(amount + num)
    }
  }

  const handleDecimalPress = () => {
    if (!amount.includes('.') && amount.length < 10) {
      setAmount(amount + '.')
    }
  }

  const handleDeletePress = () => {
    if (amount.length === 1) {
      setAmount('0')
    } else {
      setAmount(amount.slice(0, -1))
    }
  }

  const formatAmount = (value: string) => {
    const num = parseFloat(value)
    if (isNaN(num)) return '0.00'
    return num.toFixed(2)
  }

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.flex1}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.iconButton}>
            <Icon name="close" size="md" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Pay</Text>
          <TouchableOpacity style={styles.iconButton}>
            <Icon name="more" size="md" />
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.flex1} contentContainerStyle={styles.scrollContent}>
          {/* Content */}
          <View style={styles.content}>
            {/* Recipient */}
            <View style={styles.recipientCard}>
              <View style={styles.recipientRow}>
                <View style={styles.recipientInfo}>
                  <Avatar name="Matteo Ricci" size="md" />
                  <View style={styles.recipientDetails}>
                    <Text style={styles.recipientName}>Matteo Ricci</Text>
                    <Text style={styles.recipientAccount}>1111 *** **** 1720</Text>
                  </View>
                </View>
                <TouchableOpacity>
                  <Text style={styles.changeText}>Change</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Amount Display */}
            <View style={styles.amountContainer}>
              <Text style={styles.amountText}>
                ${formatAmount(amount)}
              </Text>
              <Text style={styles.balanceText}>
                Balance: $126,887.09
              </Text>
            </View>

            {/* Available Note */}
            <View style={styles.noteContainer}>
              <Icon name="profile" size="sm" style={styles.noteIcon} />
              <Text style={styles.noteText}>Note</Text>
            </View>

            {/* Numpad */}
            <View style={styles.numpadContainer}>
              <View style={styles.numpadRow}>
                <NumpadButton value="1" onPress={handleNumberPress} />
                <NumpadButton value="2" onPress={handleNumberPress} />
                <NumpadButton value="3" onPress={handleNumberPress} />
              </View>
              <View style={styles.numpadRow}>
                <NumpadButton value="4" onPress={handleNumberPress} />
                <NumpadButton value="5" onPress={handleNumberPress} />
                <NumpadButton value="6" onPress={handleNumberPress} />
              </View>
              <View style={styles.numpadRow}>
                <NumpadButton value="7" onPress={handleNumberPress} />
                <NumpadButton value="8" onPress={handleNumberPress} />
                <NumpadButton value="9" onPress={handleNumberPress} />
              </View>
              <View style={styles.numpadRow}>
                <TouchableOpacity
                  onPress={handleDecimalPress}
                  style={styles.numpadButton}
                  activeOpacity={0.7}
                >
                  <Text style={styles.numpadButtonText}>.</Text>
                </TouchableOpacity>
                <NumpadButton value="0" onPress={handleNumberPress} />
                <TouchableOpacity
                  onPress={handleDeletePress}
                  style={styles.numpadButton}
                  activeOpacity={0.7}
                >
                  <Icon name="close" size="md" />
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {/* Send Button */}
          <View style={styles.buttonContainer}>
            <Button
              variant="primary"
              size="lg"
              onPress={() => {
                console.log('Sending:', amount)
              }}
            >
              Send
            </Button>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.coralLight,
  },
  flex1: {
    flex: 1,
  },
  header: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
    paddingBottom: spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  iconButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    color: colors.brown,
    fontWeight: typography.weights.bold,
    fontSize: typography.sizes.xl,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: spacing.lg,
  },
  content: {
    flex: 1,
    paddingHorizontal: spacing.lg,
  },
  recipientCard: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.xl,
    padding: spacing.lg,
    marginBottom: spacing.lg,
    ...shadows.md,
  },
  recipientRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  recipientInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  recipientDetails: {
    marginLeft: spacing.md,
    flex: 1,
  },
  recipientName: {
    color: colors.brown,
    fontWeight: typography.weights.bold,
    fontSize: typography.sizes.base,
  },
  recipientAccount: {
    color: colors.textSecondary,
    fontSize: typography.sizes.sm,
  },
  changeText: {
    color: colors.textSecondary,
    fontWeight: typography.weights.medium,
    fontSize: typography.sizes.sm,
  },
  amountContainer: {
    alignItems: 'center',
    paddingVertical: spacing.xl,
  },
  amountText: {
    color: colors.brown,
    fontSize: 56,
    fontWeight: typography.weights.bold,
    marginBottom: spacing.sm,
  },
  balanceText: {
    color: colors.textSecondary,
    fontSize: typography.sizes.base,
  },
  noteContainer: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.lg,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    marginBottom: spacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
    ...shadows.md,
  },
  noteIcon: {
    marginRight: spacing.sm,
  },
  noteText: {
    color: colors.textSecondary,
    fontSize: typography.sizes.sm,
    flex: 1,
  },
  numpadContainer: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.xl,
    padding: spacing.lg,
    ...shadows.md,
  },
  numpadRow: {
    flexDirection: 'row',
  },
  numpadButton: {
    flex: 1,
    aspectRatio: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  numpadButtonText: {
    color: colors.brown,
    fontSize: typography.sizes.xxxl,
    fontWeight: typography.weights.semibold,
  },
  buttonContainer: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.lg,
    paddingTop: spacing.md,
  },
})
