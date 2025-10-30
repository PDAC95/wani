# 📋 Manual Verification Checklist - Mobile Auth Implementation

**Sprint 1 - User Story 1:** User registration flow in mobile app

Sigue este checklist paso a paso para verificar que toda la implementación de auth en mobile esté correcta.

---

## 🎯 PARTE 1: Verificación de Archivos

### ✅ Checklist: Archivos Creados

Verifica que TODOS estos archivos existan:

#### Auth Types
- [ ] `apps/mobile/src/app/features/auth/types/auth.types.ts` existe
- [ ] `apps/mobile/src/app/features/auth/types/validation.schema.ts` existe
- [ ] `apps/mobile/src/app/features/auth/types/index.ts` existe
- [ ] `apps/mobile/src/app/features/auth/types/USAGE.md` existe

#### Auth Services
- [ ] `apps/mobile/src/app/features/auth/services/authService.ts` existe
- [ ] `apps/mobile/src/app/features/auth/services/index.ts` existe
- [ ] `apps/mobile/src/app/features/auth/services/README.md` existe
- [ ] `apps/mobile/src/app/features/auth/services/EXAMPLE.tsx` existe

#### API Client
- [ ] `apps/mobile/src/app/core/api/client.ts` existe
- [ ] `apps/mobile/src/app/core/api/index.ts` existe

#### Screens
- [ ] `apps/mobile/src/app/screens/auth/RegisterScreen.tsx` existe
- [ ] `apps/mobile/src/app/screens/auth/README.md` existe
- [ ] `apps/mobile/src/app/screens/auth/TESTING.md` existe

#### Configuration
- [ ] `apps/mobile/tsconfig.json` tiene path aliases configurados
- [ ] `apps/mobile/DEPENDENCIES.md` existe
- [ ] `apps/mobile/VERIFICATION.md` existe

**Comando para verificar:**
```bash
cd apps/mobile
ls -la src/app/features/auth/types/
ls -la src/app/features/auth/services/
ls -la src/app/core/api/
ls -la src/app/screens/auth/
```

---

## 🔍 PARTE 2: Verificación de Contenido

### ✅ Checklist: auth.types.ts

Abre `apps/mobile/src/app/features/auth/types/auth.types.ts` y verifica:

- [ ] Interface `RegisterRequest` está definida con: email, password, full_name, phone
- [ ] Interface `RegisterResponse` está definida
- [ ] Interface `LoginRequest` está definida
- [ ] Interface `LoginResponse` está definida
- [ ] Interface `User` está definida
- [ ] Interface `AuthTokens` está definida
- [ ] Interface `AuthState` está definida
- [ ] Interface `AuthError` está definida
- [ ] Interface `AuthFormErrors` está definida

### ✅ Checklist: validation.schema.ts

Abre `apps/mobile/src/app/features/auth/types/validation.schema.ts` y verifica:

- [ ] `registerSchema` está exportado
- [ ] `loginSchema` está exportado
- [ ] `passwordResetRequestSchema` está exportado
- [ ] `passwordResetConfirmSchema` está exportado
- [ ] `changePasswordSchema` está exportado
- [ ] Types inferidos están exportados (RegisterFormData, etc.)

**Verificar reglas de validación en registerSchema:**
- [ ] `full_name`: min(2), max(100), trim
- [ ] `email`: email(), toLowerCase(), trim
- [ ] `phone`: optional, regex validation
- [ ] `password`: min(8), regex para mayúscula, minúscula, número

### ✅ Checklist: authService.ts

Abre `apps/mobile/src/app/features/auth/services/authService.ts` y verifica:

- [ ] `authService.login()` está definido
- [ ] `authService.register()` está definido
- [ ] `authService.refreshToken()` está definido
- [ ] `authService.getCurrentUser()` está definido
- [ ] `authService.logout()` está definido
- [ ] `authService.requestPasswordReset()` está definido
- [ ] `authService.confirmPasswordReset()` está definido
- [ ] `authService.changePassword()` está definido
- [ ] `authService.verifyEmail()` está definido
- [ ] `authService.resendVerificationEmail()` está definido
- [ ] Importa `api` de `@/core/api`
- [ ] Todos los métodos son async
- [ ] Todos los métodos tienen tipos de retorno correctos

### ✅ Checklist: client.ts (API Client)

Abre `apps/mobile/src/app/core/api/client.ts` y verifica:

- [ ] Importa `axios` correctamente
- [ ] Importa `AsyncStorage` de '@react-native-async-storage/async-storage'
- [ ] Importa `Constants` de 'expo-constants'
- [ ] Crea instancia de axios con `baseURL`
- [ ] Tiene request interceptor para agregar token
- [ ] Tiene response interceptor para manejar 401
- [ ] Exporta `api`, `apiConfig`, `isApiError`

**Verificar request interceptor:**
- [ ] Lee tokens de AsyncStorage
- [ ] Agrega header `Authorization: Bearer {token}`

**Verificar response interceptor:**
- [ ] Maneja error 401
- [ ] Intenta refresh token
- [ ] Retry request con nuevo token
- [ ] Limpia auth si refresh falla

### ✅ Checklist: RegisterScreen.tsx

Abre `apps/mobile/src/app/screens/auth/RegisterScreen.tsx` y verifica:

**Imports:**
- [ ] Importa componentes de 'react-native' (View, Text, TextInput, etc.)
- [ ] Importa `SafeAreaView` de 'react-native-safe-area-context'
- [ ] Importa `useForm, Controller` de 'react-hook-form'
- [ ] Importa `zodResolver` de '@hookform/resolvers/zod'
- [ ] Importa `registerSchema` de '@/features/auth/types'
- [ ] Importa `authService` de '@/features/auth/services'

**React Hook Form:**
- [ ] Usa `useForm` con `zodResolver(registerSchema)`
- [ ] Tiene `mode: 'onBlur'`
- [ ] Destructura: control, handleSubmit, formState, setError

**Form Fields:**
- [ ] Campo Full Name con `<Controller>`
- [ ] Campo Email con `<Controller>`
- [ ] Campo Phone con `<Controller>`
- [ ] Campo Password con `<Controller>`
- [ ] Todos tienen `onBlur` y `onChange`
- [ ] Todos muestran errores si existen

**Submit Handler:**
- [ ] Función `onSubmit` es async
- [ ] Llama `authService.register(data)`
- [ ] Maneja loading state
- [ ] Maneja errores específicos (EMAIL_ALREADY_EXISTS)
- [ ] Muestra Alert en success
- [ ] Navega a Login en success

**UI Components:**
- [ ] Usa `SafeAreaView` como root
- [ ] Usa `KeyboardAvoidingView`
- [ ] Usa `ScrollView`
- [ ] Botón de submit usa `handleSubmit(onSubmit)`
- [ ] Password tiene toggle show/hide

### ✅ Checklist: tsconfig.json

Abre `apps/mobile/tsconfig.json` y verifica:

- [ ] Tiene `baseUrl: "."`
- [ ] Tiene `paths` configurado:
  ```json
  {
    "@/*": ["./src/app/*"],
    "@/core/*": ["./src/app/core/*"],
    "@/features/*": ["./src/app/features/*"],
    "@/shared/*": ["./src/app/shared/*"]
  }
  ```

---

## 📦 PARTE 3: Verificación de Dependencias

### ✅ Checklist: Dependencias Instaladas

Ejecuta este comando:
```bash
cd apps/mobile
npm list react-hook-form zod axios @tanstack/react-query zustand
```

Verifica que aparezcan:
- [ ] `react-hook-form@7.65.0` ✅
- [ ] `zod@3.25.76` ✅
- [ ] `axios@1.12.2` ✅
- [ ] `@tanstack/react-query@5.90.5` ✅
- [ ] `zustand@5.0.8` ✅

### ✅ Checklist: Dependencias Faltantes

Ejecuta este comando:
```bash
cd apps/mobile
npm list @hookform/resolvers @react-native-async-storage/async-storage
```

**Si NO aparecen, instálalas:**

```bash
# Instalar @hookform/resolvers
npm install @hookform/resolvers

# Instalar AsyncStorage
npx expo install @react-native-async-storage/async-storage
```

Después de instalar, verifica:
- [ ] `@hookform/resolvers` está instalado
- [ ] `@react-native-async-storage/async-storage` está instalado

---

## 🧪 PARTE 4: Compilación y Errores

### ✅ Checklist: TypeScript Compilation

Ejecuta:
```bash
cd apps/mobile
npx tsc --noEmit
```

**Verifica:**
- [ ] No hay errores de TypeScript
- [ ] Si hay errores, anótalos abajo

**Errores encontrados:**
```
[Anota aquí cualquier error que encuentres]




```

### ✅ Checklist: Metro Bundler

Ejecuta:
```bash
cd apps/mobile
npx expo start --clear
```

**Verifica:**
- [ ] Metro bundler inicia sin errores
- [ ] No hay errores de "Module not found"
- [ ] Aparece el QR code para escanear
- [ ] Si hay errores, anótalos abajo

**Errores encontrados:**
```
[Anota aquí cualquier error que encuentres]




```

---

## 📱 PARTE 5: Testing en Dispositivo/Emulador

### ✅ Checklist: Instalación en Dispositivo

**Opción A: Dispositivo Físico**
1. Instala Expo Go en tu teléfono
2. Escanea el QR code de Metro bundler
3. Espera a que cargue la app

**Opción B: Emulador**
- iOS: `npx expo start --ios`
- Android: `npx expo start --android`

**Verifica:**
- [ ] La app carga sin crash
- [ ] Puedes navegar a RegisterScreen
- [ ] La pantalla se ve correctamente

### ✅ Checklist: RegisterScreen - UI Visual

Con la app abierta en RegisterScreen, verifica:

- [ ] El header "Create Account" se ve
- [ ] Campo "Full Name" se ve
- [ ] Campo "Email" se ve
- [ ] Campo "Phone Number (Optional)" se ve
- [ ] Campo "Password" se ve
- [ ] Botón "Create Account" se ve
- [ ] Link "Sign In" se ve
- [ ] Texto de Terms & Privacy se ve en el footer

**Styling:**
- [ ] Colores se ven correctos (cream background, coral button)
- [ ] Bordes redondeados se ven
- [ ] Sombras se ven
- [ ] Padding/spacing se ve correcto

### ✅ Checklist: RegisterScreen - Interacción

**Test 1: Tap en campos**
- [ ] Puedes tap en campo Full Name
- [ ] Teclado aparece con capitalization activada
- [ ] Puedes tap en campo Email
- [ ] Teclado cambia a email keyboard
- [ ] Puedes tap en campo Phone
- [ ] Teclado cambia a phone pad
- [ ] Puedes tap en campo Password
- [ ] Password se muestra como bullets (••••)

**Test 2: Password Toggle**
- [ ] Escribe algo en password
- [ ] Tap en botón "Show"
- [ ] Password se muestra en texto plano
- [ ] Tap en botón "Hide"
- [ ] Password vuelve a bullets

**Test 3: Keyboard Behavior**
- [ ] Tap en Full Name (primer campo)
- [ ] Keyboard no tapa el campo
- [ ] Mueve al campo Email
- [ ] Keyboard no tapa el campo
- [ ] Mueve al campo Password (último)
- [ ] Keyboard no tapa el campo
- [ ] Screen hace scroll si es necesario

---

## ✅ PARTE 6: Validación de Formulario

### Test 1: Form Vacío

**Pasos:**
1. Abre RegisterScreen
2. NO llenes ningún campo
3. Tap fuera de Full Name (para trigger onBlur)
4. Tap fuera de Email
5. Tap fuera de Password

**Verifica:**
- [ ] Error en Full Name: "Full name is required"
- [ ] Error en Email: "Email is required"
- [ ] Error en Password: "Password is required"
- [ ] NO hay error en Phone (es opcional)
- [ ] Errores tienen texto rojo
- [ ] Campos con error tienen borde rojo

### Test 2: Email Inválido

**Pasos:**
1. Escribe "invalidemail" en campo Email
2. Tap fuera del campo

**Verifica:**
- [ ] Error: "Please enter a valid email address"
- [ ] Borde rojo en campo Email

**Prueba también:**
- [ ] "test@" → Error
- [ ] "@domain.com" → Error
- [ ] "user@example.com" → Sin error ✅

### Test 3: Nombre Muy Corto

**Pasos:**
1. Escribe "A" en Full Name
2. Tap fuera del campo

**Verifica:**
- [ ] Error: "Full name must be at least 2 characters"

### Test 4: Password Débil

**Prueba estos passwords y anota el resultado:**

| Password | Resultado Esperado | ✅/❌ |
|----------|-------------------|------|
| "abc" | "Password must be at least 8 characters" | |
| "password" | "Password must contain at least one uppercase letter" | |
| "PASSWORD" | "Password must contain at least one lowercase letter" | |
| "Password" | "Password must contain at least one number" | |
| "Pass123" | Sin error (válido) | |

### Test 5: Error Clearing

**Pasos:**
1. Deja Email vacío → Tap fuera → Ver error
2. Empieza a escribir en Email

**Verifica:**
- [ ] Error desaparece cuando empiezas a escribir
- [ ] Borde rojo desaparece

---

## ✅ PARTE 7: Submit del Formulario

### Test 1: Submit con Datos Válidos (Simulado)

**Pasos:**
1. Llena el form con datos válidos:
   - Full Name: "Juan Pérez"
   - Email: "juan.perez@example.com"
   - Phone: "+52 123 456 7890"
   - Password: "SecurePass123"
2. Tap en "Create Account"

**Verifica:**
- [ ] Botón muestra loading spinner
- [ ] Botón cambia a disabled
- [ ] Inputs se deshabilitan
- [ ] Después de ~1.5 segundos aparece Alert de success
- [ ] Alert dice: "Account created successfully! Please verify your email."
- [ ] Al dar OK en Alert, navega a LoginScreen

### Test 2: Submit con Datos Inválidos

**Pasos:**
1. Llena form con email inválido
2. Tap "Create Account"

**Verifica:**
- [ ] NO se ejecuta el submit
- [ ] Muestra errores de validación
- [ ] NO aparece el Alert

---

## 🔧 PARTE 8: Instalación de Dependencias Faltantes

Si encontraste errores de módulos faltantes, instálalos ahora:

### ✅ Instalar @hookform/resolvers

```bash
cd apps/mobile
npm install @hookform/resolvers
```

**Verifica después:**
```bash
npm list @hookform/resolvers
```

- [ ] Aparece instalado

### ✅ Instalar AsyncStorage

```bash
cd apps/mobile
npx expo install @react-native-async-storage/async-storage
```

**Verifica después:**
```bash
npm list @react-native-async-storage/async-storage
```

- [ ] Aparece instalado

### ✅ Restart Metro

Después de instalar dependencias:

```bash
# Detén el server (Ctrl+C)
# Inicia de nuevo con cache limpio
npx expo start --clear
```

- [ ] Metro inicia sin errores
- [ ] App funciona correctamente

---

## 📝 PARTE 9: Documentación de Issues

Si encontraste problemas, documéntalos aquí:

### Issues Encontrados

#### Issue #1
**Descripción:**
```
[Describe el problema]
```

**Archivo afectado:**
```
[Ruta del archivo]
```

**Error exacto:**
```
[Copia el mensaje de error]
```

**Cómo lo resolviste (si lo hiciste):**
```
[Pasos que seguiste]
```

---

#### Issue #2
**Descripción:**
```
[Describe el problema]
```

**Archivo afectado:**
```
[Ruta del archivo]
```

**Error exacto:**
```
[Copia el mensaje de error]
```

**Cómo lo resolviste (si lo hiciste):**
```
[Pasos que seguiste]
```

---

## ✅ PARTE 10: Checklist Final

Una vez completadas todas las verificaciones:

- [ ] Todos los archivos existen
- [ ] Contenido de archivos es correcto
- [ ] Dependencias instaladas
- [ ] TypeScript compila sin errores
- [ ] Metro bundler funciona
- [ ] App carga en dispositivo/emulador
- [ ] RegisterScreen se ve correctamente
- [ ] Form validation funciona
- [ ] Submit funciona (simulado)
- [ ] Documenté todos los issues encontrados

---

## 🎯 Resultado de la Verificación

**Status:** [✅ TODO CORRECTO / ⚠️ TIENE ISSUES / ❌ NO FUNCIONA]

**Tiempo total de verificación:** ___ minutos

**Issues críticos encontrados:** ___

**Issues menores encontrados:** ___

**¿Listo para integración con backend?** [SÍ / NO]

---

## 📋 Próximos Pasos

Después de completar esta verificación:

1. **Si TODO está ✅:**
   - Continuar con LoginScreen
   - Crear auth hooks (useRegister)
   - Crear auth store (Zustand)
   - Integrar con backend real

2. **Si hay ISSUES:**
   - Documentar cada issue encontrado
   - Priorizar issues críticos
   - Fix uno por uno
   - Re-verificar después de cada fix

3. **Cuando backend esté listo:**
   - Actualizar API_URL en app.json
   - Reemplazar simulación con authService real
   - Probar registro real con backend
   - Verificar que tokens se guarden

---

**Fecha de verificación:** _______________

**Verificado por:** _______________

**Firma:** _______________
