# Developer Guide - Habit Grid AI Extensions

## Overview
This guide provides developers with clear instructions for extending and enhancing the Habit Grid AI application with new features while maintaining code quality and consistency.

---

## 🏗️ Architecture Principles

### 1. **Component Structure**
```
Feature Component
├── Container Component (handles state & logic)
├── Presentation Component (renders UI)
└── Hooks (custom logic)
```

**Example:**
```tsx
// Container
export default function HabitTracker() {
  const [habits, setHabits] = useState([]);
  return <HabitTrackerView habits={habits} onUpdate={setHabits} />;
}

// Presentation
function HabitTrackerView({ habits, onUpdate }) {
  return <div>{/* UI */}</div>;
}
```

### 2. **State Management**
- Use **React Context** for global state (language, theme, user)
- Use **useState** for local component state
- Use **useCallback** to memoize event handlers
- Use **useMemo** for expensive calculations

### 3. **Animations**
- Use **Framer Motion** for complex animations
- Use **Tailwind animations** for simple effects
- Keep animations < 500ms
- Support `prefers-reduced-motion`

### 4. **Styling**
- Use **Tailwind CSS** utility classes
- Create reusable component classes in `global.css`
- Follow mobile-first responsive design
- Support dark mode with `.dark` class

---

## 📱 Adding a New Feature

### Step 1: Create Component
```tsx
// client/components/habit-tracker/NewFeature.tsx
import { motion } from "framer-motion";
import { useLanguage } from "@/lib/language-context";

interface NewFeatureProps {
  data: any;
  onAction: (value: any) => void;
}

export default function NewFeature({ data, onAction }: NewFeatureProps) {
  const { t, language } = useLanguage();

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="rounded-[24px] bg-card/88 p-6 border border-border/50"
      dir={language === "ar" ? "rtl" : "ltr"}
    >
      <h3 className="text-lg font-semibold text-foreground mb-3">
        {t.newFeature?.title || "Feature Title"}
      </h3>
      {/* Feature content */}
    </motion.div>
  );
}
```

### Step 2: Add Translations
```tsx
// In translation file
export const translations = {
  en: {
    newFeature: {
      title: "Feature Title",
      description: "Feature description"
    }
  },
  ar: {
    newFeature: {
      title: "عنوان الميزة",
      description: "وصف الميزة"
    }
  }
};
```

### Step 3: Integrate into Page
```tsx
// In client/pages/Index.tsx
import NewFeature from "@/components/habit-tracker/NewFeature";

export default function Index() {
  // ... existing code

  return (
    <div className="space-y-5">
      {/* ... existing sections */}
      <NewFeature data={data} onAction={handleAction} />
    </div>
  );
}
```

### Step 4: Add Tests
```tsx
// client/components/habit-tracker/NewFeature.test.ts
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import NewFeature from "./NewFeature";

describe("NewFeature", () => {
  it("renders correctly", () => {
    render(<NewFeature data={{}} onAction={() => {}} />);
    expect(screen.getByText(/feature title/i)).toBeInTheDocument();
  });
});
```

---

## 🎨 Design System Usage

### Colors
```tsx
// Use CSS variable colors
className="bg-primary text-primary-foreground"
className="border-border text-muted-foreground"
className="bg-card shadow-soft"

// Or Tailwind colors
className="bg-green-500 text-white"
className="dark:bg-green-600 dark:text-green-100"
```

### Spacing
```tsx
// Mobile-first responsive spacing
className="p-4 sm:p-5 md:p-6"  // Padding
className="gap-3 sm:gap-4 md:gap-5"  // Gaps
className="mb-3 sm:mb-4 md:mb-6"  // Margins
```

### Animations
```tsx
// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

// Apply to motion component
<motion.div
  variants={containerVariants}
  initial="hidden"
  animate="visible"
/>
```

### Typography
```tsx
// Size and weight scale
className="text-xs sm:text-sm md:text-base"  // Size
className="font-semibold"  // Weight: 400, 500, 600, 700
className="uppercase tracking-widest"  // Letter spacing
```

---

## 🔄 Common Patterns

### Pattern 1: Data Fetching
```tsx
import { useEffect, useState } from "react";

export default function MyComponent() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/data");
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage error={error} />;
  return <div>{/* Content */}</div>;
}
```

### Pattern 2: Animation Stagger
```tsx
const items = [1, 2, 3];
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

<motion.div variants={containerVariants} initial="hidden" animate="visible">
  {items.map(item => (
    <motion.div key={item} variants={itemVariants}>
      {/* Content */}
    </motion.div>
  ))}
</motion.div>
```

### Pattern 3: Responsive Grid
```tsx
// Mobile-first grid
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
  {/* Grid items */}
</div>

// Becomes: 1 column on mobile, 2 on tablet, 4 on desktop
```

### Pattern 4: Multi-language Support
```tsx
const { t, language } = useLanguage();

return (
  <div dir={language === "ar" ? "rtl" : "ltr"}>
    <h1>{t.page.title || "Default Title"}</h1>
    <p>{t.page.description || "Default Description"}</p>
  </div>
);
```

---

## 🚀 Adding API Endpoints

### Step 1: Create Route Handler
```ts
// server/routes/my-endpoint.ts
import { RequestHandler } from "express";

export const handleMyEndpoint: RequestHandler = (req, res) => {
  try {
    const data = { message: "Hello from my endpoint" };
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};
```

### Step 2: Register Route
```ts
// server/index.ts
import { handleMyEndpoint } from "./routes/my-endpoint";

app.get("/api/my-endpoint", handleMyEndpoint);
```

### Step 3: Use in Component
```tsx
const response = await fetch("/api/my-endpoint");
const data = await response.json();
```

---

## 📊 Database Operations

### Read Example
```tsx
import supabase from "@/lib/supabaseClient";

const { data, error } = await supabase
  .from("habits")
  .select("*")
  .eq("user_id", userId);
```

### Write Example
```tsx
const { data, error } = await supabase
  .from("habits")
  .insert([
    {
      user_id: userId,
      name: "My Habit",
      created_at: new Date()
    }
  ]);
```

### Update Example
```tsx
const { data, error } = await supabase
  .from("habits")
  .update({ name: "Updated Name" })
  .eq("id", habitId);
```

---

## 🧪 Testing Guidelines

### Component Test
```tsx
import { render, screen, fireEvent } from "@testing-library/react";
import MyComponent from "./MyComponent";

test("renders and handles click", () => {
  const handleClick = vi.fn();
  render(<MyComponent onClick={handleClick} />);
  
  const button = screen.getByRole("button");
  fireEvent.click(button);
  
  expect(handleClick).toHaveBeenCalled();
});
```

### Hook Test
```tsx
import { renderHook, act } from "@testing-library/react";
import { useCounter } from "./useCounter";

test("increments counter", () => {
  const { result } = renderHook(() => useCounter());
  
  act(() => {
    result.current.increment();
  });
  
  expect(result.current.count).toBe(1);
});
```

---

## 🔐 Security Best Practices

### 1. **Never Store Secrets in Client**
```tsx
// ❌ WRONG
const API_KEY = "sk_live_abc123";

// ✅ CORRECT
const API_KEY = process.env.REACT_APP_SUPABASE_KEY;
```

### 2. **Validate User Input**
```tsx
// ✅ Validate before using
if (habitName && habitName.length > 0 && habitName.length <= 100) {
  // Use habitName
}
```

### 3. **Use HTTPS Only**
```tsx
// ✅ Always use HTTPS in production
const url = process.env.NODE_ENV === "production" 
  ? "https://api.example.com"
  : "http://localhost:3000";
```

### 4. **Sanitize User Output**
```tsx
// ✅ Use React's built-in XSS protection
<div>{userInput}</div> // Automatically escaped

// ❌ AVOID
<div dangerouslySetInnerHTML={{ __html: userInput }} />
```

---

## 🎯 Performance Optimization Tips

### 1. **Memoize Components**
```tsx
import { memo } from "react";

const HabitCard = memo(function HabitCard({ habit, onUpdate }) {
  return <div>{/* Content */}</div>;
});
```

### 2. **Memoize Values**
```tsx
const expensiveValue = useMemo(() => {
  return complexCalculation(data);
}, [data]);
```

### 3. **Lazy Load Routes**
```tsx
import { lazy, Suspense } from "react";

const LazyComponent = lazy(() => import("./LazyComponent"));

<Suspense fallback={<Loading />}>
  <LazyComponent />
</Suspense>
```

### 4. **Optimize Lists**
```tsx
// Use key prop and unique IDs
{items.map((item) => (
  <HabitCard key={item.id} habit={item} />
))}
```

---

## 📝 Code Style Guidelines

### Naming Conventions
- **Components**: PascalCase (`MyComponent`)
- **Functions**: camelCase (`handleClick`)
- **Constants**: UPPER_SNAKE_CASE (`MAX_HABITS`)
- **Files**: Match component name (`MyComponent.tsx`)

### Component Structure
```tsx
// 1. Imports
import { motion } from "framer-motion";
import { useState } from "react";

// 2. Types/Interfaces
interface MyProps {
  label: string;
  onAction: () => void;
}

// 3. Component
export default function MyComponent({ label, onAction }: MyProps) {
  // Hooks
  const [state, setState] = useState("");

  // Event handlers
  const handleClick = () => onAction();

  // Render
  return <div>{/* UI */}</div>;
}
```

### File Organization
```
Component.tsx          (main component)
Component.test.ts      (tests)
Component.stories.tsx  (storybook)
useComponent.ts        (custom hook)
Component.types.ts     (types)
```

---

## 🚨 Common Mistakes to Avoid

### ❌ Mistake 1: Missing Dependencies
```tsx
// ❌ WRONG - infinite loop
useEffect(() => {
  fetchData();
}, []); // Missing 'user' dependency

// ✅ CORRECT
useEffect(() => {
  fetchData();
}, [user]);
```

### ❌ Mistake 2: Direct State Mutation
```tsx
// ❌ WRONG
setState(prevState => {
  prevState.items.push(newItem); // Mutating directly
  return prevState;
});

// ✅ CORRECT
setState(prevState => ({
  ...prevState,
  items: [...prevState.items, newItem]
}));
```

### ❌ Mistake 3: Missing Keys in Lists
```tsx
// ❌ WRONG
{items.map((item, index) => (
  <div key={index}>{item}</div> // Index as key
))}

// ✅ CORRECT
{items.map((item) => (
  <div key={item.id}>{item}</div>
))}
```

### ❌ Mistake 4: Over-rendering
```tsx
// ❌ WRONG - rerenders on every parent update
function ParentComponent() {
  return <ChildComponent data={data} />;
}

// ✅ CORRECT - only rerenders if data changes
const ChildComponent = memo(function Child({ data }) {
  return <div>{data}</div>;
});
```

---

## 🔧 Troubleshooting

### Animation Not Working
1. Check Framer Motion is imported
2. Verify animation syntax matches Framer Motion API
3. Check `initial`, `animate`, `transition` props
4. Use browser DevTools to inspect applied styles

### Component Not Re-rendering
1. Check state update syntax
2. Verify array/object spreads
3. Check dependency array in useEffect
4. Use React DevTools Profiler

### Styling Not Applied
1. Check class name syntax
2. Verify Tailwind is configured
3. Check responsive breakpoints (mobile-first)
4. Look for conflicting CSS specificity

### Translation Not Working
1. Check key exists in translation file
2. Verify language context is initialized
3. Check language switch functionality
4. Review RTL attributes

---

## 📚 Resources

- [Framer Motion Docs](https://www.framer.com/motion/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [React Hooks API](https://react.dev/reference/react)
- [Radix UI Components](https://www.radix-ui.com/docs/primitives/overview/introduction)
- [Supabase Docs](https://supabase.com/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

---

## 🤝 Contributing Guidelines

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

---

## 📄 License

This project is part of Habit Grid AI. All rights reserved.

---

**Last Updated**: April 2026  
**Version**: 1.0
