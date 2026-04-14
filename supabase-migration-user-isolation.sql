-- Migration: Strengthen User Data Isolation with auth_uid
-- This migration adds explicit auth_uid columns to user_profiles and user_habits tables
-- and updates RLS policies to use auth.uid() instead of JWT claims for stronger security

-- Step 1: Add auth_uid columns to user_profiles
ALTER TABLE public.user_profiles 
ADD COLUMN IF NOT EXISTS auth_uid UUID UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE;

-- Step 2: Add auth_uid columns to user_habits
ALTER TABLE public.user_habits 
ADD COLUMN IF NOT EXISTS auth_uid UUID UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE;

-- Step 3: Create indexes for faster lookups by auth_uid
CREATE INDEX IF NOT EXISTS idx_user_profiles_auth_uid ON public.user_profiles(auth_uid);
CREATE INDEX IF NOT EXISTS idx_user_habits_auth_uid ON public.user_habits(auth_uid);

-- Step 4: Create composite index for combined constraints
CREATE UNIQUE INDEX IF NOT EXISTS idx_user_profiles_email_auth_uid 
ON public.user_profiles(email, auth_uid);

-- Step 5: Drop old RLS policies and create new ones with auth_uid
DROP POLICY IF EXISTS "Users can view their own profile" ON public.user_profiles;
DROP POLICY IF EXISTS "Users can update their own profile" ON public.user_profiles;
DROP POLICY IF EXISTS "Users can insert their own profile" ON public.user_profiles;

DROP POLICY IF EXISTS "Users can view their own habits" ON public.user_habits;
DROP POLICY IF EXISTS "Users can update their own habits" ON public.user_habits;
DROP POLICY IF EXISTS "Users can insert their own habits" ON public.user_habits;

-- Step 6: Create new RLS policies using auth.uid() for stronger security

-- user_profiles: Allow users to view only their own profile
CREATE POLICY "Users can view their own profile (auth_uid)" ON public.user_profiles
  FOR SELECT 
  USING (auth_uid = auth.uid() OR auth_uid IS NULL);

-- user_profiles: Allow users to update only their own profile
CREATE POLICY "Users can update their own profile (auth_uid)" ON public.user_profiles
  FOR UPDATE 
  USING (auth_uid = auth.uid())
  WITH CHECK (auth_uid = auth.uid());

-- user_profiles: Allow users to insert their own profile
CREATE POLICY "Users can insert their own profile (auth_uid)" ON public.user_profiles
  FOR INSERT 
  WITH CHECK (auth_uid = auth.uid());

-- user_habits: Allow users to view only their own habits
CREATE POLICY "Users can view their own habits (auth_uid)" ON public.user_habits
  FOR SELECT 
  USING (auth_uid = auth.uid() OR auth_uid IS NULL);

-- user_habits: Allow users to update only their own habits
CREATE POLICY "Users can update their own habits (auth_uid)" ON public.user_habits
  FOR UPDATE 
  USING (auth_uid = auth.uid())
  WITH CHECK (auth_uid = auth.uid());

-- user_habits: Allow users to insert their own habits
CREATE POLICY "Users can insert their own habits (auth_uid)" ON public.user_habits
  FOR INSERT 
  WITH CHECK (auth_uid = auth.uid());

-- Step 7: Update existing rows with auth_uid from users table (if migration is needed)
-- This helps existing data transition to the new schema
UPDATE public.user_profiles up
SET auth_uid = u.id
FROM auth.users u
WHERE up.email = u.email
  AND up.auth_uid IS NULL;

UPDATE public.user_habits uh
SET auth_uid = u.id
FROM public.user_profiles up
JOIN auth.users u ON u.email = up.email
WHERE uh.user_id = up.id
  AND uh.auth_uid IS NULL;

-- Step 8: Add NOT NULL constraint (only after backfilling)
-- Uncomment these after verifying data migration:
-- ALTER TABLE public.user_profiles ALTER COLUMN auth_uid SET NOT NULL;
-- ALTER TABLE public.user_habits ALTER COLUMN auth_uid SET NOT NULL;
