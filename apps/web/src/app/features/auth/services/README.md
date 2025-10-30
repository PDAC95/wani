# Auth Service

API service for authentication operations.

## Overview

The `authService` provides methods for all authentication-related API calls:
- User registration
- Login/Logout
- Token refresh
- Password reset
- Password change
- Get current user

All methods are fully typed with TypeScript and integrated with the API client.

## Usage

### Registration

```typescript
import { authService } from '@/app/features/auth'
import type { RegisterRequest } from '@/app/features/auth/types'

const registerData: RegisterRequest = {
  email: 'user@example.com',
  password: 'SecurePass123!',
  full_name: 'John Doe',
  phone: '+1234567890' // optional
}

try {
  const response = await authService.register(registerData)
  console.log('User registered:', response.user)
  console.log('Access token:', response.tokens.access_token)
} catch (error) {
  console.error('Registration failed:', getAuthErrorMessage(error))
}
```

### Login

```typescript
import { authService, getAuthErrorMessage } from '@/app/features/auth'

const credentials = {
  email: 'user@example.com',
  password: 'SecurePass123!'
}

try {
  const response = await authService.login(credentials)
  // Store tokens in auth store
  // Redirect to dashboard
} catch (error) {
  console.error('Login failed:', getAuthErrorMessage(error))
}
```

### Logout

```typescript
try {
  await authService.logout()
  // Clear auth store
  // Redirect to login
} catch (error) {
  console.error('Logout failed:', error)
}
```

### Refresh Token

```typescript
const refreshToken = 'your_refresh_token'

try {
  const response = await authService.refreshToken({ refresh_token: refreshToken })
  // Update tokens in auth store
} catch (error) {
  // Refresh failed, redirect to login
}
```

### Get Current User

```typescript
try {
  const user = await authService.getCurrentUser()
  console.log('Current user:', user)
} catch (error) {
  // Not authenticated or error occurred
}
```

### Password Reset Flow

#### Step 1: Request Password Reset

```typescript
try {
  await authService.requestPasswordReset({
    email: 'user@example.com'
  })
  // Show success message: "Check your email"
} catch (error) {
  console.error('Failed to send reset email:', error)
}
```

#### Step 2: Confirm Password Reset

```typescript
const token = 'token_from_email_link'
const newPassword = 'NewSecurePass123!'

try {
  await authService.confirmPasswordReset(token, newPassword)
  // Show success message and redirect to login
} catch (error) {
  console.error('Failed to reset password:', error)
}
```

### Change Password (Authenticated Users)

```typescript
try {
  await authService.changePassword({
    current_password: 'OldPass123!',
    new_password: 'NewSecurePass123!'
  })
  // Show success message
} catch (error) {
  console.error('Failed to change password:', error)
}
```

## Using with TanStack Query

### Register Mutation Hook

```typescript
import { useMutation } from '@tanstack/react-query'
import { authService } from '@/app/features/auth'
import type { RegisterRequest, RegisterResponse } from '@/app/features/auth/types'

export const useRegister = () => {
  return useMutation<RegisterResponse, Error, RegisterRequest>({
    mutationFn: (data) => authService.register(data),
    onSuccess: (data) => {
      // Store tokens
      // Navigate to dashboard
      console.log('User registered:', data.user)
    },
    onError: (error) => {
      console.error('Registration failed:', error)
    }
  })
}
```

### Login Mutation Hook

```typescript
import { useMutation } from '@tanstack/react-query'
import { authService } from '@/app/features/auth'
import type { LoginRequest, LoginResponse } from '@/app/features/auth/types'

export const useLogin = () => {
  return useMutation<LoginResponse, Error, LoginRequest>({
    mutationFn: (credentials) => authService.login(credentials),
    onSuccess: (data) => {
      // Store tokens
      // Navigate to dashboard
    }
  })
}
```

### Current User Query Hook

```typescript
import { useQuery } from '@tanstack/react-query'
import { authService } from '@/app/features/auth'
import type { User } from '@/app/features/auth/types'

export const useCurrentUser = () => {
  return useQuery<User, Error>({
    queryKey: ['auth', 'currentUser'],
    queryFn: () => authService.getCurrentUser(),
    retry: false, // Don't retry on 401
    staleTime: 5 * 60 * 1000, // 5 minutes
  })
}
```

## Error Handling

The service provides utility functions for error handling:

```typescript
import { isAuthError, getAuthErrorMessage } from '@/app/features/auth'

try {
  await authService.login(credentials)
} catch (error) {
  if (isAuthError(error)) {
    // Handle authentication error (401/403)
    console.log('Authentication failed')
  }

  const message = getAuthErrorMessage(error)
  console.error(message)
}
```

## API Endpoints

All endpoints are prefixed with `/api/v1`:

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/auth/register` | Register new user |
| POST | `/auth/login` | Login user |
| POST | `/auth/logout` | Logout user |
| POST | `/auth/refresh` | Refresh tokens |
| GET | `/auth/me` | Get current user |
| POST | `/auth/password-reset` | Request password reset |
| POST | `/auth/password-reset/confirm` | Confirm password reset |
| POST | `/auth/change-password` | Change password |

## Response Format

All responses follow the standard API format:

```typescript
{
  success: true,
  data: {
    // Response data
  },
  message: "Operation successful"
}
```

## Token Storage

The authService does NOT handle token storage. You should:
1. Store tokens in a Zustand store
2. Use the API interceptor to automatically add tokens to requests
3. Handle token refresh in the response interceptor

## Next Steps

After creating the authService, you should:
1. Create auth hooks (useAuth, useLogin, useRegister) - **TASK-049**
2. Create Zustand auth store
3. Create login/register forms
4. Set up protected routes
