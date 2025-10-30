/**
 * Profile Screen
 * User profile with stats and settings
 */

import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Avatar } from '../../shared/components/ui/Avatar'
import { Card } from '../../shared/components/ui/Card'
import { Icon } from '../../shared/components/ui/Icon'
import { colors, spacing, borderRadius, typography, shadows } from '../../shared/theme'

interface StatCardProps {
  label: string
  value: string
  trend?: number
}

function StatCard({ label, value, trend }: StatCardProps) {
  const trendColor = trend !== undefined && trend >= 0 ? colors.success : colors.error

  return (
    <Card variant="flat" style={styles.statCard}>
      <Text style={styles.statLabel}>{label}</Text>
      <Text style={styles.statValue}>{value}</Text>
      {trend !== undefined && (
        <View style={styles.trendContainer}>
          <Icon
            name={trend >= 0 ? 'arrow-up' : 'arrow-down'}
            size="sm"
            textStyle={{ color: trendColor }}
          />
          <Text style={[styles.trendText, { color: trendColor }]}>
            {Math.abs(trend)}%
          </Text>
        </View>
      )}
    </Card>
  )
}

interface MenuItemProps {
  icon: string
  label: string
  onPress: () => void
}

function MenuItem({ icon, label, onPress }: MenuItemProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={styles.menuItem}
      activeOpacity={0.7}
    >
      <View style={styles.menuItemContent}>
        <View style={styles.menuItemIconContainer}>
          <Text style={styles.menuItemIcon}>{icon}</Text>
        </View>
        <Text style={styles.menuItemLabel}>{label}</Text>
      </View>

      <Icon name="chevron-right" size="md" textStyle={{ color: colors.brownTransparent }} />
    </TouchableOpacity>
  )
}

export default function ProfileScreen() {
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView style={styles.flex1} contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Profile</Text>
          <TouchableOpacity style={styles.iconButton}>
            <Icon name="settings" size="md" />
          </TouchableOpacity>
        </View>

        {/* User Info */}
        <View style={styles.userInfo}>
          <Avatar name="Leandro Foster" size="xl" style={styles.avatar} />
          <Text style={styles.userName}>Leandro Foster</Text>
          <Text style={styles.userEmail}>leandro@gmail.com</Text>
        </View>

        {/* Stats */}
        <View style={styles.statsSection}>
          <Text style={styles.sectionTitle}>Total Rate</Text>
          <Card variant="default" style={styles.totalRateCard}>
            <View style={styles.totalRateContent}>
              <Text style={styles.totalSpendLabel}>Total Spend</Text>
              <Text style={styles.totalSpendAmount}>$118,952.34</Text>

              {/* Simple chart visualization placeholder */}
              <View style={styles.chartPlaceholder}>
                <Text style={styles.chartPlaceholderText}>Chart Visualization</Text>
              </View>

              <TouchableOpacity style={styles.viewYearlyButton}>
                <Text style={styles.viewYearlyText}>View Yearly</Text>
              </TouchableOpacity>
            </View>
          </Card>

          {/* Stats Grid */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.statsGrid}
          >
            <StatCard label="Total Sent" value="$45.2K" trend={12} />
            <StatCard label="Total Received" value="$73.7K" trend={8} />
            <StatCard label="Transactions" value="142" trend={-3} />
          </ScrollView>
        </View>

        {/* Menu Items */}
        <View style={styles.menuSection}>
          <MenuItem icon="🔔" label="Notifications" onPress={() => {}} />
          <MenuItem icon="❓" label="How It Works" onPress={() => {}} />
          <MenuItem icon="⭐" label="Rate us" onPress={() => {}} />
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
  flex1: {
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
  headerTitle: {
    color: colors.brown,
    fontWeight: typography.weights.bold,
    fontSize: typography.sizes.xxl,
  },
  iconButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  userInfo: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.xl,
    alignItems: 'center',
  },
  avatar: {
    marginBottom: spacing.md,
  },
  userName: {
    color: colors.brown,
    fontWeight: typography.weights.bold,
    fontSize: typography.sizes.xxl,
    marginBottom: spacing.xs,
  },
  userEmail: {
    color: colors.textSecondary,
    fontSize: typography.sizes.base,
  },
  statsSection: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.xl,
  },
  sectionTitle: {
    color: colors.brown,
    fontWeight: typography.weights.bold,
    fontSize: typography.sizes.xl,
    marginBottom: spacing.md,
  },
  totalRateCard: {
    marginBottom: spacing.lg,
  },
  totalRateContent: {
    alignItems: 'center',
    paddingVertical: spacing.md,
  },
  totalSpendLabel: {
    color: colors.textSecondary,
    fontSize: typography.sizes.sm,
    marginBottom: spacing.sm,
  },
  totalSpendAmount: {
    color: colors.brown,
    fontSize: typography.sizes.xxxxl,
    fontWeight: typography.weights.bold,
    marginBottom: spacing.md,
  },
  chartPlaceholder: {
    width: '100%',
    height: 128,
    backgroundColor: colors.coralLight + '33',
    borderRadius: borderRadius.lg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  chartPlaceholderText: {
    color: colors.brownTransparent,
    fontSize: typography.sizes.sm,
  },
  viewYearlyButton: {
    marginTop: spacing.md,
  },
  viewYearlyText: {
    color: colors.textSecondary,
    fontSize: typography.sizes.sm,
    fontWeight: typography.weights.medium,
  },
  statsGrid: {
    gap: spacing.md,
    paddingBottom: spacing.md,
  },
  statCard: {
    flex: 1,
    minWidth: 150,
  },
  statLabel: {
    color: colors.textSecondary,
    fontSize: typography.sizes.xs,
    marginBottom: spacing.xs,
  },
  statValue: {
    color: colors.brown,
    fontSize: typography.sizes.xxl,
    fontWeight: typography.weights.bold,
    marginBottom: spacing.xs,
  },
  trendContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  trendText: {
    fontSize: typography.sizes.sm,
    marginLeft: spacing.xs,
  },
  menuSection: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.xl,
  },
  menuItem: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    marginBottom: spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    ...shadows.md,
  },
  menuItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  menuItemIconContainer: {
    width: 48,
    height: 48,
    backgroundColor: colors.coralLight,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuItemIcon: {
    fontSize: typography.sizes.xxl,
  },
  menuItemLabel: {
    color: colors.brown,
    fontWeight: typography.weights.semibold,
    fontSize: typography.sizes.base,
    marginLeft: spacing.md,
  },
})
