import { z } from "zod";
import { getAllServiceNames } from "@/lib/data/services";

export const contactFormSchema = z.object({
  name: z.string().min(2, "Please enter your full name.").max(100),
  company: z.string().max(100).optional().or(z.literal("")),
  email: z.string().email("Please enter a valid email address."),
  phone: z.string().max(30).optional().or(z.literal("")),
  service_interested_in: z.string().min(1, "Please select a service."),
  budget: z.string().optional().or(z.literal("")),
  message: z.string().min(10, "Please tell us a little more — at least 10 characters.").max(2000),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;

export const newsletterFormSchema = z.object({
  email: z.string().email("Please enter a valid email address."),
});

export type NewsletterFormValues = z.infer<typeof newsletterFormSchema>;

export const bookingFormSchema = z.object({
  name: z.string().min(2, "Please enter your full name.").max(100),
  email: z.string().email("Please enter a valid email address."),
  phone: z.string().min(6, "Please enter a valid phone number.").max(30),
  company: z.string().max(100).optional().or(z.literal("")),
  service_interested_in: z.string().optional().or(z.literal("")),
  preferred_date: z.string().min(1, "Please select a date."),
  preferred_time: z.string().min(1, "Please select a time."),
  message: z.string().max(1000).optional().or(z.literal("")),
});

export type BookingFormValues = z.infer<typeof bookingFormSchema>;

export const adminLoginSchema = z.object({
  email: z.string().email("Please enter a valid email address."),
  password: z.string().min(6, "Password must be at least 6 characters."),
});

export type AdminLoginValues = z.infer<typeof adminLoginSchema>;

export const SERVICE_OPTIONS = [...getAllServiceNames(), "Not sure yet"];

export const BUDGET_OPTIONS = [
  "Under $1,000",
  "$1,000 – $5,000",
  "$5,000 – $15,000",
  "$15,000 – $50,000",
  "$50,000+",
  "Prefer not to say",
] as const;

export const TIME_SLOT_OPTIONS = [
  "9:00 AM",
  "10:00 AM",
  "11:00 AM",
  "12:00 PM",
  "1:00 PM",
  "2:00 PM",
  "3:00 PM",
  "4:00 PM",
  "5:00 PM",
] as const;
