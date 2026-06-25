"use client";

import * as React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, LogIn } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { adminLoginSchema, type AdminLoginValues } from "@/lib/validations";
import { loginAdmin } from "@/lib/auth-actions";

export function AdminLoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [serverError, setServerError] = React.useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<AdminLoginValues>({
    resolver: zodResolver(adminLoginSchema),
  });

  async function onSubmit(values: AdminLoginValues) {
    setServerError("");
    const result = await loginAdmin(values);
    if (result.success) {
      const redirectTo = searchParams.get("redirectTo") || "/admin";
      router.push(redirectTo);
      router.refresh();
    } else {
      setServerError(result.message);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input id="email" type="email" placeholder="you@reemdigitech.com" autoComplete="username" {...register("email")} />
        {errors.email && <p className="text-xs text-red-500">{errors.email.message}</p>}
      </div>
      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <Input id="password" type="password" placeholder="••••••••" autoComplete="current-password" {...register("password")} />
        {errors.password && <p className="text-xs text-red-500">{errors.password.message}</p>}
      </div>

      {serverError && <p className="text-sm text-red-500">{serverError}</p>}

      <Button type="submit" variant="indigo" size="lg" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <LogIn className="h-4 w-4" />}
        Sign In
      </Button>
    </form>
  );
}
