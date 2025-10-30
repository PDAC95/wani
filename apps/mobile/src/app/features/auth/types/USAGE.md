# Auth Types Usage Guide

Complete guide for using authentication types in the mobile app.

## Available Types

### Request/Response Types

- `RegisterRequest` - User registration payload
- `RegisterResponse` - Registration response with user and tokens
- `LoginRequest` - User login payload
- `LoginResponse` - Login response with user and tokens
- `RefreshTokenRequest` - Token refresh payload
- `RefreshTokenResponse` - Token refresh response
- `PasswordResetRequest` - Password reset email request
- `PasswordResetConfirm` - Password reset confirmation
- `ChangePasswordRequest` - Change password for authenticated users

### Entity Types

- `User` - User entity from backend
- `AuthTokens` - JWT authentication tokens

### State Types

- `AuthState` - Zustand store state shape

### Error Types

- `AuthError` - Backend error response
- `AuthFormErrors` - Client-side form validation errors

## Usage Examples

### In Components (Login Form)

```typescript
import { useState } from 'react'
import { View, TextInput, TouchableOpacity, Text } from 'react-native'
import type { LoginRequest, AuthFormErrors } from '@/features/auth/types'

export function LoginForm() {
  const [formData, setFormData] = useState<LoginRequest>({
    email: '',
    password: '',
  })

  const [errors, setErrors] = useState<AuthFormErrors>({})

  const handleLogin = async () => {
    // Validate
    const validationErrors: AuthFormErrors = {}

    if (!formData.email.includes('@')) {
      validationErrors.email = 'Invalid email format'
    }

    if (formData.password.length < 8) {
      validationErrors.password = 'Password must be at least 8 characters'
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }

    // Submit login
    // ...
  }

  return (
    <View className="p-4">
      <TextInput
        placeholder="Email"
        value={formData.email}
        onChangeText={(email) => setFormData({ ...formData, email })}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      {errors.email && <Text className="text-red-500">{errors.email}</Text>}

      <TextInput
        placeholder="Password"
        value={formData.password}
        onChangeText={(password) => setFormData({ ...formData, password })}
        secureTextEntry
      />
      {errors.password && <Text className="text-red-500">{errors.password}</Text>}

      <TouchableOpacity onPress={handleLogin}>
        <Text>Login</Text>
      </TouchableOpacity>
    </View>
  )
}
```

### In Services (API Calls)

```typescript
import { api } from '@/core/api'
import type {
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  RegisterResponse,
  RefreshTokenRequest,
  RefreshTokenResponse,
} from '@/features/auth/types'

export const authService = {
  login: async (credentials: LoginRequest): Promise<LoginResponse> => {
    const { data } = await api.post<LoginResponse>('/auth/login', credentials)
    return data
  },

  register: async (userData: RegisterRequest): Promise<RegisterResponse> => {
    const { data } = await api.post<RegisterResponse>('/auth/register', userData)
    return data
  },

  refreshToken: async (request: RefreshTokenRequest): Promise<RefreshTokenResponse> => {
    const { data } = await api.post<RefreshTokenResponse>('/auth/refresh', request)
    return data
  },
}
```

### In Hooks (TanStack Query)

```typescript
import { useMutation } from '@tanstack/react-query'
import { authService } from '../services'
import type { LoginRequest, LoginResponse, AuthError } from '@/features/auth/types'

export function useLogin() {
  return useMutation<LoginResponse, AuthError, LoginRequest>({
    mutationFn: authService.login,
    onSuccess: (data) => {
      // Store tokens in Zustand
      // Navigate to home
    },
    onError: (error) => {
      // Show error toast
      console.error('Login failed:', error.message)
    },
  })
}
```

### In Zustand Store

```typescript
import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import AsyncStorage from '@react-native-async-storage/async-storage'
import type { User, AuthTokens, AuthState } from '@/features/auth/types'

interface AuthStore extends AuthState {
  setAuth: (user: User, tokens: AuthTokens) => void
  logout: () => void
  updateUser: (user: User) => void
  setLoading: (isLoading: boolean) => void
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      // Initial state
      user: null,
      tokens: null,
      isAuthenticated: false,
      isLoading: false,

      // Actions
      setAuth: (user, tokens) =>
        set({
          user,
          tokens,
          isAuthenticated: true,
          isLoading: false,
        }),

      logout: () =>
        set({
          user: null,
          tokens: null,
          isAuthenticated: false,
          isLoading: false,
        }),

      updateUser: (user) =>
        set({ user }),

      setLoading: (isLoading) =>
        set({ isLoading }),
    }),
    {
      name: 'wani-auth',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
)
```

### Error Handling

```typescript
import type { AuthError } from '@/features/auth/types'

function handleAuthError(error: AuthError) {
  switch (error.code) {
    case 'INVALID_CREDENTIALS':
      return 'Email or password is incorrect'

    case 'USER_NOT_FOUND':
      return 'No account found with this email'

    case 'EMAIL_ALREADY_EXISTS':
      return 'An account with this email already exists'

    case 'TOKEN_EXPIRED':
      return 'Session expired. Please login again.'

    default:
      return error.message || 'An error occurred'
  }
}
```

## Type Safety Benefits

### Autocomplete

All types provide full IDE autocomplete:

```typescript
const loginData: LoginRequest = {
  email: 'user@example.com',
  password: 'password123',
  // IDE will suggest available properties
}
```

### Type Checking

TypeScript catches errors at compile time:

```typescript
// ❌ Error: Property 'full_name' is missing
const user: User = {
  id: '123',
  email: 'user@example.com',
  // Missing: full_name
  created_at: new Date().toISOString(),
}

// ✅ Correct
const user: User = {
  id: '123',
  email: 'user@example.com',
  full_name: 'John Doe',
  phone: '+1234567890', // optional
  created_at: new Date().toISOString(),
}
```

### API Response Validation

```typescript
import type { LoginResponse } from '@/features/auth/types'

async function login(credentials: LoginRequest) {
  const response = await api.post<LoginResponse>('/auth/login', credentials)

  // TypeScript knows response.data has User and AuthTokens
  const { user, tokens } = response.data

  // Type-safe access
  console.log(user.email) // ✅
  console.log(user.name)  // ❌ Property 'name' does not exist
}
```

## Best Practices

1. **Always import types with `type` keyword:**
   ```typescript
   import type { User, LoginRequest } from '@/features/auth/types'
   ```

2. **Use types for function parameters and return values:**
   ```typescript
   async function login(credentials: LoginRequest): Promise<LoginResponse> {
     // ...
   }
   ```

3. **Create type guards for runtime validation:**
   ```typescript
   function isAuthError(error: unknown): error is AuthError {
     return (
       typeof error === 'object' &&
       error !== null &&
       'code' in error &&
       'message' in error
     )
   }
   ```

4. **Use Partial for updates:**
   ```typescript
   function updateUser(userId: string, updates: Partial<User>) {
     // Only update provided fields
   }
   ```
