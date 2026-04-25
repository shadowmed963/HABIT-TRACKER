# Habit Tracker Web App - Comprehensive Codebase Overview

**Date**: April 2026  
**Project**: Niyyah Daily - AI-Powered Habit Tracking Platform  
**Tech Stack**: React 18 + React Router 6 + Express + Supabase + TailwindCSS

---

## 1. PROJECT ARCHITECTURE

### Overall Structure
```
Root
├── client/                 # React SPA (frontend)
├── server/                 # Express API backend  
├── shared/                 # Shared types and utilities
├── public/                 # Static assets
├── netlify/functions/      # Serverless functions
├── package.json            # Project dependencies
├── vite.config.ts          # Vite dev/build config
├── tailwind.config.ts      # TailwindCSS theming
└── supabase-setup.sql      # Database schema
```

### Development Setup
- **Build Tool**: Vite (fast HMR, optimized builds)
- **Styling**: TailwindCSS 3 with custom theme system
- **State Management**: React hooks (local state + context)
- **HTTP Client**: Fetch API (no external HTTP library)
- **Data Persistence**: Supabase + localStorage fallback
- **Package Manager**: pnpm

### Entry Point
- **App Root**: [client/App.tsx](client/App.tsx)
- **Main Page**: [client/pages/Index.tsx](client/pages/Index.tsx)
- **Server**: [server/index.ts](server/index.ts)

---

## 2. ROUTING & PAGE STRUCTURE

### React Router Setup (SPA Mode)
Routes are defined in [client/App.tsx](client/App.tsx):

```typescript
<Routes>
  <Route path="/" element={<Index />} />           // Dashboard/main app
  <Route path="/dashboard" element={<Index />} />  // Alias for /
  <Route path="*" element={<NotFound />} />        // Catch-all
</Routes>
```

### Pages
| File | Path | Purpose |
|------|------|---------|
| [Index.tsx](client/pages/Index.tsx) | `/` | Main dashboard - core app experience |
| [Landing.tsx](client/pages/Landing.tsx) | Used by Index | Landing/marketing section |
| [Grid.tsx](client/pages/Grid.tsx) | Standalone | Habit grid display (backup/utility page) |
| [Chart.tsx](client/pages/Chart.tsx) | Standalone | Progress chart visualization |
| [NotFound.tsx](client/pages/NotFound.tsx) | `*` | 404 page |

### Primary User Flow
1. **Landing View** → First-time visitors see marketing page
2. **Authentication** → Login/signup via AuthPanel
3. **AI Quiz** → Users answer 3 questions (goal, time, type)
4. **Habit Suggestions** → AI generates personalized habits
5. **Dashboard** → Main hub showing all active habits

---

## 3. CORE COMPONENTS STRUCTURE

### Habit Tracker Components ([client/components/habit-tracker/](client/components/habit-tracker/))

#### Dashboard Components
- **[DashboardHeader.tsx](client/components/habit-tracker/DashboardHeader.tsx)** - Header with user greeting
- **[ProgressCircle.tsx](client/components/habit-tracker/ProgressCircle.tsx)** - Circular progress indicator (today's completion %)
- **[ProgressOverview.tsx](client/components/habit-tracker/ProgressOverview.tsx)** - Stats overview section
- **[ProgressChart.tsx](client/components/habit-tracker/ProgressChart.tsx)** - Line/area chart for trend tracking
- **[StatisticsPanel.tsx](client/components/habit-tracker/StatisticsPanel.tsx)** - KPIs: total habits, completion rate, streak

#### Habit Management
- **[HabitGrid.tsx](client/components/habit-tracker/HabitGrid.tsx)** - Main 30-day grid visualization
  - Shows 30 columns (days) × N rows (habits)
  - Toggle completion for each day
  - Remove habits
  - Display streaks
  - Notifications UI
  
- **[HabitCards.tsx](client/components/habit-tracker/HabitCards.tsx)** - Horizontal card carousel
  - Quick habit overview
  - Streak display
  - Progress percentage
  - Category labels

- **[HabitSuggestions.tsx](client/components/habit-tracker/HabitSuggestions.tsx)** - Suggested habits display

#### AI & Onboarding
- **[AIHabitQuiz.tsx](client/components/habit-tracker/AIHabitQuiz.tsx)** - 3-step quiz component
  - Q1: Main goal (8 options)
  - Q2: Daily time available (6 options)
  - Q3: Preferred type (7 options)
  - Results with custom habit addition
  
- **[EnhancedOnboarding.tsx](client/components/habit-tracker/EnhancedOnboarding.tsx)** - Welcome flow
- **[OnboardingWelcome.tsx](client/components/habit-tracker/OnboardingWelcome.tsx)** - Initial greeting

#### Authentication & User
- **[AuthPanel.tsx](client/components/habit-tracker/AuthPanel.tsx)** - Login/signup form
  - Email + password
  - Name input (signup only)
  - Form validation
  - Error handling
  
- **[user-storage.ts](client/components/habit-tracker/user-storage.ts)** - User auth logic
  - Supabase integration
  - Local storage fallback
  - Account creation/loading/updating

#### Notifications & Feedback
- **[DailyAIMessage.tsx](client/components/habit-tracker/DailyAIMessage.tsx)** - Daily AI motivation message
- **[MilestoneNotification.tsx](client/components/habit-tracker/MilestoneNotification.tsx)** - Achievement/streak notifications
- **[StreakBadge.tsx](client/components/habit-tracker/StreakBadge.tsx)** - Streak display component
- **[EmptyState.tsx](client/components/habit-tracker/EmptyState.tsx)** - No habits message

#### Data Models
- **[habit-data.ts](client/components/habit-tracker/habit-data.ts)** - Core habit logic (~1000+ lines)
  - `HabitItem` - Active habit with 30-day completion history
  - `HabitSuggestion` - AI-suggested habit
  - `QuizAnswers` - User responses
  - Habit pools by category (Religious, Study, Mental, Physical, Mindfulness, Work)
  - `buildHabitSuggestions()` - AI suggestion algorithm
  - Statistics functions (streak, completion rate, best/worst habit)

### Layout Components
- **[AppShell.tsx](client/components/layout/AppShell.tsx)** - Main app wrapper
  - Header with branding
  - Theme toggle
  - Language switcher (EN/AR)
  - Instagram link
  - Navigation

### UI Component Library ([client/components/ui/](client/components/ui/))
Pre-built Radix UI + TailwindCSS components (40+ components):
- Button, Input, Card, Dialog, Dropdown, Select, etc.
- Fully typed and accessible
- Dark mode support

---

## 4. EXISTING ANIMATION SYSTEM

### Animation Framework
- **Library**: Framer Motion 12.x
- **Location**: [client/lib/animations.tsx](client/lib/animations.tsx)
- **Hooks**: [client/hooks/use-animations.ts](client/hooks/use-animations.ts)

### Pre-built Animation Components

#### 1. **FadeInUp** - Page load animation
```tsx
<FadeInUp delay={0.1} duration={0.4}>
  Content fades in and slides up
</FadeInUp>
```

#### 2. **HabitCheckAnimation** - Habit toggle feedback
- Scale pulse effect (1 → 1.1 → 1)
- Green glow effect expanding outward

#### 3. **StreakAnimation** - Milestone celebration
- Bounce scale animation
- Green halo glow

#### 4. **General Motion Components**
- Stagger animations for lists
- Hover effects (scale, shadow)
- Transition timings (0.3s-0.6s)

### Animation Hooks

#### `useInViewAnimation(triggerOnLoad)`
- Intersection Observer pattern
- Triggers animation when element enters viewport
- Used for lazy animation on scroll

#### `useInteractionAnimation(resetDelay)`
- Trigger animation on user interaction
- Auto-resets after delay
- Returns: `{ animate, trigger, reset }`

#### `useCountUp(end, duration, shouldStart)`
- Animates number from 0 to target
- Smooth frame-based counting
- Used for stat displays

#### `useHapticFeedback()`
- Vibration API integration
- Cross-device haptic feedback

### Animation Patterns Used Throughout
- **Page transitions**: Smooth fade + slide
- **Component appearance**: Staggered entrance with delays
- **User interactions**: Immediate visual feedback (scale, glow)
- **Data updates**: Counter animations for statistics

---

## 5. MULTI-LANGUAGE IMPLEMENTATION

### Language System
- **Supported Languages**: English (en), Arabic (ar), planned French (fr)
- **Current Implementation**: English only (single language object)
- **Storage**: localStorage with key `niyyah-language`

### Context Setup
**[client/lib/language-context.tsx](client/lib/language-context.tsx)**
```typescript
interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: ReturnType<typeof getTranslations>;
}
```

### Translation Object
**[client/lib/translations.ts](client/lib/translations.ts)** - ~400+ translation keys organized by section:
```
auth, header, hero, quiz, options, habits, grid, chart, 
statistics, common, notifications, onboarding
```

### RTL Support
- Direction attribute set via context: `dir={language === "ar" ? "rtl" : "ltr"}`
- Components handle RTL layout automatically
- TailwindCSS utilities support RTL

### useLanguage Hook
Used in components to access translations:
```tsx
const { t, language, setLanguage } = useLanguage();
```

---

## 6. SUPABASE INTEGRATION

### Architecture
- **Configuration**: [client/lib/supabaseClient.ts](client/lib/supabaseClient.ts)
- **Env Variables**: `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`
- **Fallback**: Full local storage fallback when Supabase unconfigured

### Database Schema

#### Tables
1. **users** (Auth-linked)
   - `id` (UUID, references auth.users)
   - `email` (unique)
   - `name`
   - `user_code` (unique)
   - `habits` (JSONB array)
   - `onboarding_complete` (boolean)
   - `created_at`, `updated_at` (timestamps)

2. **user_profiles** (Non-auth fallback)
   - `id` (UUID primary)
   - `email` (unique)
   - `name`
   - `created_at`, `updated_at`

3. **user_habits** (Non-auth fallback, linked to user_profiles)
   - `id` (UUID primary)
   - `user_id` (unique, FK to user_profiles)
   - `habits` (JSONB array)
   - `onboarding_complete` (boolean)
   - `updated_at`

#### Security
- Row-Level Security (RLS) enabled on all tables
- Policies restrict users to own data
- Email-based ownership verification

### Key Functions

#### Auth
- `signUpWithPassword(email, password, name)` - Register
- `signInWithPassword(email, password)` - Login
- `getCurrentUser()` - Get authenticated user
- `signOut()` - Logout

#### User Profile Management
- `saveUserProfile(email, name)` - Create/update profile
- `getUserProfile(email)` - Fetch profile
- `loadUserFromSupabase(email)` - Full user data load

#### Habits Management
- `saveUserHabits(email, habits, onboarding_complete)` - Save habits
- `getUserHabits(email)` - Fetch habits
- `completeOnboarding(email, habits)` - Mark onboarding complete

### Dual Storage Strategy
1. **Supabase-First** (if configured)
   - Auth state managed by Supabase
   - User data stored in DB
   - Sync on app load and state changes

2. **localStorage Fallback** (if not configured)
   - Stored as JSON under key: user data
   - Functions in [user-storage.ts](client/components/habit-tracker/user-storage.ts) handle both

---

## 7. UI COMPONENT LIBRARY

### TailwindCSS System
**[tailwind.config.ts](tailwind.config.ts)** defines:

#### Color Palette
- **Primary**: Green (`--primary`, `calm-500`)
- **Secondary**: Blue (`--secondary`, `serene-500`)
- **Accent Colors**: Calm, Serene, Neutral
- **Semantic**: Destructive, Muted, Popover, Card, Sidebar
- **Dark Mode**: Full dark color variants

#### Theme Variables
Defined in [client/global.css](client/global.css) using CSS custom properties:
- `--background`, `--foreground`
- `--primary`, `--primary-foreground`
- `--secondary`, `--secondary-foreground`
- `--border`, `--ring`, `--input`

#### Components (Radix UI + TailwindCSS)
Located in [client/components/ui/](client/components/ui/):
- Form: Input, Textarea, Checkbox, Radio, Select, Toggle
- Dialog: Dialog, AlertDialog, Popover, Dropdown
- Navigation: Breadcrumb, Command, NavigationMenu
- Data: Carousel, Calendar, Progress, Slider
- Display: Badge, Avatar, Card, Separator, Alert
- 40+ total components

---

## 8. AUTHENTICATION IMPLEMENTATION

### Flow
1. **Landing Page** → User chooses Login or Signup
2. **AuthPanel** collects credentials
3. **Local or Supabase Auth** processes request
4. **User Account** created/loaded
5. **AI Quiz** initiates (if new user)
6. **Habits** added from AI suggestions or custom

### Components
- **[AuthPanel.tsx](client/components/habit-tracker/AuthPanel.tsx)** - UI form
- **[user-storage.ts](client/components/habit-tracker/user-storage.ts)** - Business logic

### Methods
- **Login**: Email + password
- **Signup**: Email + password + name
- **Google Sign-In**: Placeholder (not implemented)

### User States
```typescript
interface ActiveUserState {
  id: string;
  email: string;
  name: string;
  created_at: string;
  habits: HabitItem[];
  onboardingComplete: boolean;
}
```

---

## 9. DATA MODELS & STRUCTURES

### Core Models

#### HabitItem (Active Habit)
```typescript
interface HabitItem {
  id: string;                           // Unique identifier
  name: string;                         // Display name
  category: string;                     // Category
  cadence: string;                      // "Daily", "3-4 times weekly", etc.
  completions: boolean[];               // 30-day boolean array
  notificationTime?: string;            // "HH:mm" format
  notificationEnabled?: boolean;        // Notification toggle
}
```

#### HabitSuggestion (AI Suggested)
```typescript
interface HabitSuggestion {
  id?: string;
  name: string;
  category: string;
  cadence?: string;
  reason?: string;
  description?: string;
  estimatedTime?: string;
}
```

#### QuizAnswers (User Responses)
```typescript
interface QuizAnswers {
  goal?: MainGoal;                      // 8 options
  dailyTime?: DailyTime;                // 6 options
  preferredType?: PreferredType;        // 7 options
}
```

### AI Habit Suggestion Algorithm

Located in [habit-data.ts](client/components/habit-tracker/habit-data.ts):

**Input**: User answers to 3 quiz questions

**Process**:
1. Determine max suggestions based on `dailyTime`
   - 5 min → 2 habits
   - 10 min → 3 habits
   - 20 min → 5 habits
   - 30+ min → 8-10 habits

2. If `preferredType` selected:
   - Fetch category-specific habit pool
   - Shuffle for variety
   - Return top N

3. Else if `goal` selected:
   - Use goal-based suggestion map
   - Combine with religious habits

4. Else:
   - Default to religious habits

5. Deduplicate and limit

**Output**: Array of 2-10 habit suggestions

### Habit Pools
Six pre-built pools with 10-12 habits each:

| Category | Focus | Key Habits |
|----------|-------|-----------|
| **Religious** | Spirituality | Prayer, Quran, Dhikr, Charity |
| **Study** | Learning | Focus study, Review notes, Spaced repetition |
| **Mental** | Cognition | Journaling, Reading, Learning words |
| **Physical** | Health | Stretching, Walking, Exercise |
| **Mindfulness** | Wellness | Meditation, Breathing, No phone |
| **Work** | Productivity | Task planning, Deep work, Inbox zero |

### Statistics Functions
In [habit-data.ts](client/components/habit-tracker/habit-data.ts):

- `getCompletionRate(habits)` - % of all days completed
- `getWeeklyChartData(habits)` - Last 7 days data
- `getAllDaysChartData(habits)` - All 30 days data
- `getSuccessRate(habits)` - Success % by habit
- `getBestHabit(habits)` - Highest completion habit
- `getWorstHabit(habits)` - Lowest completion habit
- `getCurrentStreakFromDay(habits)` - Current streak length
- `getLongestCurrentStreak(habits)` - Best streak across habits

---

## 10. EXPRESS SERVER & API

### Server Setup
**[server/index.ts](server/index.ts)**

#### Routes
| Method | Endpoint | Purpose |
|--------|----------|---------|
| GET | `/api/ping` | Health check |
| GET | `/api/demo` | Demo endpoint |
| POST | `/api/users/create-profile` | Create user profile (service role) |

#### Middleware
- CORS enabled
- JSON/URL-encoded parsing
- Static file serving (production only)
- SPA fallback routing

### Route Handlers
- **[demo.ts](server/routes/demo.ts)** - Example endpoint
- **[create-user.ts](server/routes/create-user.ts)** - User creation with service role key

---

## 11. BUILD & DEPLOYMENT

### Development
```bash
pnpm dev      # Start dev server (Vite + Express integration)
```
- Single port (8080) for frontend + backend
- Hot module reloading enabled
- Both client and server auto-reload on code changes

### Production Build
```bash
pnpm build    # Client + server build
pnpm start    # Run production server
```

#### Build Process
1. **Client Build** - Vite bundles React SPA to `dist/spa`
2. **Server Build** - Vite builds Node.js server to `dist/server`
3. **Output**: Self-contained executable for Linux/macOS/Windows

### Deployment Options
- **Netlify** - Via MCP integration
- **Vercel** - Via MCP integration
- **Self-hosted** - Node.js server with static files

---

## 12. FILE ORGANIZATION & PATTERNS

### Import Aliases
```typescript
import { Component } from "@/components/...";    // client/
import { Type } from "@shared/api";              // shared/
```

### Code Organization Principles
- **Components**: Functional with hooks
- **State**: React context + hooks (no Redux)
- **Styling**: TailwindCSS utility classes + CSS variables
- **Types**: TypeScript interfaces (no enums)
- **Utilities**: Pure functions in dedicated files

### Key Patterns
1. **Local State** - `useState` for component state
2. **Global State** - React Context (language, theme)
3. **Side Effects** - `useEffect` with proper cleanup
4. **Memoization** - `useMemo` for expensive computations
5. **Animations** - Framer Motion for UI feedback
6. **Forms** - React Hook Form + Zod (implied in deps)

---

## 13. CURRENT STRENGTHS

✅ **Well-Structured Architecture**
- Clear separation of concerns (client/server/shared)
- SPA with proper routing
- Type-safe throughout with TypeScript

✅ **Rich Animation System**
- Multiple animation patterns (fade, bounce, glow)
- Smooth user feedback
- Performance-optimized with Framer Motion

✅ **Comprehensive Habit System**
- AI-powered quiz-based suggestions
- 60+ pre-built habits across 6 categories
- Intelligent shuffling and deduplication

✅ **Multi-User Support**
- Supabase auth integration
- User isolation with RLS
- Dual storage (Supabase + localStorage)

✅ **Modern UI**
- Accessible Radix UI components
- Beautiful TailwindCSS design system
- Dark mode support
- Responsive design

✅ **Multi-Language Ready**
- Translation infrastructure in place
- RTL support (Arabic)
- Context-based language switching

---

## 14. AREAS FOR POTENTIAL UPGRADES

⚠️ **Recommended Improvements**

### Architecture & Code Quality
- [ ] Implement proper state management (Zustand/Jotai vs context)
- [ ] Add comprehensive error boundaries
- [ ] Refine logging/monitoring system
- [ ] Add request error handling layer

### Features
- [ ] Complete multi-language support (French, Spanish, etc.)
- [ ] Google/OAuth authentication
- [ ] Habit reminders/push notifications
- [ ] Habit sharing between users
- [ ] Habit templates/library
- [ ] Advanced analytics dashboard
- [ ] Habit groups/collections

### Testing
- [ ] Add E2E tests (Playwright/Cypress)
- [ ] Add component testing (React Testing Library)
- [ ] Current test coverage appears minimal

### Performance
- [ ] Code splitting for route-based bundles
- [ ] Lazy loading for heavy components
- [ ] Image optimization
- [ ] API response caching strategy

### Database
- [ ] Add habit categories table (relational)
- [ ] Add user preferences/settings table
- [ ] Implement data backup strategy
- [ ] Add audit logging

### DevOps
- [ ] Add CI/CD pipeline
- [ ] Environment configuration management
- [ ] Sentry/error tracking
- [ ] Analytics integration

---

## 15. KEY FILES REFERENCE

### Essential Files to Understand First
1. [client/App.tsx](client/App.tsx) - App entry point & routing
2. [client/pages/Index.tsx](client/pages/Index.tsx) - Main dashboard
3. [client/components/habit-tracker/habit-data.ts](client/components/habit-tracker/habit-data.ts) - Habit logic
4. [client/lib/supabaseClient.ts](client/lib/supabaseClient.ts) - Database integration
5. [server/index.ts](server/index.ts) - API server

### Configuration Files
- [vite.config.ts](vite.config.ts) - Build config
- [tailwind.config.ts](tailwind.config.ts) - Styling config
- [tsconfig.json](tsconfig.json) - TypeScript config
- [package.json](package.json) - Dependencies

### Database
- [supabase-setup.sql](supabase-setup.sql) - Schema definition
- [supabase-migration-user-isolation.sql](supabase-migration-user-isolation.sql) - RLS policies

---

## 16. GLOSSARY

| Term | Definition |
|------|-----------|
| **HabitItem** | An active habit with 30-day completion tracking |
| **HabitSuggestion** | An AI-recommended habit from the pool |
| **Quiz** | 3-question onboarding to determine habit preferences |
| **Cadence** | Frequency of habit (Daily, 3-4 times weekly, etc.) |
| **Completion Rate** | % of total possible completions achieved |
| **Streak** | Consecutive days a habit was completed |
| **Grid** | 30-day × N-habit visualization matrix |
| **RLS** | Row-Level Security (database-level access control) |

---

## SUMMARY

This is a **production-ready habit tracking application** with:
- Modern React SPA architecture
- AI-powered habit suggestions
- Beautiful, accessible UI
- Multi-user support with database persistence
- Comprehensive animation system
- Internationalization framework

The codebase is well-organized, typed, and follows React best practices. It's ready for feature expansion and deployment.

