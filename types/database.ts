export type AdminRole = "super_admin" | "admin";
export type LeadStatus = "new" | "contacted" | "qualified" | "closed" | "lost";
export type BookingStatus = "pending" | "confirmed" | "completed" | "cancelled";
export type PostStatus = "draft" | "published";
export type ServiceSlug = string;

export interface Database {
  public: {
    Tables: {
      admin_profiles: {
        Row: {
          id: string;
          full_name: string;
          email: string;
          role: AdminRole;
          avatar_url: string | null;
          created_at: string;
          created_by: string | null;
          last_sign_in_at: string | null;
        };
        Insert: {
          id: string;
          full_name: string;
          email: string;
          role?: AdminRole;
          avatar_url?: string | null;
          created_by?: string | null;
        };
        Update: Partial<Database["public"]["Tables"]["admin_profiles"]["Insert"]>;
      };
      blog_posts: {
        Row: {
          id: string;
          title: string;
          slug: string;
          excerpt: string;
          content: string;
          cover_image: string | null;
          category: string;
          tags: string[];
          status: PostStatus;
          read_time_minutes: number;
          meta_title: string | null;
          meta_description: string | null;
          author_id: string | null;
          published_at: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database["public"]["Tables"]["blog_posts"]["Row"], "id" | "created_at" | "updated_at"> & {
          id?: string;
        };
        Update: Partial<Database["public"]["Tables"]["blog_posts"]["Insert"]>;
      };
      portfolio_projects: {
        Row: {
          id: string;
          title: string;
          slug: string;
          description: string;
          industry: string;
          services: string[];
          featured_image: string;
          gallery_images: string[];
          results: string;
          client_name: string;
          completion_date: string;
          is_featured: boolean;
          display_order: number;
          meta_title: string | null;
          meta_description: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database["public"]["Tables"]["portfolio_projects"]["Row"], "id" | "created_at" | "updated_at"> & {
          id?: string;
        };
        Update: Partial<Database["public"]["Tables"]["portfolio_projects"]["Insert"]>;
      };
      testimonials: {
        Row: {
          id: string;
          client_name: string;
          client_title: string;
          client_company: string;
          client_country: string;
          client_avatar: string | null;
          content: string;
          rating: number;
          is_featured: boolean;
          display_order: number;
          created_at: string;
        };
        Insert: Omit<Database["public"]["Tables"]["testimonials"]["Row"], "id" | "created_at"> & {
          id?: string;
        };
        Update: Partial<Database["public"]["Tables"]["testimonials"]["Insert"]>;
      };
      leads: {
        Row: {
          id: string;
          name: string;
          company: string | null;
          email: string;
          phone: string | null;
          service_interested_in: string | null;
          budget: string | null;
          message: string;
          status: LeadStatus;
          admin_notes: string | null;
          created_at: string;
        };
        Insert: Omit<Database["public"]["Tables"]["leads"]["Row"], "id" | "created_at" | "status" | "admin_notes"> & {
          id?: string;
          status?: LeadStatus;
          admin_notes?: string | null;
        };
        Update: Partial<Database["public"]["Tables"]["leads"]["Insert"]>;
      };
      subscribers: {
        Row: {
          id: string;
          email: string;
          subscribed_at: string;
          is_active: boolean;
        };
        Insert: { id?: string; email: string; is_active?: boolean };
        Update: Partial<Database["public"]["Tables"]["subscribers"]["Insert"]>;
      };
      bookings: {
        Row: {
          id: string;
          name: string;
          email: string;
          phone: string;
          company: string | null;
          service_interested_in: string | null;
          preferred_date: string;
          preferred_time: string;
          message: string | null;
          status: BookingStatus;
          admin_notes: string | null;
          created_at: string;
        };
        Insert: Omit<Database["public"]["Tables"]["bookings"]["Row"], "id" | "created_at" | "status" | "admin_notes"> & {
          id?: string;
          status?: BookingStatus;
          admin_notes?: string | null;
        };
        Update: Partial<Database["public"]["Tables"]["bookings"]["Insert"]>;
      };
      site_settings: {
        Row: {
          id: number;
          contact_email: string;
          contact_phone_display: string;
          whatsapp_number: string;
          office_location: string;
          linkedin_url: string | null;
          instagram_url: string | null;
          facebook_url: string | null;
          twitter_url: string | null;
          updated_at: string;
          updated_by: string | null;
        };
        Insert: Partial<Database["public"]["Tables"]["site_settings"]["Row"]> & { id: number };
        Update: Partial<Database["public"]["Tables"]["site_settings"]["Row"]>;
      };
    };
  };
}

export type BlogPost = Database["public"]["Tables"]["blog_posts"]["Row"];
export type PortfolioProject = Database["public"]["Tables"]["portfolio_projects"]["Row"];
export type Testimonial = Database["public"]["Tables"]["testimonials"]["Row"];
export type Lead = Database["public"]["Tables"]["leads"]["Row"];
export type Subscriber = Database["public"]["Tables"]["subscribers"]["Row"];
export type Booking = Database["public"]["Tables"]["bookings"]["Row"];
export type AdminProfile = Database["public"]["Tables"]["admin_profiles"]["Row"];
export type SiteSettings = Database["public"]["Tables"]["site_settings"]["Row"];
