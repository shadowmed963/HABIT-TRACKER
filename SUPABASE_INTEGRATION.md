# Supabase Integration Guide

## ✅ التكامل مع Supabase مكتمل | Intégration Supabase Terminée

### Overview
The registration and login system is now fully integrated with Supabase. User data is automatically synced to the database and loaded on subsequent logins.

---

## 🔧 Setup Instructions

### 1. Create Supabase Project
1. Go to [supabase.com](https://supabase.com)
2. Create a new project
3. Copy your **Project URL** and **Anon Key**

### 2. Add Environment Variables
Create `.env.local` in your project root:

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

### 3. Run Migration in Supabase
1. Go to your Supabase Dashboard → SQL Editor
2. Copy the entire content of `supabase-setup.sql`
3. Paste and run it in the SQL editor

This creates:
- `user_profiles` table - stores user info
- `user_habits` table - stores habits and progress
- Row Level Security (RLS) policies
- Automatic timestamps with triggers

### 4. Verify Tables Created
In Supabase Dashboard → Table Editor, you should see:
- ✅ `user_profiles`
- ✅ `user_habits`

---

## 📋 How It Works

### Registration Flow
1. User enters email, name, and password
2. `signUpWithPassword()` creates auth user in Supabase
3. `saveUserProfile()` saves profile to `user_profiles` table
4. User can immediately start using the app

### Login Flow
1. User enters email and password
2. `signInWithPassword()` authenticates with Supabase Auth
3. `loadUserFromSupabase()` fetches:
   - User profile from `user_profiles`
   - Habits from `user_habits`
4. Data loaded into local state and localStorage
5. User can continue where they left off

### Data Sync
- **On Create**: `saveUserProfile()` → saves to Supabase
- **On Update**: `updateUserAccount()` → syncs habits to Supabase
- **On Login**: `loadUserFromSupabase()` → fetches latest data
- **Fallback**: Uses localStorage if Supabase is unavailable

---

## 🗄️ Database Schema

### user_profiles
```sql
id: UUID (primary key)
email: TEXT (unique)
name: TEXT
created_at: TIMESTAMP
updated_at: TIMESTAMP
```

### user_habits
```sql
id: UUID (primary key)
user_id: UUID (foreign key → user_profiles.id)
habits: JSONB (array of habit objects)
onboarding_complete: BOOLEAN
updated_at: TIMESTAMP
```

---

## 🔒 Security Features

### Row Level Security (RLS)
- ✅ Users can only view/edit their own data
- ✅ Email verification via auth
- ✅ Automatic timestamps prevent tampering
- ✅ Foreign key constraints ensure data integrity

### Available Policies
- View own profile
- Update own profile
- Insert own profile
- View own habits
- Update own habits
- Insert own habits

---

## 📱 Client Functions Added

### In `supabaseClient.ts`:
```typescript
// Authentication
signUpWithPassword(email, password, name)
signInWithPassword(email, password)
getCurrentUser()
signOut()

// Database Operations
saveUserProfile(email, name)
getUserProfile(email)
saveUserHabits(email, habits, onboardingComplete)
getUserHabits(email)
```

### In `user-storage.ts`:
```typescript
// New function to load from Supabase
loadUserFromSupabase(email)

// Updated functions to sync with Supabase
createUserAccount(name, email)  // Now saves to Supabase
updateUserAccount(email, updates)  // Now syncs to Supabase
```

---

## 🔄 Data Flow Diagram

```
┌─────────────────┐
│   User Login    │
└────────┬────────┘
         │
         ↓
┌─────────────────────────┐
│ signInWithPassword()     │
│ (Supabase Auth)         │
└────────┬────────────────┘
         │
         ↓
┌─────────────────────────┐
│ loadUserFromSupabase()   │
│ - Get user_profiles     │
│ - Get user_habits       │
└────────┬────────────────┘
         │
         ↓
┌─────────────────┐
│  Update State   │
│  + localStorage │
└────────┬────────┘
         │
         ↓
┌─────────────────┐
│  User Logged In │
└─────────────────┘
```

---

## ✨ Features

✅ **Automatic Sync**: Changes automatically saved to Supabase  
✅ **Offline Support**: Works with localStorage fallback  
✅ **Secure**: RLS policies enforce user data privacy  
✅ **Type-Safe**: Full TypeScript support  
✅ **Error Handling**: Graceful fallbacks if Supabase unavailable  
✅ **Real-time Ready**: Can add real-time subscriptions later  

---

## 🧪 Testing

### Test Registration
1. Fill signup form with a new email
2. Check Supabase `user_profiles` table
3. Verify profile was created
4. Add habits and refresh - data should persist

### Test Login
1. Log out
2. Log back in with same email
3. Verify habits are loaded

### Test Offline
1. Open DevTools → Network → Offline
2. Try to use app - should use localStorage
3. Go back online - data syncs to Supabase

---

## 🐛 Troubleshooting

### "Supabase not configured"
- Check `.env.local` has correct URL and key
- Restart dev server after adding env vars

### Tables don't exist
- Copy the SQL from `supabase-setup.sql`
- Run in Supabase SQL Editor
- Verify tables appear in Table Editor

### Can't login
- Check email exists in `user_profiles`
- Verify auth user exists in Supabase Auth
- Check RLS policies aren't too restrictive

### Data not syncing
- Check browser console for errors
- Verify Supabase config is valid
- Check RLS policies allow writes

---

## 📚 References

- [Supabase Docs](https://supabase.com/docs)
- [Supabase Auth](https://supabase.com/docs/guides/auth)
- [Row Level Security](https://supabase.com/docs/guides/auth/row-level-security)
- [JavaScript Client](https://supabase.com/docs/reference/javascript)

---

## 🚀 Next Steps (Optional)

- [ ] Add real-time subscriptions for live updates
- [ ] Add user avatar support
- [ ] Add social login (Google, GitHub)
- [ ] Add backup/export functionality
- [ ] Add habit sharing between users
- [ ] Add analytics dashboard
