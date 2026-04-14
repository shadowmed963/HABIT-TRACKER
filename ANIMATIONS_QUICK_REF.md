# Micro-Interactions Quick Reference

## 🎬 Animation Components at a Glance

### Used in HabitGrid (`client/components/habit-tracker/HabitGrid.tsx`)

| Animation | Trigger | Duration | Effect |
|-----------|---------|----------|--------|
| Row Fade-In | Page load | 400ms | Opacity 0→1, Y: 8→0 |
| Cell Scale + Glow | Click/check | 300ms | Scale 1→1.1→1, glow pulse |
| Row Stagger | Page load | 35ms each | Delay: index × 50ms |
| Completed Count Update | Habit change | Spring | Scale bounce on new count |
| Delete Button | Hover | 200ms | Scale 1→1.05 |
| Haptic Feedback | Check | 25ms | Vibrate [10, 5, 10] |

**Key Features**:
- ✅ Habit completion feedback with scale + glow
- ✅ Staggered row animations for smooth grid reveal
- ✅ Count update animation when completion total changes
- ✅ Mobile haptic vibre on habit check

---

### Used in ProgressOverview (`client/components/habit-tracker/ProgressOverview.tsx`)

| Animation | Trigger | Duration | Effect |
|-----------|---------|----------|--------|
| Stat Cards | Scroll into view | 400ms | Fade-in + slide up (staggered) |
| Stat Icons | Scroll into view | 200-400ms | Rotation, scale, or wiggle |
| Count-Up Numbers | Mount | 600-800ms | 0 → final value |
| Chart Container | Scroll into view | 500ms | Fade-in + slide up |
| Recharts Line | Mount | 800ms | Stroke animation |
| Badge Scale | Mount | Spring | Scale 0.8→1 |

**Count-Up Timings**:
- Completion Rate: 800ms (slower)
- Completions Today: 600ms
- Current Streak: 600ms  
- Best Streak: 700ms

**Icons**:
- 📊 LineChart: Rotate -30° → 0° (spring)
- ✅ CheckCircle2: Scale 0 → 1 (spring)
- 🔥 Flame: Rotate wiggle [0, -5, 5, -5, 0] (600ms)

---

### Used in Index Page (`client/pages/Index.tsx`)

| Section | Animation | Trigger | Duration |
|---------|-----------|---------|----------|
| **Hero Section** | Fade-in | Mount | 400ms |
| Hero Label | Slide-in X | Mount | 400ms, delay 100ms |
| Hero Title | Slide-in X | Mount | 400ms, delay 150ms |
| Hero Description | Slide-in X | Mount | 400ms, delay 200ms |
| Account Card | Fade-in | Mount | 400ms, delay 250ms |
| Logout Button | Scale hover | Hover | 200ms spring |
| Habit/Day Stats | Fade-in + stagger | Mount | 400ms, delay 300ms |
| **Quick Add Section** | Fade-in | Mount | 400ms, delay 250ms |
| Input Field | Slide-in X | Mount | 400ms |
| Add Button | Slide-in X | Mount | 400ms, delay 50ms |
| Add Button Hover | Scale + Y | Hover | 200ms spring |
| **Empty Habit Grid** | Floating icon | Always | 3s infinite |
| **Quick Actions** | Fade-in | Mount | 400ms |

**Button Interactions** (all buttons):
- Hover: `scale: 1.05, y: -2px`
- Tap: `scale: 0.95`
- Transition: Spring (stiffness: 200, damping: 17)
- Interactive buttons: "Mark all today", "Suggest habits", "Reset challenge"

**Modal (AI Quiz)** when shown:
- Backdrop: Fade-in 0→1
- Content: Scale 0.9→1 + fade, spring transition

---

## 🎨 CSS Keyframe Animations

### Global Animations (can use as utility classes)

```css
/* Page Load */
.animate-in-fade-up {
  animation: fadeInUp 0.4s ease-out forwards;
}

/* Habit Interaction */
.animate-habit-check {
  animation: habitCheckScale 0.3s ease-out forwards;
}

.animate-habit-glow {
  animation: habitCheckGlow 0.5s ease-out forwards;
}

/* Streak */
.animate-streak-bounce {
  animation: streakBounce 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards;
}

.animate-streak-glow {
  animation: streakGlow 0.6s ease-out forwards;
}

/* Empty State */
.animate-floating {
  animation: floatingIcon 3s ease-in-out infinite;
}

/* Delays (for stagger) */
.animate-delay-0 { animation-delay: 0ms; }
.animate-delay-50 { animation-delay: 50ms; }
.animate-delay-100 { animation-delay: 100ms; }
/* ... up to 550ms */
```

---

## 🪝 Animation Hooks Quick Reference

### `useInteractionAnimation(resetDelay = 300)`
Trigger animation on interaction (click, etc)

```tsx
const { animate, trigger, reset } = useInteractionAnimation(300);

<button onClick={trigger}>Check</button>
<motion.div animate={animate ? {...} : {}}>
  Animates when clicked
</motion.div>
```

### `useCountUp(end, duration = 600, shouldStart = true)`
Animate number from 0 to end value

```tsx
const count = useCountUp(42, 800, habits.length > 0);
<p>{count}%</p>
```

### `useHapticFeedback()`
Trigger vibration on mobile

```tsx
const { trigger } = useHapticFeedback();

<button onClick={() => trigger([10, 5, 10])}>
  Click for feedback
</button>
```

### `useInViewAnimation(triggerOnLoad = true)`
Trigger animation when element scrolls into view

```tsx
const { ref, isVisible } = useInViewAnimation(true);
<div ref={ref}>
  Animates when scrolled into view
</div>
```

---

## 🚀 Performance Checklist

- ✅ All animations use `transform` and `opacity`
- ✅ No animations on `left/right/top/bottom` (use `translateY/X` instead)
- ✅ Stagger delays prevent animation overload
- ✅ `viewport={{ once: true }}` prevents re-animation
- ✅ Haptic feedback only on appropriate interactions
- ✅ Chart animations use recharts native animations
- ✅ Button animations use spring physics (feels natural)
- ✅ Page load animations use `ease-out` (quick start, smooth landing)

---

## 📝 Adding New Animations

### Template for New Animated Component

```tsx
import { motion } from "framer-motion";
import { Variants } from "framer-motion";

const variants: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" },
  },
};

export function MyComponent() {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      variants={variants}
      viewport={{ once: true, margin: "-50px" }}
    >
      Content
    </motion.div>
  );
}
```

### Where to Define Animations

1. **CSS Keyframes** → `client/global.css` (simple, frequently used)
2. **Framer Motion** → Component file or `client/lib/animations.tsx` (complex, reusable)
3. **Custom Hooks** → `client/hooks/use-animations.ts` (logic-based animations)

---

## 🎯 Animation Timings (Recommended)

| Type | Duration | Use Case |
|------|----------|----------|
| Quick feedback | 200-300ms | Button hover, tab switch |
| Page transition | 300-400ms | Section reveal, page load |
| Micro-interaction | 500-600ms | Streak update, check animation |
| Elaborate | 700-800ms | Chart drawing, complex reveal |
| Loop | 3000-4000ms | Empty state, subtle float |

---

## 🐛 Common Issues & Solutions

| Issue | Solution |
|-------|----------|
| Animation stutters | Use only `transform` and `opacity` |
| Re-animates on scroll | Add `viewport={{ once: true }}` |
| Too fast on mobile | Increase duration by 100-200ms |
| Conflicts with CSS hover | Use Framer `whileHover` instead |
| Number animates wrong | Check `useCountUp` dependencies |
| No haptic on Android | Check browser support, add fallback |

---

**Last Updated**: April 2026 | Framer Motion version matches package.json
