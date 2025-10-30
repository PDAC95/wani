# 🚀 Quick Start - Wani Mobile App

## ✅ Instalación Completada

La app mobile ha sido implementada con éxito con un diseño moderno basado en las imágenes de referencia.

---

## 📱 Cómo Ejecutar

### Opción 1: Metro Bundler (Recomendado para iOS/Android)

```bash
cd apps/mobile
npm start
```

Luego:
- Presiona `i` para iOS Simulator
- Presiona `a` para Android Emulator
- Escanea el QR con Expo Go app en tu teléfono

### Opción 2: Directamente en Plataforma

```bash
# iOS
npm run ios

# Android
npm run android

# Web (navegador)
npm run web
```

---

## 🔧 Solución de Problemas

### Error: "Unable to resolve react-native-web"

**Solución:**
```bash
cd apps/mobile
npm install react-native-web@~0.19.13 --legacy-peer-deps
npm install react-dom@18.3.1 --legacy-peer-deps
```

### Puerto 8081 ocupado

**Solución:**
```bash
npx expo start --port 8082
```

O matar el proceso:
```bash
# Windows
netstat -ano | findstr :8081
taskkill /PID <PID> /F

# macOS/Linux
lsof -ti:8081 | xargs kill -9
```

### Limpiar Caché

Si tienes problemas de compilación:
```bash
npx expo start --clear
```

O limpiar completamente:
```bash
rm -rf node_modules
npm install
npx expo start --clear
```

---

## ⚠️ Advertencias de Versiones

El proyecto actualmente tiene estas advertencias (no críticas):

```
expo@54.0.16 - expected version: 54.0.19
react-dom@18.3.1 - expected version: 19.1.0
react-native@0.81.4 - expected version: 0.81.5
react-native-web@0.19.13 - expected version: ^0.21.0
```

**¿Actualizar?**

Puedes actualizar, pero puede causar conflictos:
```bash
# Actualizar Expo (recomendado)
npx expo install expo@latest

# Actualizar React Native
npx expo install react-native@latest

# CUIDADO: react-dom@19 puede romper react-native-web
# Solo actualiza si Expo lo requiere
```

---

## 📂 Estructura del Proyecto

```
apps/mobile/
├── src/app/
│   ├── features/wallet/        ← Componentes de wallet
│   ├── navigation/              ← Tab + Root Navigator
│   ├── screens/                 ← 4 pantallas principales
│   └── shared/                  ← UI components reutilizables
│
├── assets/images/               ← Logos de Wani
├── tailwind.config.js           ← Colores del diseño
└── package.json
```

---

## 🎨 Pantallas Disponibles

1. **🏠 Home** - Balance + transacciones recientes
2. **📝 Transactions** - Lista completa con filtros
3. **↗️ Send** - Pantalla de pago con numpad
4. **👤 Profile** - Perfil con stats

Navega entre ellas con el **tab bar** en la parte inferior.

---

## 🔄 Estado Actual

- ✅ **Diseño implementado** - 100%
- ✅ **Navegación funcional** - 100%
- ✅ **Componentes UI** - Completo
- ✅ **Mock data** - Incluida para demo
- ⏳ **Backend integration** - Pendiente
- ⏳ **Auth real** - Pendiente (actualmente muestra app directamente)

---

## 📱 Testing en Dispositivo Real

### iOS (con Mac):

1. Instala Expo Go desde App Store
2. Ejecuta `npm start`
3. Escanea el QR con la cámara del iPhone
4. Se abrirá en Expo Go

### Android:

1. Instala Expo Go desde Play Store
2. Ejecuta `npm start`
3. Escanea el QR desde la app Expo Go
4. Se abrirá la app

---

## 🐛 Errores Comunes

### "Metro bundler error"
```bash
npx expo start --clear
```

### "Unable to resolve module"
```bash
npm install
npx expo start --clear
```

### "React Native version mismatch"
```bash
npx expo install --check
npx expo install --fix
```

---

## 📖 Documentación Completa

Ver [MOBILE_DESIGN_IMPLEMENTATION.md](./MOBILE_DESIGN_IMPLEMENTATION.md) para:
- Guía completa de componentes
- Sistema de diseño
- Layouts detallados
- Próximos pasos

---

## 🎯 Próximos Pasos

1. **Integrar Backend:**
   - Conectar con FastAPI
   - Implementar TanStack Query hooks
   - Zustand para auth state

2. **Auth Real:**
   - Login/Register screens
   - JWT token management
   - Refresh token flow

3. **Features:**
   - Notificaciones push
   - Biometría
   - QR scanner
   - Camera para transferencias

---

## 🆘 Ayuda

Si tienes problemas:

1. Revisa esta guía completa
2. Limpia caché: `npx expo start --clear`
3. Reinstala: `rm -rf node_modules && npm install`
4. Revisa logs en la terminal

---

**✨ La app está lista para usar!**

Ejecuta `npm start` y empieza a explorar el diseño moderno que se implementó.
