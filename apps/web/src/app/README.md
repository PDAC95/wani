# Wani Web - Folder Structure

This document describes the frontend folder structure based on Feature-Sliced Design principles.

## 📁 Structure Overview

```
src/
├── app/                    # Application layer
│   ├── core/              # Core application logic
│   │   ├── api/          # API client configuration
│   │   ├── auth/         # Authentication logic
│   │   ├── config/       # App configuration
│   │   ├── providers/    # React providers (Query, Router, etc.)
│   │   └── store/        # Global state (Zustand)
│   │
│   ├── features/         # Feature modules
│   │   ├── auth/         # Authentication (Login, Register, OTP)
│   │   ├── wallet/       # Wallet management
│   │   ├── transactions/ # Send/Receive money
│   │   ├── profile/      # User profile
│   │   └── settings/     # App settings
│   │
│   ├── shared/           # Shared resources
│   │   ├── components/   # Reusable UI components
│   │   ├── hooks/        # Custom React hooks
│   │   ├── utils/        # Utility functions
│   │   ├── types/        # TypeScript types
│   │   ├── services/     # Shared services
│   │   └── constants/    # Constants and configs
│   │
│   ├── layouts/          # Layout components
│   │   ├── AuthLayout.tsx
│   │   ├── DashboardLayout.tsx
│   │   └── PublicLayout.tsx
│   │
│   └── routes/           # Route definitions
│       └── index.tsx
│
├── assets/               # Static assets
│   ├── images/          # Images
│   ├── icons/           # Icon files
│   └── fonts/           # Custom fonts
│
└── styles/              # Global styles
    └── global.css
```

## 📋 Naming Conventions

### Components
- **PascalCase**: `UserProfile.tsx`, `SendMoneyForm.tsx`
- **Index exports**: Each component folder should have an `index.ts` for clean imports

### Hooks
- **camelCase with 'use' prefix**: `useAuth.ts`, `useWallet.ts`

### Utils
- **camelCase**: `formatCurrency.ts`, `validatePhone.ts`

### Types
- **PascalCase**: `User.ts`, `Transaction.ts`

### Constants
- **UPPER_SNAKE_CASE**: `API_ENDPOINTS.ts`, `ROUTES.ts`

## 🎯 Feature Module Structure

Each feature module follows this structure:

```
features/auth/
├── components/          # Feature-specific components
│   ├── LoginForm.tsx
│   └── OTPInput.tsx
├── hooks/              # Feature-specific hooks
│   ├── useLogin.ts
│   └── useOTP.ts
├── api/                # Feature API calls
│   └── authApi.ts
├── types/              # Feature types
│   └── auth.types.ts
└── index.ts           # Public exports
```

## 🔧 Core Modules

### `/core/api`
- Axios instance configuration
- Interceptors for auth tokens
- Error handling

### `/core/auth`
- Authentication context
- Token management
- Protected route logic

### `/core/config`
- Environment variables
- App configuration
- Feature flags

### `/core/providers`
- QueryClientProvider setup
- Router provider
- Theme provider

### `/core/store`
- Zustand stores
- Global state management

## 🔄 Import Rules

### Absolute Imports
Use `@/` prefix for absolute imports (configured in `tsconfig.json`):

```typescript
// Good
import { Button } from '@/app/shared/components/Button'
import { useAuth } from '@/app/core/auth'

// Avoid
import { Button } from '../../../shared/components/Button'
```

### Import Order
1. React imports
2. Third-party libraries
3. Internal absolute imports (`@/`)
4. Relative imports (`./`, `../`)
5. Type imports

Example:
```typescript
import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Button } from '@/app/shared/components/Button'
import { useAuth } from './hooks/useAuth'
import type { User } from '@/app/shared/types/User'
```

## 📝 Component Template

```typescript
// apps/web/src/app/shared/components/Button/Button.tsx
import { ButtonHTMLAttributes } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline'
  size?: 'sm' | 'md' | 'lg'
}

export const Button = ({
  variant = 'primary',
  size = 'md',
  children,
  className = '',
  ...props
}: ButtonProps) => {
  return (
    <button
      className={`btn-${variant} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}
```

## 🎨 Styling Strategy

- **Tailwind CSS**: Primary styling approach
- **CSS Modules**: For component-specific complex styles (if needed)
- **Global styles**: Only in `src/styles/global.css`

## 🚀 Best Practices

1. **Single Responsibility**: Each file/component should have one clear purpose
2. **Colocation**: Keep related code close (component + hooks + types)
3. **Barrel Exports**: Use `index.ts` for clean public APIs
4. **Type Safety**: Always define TypeScript types/interfaces
5. **Error Boundaries**: Wrap features with error boundaries
6. **Lazy Loading**: Use `React.lazy()` for route-based code splitting

## 📚 Resources

- [Feature-Sliced Design](https://feature-sliced.design/)
- [React Best Practices](https://react.dev/learn)
- [TypeScript Guidelines](https://www.typescriptlang.org/docs/handbook/declaration-files/do-s-and-don-ts.html)
