-- ============================================================================
-- ReemDigiTech — Initial schema
-- Run order: 0001 → 0002 → 0003 (see supabase/migrations/README.md)
-- ============================================================================

create extension if not exists "uuid-ossp";
create extension if not exists "pgcrypto";

-- ----------------------------------------------------------------------------
-- ENUMS
-- ----------------------------------------------------------------------------

create type admin_role as enum ('super_admin', 'admin');
create type lead_status as enum ('new', 'contacted', 'qualified', 'closed', 'lost');
create type booking_status as enum ('pending', 'confirmed', 'completed', 'cancelled');
create type post_status as enum ('draft', 'published');
create type service_slug as enum (
  'content-creation',
  'digital-marketing',
  'graphic-design',
  'video-editing',
  'web-development'
);

-- ----------------------------------------------------------------------------
-- ADMIN PROFILES
-- Mirrors auth.users 1:1. There is intentionally no public sign-up path —
-- rows here are only ever created by a super_admin via a server action that
-- uses the service-role client (see app/admin/(protected)/admins/actions.ts).
-- ----------------------------------------------------------------------------

create table public.admin_profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text not null,
  email text not null unique,
  role admin_role not null default 'admin',
  avatar_url text,
  created_at timestamptz not null default now(),
  created_by uuid references public.admin_profiles(id),
  last_sign_in_at timestamptz
);

comment on table public.admin_profiles is 'Admin/super_admin accounts. No public registration — created only via super_admin action.';

-- ----------------------------------------------------------------------------
-- BLOG POSTS
-- ----------------------------------------------------------------------------

create table public.blog_posts (
  id uuid primary key default uuid_generate_v4(),
  title text not null,
  slug text not null unique,
  excerpt text not null,
  content text not null,
  cover_image text,
  category text not null default 'General',
  tags text[] not null default '{}',
  status post_status not null default 'draft',
  read_time_minutes integer not null default 5,
  meta_title text,
  meta_description text,
  author_id uuid references public.admin_profiles(id),
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index blog_posts_slug_idx on public.blog_posts(slug);
create index blog_posts_status_idx on public.blog_posts(status);

-- ----------------------------------------------------------------------------
-- PORTFOLIO PROJECTS
-- ----------------------------------------------------------------------------

create table public.portfolio_projects (
  id uuid primary key default uuid_generate_v4(),
  title text not null,
  slug text not null unique,
  description text not null,
  industry text not null,
  services text[] not null default '{}',
  featured_image text not null,
  gallery_images text[] not null default '{}',
  results text not null,
  client_name text not null,
  completion_date date not null,
  is_featured boolean not null default false,
  display_order integer not null default 0,
  meta_title text,
  meta_description text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index portfolio_projects_slug_idx on public.portfolio_projects(slug);
create index portfolio_projects_featured_idx on public.portfolio_projects(is_featured);

-- ----------------------------------------------------------------------------
-- TESTIMONIALS
-- ----------------------------------------------------------------------------

create table public.testimonials (
  id uuid primary key default uuid_generate_v4(),
  client_name text not null,
  client_title text not null,
  client_company text not null,
  client_country text not null,
  client_avatar text,
  content text not null,
  rating integer not null default 5 check (rating between 1 and 5),
  is_featured boolean not null default false,
  display_order integer not null default 0,
  created_at timestamptz not null default now()
);

create index testimonials_featured_idx on public.testimonials(is_featured);

-- ----------------------------------------------------------------------------
-- LEADS (contact form submissions)
-- ----------------------------------------------------------------------------

create table public.leads (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  company text,
  email text not null,
  phone text,
  service_interested_in text,
  budget text,
  message text not null,
  status lead_status not null default 'new',
  admin_notes text,
  created_at timestamptz not null default now()
);

create index leads_status_idx on public.leads(status);
create index leads_created_at_idx on public.leads(created_at desc);

-- ----------------------------------------------------------------------------
-- NEWSLETTER SUBSCRIBERS
-- ----------------------------------------------------------------------------

create table public.subscribers (
  id uuid primary key default uuid_generate_v4(),
  email text not null unique,
  subscribed_at timestamptz not null default now(),
  is_active boolean not null default true
);

create index subscribers_email_idx on public.subscribers(email);

-- ----------------------------------------------------------------------------
-- CONSULTATION BOOKINGS
-- ----------------------------------------------------------------------------

create table public.bookings (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  email text not null,
  phone text not null,
  company text,
  service_interested_in text,
  preferred_date date not null,
  preferred_time text not null,
  message text,
  status booking_status not null default 'pending',
  admin_notes text,
  created_at timestamptz not null default now()
);

create index bookings_status_idx on public.bookings(status);
create index bookings_preferred_date_idx on public.bookings(preferred_date);

-- ----------------------------------------------------------------------------
-- updated_at triggers
-- ----------------------------------------------------------------------------

create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger blog_posts_updated_at
  before update on public.blog_posts
  for each row execute function public.set_updated_at();

create trigger portfolio_projects_updated_at
  before update on public.portfolio_projects
  for each row execute function public.set_updated_at();
