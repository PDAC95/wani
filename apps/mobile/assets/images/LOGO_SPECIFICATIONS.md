# Logo Specifications - Wani Mobile App

## 📂 Ubicación del Logo

Coloca el logo en la siguiente carpeta:
```
apps/mobile/assets/images/
```

### Estructura Recomendada:
```
apps/mobile/assets/images/
├── logo.png                    # Logo principal (tamaño @3x)
├── logo@2x.png                 # Logo para densidad @2x (opcional)
├── logo@1x.png                 # Logo para densidad @1x (opcional)
├── logo-white.png              # Logo en blanco para fondos oscuros
└── logo-icon.png               # Solo el ícono sin texto
```

## 📐 Especificaciones Técnicas

### Logo Principal (Para Pantallas Auth)

#### Opción 1: Single Scale (Recomendado para comenzar)
- **Archivo:** `logo.png`
- **Tamaño:** **400x400 px** (máximo)
- **Formato:** PNG con transparencia
- **Resolución:** @3x (para dispositivos de alta densidad)
- **Peso:** < 200 KB

#### Opción 2: Multi-Scale (Para optimización)
Si quieres optimizar para diferentes densidades de pantalla:

| Densidad | Archivo | Tamaño Recomendado |
|----------|---------|-------------------|
| @1x (mdpi) | `logo@1x.png` | 100x100 px |
| @2x (xhdpi) | `logo@2x.png` | 200x200 px |
| @3x (xxhdpi) | `logo@3x.png` | 300x300 px |

### Logo para Diferentes Contextos

#### 1. Logo Header (Navegación)
- **Tamaño:** 120x40 px (ancho x alto)
- **Formato:** PNG horizontal
- **Archivo:** `logo-horizontal.png`

#### 2. Logo Icon (Solo símbolo)
- **Tamaño:** 120x120 px
- **Formato:** PNG cuadrado
- **Archivo:** `logo-icon.png`

#### 3. Logo White (Para fondos oscuros)
- **Tamaño:** 400x400 px
- **Formato:** PNG con transparencia
- **Archivo:** `logo-white.png`

## 🎨 Guía de Diseño

### Colores Brand (Wani)
Según el proyecto, los colores son:
- **Cream:** `#FFF7ED` (fondo principal)
- **Teal:** `#14B8A6` (acento principal)
- **Slate:** `#1E293B` (texto oscuro)

### Recomendaciones de Diseño
1. **Padding:** Deja un 10% de espacio en blanco alrededor del logo
2. **Formato:** PNG con transparencia (alpha channel)
3. **Background:** Transparente o usa el color cream del proyecto
4. **Estilo:** Flat design, sin sombras complejas
5. **Texto:** Si incluye texto, usa una fuente legible a tamaños pequeños

## 📱 Tamaños de Visualización en la App

### RegisterScreen / LoginScreen
- **Display size:** 150x150 pt (puntos lógicos)
- **Posición:** Centrado, arriba del formulario
- **Margin bottom:** 32-48 pt

### Splash Screen (ya configurado)
- Ya existe `splash-icon.png` en `assets/`
- Tamaño actual: adaptativo

## 🔧 Uso en el Código

### Importar el Logo en React Native

```typescript
// En RegisterScreen.tsx o LoginScreen.tsx
import { Image } from 'react-native'

// Opción 1: require (recomendado)
<Image
  source={require('@/../../assets/images/logo.png')}
  className="w-40 h-40"
  resizeMode="contain"
/>

// Opción 2: con path alias (si se configura)
<Image
  source={require('@assets/images/logo.png')}
  className="w-40 h-40"
  resizeMode="contain"
/>
```

### Con NativeWind (Tailwind)

```tsx
<View className="items-center mb-8">
  <Image
    source={require('@/../../assets/images/logo.png')}
    className="w-36 h-36"        // 144x144 px en pantalla
    resizeMode="contain"
  />
  <Text className="text-2xl font-bold text-teal-600 mt-4">
    Wani
  </Text>
  <Text className="text-slate-600 text-sm">
    Cross-Border Payments
  </Text>
</View>
```

## ✅ Checklist de Implementación

Después de agregar el logo:

- [ ] Colocar `logo.png` en `apps/mobile/assets/images/`
- [ ] Verificar tamaño (400x400 px máximo)
- [ ] Verificar formato (PNG con transparencia)
- [ ] Verificar peso (< 200 KB)
- [ ] Probar en iOS simulator
- [ ] Probar en Android emulator
- [ ] Verificar que se vea bien en diferentes tamaños de pantalla
- [ ] Ajustar padding/margin según necesidad

## 📝 Notas Adicionales

### Para SVG (Opcional)
Si prefieres usar SVG para mejor escalabilidad:
1. Instalar: `npm install react-native-svg`
2. Exportar SVG como componente React
3. Usar `SvgXml` o componente SVG directo

### Optimización de Imágenes
Antes de agregar el logo, optimízalo con:
- **TinyPNG:** https://tinypng.com/
- **ImageOptim:** https://imageoptim.com/
- **Squoosh:** https://squoosh.app/

### Actualización Dinámica
Para cambiar entre logo claro/oscuro según el theme:
```typescript
const logo = colorScheme === 'dark'
  ? require('@/../../assets/images/logo-white.png')
  : require('@/../../assets/images/logo.png')
```

---

**Creado:** 2025-10-22
**Proyecto:** Wani Mobile App
**Para:** Pantallas de Auth (Register/Login)
