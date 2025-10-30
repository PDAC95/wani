/**
 * Transactions Screen
 * Full list of all transactions with filters
 */

import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useState } from 'react'
import { Icon } from '../../shared/components/ui/Icon'
import { TransactionItem, type Transaction } from '../../features/wallet/components/TransactionItem'

// Mock data - Extended list
const mockTransactions: Transaction[] = [
  {
    id: '1',
    name: 'Eva Novak',
    type: 'received',
    amount: 5710.20,
    currency: 'USD',
    timestamp: 'Today',
    status: 'completed',
  },
  {
    id: '2',
    name: 'Binance',
    type: 'received',
    amount: 714.00,
    currency: 'USD',
    timestamp: 'Today',
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
  {
    id: '5',
    name: 'Nike',
    type: 'sent',
    amount: 328.96,
    currency: 'USD',
    timestamp: '19 November',
    status: 'completed',
  },
  {
    id: '6',
    name: 'Matteo Ricci',
    type: 'received',
    amount: 548.00,
    currency: 'USD',
    timestamp: '19 November',
    status: 'completed',
  },
  {
    id: '7',
    name: 'Megogo',
    type: 'sent',
    amount: 847.20,
    currency: 'USD',
    timestamp: '18 November',
    status: 'completed',
  },
  {
    id: '8',
    name: 'Emilia Costa',
    type: 'received',
    amount: 147.00,
    currency: 'USD',
    timestamp: '18 November',
    status: 'completed',
  },
]

type FilterType = 'all' | 'received' | 'sent'

export default function TransactionsScreen() {
  const [filter, setFilter] = useState<FilterType>('all')

  const filteredTransactions = mockTransactions.filter((t) => {
    if (filter === 'all') return true
    return t.type === filter
  })

  // Group by date
  const groupedTransactions = filteredTransactions.reduce((acc, transaction) => {
    const date = transaction.timestamp
    if (!acc[date]) {
      acc[date] = []
    }
    acc[date].push(transaction)
    return acc
  }, {} as Record<string, Transaction[]>)

  return (
    <SafeAreaView className="flex-1 bg-mint" edges={['top']}>
      <View className="flex-1">
        {/* Header */}
        <View className="px-5 pt-4 pb-4 flex-row items-center justify-between">
          <Text className="text-brown font-bold text-2xl">Transactions</Text>
          <TouchableOpacity className="w-10 h-10 items-center justify-center">
            <Icon name="scan" size="md" />
          </TouchableOpacity>
        </View>

        {/* Card Selector */}
        <View className="px-5 pb-4">
          <View className="bg-brown rounded-2xl px-4 py-3 flex-row items-center justify-between">
            <Text className="text-white font-semibold">•••• 2872</Text>
            <Icon name="chevron-right" size="sm" className="text-white" />
          </View>
        </View>

        {/* Filters */}
        <View className="px-5 pb-4 flex-row gap-3">
          <TouchableOpacity
            onPress={() => setFilter('all')}
            className={`px-5 py-2 rounded-full ${
              filter === 'all' ? 'bg-brown' : 'bg-white'
            }`}
          >
            <Text
              className={`font-semibold ${
                filter === 'all' ? 'text-white' : 'text-brown'
              }`}
            >
              All
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setFilter('received')}
            className={`px-5 py-2 rounded-full ${
              filter === 'received' ? 'bg-brown' : 'bg-white'
            }`}
          >
            <Text
              className={`font-semibold ${
                filter === 'received' ? 'text-white' : 'text-brown'
              }`}
            >
              Received
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setFilter('sent')}
            className={`px-5 py-2 rounded-full ${
              filter === 'sent' ? 'bg-brown' : 'bg-white'
            }`}
          >
            <Text
              className={`font-semibold ${
                filter === 'sent' ? 'text-white' : 'text-brown'
              }`}
            >
              Sent
            </Text>
          </TouchableOpacity>
        </View>

        {/* Transactions List */}
        <ScrollView className="flex-1 px-5">
          {Object.entries(groupedTransactions).map(([date, transactions]) => (
            <View key={date} className="mb-6">
              <Text className="text-brown/60 text-sm font-medium mb-3">{date}</Text>
              {transactions.map((transaction) => (
                <TransactionItem key={transaction.id} transaction={transaction} />
              ))}
            </View>
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  )
}
