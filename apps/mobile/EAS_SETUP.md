# EAS (Expo Application Services) Setup

**Project:** Wani Mobile App
**Last Updated:** 2024-12-20
**EAS CLI Version:** >= 13.2.2

---

## Overview

EAS (Expo Application Services) is configured for building, submitting, and updating the Wani mobile app across development, preview, and production environments.

---

## Configuration File

The `eas.json` file contains three build profiles:

### 1. Development Profile

**Purpose:** For development builds with fast iteration

```json
"development": {
  "developmentClient": true,
  "distribution": "internal",
  "android": { "buildType": "apk" },
  "ios": { "simulator": true },
  "env": { "API_URL": "http://localhost:8000" }
}
```

**Usage:**
```powershell
eas build --profile development --platform android
eas build --profile development --platform ios
```

### 2. Preview Profile

**Purpose:** For internal testing before production

```json
"preview": {
  "distribution": "internal",
  "android": { "buildType": "apk" },
  "env": { "API_URL": "https://wani-api-preview.railway.app" }
}
```

**Usage:**
```powershell
eas build --profile preview --platform android
eas build --profile preview --platform ios
```

### 3. Production Profile

**Purpose:** For App Store and Google Play releases

```json
"production": {
  "autoIncrement": true,
  "env": { "API_URL": "https://wani-api.railway.app" }
}
```

**Usage:**
```powershell
eas build --profile production --platform android
eas build --profile production --platform ios
```

---

## Initial Setup

### 1. Login to Expo

```powershell
npx expo login
```

**Credentials:**
- Email: dev@jappi.ca
- Password: (use your Expo account password)

### 2. Link Project to EAS

```powershell
cd apps/mobile
eas build:configure
```

This will:
- Create a new EAS project if needed
- Link your local project to the EAS project
- Generate a project ID in `app.json`

### 3. Create First Build

**Android APK (Development):**
```powershell
eas build --profile development --platform android
```

**iOS Simulator (Development):**
```powershell
eas build --profile development --platform ios
```

---

## Environment Variables

Each build profile has its own `API_URL`:

| Profile | API_URL | Purpose |
|---------|---------|---------|
| development | `http://localhost:8000` | Local backend |
| preview | `https://wani-api-preview.railway.app` | Staging backend |
| production | `https://wani-api.railway.app` | Production backend |

### Adding More Environment Variables

Edit `eas.json` and add to the `env` object:

```json
"production": {
  "env": {
    "API_URL": "https://wani-api.railway.app",
    "STELLAR_NETWORK": "public",
    "SENTRY_DSN": "your-sentry-dsn"
  }
}
```

---

## Building Apps

### Android Builds

**Development APK:**
```powershell
eas build --profile development --platform android
```

**Preview APK:**
```powershell
eas build --profile preview --platform android
```

**Production AAB (for Google Play):**
```powershell
eas build --profile production --platform android
```

### iOS Builds

**Development Simulator:**
```powershell
eas build --profile development --platform ios
```

**Preview (TestFlight):**
```powershell
eas build --profile preview --platform ios
```

**Production (App Store):**
```powershell
eas build --profile production --platform ios
```

---

## Submitting to Stores

### Google Play Store

**Requirements:**
1. Google Service Account JSON key
2. Place `google-service-account.json` in `apps/mobile/` (gitignored)

**Submit:**
```powershell
eas submit --platform android --latest
```

This will submit to **internal testing track** first.

### Apple App Store

**Requirements:**
1. Apple ID: dev@jappi.ca
2. App Store Connect App ID
3. Apple Team ID

**Submit:**
```powershell
eas submit --platform ios --latest
```

---

## EAS Update (OTA Updates)

For pushing JavaScript/asset updates without rebuilding:

### 1. Configure EAS Update

```powershell
eas update:configure
```

### 2. Publish Update

**Preview:**
```powershell
eas update --branch preview --message "Bug fixes"
```

**Production:**
```powershell
eas update --branch production --message "New features"
```

---

## Common Commands

### Check Build Status
```powershell
eas build:list
```

### View Build Logs
```powershell
eas build:view <build-id>
```

### Cancel Build
```powershell
eas build:cancel <build-id>
```

### Check Submit Status
```powershell
eas submit:list
```

---

## Credentials Management

EAS automatically manages signing credentials:

**View Credentials:**
```powershell
eas credentials
```

**Android:**
- Keystore (automatically generated)
- Upload key for Google Play

**iOS:**
- Distribution Certificate
- Provisioning Profiles
- Push Notification keys

---

## Build Workflow

### Development Workflow

1. Make code changes
2. Test with Expo Go: `npx expo start --tunnel`
3. Build development APK/IPA for device testing
4. Push OTA update if only JS changes

### Preview/Staging Workflow

1. Merge feature branch to `develop`
2. Build preview profile
3. Distribute to internal testers
4. Test against staging backend

### Production Workflow

1. Merge `develop` to `main`
2. Build production profile
3. Submit to App Store / Google Play
4. Wait for review approval
5. Release to users

---

## Troubleshooting

### Build Fails with "Invalid credentials"

```powershell
eas credentials
# Select platform, then "Remove all credentials"
# Rebuild - EAS will generate new credentials
```

### Build Takes Too Long

- Use `--local` flag to build on your machine
- Requires Docker installed

```powershell
eas build --profile development --platform android --local
```

### OTA Update Not Showing

- Check app is on correct update branch
- Run `eas update:list` to verify publish
- Users need to restart app to receive update

---

## Resources

- [EAS Build Documentation](https://docs.expo.dev/build/introduction/)
- [EAS Submit Documentation](https://docs.expo.dev/submit/introduction/)
- [EAS Update Documentation](https://docs.expo.dev/eas-update/introduction/)
- [Expo Application Services](https://expo.dev/eas)

---

## Notes

- **Build credits:** Free tier includes limited builds per month
- **Priority builds:** Available on paid plans
- **Build time:** Usually 10-20 minutes per platform
- **Concurrent builds:** Limited on free tier
