# Auth Feature

Authentication feature module for Wani Mobile App.

## Structure

```
auth/
├── components/     # Auth-related UI components
│   └── index.ts    # Component exports
├── hooks/          # Auth-related React hooks
│   └── index.ts    # Hook exports
├── services/       # Auth API services
│   └── index.ts    # Service exports
├── types/          # TypeScript types and interfaces
│   └── index.ts    # Type exports
├── index.ts        # Main export point
└── README.md       # This file
```

## Usage Examples

### Components
```typescript
// apps/mobile/src/app/features/auth/components/LoginForm.tsx
import { View, Text, TextInput, TouchableOpacity } from 'react-native'

export function LoginForm() {
  return (
    <View className="p-4">
      {/* Login form implementation */}
    </View>
  )
}
```

### Hooks
```typescript
// apps/mobile/src/app/features/auth/hooks/useAuth.ts
import { useQuery } from '@tanstack/react-query'
import { authService } from '../services'

export function useAuth() {
  return useQuery({
    queryKey: ['auth', 'user'],
    queryFn: authService.getCurrentUser,
  })
}
```

### Services
```typescript
// apps/mobile/src/app/features/auth/services/authService.ts
import { api } from '@/core/api'

export const authService = {
  login: async (email: string, password: string) => {
    const { data } = await api.post('/auth/login', { email, password })
    return data
  },

  getCurrentUser: async () => {
    const { data } = await api.get('/auth/me')
    return data
  },
}
```

### Types
```typescript
// apps/mobile/src/app/features/auth/types/auth.types.ts
export interface User {
  id: string
  email: string
  full_name: string
  phone?: string
  created_at: string
}

export interface AuthTokens {
  access_token: string
  refresh_token: string
  token_type: string
  expires_in: number
}

export interface LoginRequest {
  email: string
  password: string
}

export interface LoginResponse {
  user: User
  tokens: AuthTokens
}

export interface AuthState {
  user: User | null
  tokens: AuthTokens | null
  isAuthenticated: boolean
  isLoading: boolean
}
```

## Importing

All auth functionality can be imported from the main index:

```typescript
import { LoginForm, useAuth, authService } from '@/features/auth'
```

## Tech Stack

- React Native + TypeScript
- TanStack Query (server state)
- Zustand (client state)
- NativeWind (styling)
- Expo SDK
