"use client";

import * as React from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, CalendarCheck, CheckCircle2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import {
  bookingFormSchema,
  type BookingFormValues,
  SERVICE_OPTIONS,
  TIME_SLOT_OPTIONS,
} from "@/lib/validations";
import { submitBookingForm } from "@/lib/actions";

function getMinDate() {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  return tomorrow.toISOString().split("T")[0];
}

function getMaxDate() {
  const future = new Date();
  future.setDate(future.getDate() + 60);
  return future.toISOString().split("T")[0];
}

export function BookingForm() {
  const [submitted, setSubmitted] = React.useState(false);
  const [serverError, setServerError] = React.useState("");

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<BookingFormValues>({
    resolver: zodResolver(bookingFormSchema),
  });

  async function onSubmit(values: BookingFormValues) {
    setServerError("");
    const result = await submitBookingForm(values);
    if (result.success) {
      setSubmitted(true);
      reset();
    } else {
      setServerError(result.message);
    }
  }

  if (submitted) {
    return (
      <div className="rounded-2xl bg-indigo-50 dark:bg-indigo-500/10 p-10 text-center">
        <CheckCircle2 className="h-12 w-12 text-indigo-500 mx-auto" />
        <h3 className="mt-4 font-display text-2xl font-semibold text-ink-900 dark:text-white">Request received</h3>
        <p className="mt-2 text-ink-500 dark:text-ink-300 max-w-sm mx-auto">
          We'll confirm your consultation slot by email shortly. Keep an eye on your inbox.
        </p>
        <Button variant="outline" className="mt-6" onClick={() => setSubmitted(false)}>
          Book another slot
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
          {errors.phone && <p className="text-xs text-red-500">{errors.phone.message}</p>}
        </div>
      </div>

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
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        <div className="space-y-2">
          <Label htmlFor="preferred_date">Preferred date</Label>
          <Input
            id="preferred_date"
            type="date"
            min={getMinDate()}
            max={getMaxDate()}
            {...register("preferred_date")}
          />
          {errors.preferred_date && <p className="text-xs text-red-500">{errors.preferred_date.message}</p>}
        </div>
        <div className="space-y-2">
          <Label>Preferred time</Label>
          <Controller
            name="preferred_time"
            control={control}
            render={({ field }) => (
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a time" />
                </SelectTrigger>
                <SelectContent>
                  {TIME_SLOT_OPTIONS.map((opt) => (
                    <SelectItem key={opt} value={opt}>{opt}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
          {errors.preferred_time && <p className="text-xs text-red-500">{errors.preferred_time.message}</p>}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="message">What would you like to discuss? (optional)</Label>
        <Textarea id="message" placeholder="A short summary helps us prepare for the call…" rows={4} {...register("message")} />
      </div>

      {serverError && <p className="text-sm text-red-500">{serverError}</p>}

      <Button type="submit" variant="indigo" size="lg" className="w-full sm:w-auto" disabled={isSubmitting}>
        {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <CalendarCheck className="h-4 w-4" />}
        Book Consultation
      </Button>
      <p className="text-xs text-ink-400">
        Times shown are in your local timezone. We'll confirm the exact slot by email.
      </p>
    </form>
  );
}
