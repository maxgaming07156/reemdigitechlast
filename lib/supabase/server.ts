import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import type { Database } from "@/types/database";

/**
 * Use inside Server Components, Route Handlers, and Server Actions.
 * Server Components can't write cookies, so the try/catch below
 * silently no-ops there — middleware refreshes the session instead.
 */
export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // Called from a Server Component — middleware handles refresh.
          }
        },
      },
    }
  );
}

/**
 * Service-role client. SERVER ONLY. Bypasses Row Level Security.
 * Use only for trusted, explicitly-checked admin operations
 * (e.g. creating a new admin user). Never import this in client code.
 */
export function createServiceRoleClient() {
  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
      cookies: {
        getAll() {
          return [];
        },
        setAll() {
          // no-op: service role client doesn't manage user sessions
        },
      },
    }
  );
}
