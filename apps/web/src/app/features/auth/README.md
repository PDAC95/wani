# Auth Feature

Esta carpeta contiene todos los componentes, hooks, servicios y tipos relacionados con la autenticación.

## Estructura

```
auth/
├── components/       # Componentes UI de autenticación (LoginForm, RegisterForm, etc.)
├── hooks/           # Hooks personalizados de auth (useAuth, useLogin, etc.)
├── services/        # Servicios de API para auth (auth.service.ts)
├── types/           # Tipos TypeScript para auth (LoginCredentials, AuthUser, etc.)
└── index.ts         # Re-exporta todo para facilitar imports
```

## Uso

```typescript
// Importar desde la feature completa
import { LoginForm, useAuth, authService, type AuthUser } from '@/app/features/auth'

// O desde módulos específicos
import { LoginForm } from '@/app/features/auth/components'
import { useAuth } from '@/app/features/auth/hooks'
```

## Stack

- **Forms**: React Hook Form + Zod
- **API**: TanStack Query
- **State**: Zustand (authStore)
- **UI**: shadcn/ui components
