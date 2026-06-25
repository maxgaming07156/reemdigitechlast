"use server";

import { revalidatePath } from "next/cache";
import { createClient, createServiceRoleClient } from "@/lib/supabase/server";
import { z } from "zod";

export interface AdminActionResult {
  success: boolean;
  message: string;
}

/**
 * Confirms the caller is signed in AND has the super_admin role.
 * Every function in this file calls this first — admin account
 * management is the one area where a regular admin must never
 * succeed, even if a UI control were somehow exposed to them.
 */
async function requireSuperAdmin() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Not authenticated.");

  const { data: profile } = await supabase
    .from("admin_profiles")
    .select("id, role")
    .eq("id", user.id)
    .single();

  if (!profile || profile.role !== "super_admin") {
    throw new Error("Only super admins can manage admin accounts.");
  }

  return { supabase, userId: user.id };
}

const createAdminSchema = z.object({
  full_name: z.string().min(2, "Full name is required.").max(150),
  email: z.string().email("Please enter a valid email address."),
  password: z.string().min(8, "Password must be at least 8 characters."),
  role: z.enum(["admin", "super_admin"]),
});

export async function createAdminAccount(formData: unknown): Promise<AdminActionResult> {
  const parsed = createAdminSchema.safeParse(formData);
  if (!parsed.success) {
    return { success: false, message: parsed.error.issues[0]?.message ?? "Please check the form." };
  }

  try {
    const { userId } = await requireSuperAdmin();

    // Service-role client is required here: creating an Auth user via
    // admin.createUser is a privileged operation that the anon/session
    // client cannot perform, regardless of RLS on admin_profiles.
    const serviceClient = createServiceRoleClient();

    const { data: newUser, error: createUserError } = await serviceClient.auth.admin.createUser({
      email: parsed.data.email,
      password: parsed.data.password,
      email_confirm: true,
    });

    if (createUserError || !newUser.user) {
      console.error("Error creating auth user:", createUserError);
      const message = createUserError?.message?.includes("already been registered")
        ? "An account with this email already exists."
        : "Something went wrong creating the account.";
      return { success: false, message };
    }

    const { error: profileError } = await serviceClient.from("admin_profiles").insert({
      id: newUser.user.id,
      full_name: parsed.data.full_name,
      email: parsed.data.email,
      role: parsed.data.role,
      created_by: userId,
    });

    if (profileError) {
      console.error("Error creating admin profile:", profileError);
      // Roll back the orphaned auth user so we don't leave a login-capable
      // account with no admin_profiles row (which would also just fail
      // login anyway, but better to clean it up).
      await serviceClient.auth.admin.deleteUser(newUser.user.id);
      return { success: false, message: "Something went wrong creating the admin profile." };
    }

    revalidatePath("/admin/admins");
    return { success: true, message: `${parsed.data.full_name} has been added as ${parsed.data.role === "super_admin" ? "a super admin" : "an admin"}.` };
  } catch (e) {
    console.error(e);
    return { success: false, message: e instanceof Error ? e.message : "You don't have permission to do this." };
  }
}

const updateRoleSchema = z.object({
  role: z.enum(["admin", "super_admin"]),
});

export async function updateAdminRole(id: string, role: "admin" | "super_admin"): Promise<AdminActionResult> {
  const parsed = updateRoleSchema.safeParse({ role });
  if (!parsed.success) {
    return { success: false, message: "Invalid role." };
  }

  try {
    const { supabase, userId } = await requireSuperAdmin();

    if (id === userId && role === "admin") {
      return { success: false, message: "You can't demote your own account." };
    }

    const { error } = await supabase.from("admin_profiles").update({ role }).eq("id", id);

    if (error) {
      console.error("Error updating admin role:", error);
      return { success: false, message: "Something went wrong updating the role." };
    }

    revalidatePath("/admin/admins");
    return { success: true, message: "Role updated." };
  } catch (e) {
    console.error(e);
    return { success: false, message: e instanceof Error ? e.message : "You don't have permission to do this." };
  }
}

export async function deleteAdminAccount(id: string): Promise<AdminActionResult> {
  try {
    const { userId } = await requireSuperAdmin();

    // Validate id is a well-formed UUID before it's used to build the
    // admin API request path. Defends against malformed-input path
    // confusion in the underlying auth client (see GHSA-8r88-6cj9-9fh5).
    if (!z.string().uuid().safeParse(id).success) {
      return { success: false, message: "Invalid admin id." };
    }

    if (id === userId) {
      return { success: false, message: "You can't delete your own account." };
    }

    const serviceClient = createServiceRoleClient();

    // Delete the admin_profiles row first, then the auth user — if the
    // auth deletion fails, we don't want a still-functional login with no
    // matching profile (login already checks for admin_profiles, but this
    // keeps the data model consistent either way).
    const { error: profileError } = await serviceClient.from("admin_profiles").delete().eq("id", id);
    if (profileError) {
      console.error("Error deleting admin profile:", profileError);
      return { success: false, message: "Something went wrong removing the admin." };
    }

    const { error: authError } = await serviceClient.auth.admin.deleteUser(id);
    if (authError) {
      console.error("Error deleting auth user:", authError);
      return { success: false, message: "The admin's access was removed, but their login could not be fully deleted. Contact support if this persists." };
    }

    revalidatePath("/admin/admins");
    return { success: true, message: "Admin account removed." };
  } catch (e) {
    console.error(e);
    return { success: false, message: e instanceof Error ? e.message : "You don't have permission to do this." };
  }
}
