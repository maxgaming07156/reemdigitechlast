import type { Metadata } from "next";
import Image from "next/image";
import { Suspense } from "react";
import { AdminLoginForm } from "@/components/shared/admin-login-form";

export const metadata: Metadata = {
  title: "Admin Login",
  robots: { index: false, follow: false },
};

export default function AdminLoginPage() {
  return (
    <div className="min-h-screen bg-ink-900 flex items-center justify-center px-6">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-white overflow-hidden">
            <Image src="/logo-icon.png" alt="ReemDigiTech" width={48} height={48} className="h-11 w-11 object-contain" />
          </span>
          <h1 className="mt-5 font-display text-2xl font-semibold text-white">Admin Login</h1>
          <p className="mt-1.5 text-sm text-ink-400">Sign in to manage ReemDigiTech content</p>
        </div>

        <div className="rounded-3xl bg-ink-800 border border-ink-700 p-8">
          <Suspense>
            <AdminLoginForm />
          </Suspense>
        </div>

        <p className="mt-6 text-center text-xs text-ink-500">
          Admin accounts are created internally. There is no public registration.
        </p>
      </div>
    </div>
  );
}
