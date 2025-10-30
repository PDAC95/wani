# 🎨 Logo Testing Guide - LoginScreen

## ✅ Cambios Realizados

### 1. Logo Integrado
- **Archivo:** `apps/mobile/assets/images/logo-vertical-naranja.png`
- **Tamaño:** 7.8 KB
- **Componente:** `AuthHeader.tsx` actualizado para usar este logo

### 2. LoginScreen Actualizado
- **Archivo:** `apps/mobile/src/app/screens/auth/LoginScreen.tsx`
- **Cambios:**
  - ✅ Integrado AuthHeader con logo
  - ✅ Diseño responsive con ScrollView
  - ✅ KeyboardAvoidingView para iOS/Android
  - ✅ SafeAreaView actualizado (sin warnings)
  - ✅ Colores actualizados (teal-600 para branding)

### 3. Estructura Final
```
LoginScreen
├── SafeAreaView (bg-cream)
│   ├── KeyboardAvoidingView
│   │   └── ScrollView
│   │       ├── AuthHeader (Logo + Título + Subtítulo)
│   │       ├── Form Container (bg-white)
│   │       │   ├── Email Input
│   │       │   ├── Password Input
│   │       │   ├── Sign In Button (bg-teal-600)
│   │       │   └── Sign Up Link
│   │       └── Bottom Spacing
```

## 🚀 Cómo Probar

### Paso 1: Iniciar Expo

```bash
cd apps/mobile
npm start
```

### Paso 2: Abrir en Simulador/Emulador

#### iOS:
```bash
# Presiona 'i' en la terminal
# O escanea el QR con tu iPhone
```

#### Android:
```bash
# Presiona 'a' en la terminal
# O escanea el QR con Expo Go
```

### Paso 3: Navegar a LoginScreen

1. La app debe abrir en la pantalla de Login por defecto
2. Si no, navega desde el menú de navegación

## ✅ Checklist de Verificación Visual

### Logo
- [ ] ✅ Logo `logo-vertical-naranja.png` se visualiza correctamente
- [ ] ✅ Tamaño apropiado (160x160 pt / w-40 h-40)
- [ ] ✅ Centrado horizontalmente
- [ ] ✅ Margin bottom correcto (mb-4)
- [ ] ✅ No está pixelado o borroso

### Header
- [ ] ✅ Título "Welcome Back" se muestra
- [ ] ✅ Subtítulo "Sign in to your Wani account" se muestra
- [ ] ✅ Texto centrado y legible
- [ ] ✅ Espaciado correcto entre logo y texto

### Layout
- [ ] ✅ Fondo cream (#FFF7ED)
- [ ] ✅ Card blanco con shadow
- [ ] ✅ Padding correcto (px-6)
- [ ] ✅ Scroll funciona si contenido es largo

### Responsive
- [ ] ✅ Se ve bien en iPhone SE (pantalla pequeña)
- [ ] ✅ Se ve bien en iPhone 14 Pro (pantalla media)
- [ ] ✅ Se ve bien en iPhone 14 Pro Max (pantalla grande)
- [ ] ✅ Se ve bien en Android (varios tamaños)

### Teclado (Keyboard Behavior)
- [ ] ✅ Tap en Email input → teclado aparece
- [ ] ✅ Content se ajusta automáticamente (no oculta inputs)
- [ ] ✅ Scroll funciona mientras teclado está abierto
- [ ] ✅ Cerrar teclado funciona (tap afuera o botón Done)

### Interacciones
- [ ] ✅ Botón "Sign In" es clickeable (aunque no haga nada aún)
- [ ] ✅ Link "Sign Up" navega a RegisterScreen
- [ ] ✅ No hay lag o freeze
- [ ] ✅ Transiciones suaves

## 🎨 Especificaciones del Logo

### Actual en LoginScreen
```typescript
<Image
  source={require('@/../../assets/images/logo-vertical-naranja.png')}
  className="w-40 h-40 mb-4"
  resizeMode="contain"
/>
```

- **Display size:** 160x160 pt (w-40 h-40 en Tailwind)
- **Resize mode:** contain (mantiene aspect ratio)
- **Margin bottom:** 16 pt (mb-4)

### Si Quieres Ajustar el Tamaño

Edita en [AuthHeader.tsx](./src/app/features/auth/components/AuthHeader.tsx):

```typescript
// Más grande
className="w-48 h-48 mb-4"  // 192x192 pt

// Más pequeño
className="w-32 h-32 mb-4"  // 128x128 pt

// Mucho más pequeño
className="w-24 h-24 mb-4"  // 96x96 pt
```

## 📱 Testing en Diferentes Dispositivos

### iOS Simulators (Recomendado)
```bash
# iPhone SE (3rd gen) - Pantalla pequeña
# iPhone 14 Pro - Pantalla media
# iPhone 14 Pro Max - Pantalla grande
# iPad - Tablet
```

### Android Emulators
```bash
# Pixel 5 - Pantalla media
# Pixel 7 Pro - Pantalla grande
# Tablet - Pantalla extra grande
```

### Dispositivos Físicos
- Escanea QR code con Expo Go
- Más rápido y refleja comportamiento real

## 🐛 Troubleshooting

### Logo no aparece
```bash
# 1. Limpia cache de Metro
npm start -- --clear

# 2. O con reset cache
npx expo start -c

# 3. Verifica que el archivo existe
ls assets/images/logo-vertical-naranja.png
```

### Logo está borroso
- Verifica que el archivo PNG tenga buena resolución
- El logo actual es 7.8KB, podría ser pequeño
- Considera crear versión @2x y @3x

### SafeAreaView no funciona
- Verifica que `react-native-safe-area-context` esté instalado
- Ya está instalado en este proyecto ✅

### Keyboard no se ajusta correctamente
- Ajusta `keyboardVerticalOffset` en KeyboardAvoidingView
- Actual: 0 para iOS, 20 para Android

### Colores no se ven
- Verifica `tailwind.config.js` tiene colores personalizados
- Colores usados: cream, teal-600, slate-700

## 🎯 Próximos Pasos

Después de probar el logo en LoginScreen:

1. **Agregar logo a RegisterScreen**
   ```typescript
   // Ya creaste AuthHeader, solo úsalo:
   import { AuthHeader } from '@/features/auth/components'

   <AuthHeader
     title="Create Account"
     subtitle="Join Wani for seamless payments"
   />
   ```

2. **Opcionales:**
   - [ ] Crear logo-white.png para dark mode
   - [ ] Crear logo-horizontal.png para headers
   - [ ] Crear logo-icon.png para notificaciones
   - [ ] Añadir animación de fade-in al logo

3. **Funcionalidad:**
   - [ ] Implementar lógica de login real
   - [ ] Conectar con authService
   - [ ] Agregar validación de formulario
   - [ ] Agregar loading states

## 📸 Screenshots Esperados

### Vista Completa
```
┌─────────────────────────┐
│    [LOGO NARANJA]       │  ← Logo vertical naranja
│                         │
│    Welcome Back         │  ← Título grande
│  Sign in to your...    │  ← Subtítulo gris
│                         │
│  ┌──────────────────┐  │
│  │  Email           │  │
│  │  you@example.com │  │
│  └──────────────────┘  │
│                         │
│  ┌──────────────────┐  │
│  │  Password        │  │
│  │  ••••••••        │  │
│  └──────────────────┘  │
│                         │
│  ┌──────────────────┐  │
│  │    Sign In       │  │  ← Botón teal
│  └──────────────────┘  │
│                         │
│  Don't have account?   │
│     Sign Up            │  ← Link teal
└─────────────────────────┘
```

## ✅ Confirmación Final

Una vez probado, confirma:

- [ ] ✅ Logo se ve perfecto en iOS
- [ ] ✅ Logo se ve perfecto en Android
- [ ] ✅ Sin errores en consola
- [ ] ✅ Performance fluido (sin lag)
- [ ] ✅ Teclado funciona correctamente
- [ ] ✅ Navegación a Register funciona
- [ ] ✅ Diseño responsive en todos los tamaños

---

**Creado:** 2025-10-22
**Logo usado:** `logo-vertical-naranja.png` (7.8KB)
**Screen probado:** LoginScreen
**Status:** ✅ Listo para probar
