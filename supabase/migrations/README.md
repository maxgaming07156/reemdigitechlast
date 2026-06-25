# Supabase Setup — ReemDigiTech

## 1. Create the project

1. Go to [supabase.com](https://supabase.com) → New Project.
2. Pick a region close to your primary audience (e.g. `eu-west-1` if most clients are UK/EU/UAE).
3. Save the database password somewhere safe — you'll need it for the CLI later.

## 2. Get your API keys

Project Settings → API:

- `Project URL` → `NEXT_PUBLIC_SUPABASE_URL`
- `anon public` key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `service_role` key → `SUPABASE_SERVICE_ROLE_KEY` (**secret — server only**)

Paste these into your `.env` file (copy `.env.example` → `.env` first).

## 3. Run the migrations

**Option A — SQL Editor (fastest, no CLI needed)**

Open Supabase Dashboard → SQL Editor → New query, and run each file in this folder **in order**:

1. `0001_initial_schema.sql`
2. `0002_row_level_security.sql`
3. `0003_seed_data.sql`
4. `0004_site_settings.sql`

**Option B — Supabase CLI**

```bash
npm install -g supabase
supabase login
supabase link --project-ref your-project-ref
supabase db push
```

## 4. Create your first Super Admin

There is intentionally no public sign-up page. You create the first admin manually, once:

1. Dashboard → Authentication → Users → **Add user** → create with an email + password (turn off "Auto confirm" only if you want to verify email first — for the first admin, leave auto-confirm **on**).
2. Copy the new user's UUID from the Authentication table.
3. Run this in the SQL Editor, replacing the placeholders:

```sql
insert into public.admin_profiles (id, full_name, email, role)
values (
  'paste-the-user-uuid-here',
  'Your Full Name',
  'your@email.com',
  'super_admin'
);
```

4. Log in at `/admin/login` with that email/password. You now have full super_admin access, including creating additional admins from the dashboard UI (Stage 2).

## 5. Storage buckets (for portfolio/blog images uploaded via the admin panel)

Dashboard → Storage → New bucket:

- `portfolio-images` — public bucket
- `blog-images` — public bucket
- `testimonial-avatars` — public bucket

These are referenced by the admin upload flows built in Stage 2. Until then, the seed data uses hosted Unsplash URLs as placeholders for the 6 sample projects.

## Migration files in this folder

| File | Purpose |
|---|---|
| `0001_initial_schema.sql` | Enums, all tables, indexes, `updated_at` triggers |
| `0002_row_level_security.sql` | RLS policies — public read where appropriate, admin-only writes, super_admin-only admin management |
| `0003_seed_data.sql` | 6 portfolio projects, 6 testimonials, 5 blog posts (all realistic, ready to publish) |
| `0004_site_settings.sql` | Singleton `site_settings` row for contact email, phone, WhatsApp number, and social links — editable from `/admin/settings` |
