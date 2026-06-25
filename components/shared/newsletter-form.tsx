"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, ArrowRight, CheckCircle2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { newsletterFormSchema, type NewsletterFormValues } from "@/lib/validations";
import { subscribeToNewsletter } from "@/lib/actions";
import { cn } from "@/lib/utils";

export function NewsletterForm({ variant = "light" }: { variant?: "light" | "dark" }) {
  const [status, setStatus] = React.useState<"idle" | "success" | "error">("idle");
  const [statusMessage, setStatusMessage] = React.useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<NewsletterFormValues>({
    resolver: zodResolver(newsletterFormSchema),
  });

  async function onSubmit(values: NewsletterFormValues) {
    setStatus("idle");
    const result = await subscribeToNewsletter(values);
    setStatusMessage(result.message);
    setStatus(result.success ? "success" : "error");
    if (result.success) reset();
  }

  if (status === "success") {
    return (
      <div
        className={cn(
          "flex items-center gap-2 text-sm rounded-xl px-4 py-3",
          variant === "dark" ? "bg-ink-800 text-indigo-300" : "bg-indigo-50 text-indigo-700"
        )}
      >
        <CheckCircle2 className="h-4 w-4 shrink-0" />
        {statusMessage}
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
      <div className="flex gap-2">
        <Input
          type="email"
          placeholder="you@company.com"
          {...register("email")}
          className={cn(
            variant === "dark" && "bg-ink-800 border-ink-700 text-white placeholder:text-ink-500"
          )}
        />
        <Button type="submit" variant="indigo" size="icon" disabled={isSubmitting} aria-label="Subscribe">
          {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <ArrowRight className="h-4 w-4" />}
        </Button>
      </div>
      {errors.email && <p className="text-xs text-red-400">{errors.email.message}</p>}
      {status === "error" && <p className="text-xs text-red-400">{statusMessage}</p>}
    </form>
  );
}
