# Wani Mobile - Folder Structure

This document describes the mobile app folder structure based on Feature-Sliced Design principles adapted for React Native + Expo.

## 📁 Structure Overview

```
src/
├── app/                    # Application layer
│   ├── core/              # Core application logic
│   │   ├── api/          # API client configuration
│   │   ├── auth/         # Authentication logic
│   │   ├── config/       # App configuration
│   │   ├── providers/    # React providers (Query, Navigation, etc.)
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
│   ├── screens/          # Screen components (for Expo Router)
│   │   ├── auth/         # Auth screens
│   │   ├── wallet/       # Wallet screens
│   │   ├── transactions/ # Transaction screens
│   │   ├── profile/      # Profile screens
│   │   └── settings/     # Settings screens
│   │
│   └── navigation/       # Navigation configuration
│       ├── types.ts      # Navigation type definitions
│       └── routes.ts     # Route constants
│
├── assets/               # Static assets
│   ├── images/          # Images
│   ├── icons/           # Icon files
│   └── fonts/           # Custom fonts
│
└── App.tsx              # Root component
```

## 📋 Naming Conventions

### Components
- **PascalCase**: `UserProfile.tsx`, `SendMoneyForm.tsx`
- **Native components**: Use React Native components (View, Text, TouchableOpacity)

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
- Navigation provider
- Auth provider

### `/core/store`
- Zustand stores
- Global state management

## 📱 Screens vs Features

### Screens (`/screens`)
- Container components for routes
- Minimal logic
- Compose feature components
- Handle navigation

### Features (`/features`)
- Business logic
- Reusable components
- API calls
- State management

Example:
```typescript
// screens/auth/LoginScreen.tsx
import { LoginForm } from '@/app/features/auth'

export default function LoginScreen() {
  return (
    <SafeAreaView className="flex-1 bg-cream">
      <LoginForm />
    </SafeAreaView>
  )
}
```

## 🚀 Navigation with Expo Router

### File-based Routing
Expo Router uses file-based routing similar to Next.js:

```
app/
├── (auth)/           # Auth group (no segment in URL)
│   ├── login.tsx    # /login
│   └── register.tsx # /register
├── (tabs)/          # Tab navigation group
│   ├── index.tsx    # / (home/dashboard)
│   ├── wallet.tsx   # /wallet
│   └── profile.tsx  # /profile
└── _layout.tsx      # Root layout
```

### Navigation Types
```typescript
// navigation/types.ts
export type RootStackParamList = {
  Login: undefined
  Register: undefined
  Dashboard: undefined
  SendMoney: { recipientId?: string }
  TransactionDetails: { transactionId: string }
}
```

## 🎨 Styling Strategy

- **NativeWind (Tailwind CSS)**: Primary styling approach
- **StyleSheet**: For complex platform-specific styles (if needed)
- **Global styles**: Only in `global.css`

## 🔐 Authentication Flow

```
1. User opens app
2. Check auth token in Zustand store
3. If valid → Navigate to Dashboard
4. If invalid → Navigate to Login
5. After login → Store tokens → Navigate to Dashboard
```

## 📦 State Management Strategy

### Use Zustand for:
- Authentication state
- User preferences
- UI state (modals, bottom sheets)
- Offline-first data

### Use React Query for:
- Server data (wallet balance, transactions)
- API mutations (send money, update profile)
- Background syncing

## 🔧 Best Practices

1. **Platform-Specific Code**: Use `.ios.tsx` and `.android.tsx` when needed
2. **Accessibility**: Always add `accessibilityLabel` to touchable elements
3. **Performance**: Use `React.memo()` for heavy components
4. **Images**: Use optimized images and `expo-image` for better performance
5. **Type Safety**: Always define TypeScript types/interfaces

## 📱 Platform Considerations

### iOS
- SafeArea handling (use `SafeAreaView`)
- Keyboard avoiding view
- Status bar configuration

### Android
- Back button handling
- Permission requests
- Edge-to-edge layout

## 🧪 Testing

```
__tests__/
├── components/
├── hooks/
├── screens/
└── utils/
```

Use Jest and React Native Testing Library.

## 📚 Resources

- [Expo Documentation](https://docs.expo.dev/)
- [Expo Router](https://docs.expo.dev/router/introduction/)
- [NativeWind](https://www.nativewind.dev/)
- [React Native](https://reactnative.dev/)
