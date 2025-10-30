# Auth Hooks

Custom React hooks for authentication using TanStack Query.

## Overview

This module provides a complete set of authentication hooks:
- **`useAuth`** - Main auth hook with state and actions
- **`useRegister`** - User registration mutation
- **`useLogin`** - User login mutation
- **`useLogout`** - User logout mutation

All hooks are built on top of:
- TanStack Query for server state management
- Zustand auth store for client state
- React Router for navigation

## Hooks

### useAuth

Main authentication hook that exposes auth state and mutation functions.

```typescript
import { useAuth } from '@/app/features/auth'

function MyComponent() {
  const {
    user,
    isAuthenticated,
    isLoading,
    login,
    logout,
    register,
    isLoggingIn,
    isLoggingOut,
    isRegistering,
  } = useAuth()

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (!isAuthenticated) {
    return <div>Please login</div>
  }

  return (
    <div>
      <h1>Welcome {user?.firstName}!</h1>
      <button onClick={() => logout()}>Logout</button>
    </div>
  )
}
```

#### Return Values

| Property | Type | Description |
|----------|------|-------------|
| `user` | `User \| null` | Current authenticated user |
| `isAuthenticated` | `boolean` | Whether user is authenticated |
| `isLoading` | `boolean` | Combined loading state |
| `tokens` | `{ accessToken, refreshToken }` | Auth tokens |
| `login` | `(credentials) => void` | Login mutation function |
| `logout` | `() => void` | Logout mutation function |
| `register` | `(data) => void` | Register mutation function |
| `isLoggingIn` | `boolean` | Login loading state |
| `isLoggingOut` | `boolean` | Logout loading state |
| `isRegistering` | `boolean` | Register loading state |
| `isTokenExpired` | `() => boolean` | Check if token is expired |
| `getAccessToken` | `() => string \| null` | Get access token |
| `getRefreshToken` | `() => string \| null` | Get refresh token |

---

### useRegister

TanStack Query mutation hook for user registration.

```typescript
import { useRegister } from '@/app/features/auth'
import { useForm } from 'react-hook-form'
import type { RegisterRequest } from '@/app/features/auth/types'

function RegisterForm() {
  const { register: formRegister, handleSubmit } = useForm<RegisterRequest>()
  const { mutate: register, isPending, error } = useRegister({
    onSuccess: () => {
      console.log('Registration successful!')
    },
    onError: (error) => {
      console.error('Registration failed:', error)
    },
    redirectTo: '/dashboard', // Optional custom redirect
  })

  const onSubmit = (data: RegisterRequest) => {
    register(data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...formRegister('email')} type="email" required />
      <input {...formRegister('password')} type="password" required />
      <input {...formRegister('full_name')} required />
      <input {...formRegister('phone')} />

      {error && <div className="error">{error.message}</div>}

      <button type="submit" disabled={isPending}>
        {isPending ? 'Registering...' : 'Register'}
      </button>
    </form>
  )
}
```

#### Options

```typescript
interface UseRegisterOptions {
  onSuccess?: (data: RegisterResponse) => void
  onError?: (error: Error) => void
  navigateToDashboard?: boolean  // Default: true
  redirectTo?: string            // Default: '/dashboard'
}
```

#### Return Values

Returns `UseMutationResult` from TanStack Query:
- `mutate` - Trigger the mutation
- `isPending` - Loading state
- `error` - Error object
- `data` - Response data
- `isSuccess` - Success state
- `isError` - Error state

---

### useLogin

TanStack Query mutation hook for user login.

```typescript
import { useLogin, getLoginErrorMessage } from '@/app/features/auth'
import { useForm } from 'react-hook-form'
import type { LoginRequest } from '@/app/features/auth/types'

function LoginForm() {
  const { register, handleSubmit } = useForm<LoginRequest>()
  const { mutate: login, isPending, error } = useLogin({
    onSuccess: (data) => {
      console.log('Login successful!', data.user)
    }
  })

  const onSubmit = (data: LoginRequest) => {
    login(data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('email')} type="email" required />
      <input {...register('password')} type="password" required />

      {error && (
        <div className="error">
          {getLoginErrorMessage(error)}
        </div>
      )}

      <button type="submit" disabled={isPending}>
        {isPending ? 'Logging in...' : 'Login'}
      </button>
    </form>
  )
}
```

#### Options

```typescript
interface UseLoginOptions {
  onSuccess?: (data: LoginResponse) => void
  onError?: (error: Error) => void
  navigateToDashboard?: boolean  // Default: true
  redirectTo?: string            // Default: '/dashboard'
}
```

---

### useLogout

TanStack Query mutation hook for user logout.

```typescript
import { useLogout } from '@/app/features/auth'

function LogoutButton() {
  const { mutate: logout, isPending } = useLogout({
    onSuccess: () => {
      console.log('Logged out successfully')
    },
    redirectTo: '/login', // Optional custom redirect
  })

  return (
    <button onClick={() => logout()} disabled={isPending}>
      {isPending ? 'Logging out...' : 'Logout'}
    </button>
  )
}
```

#### Options

```typescript
interface UseLogoutOptions {
  onSuccess?: () => void
  onError?: (error: Error) => void
  navigateToLogin?: boolean  // Default: true
  redirectTo?: string        // Default: '/login'
}
```

---

## Error Handling

Each hook provides error helpers for user-friendly messages:

```typescript
import {
  useLogin,
  useRegister,
  getLoginErrorMessage,
  getRegisterErrorMessage
} from '@/app/features/auth'

// In Login Form
const { error: loginError } = useLogin()
const loginMessage = getLoginErrorMessage(loginError)

// In Register Form
const { error: registerError } = useRegister()
const registerMessage = getRegisterErrorMessage(registerError)
```

### Common Error Messages

| Status Code | Error Message |
|-------------|---------------|
| 401 | Invalid email or password |
| 409 | An account with this email already exists |
| 429 | Too many login attempts. Please try again later. |
| 400 | Please check your registration information |

---

## Complete Examples

### Protected Route Example

```typescript
import { useAuth } from '@/app/features/auth'
import { Navigate } from 'react-router-dom'

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useAuth()

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  return <>{children}</>
}

// Usage in routes
<Route
  path="/dashboard"
  element={
    <ProtectedRoute>
      <DashboardPage />
    </ProtectedRoute>
  }
/>
```

### User Profile Display

```typescript
import { useAuth } from '@/app/features/auth'

function UserProfile() {
  const { user, logout, isLoggingOut } = useAuth()

  if (!user) return null

  return (
    <div>
      <h2>{user.firstName} {user.lastName}</h2>
      <p>Email: {user.email}</p>
      <p>Phone: {user.phone}</p>
      <p>KYC Status: {user.kycStatus}</p>

      <button onClick={() => logout()} disabled={isLoggingOut}>
        {isLoggingOut ? 'Logging out...' : 'Logout'}
      </button>
    </div>
  )
}
```

### Register Form with Validation

```typescript
import { useRegister, getRegisterErrorMessage } from '@/app/features/auth'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'

const registerSchema = z.object({
  email: z.string().email('Invalid email'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  full_name: z.string().min(2, 'Name must be at least 2 characters'),
  phone: z.string().optional(),
})

type RegisterFormData = z.infer<typeof registerSchema>

function RegisterForm() {
  const { register, handleSubmit, formState: { errors } } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema)
  })

  const { mutate: registerUser, isPending, error } = useRegister()

  const onSubmit = (data: RegisterFormData) => {
    registerUser(data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <input {...register('email')} placeholder="Email" />
        {errors.email && <span>{errors.email.message}</span>}
      </div>

      <div>
        <input {...register('password')} type="password" placeholder="Password" />
        {errors.password && <span>{errors.password.message}</span>}
      </div>

      <div>
        <input {...register('full_name')} placeholder="Full Name" />
        {errors.full_name && <span>{errors.full_name.message}</span>}
      </div>

      <div>
        <input {...register('phone')} placeholder="Phone (optional)" />
      </div>

      {error && (
        <div className="error-message">
          {getRegisterErrorMessage(error)}
        </div>
      )}

      <button type="submit" disabled={isPending}>
        {isPending ? 'Creating account...' : 'Register'}
      </button>
    </form>
  )
}
```

---

## State Management Flow

```
User Action → Hook (useMutation) → API Service → Backend
                                       ↓
                                   onSuccess
                                       ↓
                              Zustand Auth Store
                                       ↓
                                  UI Updates
                                       ↓
                                Navigate to Dashboard
```

## Best Practices

1. **Use `useAuth` for general auth state access**
   ```typescript
   const { user, isAuthenticated } = useAuth()
   ```

2. **Use specific hooks for mutations**
   ```typescript
   const { mutate: login } = useLogin()
   const { mutate: register } = useRegister()
   ```

3. **Handle loading states**
   ```typescript
   const { isPending } = useLogin()
   <button disabled={isPending}>Login</button>
   ```

4. **Display user-friendly errors**
   ```typescript
   const { error } = useLogin()
   {error && <div>{getLoginErrorMessage(error)}</div>}
   ```

5. **Use callbacks for side effects**
   ```typescript
   useLogin({
     onSuccess: () => {
       // Show success toast
       // Track analytics
     }
   })
   ```

## Next Steps

After implementing hooks, you should:
1. Create LoginForm component - **TASK-050**
2. Create RegisterForm component - **TASK-051**
3. Set up protected routes
4. Implement token refresh interceptor
5. Add toast notifications for better UX
