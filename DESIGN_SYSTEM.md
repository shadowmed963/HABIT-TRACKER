# 🎨 Premium Habit Tracker Design System

A production-ready, mobile-first UI with calm, spiritual, and motivating aesthetics.

---

## 📋 Color Palette

### Primary Colors
- **Calm Green** (`calm-500`): `#22c55e` - Primary action, completed states, progress
- **Serene Blue** (`serene-500`): `#3b82f6` - Secondary action, insights, information

### Supporting Colors
- **Neutral 50** (`neutral-50`): `#f9fafb` - Off-white background
- **Neutral 900** (`neutral-900`): `#111827` - Dark gray text

### Usage
```tsx
// Primary actions and completed states
<button className="bg-calm-500 text-white">Complete Habit</button>

// Secondary actions and insights  
<button className="bg-serene-500 text-white">View Analytics</button>

// Subtle backgrounds
<div className="bg-calm-50 dark:bg-calm-900/20">Content</div>
```

---

## 🎭 Component Styling Guidelines

### 1. **Cards & Containers**
- Rounded corners: `rounded-[20px]` (mobile), `rounded-[30px]` (desktop)
- Soft shadows: `shadow-sm` to `shadow-lg`
- Soft gradients: `from-card to-card/80`
- Light borders: `border border-border/50`

```tsx
<div className="rounded-[20px] shadow-sm border border-border/50 bg-gradient-to-br from-card to-card/80 p-4">
  Content
</div>
```

### 2. **Buttons & Interactive Elements**
- Use `RippleButton` component for enhanced micro-interactions
- Hover: `scale: 1.02`, soft shadow elevation
- Active: `scale: 0.98`
- Ripple effect on click with color-matched ripple

```tsx
import RippleButton from "@/components/ui/ripple-button";

<RippleButton 
  className="bg-calm-500 text-white rounded-lg"
  rippleColor="rgba(34, 197, 94, 0.5)"
>
  Add Habit
</RippleButton>
```

### 3. **Animations**
- Entrance: `fade + slide` (0.3-0.5s)
- Micro: `scale` transitions (0.1-0.2s)
- Loading: `pulse` or `spin` (continuous)
- Success: `checkmark` or `glow` animation

### 4. **Icons**
Smart icon system with category-based mapping:
- 🏃 **Fitness**: Activity icon
- 📚 **Learning**: BookOpen icon
- 💧 **Wellness**: Droplets icon
- 🧠 **Mental**: Brain icon
- 💪 **Health**: Heart icon
- ⚡ **Energy**: Zap icon
- 🌿 **Nature**: Leaf icon
- 🌙 **Sleep**: Moon icon

---

## 📱 Mobile-First Responsive

All components designed and tested mobile-first, then enhanced for larger screens.

### Breakpoints
- **Mobile**: default (320px+)
- **Tablet**: `sm:` (640px+)
- **Desktop**: `md:` (768px+), `lg:` (1024px+)

### Example
```tsx
<div className="text-sm sm:text-base lg:text-lg">
  Scales appropriately on all devices
</div>
```

---

## ✨ Micro-Interactions

### Click/Tap Feedback
```tsx
<motion.button
  whileHover={{ scale: 1.02 }}
  whileTap={{ scale: 0.98 }}
>
  Interactive Button
</motion.button>
```

### Hover States
```tsx
<motion.div
  whileHover={{ y: -2, shadow: "0 8px 24px rgba(0,0,0,0.1)" }}
>
  Hover Card
</motion.div>
```

### Ripple Effects
- Click on buttons triggers ripple emanation from pointer
- Smooth fade-out over 600ms
- Color matches button theme

### Animations
- **Page entrance**: Stagger children with 0.05-0.1s delay
- **Item entrance**: Fade + Y-offset (20px) transition
- **Success**: Checkmark + glow animation
- **Loading**: Smooth pulse or rotation

---

## 🌍 Multi-Language & RTL Support

Components auto-detect language and adjust layout:

```tsx
<div dir={language === "ar" ? "rtl" : "ltr"}>
  Automatically flips for Arabic/Hebrew
</div>
```

### RTL-Aware Styling
- Use `gap` instead of `mr/ml` for spacing
- Use `px` instead of `pl/pr` for horizontal padding
- Avoid hardcoded left/right positioning

---

## 🌙 Dark Mode

Full dark mode support with automatic detection:

```tsx
// CSS classes
<div className="text-slate-900 dark:text-white">
  Auto switches in dark mode
</div>

// Tailwind dark mode
<div className="bg-white dark:bg-slate-950">
  Proper contrast in both themes
</div>
```

---

## 📊 Component Library

### Available Components

#### `RippleButton`
Enhanced button with ripple effect on click
```tsx
<RippleButton 
  className="bg-calm-500"
  rippleColor="rgba(34, 197, 94, 0.5)"
>
  Click me
</RippleButton>
```

#### `HabitCards`
Horizontal scrolling habit overview cards with icons
- Progress bar animation
- Streak display with rotating flame icon
- Category-based icon
- Mobile-optimized sizing

#### `HabitGrid`
30-day grid with completion tracking
- Soft green for completed
- Outline glow for today
- Ripple effect on tap
- RTL-aware scrolling

#### `ProgressPanel`
Analytics dashboard with charts
- Area chart with gradient
- Completion rate, streaks, milestones
- Responsive grid layout
- Dark mode charts

#### `DailyAIMessage`
Personalized AI motivational messages
- Context-aware message selection
- Animated icons with pulse
- Gradient backgrounds per type
- Natural emoji personality

#### `HabitSuggestions`
AI-powered habit suggestions with custom add
- Category icons for each suggestion
- Selection with checkbox animation
- Custom habit input
- Gradient selection highlight

---

## 🎯 Design Principles

1. **Calm & Clean**: Minimal clutter, ample whitespace
2. **Intentional**: Every element has purpose
3. **Accessible**: Dark mode, keyboard navigation, ARIA labels
4. **Responsive**: Works perfectly on all screen sizes
5. **Delightful**: Smooth animations and micro-interactions
6. **Spiritual**: Peaceful colors and gentle aesthetics
7. **Motivating**: Encouraging without being overwhelming

---

## 📐 Spacing & Layout

### Consistent Spacing Scale
- `xs`: 0.5rem (8px)
- `sm`: 1rem (16px)
- `md`: 1.5rem (24px)
- `lg`: 2rem (32px)
- `xl`: 3rem (48px)

### Container Padding
- Mobile: `px-4` (1rem)
- Tablet: `px-6` (1.5rem)
- Desktop: `px-8` (2rem)

---

## 🚀 Performance Tips

1. **Images**: Use WebP with fallbacks
2. **Animations**: GPU-accelerated (transform, opacity)
3. **Colors**: Use CSS variables for theming
4. **Icons**: Import only needed icons from lucide-react
5. **Responsiveness**: Mobile-first media queries

---

## 📚 Usage Examples

### Complete Habit Interaction
```tsx
<motion.button
  whileTap={{ scale: 0.95 }}
  className="group relative overflow-hidden rounded-[20px] bg-calm-500 text-white p-4"
  onClick={completeHabit}
>
  ✓ Complete
  <motion.span
    className="absolute inset-0 bg-white/20"
    initial={{ scale: 0 }}
    whileTap={{ scale: 2 }}
  />
</motion.button>
```

### Motivational Card
```tsx
<motion.div
  className="rounded-[20px] bg-gradient-to-br from-calm-50 to-serene-50 dark:from-calm-900/20 dark:to-serene-900/20 p-6 shadow-md"
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
>
  <p className="text-slate-900 dark:text-white font-semibold mb-2">
    Great consistency! 🔥
  </p>
  <p className="text-slate-600 dark:text-slate-400">
    You're 3 days into your streak
  </p>
</motion.div>
```

---

**Version**: 1.0  
**Last Updated**: April 2026  
**Maintained by**: Design System Team
