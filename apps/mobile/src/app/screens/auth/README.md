# Auth Screens

Authentication screens for user login and registration.

## Screens

### RegisterScreen

Full-featured user registration screen with form validation.

**Location:** `apps/mobile/src/app/screens/auth/RegisterScreen.tsx`

#### Features

- ✅ **React Native TextInput** components (not HTML)
- ✅ **SafeAreaView** for notch/status bar handling
- ✅ **KeyboardAvoidingView** for iOS/Android keyboard handling
- ✅ **ScrollView** for scrollable content
- ✅ **NativeWind** styling with Tailwind classes
- ✅ **Form validation** with real-time error feedback
- ✅ **Password visibility toggle**
- ✅ **Loading state** with ActivityIndicator
- ✅ **Type-safe** with TypeScript
- ✅ **Accessible** with proper labels and placeholders

#### Form Fields

1. **Full Name** (Required)
   - `autoCapitalize="words"`
   - Min 2 characters
   - Type: `RegisterRequest.full_name`

2. **Email** (Required)
   - `keyboardType="email-address"`
   - `autoCapitalize="none"`
   - Email format validation
   - Auto-lowercase
   - Type: `RegisterRequest.email`

3. **Phone** (Optional)
   - `keyboardType="phone-pad"`
   - Phone format validation if provided
   - Type: `RegisterRequest.phone`

4. **Password** (Required)
   - `secureTextEntry` with toggle
   - Min 8 characters
   - Must contain: uppercase, lowercase, number
   - Type: `RegisterRequest.password`

#### Validation Rules

**Full Name:**
```typescript
- Required
- Min 2 characters
- Trimmed whitespace
```

**Email:**
```typescript
- Required
- Valid email format (regex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/)
- Converted to lowercase
```

**Phone:**
```typescript
- Optional
- If provided: must match /^\+?[\d\s\-()]+$/
- Allows: +1 (555) 123-4567 format
```

**Password:**
```typescript
- Required
- Min 8 characters
- At least one uppercase letter
- At least one lowercase letter
- At least one number
```

#### State Management

**Form State:**
```typescript
const [formData, setFormData] = useState<RegisterRequest>({
  email: '',
  password: '',
  full_name: '',
  phone: '',
})
```

**Error State:**
```typescript
const [errors, setErrors] = useState<AuthFormErrors>({
  full_name?: string
  email?: string
  phone?: string
  password?: string
  general?: string
})
```

**UI State:**
```typescript
const [loading, setLoading] = useState(false)
const [showPassword, setShowPassword] = useState(false)
```

#### Form Submission Flow

1. User fills form
2. User taps "Create Account"
3. `validateForm()` runs client-side validation
4. If invalid, show errors inline
5. If valid:
   - Set `loading = true`
   - Call `authService.register(formData)` (TODO)
   - On success: Show success alert → Navigate to Login
   - On error: Show error message
   - Set `loading = false`

#### Error Handling

**Client-side validation:**
- Shows inline errors below each field
- Errors clear when user starts typing
- Red border on invalid fields

**Server-side errors:**
- Shown in general error banner at top
- Alert dialog for user feedback
- Specific error codes handled (e.g., EMAIL_ALREADY_EXISTS)

#### Keyboard Handling

**iOS:**
```typescript
<KeyboardAvoidingView
  behavior="padding"
  keyboardVerticalOffset={0}
>
```

**Android:**
```typescript
<KeyboardAvoidingView
  behavior="height"
  keyboardVerticalOffset={20}
>
```

**ScrollView:**
```typescript
<ScrollView
  keyboardShouldPersistTaps="handled"  // Allows tapping buttons when keyboard is open
  showsVerticalScrollIndicator={false}
>
```

#### Styling

Uses **NativeWind** (Tailwind for React Native):

**Color Palette:**
- `bg-cream` - Background (#FFF7ED)
- `bg-cream-dark` - Input background
- `text-brown` - Primary text
- `text-brown-light` - Secondary text
- `bg-coral` - Primary button (#FF6B6B)
- `text-red-500` - Error text

**Common Classes:**
```typescript
className="flex-1"              // flex: 1
className="p-6"                 // padding: 24px
className="rounded-xl"          // borderRadius: 12px
className="shadow-lg"           // iOS/Android shadow
className="mb-4"                // marginBottom: 16px
```

#### Navigation

**Type-safe navigation:**
```typescript
type NavigationProp = NativeStackNavigationProp<AuthStackParamList, 'Register'>
const navigation = useNavigation<NavigationProp>()

// Navigate to Login
navigation.navigate('Login')
```

#### Integration Points

**TODO - Next Tasks:**

1. **Auth Hook Integration:**
   ```typescript
   // Replace simulation with:
   import { useRegister } from '@/features/auth/hooks'

   const registerMutation = useRegister()

   const handleRegister = () => {
     registerMutation.mutate(formData)
   }
   ```

2. **Auth Store Integration:**
   ```typescript
   import { useAuthStore } from '@/core/store/authStore'

   const setAuth = useAuthStore((state) => state.setAuth)

   // On success:
   setAuth(response.user, response.tokens)
   ```

3. **Navigation Guard:**
   - After successful registration
   - Navigate to email verification or home

#### Testing

**Manual Testing Checklist:**

- [ ] All fields accept input
- [ ] Email converts to lowercase
- [ ] Phone accepts various formats
- [ ] Password toggle works
- [ ] Validation shows errors
- [ ] Errors clear on typing
- [ ] Loading state disables inputs
- [ ] Keyboard doesn't hide inputs (iOS/Android)
- [ ] ScrollView scrolls to focused input
- [ ] Navigation to Login works
- [ ] Terms links are visible

**Test Cases:**

```typescript
// Valid registration
{
  full_name: "John Doe",
  email: "john@example.com",
  phone: "+1 (555) 123-4567",
  password: "SecurePass123"
}

// Invalid - empty name
{
  full_name: "",
  email: "john@example.com",
  password: "SecurePass123"
}
// Expected: "Full name is required"

// Invalid - weak password
{
  full_name: "John Doe",
  email: "john@example.com",
  password: "weak"
}
// Expected: "Password must be at least 8 characters"

// Invalid - no uppercase
{
  full_name: "John Doe",
  email: "john@example.com",
  password: "password123"
}
// Expected: "Password must contain uppercase, lowercase, and number"
```

#### Accessibility

- All inputs have labels
- Placeholders provide examples
- Error messages are descriptive
- Loading state shows ActivityIndicator
- Color contrast meets WCAG standards
- Touch targets are large (44x44 minimum)

#### Performance

- Debouncing not needed (validation on submit)
- Errors clear immediately on typing
- No unnecessary re-renders
- Form state updates are batched

## LoginScreen

**TODO:** Similar implementation needed for LoginScreen

Expected features:
- Email + Password inputs
- Remember me toggle
- Forgot password link
- Social login buttons (optional)

## Related Files

- [Auth Types](../../features/auth/types/auth.types.ts) - TypeScript interfaces
- [Auth Service](../../features/auth/services/authService.ts) - API calls
- [Navigation Types](../../navigation/types.ts) - Navigation params
- [Auth Store](../../core/store/authStore.ts) - State management (to be created)

## Next Steps

1. Create `useRegister` hook with TanStack Query
2. Create auth store with Zustand + AsyncStorage
3. Integrate hook into RegisterScreen
4. Add proper error handling for API errors
5. Add email verification flow
6. Create similar LoginScreen implementation
