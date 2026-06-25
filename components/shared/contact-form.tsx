"use client";

import * as React from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Send, CheckCircle2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { contactFormSchema, type ContactFormValues, SERVICE_OPTIONS, BUDGET_OPTIONS } from "@/lib/validations";
import { submitContactForm } from "@/lib/actions";

export function ContactForm() {
  const [submitted, setSubmitted] = React.useState(false);
  const [serverError, setServerError] = React.useState("");

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
  });

  async function onSubmit(values: ContactFormValues) {
    setServerError("");
    const result = await submitContactForm(values);
    if (result.success) {
      setSubmitted(true);
      reset();
    } else {
      setServerError(result.message);
    }
  }

  if (submitted) {
    return (
      <div className="rounded-2xl bg-indigo-50 dark:bg-indigo-500/10 p-8 text-center">
        <CheckCircle2 className="h-10 w-10 text-indigo-500 mx-auto" />
        <h3 className="mt-4 font-display text-xl font-semibold text-ink-900 dark:text-white">Message sent</h3>
        <p className="mt-2 text-ink-500 dark:text-ink-300">
          Thanks for reaching out — we'll get back to you within one business day.
        </p>
        <Button variant="outline" className="mt-6" onClick={() => setSubmitted(false)}>
          Send another message
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div className="grid sm:grid-cols-2 gap-5">
        <div className="space-y-2">
          <Label htmlFor="name">Full name</Label>
          <Input id="name" placeholder="Jane Doe" {...register("name")} />
          {errors.name && <p className="text-xs text-red-500">{errors.name.message}</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="company">Company</Label>
          <Input id="company" placeholder="Acme Inc." {...register("company")} />
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="jane@company.com" {...register("email")} />
          {errors.email && <p className="text-xs text-red-500">{errors.email.message}</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone">Phone</Label>
          <Input id="phone" placeholder="+1 234 567 8900" {...register("phone")} />
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        <div className="space-y-2">
          <Label>Service interested in</Label>
          <Controller
            name="service_interested_in"
            control={control}
            render={({ field }) => (
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a service" />
                </SelectTrigger>
                <SelectContent>
                  {SERVICE_OPTIONS.map((opt) => (
                    <SelectItem key={opt} value={opt}>{opt}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
          {errors.service_interested_in && <p className="text-xs text-red-500">{errors.service_interested_in.message}</p>}
        </div>
        <div className="space-y-2">
          <Label>Budget</Label>
          <Controller
            name="budget"
            control={control}
            render={({ field }) => (
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a range" />
                </SelectTrigger>
                <SelectContent>
                  {BUDGET_OPTIONS.map((opt) => (
                    <SelectItem key={opt} value={opt}>{opt}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="message">Message</Label>
        <Textarea id="message" placeholder="Tell us a bit about what you're looking for…" rows={5} {...register("message")} />
        {errors.message && <p className="text-xs text-red-500">{errors.message.message}</p>}
      </div>

      {serverError && <p className="text-sm text-red-500">{serverError}</p>}

      <Button type="submit" variant="indigo" size="lg" className="w-full sm:w-auto" disabled={isSubmitting}>
        {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
        Send Message
      </Button>
    </form>
  );
}
