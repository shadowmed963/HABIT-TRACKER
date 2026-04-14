import { createClient, type SupabaseClient } from "@supabase/supabase-js";

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

let supabase: SupabaseClient | null = null;

export function isSupabaseConfigured() {
  return Boolean(SUPABASE_URL && SUPABASE_ANON_KEY);
}

if (isSupabaseConfigured()) {
  supabase = createClient(SUPABASE_URL!, SUPABASE_ANON_KEY!);
}

/* =========================
   SIGN UP (email + password)
========================= */
export async function signUpWithPassword(
  email: string,
  password: string,
  name?: string
) {
  if (!supabase)
    return { data: null, error: new Error("Supabase not configured") };

  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: name || ""
        }
      }
    });

    return { data, error };
  } catch (err) {
    return { data: null, error: err as any };
  }
}

/* =========================
   SIGN IN
========================= */
export async function signInWithPassword(
  email: string,
  password: string
) {
  if (!supabase)
    return { data: null, error: new Error("Supabase not configured") };

  try {
    const { data, error } =
      await supabase.auth.signInWithPassword({
        email,
        password
      });

    return { data, error };
  } catch (err) {
    return { data: null, error: err as any };
  }
}

/* =========================
   GET CURRENT USER
========================= */
export async function getCurrentUser() {
  if (!supabase) return null;

  const {
    data: { user }
  } = await supabase.auth.getUser();

  return user;
}

/* =========================
   SIGN OUT
========================= */
export async function signOut() {
  if (!supabase)
    return { error: new Error("Supabase not configured") };

  try {
    const { error } = await supabase.auth.signOut();
    return { error };
  } catch (err) {
    return { error: err as any };
  }
}

/* =========================
   DATABASE FUNCTIONS
========================= */

export interface UserProfile {
  id: string;
  email: string;
  name: string;
  auth_uid: string;
  created_at: string;
  updated_at: string;
}

export interface UserHabitsData {
  id: string;
  user_id: string;
  auth_uid: string;
  habits: any[];
  onboarding_complete: boolean;
  updated_at: string;
}

/**
 * Create or update user profile in Supabase (authenticated)
 */
export async function saveUserProfile(email: string, name: string): Promise<{ data: UserProfile | null; error: any }> {
  if (!supabase) return { data: null, error: new Error("Supabase not configured") };

  try {
    // Get authenticated user to verify ownership and get auth_uid
    const { data: { user: authUser }, error: authError } = await supabase.auth.getUser();
    
    if (authError || !authUser) {
      return { data: null, error: "User not authenticated" };
    }

    // Verify email matches authenticated user
    if (authUser.email?.toLowerCase() !== email.toLowerCase()) {
      console.warn(`Security: User ${authUser.email} attempted to save profile for ${email}`);
      return { data: null, error: "Unauthorized: Email does not match authenticated user" };
    }

    const { data, error } = await supabase
      .from("user_profiles")
      .upsert(
        {
          email: email.toLowerCase(),
          name,
          auth_uid: authUser.id,
          updated_at: new Date().toISOString(),
        },
        { 
          onConflict: "email",
          ignoreDuplicates: false
        }
      )
      .select()
      .single();

    if (error) {
      console.error("Supabase saveUserProfile error:", error);
      return { data: null, error };
    }

    return { data, error: null };
  } catch (err) {
    console.error("Exception in saveUserProfile:", err);
    return { data: null, error: err };
  }
}

/**
 * Get user profile from Supabase (authenticated - only fetch own profile)
 */
export async function getUserProfile(email: string): Promise<{ data: UserProfile | null; error: any }> {
  if (!supabase) return { data: null, error: new Error("Supabase not configured") };

  try {
    // Get currently authenticated user to verify ownership
    const { data: { user: authUser }, error: authError } = await supabase.auth.getUser();
    
    if (authError || !authUser) {
      return { data: null, error: "User not authenticated" };
    }

    // Verify the requesting email matches the authenticated user's email
    if (authUser.email?.toLowerCase() !== email.toLowerCase()) {
      console.warn(`Security: User ${authUser.email} attempted to access ${email} profile`);
      return { data: null, error: "Unauthorized: Cannot access other user's profile" };
    }

    const { data, error } = await supabase
      .from("user_profiles")
      .select("*")
      .eq("email", email.toLowerCase())
      .eq("auth_uid", authUser.id)
      .single();

    return { data, error };
  } catch (err) {
    return { data: null, error: err };
  }
}

/**
 * Save user habits to Supabase (authenticated)
 */
export async function saveUserHabits(email: string, habits: any[], onboardingComplete: boolean): Promise<{ data: UserHabitsData | null; error: any }> {
  if (!supabase) return { data: null, error: new Error("Supabase not configured") };

  try {
    // Get authenticated user to verify ownership and get auth_uid
    const { data: { user: authUser }, error: authError } = await supabase.auth.getUser();
    
    if (authError || !authUser) {
      return { data: null, error: "User not authenticated" };
    }

    // Verify email matches authenticated user
    if (authUser.email?.toLowerCase() !== email.toLowerCase()) {
      console.warn(`Security: User ${authUser.email} attempted to save habits for ${email}`);
      return { data: null, error: "Unauthorized: Email does not match authenticated user" };
    }

    // First get the user profile to get the ID
    const { data: profile, error: profileError } = await getUserProfile(email);
    if (profileError || !profile) {
      console.error("Failed to get user profile for habits:", profileError);
      return { data: null, error: profileError || "User profile not found" };
    }

    const { data, error } = await supabase
      .from("user_habits")
      .upsert(
        {
          user_id: profile.id,
          auth_uid: authUser.id,
          habits,
          onboarding_complete: onboardingComplete,
          updated_at: new Date().toISOString(),
        },
        { 
          onConflict: "user_id",
          ignoreDuplicates: false
        }
      )
      .select()
      .single();

    if (error) {
      console.error("Supabase saveUserHabits error:", error);
      return { data: null, error };
    }

    return { data, error: null };
  } catch (err) {
    console.error("Exception in saveUserHabits:", err);
    return { data: null, error: err };
  }
}

/**
 * Get user habits from Supabase (authenticated - only fetch own habits)
 */
export async function getUserHabits(email: string): Promise<{ data: UserHabitsData | null; error: any }> {
  if (!supabase) return { data: null, error: new Error("Supabase not configured") };

  try {
    // Get currently authenticated user to verify ownership
    const { data: { user: authUser }, error: authError } = await supabase.auth.getUser();
    
    if (authError || !authUser) {
      return { data: null, error: "User not authenticated" };
    }

    // Verify the requesting email matches the authenticated user's email
    if (authUser.email?.toLowerCase() !== email.toLowerCase()) {
      console.warn(`Security: User ${authUser.email} attempted to access ${email} habits`);
      return { data: null, error: "Unauthorized: Cannot access other user's habits" };
    }

    // First get the user profile to get the ID
    const { data: profile, error: profileError } = await getUserProfile(email);
    if (profileError || !profile) {
      return { data: null, error: profileError || "User profile not found" };
    }

    const { data, error } = await supabase
      .from("user_habits")
      .select("*")
      .eq("user_id", profile.id)
      .eq("auth_uid", authUser.id)
      .single();

    return { data, error };
  } catch (err) {
    return { data: null, error: err };
  }
}

export default supabase;