/**
 * Home Screen
 * Main dashboard with balance, quick actions, and recent transactions
 */

import { View, Text, ScrollView, RefreshControl, TouchableOpacity, StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useState } from 'react'
import { Avatar } from '../shared/components/ui/Avatar'
import { Icon } from '../shared/components/ui/Icon'
import { BalanceCard } from '../features/wallet/components/BalanceCard'
import { QuickActions } from '../features/wallet/components/QuickActions'
import { TransactionItem, type Transaction } from '../features/wallet/components/TransactionItem'
import { CurrencyCard } from '../features/wallet/components/CurrencyCard'
import { colors, spacing, typography } from '../shared/theme'

// Mock data
const mockTransactions: Transaction[] = [
  {
    id: '1',
    name: 'Eva Novak',
    type: 'received',
    amount: 5710.20,
    currency: 'USD',
    timestamp: '1 min ago',
    status: 'completed',
  },
  {
    id: '2',
    name: 'Binance',
    type: 'received',
    amount: 714.00,
    currency: 'USD',
    timestamp: '2 hours ago',
    status: 'completed',
  },
  {
    id: '3',
    name: 'Henrik Jansen',
    type: 'received',
    amount: 428.00,
    currency: 'USD',
    timestamp: 'Yesterday',
    status: 'completed',
  },
  {
    id: '4',
    name: 'Multiplex',
    type: 'sent',
    amount: 124.55,
    currency: 'USD',
    timestamp: 'Yesterday',
    status: 'completed',
  },
]

export default function HomeScreen() {
  const [refreshing, setRefreshing] = useState(false)
  const [balanceVisible, setBalanceVisible] = useState(true)

  const onRefresh = async () => {
    setRefreshing(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setRefreshing(false)
  }

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={colors.brown}
          />
        }
      >
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Avatar name="Leandro Foster" size="md" />
            <View style={styles.headerText}>
              <Text style={styles.welcomeText}>Welcome back</Text>
              <Text style={styles.nameText}>Hi, Leandro!</Text>
            </View>
          </View>

          <View style={styles.headerRight}>
            <TouchableOpacity style={styles.iconButton}>
              <Icon name="bell" size="md" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconButton}>
              <Icon name="chart" size="md" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Balance Card */}
        <View style={styles.balanceSection}>
          <BalanceCard
            balance={26887.09}
            currency="USD"
            change={421.03}
            exchangeRate="1 USD = EUR 0.95 • GBR 0.79"
            isVisible={balanceVisible}
            onToggleVisibility={() => setBalanceVisible(!balanceVisible)}
          />
        </View>

        {/* Quick Actions */}
        <QuickActions />

        {/* Latest Transactions */}
        <View style={styles.transactionsSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Latest Transactions</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>

          {mockTransactions.map((transaction) => (
            <TransactionItem key={transaction.id} transaction={transaction} />
          ))}
        </View>

        {/* Currency Section */}
        <View style={styles.currencySection}>
          <Text style={styles.sectionTitle}>Currency</Text>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.currencyScroll}
          >
            <CurrencyCard symbol="€" name="Euro" rate={0.97} />
            <CurrencyCard symbol="£" name="British pound" rate={0.82} />
            <CurrencyCard variant="add" symbol="" name="" rate={0} />
          </ScrollView>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.coralLight,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: spacing.lg,
  },
  header: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
    paddingBottom: spacing.sm,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerText: {
    marginLeft: spacing.md,
  },
  welcomeText: {
    color: colors.brownTransparent,
    fontSize: typography.sizes.xs,
  },
  nameText: {
    color: colors.brown,
    fontWeight: typography.weights.bold,
    fontSize: typography.sizes.lg,
  },
  headerRight: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  iconButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  balanceSection: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
    paddingBottom: spacing.md,
  },
  transactionsSection: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.md,
  },
  sectionTitle: {
    color: colors.brown,
    fontWeight: typography.weights.bold,
    fontSize: typography.sizes.xl,
  },
  seeAllText: {
    color: colors.brownTransparent,
    fontSize: typography.sizes.sm,
    fontWeight: typography.weights.medium,
  },
  currencySection: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.xl,
  },
  currencyScroll: {
    gap: spacing.md,
    marginTop: spacing.md,
  },
})
