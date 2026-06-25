import type { Metadata } from "next";
import { getSiteSettings } from "@/lib/data/settings";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "ReemDigiTech's privacy policy — how we collect, use, and protect your information.",
  alternates: { canonical: "/privacy-policy" },
  robots: { index: true, follow: true },
};

export default async function PrivacyPolicyPage() {
  const settings = await getSiteSettings();

  return (
    <div className="pt-32 pb-24 container-px container max-w-3xl">
      <h1 className="font-display text-4xl font-semibold tracking-tight text-ink-900 dark:text-white">Privacy Policy</h1>
      <p className="mt-2 text-sm text-ink-400">Last updated: June 22, 2026</p>

      <div className="mt-10 space-y-8 text-ink-600 dark:text-ink-300 leading-relaxed">
        <section>
          <h2 className="font-display text-xl font-semibold text-ink-900 dark:text-white mb-3">1. Introduction</h2>
          <p>
            ReemDigiTech ("we", "us", "our") respects your privacy and is committed to protecting any personal
            information you share with us through our website. This policy explains what information we collect,
            how we use it, and the choices you have.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl font-semibold text-ink-900 dark:text-white mb-3">2. Information We Collect</h2>
          <p>We collect information you provide directly to us, including:</p>
          <ul className="mt-3 list-disc pl-6 space-y-1.5">
            <li>Contact details submitted through our contact form (name, email, phone, company)</li>
            <li>Project information you share, such as service interest, budget, and message content</li>
            <li>Email address when you subscribe to our newsletter</li>
            <li>Consultation booking details, including preferred date and time</li>
          </ul>
        </section>

        <section>
          <h2 className="font-display text-xl font-semibold text-ink-900 dark:text-white mb-3">3. How We Use Your Information</h2>
          <p>We use the information we collect to:</p>
          <ul className="mt-3 list-disc pl-6 space-y-1.5">
            <li>Respond to inquiries and provide requested services</li>
            <li>Schedule and manage consultation bookings</li>
            <li>Send newsletter content you've opted into, if applicable</li>
            <li>Improve our website and services</li>
          </ul>
        </section>

        <section>
          <h2 className="font-display text-xl font-semibold text-ink-900 dark:text-white mb-3">4. Data Storage and Security</h2>
          <p>
            Information submitted through our forms is stored securely using Supabase, with access restricted to
            authorized administrators through role-based permissions. We take reasonable technical measures to
            protect your data from unauthorized access.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl font-semibold text-ink-900 dark:text-white mb-3">5. Data Sharing</h2>
          <p>
            We do not sell or rent your personal information to third parties. We may share information with
            service providers who help us operate our website (such as email delivery providers), strictly for
            the purpose of providing that service.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl font-semibold text-ink-900 dark:text-white mb-3">6. Your Rights</h2>
          <p>
            You may request access to, correction of, or deletion of your personal information at any time by
            contacting us at {settings.contact_email}. You can also unsubscribe from our newsletter at any time.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl font-semibold text-ink-900 dark:text-white mb-3">7. Cookies</h2>
          <p>
            Our website may use essential cookies required for core functionality, such as maintaining admin login
            sessions. We do not use third-party advertising or tracking cookies.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl font-semibold text-ink-900 dark:text-white mb-3">8. Changes to This Policy</h2>
          <p>
            We may update this privacy policy from time to time. Material changes will be reflected by updating
            the "last updated" date at the top of this page.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl font-semibold text-ink-900 dark:text-white mb-3">9. Contact Us</h2>
          <p>
            If you have any questions about this privacy policy, please contact us at {settings.contact_email} or
            via WhatsApp at {settings.contact_phone_display}.
          </p>
        </section>
      </div>
    </div>
  );
}
