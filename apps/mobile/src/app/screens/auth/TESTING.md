# RegisterScreen Testing Guide

Manual testing guide for the RegisterScreen with React Hook Form + Zod validation.

## Prerequisites

Install required dependencies:

```bash
cd apps/mobile
npx expo install @react-native-async-storage/async-storage
npm install @hookform/resolvers
```

## Test Cases

### 1. Form Validation Tests

#### Test Case 1.1: Empty Form Submission
**Steps:**
1. Open RegisterScreen
2. Tap "Create Account" without filling any fields
3. Tap outside each field to trigger onBlur validation

**Expected:**
- ❌ Full name: "Full name is required"
- ❌ Email: "Email is required"
- ❌ Password: "Password is required"
- Phone: No error (optional field)

#### Test Case 1.2: Invalid Email Format
**Steps:**
1. Enter "invalidemail" in email field
2. Tap outside field

**Expected:**
- ❌ Email: "Please enter a valid email address"

**Valid formats:**
- ✅ `user@example.com`
- ✅ `test.user+tag@domain.co.uk`

**Invalid formats:**
- ❌ `invalidemail`
- ❌ `user@`
- ❌ `@domain.com`

#### Test Case 1.3: Weak Password
**Steps:**
1. Enter various passwords
2. Tap outside password field

**Test passwords:**

| Password | Expected Result |
|----------|----------------|
| `abc` | ❌ "Password must be at least 8 characters" |
| `password` | ❌ "Password must contain at least one uppercase letter" |
| `PASSWORD` | ❌ "Password must contain at least one lowercase letter" |
| `Password` | ❌ "Password must contain at least one number" |
| `Pass123` | ✅ Valid (8 chars, upper, lower, number) |
| `SecurePass123` | ✅ Valid |

#### Test Case 1.4: Short Full Name
**Steps:**
1. Enter "A" in full name
2. Tap outside field

**Expected:**
- ❌ "Full name must be at least 2 characters"

#### Test Case 1.5: Invalid Phone Number
**Steps:**
1. Enter "abc123" in phone field
2. Tap outside field

**Expected:**
- ❌ "Please enter a valid phone number"

**Valid formats:**
- ✅ `+1 (555) 123-4567`
- ✅ `5551234567`
- ✅ `+44 20 1234 5678`
- ✅ Empty (optional)

**Invalid formats:**
- ❌ `abc123`
- ❌ `123abc`

### 2. Form Submission Tests

#### Test Case 2.1: Successful Registration
**Steps:**
1. Fill all required fields with valid data:
   - Full Name: "John Doe"
   - Email: "john.doe@example.com"
   - Phone: "+1 (555) 123-4567" (optional)
   - Password: "SecurePass123"
2. Tap "Create Account"

**Expected:**
- Loading spinner appears
- Button becomes disabled
- Input fields become disabled
- Success alert: "Account created successfully! Please verify your email."
- On OK: Navigate to Login screen

**Current behavior:**
- ⚠️ Simulated success (1.5s delay)
- ⚠️ TODO: Integrate real authService

#### Test Case 2.2: Registration with Existing Email
**Steps:**
1. Use email that already exists
2. Tap "Create Account"

**Expected:**
- API returns error with code `EMAIL_ALREADY_EXISTS`
- Error shown under email field: "This email is already registered"
- Alert: "Registration Failed"

**Current behavior:**
- ⚠️ Simulated (will work when backend is connected)

#### Test Case 2.3: Network Error
**Steps:**
1. Disable internet connection
2. Fill form and submit

**Expected:**
- Error alert with network message
- General error banner at top
- Form remains filled (no data loss)

### 3. UI/UX Tests

#### Test Case 3.1: Password Visibility Toggle
**Steps:**
1. Enter password "SecurePass123"
2. Tap "Show" button
3. Tap "Hide" button

**Expected:**
- Password shows as `••••••••` initially
- After "Show": Password displays as `SecurePass123`
- After "Hide": Password displays as `••••••••`

#### Test Case 3.2: Loading State
**Steps:**
1. Fill form
2. Tap "Create Account"

**Expected during loading:**
- Button shows spinner (ActivityIndicator)
- Button text changes from "Create Account" to spinner
- Button is disabled
- All input fields are disabled
- Cannot tap "Sign In" link

#### Test Case 3.3: Keyboard Handling (iOS)
**Steps:**
1. Tap on first field (Full Name)
2. Fill and move to next field
3. Continue to password field

**Expected:**
- Keyboard appears
- Current input stays visible (not hidden by keyboard)
- ScrollView auto-scrolls to focused field
- Tap outside to dismiss keyboard

#### Test Case 3.4: Keyboard Handling (Android)
**Steps:**
1. Same as iOS test

**Expected:**
- Keyboard behavior matches platform (height adjustment)
- All fields remain accessible

#### Test Case 3.5: Error Clearing
**Steps:**
1. Submit form with invalid email
2. See error message
3. Start typing in email field

**Expected:**
- Error message appears on blur
- Error message disappears when user starts typing
- Red border disappears

### 4. Navigation Tests

#### Test Case 4.1: Navigate to Login
**Steps:**
1. Tap "Sign In" link

**Expected:**
- Navigate to Login screen
- Form data is not preserved (fresh login screen)

#### Test Case 4.2: Back Navigation
**Steps:**
1. Use device back button (Android) or swipe back (iOS)

**Expected:**
- Return to previous screen
- Form data is cleared

### 5. Type Safety Tests

These tests verify TypeScript compilation:

#### Test Case 5.1: Schema Type Inference
```typescript
// Should compile
const data: RegisterFormData = {
  full_name: "John Doe",
  email: "john@example.com",
  phone: "+1234567890",
  password: "Pass123"
}

// Should error: missing required field
const invalid: RegisterFormData = {
  email: "john@example.com",
  password: "Pass123"
}
```

#### Test Case 5.2: Error Type Safety
```typescript
// errors.full_name should be typed
if (errors.full_name) {
  console.log(errors.full_name.message) // ✅
  console.log(errors.full_name.invalid)  // ❌ TypeScript error
}
```

## Integration Tests (After Backend is Ready)

### Test Case 6.1: Real API Integration
**Prerequisites:**
- Backend running at configured API_URL
- Database with users table

**Steps:**
1. Fill form with unique email
2. Submit
3. Check database for new user
4. Verify email sent (if configured)

**Expected:**
- User created in database
- Tokens returned from API
- Success navigation

### Test Case 6.2: Duplicate Email Detection
**Steps:**
1. Register with email "test@example.com"
2. Try registering again with same email

**Expected:**
- First attempt: Success
- Second attempt: Error "This email is already registered"

### Test Case 6.3: Token Storage
**Steps:**
1. Register successfully
2. Check AsyncStorage

**Expected:**
- Auth tokens stored in AsyncStorage
- Key: 'wani-auth'
- Value: `{ user, tokens, isAuthenticated: true }`

## Performance Tests

### Test Case 7.1: Form Re-renders
**Monitor:**
- Form should not re-render on every keystroke
- Only affected fields re-render
- Validation runs on blur, not on change

### Test Case 7.2: Validation Performance
**Steps:**
1. Fill all fields rapidly
2. Submit form

**Expected:**
- No lag or freeze
- Validation completes < 100ms

## Accessibility Tests

### Test Case 8.1: Screen Reader
**Steps:**
1. Enable VoiceOver (iOS) or TalkBack (Android)
2. Navigate through form

**Expected:**
- Labels are read correctly
- Error messages are announced
- Button states are announced

### Test Case 8.2: Touch Targets
**Verify:**
- All buttons are at least 44x44 points
- Input fields have adequate spacing
- Easy to tap on small devices

## Test Results Template

```markdown
## Test Session: [Date]
**Device:** [iPhone 15 / Pixel 6 / etc.]
**OS:** [iOS 17.5 / Android 14]
**Expo Version:** [~54.0.16]

| Test Case | Status | Notes |
|-----------|--------|-------|
| 1.1 Empty Form | ✅ / ❌ | |
| 1.2 Invalid Email | ✅ / ❌ | |
| 1.3 Weak Password | ✅ / ❌ | |
| 2.1 Successful Registration | ⚠️ | Simulated |
| 3.1 Password Toggle | ✅ / ❌ | |
| 3.2 Loading State | ✅ / ❌ | |

**Issues Found:**
- Issue 1: [Description]
- Issue 2: [Description]

**Performance:**
- Form load time: [X ms]
- Validation time: [X ms]
- Submit time: [X ms]
```

## Debug Mode

Enable debug logging:

```typescript
// In RegisterScreen.tsx
const onSubmit = async (data: RegisterFormData) => {
  console.log('📝 Form data:', data)
  console.log('✅ Validation passed')
  // ... rest of code
}
```

Check errors in console:

```typescript
useEffect(() => {
  if (Object.keys(errors).length > 0) {
    console.log('❌ Form errors:', errors)
  }
}, [errors])
```

## Common Issues

### Issue 1: @hookform/resolvers not installed
**Error:** `Cannot find module '@hookform/resolvers/zod'`
**Fix:** `npm install @hookform/resolvers`

### Issue 2: Validation not triggering
**Cause:** `mode` not set in useForm
**Fix:** Already set to `onBlur` in line 45

### Issue 3: Form not clearing after success
**Cause:** Need to call `reset()` from useForm
**Fix:** Add after successful registration

### Issue 4: API errors not showing
**Cause:** Error handling needs specific error codes
**Fix:** Check backend returns proper error format
