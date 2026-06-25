"use server";

import { createClient } from "@/lib/supabase/server";
import { adminLoginSchema } from "@/lib/validations";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export interface AuthResult {
  success: boolean;
  message: string;
}

export async function loginAdmin(formData: unknown): Promise<AuthResult> {
  const parsed = adminLoginSchema.safeParse(formData);
  if (!parsed.success) {
    return { success: false, message: parsed.error.issues[0]?.message ?? "Please check your details." };
  }

  const supabase = await createClient();
  const { data, error } = await supabase.auth.signInWithPassword({
    email: parsed.data.email,
    password: parsed.data.password,
  });

  if (error || !data.user) {
    return { success: false, message: "Invalid email or password." };
  }

  // Confirm this user actually has an admin_profiles row — a Supabase Auth
  // user alone isn't enough, since admin status lives in our own table.
  const { data: profile } = await supabase
    .from("admin_profiles")
    .select("id")
    .eq("id", data.user.id)
    .single();

  if (!profile) {
    await supabase.auth.signOut();
    return { success: false, message: "This account does not have admin access." };
  }

  revalidatePath("/admin", "layout");
  return { success: true, message: "Welcome back." };
}

export async function logoutAdmin() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  revalidatePath("/", "layout");
  redirect("/admin/login");
}
