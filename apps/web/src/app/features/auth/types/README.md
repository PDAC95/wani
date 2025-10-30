# Auth Types

TypeScript type definitions for authentication features.

## Type Mappings

Los tipos TypeScript están alineados con los schemas de Pydantic del backend:

### User Types

| TypeScript Type | Backend Schema | Description |
|----------------|----------------|-------------|
| `RegisterRequest` | `UserCreate` | User registration payload |
| `User` | `UserResponse` | User entity |
| `LoginRequest` | N/A (to be created) | Login credentials |

### Field Mappings

#### RegisterRequest ↔ UserCreate

```typescript
// TypeScript
interface RegisterRequest {
  email: string           // → EmailStr
  password: string        // → str (min_length=8)
  full_name: string       // → str (min_length=2, max_length=100)
  phone?: string          // → Optional[str] (max_length=20)
}
```

```python
# Python (Pydantic)
class UserCreate(BaseModel):
    email: EmailStr
    password: str = Field(..., min_length=8)
    full_name: str = Field(..., min_length=2, max_length=100)
    phone: Optional[str] = Field(None, max_length=20)
```

#### User ↔ UserResponse

```typescript
// TypeScript
interface User {
  id: string              // → UUID (as string)
  email: string           // → EmailStr
  full_name: string       // → str
  phone?: string          // → Optional[str]
  created_at: string      // → datetime (ISO 8601 string)
}
```

```python
# Python (Pydantic)
class UserResponse(BaseModel):
    id: UUID
    email: EmailStr
    full_name: str
    created_at: datetime
```

### Auth Flow Types

#### AuthTokens
```typescript
interface AuthTokens {
  access_token: string    // JWT access token
  refresh_token: string   // JWT refresh token
  token_type: string      // Usually "Bearer"
  expires_in: number      // Token expiration in seconds
}
```

#### AuthState (Zustand Store)
```typescript
interface AuthState {
  user: User | null           // Current authenticated user
  tokens: AuthTokens | null   // Current auth tokens
  isAuthenticated: boolean    // Auth status
  isLoading: boolean          // Loading state
}
```

## Usage Examples

### Importing Types

```typescript
// Import all types from the feature
import type {
  RegisterRequest,
  LoginRequest,
  User,
  AuthTokens
} from '@/app/features/auth'

// Or from the types module directly
import type { User } from '@/app/features/auth/types'
```

### Using with React Hook Form

```typescript
import { useForm } from 'react-hook-form'
import type { RegisterRequest } from '@/app/features/auth/types'

function RegisterForm() {
  const { register, handleSubmit } = useForm<RegisterRequest>()

  const onSubmit = (data: RegisterRequest) => {
    // data is fully typed
  }
}
```

### Using with TanStack Query

```typescript
import { useMutation } from '@tanstack/react-query'
import type { LoginRequest, LoginResponse } from '@/app/features/auth/types'

const useLogin = () => {
  return useMutation<LoginResponse, Error, LoginRequest>({
    mutationFn: (credentials) => authService.login(credentials)
  })
}
```

## Type Safety Notes

1. **UUIDs**: Backend UUIDs are represented as strings in TypeScript
2. **Dates**: Backend datetime objects are serialized as ISO 8601 strings
3. **Optional Fields**: Use `?` for optional fields matching Python's `Optional[T]`
4. **Email**: Backend validates emails, frontend should too (use Zod)
5. **Passwords**: Backend enforces min length 8, frontend validation should match

## Validation

These types should be used with Zod schemas for runtime validation:

```typescript
import * as z from 'zod'
import type { RegisterRequest } from './auth.types'

const registerSchema = z.object({
  email: z.string().email('Invalid email'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  full_name: z.string().min(2).max(100),
  phone: z.string().max(20).optional()
}) satisfies z.ZodType<RegisterRequest>
```
