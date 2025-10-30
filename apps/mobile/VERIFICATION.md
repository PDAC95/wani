# Mobile App - Verification & Testing Checklist

Sprint 1 - User Story 1: Auth Implementation Verification

## 📋 Implementation Checklist

### ✅ Completed Tasks

- [x] **TASK-054:** Auth feature folder structure
  - Components, hooks, services, types directories created
  - Index files for exports

- [x] **TASK-055:** Auth types copied to mobile
  - `auth.types.ts` with all interfaces
  - Type exports in `index.ts`

- [x] **TASK-056:** Auth service created
  - `authService.ts` with all endpoints
  - `client.ts` Axios instance with interceptors
  - API exports

- [x] **TASK-057:** RegisterScreen UI created
  - React Native components (not HTML)
  - NativeWind styling
  - Keyboard-aware ScrollView
  - SafeAreaView

- [x] **TASK-058:** Validation with React Hook Form + Zod
  - `validation.schema.ts` with Zod schemas
  - React Hook Form integration
  - API integration
  - Error handling

## 🔍 File Verification

### Required Files Checklist

```bash
# Auth Feature Files
✅ src/app/features/auth/
  ✅ components/index.ts
  ✅ hooks/index.ts
  ✅ services/
    ✅ authService.ts
    ✅ index.ts
    ✅ README.md
    ✅ EXAMPLE.tsx
  ✅ types/
    ✅ auth.types.ts
    ✅ validation.schema.ts
    ✅ index.ts
    ✅ USAGE.md
  ✅ index.ts
  ✅ README.md

# API Client Files
✅ src/app/core/api/
  ✅ client.ts
  ✅ index.ts

# Screen Files
✅ src/app/screens/auth/
  ✅ RegisterScreen.tsx
  ✅ LoginScreen.tsx (placeholder)
  ✅ README.md
  ✅ TESTING.md
  ✅ RegisterScreen.FUTURE.tsx

# Configuration
✅ tsconfig.json (with path aliases)
✅ package.json (with dependencies)
✅ DEPENDENCIES.md
✅ VERIFICATION.md (this file)
```

## 📦 Dependencies Check

### Required Dependencies

Run this command to check:

```bash
cd apps/mobile
npm list react-hook-form zod axios @tanstack/react-query zustand
```

**Expected output:**
```
├── react-hook-form@7.65.0 ✅
├── zod@3.25.76 ✅
├── axios@1.12.2 ✅
├── @tanstack/react-query@5.90.5 ✅
└── zustand@5.0.8 ✅
```

### Missing Dependencies (Install These)

```bash
# Required for React Hook Form + Zod integration
npm install @hookform/resolvers

# Required for auth token storage
npx expo install @react-native-async-storage/async-storage

# Already included in Expo
npx expo install expo-constants
```

**Installation command:**
```bash
cd apps/mobile
npm install @hookform/resolvers
npx expo install @react-native-async-storage/async-storage
```

## 🧪 Compilation Tests

### 1. TypeScript Compilation

```bash
cd apps/mobile
npx tsc --noEmit
```

**Expected:** No errors

**Common errors to fix:**
- Missing @hookform/resolvers
- Path alias issues (check tsconfig.json)
- Import errors

### 2. Check Imports

Verify these imports work:

```typescript
// From RegisterScreen.tsx
import { useForm, Controller } from 'react-hook-form' // ✅
import { zodResolver } from '@hookform/resolvers/zod' // ⚠️ Need to install
import { registerSchema, type RegisterFormData } from '@/features/auth/types' // ✅
import { authService } from '@/features/auth/services' // ✅
```

### 3. Metro Bundler Test

```bash
cd apps/mobile
npx expo start --clear
```

**Expected:**
- Metro bundler starts without errors
- No module resolution errors
- App loads in Expo Go

## 🎯 Feature Tests

### Test 1: Type Exports

```typescript
// Test in any TypeScript file
import type {
  RegisterRequest,
  LoginRequest,
  User,
  AuthTokens,
  RegisterFormData,
} from '@/features/auth/types'

import { registerSchema, authService } from '@/features/auth'
```

**Expected:** No TypeScript errors

### Test 2: Auth Service

```typescript
// Test API client creation
import { api } from '@/core/api'

console.log('API Base URL:', api.defaults.baseURL)
// Expected: http://localhost:8000/api/v1
```

### Test 3: Validation Schema

```typescript
import { registerSchema } from '@/features/auth/types'

// Valid data
const validData = {
  full_name: 'John Doe',
  email: 'john@example.com',
  phone: '+1234567890',
  password: 'SecurePass123',
}

const result = registerSchema.safeParse(validData)
console.log('Valid:', result.success) // Should be true

// Invalid data
const invalidData = {
  full_name: 'J',
  email: 'invalid',
  password: 'weak',
}

const result2 = registerSchema.safeParse(invalidData)
console.log('Invalid:', result2.success) // Should be false
console.log('Errors:', result2.error?.errors) // Should show validation errors
```

### Test 4: RegisterScreen Renders

```bash
# Start Expo
npx expo start

# Open in Expo Go
# Navigate to RegisterScreen
# Check:
  ✅ All form fields render
  ✅ NativeWind classes apply
  ✅ Keyboard shows/hides properly
  ✅ Validation errors appear on blur
  ✅ Submit button works
```

## 🐛 Common Issues & Fixes

### Issue 1: Cannot find module '@hookform/resolvers/zod'

**Error:**
```
Module not found: Can't resolve '@hookform/resolvers/zod'
```

**Fix:**
```bash
npm install @hookform/resolvers
```

### Issue 2: Cannot find module '@/features/auth/types'

**Error:**
```
Module not found: Can't resolve '@/features/auth/types'
```

**Fix:**
Check `tsconfig.json` has path aliases:
```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/app/*"],
      "@/core/*": ["./src/app/core/*"],
      "@/features/*": ["./src/app/features/*"]
    }
  }
}
```

Also check `babel.config.js` or `metro.config.js` for module resolution.

### Issue 3: AsyncStorage not found

**Error:**
```
Module not found: Can't resolve '@react-native-async-storage/async-storage'
```

**Fix:**
```bash
npx expo install @react-native-async-storage/async-storage
```

### Issue 4: API calls fail with network error

**Possible causes:**
1. Backend not running
2. Wrong API_URL in config
3. CORS issues

**Fix:**
Check `app.json`:
```json
{
  "expo": {
    "extra": {
      "apiUrl": "http://localhost:8000"
    }
  }
}
```

For Android emulator, use:
```
"apiUrl": "http://10.0.2.2:8000"
```

For iOS simulator, use:
```
"apiUrl": "http://localhost:8000"
```

## 🚀 Integration Tests

### Test Scenario 1: Valid Registration

**Steps:**
1. Open RegisterScreen
2. Fill form:
   - Full Name: "Test User"
   - Email: "test@example.com"
   - Phone: "+1234567890"
   - Password: "SecurePass123"
3. Tap "Create Account"

**Expected:**
- ✅ Loading spinner shows
- ✅ Success alert appears
- ✅ Navigate to Login screen

**Current state:** ⚠️ Simulated (backend not connected)

### Test Scenario 2: Invalid Email

**Steps:**
1. Enter "invalidemail" in email field
2. Tap outside field (onBlur)

**Expected:**
- ✅ Error: "Please enter a valid email address"
- ✅ Red border on field

### Test Scenario 3: Weak Password

**Steps:**
1. Enter "weak" in password field
2. Tap outside field

**Expected:**
- ✅ Error: "Password must be at least 8 characters"

### Test Scenario 4: API Integration (When Backend Ready)

**Prerequisites:**
- Backend running at http://localhost:8000
- Database initialized

**Steps:**
1. Fill valid registration data
2. Submit form

**Expected:**
- ✅ Real API call to POST /api/v1/auth/register
- ✅ User created in database
- ✅ Tokens returned
- ✅ Navigate to next screen

## 📊 Verification Results

### Run This Verification Script

```bash
#!/bin/bash
# Save as: verify-mobile-auth.sh

echo "🔍 Mobile Auth Implementation Verification"
echo "=========================================="
echo ""

# Check files exist
echo "📁 Checking files..."
files=(
  "src/app/features/auth/types/auth.types.ts"
  "src/app/features/auth/types/validation.schema.ts"
  "src/app/features/auth/services/authService.ts"
  "src/app/core/api/client.ts"
  "src/app/screens/auth/RegisterScreen.tsx"
)

for file in "${files[@]}"; do
  if [ -f "apps/mobile/$file" ]; then
    echo "  ✅ $file"
  else
    echo "  ❌ $file MISSING"
  fi
done

echo ""
echo "📦 Checking dependencies..."
cd apps/mobile
npm list react-hook-form zod @hookform/resolvers 2>/dev/null

echo ""
echo "🧪 Running TypeScript check..."
npx tsc --noEmit 2>&1 | head -20

echo ""
echo "✅ Verification complete!"
```

### Expected Output

```
🔍 Mobile Auth Implementation Verification
==========================================

📁 Checking files...
  ✅ src/app/features/auth/types/auth.types.ts
  ✅ src/app/features/auth/types/validation.schema.ts
  ✅ src/app/features/auth/services/authService.ts
  ✅ src/app/core/api/client.ts
  ✅ src/app/screens/auth/RegisterScreen.tsx

📦 Checking dependencies...
├── react-hook-form@7.65.0
├── zod@3.25.76
└── @hookform/resolvers@3.x.x

🧪 Running TypeScript check...
No errors found

✅ Verification complete!
```

## 📝 Next Steps After Verification

1. **Install missing dependencies:**
   ```bash
   npm install @hookform/resolvers
   npx expo install @react-native-async-storage/async-storage
   ```

2. **Test on real device:**
   - Install Expo Go on phone
   - Scan QR code
   - Test RegisterScreen

3. **Fix any compilation errors:**
   - Check TypeScript errors
   - Fix import paths
   - Update types if needed

4. **Backend integration:**
   - Ensure backend is running
   - Test API endpoints
   - Verify error handling

5. **Create auth store:**
   - Zustand store for auth state
   - AsyncStorage persistence
   - Token management

6. **Create auth hooks:**
   - useRegister with TanStack Query
   - useLogin
   - Error handling

7. **Complete LoginScreen:**
   - Similar to RegisterScreen
   - Use loginSchema
   - Integrate with hooks

## 🎯 Success Criteria

- [ ] All files exist
- [ ] Dependencies installed
- [ ] TypeScript compiles without errors
- [ ] App runs in Expo Go
- [ ] RegisterScreen renders correctly
- [ ] Form validation works
- [ ] Can submit form (even if simulated)
- [ ] Error handling works
- [ ] Navigation works

## 📚 Documentation Links

- [RegisterScreen README](src/app/screens/auth/README.md)
- [Auth Types USAGE](src/app/features/auth/types/USAGE.md)
- [Auth Service README](src/app/features/auth/services/README.md)
- [Testing Guide](src/app/screens/auth/TESTING.md)
- [Dependencies](DEPENDENCIES.md)
