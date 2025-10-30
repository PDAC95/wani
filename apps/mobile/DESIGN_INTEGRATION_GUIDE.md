# Design Integration Guide - Logo & Branding

## 📋 Resumen

Esta guía te ayudará a integrar el logo de Wani en las pantallas de autenticación.

## 🎯 Pasos para Integrar el Logo

### Paso 1: Preparar el Logo

1. **Ubicación:** Coloca tu logo en:
   ```
   apps/mobile/assets/images/logo.png
   ```

2. **Especificaciones recomendadas:**
   - Tamaño: **400x400 px**
   - Formato: PNG con transparencia
   - Peso: < 200 KB
   - Color: Versión principal (en colores de la marca)

3. **Ver especificaciones completas:**
   - [assets/images/LOGO_SPECIFICATIONS.md](./assets/images/LOGO_SPECIFICATIONS.md)

### Paso 2: Usar el Componente AuthHeader

Ya creamos un componente reutilizable llamado `AuthHeader` que puedes usar en tus pantallas:

#### Importar el componente:
```typescript
import { AuthHeader } from '@/features/auth/components'
```

#### Usar en RegisterScreen:
```typescript
<ScrollView className="flex-1 px-6 pt-8">
  {/* Logo y Header */}
  <AuthHeader
    title="Create Account"
    subtitle="Join Wani for seamless cross-border payments"
  />

  {/* Resto del formulario */}
  <Controller
    control={control}
    name="full_name"
    // ...
  />
</ScrollView>
```

#### Usar en LoginScreen:
```typescript
<ScrollView className="flex-1 px-6 pt-8">
  {/* Logo y Header */}
  <AuthHeader
    title="Welcome Back"
    subtitle="Sign in to continue to Wani"
  />

  {/* Resto del formulario */}
  <Controller
    control={control}
    name="email"
    // ...
  />
</ScrollView>
```

### Paso 3: Personalizar (Opcional)

Si quieres más control, puedes usar el logo directamente:

```typescript
import { Image } from 'react-native'

<View className="items-center mb-8">
  <Image
    source={require('@/../../assets/images/logo.png')}
    className="w-40 h-40"
    resizeMode="contain"
  />
</View>
```

## 🎨 Ejemplos de Diseño

### Opción 1: Logo Grande Centrado
```typescript
<View className="items-center py-8">
  <Image
    source={require('@/../../assets/images/logo.png')}
    className="w-48 h-48"
    resizeMode="contain"
  />
  <Text className="text-3xl font-bold text-slate-800 mt-4">
    Wani
  </Text>
  <Text className="text-slate-600 mt-2">
    Cross-Border Payments
  </Text>
</View>
```

### Opción 2: Logo Pequeño con Título
```typescript
<View className="items-center py-6">
  <Image
    source={require('@/../../assets/images/logo.png')}
    className="w-24 h-24"
    resizeMode="contain"
  />
  <Text className="text-2xl font-bold text-teal-600 mt-3">
    Create Your Account
  </Text>
</View>
```

### Opción 3: Logo + Descripción
```typescript
<View className="items-center py-8">
  <Image
    source={require('@/../../assets/images/logo.png')}
    className="w-32 h-32"
    resizeMode="contain"
  />
  <Text className="text-3xl font-bold text-slate-800 mt-4">
    Welcome to Wani
  </Text>
  <Text className="text-slate-600 text-center mt-2 px-8">
    Send money across borders with low fees and fast transfers
  </Text>
</View>
```

## 🛠️ Integración Paso a Paso en RegisterScreen

### Modificación en RegisterScreen.tsx

Encuentra esta sección (aproximadamente línea 130-140):

```typescript
// ANTES:
<ScrollView
  className="flex-1 px-6"
  keyboardShouldPersistTaps="handled"
>
  {/* API Error */}
  {apiError && (
    <View className="mb-4 p-4 bg-red-50 rounded-lg">
      <Text className="text-red-700 text-sm">{apiError}</Text>
    </View>
  )}

  {/* Full Name Field */}
  <Text className="text-slate-700 text-sm font-medium mb-2">
    Full Name *
  </Text>
  // ...
```

```typescript
// DESPUÉS:
<ScrollView
  className="flex-1 px-6"
  keyboardShouldPersistTaps="handled"
>
  {/* Logo y Header - NUEVO */}
  <AuthHeader
    title="Create Account"
    subtitle="Join Wani for seamless payments"
  />

  {/* API Error */}
  {apiError && (
    <View className="mb-4 p-4 bg-red-50 rounded-lg">
      <Text className="text-red-700 text-sm">{apiError}</Text>
    </View>
  )}

  {/* Full Name Field */}
  <Text className="text-slate-700 text-sm font-medium mb-2">
    Full Name *
  </Text>
  // ...
```

## 📱 Testing del Logo

Después de agregar el logo:

```bash
# 1. Limpiar caché de Metro
npm start -- --clear

# 2. O reiniciar con reset cache
npx expo start -c

# 3. Probar en iOS
i

# 4. Probar en Android
a
```

## ✅ Checklist de Implementación

- [ ] Logo colocado en `apps/mobile/assets/images/logo.png`
- [ ] Importar AuthHeader en RegisterScreen
- [ ] Agregar `<AuthHeader />` al inicio del ScrollView
- [ ] Ajustar título y subtítulo según pantalla
- [ ] Probar en iOS simulator
- [ ] Probar en Android emulator
- [ ] Verificar responsive en diferentes tamaños
- [ ] Ajustar espaciado si es necesario

## 🎯 Archivos a Modificar

1. **RegisterScreen.tsx**
   - Línea ~10: Importar AuthHeader
   - Línea ~130: Agregar componente antes del formulario

2. **LoginScreen.tsx** (cuando se implemente)
   - Similar a RegisterScreen
   - Cambiar title/subtitle según contexto

## 💡 Tips de Diseño

1. **Espaciado:** Usa `mb-8` (margin-bottom) después del header
2. **Tamaño responsive:** El logo se adapta automáticamente
3. **Accesibilidad:** El AuthHeader incluye `accessibilityLabel`
4. **Personalización:** Puedes pasar `showLogo={false}` para ocultar el logo
5. **Colores brand:** Usa `text-teal-600` para elementos de marca

## 🔗 Recursos

- [Logo Specifications](./assets/images/LOGO_SPECIFICATIONS.md)
- [AuthHeader Component](./src/app/features/auth/components/AuthHeader.tsx)
- [NativeWind Docs](https://www.nativewind.dev/)
- [React Native Image](https://reactnative.dev/docs/image)

## 📝 Notas

- El componente AuthHeader usa temporalmente `icon.png` como placeholder
- Cuando agregues `logo.png`, descomenta la línea correcta en AuthHeader.tsx
- Los tamaños de imagen usan Tailwind classes (`w-32 h-32` = 128x128 pt)

---

**Creado:** 2025-10-22
**Para:** Sprint 1 - User Story 1
**Contacto:** [Tu equipo de diseño]
