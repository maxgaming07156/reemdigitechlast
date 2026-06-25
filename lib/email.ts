import { Resend } from "resend";

let resendClient: Resend | null = null;

function getResend() {
  if (!resendClient) {
    if (!process.env.RESEND_API_KEY) {
      throw new Error("RESEND_API_KEY is not set.");
    }
    resendClient = new Resend(process.env.RESEND_API_KEY);
  }
  return resendClient;
}

interface LeadEmailPayload {
  name: string;
  email: string;
  company?: string;
  phone?: string;
  service_interested_in: string;
  budget?: string;
  message: string;
}

export async function sendLeadNotification(lead: LeadEmailPayload) {
  const to = process.env.NOTIFICATION_EMAIL;
  const from = process.env.RESEND_FROM_EMAIL;
  if (!to || !from) {
    console.warn("Skipping lead email: NOTIFICATION_EMAIL or RESEND_FROM_EMAIL not set.");
    return;
  }

  try {
    await getResend().emails.send({
      from: `ReemDigiTech <${from}>`,
      to,
      subject: `New enquiry from ${lead.name}${lead.company ? ` (${lead.company})` : ""}`,
      html: `
        <div style="font-family: sans-serif; max-width: 560px; margin: 0 auto;">
          <h2 style="color:#0B0F19;">New website enquiry</h2>
          <table style="width:100%; font-size:14px; color:#1F2530;">
            <tr><td style="padding:6px 0; font-weight:600;">Name</td><td>${escapeHtml(lead.name)}</td></tr>
            <tr><td style="padding:6px 0; font-weight:600;">Email</td><td>${escapeHtml(lead.email)}</td></tr>
            ${lead.company ? `<tr><td style="padding:6px 0; font-weight:600;">Company</td><td>${escapeHtml(lead.company)}</td></tr>` : ""}
            ${lead.phone ? `<tr><td style="padding:6px 0; font-weight:600;">Phone</td><td>${escapeHtml(lead.phone)}</td></tr>` : ""}
            <tr><td style="padding:6px 0; font-weight:600;">Service</td><td>${escapeHtml(lead.service_interested_in)}</td></tr>
            ${lead.budget ? `<tr><td style="padding:6px 0; font-weight:600;">Budget</td><td>${escapeHtml(lead.budget)}</td></tr>` : ""}
          </table>
          <p style="margin-top:16px; font-weight:600; color:#0B0F19;">Message</p>
          <p style="white-space:pre-wrap; color:#374151;">${escapeHtml(lead.message)}</p>
        </div>
      `,
    });
  } catch (error) {
    console.error("Failed to send lead notification email:", error);
  }
}

interface BookingEmailPayload {
  name: string;
  email: string;
  phone: string;
  company?: string;
  service_interested_in?: string;
  preferred_date: string;
  preferred_time: string;
  message?: string;
}

export async function sendBookingNotification(booking: BookingEmailPayload) {
  const to = process.env.NOTIFICATION_EMAIL;
  const from = process.env.RESEND_FROM_EMAIL;
  if (!to || !from) {
    console.warn("Skipping booking email: NOTIFICATION_EMAIL or RESEND_FROM_EMAIL not set.");
    return;
  }

  try {
    await getResend().emails.send({
      from: `ReemDigiTech <${from}>`,
      to,
      subject: `New consultation request from ${booking.name} — ${booking.preferred_date} at ${booking.preferred_time}`,
      html: `
        <div style="font-family: sans-serif; max-width: 560px; margin: 0 auto;">
          <h2 style="color:#0B0F19;">New consultation booking</h2>
          <table style="width:100%; font-size:14px; color:#1F2530;">
            <tr><td style="padding:6px 0; font-weight:600;">Name</td><td>${escapeHtml(booking.name)}</td></tr>
            <tr><td style="padding:6px 0; font-weight:600;">Email</td><td>${escapeHtml(booking.email)}</td></tr>
            <tr><td style="padding:6px 0; font-weight:600;">Phone</td><td>${escapeHtml(booking.phone)}</td></tr>
            ${booking.company ? `<tr><td style="padding:6px 0; font-weight:600;">Company</td><td>${escapeHtml(booking.company)}</td></tr>` : ""}
            ${booking.service_interested_in ? `<tr><td style="padding:6px 0; font-weight:600;">Service</td><td>${escapeHtml(booking.service_interested_in)}</td></tr>` : ""}
            <tr><td style="padding:6px 0; font-weight:600;">Preferred date</td><td>${escapeHtml(booking.preferred_date)}</td></tr>
            <tr><td style="padding:6px 0; font-weight:600;">Preferred time</td><td>${escapeHtml(booking.preferred_time)}</td></tr>
          </table>
          ${booking.message ? `<p style="margin-top:16px; font-weight:600; color:#0B0F19;">Message</p><p style="white-space:pre-wrap; color:#374151;">${escapeHtml(booking.message)}</p>` : ""}
        </div>
      `,
    });
  } catch (error) {
    console.error("Failed to send booking notification email:", error);
  }
}

function escapeHtml(input: string) {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
