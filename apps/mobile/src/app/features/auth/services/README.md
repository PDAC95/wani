# Auth Service

Authentication service for making API calls to the backend.

## Features

- User login and registration
- Token refresh with automatic retry
- Password reset and change
- Email verification
- Type-safe with TypeScript
- Axios-based HTTP client
- Automatic token injection via interceptors

## Installation

Before using the auth service, install required dependencies:

```bash
cd apps/mobile
npx expo install @react-native-async-storage/async-storage expo-constants
```

## API Endpoints

### Authentication

- `POST /api/v1/auth/login` - User login
- `POST /api/v1/auth/register` - User registration
- `POST /api/v1/auth/refresh` - Refresh access token
- `POST /api/v1/auth/logout` - Logout user
- `GET /api/v1/auth/me` - Get current user

### Password Management

- `POST /api/v1/auth/password-reset` - Request password reset
- `POST /api/v1/auth/password-reset/confirm` - Confirm password reset
- `POST /api/v1/auth/change-password` - Change password (authenticated)

### Email Verification

- `POST /api/v1/auth/verify-email` - Verify email with token
- `POST /api/v1/auth/resend-verification` - Resend verification email

## Usage

### Basic Login

```typescript
import { authService } from '@/features/auth/services'
import type { LoginRequest } from '@/features/auth/types'

async function handleLogin() {
  try {
    const credentials: LoginRequest = {
      email: 'user@example.com',
      password: 'password123',
    }

    const response = await authService.login(credentials)

    // Response contains user and tokens
    console.log('User:', response.user)
    console.log('Tokens:', response.tokens)

    // Store in Zustand or React Query

  } catch (error) {
    console.error('Login failed:', error)
  }
}
```

### User Registration

```typescript
import { authService } from '@/features/auth/services'
import type { RegisterRequest } from '@/features/auth/types'

async function handleRegister() {
  try {
    const userData: RegisterRequest = {
      email: 'newuser@example.com',
      password: 'securePassword123',
      full_name: 'John Doe',
      phone: '+1234567890', // optional
    }

    const response = await authService.register(userData)

    console.log('User created:', response.user)
    console.log('Tokens:', response.tokens)

  } catch (error) {
    if (error.code === 'EMAIL_ALREADY_EXISTS') {
      console.error('Email is already registered')
    } else {
      console.error('Registration failed:', error)
    }
  }
}
```

### With TanStack Query (Recommended)

```typescript
import { useMutation } from '@tanstack/react-query'
import { authService } from '@/features/auth/services'
import type { LoginRequest, LoginResponse } from '@/features/auth/types'

export function useLogin() {
  return useMutation<LoginResponse, Error, LoginRequest>({
    mutationFn: authService.login,
    onSuccess: (data) => {
      // Store tokens in AsyncStorage
      // Navigate to home
      console.log('Login successful:', data.user.email)
    },
    onError: (error) => {
      console.error('Login error:', error)
    },
  })
}

// In component
function LoginScreen() {
  const loginMutation = useLogin()

  const handleSubmit = async (credentials: LoginRequest) => {
    await loginMutation.mutateAsync(credentials)
  }

  return (
    <View>
      {loginMutation.isPending && <Text>Loading...</Text>}
      {loginMutation.isError && <Text>Error: {loginMutation.error.message}</Text>}
      {/* Form */}
    </View>
  )
}
```

### Password Reset Flow

```typescript
// Step 1: Request password reset
await authService.requestPasswordReset({
  email: 'user@example.com',
})
// User receives email with reset token

// Step 2: Confirm with token
await authService.confirmPasswordReset({
  token: 'reset-token-from-email',
  new_password: 'newSecurePassword123',
})
```

### Get Current User

```typescript
try {
  const user = await authService.getCurrentUser()
  console.log('Current user:', user)
} catch (error) {
  // User not authenticated or token expired
  console.error('Not authenticated')
}
```

## API Client Configuration

The auth service uses a pre-configured axios instance with:

### Base URL

Set via Expo Constants from `app.json`:

```json
{
  "expo": {
    "extra": {
      "apiUrl": "http://localhost:8000"
    }
  }
}
```

### Automatic Token Injection

The API client automatically:
- Reads tokens from AsyncStorage
- Adds `Authorization: Bearer {token}` header to all requests
- Handles token refresh on 401 errors
- Retries failed requests with new token

### Error Handling

All errors are transformed to a consistent format:

```typescript
{
  code: string        // e.g., 'INVALID_CREDENTIALS'
  message: string     // Human-readable error message
  details?: object    // Additional error details
  status?: number     // HTTP status code
}
```

## Type Safety

All methods are fully typed:

```typescript
// ✅ Type-safe request
const request: LoginRequest = {
  email: 'user@example.com',
  password: 'password',
}

// ✅ Type-safe response
const response: LoginResponse = await authService.login(request)

// ✅ TypeScript knows the structure
console.log(response.user.email)        // ✅
console.log(response.user.name)         // ❌ Error: Property doesn't exist
console.log(response.tokens.access_token) // ✅
```

## Environment Variables

Configure API URL in `.env`:

```bash
# .env
API_URL=http://localhost:8000
```

Or in `app.json` for different environments:

```json
{
  "expo": {
    "extra": {
      "apiUrl": "http://localhost:8000",
      "eas": {
        "projectId": "your-project-id"
      }
    }
  }
}
```

## Error Codes

Common error codes from the backend:

- `INVALID_CREDENTIALS` - Wrong email or password
- `USER_NOT_FOUND` - User doesn't exist
- `EMAIL_ALREADY_EXISTS` - Email already registered
- `TOKEN_EXPIRED` - Authentication token expired
- `INVALID_TOKEN` - Malformed or invalid token
- `EMAIL_NOT_VERIFIED` - Email verification required
- `WEAK_PASSWORD` - Password doesn't meet requirements

## Next Steps

1. **Install dependencies:**
   ```bash
   npx expo install @react-native-async-storage/async-storage expo-constants
   ```

2. **Create auth hooks** for TanStack Query integration

3. **Create auth store** with Zustand for state management

4. **Build auth screens** (Login, Register, etc.)

## Related Files

- [Types](../types/auth.types.ts) - TypeScript type definitions
- [API Client](../../../core/api/client.ts) - Axios configuration
- [Hooks](../hooks/) - React Query hooks (to be created)

## Backend Integration

This service is designed to work with a FastAPI backend with the following schema:

```python
# Backend user schema
class UserResponse(BaseModel):
    id: str
    email: str
    full_name: str
    phone: Optional[str]
    created_at: datetime

class AuthTokens(BaseModel):
    access_token: str
    refresh_token: str
    token_type: str
    expires_in: int
```

Ensure your backend endpoints match these interfaces.
