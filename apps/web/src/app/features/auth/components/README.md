# Auth Components

UI components for authentication features.

## Components

### RegisterForm

User registration form component with validation, error handling, and loading states.

#### Features

- ✅ **React Hook Form** - Form state management
- ✅ **Zod Validation** - Schema-based validation matching backend requirements
- ✅ **Tailwind CSS** - Responsive styling
- ✅ **Error Handling** - Field-level and API error display
- ✅ **Loading States** - Disabled inputs and loading spinner during submission
- ✅ **Password Toggle** - Show/hide password functionality
- ✅ **Accessibility** - Proper labels, ARIA attributes, and keyboard navigation

#### Form Fields

| Field | Type | Required | Validation |
|-------|------|----------|------------|
| `full_name` | text | Yes | 2-100 characters, letters and spaces only |
| `email` | email | Yes | Valid email format |
| `password` | password | Yes | Min 8 chars, must include uppercase, lowercase, and number |
| `phone` | tel | No | Max 20 chars, valid phone format |

#### Validation Rules

The form validation matches the backend `UserCreate` schema:

```typescript
email: EmailStr               // Valid email required
password: min 8 characters    // Must include uppercase, lowercase, number
full_name: 2-100 characters   // Letters and spaces only
phone: optional, max 20 chars // Valid phone format
```

#### Usage

##### Basic Usage

```tsx
import { RegisterForm } from '@/app/features/auth'

function RegisterPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <RegisterForm />
    </div>
  )
}
```

##### With Callbacks

```tsx
import { RegisterForm } from '@/app/features/auth'

function RegisterPage() {
  return (
    <RegisterForm
      onSuccess={() => {
        console.log('Registration successful!')
        // Show success toast
      }}
      onError={(error) => {
        console.error('Registration failed:', error)
        // Show error toast
      }}
    />
  )
}
```

##### With Custom Redirect

```tsx
<RegisterForm
  redirectTo="/onboarding"
  onSuccess={() => {
    // User will be redirected to /onboarding after successful registration
  }}
/>
```

##### Custom Styling

```tsx
<RegisterForm
  className="my-8 mx-auto"
/>
```

#### Props

```typescript
interface RegisterFormProps {
  /**
   * Callback fired on successful registration
   */
  onSuccess?: () => void

  /**
   * Callback fired on registration error
   */
  onError?: (error: Error) => void

  /**
   * Custom redirect path after successful registration
   * @default '/dashboard'
   */
  redirectTo?: string

  /**
   * Additional CSS classes for the form container
   */
  className?: string
}
```

#### Component Structure

```
RegisterForm
├── Card Container (white bg, shadow, padding)
├── Header
│   ├── Title: "Create your account"
│   └── Subtitle: "Sign up to get started with Wani"
├── Form
│   ├── Full Name Input (required)
│   ├── Email Input (required)
│   ├── Password Input (required, with toggle)
│   ├── Phone Input (optional)
│   ├── API Error Message (if error exists)
│   └── Submit Button (with loading state)
└── Footer
    └── Login Link: "Already have an account? Sign in"
```

#### States

| State | Description | UI Behavior |
|-------|-------------|-------------|
| **Default** | Initial state | All inputs enabled, empty |
| **Loading** | Form submitting | Inputs disabled, button shows spinner |
| **Error** | Validation or API error | Error messages displayed under fields |
| **Success** | Registration complete | Redirects to dashboard/custom path |

#### Error Handling

##### Field Validation Errors

Displayed inline under each field:
- Required field messages
- Format validation (email, phone, password strength)
- Character length constraints

##### API Errors

Displayed in a prominent error banner:
- 409 Conflict: "An account with this email already exists"
- 400 Bad Request: "Please check your registration information"
- Network errors: Custom message from backend or generic fallback

#### Password Requirements

Visual indicator shown under password field:
> Must be at least 8 characters with uppercase, lowercase, and numbers

Password must match the regex pattern:
```typescript
/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/
```

#### Accessibility

- ✅ Proper `<label>` elements with `htmlFor` attributes
- ✅ Required fields marked with `*` and aria-required
- ✅ Error messages associated with inputs
- ✅ Disabled state properly communicated
- ✅ Keyboard navigation support
- ✅ Focus states for all interactive elements

#### Responsive Design

- Mobile (< 640px): Full width, stacked layout
- Tablet (640px - 1024px): Centered with max-width
- Desktop (> 1024px): Centered card, max-width 448px

#### Integration

The RegisterForm integrates with:
1. **useRegister hook** - Handles API mutation and auth store updates
2. **authService** - Makes API call to `/auth/register`
3. **authStore** - Stores user data and tokens after successful registration
4. **React Router** - Navigates to dashboard/custom path after registration

#### Flow Diagram

```
User fills form
      ↓
Click "Create Account"
      ↓
Zod validates data
      ↓
useRegister mutation
      ↓
POST /auth/register
      ↓
Backend creates user
      ↓
Returns user + tokens
      ↓
authStore.login()
      ↓
Navigate to /dashboard
      ↓
User authenticated ✅
```

#### Example Page Layouts

See [RegisterPage.example.tsx](./RegisterPage.example.tsx) for complete page examples:

1. **Simple Centered Layout**
   - Form centered on gray background
   - Minimal, clean design

2. **With Header**
   - Brand header with logo
   - Link to login page
   - Full-page layout

3. **Two-Column Layout**
   - Left: Branding and features
   - Right: Registration form
   - Desktop-optimized

#### Customization

##### Change Button Color

```tsx
// In RegisterForm.tsx, update button className:
className={`
  ${isPending
    ? 'bg-green-400 cursor-not-allowed'
    : 'bg-green-600 hover:bg-green-700'
  }
`}
```

##### Add Terms Checkbox

```tsx
// Add to schema:
terms: z.boolean().refine((val) => val === true, {
  message: 'You must accept the terms and conditions'
})

// Add to form:
<div className="flex items-start">
  <input
    id="terms"
    type="checkbox"
    {...register('terms')}
    className="h-4 w-4 text-blue-600"
  />
  <label htmlFor="terms" className="ml-2 text-sm text-gray-600">
    I agree to the Terms and Conditions
  </label>
</div>
```

##### Add Social Login Buttons

```tsx
{/* Add before or after the form */}
<div className="space-y-3">
  <button className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md">
    <img src="/google-icon.svg" className="h-5 w-5 mr-2" />
    Continue with Google
  </button>
</div>
<div className="relative my-6">
  <div className="absolute inset-0 flex items-center">
    <div className="w-full border-t border-gray-300" />
  </div>
  <div className="relative flex justify-center text-sm">
    <span className="px-2 bg-white text-gray-500">Or continue with</span>
  </div>
</div>
```

#### Testing

##### Unit Tests Example

```tsx
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { RegisterForm } from './RegisterForm'

describe('RegisterForm', () => {
  it('renders all form fields', () => {
    render(<RegisterForm />)
    expect(screen.getByLabelText(/full name/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/phone/i)).toBeInTheDocument()
  })

  it('shows validation errors for invalid input', async () => {
    render(<RegisterForm />)
    const submitButton = screen.getByRole('button', { name: /create account/i })

    fireEvent.click(submitButton)

    await waitFor(() => {
      expect(screen.getByText(/email is required/i)).toBeInTheDocument()
    })
  })

  it('calls onSuccess after successful registration', async () => {
    const onSuccess = jest.fn()
    render(<RegisterForm onSuccess={onSuccess} />)

    // Fill form and submit
    // ...

    await waitFor(() => {
      expect(onSuccess).toHaveBeenCalled()
    })
  })
})
```

#### Troubleshooting

##### Form doesn't submit
- Check if all required fields are filled
- Check browser console for validation errors
- Verify backend is running and accessible

##### Password validation fails
- Ensure password has at least 8 characters
- Include at least one uppercase letter
- Include at least one lowercase letter
- Include at least one number

##### "Email already exists" error
- User may have already registered
- Suggest using "Forgot password?" flow
- Or use different email address

##### Network error
- Check if backend API is running
- Verify `VITE_API_BASE_URL` environment variable
- Check browser network tab for failed requests

#### Next Steps

After implementing RegisterForm:
1. Create LoginForm component - **TASK-051**
2. Create register page route
3. Add toast notifications
4. Implement email verification flow
5. Add analytics tracking
6. Add reCAPTCHA (optional)

#### Backend Requirements

The RegisterForm expects the backend to:
1. Accept POST request to `/auth/register`
2. Validate data against UserCreate schema
3. Return response in format:
```json
{
  "success": true,
  "data": {
    "user": { "id": "...", "email": "...", "full_name": "...", "created_at": "..." },
    "tokens": {
      "access_token": "...",
      "refresh_token": "...",
      "token_type": "Bearer",
      "expires_in": 3600
    }
  }
}
```
4. Return appropriate error codes (400, 409, etc.)
