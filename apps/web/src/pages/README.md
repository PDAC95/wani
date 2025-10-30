# Pages

Application pages for the Wani web application.

## Overview

This directory contains all page-level components used in the application. Pages are lazy-loaded through React Router for optimal code splitting and performance.

## Pages Structure

```
pages/
├── Home.tsx           # Landing page (/)
├── Login.tsx          # Login page (/auth/login)
├── Register.tsx       # Registration page (/auth/register) ✅
├── Dashboard.tsx      # Dashboard home (/dashboard)
├── Wallet.tsx         # Wallet page (/dashboard/wallet)
├── SendMoney.tsx      # Send money page (/dashboard/send)
├── Transactions.tsx   # Transactions page (/dashboard/transactions)
├── Profile.tsx        # Profile page (/dashboard/profile)
└── NotFound.tsx       # 404 page (*)
```

## Register Page

### Location
[src/pages/Register.tsx](./Register.tsx)

### Route
- **URL**: `/auth/register` or `/register` (redirects to `/auth/register`)
- **Layout**: `AuthLayout`
- **Protected**: No (public route)

### Implementation

The Register page uses the `RegisterForm` component from the auth feature:

```tsx
import { RegisterForm } from '@/app/features/auth/components/RegisterForm'

const RegisterPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <RegisterForm
        onSuccess={() => {
          console.log('Registration successful!')
        }}
        onError={(error) => {
          console.error('Registration failed:', error)
        }}
      />
    </div>
  )
}
```

### Features

- ✅ Full-screen centered layout
- ✅ RegisterForm component integration
- ✅ Success/Error callbacks
- ✅ Automatic redirect to `/dashboard` after successful registration
- ✅ Responsive design (mobile, tablet, desktop)
- ✅ Loading states handled by RegisterForm
- ✅ Error handling with user-friendly messages

### Navigation

Users can access the registration page through:

1. **Direct URL**: `http://localhost:5173/register` or `http://localhost:5173/auth/register`
2. **From Login Page**: "Don't have an account? Sign up" link
3. **From Home Page**: "Get Started" or "Sign Up" button

### Flow

```
User visits /register
        ↓
Redirects to /auth/register
        ↓
AuthLayout renders
        ↓
Register page loads
        ↓
RegisterForm component displays
        ↓
User fills form and submits
        ↓
Registration successful
        ↓
Redirect to /dashboard
```

## Layouts

Pages are wrapped in layouts that provide consistent structure:

### AuthLayout
Used by: Login, Register
- Centered content
- No navigation
- Clean, minimal design

### DashboardLayout
Used by: Dashboard, Wallet, SendMoney, Transactions, Profile
- Sidebar navigation
- Top header with user info
- Protected routes (requires authentication)

### PublicLayout
Used by: Home
- Public header with navigation
- Footer
- Marketing content

## Router Configuration

All routes are configured in [src/app/routes/index.tsx](../app/routes/index.tsx):

```typescript
// Register route configuration
{
  path: '/auth',
  element: <AuthLayout />,
  children: [
    {
      path: 'register',
      element: <RegisterPage />
    }
  ]
}

// Convenience redirect
{
  path: '/register',
  element: <Navigate to="/auth/register" replace />
}
```

## Route Constants

Use centralized route constants from the router:

```typescript
import { ROUTES } from '@/app/routes'

// Navigate to register page
navigate(ROUTES.REGISTER) // '/auth/register'

// In links
<Link to={ROUTES.REGISTER}>Sign Up</Link>
```

## Lazy Loading

All pages are lazy-loaded for better performance:

```typescript
const RegisterPage = lazy(() => import('../../pages/Register'))

// Used in router with Suspense
<LazyRoute>
  <RegisterPage />
</LazyRoute>
```

Loading state is handled by `PageLoader` component that shows a spinner.

## Testing Navigation

### Manual Testing

1. Start dev server: `npm run dev`
2. Open browser: `http://localhost:5173`
3. Navigate to `/register` or `/auth/register`
4. Verify RegisterForm displays correctly
5. Fill form and submit
6. Verify redirect to dashboard on success

### Programmatic Navigation

```typescript
import { useNavigate } from 'react-router-dom'
import { ROUTES } from '@/app/routes'

function MyComponent() {
  const navigate = useNavigate()

  const goToRegister = () => {
    navigate(ROUTES.REGISTER)
  }

  return <button onClick={goToRegister}>Sign Up</button>
}
```

## Protected Routes

The Register page is **public** (no authentication required).

For protected routes (Dashboard pages), use the auth guard:

```typescript
// In router configuration
{
  path: '/dashboard',
  element: <ProtectedRoute><DashboardLayout /></ProtectedRoute>,
  children: [...]
}
```

## Customization

### Custom Redirect After Registration

You can customize where users are redirected after registration:

```tsx
<RegisterForm
  redirectTo="/onboarding" // Custom path
/>
```

### Custom Success/Error Handling

```tsx
<RegisterForm
  onSuccess={() => {
    toast.success('Account created successfully!')
    // Track analytics event
    analytics.track('user_registered')
  }}
  onError={(error) => {
    toast.error('Registration failed')
    // Log error to monitoring service
    errorLogger.log(error)
  }}
/>
```

### Custom Styling

```tsx
<RegisterForm
  className="my-custom-class"
/>
```

## Troubleshooting

### Page doesn't load
- Check if React Router is configured in `App.tsx`
- Verify route exists in `src/app/routes/index.tsx`
- Check browser console for errors

### RegisterForm not found
- Verify import path: `@/app/features/auth/components/RegisterForm`
- Check if TypeScript path alias `@` is configured in `vite.config.ts`
- Ensure RegisterForm.tsx exists

### Navigation doesn't work
- Check if `react-router-dom` is installed
- Verify `<RouterProvider>` is in App.tsx
- Use `navigate()` from `useNavigate()` hook, not `window.location`

### Redirect after registration fails
- Check if `useRegister` hook is properly configured
- Verify `ROUTES.DASHBOARD` exists
- Check browser console for navigation errors

## Related Files

- [RegisterForm Component](../app/features/auth/components/RegisterForm.tsx) - Form component
- [useRegister Hook](../app/features/auth/hooks/useRegister.ts) - Registration logic
- [Router Config](../app/routes/index.tsx) - Route definitions
- [AuthLayout](../app/layouts/AuthLayout.tsx) - Page layout

## Next Steps

After implementing the Register page:
1. Create Login page with similar pattern
2. Implement protected route guard
3. Add email verification flow
4. Create onboarding flow after registration
5. Add analytics tracking
6. Implement A/B testing for registration variants
