import type { ServiceSlug } from "@/types/database";

export interface ServiceFAQ {
  question: string;
  answer: string;
}

export interface ServiceProcessStep {
  title: string;
  description: string;
}

export type ServiceIcon =
  | "PenTool"
  | "TrendingUp"
  | "Palette"
  | "Film"
  | "Code2"
  | "Bot"
  | "MapPin"
  | "Search"
  | "Megaphone"
  | "LayoutTemplate"
  | "MousePointerClick";

export interface Service {
  slug: ServiceSlug;
  name: string;
  shortDescription: string;
  heroDescription: string;
  icon: ServiceIcon;
  /** Slugs of sub-services nested under this one. Only set on parent categories. */
  subServiceSlugs?: string[];
  benefits: { title: string; description: string }[];
  process: ServiceProcessStep[];
  faqs: ServiceFAQ[];
  metaTitle: string;
  metaDescription: string;
}

/**
 * A lighter-weight page for services nested under a parent category
 * (e.g. Google Ads under Digital Marketing). Still a real, complete page —
 * hero, benefits, and a CTA — just without the full process/FAQ sections
 * the top-level services carry, since those live on the parent page.
 */
export interface SubService {
  slug: ServiceSlug;
  parentSlug: ServiceSlug;
  name: string;
  shortDescription: string;
  heroDescription: string;
  icon: ServiceIcon;
  benefits: { title: string; description: string }[];
  metaTitle: string;
  metaDescription: string;
}

export const services: Service[] = [
  {
    slug: "content-creation",
    name: "Content Creation",
    shortDescription: "Words, visuals, and video that earn attention instead of asking for it.",
    heroDescription:
      "We plan, write, shoot, and edit content built around what your audience actually engages with — not what looks good in a deck. Every piece ties back to a goal: awareness, trust, or conversion.",
    icon: "PenTool",
    benefits: [
      {
        title: "Consistent brand voice",
        description: "One clear voice across every platform, so your business sounds like itself everywhere a customer finds you.",
      },
      {
        title: "Platform-native formats",
        description: "Content built for how each platform actually behaves, not a single asset stretched across all of them.",
      },
      {
        title: "Repurposing built in",
        description: "Every long-form piece is planned with five or six smaller pieces already mapped out from it.",
      },
      {
        title: "Editorial calendar you can see",
        description: "A shared calendar so you always know what's publishing and when, with no surprises.",
      },
    ],
    process: [
      { title: "Discovery", description: "We learn your audience, voice, and what's already working before producing anything new." },
      { title: "Content strategy", description: "A content calendar mapped to specific goals — not just a posting schedule." },
      { title: "Production", description: "Writing, filming, and design happen on a cadence your team can review easily." },
      { title: "Review & refine", description: "You approve before anything publishes, with one round of revisions built in." },
      { title: "Publish & report", description: "We track what's working and adjust the next cycle based on real performance." },
    ],
    faqs: [
      {
        question: "Do you write the content or just plan it?",
        answer: "Both. We handle strategy, writing, filming, and editing in-house so nothing gets lost between a plan and what actually ships.",
      },
      {
        question: "Can you match our existing brand voice?",
        answer: "Yes — we start every engagement with a voice audit of your existing content before writing anything new, so it sounds consistent rather than like a different writer took over.",
      },
      {
        question: "How much content do we get per month?",
        answer: "This depends on the package, but most clients receive a mix of long-form and short-form content, scoped during onboarding to match your goals and budget.",
      },
      {
        question: "Do you need our involvement, or can this run independently?",
        answer: "We can run largely independently after onboarding, with a lightweight approval step before anything publishes. Some clients prefer more involvement — we adapt to what works for you.",
      },
    ],
    metaTitle: "Content Creation Services | ReemDigiTech",
    metaDescription: "Professional content creation services — writing, video, and design built around what your audience actually engages with.",
  },
  {
    slug: "digital-marketing",
    name: "Digital Marketing",
    shortDescription: "Paid and organic strategy built around revenue, not vanity metrics.",
    heroDescription:
      "We build full-funnel digital marketing campaigns across search, social, and local — designed to be traceable to actual revenue, not just impressions and follower counts. This covers Google Business Profile management, Google Ads, and Meta Ads as connected parts of one strategy, not separate line items.",
    icon: "TrendingUp",
    subServiceSlugs: ["google-business-profile", "google-ads", "meta-ads"],
    benefits: [
      {
        title: "Full-funnel thinking",
        description: "Campaigns built across awareness, consideration, and conversion — not just top-of-funnel ads.",
      },
      {
        title: "Transparent reporting",
        description: "Clear monthly reporting tied to cost-per-lead and revenue, not just reach and impressions.",
      },
      {
        title: "Platform expertise",
        description: "Hands-on experience across Google, Meta, and local search — matched to where your audience actually is.",
      },
      {
        title: "Continuous optimization",
        description: "Campaigns are monitored and adjusted weekly, not set up once and left alone.",
      },
    ],
    process: [
      { title: "Audit", description: "We review your existing channels, past campaigns, and competitive landscape." },
      { title: "Strategy", description: "A channel plan and budget allocation built around your specific goals and audience." },
      { title: "Campaign build", description: "Ad creative, targeting, and landing pages built and tested before scaling spend." },
      { title: "Launch & monitor", description: "Campaigns go live with close monitoring in the first two weeks to catch issues early." },
      { title: "Scale & report", description: "Budget shifts toward what's working, with transparent monthly reporting throughout." },
    ],
    faqs: [
      {
        question: "What's the minimum ad budget you recommend?",
        answer: "This varies by industry and goal, but we'll give you an honest recommendation during the strategy call rather than a generic minimum — sometimes a smaller, well-targeted budget outperforms a larger unfocused one.",
      },
      {
        question: "Do you manage the ad spend or just the strategy?",
        answer: "We manage campaigns end-to-end, including ad spend, within budgets you approve in advance. You always retain ownership of your ad accounts.",
      },
      {
        question: "How soon will we see results?",
        answer: "Paid channels typically show early signal within 2-3 weeks. Organic, local, and SEO-driven channels take longer — usually 3-6 months to compound meaningfully.",
      },
      {
        question: "Which platforms do you recommend for B2B vs B2C?",
        answer: "It depends entirely on where your specific audience spends time, which is part of what we assess in the initial audit rather than assuming based on industry alone.",
      },
    ],
    metaTitle: "Digital Marketing Services | ReemDigiTech",
    metaDescription: "Full-funnel digital marketing services across Google Ads, Meta Ads, and Google Business Profile — built around revenue, not vanity metrics.",
  },
  {
    slug: "graphic-design",
    name: "Graphic Design",
    shortDescription: "Visual identity that looks as credible as the business behind it.",
    heroDescription:
      "From logo systems to full brand guidelines, packaging, and marketing collateral — we design visual identities that hold up across every touchpoint a customer encounters.",
    icon: "Palette",
    benefits: [
      {
        title: "Complete brand systems",
        description: "Not just a logo — a full system of color, type, and layout rules your team can apply consistently.",
      },
      {
        title: "Built for every format",
        description: "Designs that work as well on a business card as they do on a billboard or a phone screen.",
      },
      {
        title: "Source files included",
        description: "You receive editable source files, not just exported images — the work is yours to keep using.",
      },
      {
        title: "Industry-aware design",
        description: "We design with your specific market's visual expectations in mind, not a generic template.",
      },
    ],
    process: [
      { title: "Brand discovery", description: "We learn your business, competitors, and the impression you need to make." },
      { title: "Concept exploration", description: "Two to three distinct directions presented before committing to one." },
      { title: "Refinement", description: "The chosen direction is refined based on your feedback through structured rounds." },
      { title: "Brand guidelines", description: "A complete guideline document so the identity stays consistent as you grow." },
      { title: "Delivery", description: "All source files and exports delivered in the formats your team actually needs." },
    ],
    faqs: [
      {
        question: "How many logo concepts do we get to choose from?",
        answer: "Typically two to three distinct directions in the first round, rather than a single option or an overwhelming dozen variations of the same idea.",
      },
      {
        question: "Do you design print materials as well as digital?",
        answer: "Yes — packaging, signage, business cards, and other print collateral are all part of our graphic design service, designed alongside the digital identity for consistency.",
      },
      {
        question: "What files do we receive at the end?",
        answer: "Full source files (typically Figma or Adobe formats) plus exported assets in the formats you'll need day-to-day — PNG, SVG, PDF, and others as relevant.",
      },
      {
        question: "Can you work from an existing brand we want to refresh?",
        answer: "Yes — we frequently refresh existing identities rather than starting from zero, keeping the elements that already work for you.",
      },
    ],
    metaTitle: "Graphic Design Services | ReemDigiTech",
    metaDescription: "Brand identity and graphic design services — logo systems, brand guidelines, packaging, and marketing collateral.",
  },
  {
    slug: "video-editing",
    name: "Video Editing",
    shortDescription: "Footage shaped into something people actually finish watching.",
    heroDescription:
      "Whether it's a launch film, a social cutdown series, or a full campaign, we edit video with attention to pacing and platform — built to hold attention from the first second.",
    icon: "Film",
    benefits: [
      {
        title: "Platform-specific cuts",
        description: "Each platform gets a version edited for its own pacing and aspect ratio, not one file resized everywhere.",
      },
      {
        title: "Fast turnaround",
        description: "Standard turnaround times communicated upfront, with rush options available when timing matters.",
      },
      {
        title: "Sound design included",
        description: "Music, sound effects, and audio mixing handled as part of every edit, not billed as an extra step.",
      },
      {
        title: "Motion graphics on request",
        description: "Titles, lower-thirds, and animated graphics integrated cleanly into the edit when your project calls for them.",
      },
    ],
    process: [
      { title: "Brief & footage review", description: "We review your raw footage or shot list and confirm the intended outcome." },
      { title: "Rough cut", description: "A first structural pass focused on pacing and story before any polish." },
      { title: "Refinement", description: "Color, sound, and graphics layered in based on your feedback on the rough cut." },
      { title: "Platform variants", description: "Cutdowns produced for each platform you need, sized and paced appropriately." },
      { title: "Final delivery", description: "Final files delivered in the exact specs each platform requires." },
    ],
    faqs: [
      {
        question: "Do we need to provide raw footage, or can you film it too?",
        answer: "We can support filming direction for projects that need it, though video editing as a standalone service typically starts from footage you already have.",
      },
      {
        question: "How long does a typical edit take?",
        answer: "A short-form social edit usually takes 2-4 business days; longer campaign films take longer depending on complexity. We'll give you a specific timeline during scoping.",
      },
      {
        question: "Can you match a specific style we've seen elsewhere?",
        answer: "Yes — send us reference videos and we'll factor that style into the edit, while making sure it still fits your own brand.",
      },
      {
        question: "How many revision rounds are included?",
        answer: "Two structured revision rounds are included as standard, which covers the vast majority of projects comfortably.",
      },
    ],
    metaTitle: "Video Editing Services | ReemDigiTech",
    metaDescription: "Professional video editing services for launch films, social cutdowns, and campaign video — built for how each platform performs.",
  },
  {
    slug: "web-development",
    name: "Web Development",
    shortDescription: "Fast, custom-built websites — not templates wearing your logo.",
    heroDescription:
      "We design and build custom websites focused on speed, clarity, and conversion. No bloated page builders — clean code that loads fast and scales as your business grows. This covers full website design and standalone landing pages as connected parts of one build process.",
    icon: "Code2",
    subServiceSlugs: ["website-design", "landing-pages"],
    benefits: [
      {
        title: "Built for speed",
        description: "Performance is a requirement from day one, not an afterthought fixed later.",
      },
      {
        title: "Mobile-first by default",
        description: "Every layout is designed for mobile first, since that's where most of your traffic actually arrives.",
      },
      {
        title: "SEO-ready architecture",
        description: "Proper metadata, semantic structure, and sitemaps built in from the start, not bolted on after launch.",
      },
      {
        title: "You own the codebase",
        description: "No lock-in to a proprietary builder — you receive a real, exportable codebase you fully own.",
      },
    ],
    process: [
      { title: "Discovery", description: "We map your goals, target audience, and the specific actions you want visitors to take." },
      { title: "Sitemap & wireframes", description: "Page structure and layout logic agreed before any visual design begins." },
      { title: "Visual design", description: "A distinct visual direction designed for your brand, not a recolored template." },
      { title: "Development", description: "Clean, performant code built and tested across devices before launch." },
      { title: "Launch & handover", description: "Full deployment plus documentation so your team can manage content going forward." },
    ],
    faqs: [
      {
        question: "Do you use website builders like Wix or Squarespace?",
        answer: "No — we build custom codebases using modern frameworks, which gives you better performance, more control, and no platform lock-in.",
      },
      {
        question: "Will we be able to update content ourselves after launch?",
        answer: "Yes — we build with a content management approach so your team can update text, images, and blog content without needing a developer for routine changes.",
      },
      {
        question: "How long does a typical website project take?",
        answer: "A standard business website typically takes 4-6 weeks from kickoff to launch; more complex projects take longer. We'll give you a specific timeline after the discovery call.",
      },
      {
        question: "Do you handle hosting and domain setup too?",
        answer: "Yes — we handle deployment and can guide domain and hosting setup, or work with your existing setup if you already have one in place.",
      },
    ],
    metaTitle: "Web Development Services | ReemDigiTech",
    metaDescription: "Custom web development services — website design, landing pages, fast and mobile-first, built on modern frameworks you fully own.",
  },
  {
    slug: "ai-agents-business-automation",
    name: "AI Agents & Business Automation",
    shortDescription: "Custom AI agents and automated workflows that take real work off your team's plate.",
    heroDescription:
      "We design and build AI agents and automation workflows tailored to how your business actually runs — handling lead follow-up, customer queries, internal reporting, and repetitive operational work, so your team spends time on what only people can do.",
    icon: "Bot",
    benefits: [
      {
        title: "Built around your workflow",
        description: "Automation mapped to how your team actually works today, not a generic template that forces you to change your process.",
      },
      {
        title: "Human handoff when it matters",
        description: "Agents are designed to know their limits and hand off to a real person at the right moment, not trap customers in a loop.",
      },
      {
        title: "Connected to your existing tools",
        description: "We integrate with the CRM, inbox, and systems you already use rather than asking you to adopt something new.",
      },
      {
        title: "Measurable time savings",
        description: "Every automation is scoped against a specific hours-saved or response-time target, so the value is clear, not assumed.",
      },
    ],
    process: [
      { title: "Process audit", description: "We map where your team's time actually goes before recommending any automation." },
      { title: "Opportunity scoping", description: "We identify the highest-value workflows to automate first, based on time saved and risk." },
      { title: "Build & integrate", description: "Agents and workflows are built and connected to your existing tools and data." },
      { title: "Test with real cases", description: "We run real scenarios before going live, refining based on edge cases that come up." },
      { title: "Launch & monitor", description: "We monitor performance after launch and tune the automation as your business changes." },
    ],
    faqs: [
      {
        question: "What kinds of tasks can actually be automated?",
        answer: "Common starting points include lead follow-up, FAQ-style customer queries, appointment scheduling, internal reporting, and data entry between systems. We'll tell you honestly if something isn't a good fit for automation yet.",
      },
      {
        question: "Will this replace our customer service team?",
        answer: "No — the goal is to handle repetitive, well-defined queries automatically and route anything complex or sensitive to a real person, so your team spends time where it actually matters.",
      },
      {
        question: "What if the AI gets something wrong?",
        answer: "We build in clear boundaries and handoff points so the agent escalates rather than guessing on anything outside its scope, and we review performance regularly after launch.",
      },
      {
        question: "Do we need technical staff to maintain this?",
        answer: "No — we handle the technical setup and maintenance. You'll get plain-language reporting on what the automation is doing and where it's adding value.",
      },
    ],
    metaTitle: "AI Agents & Business Automation | ReemDigiTech",
    metaDescription: "Custom AI agents and business automation workflows that handle real operational work — lead follow-up, customer queries, and reporting.",
  },
];

export const subServices: SubService[] = [
  {
    slug: "google-business-profile",
    parentSlug: "digital-marketing",
    name: "Google Business Profile",
    shortDescription: "An optimized, active Google Business Profile that turns local searches into calls and visits.",
    heroDescription:
      "We set up, optimize, and actively manage your Google Business Profile — accurate listings, regular posts, review management, and the local signals that decide whether your business shows up when someone nearby searches for what you offer.",
    icon: "MapPin",
    benefits: [
      {
        title: "Higher local visibility",
        description: "A complete, active profile is far more likely to appear in local search and map results than a neglected one.",
      },
      {
        title: "Review management",
        description: "We help you collect genuine reviews and respond to them, since both affect how your profile ranks and how trustworthy it looks.",
      },
      {
        title: "Always up to date",
        description: "Hours, services, photos, and posts kept current, so customers never get the wrong information.",
      },
      {
        title: "Tracked performance",
        description: "Regular reporting on views, searches, and actions like calls and direction requests.",
      },
    ],
    metaTitle: "Google Business Profile Management | ReemDigiTech",
    metaDescription: "Google Business Profile setup, optimization, and ongoing management to improve local search visibility and customer trust.",
  },
  {
    slug: "google-ads",
    parentSlug: "digital-marketing",
    name: "Google Ads",
    shortDescription: "Search and display campaigns built to capture people actively looking for what you offer.",
    heroDescription:
      "We plan, build, and manage Google Ads campaigns — search, display, and shopping — targeting people with real intent, with budgets monitored weekly and reported on in plain language, not jargon.",
    icon: "Search",
    benefits: [
      {
        title: "Intent-based targeting",
        description: "Campaigns built around what people are actually searching for, not broad guesses about who might be interested.",
      },
      {
        title: "Conversion tracking from day one",
        description: "Every campaign is set up to measure actual leads or sales, not just clicks.",
      },
      {
        title: "Budget discipline",
        description: "Spend monitored weekly so budget moves toward what's working and away from what isn't.",
      },
      {
        title: "Clear monthly reporting",
        description: "Reporting tied to cost-per-lead and return, in language a non-marketer can follow.",
      },
    ],
    metaTitle: "Google Ads Management | ReemDigiTech",
    metaDescription: "Google Ads campaign strategy and management — search, display, and shopping campaigns built around measurable conversions.",
  },
  {
    slug: "meta-ads",
    parentSlug: "digital-marketing",
    name: "Meta Ads",
    shortDescription: "Facebook and Instagram campaigns that reach the right audience with creative that actually stops the scroll.",
    heroDescription:
      "We build and manage Meta Ads campaigns across Facebook and Instagram — audience targeting, creative testing, and retargeting sequences designed to move people from first impression to customer.",
    icon: "Megaphone",
    benefits: [
      {
        title: "Creative that's tested, not guessed",
        description: "Multiple creative variants tested early so budget scales behind what's proven to work.",
      },
      {
        title: "Audience targeting that's specific",
        description: "Targeting built around your actual customer profile, refined as campaign data comes in.",
      },
      {
        title: "Retargeting built in",
        description: "Sequences that follow up with people who've already shown interest, not just cold outreach.",
      },
      {
        title: "Transparent spend reporting",
        description: "Clear visibility into where budget is going and what it's returning, every month.",
      },
    ],
    metaTitle: "Meta Ads Management | ReemDigiTech",
    metaDescription: "Facebook and Instagram advertising — audience targeting, creative testing, and retargeting built around measurable results.",
  },
  {
    slug: "website-design",
    parentSlug: "web-development",
    name: "Website Design",
    shortDescription: "A full website designed around your brand and built to convert, not just look good.",
    heroDescription:
      "We design complete, custom websites — from sitemap and wireframes through to a distinct visual identity — built to represent your business properly and guide visitors toward the action that matters.",
    icon: "LayoutTemplate",
    benefits: [
      {
        title: "Distinct visual identity",
        description: "A design built specifically for your brand, not a recolored template that looks like a dozen other sites.",
      },
      {
        title: "Conversion-focused layout",
        description: "Pages structured around the action you actually want visitors to take, not just visual flair.",
      },
      {
        title: "Mobile-first build",
        description: "Designed for how most visitors will actually arrive — on a phone — first, then scaled up.",
      },
      {
        title: "Easy to maintain",
        description: "Built with a content management approach so your team can update text and images without a developer.",
      },
    ],
    metaTitle: "Website Design Services | ReemDigiTech",
    metaDescription: "Custom website design built around your brand and conversion goals — mobile-first, fast, and easy to maintain.",
  },
  {
    slug: "landing-pages",
    parentSlug: "web-development",
    name: "Landing Pages",
    shortDescription: "Focused, fast-loading landing pages built for a single campaign goal.",
    heroDescription:
      "We design and build standalone landing pages for specific campaigns, launches, or offers — stripped of distractions, fast to load, and structured around a single clear conversion goal.",
    icon: "MousePointerClick",
    benefits: [
      {
        title: "Built for one goal",
        description: "No competing navigation or distractions — every element on the page supports a single conversion action.",
      },
      {
        title: "Fast to launch",
        description: "A focused scope means landing pages typically launch faster than a full website build.",
      },
      {
        title: "Built to test",
        description: "Structured so messaging and layout can be tested and refined based on real campaign performance.",
      },
      {
        title: "Tracking-ready",
        description: "Set up with conversion tracking from day one, so you know exactly how the page is performing.",
      },
    ],
    metaTitle: "Landing Page Design | ReemDigiTech",
    metaDescription: "Fast, focused landing pages built for a single campaign goal, with conversion tracking set up from day one.",
  },
];

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}

export function getSubServiceBySlug(slug: string): SubService | undefined {
  return subServices.find((s) => s.slug === slug);
}

export function getSubServicesByParent(parentSlug: string): SubService[] {
  return subServices.filter((s) => s.parentSlug === parentSlug);
}

/** Every service and sub-service name, used for dropdowns (contact form, booking form, portfolio service tags). */
export function getAllServiceNames(): string[] {
  return [...services.map((s) => s.name), ...subServices.map((s) => s.name)];
}
