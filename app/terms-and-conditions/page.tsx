import type { Metadata } from "next";
import { getSiteSettings } from "@/lib/data/settings";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description: "ReemDigiTech's terms and conditions for use of our website and services.",
  alternates: { canonical: "/terms-and-conditions" },
  robots: { index: true, follow: true },
};

export default async function TermsPage() {
  const settings = await getSiteSettings();

  return (
    <div className="pt-32 pb-24 container-px container max-w-3xl">
      <h1 className="font-display text-4xl font-semibold tracking-tight text-ink-900 dark:text-white">Terms & Conditions</h1>
      <p className="mt-2 text-sm text-ink-400">Last updated: June 22, 2026</p>

      <div className="mt-10 space-y-8 text-ink-600 dark:text-ink-300 leading-relaxed">
        <section>
          <h2 className="font-display text-xl font-semibold text-ink-900 dark:text-white mb-3">1. Acceptance of Terms</h2>
          <p>
            By accessing or using the ReemDigiTech website, you agree to be bound by these Terms & Conditions. If
            you do not agree with any part of these terms, please do not use our website.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl font-semibold text-ink-900 dark:text-white mb-3">2. Services</h2>
          <p>
            ReemDigiTech provides digital agency services including content creation, digital marketing, graphic
            design, video editing, web development, and AI-powered business automation. Specific service terms, deliverables, and pricing are
            agreed upon separately in individual client contracts or proposals.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl font-semibold text-ink-900 dark:text-white mb-3">3. Use of the Website</h2>
          <p>You agree to use our website only for lawful purposes. You must not:</p>
          <ul className="mt-3 list-disc pl-6 space-y-1.5">
            <li>Submit false or misleading information through our forms</li>
            <li>Attempt to gain unauthorized access to our systems or admin areas</li>
            <li>Use automated tools to scrape or extract content without permission</li>
            <li>Use the website in any way that could damage or impair its functionality</li>
          </ul>
        </section>

        <section>
          <h2 className="font-display text-xl font-semibold text-ink-900 dark:text-white mb-3">4. Intellectual Property</h2>
          <p>
            All content on this website — including text, graphics, logos, and portfolio materials — is the
            property of ReemDigiTech or its clients and is protected by applicable intellectual property laws.
            Portfolio work is displayed with client permission and remains the property of the respective client
            unless otherwise agreed.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl font-semibold text-ink-900 dark:text-white mb-3">5. Consultation Bookings</h2>
          <p>
            Booking a free consultation does not constitute a service agreement. Consultation requests are
            confirmed by our team via email, and either party may reschedule or cancel a confirmed booking with
            reasonable notice.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl font-semibold text-ink-900 dark:text-white mb-3">6. Limitation of Liability</h2>
          <p>
            ReemDigiTech provides this website on an "as is" basis and makes no warranties regarding uninterrupted
            or error-free operation. We are not liable for any indirect or consequential loss arising from use of
            this website.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl font-semibold text-ink-900 dark:text-white mb-3">7. Third-Party Links</h2>
          <p>
            Our website may contain links to third-party sites, including WhatsApp. We are not responsible for the
            content or privacy practices of any third-party services.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl font-semibold text-ink-900 dark:text-white mb-3">8. Changes to These Terms</h2>
          <p>
            We may update these terms from time to time. Continued use of the website after changes are posted
            constitutes acceptance of the revised terms.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl font-semibold text-ink-900 dark:text-white mb-3">9. Contact Us</h2>
          <p>
            For questions regarding these Terms & Conditions, please contact us at {settings.contact_email}.
          </p>
        </section>
      </div>
    </div>
  );
}
