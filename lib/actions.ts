"use server";

import { createClient } from "@/lib/supabase/server";
import { sendLeadNotification, sendBookingNotification } from "@/lib/email";
import {
  contactFormSchema,
  newsletterFormSchema,
  bookingFormSchema,
} from "@/lib/validations";

export interface ActionResult {
  success: boolean;
  message: string;
}

export async function submitContactForm(formData: unknown): Promise<ActionResult> {
  const parsed = contactFormSchema.safeParse(formData);
  if (!parsed.success) {
    return { success: false, message: parsed.error.issues[0]?.message ?? "Please check the form and try again." };
  }

  const supabase = await createClient();
  const { error } = await supabase.from("leads").insert({
    name: parsed.data.name,
    company: parsed.data.company || null,
    email: parsed.data.email,
    phone: parsed.data.phone || null,
    service_interested_in: parsed.data.service_interested_in,
    budget: parsed.data.budget || null,
    message: parsed.data.message,
  });

  if (error) {
    console.error("Error inserting lead:", error);
    return { success: false, message: "Something went wrong submitting your message. Please try again." };
  }

  await sendLeadNotification({
    name: parsed.data.name,
    email: parsed.data.email,
    company: parsed.data.company,
    phone: parsed.data.phone,
    service_interested_in: parsed.data.service_interested_in,
    budget: parsed.data.budget,
    message: parsed.data.message,
  });

  return { success: true, message: "Thanks for reaching out — we'll get back to you within one business day." };
}

export async function subscribeToNewsletter(formData: unknown): Promise<ActionResult> {
  const parsed = newsletterFormSchema.safeParse(formData);
  if (!parsed.success) {
    return { success: false, message: parsed.error.issues[0]?.message ?? "Please enter a valid email." };
  }

  const supabase = await createClient();
  const { error } = await supabase
    .from("subscribers")
    .upsert({ email: parsed.data.email, is_active: true }, { onConflict: "email" });

  if (error) {
    console.error("Error inserting subscriber:", error);
    return { success: false, message: "Something went wrong subscribing. Please try again." };
  }

  return { success: true, message: "You're subscribed. Welcome aboard." };
}

export async function submitBookingForm(formData: unknown): Promise<ActionResult> {
  const parsed = bookingFormSchema.safeParse(formData);
  if (!parsed.success) {
    return { success: false, message: parsed.error.issues[0]?.message ?? "Please check the form and try again." };
  }

  const supabase = await createClient();
  const { error } = await supabase.from("bookings").insert({
    name: parsed.data.name,
    email: parsed.data.email,
    phone: parsed.data.phone,
    company: parsed.data.company || null,
    service_interested_in: parsed.data.service_interested_in || null,
    preferred_date: parsed.data.preferred_date,
    preferred_time: parsed.data.preferred_time,
    message: parsed.data.message || null,
  });

  if (error) {
    console.error("Error inserting booking:", error);
    return { success: false, message: "Something went wrong submitting your request. Please try again." };
  }

  await sendBookingNotification({
    name: parsed.data.name,
    email: parsed.data.email,
    phone: parsed.data.phone,
    company: parsed.data.company,
    service_interested_in: parsed.data.service_interested_in,
    preferred_date: parsed.data.preferred_date,
    preferred_time: parsed.data.preferred_time,
    message: parsed.data.message,
  });

  return { success: true, message: "Your consultation request is in. We'll confirm your slot by email shortly." };
}
