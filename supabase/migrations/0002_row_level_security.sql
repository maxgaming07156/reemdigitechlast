-- ============================================================================
-- ReemDigiTech — Row Level Security
-- ============================================================================

alter table public.admin_profiles enable row level security;
alter table public.blog_posts enable row level security;
alter table public.portfolio_projects enable row level security;
alter table public.testimonials enable row level security;
alter table public.leads enable row level security;
alter table public.subscribers enable row level security;
alter table public.bookings enable row level security;

-- ----------------------------------------------------------------------------
-- Helper: is the current authenticated user a super_admin?
-- SECURITY DEFINER so it can read admin_profiles without recursive RLS checks.
-- ----------------------------------------------------------------------------

create or replace function public.is_super_admin()
returns boolean as $$
  select exists (
    select 1 from public.admin_profiles
    where id = auth.uid() and role = 'super_admin'
  );
$$ language sql security definer stable;

create or replace function public.is_admin()
returns boolean as $$
  select exists (
    select 1 from public.admin_profiles where id = auth.uid()
  );
$$ language sql security definer stable;

-- ----------------------------------------------------------------------------
-- ADMIN_PROFILES
-- Any authenticated admin can read the list (needed for "author" displays
-- etc). Only a super_admin can insert/update/delete other admins.
-- Inserts in practice happen via the service-role client from a server
-- action that has already checked the caller is a super_admin — these
-- policies are the defense-in-depth backstop, not the primary gate.
-- ----------------------------------------------------------------------------

create policy "Admins can view all admin profiles"
  on public.admin_profiles for select
  using (public.is_admin());

create policy "Super admins can insert admin profiles"
  on public.admin_profiles for insert
  with check (public.is_super_admin());

create policy "Super admins can update admin profiles"
  on public.admin_profiles for update
  using (public.is_super_admin());

create policy "Super admins can delete admin profiles, never themselves"
  on public.admin_profiles for delete
  using (public.is_super_admin() and id <> auth.uid());

-- ----------------------------------------------------------------------------
-- BLOG_POSTS
-- Public can read published posts. Any signed-in admin can manage posts.
-- ----------------------------------------------------------------------------

create policy "Public can read published blog posts"
  on public.blog_posts for select
  using (status = 'published');

create policy "Admins can read all blog posts"
  on public.blog_posts for select
  using (public.is_admin());

create policy "Admins can insert blog posts"
  on public.blog_posts for insert
  with check (public.is_admin());

create policy "Admins can update blog posts"
  on public.blog_posts for update
  using (public.is_admin());

create policy "Admins can delete blog posts"
  on public.blog_posts for delete
  using (public.is_admin());

-- ----------------------------------------------------------------------------
-- PORTFOLIO_PROJECTS — public read, admin-managed
-- ----------------------------------------------------------------------------

create policy "Public can read portfolio projects"
  on public.portfolio_projects for select
  using (true);

create policy "Admins can insert portfolio projects"
  on public.portfolio_projects for insert
  with check (public.is_admin());

create policy "Admins can update portfolio projects"
  on public.portfolio_projects for update
  using (public.is_admin());

create policy "Admins can delete portfolio projects"
  on public.portfolio_projects for delete
  using (public.is_admin());

-- ----------------------------------------------------------------------------
-- TESTIMONIALS — public read, admin-managed
-- ----------------------------------------------------------------------------

create policy "Public can read testimonials"
  on public.testimonials for select
  using (true);

create policy "Admins can insert testimonials"
  on public.testimonials for insert
  with check (public.is_admin());

create policy "Admins can update testimonials"
  on public.testimonials for update
  using (public.is_admin());

create policy "Admins can delete testimonials"
  on public.testimonials for delete
  using (public.is_admin());

-- ----------------------------------------------------------------------------
-- LEADS — anyone can submit (contact form), only admins can read/manage
-- ----------------------------------------------------------------------------

create policy "Anyone can submit a lead"
  on public.leads for insert
  with check (true);

create policy "Admins can read leads"
  on public.leads for select
  using (public.is_admin());

create policy "Admins can update leads"
  on public.leads for update
  using (public.is_admin());

create policy "Admins can delete leads"
  on public.leads for delete
  using (public.is_admin());

-- ----------------------------------------------------------------------------
-- SUBSCRIBERS — anyone can subscribe, only admins can read/manage
-- ----------------------------------------------------------------------------

create policy "Anyone can subscribe to the newsletter"
  on public.subscribers for insert
  with check (true);

create policy "Admins can read subscribers"
  on public.subscribers for select
  using (public.is_admin());

create policy "Admins can update subscribers"
  on public.subscribers for update
  using (public.is_admin());

create policy "Admins can delete subscribers"
  on public.subscribers for delete
  using (public.is_admin());

-- ----------------------------------------------------------------------------
-- BOOKINGS — anyone can submit a request, only admins can read/manage
-- ----------------------------------------------------------------------------

create policy "Anyone can submit a booking request"
  on public.bookings for insert
  with check (true);

create policy "Admins can read bookings"
  on public.bookings for select
  using (public.is_admin());

create policy "Admins can update bookings"
  on public.bookings for update
  using (public.is_admin());

create policy "Admins can delete bookings"
  on public.bookings for delete
  using (public.is_admin());
