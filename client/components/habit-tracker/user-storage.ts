import type { HabitItem } from "./habit-data";
import { isSupabaseConfigured, saveUserProfile, getUserProfile, saveUserHabits, getUserHabits } from "@/lib/supabaseClient";
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

// Storage key for demo (when not using Supabase)
const USERS_STORAGE_KEY = "habit_users";
const ACTIVE_USER_KEY = "habit_active_user";

export function getStoredUsers(): HabitUser[] {
  try {
    const stored = localStorage.getItem(USERS_STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

export function getActiveUser(): HabitUser | null {
  try {
    const stored = localStorage.getItem(ACTIVE_USER_KEY);
    return stored ? JSON.parse(stored) : null;
  } catch {
    return null;
  }
}

function saveActiveUser(user: HabitUser) {
  localStorage.setItem(ACTIVE_USER_KEY, JSON.stringify(user));
}

export function clearActiveUser() {
  localStorage.removeItem(ACTIVE_USER_KEY);
}

function saveUsers(users: HabitUser[]) {
  localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
}

// Legacy code generation removed — authentication uses email (and optional password via Supabase).

function findUserIndex(users: HabitUser[], email: string): number {
  const normalized = email.trim().toLowerCase();
  return users.findIndex((u) => (u.email || "").trim().toLowerCase() === normalized);
}

export function signInWithGoogle(): Promise<AuthResult> {
  // Placeholder for Google Sign-In
  // In a real app, use @react-oauth/google or Firebase Auth
  return Promise.reject({ ok: false, error: "Google sign-in not yet configured" });
}

/**
 * Create new user account and save to Supabase if configured
 */
export async function createUserAccountWithSupabase(name: string, email: string): Promise<AuthResult> {
  const users = getStoredUsers();

  // Check if email already exists locally
  if (findUserIndex(users, email) !== -1) {
    return { ok: false, error: "User already exists" };
  }

  // Create local user object
  const newUser: HabitUser = {
    id: crypto.randomUUID?.() || Date.now().toString(),
    email: email.trim().toLowerCase(),
    name: name.trim(),
    habits: [],
    onboardingComplete: false,
    created_at: new Date().toISOString(),
  };

  // If Supabase is configured, save to database via backend endpoint
  if (isSupabaseConfigured() && supabase) {
    try {
      // Get the session token from Supabase auth
      const { data: { session }, error: sessionError } = await supabase.auth.getSession();

      let headers: Record<string, string> = { "Content-Type": "application/json" };

      // Include JWT token if available for better security
      if (!sessionError && session?.access_token) {
        headers["Authorization"] = `Bearer ${session.access_token}`;
      }

      // Call backend endpoint to create user profile
      const response = await fetch("/api/users/create-profile", {
        method: "POST",
        headers,
        body: JSON.stringify({ email, name }),
      });

      const result = await response.json();

      if (!result.success) {
        console.error("Failed to create profile via backend:", result.error);
        // Still create locally if backend fails
      } else if (result.userId) {
        // Update with Supabase-generated ID if successful
        newUser.id = result.userId;
        console.log("User profile created successfully:", result.userId);
      }
    } catch (err) {
      console.error("Error calling create-profile endpoint:", err);
      // Continue with local storage fallback
    }
  }

  // Save to local storage
  users.push(newUser);
  saveUsers(users);
  saveActiveUser(newUser);

  return { ok: true, user: newUser };
}

export function createUserAccount(name: string, email: string): AuthResult {
  const users = getStoredUsers();

  // Check if email already exists
  if (findUserIndex(users, email) !== -1) {
    return { ok: false, error: "User already exists" };
  }

  const newUser: HabitUser = {
    id: crypto.randomUUID?.() || Date.now().toString(),
    email: email.trim().toLowerCase(),
    name: name.trim(),
    habits: [],
    onboardingComplete: false,
    created_at: new Date().toISOString(),
  };

  users.push(newUser);
  saveUsers(users);
  saveActiveUser(newUser);

  // Also save to Supabase if configured (non-blocking)
  if (isSupabaseConfigured()) {
    saveUserProfile(email, name).catch(err => {
      console.error("Failed to save profile to Supabase:", err);
    });
  }

  return { ok: true, user: newUser };
}

export function authenticateUser(email: string): AuthResult {
  const users = getStoredUsers();
  const userIndex = findUserIndex(users, email);

  if (userIndex === -1) {
    return { ok: false, error: "User not found" };
  }

  const user = users[userIndex];
  saveActiveUser(user);
  return { ok: true, user };
}

/**
 * Load user data from Supabase
 */
export async function loadUserFromSupabase(email: string): Promise<AuthResult> {
  if (!isSupabaseConfigured()) {
    return { ok: false, error: "Supabase not configured" };
  }

  try {
    // Get user profile
    const { data: profileData, error: profileError } = await getUserProfile(email);
    if (profileError || !profileData) {
      return { ok: false, error: "User profile not found in Supabase" };
    }

    // Get user habits
    const { data: habitsData, error: habitsError } = await getUserHabits(email);
    
    const user: HabitUser = {
      id: profileData.id,
      email: profileData.email,
      name: profileData.name,
      habits: habitsData?.habits || [],
      onboardingComplete: habitsData?.onboarding_complete || false,
      created_at: profileData.created_at,
    };

    // Also save to local storage for offline access
    const users = getStoredUsers();
    const existingIndex = findUserIndex(users, email);
    if (existingIndex !== -1) {
      users[existingIndex] = user;
    } else {
      users.push(user);
    }
    saveUsers(users);
    saveActiveUser(user);

    return { ok: true, user };
  } catch (err) {
    console.error("Failed to load user from Supabase:", err);
    return { ok: false, error: "Failed to load user data" };
  }
}

export function updateUserAccount(
  email: string,
  updates: Partial<Pick<HabitUser, "habits" | "onboardingComplete">>,
) {
  const users = getStoredUsers();
  const userIndex = findUserIndex(users, email);
  
  if (userIndex === -1) return null;

  const currentUser = users[userIndex];
  const nextUser: HabitUser = {
    ...currentUser,
    ...updates,
  };

  users[userIndex] = nextUser;
  saveUsers(users);
  
  const activeUser = getActiveUser();
  if (activeUser && activeUser.email === email) {
    saveActiveUser(nextUser);
  }

  // Also sync to Supabase if configured
  if (isSupabaseConfigured()) {
    saveUserHabits(email, nextUser.habits, nextUser.onboardingComplete).catch(err => {
      console.error("Failed to sync habits to Supabase:", err);
    });
  }

  return nextUser;
}
