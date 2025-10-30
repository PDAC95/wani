# 🧪 Frontend Registration Feature Testing Checklist

Checklist completo para verificar que toda la implementación de la user story de registro funcione correctamente.

---

## 📋 Pre-requisitos

Antes de empezar, asegúrate de tener:

- [ ] Node.js instalado (v18 o superior)
- [ ] npm o pnpm instalado
- [ ] Editor de código (VS Code recomendado)
- [ ] Navegador con DevTools (Chrome/Firefox/Edge)

---

## 1️⃣ Verificación de Archivos

### ✅ Estructura de Carpetas Auth Feature

Verifica que existan estos archivos:

```bash
apps/web/src/app/features/auth/
```

- [ ] `types/auth.types.ts` - Tipos TypeScript
- [ ] `types/index.ts` - Exports de tipos
- [ ] `services/authService.ts` - Servicio de API
- [ ] `services/index.ts` - Exports de servicios
- [ ] `hooks/useAuth.ts` - Hook principal
- [ ] `hooks/useRegister.ts` - Hook de registro
- [ ] `hooks/useLogin.ts` - Hook de login
- [ ] `hooks/useLogout.ts` - Hook de logout
- [ ] `hooks/index.ts` - Exports de hooks
- [ ] `components/RegisterForm.tsx` - Componente de formulario
- [ ] `components/index.ts` - Exports de componentes

### ✅ Página Register

- [ ] `apps/web/src/pages/Register.tsx` existe
- [ ] Import de RegisterForm está presente

### ✅ Configuración

- [ ] `apps/web/vite.config.ts` tiene path alias `@` configurado
- [ ] `apps/web/tsconfig.app.json` tiene paths configurados

**Comando para verificar:**
```bash
# Desde apps/web/
ls src/app/features/auth/types/
ls src/app/features/auth/services/
ls src/app/features/auth/hooks/
ls src/app/features/auth/components/
ls src/pages/Register.tsx
```

---

## 2️⃣ Verificación de Dependencias

### ✅ Package.json

Verifica que estas dependencias estén instaladas:

**Dependencies:**
- [ ] `@tanstack/react-query` (v5+)
- [ ] `axios` (v1+)
- [ ] `react` (v19+)
- [ ] `react-dom` (v19+)
- [ ] `react-hook-form` (v7+)
- [ ] `react-router-dom` (v7+)
- [ ] `zod` (v4+)
- [ ] `zustand` (v5+)

**DevDependencies:**
- [ ] `@tanstack/react-query-devtools`
- [ ] `@types/node`
- [ ] `@types/react`
- [ ] `@types/react-dom`
- [ ] `typescript`
- [ ] `vite`

**Comando para verificar:**
```bash
cd apps/web
cat package.json
```

### ✅ Instalar Dependencias

Si alguna falta:

```bash
cd apps/web
npm install
# o
pnpm install
```

**Dependencia faltante: @hookform/resolvers**

Si ves un error de import, instala:
```bash
npm install @hookform/resolvers
```

---

## 3️⃣ Verificación de TypeScript

### ✅ Compilación TypeScript

Verifica que no haya errores de TypeScript:

```bash
cd apps/web
npm run build
```

**Espera ver:**
- [ ] ✓ Compilation successful
- [ ] Sin errores de tipo
- [ ] Build completo exitoso

### ✅ Errores Comunes

Si ves errores:

**Error: Cannot find module '@/...'**
- Verifica `vite.config.ts` tiene alias `@`
- Verifica `tsconfig.app.json` tiene paths
- Reinicia VS Code

**Error: Module not found 'zod' o 'react-hook-form'**
- Instala dependencias: `npm install`

**Error: Type errors en RegisterForm**
- Verifica que `@hookform/resolvers` esté instalado

---

## 4️⃣ Iniciar Servidor de Desarrollo

### ✅ Dev Server

```bash
cd apps/web
npm run dev
```

**Espera ver:**
- [ ] `VITE v7.x.x ready in Xms`
- [ ] `➜ Local: http://localhost:5173/`
- [ ] `➜ Network: use --host to expose`
- [ ] Sin errores en consola

### ✅ Errores Comunes

**Puerto 5173 en uso:**
```bash
# Vite usará automáticamente el siguiente puerto disponible
# o puedes especificar uno:
npm run dev -- --port 3000
```

**Error de importación circular:**
- Revisa que los `index.ts` no tengan imports circulares
- Reinicia el servidor

---

## 5️⃣ Navegación y Routing

### ✅ Acceder a la Página Register

Abre tu navegador y prueba:

1. **URL directa:**
   - [ ] `http://localhost:5173/register`
   - [ ] Debe redirigir a `/auth/register`

2. **URL completa:**
   - [ ] `http://localhost:5173/auth/register`
   - [ ] Debe cargar la página Register

### ✅ DevTools - Network Tab

1. Abre DevTools (F12)
2. Ve a la pestaña Network
3. Recarga la página
4. Verifica:
   - [ ] Status 200 para todos los recursos
   - [ ] No hay errores 404
   - [ ] Todos los JS/CSS cargan correctamente

### ✅ DevTools - Console Tab

1. Abre Console en DevTools
2. Verifica:
   - [ ] Sin errores rojos
   - [ ] Sin warnings de React
   - [ ] Sin warnings de TypeScript

**Errores comunes:**

**"Failed to fetch dynamically imported module"**
- Refresca la página (Ctrl/Cmd + Shift + R)
- Limpia cache del navegador

---

## 6️⃣ Verificación Visual del RegisterForm

### ✅ Componentes UI

El formulario debe mostrar:

- [ ] **Título**: "Create your account"
- [ ] **Subtítulo**: "Sign up to get started with Wani"
- [ ] **Campo Full Name** con label y placeholder
- [ ] **Campo Email** con label y placeholder
- [ ] **Campo Password** con label y toggle show/hide
- [ ] **Campo Phone** con label "(optional)"
- [ ] **Botón Submit**: "Create Account" (azul)
- [ ] **Link**: "Already have an account? Sign in"

### ✅ Responsive Design

Prueba en diferentes tamaños:

**Desktop (>1024px):**
- [ ] Form centrado
- [ ] Max-width 448px
- [ ] Shadow visible
- [ ] Padding correcto

**Tablet (640-1024px):**
- [ ] Form centrado
- [ ] Responsive spacing
- [ ] Botones full-width

**Mobile (<640px):**
- [ ] Form full-width
- [ ] Stack vertical
- [ ] Touch-friendly
- [ ] Botones grandes

**Comando para simular:**
- Chrome DevTools > Toggle Device Toolbar (Ctrl+Shift+M)
- Prueba iPhone, iPad, Desktop

---

## 7️⃣ Validación de Formulario (Zod)

### ✅ Validación Full Name

**Test 1: Campo vacío**
1. [ ] Dejar campo vacío
2. [ ] Blur (click fuera)
3. [ ] Espera error: "Name must be at least 2 characters"

**Test 2: Nombre muy corto**
1. [ ] Escribe "A"
2. [ ] Blur
3. [ ] Espera error: "Name must be at least 2 characters"

**Test 3: Caracteres inválidos**
1. [ ] Escribe "John123"
2. [ ] Blur
3. [ ] Espera error: "Name must contain only letters and spaces"

**Test 4: Nombre válido**
1. [ ] Escribe "John Doe"
2. [ ] No debe haber error ✅

### ✅ Validación Email

**Test 1: Campo vacío**
1. [ ] Dejar campo vacío
2. [ ] Blur
3. [ ] Espera error: "Email is required"

**Test 2: Email inválido**
1. [ ] Escribe "notanemail"
2. [ ] Blur
3. [ ] Espera error: "Please enter a valid email address"

**Test 3: Email válido**
1. [ ] Escribe "user@example.com"
2. [ ] No debe haber error ✅

### ✅ Validación Password

**Test 1: Campo vacío**
1. [ ] Dejar campo vacío
2. [ ] Blur
3. [ ] Espera error: "Password must be at least 8 characters"

**Test 2: Password muy corta**
1. [ ] Escribe "Pass1"
2. [ ] Blur
3. [ ] Espera error: "Password must be at least 8 characters"

**Test 3: Sin mayúscula**
1. [ ] Escribe "password123"
2. [ ] Blur
3. [ ] Espera error: "Password must contain at least one uppercase..."

**Test 4: Sin minúscula**
1. [ ] Escribe "PASSWORD123"
2. [ ] Blur
3. [ ] Espera error similar

**Test 5: Sin número**
1. [ ] Escribe "Password"
2. [ ] Blur
3. [ ] Espera error similar

**Test 6: Password válido**
1. [ ] Escribe "Password123"
2. [ ] No debe haber error ✅

**Test 7: Toggle show/hide**
1. [ ] Escribe password
2. [ ] Click en ícono de ojo
3. [ ] Password debe mostrarse en texto plano
4. [ ] Click de nuevo
5. [ ] Password debe ocultarse ✅

### ✅ Validación Phone (Opcional)

**Test 1: Campo vacío**
1. [ ] Dejar campo vacío
2. [ ] Debe ser válido (es opcional) ✅

**Test 2: Formato inválido**
1. [ ] Escribe "abc123"
2. [ ] Blur
3. [ ] Espera error: "Please enter a valid phone number"

**Test 3: Muy largo**
1. [ ] Escribe número de 25+ caracteres
2. [ ] Blur
3. [ ] Espera error: "Phone number must not exceed 20 characters"

**Test 4: Formato válido**
1. [ ] Escribe "+1234567890"
2. [ ] No debe haber error ✅

---

## 8️⃣ Estados del Formulario

### ✅ Estado Loading

Como aún no tienes backend, vamos a simular:

**Test de UI Loading:**
1. [ ] Llena el formulario con datos válidos
2. [ ] Click en "Create Account"
3. [ ] Debería intentar hacer submit
4. [ ] Verifica en DevTools > Network que intenta POST

**Comportamiento esperado SI tuvieras backend:**
- Botón cambia a "Creating account..." con spinner
- Inputs se deshabilitan
- No se puede clickear dos veces

### ✅ Estado Error (Sin Backend)

Ahora mismo verás un error porque no hay backend:

1. [ ] Llena formulario válido
2. [ ] Click Submit
3. [ ] Espera ver error en banner rojo
4. [ ] Mensaje algo como: "Network Error" o "Failed to fetch"

**Esto es ESPERADO** ✅ - El frontend está funcionando correctamente, solo falta el backend.

### ✅ DevTools Console Logs

Cuando hagas submit, deberías ver:
- [ ] `Registration error: [Error details]` en console
- [ ] Error en Network tab mostrando failed request a `/api/v1/auth/register`

---

## 9️⃣ Integración con Hooks y Store

### ✅ React Query DevTools

Si está instalado:
1. [ ] Abre la app
2. [ ] Deberías ver React Query DevTools en la esquina
3. [ ] Intenta hacer submit
4. [ ] Verifica en DevTools que aparece mutation `['auth', 'register']`

### ✅ Zustand Store

Abre Redux DevTools o añade temporalmente:
```typescript
// En Register.tsx
import { useAuthStore } from '@/app/core/store/authStore'

// Dentro del componente
const authState = useAuthStore()
console.log('Auth state:', authState)
```

Verifica:
- [ ] Store está inicializado
- [ ] `user: null`
- [ ] `isAuthenticated: false`

---

## 🔟 Verificación de Imports y Exports

### ✅ Exports Funcionan

Prueba en Console del navegador o crea un test file:

```typescript
// Test imports
import { useAuth, useRegister, useLogin } from '@/app/features/auth/hooks'
import { authService } from '@/app/features/auth/services'
import { RegisterForm } from '@/app/features/auth/components'
import type { RegisterRequest, User } from '@/app/features/auth/types'

// Si no hay errores, los exports funcionan ✅
```

---

## 1️⃣1️⃣ Checklist de Documentación

Verifica que existe documentación:

- [ ] `apps/web/src/app/features/auth/types/README.md`
- [ ] `apps/web/src/app/features/auth/services/README.md`
- [ ] `apps/web/src/app/features/auth/hooks/README.md`
- [ ] `apps/web/src/app/features/auth/components/README.md`
- [ ] `apps/web/src/pages/README.md`

---

## 🐛 Troubleshooting

### Error: "@hookform/resolvers not found"

```bash
npm install @hookform/resolvers
```

### Error: Path alias '@/' no funciona

1. Verifica `vite.config.ts`:
```typescript
resolve: {
  alias: {
    '@': path.resolve(__dirname, './src'),
  },
}
```

2. Verifica `tsconfig.app.json`:
```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

3. Reinicia VS Code y dev server

### Error: "Cannot read property 'mutate' of undefined"

- Verifica que `QueryClientProvider` está en App
- Verifica que `useRegister` está dentro de un componente React

### Form no valida

- Verifica que `zodResolver` está importado
- Verifica que schema está pasado al `useForm`

---

## ✅ Checklist Final

### Frontend Completo (Sin Backend)

- [ ] ✅ Todos los archivos existen
- [ ] ✅ TypeScript compila sin errores
- [ ] ✅ Dev server inicia correctamente
- [ ] ✅ Navegación a /register funciona
- [ ] ✅ RegisterForm se renderiza
- [ ] ✅ Validación Zod funciona en todos los campos
- [ ] ✅ Estados loading/error se manejan
- [ ] ✅ Responsive design funciona
- [ ] ✅ Documentación existe
- [ ] ✅ No hay errores en console (excepto backend API)

### ⚠️ Requiere Backend

Para completar el flujo completo, necesitas:

- [ ] ⏳ Backend implementar `POST /api/v1/auth/register`
- [ ] ⏳ Backend devolver estructura correcta de respuesta
- [ ] ⏳ Backend manejar errores (409, 400, 500)
- [ ] ⏳ Backend configurar CORS

---

## 📝 Reporte de Resultados

Anota aquí los resultados de cada sección:

### ✅ Exitoso
```
Sección X: [Descripción]
```

### ⚠️ Warnings (no críticos)
```
Sección Y: [Descripción]
```

### ❌ Errores (necesitan fix)
```
Sección Z: [Descripción del error]
```

---

## 📞 Próximos Pasos

Después de completar este checklist:

1. **Si todo funciona ✅**
   - Implementar backend endpoint `/auth/register`
   - Probar flujo completo end-to-end
   - Implementar LoginForm (similar pattern)

2. **Si hay errores ❌**
   - Documentar errores encontrados
   - Priorizar por severidad
   - Fix uno por uno
   - Re-test después de cada fix

3. **Mejoras opcionales 🎁**
   - Add toast notifications
   - Add analytics tracking
   - Add email verification flow
   - Add social login buttons

---

## 🎯 Meta: Frontend Ready for Backend Integration

Al completar este checklist, el frontend estará 100% listo para integrarse con el backend cuando esté implementado.
