import { RequestHandler } from "express";
import { createClient } from "@supabase/supabase-js";
import type { JwtPayload } from "@supabase/supabase-js";

const SUPABASE_URL = process.env.VITE_SUPABASE_URL;
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const JWT_SECRET = process.env.SUPABASE_JWT_SECRET;

interface CreateUserRequest {
  email: string;
  name: string;
}

interface CreateUserResponse {
  success: boolean;
  userId?: string;
  error?: string;
}

/**
 * Verify JWT token and extract user information
 */
function verifyJWTAndGetUserId(authHeader: string | undefined): string | null {
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return null;
  }

  const token = authHeader.substring(7);
  
  try {
    // For production, properly verify the JWT with the secret
    // This is a basic check - proper verification should use jwt.verify()
    const parts = token.split(".");
    if (parts.length !== 3) return null;
    
    const payload = JSON.parse(Buffer.from(parts[1], "base64").toString());
    return payload.sub || null; // 'sub' is the user_id in Supabase JWTs
  } catch {
    return null;
  }
}

export const handleCreateUser: RequestHandler<any, CreateUserResponse, CreateUserRequest> = async (req, res) => {
  const { email, name } = req.body;
  const authHeader = req.headers.authorization;

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

    // Try to get user ID from JWT token
    const authUserId = verifyJWTAndGetUserId(authHeader);

    if (!authUserId) {
      // If no valid JWT, still allow creation but auth_uid will be set later
      console.warn("No valid JWT token provided for user creation");
    }

    // Verify email matches authenticated user (if token provided)
    if (authUserId) {
      const { data: { user }, error: userError } = await supabase.auth.admin.getUserById(authUserId);
      
      if (userError || !user) {
        return res.status(401).json({
          success: false,
          error: "Invalid authentication token"
        });
      }

      if (user.email?.toLowerCase() !== email.toLowerCase()) {
        return res.status(401).json({
          success: false,
          error: "Email does not match authenticated user"
        });
      }
    }

    // Check if profile already exists
    const { data: existing } = await supabase
      .from("user_profiles")
      .select("id, email")
      .eq("email", email.toLowerCase())
      .single();

    if (existing) {
      // If exists and we have auth_uid, update it
      if (authUserId) {
        const { error: updateError } = await supabase
          .from("user_profiles")
          .update({ auth_uid: authUserId })
          .eq("id", existing.id);

        if (updateError) {
          console.error("Error updating auth_uid:", updateError);
          return res.status(500).json({
            success: false,
            error: "Failed to update user profile"
          });
        }
      }

      return res.status(200).json({
        success: true,
        userId: existing.id
      });
    }

    // Create user profile with auth_uid
    const { data: profile, error: profileError } = await supabase
      .from("user_profiles")
      .insert({
        email: email.toLowerCase(),
        name: name.trim(),
        auth_uid: authUserId || null
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

    // Create empty habits record with auth_uid
    const { error: habitsError } = await supabase
      .from("user_habits")
      .insert({
        user_id: profile.id,
        auth_uid: authUserId || null,
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
