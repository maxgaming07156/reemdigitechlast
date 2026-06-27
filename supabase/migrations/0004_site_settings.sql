-- ============================================================================
-- ReemDigiTech — Site Settings
-- A single-row table holding site-wide contact and social details that
-- should be editable from the admin panel without a code deploy.
-- ============================================================================

create table public.site_settings (
  id integer primary key default 1,
  contact_email text not null default 'info@reemdigitech.com',
  contact_phone_display text not null default '+971 50 508 2998',
  whatsapp_number text not null default '971505082998',
  office_location text not null default 'All over the globe',
  linkedin_url text,
  instagram_url text,
  facebook_url text,
  twitter_url text,
  updated_at timestamptz not null default now(),
  updated_by uuid references public.admin_profiles(id),

  -- Enforce a true singleton: only row id = 1 may ever exist.
  constraint site_settings_singleton check (id = 1)
);

comment on table public.site_settings is 'Single-row table of site-wide settings editable from /admin/settings.';

create trigger site_settings_updated_at
  before update on public.site_settings
  for each row execute function public.set_updated_at();

-- Seed the one row that will ever exist.
insert into public.site_settings (id) values (1);

-- ----------------------------------------------------------------------------
-- RLS — public can read (the public site needs these values), only admins
-- can update. No insert/delete policy is defined: the singleton row is
-- created once by this migration and is never deleted or duplicated.
-- ----------------------------------------------------------------------------

alter table public.site_settings enable row level security;

create policy "Public can read site settings"
  on public.site_settings for select
  using (true);

create policy "Admins can update site settings"
  on public.site_settings for update
  using (public.is_admin());
