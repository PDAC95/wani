# Zustand Store Structure

This directory contains global state management using Zustand.

## 📁 Store Organization

```
store/
├── authStore.ts      # Authentication state
├── walletStore.ts    # Wallet state
├── index.ts          # Central exports
└── README.md         # This file
```

## 🎯 When to Use Zustand vs React Query

### Use Zustand for:
- **Client-side state**: UI state, preferences, temporary data
- **Authentication state**: User data, tokens, session info
- **Global UI state**: Modals, notifications, theme
- **Form state** (if not using React Hook Form)

### Use React Query for:
- **Server state**: Data from API
- **Cached data**: Transactions, wallet balance, user profile
- **Background syncing**: Auto-refetch, polling
- **Mutations**: POST, PUT, DELETE operations

## 📝 Store Patterns

### 1. Basic Store Usage

```typescript
import { useAuthStore } from '@/app/core/store'

function MyComponent() {
  // Get state
  const user = useAuthStore((state) => state.user)

  // Get actions
  const login = useAuthStore((state) => state.login)
  const logout = useAuthStore((state) => state.logout)

  return (
    <div>
      {user ? (
        <button onClick={logout}>Logout</button>
      ) : (
        <button onClick={() => login(userData, tokens)}>Login</button>
      )}
    </div>
  )
}
```

### 2. Using Selectors (Better Performance)

```typescript
import { useAuthStore, selectUser, selectIsAuthenticated } from '@/app/core/store'

function MyComponent() {
  // Only re-renders when these specific values change
  const user = useAuthStore(selectUser)
  const isAuthenticated = useAuthStore(selectIsAuthenticated)

  return <div>{user?.firstName}</div>
}
```

### 3. Accessing Store Outside Components

```typescript
import { useAuthStore } from '@/app/core/store'

// In API interceptor, service, or utility function
export const getAuthToken = () => {
  return useAuthStore.getState().getAccessToken()
}

// Call actions
export const forceLogout = () => {
  useAuthStore.getState().logout()
}
```

### 4. Multiple Store Values

```typescript
import { useAuthStore } from '@/app/core/store'

function MyComponent() {
  // Get multiple values at once
  const { user, isAuthenticated, logout } = useAuthStore((state) => ({
    user: state.user,
    isAuthenticated: state.isAuthenticated,
    logout: state.logout,
  }))

  return <div>...</div>
}
```

### 5. Subscribing to Changes

```typescript
import { useEffect } from 'react'
import { useAuthStore } from '@/app/core/store'

useEffect(() => {
  // Subscribe to user changes
  const unsubscribe = useAuthStore.subscribe(
    (state) => state.user,
    (user) => {
      console.log('User changed:', user)
    }
  )

  return () => unsubscribe()
}, [])
```

## 🔐 Auth Store

### State
- `user: User | null` - Current user data
- `tokens: AuthTokens | null` - Access & refresh tokens
- `isAuthenticated: boolean` - Auth status
- `isLoading: boolean` - Loading state

### Actions
- `login(user, tokens)` - Set user and tokens
- `logout()` - Clear all auth data
- `setUser(user)` - Update user
- `setTokens(tokens)` - Update tokens
- `updateUser(updates)` - Partial user update
- `clearAuth()` - Reset to initial state

### Helpers
- `isTokenExpired()` - Check token expiration
- `getAccessToken()` - Get access token
- `getRefreshToken()` - Get refresh token

## 💰 Wallet Store

### State
- `wallet: Wallet | null` - Wallet data
- `isLoading: boolean` - Loading state
- `error: string | null` - Error message

### Actions
- `setWallet(wallet)` - Set wallet data
- `updateBalance(balance)` - Update balance
- `clearWallet()` - Clear wallet data
- `setLoading(isLoading)` - Set loading
- `setError(error)` - Set error

### Helpers
- `getAvailableBalance()` - Get available balance
- `hasWallet()` - Check if user has wallet

## 🔧 Best Practices

### 1. Persist Only Necessary Data
```typescript
persist(
  (set, get) => ({ /* store */ }),
  {
    name: 'storage-key',
    partialize: (state) => ({
      // Only persist these fields
      user: state.user,
      tokens: state.tokens,
    }),
  }
)
```

### 2. Use Immer for Complex Updates (if needed)
```typescript
import { produce } from 'immer'

set(produce((state) => {
  state.user.firstName = 'New Name'
  state.user.updatedAt = new Date().toISOString()
}))
```

### 3. Split Large Stores
Instead of one huge store, create multiple focused stores:
- `authStore.ts` - Authentication
- `walletStore.ts` - Wallet data
- `uiStore.ts` - UI state (modals, notifications)
- `preferencesStore.ts` - User preferences

### 4. Type Safety
Always define TypeScript interfaces for state and actions.

### 5. Avoid Storing Server Data
Don't store data that should be managed by React Query:
- ❌ Don't: `transactions: Transaction[]`
- ✅ Do: Use `useQuery` for transactions

## 🧪 Testing Stores

```typescript
import { renderHook, act } from '@testing-library/react'
import { useAuthStore } from '@/app/core/store'

describe('AuthStore', () => {
  beforeEach(() => {
    // Reset store before each test
    useAuthStore.getState().clearAuth()
  })

  it('should login user', () => {
    const { result } = renderHook(() => useAuthStore())

    act(() => {
      result.current.login(mockUser, mockTokens)
    })

    expect(result.current.user).toEqual(mockUser)
    expect(result.current.isAuthenticated).toBe(true)
  })
})
```

## 📚 Resources

- [Zustand Documentation](https://docs.pmnd.rs/zustand/getting-started/introduction)
- [Zustand Persist Middleware](https://docs.pmnd.rs/zustand/integrations/persisting-store-data)
- [Zustand Best Practices](https://docs.pmnd.rs/zustand/guides/practice-with-no-store-actions)
