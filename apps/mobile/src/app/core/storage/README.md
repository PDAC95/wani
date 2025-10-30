# Secure Storage - React Native

Secure storage module for sensitive data using `expo-secure-store`.

## Platform Support

- **iOS**: Uses Keychain
- **Android**: Uses EncryptedSharedPreferences
- **Web**: ⚠️ Not supported (use alternative storage)

---

## Installation

Already installed via:
```bash
npm install expo-secure-store --legacy-peer-deps
```

---

## Usage

### 1. Save Authentication Tokens

```typescript
import { saveTokens } from '@/core/storage'

// After successful login
const response = await authService.login(credentials)

await saveTokens({
  accessToken: response.data.tokens.access_token,
  refreshToken: response.data.tokens.refresh_token,
})
```

### 2. Retrieve Tokens

```typescript
import { getTokens } from '@/core/storage'

const tokens = await getTokens()

if (tokens) {
  console.log('Access Token:', tokens.accessToken)
  console.log('Refresh Token:', tokens.refreshToken)
} else {
  console.log('No tokens found - user needs to login')
}
```

### 3. Clear Tokens on Logout

```typescript
import { clearTokens } from '@/core/storage'

// On user logout
await clearTokens()
```

### 4. Clear All Data

```typescript
import { clearAll } from '@/core/storage'

// Clear everything (tokens + user info)
await clearAll()
```

### 5. Save Individual Token

```typescript
import { saveToken, STORAGE_KEYS } from '@/core/storage'

await saveToken(STORAGE_KEYS.ACCESS_TOKEN, 'eyJhbGc...')
```

### 6. Get Individual Token

```typescript
import { getToken, STORAGE_KEYS } from '@/core/storage'

const accessToken = await getToken(STORAGE_KEYS.ACCESS_TOKEN)
```

### 7. Remove Individual Token

```typescript
import { removeToken, STORAGE_KEYS } from '@/core/storage'

await removeToken(STORAGE_KEYS.ACCESS_TOKEN)
```

### 8. Save User Info

```typescript
import { saveUserInfo } from '@/core/storage'

await saveUserInfo(user.id, user.email)
```

### 9. Get User Info

```typescript
import { getUserInfo } from '@/core/storage'

const userInfo = await getUserInfo()
if (userInfo) {
  console.log('User ID:', userInfo.userId)
  console.log('Email:', userInfo.userEmail)
}
```

---

## Error Handling

```typescript
import { getTokens, SecureStorageError } from '@/core/storage'

try {
  const tokens = await getTokens()
  // Use tokens
} catch (error) {
  if (error instanceof SecureStorageError) {
    console.error('Storage error:', error.code)
    console.error('Message:', error.message)

    switch (error.code) {
      case 'NOT_AVAILABLE':
        // Handle platform not supporting secure storage
        break
      case 'RETRIEVE_FAILED':
        // Handle retrieval failure
        break
      case 'SAVE_FAILED':
        // Handle save failure
        break
      case 'DELETE_FAILED':
        // Handle deletion failure
        break
    }
  }
}
```

---

## Storage Keys

Available storage keys:

```typescript
import { STORAGE_KEYS } from '@/core/storage'

STORAGE_KEYS.ACCESS_TOKEN   // 'wani_access_token'
STORAGE_KEYS.REFRESH_TOKEN  // 'wani_refresh_token'
STORAGE_KEYS.USER_ID        // 'wani_user_id'
STORAGE_KEYS.USER_EMAIL     // 'wani_user_email'
```

---

## Integration with Auth Store (Zustand)

```typescript
// stores/authStore.ts
import { create } from 'zustand'
import { saveTokens, getTokens, clearAll } from '@/core/storage'

interface AuthStore {
  isAuthenticated: boolean
  login: (tokens: StoredTokens) => Promise<void>
  logout: () => Promise<void>
  loadTokens: () => Promise<void>
}

export const useAuthStore = create<AuthStore>((set) => ({
  isAuthenticated: false,

  login: async (tokens) => {
    await saveTokens(tokens)
    set({ isAuthenticated: true })
  },

  logout: async () => {
    await clearAll()
    set({ isAuthenticated: false })
  },

  loadTokens: async () => {
    const tokens = await getTokens()
    set({ isAuthenticated: !!tokens })
  },
}))
```

---

## Integration with API Client

Update `client.ts` to use secure storage:

```typescript
// core/api/client.ts
import { getToken, STORAGE_KEYS } from '@/core/storage'

api.interceptors.request.use(
  async (config) => {
    // Get access token from secure storage
    const accessToken = await getToken(STORAGE_KEYS.ACCESS_TOKEN)

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`
    }

    return config
  },
  (error) => Promise.reject(error)
)
```

---

## Check Platform Availability

```typescript
import { isSecureStorageAvailable } from '@/core/storage'

if (isSecureStorageAvailable()) {
  // Use secure storage
  await saveTokens(tokens)
} else {
  // Fallback to AsyncStorage or alert user
  console.warn('Secure storage not available on this platform')
}
```

---

## Best Practices

1. ✅ **Always use try-catch** when calling storage functions
2. ✅ **Clear tokens on logout** to prevent unauthorized access
3. ✅ **Never store tokens in AsyncStorage** for production - use SecureStore
4. ✅ **Check platform availability** before using (web not supported)
5. ✅ **Use TypeScript types** for type safety

---

## Security Notes

- **iOS Keychain**: Encrypted by default, survives app uninstall (configurable)
- **Android EncryptedSharedPreferences**: Uses hardware-backed keystore when available
- **Web**: SecureStore is NOT available - consider alternative like httpOnly cookies

---

## API Reference

### Core Functions

| Function | Description | Returns |
|----------|-------------|---------|
| `saveToken(key, value)` | Save single token | `Promise<void>` |
| `getToken(key)` | Get single token | `Promise<string \| null>` |
| `removeToken(key)` | Remove single token | `Promise<void>` |

### Token Management

| Function | Description | Returns |
|----------|-------------|---------|
| `saveTokens(tokens)` | Save access + refresh tokens | `Promise<void>` |
| `getTokens()` | Get both tokens | `Promise<StoredTokens \| null>` |
| `clearTokens()` | Clear both tokens | `Promise<void>` |

### User Info Management

| Function | Description | Returns |
|----------|-------------|---------|
| `saveUserInfo(id, email)` | Save user info | `Promise<void>` |
| `getUserInfo()` | Get user info | `Promise<{userId, userEmail} \| null>` |

### Utilities

| Function | Description | Returns |
|----------|-------------|---------|
| `clearAll()` | Clear all stored data | `Promise<void>` |
| `isSecureStorageAvailable()` | Check platform support | `boolean` |

---

## Testing

```typescript
// Test saving and retrieving tokens
describe('SecureStorage', () => {
  it('should save and retrieve tokens', async () => {
    const tokens = {
      accessToken: 'test-access-token',
      refreshToken: 'test-refresh-token',
    }

    await saveTokens(tokens)
    const retrieved = await getTokens()

    expect(retrieved).toEqual(tokens)
  })

  it('should clear tokens', async () => {
    await saveTokens({ accessToken: 'test', refreshToken: 'test' })
    await clearTokens()

    const tokens = await getTokens()
    expect(tokens).toBeNull()
  })
})
```

---

## Migration from AsyncStorage

If you're migrating from AsyncStorage:

```typescript
import AsyncStorage from '@react-native-async-storage/async-storage'
import { saveTokens } from '@/core/storage'

// Get tokens from old AsyncStorage
const authData = await AsyncStorage.getItem('wani-auth')
if (authData) {
  const { tokens } = JSON.parse(authData)

  // Save to secure storage
  await saveTokens({
    accessToken: tokens.access_token,
    refreshToken: tokens.refresh_token,
  })

  // Clear old AsyncStorage
  await AsyncStorage.removeItem('wani-auth')
}
```

---

## Support

For issues or questions, contact the development team.
