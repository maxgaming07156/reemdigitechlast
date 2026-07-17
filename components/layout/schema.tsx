import type { SiteSettings, BlogPost, PortfolioProject } from "@/types/database";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://reemdigitech.com";
const GOOGLE_BUSINESS_URL = "https://www.google.com/maps/place/ReemDigiTech/@46.423669,-57.9397877,3z/data=!3m1!4b1!4m6!3m5!1s0x4ac6e281c07bb96f:0xf725c6624a74ce05!8m2!3d46.423669!4d-57.9397877!16s%2Fg%2F11zgt4_zk7!5m1!1e1?hl=en-GB&entry=ttu&g_ep=EgoyMDI2MDcxNC4wIKXMDSoASAFQAw%3D%3D";

export function getSocialLinks(settings: SiteSettings) {
  return [
    settings.linkedin_url,
    settings.facebook_url,
    settings.instagram_url,
    settings.twitter_url,
    GOOGLE_BUSINESS_URL,
  ].filter(Boolean) as string[];
}

export function OrganizationSchema({ settings }: { settings: SiteSettings }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "ReemDigiTech",
    url: SITE_URL,
    logo: `${SITE_URL}/logo-icon.png`,
    image: `${SITE_URL}/og-image.jpg`,
    sameAs: getSocialLinks(settings),
    contactPoint: {
      "@type": "ContactPoint",
      telephone: settings.contact_phone_display,
      contactType: "customer service",
      email: settings.contact_email,
      availableLanguage: "English",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export function LocalBusinessSchema({ settings }: { settings: SiteSettings }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "ReemDigiTech",
    image: `${SITE_URL}/og-image.jpg`,
    "@id": `${SITE_URL}/#localbusiness`,
    url: SITE_URL,
    telephone: settings.contact_phone_display,
    address: {
      "@type": "PostalAddress",
      streetAddress: settings.office_location, // We will use this as a generic address or global indicator
      addressLocality: "Global",
    },
    sameAs: getSocialLinks(settings),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export function WebSiteSchema() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "ReemDigiTech",
    url: SITE_URL,
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE_URL}/search?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export function ServiceSchema({ service }: { service: any }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.name,
    serviceType: service.name,
    description: service.heroDescription,
    provider: {
      "@type": "Organization",
      name: "ReemDigiTech",
      url: SITE_URL,
      logo: `${SITE_URL}/logo-icon.png`,
    },
    areaServed: {
      "@type": "GeoCircle",
      geoMidpoint: {
        "@type": "GeoCoordinates",
        latitude: 0,
        longitude: 0,
      },
      geoRadius: "40000000",
      description: "Worldwide",
    },
    offers: {
      "@type": "Offer",
      priceSpecification: {
        "@type": "UnitPriceSpecification",
        priceCurrency: "USD",
        priceType: "https://schema.org/MinimumPrice",
      },
      availability: "https://schema.org/InStock",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export function BlogPostingSchema({ post }: { post: BlogPost }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE_URL}/blog/${post.slug}`,
    },
    headline: post.title,
    description: post.excerpt,
    image: post.cover_image ? `${SITE_URL}${post.cover_image}` : `${SITE_URL}/og-image.jpg`,
    datePublished: post.published_at,
    dateModified: post.updated_at,
    author: {
      "@type": "Organization",
      name: "ReemDigiTech",
      url: SITE_URL,
    },
    publisher: {
      "@type": "Organization",
      name: "ReemDigiTech",
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/logo-icon.png`,
      },
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export function CreativeWorkSchema({ project }: { project: PortfolioProject }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    description: project.description,
    image: project.featured_image ? `${SITE_URL}${project.featured_image}` : `${SITE_URL}/og-image.jpg`,
    creator: {
      "@type": "Organization",
      name: "ReemDigiTech",
    },
    dateCreated: project.completion_date,
    about: {
      "@type": "Thing",
      name: project.industry,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export function FAQSchema({ faqs }: { faqs: { question: string; answer: string }[] }) {
  if (!faqs || faqs.length === 0) return null;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export function BreadcrumbSchema({
  items,
}: {
  items: { name: string; url: string }[];
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${SITE_URL}${item.url}`,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
