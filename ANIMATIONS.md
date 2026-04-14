# Micro-Interactions & Animation System

A comprehensive micro-interaction system for the habit tracking app, designed to create a smooth, calm, and modern user experience. All animations are GPU-optimized using `transform` and `opacity` properties for smooth mobile performance.

## 🎨 Animation Philosophy

- **Subtle & Calm**: Animations are minimal and non-intrusive, focusing on supporting the user's attention without overwhelming
- **Performance-First**: All animations use GPU-friendly properties (transform, opacity)
- **Purposeful**: Every animation serves a UX purpose - providing feedback or guiding attention
- **Accessible**: Respects `prefers-reduced-motion` and keeps durations short (300-800ms)

## 📦 Components & Files

### CSS Animations (`client/global.css`)
Pre-built keyframe animations for lightweight UI elements:
- `fadeInUp` - Page load fade-in with upward motion
- `habitCheckScale` - Scale animation for habit check buttons
- `habitCheckGlow` - Soft green glow pulse on check
- `streakBounce` - Bounce animation for streak counters
- `streakGlow` - Energy glow around streak numbers
- `cardSlideUp` - Cards slide in from bottom
- `floatingIcon` - Subtle floating effect (empty state)
- `successRipple` - Ripple effect for success feedback
- `softBounce` - Micro bounce animation

### Framer Motion Components (`client/lib/animations.tsx`)
Reusable React components wrapping Framer Motion:
- `FadeInUp` - Page load animation wrapper
- `HabitCheckAnimation` - Scale + glow on habit check
- `StreakAnimation` - Bounce + glow for streak increases
- `AnimatedButton` - Button hover/tap animations
- `CardAnimation` - Staggered card appearance
- `ChartLineAnimation` - Line drawing animation
- `AISuggestionAnimation` - Fade + scale for suggestions
- `FloatingIcon` - Floating animation for empty states
- `SuccessRipple` - Ripple feedback animation
- `StaggerContainer` - Container with child stagger

### Animation Hooks (`client/hooks/use-animations.ts`)
Custom React hooks for animation logic:
- `useInViewAnimation()` - Trigger animations on scroll into view
- `useInteractionAnimation()` - Manage animation state on user interaction
- `useCountUp()` - Animate numbers counting up (for statistics)
- `useHapticFeedback()` - Trigger vibration on mobile (with fallback)
- `useElementInViewport()` - Detect element visibility
- `useScrollTrigger()` - Scroll-based animation triggers
- `useStaggerDelays()` - Generate stagger delay values
- `usePageTransition()` - Manage page load state
- `useTapFeedback()` - Touch/mouse feedback animations

## 🎬 Animation Specifications

### 1. Page Load Animation
**Where**: Hero section, all major sections
**Animation**: Fade in + slight upward motion (translateY 10px → 0)
**Duration**: 0.4s
**Easing**: ease-out
**Trigger**: On mount / on scroll into view
```tsx
<motion.section
  initial={{ opacity: 0, y: 10 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.4, ease: "easeOut" }}
>
  Content
</motion.section>
```

### 2. Habit Check Interaction
**Where**: HabitGrid cell buttons
**Animations**:
- Scale: 1 → 1.1 → 1 (300ms)
- Glow: Soft green pulse (500ms)
- Haptic: Micro vibration [10ms, 5ms, 10ms]
**Trigger**: On click
```tsx
<motion.button
  animate={isAnimating ? {
    scale: [1, 1.1, 1],
    boxShadow: [...glowStates]
  } : {}}
  transition={{ duration: 0.3, ease: "easeOut" }}
>
  {/* button content */}
</motion.button>
```

### 3. Streak Animation
**Where**: Streak counter in ProgressOverview
**Animations**:
- Bounce: 1 → 1.15 → 1 (500ms, cubic-bezier bounce)
- Glow: Energy glow around number (600ms)
**Trigger**: When streak value changes
```tsx
<motion.div
  key={streakValue}
  animate={{
    scale: [1, 1.15, 1],
    boxShadow: [...]
  }}
  transition={{
    duration: 0.5,
    ease: [0.68, -0.55, 0.265, 1.55]
  }}
>
  {streakValue}
</motion.div>
```

### 4. Button Hover/Tap
**Where**: All action buttons
**Animations**:
- Hover: scale 1 → 1.05 (200ms)
- Tap: scale 1 → 0.95 (100ms)
- Shadow increase on hover
**Trigger**: On hover/tap
```tsx
<motion.button
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
  transition={{ type: "spring", stiffness: 200, damping: 17 }}
>
  Button
</motion.button>
```

### 5. Card Grid Animations
**Where**: HabitGrid rows, stat cards
**Animations**:
- Fade + slide up (opacity 0 → 1, y: 12 → 0)
- Staggered: 50ms delay between items
**Duration**: 400ms per card
**Trigger**: On scroll into view
```tsx
<motion.tr
  initial={{ opacity: 0, y: 8 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{
    duration: 0.35,
    ease: "easeOut",
    delay: index * 0.05
  }}
  viewport={{ once: true, margin: "-50px" }}
>
  {/* row content */}
</motion.tr>
```

### 6. Progress Chart Animation
**Where**: ProgressOverview line chart
**Animation**: Line stroke drawing left to right
**Duration**: 0.8s
**Easing**: easeInOut
**Implementation**: Recharts native animation (animationDuration: 800)
```tsx
<Line
  animationDuration={800}
  isAnimationActive={true}
  {...otherProps}
/>
```

### 7. AI Suggestions
**Where**: AIHabitQuiz component
**Animations**:
- Fade: 0 → 1
- Scale: 0.95 → 1
- Blur: 4px → 0px
**Duration**: 350ms
**Trigger**: On component mount
```tsx
<motion.div
  initial={{ opacity: 0, scale: 0.95, filter: "blur(4px)" }}
  animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
  transition={{ duration: 0.35, ease: "easeOut" }}
>
  Suggestions
</motion.div>
```

### 8. Empty State
**Where**: Missing habit tracker message
**Animation**: Floating icon (subtle up/down motion)
**Duration**: 3s loop
**Motion**: -8px to 0px vertical travel
**Repeat**: Infinite
```tsx
<motion.div
  animate={{ y: [-0, -8, 0] }}
  transition={{
    duration: 3,
    ease: "easeInOut",
    repeat: Infinity
  }}
>
  Icon
</motion.div>
```

### 9. Success Feedback
**Where**: Habit completion confirmation
**Animation**: Ripple effect + glow
**Duration**: 600ms
**Trigger**: On habit mark completion
```tsx
<motion.div
  animate={trigger ? "ripple" : "rest"}
  variants={{
    rest: { boxShadow: "0 0 0 0px rgba(16, 185, 129, 0.7)" },
    ripple: { boxShadow: "0 0 0 12px rgba(16, 185, 129, 0)" }
  }}
  transition={{ duration: 0.6, ease: "easeOut" }}
>
  Content
</motion.div>
```

### 10. Count-Up Animations
**Where**: Statistics (completion rate, completions done, streaks)
**Animation**: Number animates from 0 to final value
**Duration**: 600-800ms
**Easing**: linear (via requestAnimationFrame)
- Completion Rate: 800ms
- Completions Today: 600ms
- Current Streak: 600ms
- Best Streak: 700ms

## 🎯 Performance Optimizations

### GPU-Friendly Properties
All animations use only these GPU-optimized properties:
- `transform` (translate, scale, rotate)
- `opacity`
- `boxShadow` (GPU accelerated on modern browsers)
- `filter` (blur - minimal usage)

### Mobile Optimization
- Haptic feedback combined with visual feedback
- Shorter durations (300ms-600ms typical)
- Single animation per interaction (avoid stacking)
- `viewport={{ once: true }}` prevents redundant re-animations
- Margin `-50px` on viewport to trigger earlier

### Accessibility
- Respects `prefers-reduced-motion` (via Framer Motion)
- Short animation durations don't interfere with perception
- Animations enhance, don't replace, visual feedback

## 🚀 Usage Examples

### Basic Page Load Animation
```tsx
import { motion } from "framer-motion";

<motion.div
  initial={{ opacity: 0, y: 10 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.4, ease: "easeOut" }}
>
  Content loads with fade-in and upward motion
</motion.div>
```

### Habit Check with Feedback
```tsx
import { useInteractionAnimation, useHapticFeedback } from "@/hooks/use-animations";
import { motion } from "framer-motion";

const { animate, trigger } = useInteractionAnimation();
const { trigger: vibrate } = useHapticFeedback();

const handleCheck = () => {
  vibrate([10, 5, 10]); // Micro vibration pattern
  trigger(); // Trigger animation
  // Update habit...
};

<motion.button
  animate={animate ? {
    scale: [1, 1.1, 1],
    boxShadow: [...]
  } : {}}
  onClick={handleCheck}
>
  Check
</motion.button>
```

### Staggered List Animation
```tsx
import { StaggerContainer } from "@/lib/animations";

<StaggerContainer staggerDuration={0.3} delayBetweenChildren={0.05}>
  {items.map((item) => (
    <div key={item.id}>{item.name}</div>
  ))}
</StaggerContainer>
```

### Count-Up Statistics
```tsx
import { useCountUp } from "@/hooks/use-animations";

const animatedCount = useCountUp(42, 600, true);

<p>{animatedCount}%</p>
```

## 🎨 Color & Styling Integration

### Animation Colors
- **Primary**: Fade/scale effects on main actions
- **Accent (Green)**: Completion feedback, check marks, success
- **Orange**: Energy/fire emoji in streaks
- **Muted**: Subtle transitions on secondary elements

### Theme Support
All animations respect light/dark mode:
- Colors use CSS custom properties
- Shadows adapt to theme
- Glow effects adjust opacity for visibility

## 🔧 Customization

### Adjusting Animation Duration
```tsx
// In component
<motion.div
  transition={{ duration: 0.5 }} // Change 0.4 to desired value
>
```

### Adjusting Easing
```tsx
// Common easing functions:
ease: "easeIn" | "easeOut" | "easeInOut" | "linear"
ease: [0.68, -0.55, 0.265, 1.55] // Custom cubic-bezier (bounce)
```

### Disabling Animations for Testing
```tsx
// Wrap in a condition
const shouldAnimate = process.env.NODE_ENV !== "test";

<motion.div
  animate={shouldAnimate ? { scale: 1.05 } : {}}
>
```

## 📊 Animation Performance Budget

Typical animation load:
- Page load: ~4-5 simultaneous animations (staggered start)
- Habit check: 1 animation + haptic
- Streak update: 2 animations (scale + glow)
- Button interaction: 1 animation
- **Total**: Well under budget for 60fps on mobile

## 🐛 Debugging

### In React DevTools
1. Check Framer Motion animations in "Profiler"
2. Look for "whileInView" triggering on scroll
3. Verify `viewport={{ once: true }}` prevents reruns

### Visual Debugging
1. Add `border` to motion divs to see animation trigger
2. Slow down animations: `transition={{ duration: 2 }}`
3. Check Chrome DevTools Animation panel

## 📚 Further Reading

- [Framer Motion Docs](https://www.framer.com/motion)
- [Web Animation Performance](https://web.dev/animations-guide/)
- [Accessible Animations](https://alistapart.com/article/designing-safer-web-animation-for-motion-sensitive/)

---

**Last Updated**: April 2026
**Framer Motion Version**: Latest (from package.json)
**Browser Support**: All modern browsers (Chrome, Firefox, Safari, Edge)
