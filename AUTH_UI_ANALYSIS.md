# AuthPanel.tsx - Detailed UI/UX Analysis Report

## Critical Issues Found

### 🔴 CRITICAL ISSUES (Breaking/Non-Functional)

#### 1. **Missing Button CSS Classes - LINE 201**
**Severity:** CRITICAL - Button is unstyled/broken
**File:** [client/components/habit-tracker/AuthPanel.tsx](client/components/habit-tracker/AuthPanel.tsx#L201)
**Problem:**
```tsx
<button
  type="submit"
  className={`mt-5 w-full h-12 btn btn-primary`}
>
```
- The CSS classes `btn` and `btn-primary` do **NOT exist** in the codebase
- No button styling defined in `client/global.css` or `tailwind.config.ts`
- Button will be unstyled and hard to click/interact with
- This is a **production-breaking issue**

**Solution:**
Should use proper Tailwind classes:
```tsx
className="mt-5 w-full h-12 rounded-2xl bg-primary text-primary-foreground hover:bg-primary/90 font-semibold transition-colors flex items-center justify-center gap-2"
```
Or import and use the `Button` component from `client/components/ui/button.tsx`

---

#### 2. **No Loading/Disabled State During Form Submission - LINE 201**
**Severity:** CRITICAL - UX issue, users can click multiple times
**File:** [client/components/habit-tracker/AuthPanel.tsx](client/components/habit-tracker/AuthPanel.tsx#L16-L48)
**Problem:**
- The form accepts async `onSubmit` which can take 2-5+ seconds (Supabase API calls)
- Button has NO `disabled` state while submission is in progress
- No loading spinner or visual feedback during submission
- Users can click submit multiple times, causing duplicate requests
- No feedback that authentication is happening

**Missing state variable:**
```tsx
const [isSubmitting, setIsSubmitting] = useState(false);

// In handleSubmit:
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setError(null);
  setIsSubmitting(true);  // ← MISSING
  
  // ... validation ...
  
  const result = await onSubmit(mode, { ... });
  
  setIsSubmitting(false);  // ← MISSING
  // ...
};
```

**Button should have:**
```tsx
<button
  type="submit"
  disabled={isSubmitting}
  className="mt-5 w-full h-12 ... disabled:opacity-50 disabled:cursor-not-allowed"
>
  {isSubmitting ? (
    <>
      <Loader className="h-4 w-4 animate-spin" />
      <span>Loading...</span>
    </>
  ) : (
    <>
      {mode === "login" ? <LogIn className="h-4 w-4" /> : <UserRoundPlus className="h-4 w-4" />}
      <span>{mode === "login" ? t.auth.loginButton : t.auth.createAccountButton}</span>
    </>
  )}
</button>
```

---

#### 3. **No Password Visibility Toggle**
**Severity:** HIGH - Password field usability issue
**File:** [client/components/habit-tracker/AuthPanel.tsx](client/components/habit-tracker/AuthPanel.tsx#L177-L189)
**Problem:**
```tsx
<input
  id="password"
  type="password"
  value={password}
  onChange={(event) => {
    setPassword(event.target.value);
    setError(null);
  }}
  placeholder={...}
  className="h-12 w-full rounded-2xl border border-border bg-secondary/20 px-4 text-sm outline-none transition placeholder:text-muted-foreground focus:border-primary"
/>
```
- Password is hidden as `type="password"`
- No toggle button to show/hide password
- Users cannot verify they typed their password correctly
- Mobile users especially struggle with this
- Best practice: Always include password visibility toggle

**Should implement:**
```tsx
const [showPassword, setShowPassword] = useState(false);

// In the input wrapper:
<div className="relative">
  <input
    id="password"
    type={showPassword ? "text" : "password"}
    // ... other props
  />
  <button
    type="button"
    onClick={() => setShowPassword(!showPassword)}
    className="absolute right-3 top-1/2 -translate-y-1/2 p-2"
    aria-label={showPassword ? "Hide password" : "Show password"}
  >
    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
  </button>
</div>
```

---

### 🟡 MAJOR ISSUES (Accessibility & UX)

#### 4. **Missing ARIA Labels and Accessibility Attributes - LINES 134-189**
**Severity:** HIGH - Accessibility violation
**File:** [client/components/habit-tracker/AuthPanel.tsx](client/components/habit-tracker/AuthPanel.tsx#L134-L189)
**Problem:**
```tsx
<input
  id="name"
  value={name}
  onChange={(event) => {
    setName(event.target.value);
    setError(null);
  }}
  placeholder={t.auth.namePlaceholder}
  className="h-12 w-full rounded-2xl border border-border bg-secondary/20 px-4 text-sm outline-none transition placeholder:text-muted-foreground focus:border-primary"
/>
```

**Missing attributes:**
- ❌ No `aria-label` or `aria-describedby` (relies on placeholder which disappears)
- ❌ No `aria-invalid` when there's an error
- ❌ No `aria-errormessage` pointing to error text
- ❌ No `aria-required` for required fields
- ❌ No `aria-live="polite"` on error messages for screen readers
- ❌ No `required` attribute on inputs

**WCAG 2.1 Violations:**
- Level A: Missing form labels (4.1.2)
- Level A: Missing error identification (3.3.1)
- Level A: Missing required field indication (3.3.2)

**Fix:**
```tsx
<div>
  <label 
    className="mb-2 flex items-center gap-2 text-sm font-medium text-foreground" 
    htmlFor="email"
  >
    <UserRound className="h-4 w-4 text-primary" />
    {t.auth.emailLabel}
    <span className="text-destructive" aria-label="required">*</span>
  </label>
  <input
    id="email"
    type="email"
    value={email}
    onChange={(event) => {
      setEmail(event.target.value);
      setError(null);
    }}
    placeholder={t.auth.emailPlaceholder}
    required
    aria-invalid={error ? "true" : "false"}
    aria-errormessage={error ? "auth-error" : undefined}
    aria-describedby={error ? "auth-error" : undefined}
    className="h-12 w-full rounded-2xl border border-border bg-secondary/20 px-4 text-sm outline-none transition placeholder:text-muted-foreground focus:border-primary"
  />
</div>
```

---

#### 5. **Error Messages Not Associated with Form Fields - LINES 196-200**
**Severity:** HIGH - Accessibility + usability
**File:** [client/components/habit-tracker/AuthPanel.tsx](client/components/habit-tracker/AuthPanel.tsx#L196-L200)
**Problem:**
```tsx
{error ? (
  <p className="mt-4 rounded-2xl border border-destructive/20 bg-destructive/10 px-4 py-3 text-sm font-medium text-destructive">
    {error}
  </p>
) : (
  <p className="mt-4 rounded-2xl border border-primary/15 bg-primary/5 px-4 py-3 text-sm text-muted-foreground">
    {mode === "login"
      ? t.auth.infoLoginMessage
      : t.auth.infoSignupMessage}
  </p>
)}
```

**Issues:**
- ❌ Error message displayed at bottom of form, far from input
- ❌ No `role="alert"` or `aria-live` on error message
- ❌ No `id="auth-error"` for `aria-errormessage` linking
- ❌ Screen readers won't announce the error automatically
- ❌ Doesn't highlight which specific field has the problem
- ❌ Generic error - doesn't indicate if it's email, password, or network error

**Better approach:** Show field-level errors
```tsx
{/* Name field */}
{mode === "signup" && (
  <div>
    <label>...</label>
    <input {...} />
    {error?.field === 'name' && (
      <p id="name-error" role="alert" className="mt-1 text-sm text-destructive">
        {error.message}
      </p>
    )}
  </div>
)}
```

---

#### 6. **No Validation Error Styling on Input Fields - LINES 134-189**
**Severity:** MEDIUM - UX issue
**File:** [client/components/habit-tracker/AuthPanel.tsx](client/components/habit-tracker/AuthPanel.tsx#L134-L189)
**Problem:**
- Input fields don't change appearance when there's a validation error
- Only the generic error message appears at the bottom
- Users don't know which field caused the error
- `focus:border-primary` but no error state styling

**Should add:**
```tsx
const hasEmailError = error?.includes('email') || error?.includes('Email');

<input
  id="email"
  type="email"
  // ... props
  className={cn(
    "h-12 w-full rounded-2xl border bg-secondary/20 px-4 text-sm outline-none transition placeholder:text-muted-foreground",
    hasEmailError 
      ? "border-destructive focus:border-destructive" 
      : "border-border focus:border-primary"
  )}
/>
```

---

#### 7. **Form Label Not Using Standard HTML Label Component - LINES 134-189**
**Severity:** MEDIUM - Accessibility + usability
**File:** [client/components/habit-tracker/AuthPanel.tsx](client/components/habit-tracker/AuthPanel.tsx#L134-L189)
**Problem:**
```tsx
<label className="mb-2 flex items-center gap-2 text-sm font-medium text-foreground" htmlFor="name">
  <UserRound className="h-4 w-4 text-primary" />
  {t.auth.nameLabel}
</label>
```
- Labels should have proper spacing and styling
- No visual feedback on label when input is focused
- The UI library has a `Label` component in `client/components/ui/label.tsx` that's not being used
- This is inconsistent with the design system

**Should use:**
```tsx
import { Label } from "@/components/ui/label";

<Label htmlFor="name" className="flex items-center gap-2">
  <UserRound className="h-4 w-4 text-primary" />
  {t.auth.nameLabel}
</Label>
```

---

### 🟡 MAJOR ISSUES (Form Validation & Functionality)

#### 8. **Minimal Email Validation - LINES 27-29**
**Severity:** MEDIUM - Validation issue
**File:** [client/components/habit-tracker/AuthPanel.tsx](client/components/habit-tracker/AuthPanel.tsx#L27-L29)
**Problem:**
```tsx
if (!email.trim()) {
  setError(t.auth.emailRequired);
  return;
}
```
- Only checks if email is empty
- **Doesn't validate email format** (RFC 5322 compliant)
- User can enter "notanemail" and proceed to server
- Server will reject it, causing unnecessary round trip
- Bad UX: Users waste time only to see error after submission

**Better approach:**
```tsx
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

if (!email.trim()) {
  setError(t.auth.emailRequired);
  return;
}

if (!emailRegex.test(email)) {
  setError(t.auth.invalidEmail); // Need translation
  return;
}
```

---

#### 9. **No Password Strength Validation for Signup - LINES 27-43**
**Severity:** MEDIUM - Security + UX
**File:** [client/components/habit-tracker/AuthPanel.tsx](client/components/habit-tracker/AuthPanel.tsx#L27-L43)
**Problem:**
```tsx
// Login without a legacy code is allowed for local fallback; Supabase will require a password.

const result = await onSubmit(mode, {
  email: email.trim(),
  name: mode === "signup" ? name.trim() : undefined,
  password: password.trim() || undefined,
});
```
- **Signup allows empty/weak passwords** (password is optional: `password.trim() || undefined`)
- No minimum length validation (Supabase might have a default, but client doesn't enforce)
- No password strength indicator
- Users don't know what password requirements are
- Supabase will reject weak passwords with error, causing bad UX

**Should validate:**
```tsx
if (mode === "signup" && !password.trim()) {
  setError(t.auth.passwordRequired);
  return;
}

if (mode === "signup" && password.length < 8) {
  setError(t.auth.passwordTooShort); // Need translation
  return;
}

const passwordStrength = validatePasswordStrength(password);
if (!passwordStrength.valid) {
  setError(passwordStrength.message);
  return;
}
```

---

#### 10. **No Name Length Validation for Signup - LINE 36**
**Severity:** LOW - Validation issue
**File:** [client/components/habit-tracker/AuthPanel.tsx](client/components/habit-tracker/AuthPanel.tsx#L36)
**Problem:**
```tsx
if (mode === "signup" && !name.trim()) {
  setError(t.auth.nameRequired);
  return;
}
```
- Only checks if name is empty
- Allows single character names
- Allows extremely long names (could cause UI issues)
- No validation for special characters

**Should add:**
```tsx
if (mode === "signup" && !name.trim()) {
  setError(t.auth.nameRequired);
  return;
}

if (name.trim().length < 2) {
  setError(t.auth.nameMinLength); // "Name must be at least 2 characters"
  return;
}

if (name.trim().length > 50) {
  setError(t.auth.nameMaxLength); // "Name must be less than 50 characters"
  return;
}
```

---

### 🟠 MEDIUM ISSUES (Styling & Responsiveness)

#### 11. **Input Fields Use Inline Styles Instead of Input Component - LINES 134-189**
**Severity:** MEDIUM - Code quality + inconsistency
**File:** [client/components/habit-tracker/AuthPanel.tsx](client/components/habit-tracker/AuthPanel.tsx#L134-L189)
**Problem:**
```tsx
<input
  id="email"
  type="email"
  value={email}
  onChange={(event) => {
    setEmail(event.target.value);
    setError(null);
  }}
  placeholder={t.auth.emailPlaceholder}
  className="h-12 w-full rounded-2xl border border-border bg-secondary/20 px-4 text-sm outline-none transition placeholder:text-muted-foreground focus:border-primary"
/>
```
- **NOT using the `Input` component** from `client/components/ui/input.tsx`
- Inconsistent with design system
- Custom inline styling means changes must be made in multiple places
- Missing standard form states: disabled, readonly, invalid

**Should use:**
```tsx
import { Input } from "@/components/ui/input";

<Input
  id="email"
  type="email"
  value={email}
  onChange={(event) => {
    setEmail(event.target.value);
    setError(null);
  }}
  placeholder={t.auth.emailPlaceholder}
  aria-invalid={error ? "true" : "false"}
  aria-errormessage={error ? "auth-error" : undefined}
/>
```

---

#### 12. **Modal Toggle Buttons Not Using Button Component - LINES 101-122**
**Severity:** MEDIUM - Code quality + accessibility
**File:** [client/components/habit-tracker/AuthPanel.tsx](client/components/habit-tracker/AuthPanel.tsx#L101-L122)
**Problem:**
```tsx
<button
  type="button"
  onClick={() => {
    setMode("login");
    setError(null);
  }}
  className={`rounded-2xl px-4 py-3 text-sm font-semibold transition ${
    mode === "login"
      ? "bg-card text-foreground shadow-sm"
      : "text-muted-foreground hover:text-foreground"
  }`}
>
  {t.auth.logIn}
</button>
```
- Not using the `Button` component from UI library
- Custom inline styling
- Missing standard button states: focus ring, active state, disabled state
- No consistent focus-visible styling
- Buttons look clickable but no visual feedback on focus (keyboard nav)

**Should use Button component:**
```tsx
import { Button } from "@/components/ui/button";

<Button
  type="button"
  onClick={() => {
    setMode("login");
    setError(null);
  }}
  variant={mode === "login" ? "default" : "ghost"}
  className="rounded-2xl"
>
  {t.auth.logIn}
</Button>
```

---

#### 13. **Fixed Input Height May Cause Issues - LINES 134-189**
**Severity:** LOW - Responsiveness issue
**File:** [client/components/habit-tracker/AuthPanel.tsx](client/components/habit-tracker/AuthPanel.tsx#L134-L189, L163, L184)
**Problem:**
```tsx
<input
  className="h-12 w-full rounded-2xl border border-border bg-secondary/20 px-4 text-sm outline-none transition ..."
/>
```
- Fixed height: `h-12` (48px)
- Might be too large on mobile devices with smaller screens
- Doesn't scale with text size if user has larger fonts
- Could cause text to overflow or be cut off if font size is increased by user

**Consider:**
```tsx
className="h-12 sm:h-11 w-full rounded-2xl border border-border bg-secondary/20 px-4 text-sm outline-none transition ..."
```

---

#### 14. **Form Layout Grid Breaks on Small Screens - LINES 56-57**
**Severity:** LOW - Responsiveness issue
**File:** [client/components/habit-tracker/AuthPanel.tsx](client/components/habit-tracker/AuthPanel.tsx#L56-L57)
**Problem:**
```tsx
<div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
```
- Left panel (info text) and right panel (form) are in a grid
- Grid is only defined for `lg:` breakpoint (1024px+)
- Below `lg`, layout is single column (stacked)
- This is correct behavior, but form might be too narrow on tablets
- No `md:` or `sm:` variants to optimize for different screen sizes

**Consider adding:**
```tsx
<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
```

---

#### 15. **Info Message Text Too Small on Mobile - LINES 196-200**
**Severity:** LOW - Readability
**File:** [client/components/habit-tracker/AuthPanel.tsx](client/components/habit-tracker/AuthPanel.tsx#L196-L200)
**Problem:**
```tsx
<p className="mt-4 rounded-2xl border border-destructive/20 bg-destructive/10 px-4 py-3 text-sm font-medium text-destructive">
```
- Text size is `text-sm` (12px) at all breakpoints
- Hard to read on mobile
- WCAG recommends 14px minimum for body text

**Should have:**
```tsx
className="mt-4 rounded-2xl border border-destructive/20 bg-destructive/10 px-4 py-3 text-xs sm:text-sm font-medium text-destructive"
```

---

### 🟡 UX/FLOW ISSUES

#### 16. **Error Clears When User Modifies Any Field - LINES 138-157**
**Severity:** LOW - UX issue
**File:** [client/components/habit-tracker/AuthPanel.tsx](client/components/habit-tracker/AuthPanel.tsx#L138-L157)
**Problem:**
```tsx
onChange={(event) => {
  setEmail(event.target.value);
  setError(null);  // ← Error clears immediately
}}
```
- Error message disappears as soon as user types in ANY field
- User might not notice they need to fix something if they're typing quickly
- Should only clear error for THAT field, not the whole form
- Or should preserve error until form is resubmitted

---

#### 17. **No Inline Password Requirements Display - SIGNUP MODE**
**Severity:** MEDIUM - UX issue
**File:** [client/components/habit-tracker/AuthPanel.tsx](client/components/habit-tracker/AuthPanel.tsx#L177-L189)
**Problem:**
- Password field has no hint about requirements
- Placeholder doesn't explain what's needed
- Users must try, fail, and see error from server
- Should show requirements before submission

**Suggested addition:**
```tsx
{mode === "signup" && (
  <div className="text-xs text-muted-foreground">
    Password must be:
    <ul className="list-inside list-disc mt-1">
      <li>At least 8 characters</li>
      <li>Include uppercase and lowercase</li>
      <li>Include at least one number</li>
    </ul>
  </div>
)}
```

---

#### 18. **Form Doesn't Focus First Error Input - LINES 27-48**
**Severity:** LOW - Accessibility
**File:** [client/components/habit-tracker/AuthPanel.tsx](client/components/habit-tracker/AuthPanel.tsx#L27-L48)
**Problem:**
```tsx
if (!email.trim()) {
  setError(t.auth.emailRequired);
  return;  // ← Does NOT focus the email input
}
```
- When validation fails, focus stays on submit button or doesn't move
- Keyboard users have to manually tab back to the error field
- Best practice: Auto-focus first error field using `useRef`

**Should implement:**
```tsx
const emailInputRef = useRef<HTMLInputElement>(null);
const nameInputRef = useRef<HTMLInputElement>(null);
const passwordInputRef = useRef<HTMLInputElement>(null);

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setError(null);

  if (!email.trim()) {
    setError(t.auth.emailRequired);
    emailInputRef.current?.focus();
    return;
  }

  // ...
};
```

---

### 🟢 MINOR ISSUES (Polish & Best Practices)

#### 19. **No Trim During User Input - Better UX**
**Severity:** LOW - UX polish
**File:** [client/components/habit-tracker/AuthPanel.tsx](client/components/habit-tracker/AuthPanel.tsx)
**Problem:**
```tsx
onChange={(event) => {
  setEmail(event.target.value);
}}
```
- User might paste " email@example.com " (with spaces)
- Form still accepts it at submission (`email.trim()`)
- But input shows the spaces, which is confusing
- Better to trim during input or use `.trim()` in value display

---

#### 20. **No Loading Skeleton While Checking Email Exists**
**Severity:** LOW - Minor
**File:** [client/pages/Index.tsx](client/pages/Index.tsx#L330-L355) (handles auth logic)
**Problem:**
- During signup, app might need to check if email already exists
- No skeleton loader shown during this check
- User sees no feedback that something is happening

---

#### 21. **Inconsistent Spacing Between Form Elements**
**Severity:** LOW - Visual polish
**File:** [client/components/habit-tracker/AuthPanel.tsx](client/components/habit-tracker/AuthPanel.tsx)
**Problem:**
- Form uses `space-y-4` for inputs
- But error/info message uses `mt-4` 
- Button uses `mt-5`
- Spacing values inconsistent throughout

**Should normalize:**
```tsx
<form className="mt-6" onSubmit={handleSubmit}>
  <div className="space-y-4">
    {/* inputs */}
  </div>
  <div className="mt-4">
    {/* error/info message */}
  </div>
  <button className="mt-4 w-full ...">
    {/* button */}
  </button>
</form>
```

---

#### 22. **No Feedback on Successful Authentication**
**Severity:** LOW - UX polish
**File:** [client/components/habit-tracker/AuthPanel.tsx](client/components/habit-tracker/AuthPanel.tsx#L45-L50)
**Problem:**
```tsx
if (!result.ok) {
  setError(result.error || t.auth.authFailed);
} else {
  // Clear form on success
  setEmail("");
  setName("");
  setPassword("");
}
```
- Only clears form, no success message
- User sees form clear and assumes it worked
- No "Welcome" or "Loading your dashboard" message
- Should show success animation or toast

---

## Summary Table

| ID | Issue | Severity | File | Line |
|---|---|---|---|---|
| 1 | Missing button CSS classes | 🔴 CRITICAL | AuthPanel.tsx | 201 |
| 2 | No loading/disabled state | 🔴 CRITICAL | AuthPanel.tsx | 16-48 |
| 3 | No password visibility toggle | 🔴 CRITICAL | AuthPanel.tsx | 177-189 |
| 4 | Missing ARIA labels | 🟡 HIGH | AuthPanel.tsx | 134-189 |
| 5 | Error message not linked to fields | 🟡 HIGH | AuthPanel.tsx | 196-200 |
| 6 | No validation error styling | 🟡 MEDIUM | AuthPanel.tsx | 134-189 |
| 7 | Not using Label component | 🟡 MEDIUM | AuthPanel.tsx | 134-189 |
| 8 | Minimal email validation | 🟡 MEDIUM | AuthPanel.tsx | 27-29 |
| 9 | No password strength validation | 🟡 MEDIUM | AuthPanel.tsx | 27-43 |
| 10 | No name length validation | 🟡 MEDIUM | AuthPanel.tsx | 36 |
| 11 | Not using Input component | 🟡 MEDIUM | AuthPanel.tsx | 134-189 |
| 12 | Not using Button component | 🟡 MEDIUM | AuthPanel.tsx | 101-122 |
| 13 | Fixed input height | 🟠 LOW | AuthPanel.tsx | 134-189 |
| 14 | Grid breaks on small screens | 🟠 LOW | AuthPanel.tsx | 56-57 |
| 15 | Info text too small on mobile | 🟠 LOW | AuthPanel.tsx | 196-200 |
| 16 | Error clears on field change | 🟠 LOW | AuthPanel.tsx | 138-157 |
| 17 | No inline password requirements | 🟠 LOW | AuthPanel.tsx | 177-189 |
| 18 | Form doesn't focus first error | 🟠 LOW | AuthPanel.tsx | 27-48 |
| 19 | No input trimming during typing | 🟠 LOW | AuthPanel.tsx | 138-157 |
| 20 | No loading skeleton feedback | 🟠 LOW | Index.tsx | 330-355 |
| 21 | Inconsistent spacing | 🟠 LOW | AuthPanel.tsx | Various |
| 22 | No success feedback | 🟠 LOW | AuthPanel.tsx | 45-50 |

---

## Recommended Priority for Fixes

### Phase 1 (CRITICAL - Must Fix)
1. Fix button styling (issue #1) - Button is completely broken
2. Add loading state (issue #2) - Prevents duplicate submissions
3. Add password toggle (issue #3) - Major UX issue

### Phase 2 (HIGH - Should Fix)
4. Fix accessibility (issues #4, #5, #7) - WCAG compliance
5. Add validation (issues #8, #9) - Better UX, fewer server errors

### Phase 3 (MEDIUM - Nice to Have)
6. Use design system components (issues #11, #12) - Code consistency
7. Improve form UX (issues #16, #17, #18) - Polish

### Phase 4 (LOW - Future)
8. Responsive tweaks (issues #13, #14, #15)
9. Spacing consistency (issue #21)
10. Success feedback (issue #22)
