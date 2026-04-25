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
    // Validate inputs
    if (!email || !password) {
      return { data: null, error: new Error("Email and password required") };
    }

    const { data, error } = await supabase.auth.signUp({
      email: email.toLowerCase().trim(),
      password,
      options: {
        data: {
          full_name: name?.trim() || ""
        }
      }
    });

    if (error) {
      console.error("Supabase auth error details:", {
        message: error.message,
        status: error.status,
        code: error.code
      });
    }

    return { data, error };
  } catch (err) {
    console.error("SignUp exception:", err);
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

    // Build the upsert data
    const profileData: any = {
      email: email.toLowerCase(),
      name,
      updated_at: new Date().toISOString(),
    };

    // Add auth_uid if it exists
    try {
      profileData.auth_uid = authUser.id;
    } catch {
      // If auth_uid column doesn't exist, continue without it
    }

    const { data, error } = await supabase
      .from("user_profiles")
      .upsert(profileData, { 
        onConflict: "email",
        ignoreDuplicates: false
      })
      .select()
      .maybeSingle();

    if (error) {
      console.error("Supabase saveUserProfile error:", error);
      return { data: null, error };
    }

    console.log("✅ Profile saved successfully", data);
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

    // Try with auth_uid first (if migration has been applied)
    let query = supabase
      .from("user_profiles")
      .select("*")
      .eq("email", email.toLowerCase());

    // Only filter by auth_uid if the column exists
    const { data, error } = await query.maybeSingle();

    if (error) {
      console.error("getUserProfile error:", error);
      return { data: null, error };
    }

    // If no profile found, return null (not an error)
    if (!data) {
      console.log(`Profile not found for ${email} - user may be new`);
      return { data: null, error: null };
    }

    return { data, error: null };
  } catch (err) {
    console.error("getUserProfile exception:", err);
    return { data: null, error: err };
  }
}

/**
 * Save user habits to Supabase (authenticated)
 * Always creates a user_habits row, even if habits array is empty
 */
export async function saveUserHabits(email: string, habits: any[], onboardingComplete: boolean): Promise<{ data: UserHabitsData | null; error: any }> {
  if (!supabase) return { data: null, error: new Error("Supabase not configured") };

  try {
    console.log("🔄 saveUserHabits called with:", { email, habitsCount: habits.length, onboardingComplete });

    // Get authenticated user to verify ownership and get auth_uid
    const { data: { user: authUser }, error: authError } = await supabase.auth.getUser();
    
    if (authError || !authUser) {
      console.error("Auth error:", authError);
      return { data: null, error: "User not authenticated" };
    }

    // Verify email matches authenticated user
    if (authUser.email?.toLowerCase() !== email.toLowerCase()) {
      console.warn(`Security: User ${authUser.email} attempted to save habits for ${email}`);
      return { data: null, error: "Unauthorized: Email does not match authenticated user" };
    }

    // First get the user profile to get the ID
    console.log("📝 Getting user profile...");
    const { data: profile, error: profileError } = await getUserProfile(email);
    if (profileError && profileError !== "Not found") {
      console.error("❌ Failed to get user profile for habits:", profileError);
      return { data: null, error: profileError };
    }

    if (!profile) {
      console.error("❌ Cannot save habits - user profile does not exist");
      return { data: null, error: "User profile not found" };
    }

    console.log("✅ Profile found:", { profileId: profile.id, email: profile.email });

    const habitsData: any = {
      user_id: profile.id,
      auth_uid: authUser.id,
      habits: JSON.parse(JSON.stringify(habits)), // Ensure proper serialization
      onboarding_complete: onboardingComplete,
      updated_at: new Date().toISOString(),
    };

    console.log("💾 Deleting old habits record...");
    // Delete old record first
    await supabase
      .from("user_habits")
      .delete()
      .eq("user_id", profile.id);

    console.log("💾 Inserting new habits data with onboarding_complete:", onboardingComplete);
    const { data, error } = await supabase
      .from("user_habits")
      .insert(habitsData)
      .select();

    if (error) {
      console.error("❌ Supabase saveUserHabits error:", error);
      return { data: null, error };
    }

    console.log("✅ Habits and onboarding status saved successfully to Supabase");
    return { data: data?.[0] || null, error: null };
  } catch (err) {
    console.error("❌ Exception in saveUserHabits:", err);
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
    if (profileError && profileError !== "Not found") {
      console.error("Failed to get user profile for habits:", profileError);
      return { data: null, error: profileError };
    }

    if (!profile) {
      console.log(`No habits found - profile not created yet for ${email}`);
      return { data: null, error: null };
    }

    const { data, error } = await supabase
      .from("user_habits")
      .select("*")
      .eq("user_id", profile.id)
      .order("updated_at", { ascending: false })
      .limit(1);

    if (error) {
      console.error("getUserHabits error:", error);
      return { data: null, error };
    }

    // Get first result or null
    const habits = data && data.length > 0 ? data[0] : null;
    return { data: habits, error: null };
  } catch (err) {
    console.error("getUserHabits exception:", err);
    return { data: null, error: err };
  }
}
/**
 * Complete onboarding - save habits and mark onboarding as complete
 */
export async function completeOnboarding(
  email: string,
  habits: any[]
): Promise<{ data: UserHabitsData | null; error: any }> {
  if (!supabase) return { data: null, error: new Error("Supabase not configured") };

  try {
    console.log("🎯 Completing onboarding...", { email, habitsCount: habits.length });

    // Get authenticated user
    const { data: { user: authUser }, error: authError } = await supabase.auth.getUser();
    if (authError || !authUser) {
      return { data: null, error: "User not authenticated" };
    }

    // Verify email matches
    if (authUser.email?.toLowerCase() !== email.toLowerCase()) {
      return { data: null, error: "Unauthorized" };
    }

    // Get user profile ID
    const { data: profile, error: profileError } = await getUserProfile(email);
    if (profileError || !profile) {
      console.error("Profile not found");
      return { data: null, error: "User profile not found" };
    }

    // Delete old record if exists
    console.log("💾 Deleting old habits record...");
    await supabase
      .from("user_habits")
      .delete()
      .eq("user_id", profile.id);

    // Insert new habits with onboarding_complete = true
    console.log("💾 Inserting habits with onboarding_complete = true...");
    const { data, error } = await supabase
      .from("user_habits")
      .insert({
        user_id: profile.id,
        auth_uid: authUser.id,
        habits: JSON.parse(JSON.stringify(habits)),
        onboarding_complete: true,
        updated_at: new Date().toISOString(),
      })
      .select();

    if (error) {
      console.error("❌ Failed to complete onboarding:", error);
      return { data: null, error };
    }

    console.log("✅ Onboarding completed successfully");
    return { data: data?.[0] || null, error: null };
  } catch (err) {
    console.error("❌ completeOnboarding exception:", err);
    return { data: null, error: err };
  }
}
export default supabase;