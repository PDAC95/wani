# ⚡ Quick Test Commands

Comandos rápidos para verificar la implementación del frontend.

## 1. Verificar Estructura de Archivos

```bash
# Ir a la carpeta web
cd apps/web

# Verificar que existen todos los archivos
ls -la src/app/features/auth/types/auth.types.ts
ls -la src/app/features/auth/services/authService.ts
ls -la src/app/features/auth/hooks/useRegister.ts
ls -la src/app/features/auth/components/RegisterForm.tsx
ls -la src/pages/Register.tsx
```

## 2. Verificar Dependencias

```bash
# Ver package.json
cat package.json | grep -E "(react-hook-form|zod|@tanstack/react-query|zustand|react-router-dom)"

# Instalar dependencias si faltan
npm install

# Verificar que @hookform/resolvers esté instalado
npm list @hookform/resolvers

# Si no está, instalarlo:
npm install @hookform/resolvers
```

## 3. Build TypeScript

```bash
# Compilar TypeScript
npm run build

# Si hay errores, correr:
npm run lint

# Ver errores específicos de TypeScript
npx tsc --noEmit
```

## 4. Iniciar Dev Server

```bash
# Iniciar servidor de desarrollo
npm run dev

# Debe mostrar:
# VITE v7.x.x ready in Xms
# ➜ Local: http://localhost:5173/
```

## 5. Verificar en Navegador

Abre tu navegador en:
```
http://localhost:5173/register
```

Debe redirigir a:
```
http://localhost:5173/auth/register
```

## 6. Test de Validación (Manual)

### Full Name
```
❌ Vacío          → Error
❌ "A"            → Error (muy corto)
❌ "John123"      → Error (números)
✅ "John Doe"     → OK
```

### Email
```
❌ Vacío          → Error
❌ "notanemail"   → Error (formato)
✅ "user@test.com" → OK
```

### Password
```
❌ Vacío          → Error
❌ "pass"         → Error (muy corta)
❌ "password"     → Error (sin mayúscula)
❌ "PASSWORD"     → Error (sin minúscula)
❌ "Password"     → Error (sin número)
✅ "Password123"  → OK
```

### Phone (opcional)
```
✅ Vacío          → OK (opcional)
❌ "abc123"       → Error (inválido)
✅ "+1234567890"  → OK
```

## 7. Test de Submit

**Estado Esperado (SIN backend):**
```
1. Llenar form con datos válidos
2. Click "Create Account"
3. Ver error en banner rojo ✅ (esperado)
4. Ver en DevTools > Network: POST failed
5. Ver en Console: "Registration error: ..."
```

**Esto es NORMAL ✅** - El frontend funciona, solo falta backend.

## 8. DevTools Checks

### Console (F12 > Console)
```bash
# Debe estar vacío de errores
# Solo warnings de "Failed to fetch" son OK (backend falta)
```

### Network (F12 > Network)
```bash
# Al hacer submit debe intentar:
# POST http://localhost:8000/api/v1/auth/register
# Status: ERR_CONNECTION_REFUSED o similar
```

### React Query DevTools
```bash
# Si instalado, verifica:
# Mutation: ['auth', 'register'] aparece
```

## 9. Verificar Configuración

### vite.config.ts
```bash
cat vite.config.ts | grep -A 5 "resolve:"

# Debe mostrar:
# resolve: {
#   alias: {
#     '@': path.resolve(__dirname, './src'),
#   },
# }
```

### tsconfig.app.json
```bash
cat tsconfig.app.json | grep -A 5 "paths"

# Debe mostrar:
# "paths": {
#   "@/*": ["./src/*"]
# }
```

## 10. Test de Responsive

```bash
# En Chrome/Edge/Firefox:
1. F12 (DevTools)
2. Ctrl+Shift+M (Toggle Device Toolbar)
3. Probar:
   - iPhone SE (375px)
   - iPad (768px)
   - Desktop (1920px)
```

## ✅ Resultados Esperados

### Con TODO funcionando:
- [x] Dev server inicia sin errores
- [x] Navegación a /register funciona
- [x] Form se renderiza correctamente
- [x] Validaciones funcionan en todos los campos
- [x] Submit intenta POST a backend (falla sin backend)
- [x] Error se muestra en UI
- [x] No hay errores de TypeScript
- [x] Responsive funciona

### ⚠️ Error esperado (SIN backend):
```
Network Error: Failed to connect to backend
```

Esto es **NORMAL** ✅. El frontend está listo.

## 🔥 Quick Fix Commands

### Error: Module not found
```bash
npm install
```

### Error: Path alias no funciona
```bash
# 1. Verificar vite.config.ts y tsconfig.app.json
# 2. Reiniciar VS Code
# 3. Reiniciar dev server
npm run dev
```

### Error: TypeScript errors
```bash
npx tsc --noEmit
npm run build
```

### Puerto en uso
```bash
npm run dev -- --port 3000
```

## 📝 Quick Status Check

Copia y pega estos comandos para un check rápido:

```bash
# Frontend Health Check
cd apps/web

echo "1. Checking files..."
ls src/app/features/auth/types/auth.types.ts > /dev/null 2>&1 && echo "✅ Types" || echo "❌ Types"
ls src/app/features/auth/services/authService.ts > /dev/null 2>&1 && echo "✅ Services" || echo "❌ Services"
ls src/app/features/auth/hooks/useRegister.ts > /dev/null 2>&1 && echo "✅ Hooks" || echo "❌ Hooks"
ls src/app/features/auth/components/RegisterForm.tsx > /dev/null 2>&1 && echo "✅ Components" || echo "❌ Components"
ls src/pages/Register.tsx > /dev/null 2>&1 && echo "✅ Page" || echo "❌ Page"

echo -e "\n2. Checking dependencies..."
npm list react-hook-form > /dev/null 2>&1 && echo "✅ react-hook-form" || echo "❌ react-hook-form"
npm list zod > /dev/null 2>&1 && echo "✅ zod" || echo "❌ zod"
npm list @tanstack/react-query > /dev/null 2>&1 && echo "✅ react-query" || echo "❌ react-query"
npm list @hookform/resolvers > /dev/null 2>&1 && echo "✅ hookform/resolvers" || echo "❌ hookform/resolvers (install needed)"

echo -e "\n3. TypeScript check..."
npx tsc --noEmit && echo "✅ TypeScript OK" || echo "❌ TypeScript errors"

echo -e "\n✅ Frontend check complete!"
```

## 🎯 Next Steps

Después de verificar todo:

1. **Si todo OK:**
   - Implementar backend `/auth/register` endpoint
   - Probar flujo end-to-end

2. **Si hay errores:**
   - Ver [TESTING_CHECKLIST.md](./TESTING_CHECKLIST.md) para troubleshooting detallado
   - Fix errores uno por uno
   - Re-test

## 📊 Backend Requirements

Para que el frontend funcione 100%, el backend necesita:

```python
# POST /api/v1/auth/register

# Request:
{
  "email": "user@example.com",
  "password": "Password123",
  "full_name": "John Doe",
  "phone": "+1234567890"  # optional
}

# Response Success (201):
{
  "success": true,
  "data": {
    "user": {
      "id": "uuid-here",
      "email": "user@example.com",
      "full_name": "John Doe",
      "phone": "+1234567890",
      "created_at": "2024-01-15T10:00:00Z"
    },
    "tokens": {
      "access_token": "jwt-token-here",
      "refresh_token": "refresh-token-here",
      "token_type": "Bearer",
      "expires_in": 3600
    }
  }
}

# Response Error (409 - Email exists):
{
  "success": false,
  "error": {
    "code": "EMAIL_ALREADY_EXISTS",
    "message": "An account with this email already exists"
  }
}

# Response Error (400 - Validation):
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid input data",
    "details": { ... }
  }
}
```
