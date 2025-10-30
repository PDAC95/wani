/**
 * Tab Navigator
 * Bottom tab navigation for main app screens
 */

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { View, Text } from 'react-native'
import HomeScreen from '../screens/HomeScreen'
import TransactionsScreen from '../screens/transactions/TransactionsScreen'
import ProfileScreen from '../screens/profile/ProfileScreen'
import SendScreen from '../screens/wallet/SendScreen'

const Tab = createBottomTabNavigator()

interface TabIconProps {
  focused: boolean
  icon: string
}

function TabIcon({ focused, icon }: TabIconProps) {
  return (
    <View
      className={`w-14 h-14 rounded-full items-center justify-center ${
        focused ? 'bg-brown' : 'bg-white'
      }`}
      style={{
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 8,
        elevation: 3,
      }}
    >
      <Text className={`text-2xl ${focused ? 'text-white' : 'text-brown'}`}>
        {icon}
      </Text>
    </View>
  )
}

export function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#9FD4C5',
          borderTopWidth: 0,
          height: 80,
          paddingBottom: 10,
          paddingTop: 10,
          elevation: 0,
          shadowOpacity: 0,
        },
        tabBarShowLabel: false,
        tabBarActiveTintColor: '#292524',
        tabBarInactiveTintColor: '#292524',
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused }) => <TabIcon focused={focused} icon="🏠" />,
        }}
      />
      <Tab.Screen
        name="Transactions"
        component={TransactionsScreen}
        options={{
          tabBarIcon: ({ focused }) => <TabIcon focused={focused} icon="📝" />,
        }}
      />
      <Tab.Screen
        name="Send"
        component={SendScreen}
        options={{
          tabBarIcon: ({ focused }) => <TabIcon focused={focused} icon="↗️" />,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ focused }) => <TabIcon focused={focused} icon="👤" />,
        }}
      />
    </Tab.Navigator>
  )
}
