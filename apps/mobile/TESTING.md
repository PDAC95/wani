# Wani Mobile - Testing Guide

## Running the App

### Prerequisites
- Node.js 18+ installed
- Expo CLI installed (`npm install -g expo-cli`)
- For iOS: Xcode installed (macOS only)
- For Android: Android Studio installed with emulator configured
- For Web: Any modern browser

### Start Development Server

```bash
cd apps/mobile
npm start
```

This will:
1. Start Metro bundler
2. Open Expo Dev Tools in browser
3. Display QR code for physical device testing

### Platform-Specific Commands

#### iOS Simulator (macOS only)
```bash
npm run ios
```

Or press `i` in the terminal after `npm start`

**Requirements:**
- Xcode installed
- iOS Simulator configured
- macOS operating system

#### Android Emulator
```bash
npm run android
```

Or press `a` in the terminal after `npm start`

**Requirements:**
- Android Studio installed
- Android emulator created and running
- `ANDROID_HOME` environment variable set

#### Web Browser
```bash
npm run web
```

Or press `w` in the terminal after `npm start`

**Note:** Web version has limited functionality compared to native apps.

### Testing on Physical Device

#### Using Expo Go App

1. Install Expo Go from App Store (iOS) or Play Store (Android)
2. Run `npm start` in the project
3. Scan QR code with:
   - **iOS**: Camera app
   - **Android**: Expo Go app

#### Development Build (Recommended for Production Testing)

```bash
# Install EAS CLI
npm install -g eas-cli

# Login to Expo
eas login

# Build development version
eas build --profile development --platform ios
eas build --profile development --platform android
```

## Verification Checklist

After starting the app, verify the following:

### ✅ App Loads
- [ ] App starts without errors
- [ ] Splash screen displays correctly
- [ ] No red screen errors

### ✅ Navigation Works
- [ ] Login screen displays
- [ ] Can navigate to Register screen
- [ ] Back navigation works
- [ ] Navigation gestures work (swipe back on iOS)

### ✅ Styling (NativeWind)
- [ ] Tailwind classes are applied correctly
- [ ] Brand colors display (Coral #FB923C, Brown #292524, Cream #FFF7ED)
- [ ] Rounded corners work (`rounded-xl`, `rounded-2xl`)
- [ ] Spacing classes work (`p-6`, `mb-4`, etc.)
- [ ] Text styles work (`text-4xl`, `font-bold`, etc.)

### ✅ Platform-Specific Features
- [ ] Safe area insets work correctly (iOS notch, Android status bar)
- [ ] Status bar styling is correct
- [ ] Keyboard avoidance works on inputs
- [ ] Platform-specific animations work

### ✅ Performance
- [ ] App loads in under 3 seconds
- [ ] Navigation transitions are smooth (60fps)
- [ ] No lag when scrolling
- [ ] No memory leaks (check with React DevTools)

## Common Issues & Solutions

### Issue: "Unable to resolve module"
**Solution:**
```bash
# Clear Metro cache
npm start -- --reset-cache

# Or
npx expo start -c
```

### Issue: "Metro bundler not starting"
**Solution:**
```bash
# Kill any running Metro processes
pkill -f "metro" # macOS/Linux
taskkill /F /IM node.exe # Windows

# Restart
npm start
```

### Issue: "Android emulator not detected"
**Solution:**
1. Open Android Studio
2. Tools → AVD Manager
3. Start an emulator
4. Wait for it to fully boot
5. Run `npm run android` again

### Issue: "iOS simulator not opening"
**Solution:**
```bash
# Open simulator manually
open -a Simulator

# Or specify iOS version
npx expo start --ios
```

### Issue: "NativeWind styles not applying"
**Solution:**
1. Check `babel.config.js` has NativeWind preset
2. Restart Metro bundler with `npm start -- --reset-cache`
3. Verify `global.css` is imported in `App.tsx`

### Issue: "Navigation not working"
**Solution:**
1. Verify `@react-navigation/native` is installed
2. Check `RootNavigator` is properly imported in `App.tsx`
3. Ensure screen components are exported correctly

## Debugging

### React Native Debugger
```bash
# Install
brew install --cask react-native-debugger # macOS
# Or download from: https://github.com/jhen0409/react-native-debugger

# Use
1. Open React Native Debugger
2. Press Cmd+D (iOS) or Cmd+M (Android) in simulator
3. Select "Debug Remote JS"
```

### Expo DevTools
- Press `j` to open debugger
- Press `m` to toggle menu
- Press `r` to reload
- Press `shift+r` for full reload

### Logs
```bash
# View all logs
npx expo start

# iOS logs only
npx react-native log-ios

# Android logs only
npx react-native log-android
```

## Performance Profiling

### React DevTools Profiler
1. Install React DevTools extension
2. Open in-app developer menu
3. Enable Profiler
4. Record interactions
5. Analyze render times

### Flipper (Advanced)
```bash
# Install Flipper
brew install --cask flipper # macOS

# Use plugins:
# - Layout Inspector
# - Network Inspector
# - Crash Reporter
# - Performance Monitor
```

## Automated Testing

### Unit Tests (Jest)
```bash
# Run all tests
npm test

# Watch mode
npm test -- --watch

# Coverage
npm test -- --coverage
```

### Component Tests (React Native Testing Library)
```bash
npm test -- ComponentName.test.tsx
```

### E2E Tests (Detox - Future)
```bash
# Install Detox
npm install -g detox-cli

# Build for testing
detox build --configuration ios.sim.debug

# Run tests
detox test --configuration ios.sim.debug
```

## Build for Production

### iOS
```bash
# Using EAS
eas build --platform ios --profile production

# Upload to App Store
eas submit --platform ios
```

### Android
```bash
# Using EAS
eas build --platform android --profile production

# Generate APK for testing
eas build --platform android --profile preview

# Upload to Play Store
eas submit --platform android
```

## Environment Variables

Create `.env` file:
```env
EXPO_PUBLIC_API_BASE_URL=http://localhost:8000
EXPO_PUBLIC_API_VERSION=v1
```

Access in code:
```typescript
const apiUrl = process.env.EXPO_PUBLIC_API_BASE_URL
```

## Troubleshooting Resources

- [Expo Documentation](https://docs.expo.dev/)
- [React Native Debugging](https://reactnative.dev/docs/debugging)
- [Expo Forums](https://forums.expo.dev/)
- [Stack Overflow - React Native](https://stackoverflow.com/questions/tagged/react-native)

## Next Steps

After verification:
1. ✅ Mark TASK-026 as completed
2. Continue with TASK-027 (User Model implementation)
3. Implement authentication flow
4. Connect to backend API
