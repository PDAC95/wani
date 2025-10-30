# Mobile App - Missing Dependencies

## Required Dependencies

The following dependencies need to be installed for the mobile app to work properly:

### AsyncStorage (Required for Auth)

Used for persisting authentication tokens and user data.

```bash
npx expo install @react-native-async-storage/async-storage
```

### Hookform Resolvers (Required for Form Validation)

Connects Zod schemas with React Hook Form.

```bash
npm install @hookform/resolvers
```

### Expo Constants (Already installed via Expo SDK)

Used for accessing environment variables and app configuration.

```bash
npx expo install expo-constants
```

## Installation

Run from the mobile app directory:

```bash
cd apps/mobile
npx expo install @react-native-async-storage/async-storage
npm install @hookform/resolvers
```

## Verification

After installation, verify the dependencies are in `package.json`:

```json
{
  "dependencies": {
    "@react-native-async-storage/async-storage": "^1.x.x",
    "expo-constants": "~x.x.x"
  }
}
```

## Usage

These dependencies are used by:

- **Auth Service** (`src/app/core/api/client.ts`) - Token storage and retrieval
- **Auth Store** (to be created) - State persistence
- **API Client** - Environment configuration

## After Installation

1. Restart the Expo development server
2. Clear Metro bundler cache if needed:
   ```bash
   npx expo start -c
   ```

## iOS/Android Specific

No additional native configuration is required. These packages work out of the box with Expo managed workflow.
