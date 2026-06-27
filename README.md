# ReemDigiTech

Helping Businesses Grow Through Digital Innovation — a production digital agency website built with Next.js 15, TypeScript, Tailwind CSS, and Supabase.

## Scope

- Full public website: Home, About, Services (6 top-level service pages + 5 nested sub-service pages under Digital Marketing and Web Development), Portfolio, Portfolio Details, Testimonials, Blog, Blog Details, Book Consultation, Contact, Privacy Policy, Terms & Conditions
- Complete Supabase schema with Row Level Security (`supabase/migrations/`)
- Supabase Auth — admin/super_admin only, no public registration
- **Full admin dashboard**, all with real create/edit/delete (not stubs):
  - Blog Posts — markdown editor with live preview, tags, draft/published workflow, SEO fields
  - Portfolio Projects — service tags, gallery images, featured toggle, ordering
  - Testimonials — star ratings, featured toggle, ordering
  - Leads — status pipeline, filtering, private notes, delete
  - Bookings — status pipeline, filtering, private notes, delete
  - Newsletter — search, active/unsubscribed toggle, CSV export, delete
  - Admin Accounts (super_admin only) — create/delete admins, change roles, self-protection guardrails
  - Settings — contact email, phone, WhatsApp number, and social links, all live across the public site
- Contact form, newsletter signup, and consultation booking — all writing to the database with Resend email notifications
- Floating WhatsApp button site-wide, number configurable from Settings
- SEO: Metadata API, dynamic sitemap, robots.txt, OpenGraph/Twitter cards, JSON-LD structured data on services/portfolio/blog
- 6 realistic portfolio projects, 6 testimonials, 5 blog posts seeded

## Getting started

```bash
npm install
cp .env.example .env
# Fill in your Supabase + Resend keys in .env — see supabase/migrations/README.md
npm run dev
```

Then follow `supabase/migrations/README.md` to set up your database and create your first super_admin account.

## Tech stack

- **Framework:** Next.js 15 (App Router) + TypeScript
- **Styling:** Tailwind CSS + custom design tokens, ShadCN-pattern UI primitives
- **Animation:** Framer Motion (scroll reveals, page transitions) + GSAP (hero grid-mesh background)
- **Database/Auth:** Supabase (PostgreSQL + Row Level Security + Supabase Auth)
- **Forms:** React Hook Form + Zod validation
- **Email:** Resend
- **Icons:** Lucide React

## Project structure

```
app/                    Routes (App Router)
  admin/                Protected admin area (login is the only public route under here)
  services/[slug]/      Dynamic service pages
  portfolio/[slug]/     Dynamic portfolio detail pages
  blog/[slug]/          Dynamic blog detail pages
components/
  ui/                   Base primitives (button, input, select, accordion…)
  layout/               Header, footer
  sections/             Homepage section blocks
  shared/                Forms, reveal animations, WhatsApp button
lib/
  supabase/             Browser/server/middleware Supabase clients
  data/                 Static services data + Supabase query helpers
  actions.ts            Server actions: contact form, newsletter, booking
  auth-actions.ts        Server actions: admin login/logout
  email.ts              Resend integration
  validations.ts         Zod schemas
supabase/migrations/     SQL schema, RLS policies, seed data + setup guide
types/database.ts        Hand-maintained types mirroring the Supabase schema
```

## Deploying to Vercel

1. Push this project to a GitHub repository.
2. Import the repo in [Vercel](https://vercel.com/new).
3. Add all environment variables from `.env.example` in the Vercel project settings (Settings → Environment Variables). Make sure `SUPABASE_SERVICE_ROLE_KEY` and `RESEND_API_KEY` are added as **secret** — never exposed with `NEXT_PUBLIC_`.
4. Set `NEXT_PUBLIC_SITE_URL` to your production domain once known (used for sitemap/canonical URLs/OpenGraph).
5. Deploy. Vercel will run `npm install` and `npm run build` automatically.
6. After your first deploy, run the Supabase migrations (see `supabase/migrations/README.md`) if you haven't already, and create your first super_admin account.
7. Visit `/admin/login` on your live domain to confirm admin access works end-to-end.

## Notes on images

Blog covers and portfolio images use URL fields (paste a link from Unsplash, your CDN, or Supabase Storage's public URL) rather than direct file upload — this was a deliberate scope decision to ship faster. The seeded data uses hosted Unsplash URLs as realistic placeholders; swap these for real client photography by editing the project/post in the admin panel and pasting a new image URL, or by updating the `featured_image` / `gallery_images` / `cover_image` columns directly in Supabase.

If file upload becomes a priority later, the natural next step is a Supabase Storage bucket (`portfolio-images`, `blog-images`) with a simple upload component that returns a public URL into the same fields — no schema changes required.
