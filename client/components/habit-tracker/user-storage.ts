import type { HabitItem } from "./habit-data";
import { isSupabaseConfigured, saveUserProfile, getUserProfile, saveUserHabits, getUserHabits, completeOnboarding } from "@/lib/supabaseClient";
import supabase from "@/lib/supabaseClient";

export interface HabitUser {
  id: string;
  email: string;
  name: string;
  habits: HabitItem[];
  onboardingComplete: boolean;
  created_at: string;
}

interface AuthResult {
  ok: boolean;
  user?: HabitUser;
  error?: string;
}

export function signInWithGoogle(): Promise<AuthResult> {
  // Placeholder for Google Sign-In
  return Promise.reject({ ok: false, error: "Google sign-in not yet configured" });
}

/**
 * Create new user account in Supabase
 */
export async function createUserAccountWithSupabase(name: string, email: string): Promise<AuthResult> {
  if (!isSupabaseConfigured() || !supabase) {
    return { ok: false, error: "Supabase not configured" };
  }

  try {
    // Create user profile in database
    const saveResult = await saveUserProfile(email, name);
    
    if (saveResult.error || !saveResult.data) {
      console.error("Failed to save profile:", saveResult.error);
      return { ok: false, error: "Failed to save profile to Supabase" };
    }

    const newUser: HabitUser = {
      id: saveResult.data.id,
      email: email.trim().toLowerCase(),
      name: name.trim(),
      habits: [],
      onboardingComplete: false,
      created_at: saveResult.data.created_at,
    };

    return { ok: true, user: newUser };
  } catch (err) {
    console.error("Error creating user account:", err);
    return { ok: false, error: "Failed to create user account" };
  }
}

/**
 * Load user data from Supabase
 */
export async function loadUserFromSupabase(email: string): Promise<AuthResult> {
  if (!isSupabaseConfigured() || !supabase) {
    return { ok: false, error: "Supabase not configured" };
  }

  try {
    // Get user profile
    const profileResult = await getUserProfile(email);
    
    if (profileResult.error && profileResult.error !== "Not found") {
      console.error("Profile fetch error:", profileResult.error);
      return { ok: false, error: "Failed to load profile" };
    }

    // If profile doesn't exist, create a new one with the authenticated user's email
    let profile = profileResult.data;
    if (!profile) {
      console.log("Profile not found for new user, creating default profile...");
      const createResult = await saveUserProfile(email, email.split('@')[0]); // Use email prefix as name
      if (createResult.error || !createResult.data) {
        console.error("Failed to create default profile:", createResult.error);
        return { ok: false, error: "Failed to create user profile" };
      }
      profile = createResult.data;
    }

    // Get user habits (which now contains onboarding_complete status)
    const habitsResult = await getUserHabits(email);
    const habits = habitsResult.data?.habits || [];
    const onboardingComplete = habitsResult.data?.onboarding_complete || false;

    console.log("✅ User loaded:", {
      email: profile.email,
      name: profile.name,
      habitsCount: habits.length,
      onboardingComplete
    });

    const user: HabitUser = {
      id: profile.id,
      email: profile.email,
      name: profile.name || "",
      habits,
      onboardingComplete,
      created_at: profile.created_at,
    };

    return { ok: true, user };
  } catch (err) {
    console.error("Error loading user from Supabase:", err);
    return { ok: false, error: "Failed to load user data" };
  }
}

/**
 * Update user account in Supabase
 * Saves habits and onboarding status to user_habits table only
 */
export async function updateUserAccount(
  email: string,
  updates: { habits?: HabitItem[]; onboardingComplete?: boolean; name?: string }
): Promise<{ ok: boolean; user?: HabitUser; error?: string }> {
  if (!isSupabaseConfigured() || !supabase) {
    console.warn("Supabase not configured - cannot update user account");
    return { ok: false, error: "Supabase not configured" };
  }

  try {
    // Get current profile to preserve name
    const profileResult = await getUserProfile(email);
    const currentName = profileResult.data?.name || email.split('@')[0];

    let saveError: string | undefined;

    // Only save habits to user_habits table (which now contains onboarding_complete)
    if (updates.habits !== undefined || updates.onboardingComplete !== undefined) {
      console.log("💾 Saving habits and onboarding status to user_habits...");
      const result = await saveUserHabits(
        email,
        updates.habits || [],
        updates.onboardingComplete || false
      );
      if (result.error) {
        saveError = String(result.error);
        console.error("❌ Failed to save habits:", result.error);
      } else {
        console.log("✅ Habits saved successfully");
      }
    }

    // Update profile name if provided (separate operation)
    if (updates.name && updates.name !== currentName) {
      console.log("💾 Updating user name...");
      const result = await saveUserProfile(email, updates.name);
      if (result.error) {
        saveError = saveError || String(result.error);
        console.error("❌ Failed to update name:", result.error);
      } else {
        console.log("✅ Name updated successfully");
      }
    }

    // Create user object to return for immediate local state updates
    const user: HabitUser = {
      id: crypto.randomUUID?.() || Date.now().toString(),
      email,
      name: updates.name || currentName,
      habits: updates.habits || [],
      onboardingComplete: updates.onboardingComplete || false,
      created_at: new Date().toISOString(),
    };

    return saveError ? { ok: false, error: saveError } : { ok: true, user };
  } catch (err) {
    console.error("Error updating user account:", err);
    return { ok: false, error: String(err) };
  }
}

/**
 * Complete onboarding and save initial habits
 */
export async function completeUserOnboarding(
  email: string,
  habits: HabitItem[]
): Promise<AuthResult> {
  if (!isSupabaseConfigured() || !supabase) {
    return { ok: false, error: "Supabase not configured" };
  }

  try {
    console.log("🎯 Completing onboarding with habits:", habits.length);
    const result = await completeOnboarding(email, habits);
    
    if (result.error || !result.data) {
      console.error("Failed to complete onboarding:", result.error);
      return { ok: false, error: "Failed to complete onboarding" };
    }

    console.log("✅ Onboarding completed successfully");
    
    // Load updated user data
    return await loadUserFromSupabase(email);
  } catch (err) {
    console.error("Error completing onboarding:", err);
    return { ok: false, error: "Failed to complete onboarding" };
  }
}

/**
 * Clear active user session
 */
export function clearActiveUser() {
  // Session is managed by Supabase Auth, nothing to do here
}

/**
 * Get active user from Supabase (for backward compatibility)
 */
export async function getActiveUser(): Promise<HabitUser | null> {
  if (!isSupabaseConfigured() || !supabase) {
    return null;
  }

  try {
    const { data: { user }, error } = await supabase.auth.getUser();
    
    if (error || !user) {
      return null;
    }

    const result = await loadUserFromSupabase(user.email!);
    return result.ok ? result.user || null : null;
  } catch (err) {
    console.error("Error getting active user:", err);
    return null;
  }
}

/**
 * Local storage key for users
 */
const STORAGE_KEY = "habit_users";

/**
 * Create user account in localStorage (legacy fallback)
 */
export function createUserAccount(name: string, email: string): HabitUser {
  const user: HabitUser = {
    id: crypto.randomUUID?.() || Date.now().toString(),
    email: email.trim().toLowerCase(),
    name: name.trim(),
    habits: [],
    onboardingComplete: false,
    created_at: new Date().toISOString(),
  };

  // Store user in localStorage
  const users = getStoredUsers();
  users.push(user);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(users));

  return user;
}

/**
 * Authenticate user from localStorage (legacy fallback)
 */
export function authenticateUser(email: string): HabitUser | null {
  const users = getStoredUsers();
  const user = users.find(u => u.email === email.toLowerCase());
  return user || null;
}

/**
 * Get all stored users from localStorage (legacy fallback)
 */
export function getStoredUsers(): HabitUser[] {
  if (typeof window === "undefined") return [];
  
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : [];
}
