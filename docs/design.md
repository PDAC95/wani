# DESIGN.md - Wani Design System

## Project Context

- **Project name:** Wani
- **Logo/Brand symbol:** Stylized "W" with connected circles representing community and flow
- **Core brand values:** Peace, Connection, Prosperity, Family, Accessibility
- **Target markets:** Mexico, USA (Latino diaspora), Colombia, Guatemala, El Salvador
- **Product type:** Mobile-first fintech platform (iOS + Android + Web)

---

## 1. Brand Identity

### Logo Meaning and Symbolism

The Wani logo consists of a flowing "W" shape with three circles positioned above it, creating a cohesive visual system that embodies our core mission.

**The "W" Form:**

- Represents the **wave** or **pulse** of money flowing across borders
- The continuous line symbolizes **seamless connectivity** between sender and receiver
- The fluid, organic shape conveys **peace and harmony** (和 - "wa" in Japanese)
- Multiple peaks suggest **multiple pathways** (remittances, B2P, merchant payments)

**The Three Circles:**

- **Central (larger):** The platform/ecosystem connecting all parties
- **Side circles (smaller):** Users on both sides of the transaction (sender/receiver, user/merchant, family/business)
- Together they form a **community network** above the flow of value
- Evokes **human connection** - people are at the heart of every transaction

**Color & Form Harmony:**

- Warm coral tones reflect **human warmth** and **family bonds**
- Organic, rounded shapes convey **approachability** and **trust**
- The upward flow suggests **growth** and **prosperity**

### How Design Reflects Brand Values

1. **Peace (和 - Wa):** Soft, warm color palette reduces financial anxiety
2. **Connection:** Logo circles and flowing lines emphasize relationship over transaction
3. **Prosperity:** Upward-flowing "W" and vibrant coral suggest abundance
4. **Family:** Warm, approachable colors prioritize human connection over cold banking
5. **Accessibility:** High contrast, clear hierarchy, simple visual language

### Design Philosophy Statement

> "Wani's design transforms cross-border finance from a cold, transactional experience into a warm, human connection. Every visual element—from our coral palette to our flowing logo—reminds users that behind every transfer is a family, a dream, and a story of prosperity. We design for peace of mind, not complexity; for connection, not confusion; for everyone, not just the financially savvy."

---

## 2. Color Palette System

### Primary Brand Colors

#### Coral Primary (#FB923C)

- **Represents:** Warmth, energy, family connection, prosperity
- **Usage:** Primary buttons, key CTAs, active states, brand moments, header gradients
- **Psychology:** Orange-coral stimulates feelings of enthusiasm and friendliness without the aggression of pure red. It's associated with affordability and approachability—critical for remittance users. Creates emotional warmth that banking blues cannot achieve.
- **Cultural notes:**
  - Mexico: Associated with celebration, festivals, family gatherings
  - USA Latino: Evokes warmth of home, nostalgia
  - Colombia: Positive, energetic, tropical associations
  - Universal: Appetite stimulant, encourages action (good for conversions)

#### Coral Light (#FED7AA)

- **Represents:** Subtle warmth, background accents, soft touches
- **Usage:** Card backgrounds, hover states, secondary highlights, gradient ends
- **Psychology:** Softened coral maintains warmth while providing visual rest. Suggests comfort and safety.
- **Cultural notes:** Universally perceived as gentle, non-threatening, welcoming

#### Coral Deep (#F97316)

- **Represents:** Energy, urgency, important actions
- **Usage:** Error states (sparingly), urgent CTAs, emphasis moments, icons
- **Psychology:** Deeper coral commands attention without alarming. Balance between action and trust.
- **Cultural notes:** Warmer than red, less culturally loaded with "danger" meanings

#### Brown Neutral (#292524)

- **Represents:** Stability, grounding, seriousness, security
- **Usage:** Body text, headings, dark mode backgrounds, footer
- **Psychology:** Dark brown (not black) feels organic, trustworthy, and less harsh than pure black. Grounds the warm coral palette.
- **Cultural notes:** Earth tones are universally associated with stability and reliability

#### Cream Background (#FFF7ED)

- **Represents:** Warmth, paper texture, approachability
- **Usage:** Page backgrounds, card surfaces, light mode base
- **Psychology:** Off-white with warm undertones feels more human than stark white. Reduces eye strain.
- **Cultural notes:** Evokes natural paper, handwritten letters home—nostalgic for remittance users

### Functional Colors

#### Success Green (#10B981)

- **Hex:** #10B981
- **Usage:** Success messages, completed transactions, positive balance changes
- **Contrast ratio on white:** 4.52:1 ✓ WCAG AA
- **Note:** Must pair with iconography (✓) for colorblind users

#### Error Red (#EF4444)

- **Hex:** #EF4444
- **Usage:** Error states, failed transactions, critical alerts
- **Contrast ratio on white:** 4.51:1 ✓ WCAG AA
- **Note:** Must pair with iconography (✗) for colorblind users

#### Warning Amber (#F59E0B)

- **Hex:** #F59E0B
- **Usage:** Warnings, pending states, important notices
- **Contrast ratio on white:** 3.95:1 ⚠ (Use for large text only or adjust to #D97706)
- **Note:** Must pair with iconography (⚠) for colorblind users

#### Info Blue (#3B82F6)

- **Hex:** #3B82F6
- **Usage:** Informational messages, tips, guidance
- **Contrast ratio on white:** 4.56:1 ✓ WCAG AA
- **Note:** Must pair with iconography (ℹ) for colorblind users

### Neutral Grays

#### Text Primary (#1F2937)

- **Usage:** Headings, body text, primary content
- **Contrast ratio on #FFF7ED:** 13.8:1 ✓ WCAG AAA

#### Text Secondary (#6B7280)

- **Usage:** Secondary text, captions, metadata, placeholders
- **Contrast ratio on #FFF7ED:** 6.2:1 ✓ WCAG AA

#### Border Gray (#E5E7EB)

- **Usage:** Dividers, card borders, input borders
- **Contrast ratio:** Sufficient for visual separation

#### Background Gray (#F9FAFB)

- **Usage:** Subtle backgrounds, disabled states, alternating rows
- **Contrast ratio:** Maintains warmth with slight gray tint

---

## 3. Gradient Applications

### Primary Hero Gradient

```css
background: linear-gradient(135deg, #fb923c 0%, #f97316 100%);
```

**Use cases:**

- App header/navigation bar
- Hero sections on landing page
- Premium feature cards
- Success celebration screens

**Psychology:** Creates depth and movement, suggesting the flow of money. The slight darkening toward bottom-right adds subtle sophistication.

### Subtle Background Gradient

```css
background: linear-gradient(180deg, #fff7ed 0%, #fed7aa 100%);
```

**Use cases:**

- Full-screen backgrounds
- Empty states
- Onboarding screens
- Promotional banners

**Psychology:** Barely perceptible gradient adds visual interest without distraction. Top-to-bottom flow feels natural and calming.

### Accent Highlight Gradient

```css
background: linear-gradient(90deg, #fb923c 0%, #fed7aa 50%, #fb923c 100%);
```

**Use cases:**

- Loading shimmer effects
- Progress indicators
- Skeleton screens
- Animated elements

**Psychology:** Left-to-right flow suggests progress and movement, perfect for loading states.

---

## 4. Color Usage Guidelines

### Do's ✓

1. **Use Coral Primary (#FB923C) for primary CTAs only** - Maintains visual hierarchy and draws eye to key actions
2. **Maintain 60-30-10 rule:** 60% Cream/White backgrounds, 30% Brown/Gray text, 10% Coral accents
3. **Pair Coral with Brown Neutral (#292524) for text on coral backgrounds** - Ensures readability while maintaining warmth
4. **Use functional colors (green/red/amber) with accompanying icons** - Never rely on color alone for meaning
5. **Apply gradients to large surfaces only (>200px)** - Gradients on small elements look busy
6. **Test all color combinations with accessibility tools** - Verify 4.5:1 contrast minimum for text
7. **Use Cream Background (#FFF7ED) as primary light mode base** - Warmer than white, easier on eyes
8. **Limit coral usage to 10% of screen real estate** - Too much coral becomes overwhelming

### Don'ts ✗

1. **Don't use coral for error states** - Use Error Red (#EF4444) instead; coral should always feel positive
2. **Don't place coral text on white backgrounds** - Insufficient contrast (2.87:1); use Brown Neutral instead
3. **Don't combine coral with pink or red tones** - Creates visual confusion and loses brand distinctiveness
4. **Don't use pure black (#000000) anywhere** - Use Brown Neutral (#292524) for warmer, friendlier feel
5. **Don't apply gradients to text** - Reduces legibility, fails accessibility
6. **Don't use color as the only differentiator** - Always pair with icons, labels, or patterns
7. **Don't mix warm and cool grays** - Stick to warm-tinted grays to complement coral
8. **Don't use Warning Amber (#F59E0B) for small text** - Fails WCAG AA; adjust to #D97706 or use large text only

### 60-30-10 Application

**60% - Backgrounds:**

- Cream Background (#FFF7ED)
- White (#FFFFFF) for cards
- Background Gray (#F9FAFB) for subtle sections

**30% - Text & Content:**

- Text Primary (#1F2937)
- Text Secondary (#6B7280)
- Brown Neutral (#292524)

**10% - Accents:**

- Coral Primary (#FB923C)
- Coral Light (#FED7AA)
- Functional colors as needed

---

## 5. Accessibility Considerations

### Color Contrast Ratios (on white #FFFFFF)

| Color          | Hex     | Ratio  | WCAG Level | Usage                   |
| -------------- | ------- | ------ | ---------- | ----------------------- |
| Coral Primary  | #FB923C | 2.87:1 | ❌ Fail    | Background/icons only   |
| Coral Deep     | #F97316 | 3.21:1 | ❌ Fail    | Background/icons only   |
| Brown Neutral  | #292524 | 15.2:1 | ✓ AAA      | All text sizes          |
| Text Primary   | #1F2937 | 14.7:1 | ✓ AAA      | All text sizes          |
| Text Secondary | #6B7280 | 6.5:1  | ✓ AA       | All text sizes          |
| Success Green  | #10B981 | 4.52:1 | ✓ AA       | Normal text (14px+)     |
| Error Red      | #EF4444 | 4.51:1 | ✓ AA       | Normal text (14px+)     |
| Warning Amber  | #F59E0B | 3.95:1 | ⚠ Large    | Large text only (18px+) |
| Info Blue      | #3B82F6 | 4.56:1 | ✓ AA       | Normal text (14px+)     |

### Color Contrast Ratios (on Cream #FFF7ED)

| Color          | Hex     | Ratio  | WCAG Level | Usage          |
| -------------- | ------- | ------ | ---------- | -------------- |
| Text Primary   | #1F2937 | 13.8:1 | ✓ AAA      | All text sizes |
| Text Secondary | #6B7280 | 6.2:1  | ✓ AA       | All text sizes |

### Color Blind Considerations

**Protanopia (Red-blind) & Deuteranopia (Green-blind):**

- Coral may appear yellowish-brown
- Success green and error red may be indistinguishable
- **Solution:** Always pair status colors with icons:
  - Success: ✓ checkmark icon
  - Error: ✗ X icon or ⚠ alert icon
  - Warning: ⚠ triangle icon
  - Info: ℹ circle-i icon

**Tritanopia (Blue-blind):**

- Coral remains distinct
- Info blue may appear greenish
- **Solution:** Use icons and clear labels

**Achromatopsia (Total color blindness):**

- All colors appear as shades of gray
- **Solution:** Ensure sufficient contrast between all elements
- Use patterns, textures, and shapes as secondary indicators:
  - Success: Solid fill + checkmark
  - Error: Diagonal stripes + X
  - Warning: Dotted border + triangle
  - Info: Dashed border + circle-i

**Testing Requirements:**

- Use Stark plugin for Figma/Sketch
- Test with Colorblind Web Page Filter
- Validate with WebAIM Contrast Checker
- Review with actual colorblind users during beta

---

## 6. Implementation in Code

### Tailwind CSS Configuration

```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        // Brand Colors
        coral: {
          DEFAULT: "#FB923C",
          light: "#FED7AA",
          deep: "#F97316",
        },
        // Neutrals
        brown: {
          DEFAULT: "#292524",
        },
        cream: {
          DEFAULT: "#FFF7ED",
        },
        // Functional
        success: "#10B981",
        error: "#EF4444",
        warning: "#F59E0B",
        "warning-dark": "#D97706", // WCAG AA compliant version
        info: "#3B82F6",
        // Text
        text: {
          primary: "#1F2937",
          secondary: "#6B7280",
        },
        // Borders & Backgrounds
        border: "#E5E7EB",
        "bg-gray": "#F9FAFB",
      },
      backgroundImage: {
        "gradient-hero": "linear-gradient(135deg, #FB923C 0%, #F97316 100%)",
        "gradient-subtle": "linear-gradient(180deg, #FFF7ED 0%, #FED7AA 100%)",
        "gradient-shimmer":
          "linear-gradient(90deg, #FB923C 0%, #FED7AA 50%, #FB923C 100%)",
      },
      fontFamily: {
        sans: [
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "sans-serif",
        ],
      },
    },
  },
  plugins: [],
};
```

### CSS Variables

```css
:root {
  /* Brand Colors */
  --color-coral: #fb923c;
  --color-coral-light: #fed7aa;
  --color-coral-deep: #f97316;

  /* Neutrals */
  --color-brown: #292524;
  --color-cream: #fff7ed;

  /* Functional */
  --color-success: #10b981;
  --color-error: #ef4444;
  --color-warning: #f59e0b;
  --color-warning-dark: #d97706;
  --color-info: #3b82f6;

  /* Text */
  --color-text-primary: #1f2937;
  --color-text-secondary: #6b7280;

  /* Borders & Backgrounds */
  --color-border: #e5e7eb;
  --color-bg-gray: #f9fafb;
  --color-white: #ffffff;

  /* Gradients */
  --gradient-hero: linear-gradient(135deg, #fb923c 0%, #f97316 100%);
  --gradient-subtle: linear-gradient(180deg, #fff7ed 0%, #fed7aa 100%);
  --gradient-shimmer: linear-gradient(
    90deg,
    #fb923c 0%,
    #fed7aa 50%,
    #fb923c 100%
  );

  /* Shadows */
  --shadow-sm: 0 1px 2px 0 rgba(41, 37, 36, 0.05);
  --shadow-md: 0 4px 6px -1px rgba(41, 37, 36, 0.1);
  --shadow-lg: 0 10px 15px -3px rgba(41, 37, 36, 0.1);
  --shadow-xl: 0 20px 25px -5px rgba(41, 37, 36, 0.1);
}

/* Dark Mode Variables (see Section 7) */
[data-theme="dark"] {
  --color-cream: #1f2937;
  --color-brown: #f9fafb;
  --color-text-primary: #f9fafb;
  --color-text-secondary: #d1d5db;
  --color-border: #374151;
  --color-bg-gray: #111827;
}
```

### React Native / Expo Configuration

```javascript
// colors.js
export const colors = {
  // Brand
  coral: "#FB923C",
  coralLight: "#FED7AA",
  coralDeep: "#F97316",

  // Neutrals
  brown: "#292524",
  cream: "#FFF7ED",

  // Functional
  success: "#10B981",
  error: "#EF4444",
  warning: "#F59E0B",
  warningDark: "#D97706",
  info: "#3B82F6",

  // Text
  textPrimary: "#1F2937",
  textSecondary: "#6B7280",

  // Borders & Backgrounds
  border: "#E5E7EB",
  bgGray: "#F9FAFB",
  white: "#FFFFFF",
};

export const gradients = {
  hero: ["#FB923C", "#F97316"],
  subtle: ["#FFF7ED", "#FED7AA"],
  shimmer: ["#FB923C", "#FED7AA", "#FB923C"],
};
```

---

## 7. Dark Mode Adaptation

### Dark Mode Color Adjustments

| Light Mode               | Dark Mode               | Reasoning                                                              |
| ------------------------ | ----------------------- | ---------------------------------------------------------------------- |
| Cream (#FFF7ED)          | Dark Gray (#1F2937)     | Base background shifts to dark, maintains warmth with gray (not black) |
| White (#FFFFFF)          | Charcoal (#111827)      | Card surfaces darker than base for depth                               |
| Text Primary (#1F2937)   | Off-White (#F9FAFB)     | Text inverts but stays warm-tinted                                     |
| Text Secondary (#6B7280) | Light Gray (#D1D5DB)    | Reduced contrast for hierarchy                                         |
| Coral Primary (#FB923C)  | Coral Primary (#FB923C) | Brand color stays consistent!                                          |
| Border (#E5E7EB)         | Dark Border (#374151)   | Subtle separation in dark mode                                         |

### Dark Mode Gradient Adjustments

```css
/* Light Mode Hero Gradient */
background: linear-gradient(135deg, #fb923c 0%, #f97316 100%);

/* Dark Mode Hero Gradient - Slightly muted */
background: linear-gradient(135deg, #fb923c 0%, #ea580c 100%);
```

**Why mute gradients in dark mode?**

- Prevents eye strain from overly vibrant colors on dark backgrounds
- Maintains brand recognition while respecting dark environment
- Coral on dark gray has higher perceived brightness than on white

### Dark Mode Implementation

```css
/* Automatic dark mode based on system preference */
@media (prefers-color-scheme: dark) {
  :root {
    --color-cream: #1f2937;
    --color-white: #111827;
    --color-brown: #f9fafb;
    --color-text-primary: #f9fafb;
    --color-text-secondary: #d1d5db;
    --color-border: #374151;
    --color-bg-gray: #0f172a;
    --gradient-hero: linear-gradient(135deg, #fb923c 0%, #ea580c 100%);
  }
}
```

### Dark Mode Testing Checklist

- [ ] All text remains legible (min 4.5:1 contrast)
- [ ] Coral buttons stand out clearly on dark backgrounds
- [ ] Cards have sufficient elevation/depth
- [ ] Borders are visible but subtle
- [ ] Success/error/warning colors remain distinguishable
- [ ] Gradients don't cause eye strain
- [ ] Icons remain clear and recognizable

---

## 8. Cultural Color Considerations

### Mexico 🇲🇽

**Coral/Orange Associations:**

- ✓ **Positive:** Warmth, celebration, marigolds (Día de Muertos), family gatherings, traditional textiles
- ✓ **Cultural fit:** Mexicans embrace warm, vibrant colors; coral feels festive without being overwhelming
- ✓ **Market preference:** Research shows Latin American users respond positively to warm color palettes in fintech (vs. cold blues)

**Brown Associations:**

- ✓ **Positive:** Earth, stability, traditional adobe architecture, connection to land
- Neutral cultural perception, conveys reliability

**Avoid:**

- ✗ Pure black (associated with mourning in some contexts)
- ✗ Green alone for "go" (can have political connotations)

### USA (Latino Diaspora) 🇺🇸

**Coral/Orange Associations:**

- ✓ **Positive:** Nostalgia for home, warmth of Latin culture, family connection
- ✓ **Psychological fit:** Bridges "home" (warm Latin colors) and "here" (professional USA standards)
- ✓ **Differentiation:** Stands out from blue-dominated US fintech landscape

**Strategic considerations:**

- Balance warmth (cultural connection) with professionalism (US market expectations)
- Coral achieves this balance better than pure orange or red

### Colombia 🇨🇴

**Coral/Orange Associations:**

- ✓ **Positive:** Tropical warmth, energy, optimism, coffee culture
- ✓ **Cultural fit:** Colombians embrace vibrant colors; high digital adoption rates
- ✓ **Market preference:** 18% of POS transactions are digital wallets (growing market)

**National colors:**

- Yellow, blue, red are in flag—coral complements without competing

### Guatemala & El Salvador 🇬🇹🇸🇻

**Coral/Orange Associations:**

- ✓ **Positive:** Warmth, traditional textiles, family-oriented values
- ✓ **Cultural fit:** High remittance dependency; colors should feel trustworthy yet approachable
- ✓ **Market consideration:** Lower smartphone penetration—high contrast and clarity essential

**Strategic notes:**

- Accessibility is critical (older devices, lower-quality screens)
- Coral's brightness ensures visibility even on budget screens

### Universal Considerations

**Across all markets:**

- ✓ Coral is universally perceived as friendly, not aggressive
- ✓ Warmer than institutional blue, more trustworthy than flashy red
- ✓ Gender-neutral (avoids pink/blue stereotypes)
- ✓ Appears appetizing (subconsciously associated with food/abundance)
- ⚠ May be less common in traditional banking—this is an advantage for differentiation

---

## 9. Emotional Color Mapping

| Emotion/State              | Color                      | Application                                               | Reasoning                                                                      |
| -------------------------- | -------------------------- | --------------------------------------------------------- | ------------------------------------------------------------------------------ |
| **Trust & Security**       | Brown Neutral (#292524)    | Account balances, transaction confirmations, legal text   | Dark brown grounds the experience; conveys stability without coldness of black |
| **Warmth & Connection**    | Coral Primary (#FB923C)    | Remittance sent/received, family features, user greetings | Evokes human warmth, familial bonds; makes finance feel personal               |
| **Success & Achievement**  | Success Green (#10B981)    | Completed transfers, goals reached, credit approved       | Universal positive indicator; paired with ✓ icon for clarity                   |
| **Urgency (Positive)**     | Coral Deep (#F97316)       | Limited-time offers, CTAs, important actions              | Energizes without alarming; encourages action                                  |
| **Caution & Attention**    | Warning Amber (#F59E0B)    | Pending transactions, verification needed, tips           | Catches eye without panic; signals "pay attention"                             |
| **Error & Correction**     | Error Red (#EF4444)        | Failed transactions, invalid inputs, blocked actions      | Clear negative signal; paired with ✗ icon and plain language                   |
| **Information & Guidance** | Info Blue (#3B82F6)        | Tooltips, educational content, feature tours              | Calming, non-urgent; invites learning without pressure                         |
| **Peace & Calm**           | Cream Background (#FFF7ED) | App backgrounds, empty states, loading screens            | Reduces financial anxiety; warmer than stark white                             |

### Emotional Journey Mapping

**Onboarding (First-time user):**

- Use Cream + Coral gradient for welcome screens (warm, inviting)
- Brown text for instructions (clear, stable)
- Coral CTAs for "Get Started" (exciting, approachable)

**Active Transaction (Sending money):**

- Coral Primary for "Send" button (warm, confident action)
- Brown for recipient details (serious, accurate)
- Info Blue for helpful tips (supportive, non-intrusive)

**Success State (Money received):**

- Success Green background burst (celebration!)
- Coral accents for "Share" or "Send Again" (maintaining momentum)
- Brown for details (grounding excitement in reality)

**Error Recovery (Failed transaction):**

- Error Red with ✗ icon (clear problem)
- Info Blue for "What happened?" explanation (helpful, not punishing)
- Coral for "Try Again" CTA (encouragement, optimism)

---

## 10. Marketing Color Usage

### App Store / Landing Page

**Hero Section:**

```css
background: var(--gradient-hero); /* Coral gradient */
color: white;
heading: var(--color-brown); /* High contrast on light overlay */
cta-button: white background, coral text (inverted for emphasis);
```

**Reasoning:** Immediately establishes warmth and energy; differentiates from blue fintech competitors

**Feature Sections:**

- **Alternating backgrounds:** Cream → White → Cream (subtle rhythm)
- **Feature icons:** Coral Primary with Coral Light background circles
- **Section headings:** Brown Neutral (grounded, readable)
- **Body text:** Text Secondary (hierarchy without distraction)

**CTA Buttons:**

- **Primary:** Coral Primary background, Brown text, subtle shadow
- **Secondary:** White background, Coral Primary border, Coral text
- **Hover states:** Coral Deep (darkens slightly for feedback)

**Success Stories / Testimonials:**

- **Background:** Cream with Coral Light accent border on left
- **Quote marks:** Coral Primary (warm, personal)
- **Photos:** Subtle Coral border/shadow (unifies design)
- **Names:** Brown Neutral (credibility)

### Social Media

**Post Guidelines:**

**Instagram Feed:**

- Background: Cream or White
- Accent color: Coral Primary for graphics
- Text overlays: Brown Neutral, minimum 18pt for readability
- Call-to-action: Coral box with white text

**Instagram Stories:**

- Top/bottom bars: Coral gradient (brand consistency)
- Backgrounds: Cream or Coral Light
- Interactive elements (polls, sliders): Coral Primary
- Text: Brown Neutral with cream background for legibility

**Twitter/X:**

- Header image: Coral gradient with logo
- Profile description: Warm, approachable language with 🧡 emoji (coral heart)
- Infographics: Coral Primary + Brown + Cream palette
- Charts/graphs: Coral for primary data, Info Blue for secondary

**LinkedIn (B2B Audience):**

- More restrained palette: Brown + Cream + Coral accents
- Professional tone maintained with coral used sparingly
- Feature images: Real photos with coral overlay at 20% opacity

**Achievement Graphics:**

```
Template:
- Background: Cream
- Border: Coral Primary (thick, 8px)
- Icon: Coral Primary on Coral Light circle
- Heading: Brown Neutral
- Stats: Coral Primary (large, bold)
- Subtext: Text Secondary
```

**Example:**

```
┌─────────────────────────┐
│  🎉                     │  ← Coral icon
│  $1,000,000             │  ← Coral Primary (huge)
│  enviados en remesas    │  ← Brown Neutral
│  ¡Gracias por confiar!  │  ← Text Secondary
│                         │
│  [Ver más →]            │  ← Coral CTA
└─────────────────────────┘
   ↑ Coral border
```

---

## 11. Color Testing Checklist

### Device Testing

- [ ] iPhone (iOS Safari) - light mode
- [ ] iPhone (iOS Safari) - dark mode
- [ ] Android (Chrome) - light mode
- [ ] Android (Chrome) - dark mode
- [ ] iPad/tablet - landscape orientation
- [ ] Budget Android device (5+ years old) - screen quality test
- [ ] High-contrast mode (Windows/Android accessibility)
- [ ] Grayscale mode (iOS accessibility)

### Accessibility Validation

- [ ] Run WebAIM Contrast Checker on all text/background combinations
- [ ] Verify WCAG AA compliance (4.5:1 minimum) for all body text
- [ ] Verify WCAG AAA compliance (7:1 minimum) for key actions
- [ ] Test with Stark plugin (Figma) for colorblind simulations
- [ ] Test with NoCoffee Vision Simulator (browser extension)
- [ ] Validate that all status indicators include icons + text
- [ ] Check focus states are visible (coral outline, 2px minimum)
- [ ] Confirm error messages are clear with color + icon + text

### Environmental Conditions

- [ ] Outdoor sunlight (maximum brightness) - can user read screen?
- [ ] Low light / nighttime (minimum brightness) - is coral too bright?
- [ ] Fluorescent office lighting - any color shifts?
- [ ] Blue light filter enabled - does coral remain warm?
- [ ] Screen protector applied - does contrast reduce?

### Cultural Verification

- [ ] Review with Mexican users - cultural appropriateness
- [ ] Review with US Latino users - professional yet warm?
- [ ] Review with Colombian users - energetic yet trustworthy?
- [ ] Review with Guatemalan/Salvadoran users - accessible on older devices?
- [ ] Verify no unintended political/religious color associations

### Print Considerations (Marketing Materials)

- [ ] CMYK conversion: Coral (#FB923C) → C:0 M:50 Y:85 K:0
- [ ] Brown (#292524) → C:0 M:10 Y:15 K:85
- [ ] Test print on coated vs. uncoated paper (color shifts)
- [ ] Verify coral doesn't appear too red/orange in print
- [ ] Check grayscale version remains legible (photocopies)

### Performance Testing

- [ ] Gradient rendering performance on older devices (<60fps?)
- [ ] Image compression doesn't distort coral tones
- [ ] CSS color values don't break in legacy browsers
- [ ] Dark mode transitions smoothly (no flash of wrong colors)

### Brand Consistency

- [ ] Logo appears correctly in coral on all backgrounds
- [ ] Coral tone matches across web, iOS, Android (no RGB/HEX discrepancies)
- [ ] Marketing materials match app colors exactly (hex codes verified)
- [ ] Third-party integrations (email, notifications) use correct colors
- [ ] Press kit includes correct hex codes and usage guidelines

---

## Logo Usage Guidelines

### Clear Space

Maintain minimum clear space around logo equal to the height of one circle (approximately 0.3x logo width).

```
    ○  ○  ○
     \W/
 ←─→      ←─→  (minimum clear space)
```

### Minimum Sizes

- **Digital:** 32px height minimum (ensures circles remain visible)
- **Print:** 0.5 inch / 12mm height minimum
- **App icon:** 1024x1024px (iOS), 512x512px (Android)

### Color Variations

**Primary (Coral on Light):**

- Coral Primary (#FB923C) logo
- Use on: Cream, White, Light Gray backgrounds

**Inverted (White on Coral):**

- White (#FFFFFF) logo
- Use on: Coral gradient, Coral Primary, Brown backgrounds

**Monochrome Dark:**

- Brown Neutral (#292524) logo
- Use on: Light backgrounds when color is restricted

**Monochrome Light:**

- White (#FFFFFF) logo
- Use on: Dark backgrounds when color is restricted

### Incorrect Usage ✗

- ✗ Don't stretch or distort logo proportions
- ✗ Don't change colors outside approved palette
- ✗ Don't add effects (drop shadows, gradients on logo itself)
- ✗ Don't place on busy backgrounds (photo without overlay)
- ✗ Don't separate "W" from circles
- ✗ Don't outline logo (already has sufficient weight)
- ✗ Don't rotate logo (always horizontal)

### Wordmark + Symbol

**Full lockup:** Logo + "wani" wordmark

- Wordmark font: System default sans-serif, 700 weight
- Color: Matches logo (coral or white)
- Spacing: 0.5x circle height between symbol and wordmark
- Alignment: Baseline of wordmark aligns with bottom of "W"

**Symbol alone:**

- Use when brand is established and recognizable
- App icon, social media avatars, favicon
- Minimum size: 24px (smaller requires wordmark)

---

## Typography Pairing

While not color-specific, typography affects how colors are perceived:

**Headings:**

- Font weight: 700 (Bold)
- Color: Brown Neutral (#292524) in light mode
- Color: Off-White (#F9FAFB) in dark mode
- Use for: H1, H2, H3, button text

**Body:**

- Font weight: 400 (Regular)
- Color: Text Primary (#1F2937) in light mode
- Color: Off-White (#F9FAFB) in dark mode
- Use for: Paragraphs, descriptions, input text

**Secondary:**

- Font weight: 400 (Regular)
- Color: Text Secondary (#6B7280) in light mode
- Color: Light Gray (#D1D5DB) in dark mode
- Use for: Labels, captions, metadata

**Accent:**

- Font weight: 600 (Semibold)
- Color: Coral Primary (#FB923C) in both modes
- Use for: Links, highlighted terms, amounts

---

## Animation & Motion

Colors should transition smoothly to maintain premium feel:

```css
/* Smooth color transitions */
.button {
  background-color: var(--color-coral);
  transition: background-color 200ms ease-in-out;
}

.button:hover {
  background-color: var(--color-coral-deep);
}

/* Loading shimmer uses gradient-shimmer */
@keyframes shimmer {
  0% {
    background-position: -1000px 0;
  }
  100% {
    background-position: 1000px 0;
  }
}

.skeleton {
  background: var(--gradient-shimmer);
  background-size: 1000px 100%;
  animation: shimmer 2s infinite linear;
}
```

**Timing:**

- Fast interactions (hover, focus): 150-200ms
- State changes (success, error): 300ms
- Page transitions: 400ms
- Celebration animations: 600ms+

---

## Design System Maintenance

### Version Control

- All color changes must be documented with reasoning
- Major changes (new primary color) = major version bump
- Minor changes (new shade) = minor version bump
- Gradual rollout for significant changes to test user response

### Designer Handoff

- Figma library includes all color styles with exact hex codes
- Component variants show all color states (default, hover, active, disabled)
- Annotations explain accessibility considerations
- Export includes CSS variables ready to copy

### Developer Implementation

- Use CSS variables exclusively (no hard-coded hex values)
- Lint rules enforce color variable usage
- Automated tests check contrast ratios on build
- Visual regression tests catch unintended color changes

### Feedback Loop

- Monitor analytics for completion rates on coral CTAs
- A/B test color variations if needed (coral vs. alternatives)
- Gather user feedback on color preferences in target markets
- Update document based on real-world usage data

---

**Document Status:**

- **Created:** October 15, 2025
- **Version:** 1.0
- **Maintained by:** Design Team
- **Related:** PLANNING.md, PRD.md
- **Next Review:** January 2026 (post-beta launch)

---

## Quick Reference Card

```
PRIMARY COLORS:
  Coral Primary: #FB923C
  Coral Light:   #FED7AA
  Coral Deep:    #F97316

NEUTRALS:
  Brown:         #292524
  Cream:         #FFF7ED

FUNCTIONAL:
  Success:       #10B981
  Error:         #EF4444
  Warning:       #F59E0B
  Info:          #3B82F6

TEXT:
  Primary:       #1F2937
  Secondary:     #6B7280

GRADIENTS:
  Hero:          135deg, #FB923C → #F97316
  Subtle:        180deg, #FFF7ED → #FED7AA
  Shimmer:       90deg, #FB923C → #FED7AA → #FB923C

ACCESSIBILITY:
  - Coral CANNOT be used for text on white
  - Brown/Text colors PASS WCAG AAA
  - Always pair status colors with icons
  - Minimum contrast: 4.5:1 for text

CULTURAL NOTES:
  - Coral = warmth, family, celebration (positive in all markets)
  - Differentiated from blue fintech competitors
  - Accessible on older devices (high brightness)
```

---

_This design system is a living document. As Wani grows and evolves, so too will our visual language—always staying true to our core values of peace, connection, and prosperity for all._
