import { RequestHandler } from "express";
import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = process.env.VITE_SUPABASE_URL;
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

interface CreateUserRequest {
  email: string;
  name: string;
}

interface CreateUserResponse {
  success: boolean;
  userId?: string;
  error?: string;
}

export const handleCreateUser: RequestHandler<any, CreateUserResponse, CreateUserRequest> = async (req, res) => {
  const { email, name } = req.body;

  // Validate input
  if (!email || !name) {
    return res.status(400).json({
      success: false,
      error: "Email and name are required"
    });
  }

  // Check if Supabase is configured
  if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY) {
    console.error("Supabase not configured on server");
    return res.status(500).json({
      success: false,
      error: "Database service not available"
    });
  }

  try {
    // Create admin Supabase client (bypasses RLS)
    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

    // Check if profile already exists
    const { data: existing } = await supabase
      .from("user_profiles")
      .select("id")
      .eq("email", email.toLowerCase())
      .single();

    if (existing) {
      return res.status(409).json({
        success: false,
        error: "User profile already exists"
      });
    }

    // Create user profile (admin client bypasses RLS)
    const { data: profile, error: profileError } = await supabase
      .from("user_profiles")
      .insert({
        email: email.toLowerCase(),
        name: name.trim()
      })
      .select()
      .single();

    if (profileError) {
      console.error("Error creating user profile:", profileError);
      return res.status(500).json({
        success: false,
        error: `Failed to create profile: ${profileError.message}`
      });
    }

    // Create empty habits record
    const { error: habitsError } = await supabase
      .from("user_habits")
      .insert({
        user_id: profile.id,
        habits: [],
        onboarding_complete: false
      })
      .select()
      .single();

    if (habitsError) {
      console.error("Error creating habits record:", habitsError);
      // Don't fail - profile was created, habits can be empty
    }

    return res.status(201).json({
      success: true,
      userId: profile.id
    });

  } catch (err) {
    console.error("Exception in handleCreateUser:", err);
    return res.status(500).json({
      success: false,
      error: "Internal server error"
    });
  }
};
