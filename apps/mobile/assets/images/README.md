# Images Assets - Wani Mobile

Esta carpeta contiene todos los assets de imágenes para la aplicación móvil.

## 📁 Estructura

```
images/
├── logo.png                    # Logo principal de Wani
├── logo-white.png              # Logo en blanco (para dark mode)
├── logo-horizontal.png         # Logo horizontal (para headers)
├── logo-icon.png               # Solo el ícono
└── LOGO_SPECIFICATIONS.md      # Especificaciones detalladas
```

## 🎯 Uso Rápido

### En cualquier componente React Native:

```typescript
import { Image } from 'react-native'

// Logo para auth screens
<Image
  source={require('./logo.png')}
  style={{ width: 150, height: 150 }}
  resizeMode="contain"
/>
```

## 📋 Archivos Necesarios

### Inmediato (Para Auth Screens):
- ✅ `logo.png` - 400x400 px, PNG transparente

### Opcional (Para futuro):
- `logo-white.png` - Para dark mode
- `logo-horizontal.png` - Para navegación
- `logo-icon.png` - Para notificaciones

## 📖 Documentación Completa

Ver [LOGO_SPECIFICATIONS.md](./LOGO_SPECIFICATIONS.md) para detalles completos.
