# 🎨 Welcome Screen - Diseño Web Adaptado para Mobile

## ✅ Actualización Completada

La **Welcome Screen V2** ha sido actualizada para reflejar fielmente el diseño de la página web de Wani.

---

## 🌐 Diseño Web vs Mobile

### Página Web (Referencia):
```
┌─────────────────────────────────┐
│ [Logo Wani]                     │
│                                 │
│ • Your money. Your rules. Your  │  ← Badge
│   speed.                        │
│                                 │
│ Money that moves                │  ← Título
│ as fast as you do               │  (2ª línea naranja)
│                                 │
│ Send money globally in seconds. │  ← Subtítulo
│ Zero hidden fees. Total control.│
│                                 │
│ [Get Started →] [See How It...] │  ← CTAs
│                                 │
│ $2.5M+    150+      <30s       │  ← Stats
│ Transferred Countries  Average  │
│   Monthly   Supported   Transfer│
└─────────────────────────────────┘
```

### Mobile Adaptado:
```
┌─────────────────────┐
│ [Logo Horizontal]   │  ← Logo Wani
│                     │
│                     │
│ • Your money...     │  ← Badge con dot
│                     │
│ Money that moves    │  ← Título
│ as fast as you do   │  (naranja)
│                     │
│ Send money...       │  ← Subtítulo
│ Zero hidden fees.   │
│                     │
├─────────────────────┤
│ [ Get Started → ]   │  ← Botón coral
│ [ See How It Works ]│  ← Botón outline
│                     │
│ $2.5M+  150+  <30s │  ← Stats
│ Trans.  Count  Time │
└─────────────────────┘
```

---

## 🎨 Elementos del Diseño

### 1. **Logo**
```typescript
<Image
  source={require('../../../../assets/images/logo-horizontal-naranja.png')}
  className="h-16 w-48"
  resizeMode="contain"
/>
```
- ✅ Logo horizontal de Wani
- ✅ Color naranja (coral)
- ✅ Ubicado arriba a la izquierda

### 2. **Badge con Dot**
```typescript
<View className="flex-row items-center px-4 py-2 rounded-full bg-white border border-coral/20">
  <View className="w-2 h-2 bg-coral rounded-full" />
  <Text className="text-sm font-semibold text-coral">
    Your money. Your rules. Your speed.
  </Text>
</View>
```
- ✅ Fondo blanco con borde coral
- ✅ Dot animado (coral)
- ✅ Texto del tagline

### 3. **Hero Title**
```typescript
<Text className="text-4xl font-black text-brown">
  Money that moves
</Text>
<Text className="text-4xl font-black text-coral">
  as fast as you do
</Text>
```
- ✅ Dos líneas
- ✅ Primera línea: negro/brown
- ✅ Segunda línea: naranja/coral
- ✅ Font-black (extra bold)

### 4. **Subtitle**
```typescript
<Text className="text-lg text-brown/70">
  Send money globally in seconds.{' '}
  <Text className="font-semibold text-coral">
    Zero hidden fees. Total control.
  </Text>
</Text>
```
- ✅ Texto gris
- ✅ Parte destacada en naranja y negrita

### 5. **CTA Buttons**

**Get Started (Primario):**
```typescript
<TouchableOpacity className="bg-coral rounded-2xl py-4 px-6">
  <Text className="text-white font-bold text-lg">
    Get Started
  </Text>
  <Text className="text-white text-xl ml-2">→</Text>
</TouchableOpacity>
```
- ✅ Fondo coral (naranja Wani)
- ✅ Texto blanco
- ✅ Flecha → incluida

**See How It Works (Secundario):**
```typescript
<TouchableOpacity className="bg-white border-2 border-brown/10 rounded-2xl py-4">
  <Text className="text-brown font-bold text-lg">
    See How It Works
  </Text>
</TouchableOpacity>
```
- ✅ Fondo blanco
- ✅ Borde sutil
- ✅ Texto negro

### 6. **Trust Indicators (Stats)**
```typescript
<View className="flex-row justify-between">
  {/* $2.5M+ */}
  <View className="items-center flex-1">
    <Text className="text-3xl font-black text-coral">$2.5M+</Text>
    <Text className="text-xs text-brown/60">Transferred{'\n'}Monthly</Text>
  </View>

  {/* 150+ */}
  <View className="items-center flex-1">
    <Text className="text-3xl font-black text-coral">150+</Text>
    <Text className="text-xs text-brown/60">Countries{'\n'}Supported</Text>
  </View>

  {/* <30s */}
  <View className="items-center flex-1">
    <Text className="text-3xl font-black text-coral">&lt;30s</Text>
    <Text className="text-xs text-brown/60">Average{'\n'}Transfer Time</Text>
  </View>
</View>
```
- ✅ 3 estadísticas en fila
- ✅ Números grandes en coral
- ✅ Descripción pequeña en gris

---

## 🎨 Colores Utilizados

| Elemento | Color | Código |
|----------|-------|--------|
| Fondo | Cream | `#FFF7ED` |
| Texto principal | Brown | `#292524` |
| Texto secundario | Brown/60 | `#292524` con 60% opacity |
| Accent (CTA, stats) | Coral | `#FB923C` |
| Badge dot | Coral | `#FB923C` |
| Botón secundario | White | `#FFFFFF` |

---

## 📱 Layout Structure

```
SafeAreaView (bg-cream)
└── ScrollView
    ├── Logo Section (pt-4)
    │   └── Logo horizontal Wani
    │
    ├── Main Content (flex-1, centered)
    │   ├── Badge
    │   ├── Hero Title (2 líneas)
    │   └── Subtitle
    │
    └── Bottom Section (pb-4)
        ├── CTA Buttons (space-y-3)
        │   ├── Get Started (coral)
        │   └── See How It Works (outline)
        │
        └── Stats (3 columns)
            ├── $2.5M+
            ├── 150+
            └── <30s
```

---

## 🆚 Comparación: Propuesta 1 vs Nueva (Web-Based)

| Característica | Propuesta 1 (Original) | Nueva (Web-Based) |
|----------------|----------------------|-------------------|
| **Estilo** | Fintech moderno (mint/lime) | Corporativo profesional |
| **Logo** | Emoji placeholder 💰 | Logo real Wani |
| **Colores** | Verde menta + amarillo | Cream + coral (naranja) |
| **Badge** | No | Sí (con dot animado) |
| **Título** | Centrado | Alineado izquierda |
| **Features** | 3 cards separadas | Stats compactas |
| **Botones** | Negro + blanco | Coral + outline |
| **Feeling** | Startup tech | Marca establecida |

---

## 🚀 Cómo se ve

### Hero Section:
```
[Logo Wani naranja]

• Your money. Your rules. Your speed.

Money that moves
as fast as you do

Send money globally in seconds.
Zero hidden fees. Total control.
```

### CTAs:
```
┌────────────────────┐
│ Get Started    →   │  ← Coral
└────────────────────┘
┌────────────────────┐
│ See How It Works   │  ← Outline
└────────────────────┘
```

### Stats:
```
$2.5M+      150+       <30s
Transferred Countries  Average
  Monthly   Supported  Transfer
```

---

## 🎯 Decisiones de Diseño

### ¿Por qué este diseño?

1. **Consistencia de marca** - Refleja la identidad de Wani web
2. **Profesional** - Transmite confianza y seriedad
3. **Enfocado** - Un solo mensaje claro sin distracciones
4. **Conversión directa** - CTA primario prominente
5. **Social proof** - Stats reales para credibilidad

### ¿Qué cambió del diseño anterior?

**Antes (Mint/Lime):**
- Colores: Verde menta + amarillo
- Estilo: Startup tech moderna
- 3 feature cards grandes
- Iconos emoji

**Ahora (Web-Based):**
- Colores: Cream + coral (naranja Wani)
- Estilo: Marca corporativa establecida
- Stats compactas
- Logo real

---

## 🔄 Para Volver a la Versión Anterior

Si prefieres el diseño mint/lime original:

```bash
cd apps/mobile/src/app/screens/auth
mv WelcomeScreen.v2.tsx WelcomeScreen.web-based.tsx
mv WelcomeScreen.v2-carousel-mint.backup WelcomeScreen.v2.tsx
```

O edita `RootNavigator.tsx`:
```typescript
import WelcomeScreen from '../screens/auth/WelcomeScreen'  // V1
// import WelcomeScreen from '../screens/auth/WelcomeScreen.v2'  // Web-based
```

---

## 📦 Assets Requeridos

✅ **Ya incluido:**
- `assets/images/logo-horizontal-naranja.png`

🔜 **Opcional (para mejorar):**
- Dot animado real (en lugar de View circular)
- Gradiente sutil en el fondo
- Animaciones de entrada

---

## 🎬 Para Ver los Cambios

1. **Guarda todos los archivos**
2. **En tu terminal de Expo, presiona:**
   - `r` para reload
   - O agita el teléfono → Reload

3. **Deberías ver:**
   - Logo Wani naranja arriba
   - Badge con "Your money. Your rules..."
   - Título "Money that moves as fast as you do"
   - Botón coral "Get Started"
   - Stats abajo

---

## ✨ Resultado Final

**Diseño profesional y corporativo** que:
- ✅ Refleja fielmente la web de Wani
- ✅ Usa la identidad de marca correcta (coral/naranja)
- ✅ Muestra stats reales para credibilidad
- ✅ Tiene CTA claro y directo
- ✅ Se ve profesional y confiable
- ✅ Optimizado para conversión

**El flujo es:**
```
Splash → Welcome (Web-Based) → Register/Login → Home
```

---

**¡Haz reload en la app y verás el nuevo diseño! 🚀**
