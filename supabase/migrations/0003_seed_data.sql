-- ============================================================================
-- ReemDigiTech — Seed data
-- Realistic starter content. Replace/expand via the admin dashboard.
-- ============================================================================

-- ----------------------------------------------------------------------------
-- PORTFOLIO PROJECTS
-- ----------------------------------------------------------------------------

insert into public.portfolio_projects
  (title, slug, description, industry, services, featured_image, gallery_images, results, client_name, completion_date, is_featured, display_order)
values
(
  'Brand Identity & Launch Campaign for a Manchester Restaurant Group',
  'uk-restaurant-branding',
  'A growing restaurant group in Manchester needed a cohesive brand identity ahead of opening a second location. We rebuilt their visual identity from the ground up — new logo system, menu design, signage, and a launch campaign across Instagram and local press — while keeping the warmth of the original brand intact.',
  'Hospitality & Restaurants',
  array['Graphic Design', 'Content Creation', 'Digital Marketing'],
  'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200&q=80',
  array[
    'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200&q=80',
    'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=1200&q=80',
    'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200&q=80'
  ],
  'Second location sold out its opening week within 48 hours of the campaign launch. Instagram following grew 340% over the campaign period, and footfall at the original location increased 22% from halo awareness.',
  'The Copper Fork Restaurant Group',
  '2025-11-14',
  true,
  1
),
(
  'Digital Marketing Strategy for a Dubai Real Estate Developer',
  'dubai-real-estate-marketing',
  'A boutique real estate developer in Dubai Marina was relying entirely on broker referrals and needed a direct-to-buyer digital presence. We built a full-funnel paid media strategy across Google and Meta, targeting overseas investors in the UK, India, and mainland Europe, paired with a lead-nurture email sequence.',
  'Real Estate',
  array['Digital Marketing', 'Web Development'],
  'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=1200&q=80',
  array[
    'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=1200&q=80',
    'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&q=80',
    'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&q=80'
  ],
  'Generated 412 qualified investor leads in the first quarter, with a cost-per-qualified-lead 38% below the developer''s previous broker-driven acquisition cost. Three units were reserved directly through the campaign landing page.',
  'Meridian Coastal Developments',
  '2026-02-03',
  true,
  2
),
(
  'E-Commerce Website for a Copenhagen Homeware Brand',
  'danish-ecommerce-website',
  'A Danish homeware brand selling minimalist ceramics and textiles needed to move off a templated store builder onto something that matched the quality of their product photography. We designed and built a custom storefront with a focus on load speed, Klarna integration, and a Nordic-minimal aesthetic.',
  'E-Commerce & Retail',
  array['Web Development', 'Graphic Design'],
  'https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=1200&q=80',
  array[
    'https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=1200&q=80',
    'https://images.unsplash.com/photo-1484101403633-562f891dc89a?w=1200&q=80',
    'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=1200&q=80'
  ],
  'Page load time dropped from 4.8s to 1.1s. Conversion rate improved 2.6x within the first two months post-launch, and mobile checkout abandonment fell by 31%.',
  'Nordhus Living',
  '2025-09-22',
  true,
  3
),
(
  'Marketing Campaign for a Lahore-Based Clothing Brand',
  'pakistani-clothing-brand-marketing',
  'An emerging unstitched fabric and ready-to-wear brand in Lahore wanted to build a national online following ahead of Eid season. We ran a content-led marketing push combining influencer seeding, short-form video, and a structured WhatsApp Business sales funnel for direct-to-customer orders.',
  'Fashion & Apparel',
  array['Digital Marketing', 'Content Creation', 'Video Editing'],
  'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1200&q=80',
  array[
    'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1200&q=80',
    'https://images.unsplash.com/photo-1551803091-e20673f15770?w=1200&q=80',
    'https://images.unsplash.com/photo-1445205170230-053b83016050?w=1200&q=80'
  ],
  'Eid season revenue increased 5.4x year-over-year. The brand''s Instagram account crossed 90,000 followers during the campaign, and WhatsApp inquiries converted to sales at a 47% rate.',
  'Zarqash Studio',
  '2026-04-01',
  true,
  4
),
(
  'Website Redesign for a B2B SaaS Platform',
  'saas-website-redesign',
  'A mid-market SaaS company providing inventory management software had outgrown its original marketing site, which no longer reflected its enterprise client base. We redesigned the site with a focus on credibility signals, a clearer product narrative, and a faster path from visitor to demo booking.',
  'SaaS & Technology',
  array['Web Development', 'Graphic Design'],
  'https://images.unsplash.com/photo-1551434678-e076c223a692?w=1200&q=80',
  array[
    'https://images.unsplash.com/photo-1551434678-e076c223a692?w=1200&q=80',
    'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&q=80',
    'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=1200&q=80'
  ],
  'Demo bookings increased 64% within six weeks of launch. Average time-on-site rose from 48 seconds to 2 minutes 12 seconds, and bounce rate on the homepage dropped by half.',
  'Stockwell Logistics Software',
  '2026-01-19',
  false,
  5
),
(
  'Product Launch Video Campaign for a Tech Startup',
  'video-campaign-for-startup',
  'A early-stage hardware startup needed a launch video that could carry their Kickstarter campaign and serve as the centerpiece of their paid social strategy. We handled scripting, filming direction, and post-production across a hero launch film and eight cutdown variants for different platforms.',
  'Technology & Startups',
  array['Video Editing', 'Content Creation'],
  'https://images.unsplash.com/photo-1492619375914-88005aa9e8fb?w=1200&q=80',
  array[
    'https://images.unsplash.com/photo-1492619375914-88005aa9e8fb?w=1200&q=80',
    'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=1200&q=80',
    'https://images.unsplash.com/photo-1536240478700-b869070f9279?w=1200&q=80'
  ],
  'The campaign launch video surpassed its funding goal in 36 hours, eventually reaching 312% of target. Cutdown variants achieved a 4.1% average click-through rate on Meta, well above the startup''s prior benchmarks.',
  'Lumen Hardware Co.',
  '2025-12-08',
  false,
  6
);

-- ----------------------------------------------------------------------------
-- TESTIMONIALS
-- ----------------------------------------------------------------------------

insert into public.testimonials
  (client_name, client_title, client_company, client_country, content, rating, is_featured, display_order)
values
(
  'Bilal Ahmed',
  'Founder',
  'Zarqash Studio',
  'Pakistan',
  'We had worked with two other agencies before ReemDigiTech and neither understood our market the way this team did. They actually asked about Eid timing and shipping cutoffs before building the campaign calendar, which told me they were paying attention. The WhatsApp funnel they set up is still bringing in orders every day.',
  5,
  true,
  1
),
(
  'Charlotte Webb',
  'Operations Director',
  'The Copper Fork Restaurant Group',
  'United Kingdom',
  'I was nervous about a rebrand this close to opening our second site, but the team kept us on schedule and the new identity looked stronger than anything our old branding agency gave us in five years. The launch week numbers spoke for themselves.',
  5,
  true,
  2
),
(
  'Mikael Sørensen',
  'Co-Founder',
  'Nordhus Living',
  'Denmark',
  'Our old site was embarrassingly slow and we knew it was costing us sales. ReemDigiTech rebuilt it properly instead of patching the old one, which took a bit longer but was clearly the right call once we saw the load times. Conversion rate has more than doubled since launch.',
  5,
  true,
  3
),
(
  'Fatima Al Suwaidi',
  'Marketing Manager',
  'Meridian Coastal Developments',
  'United Arab Emirates',
  'Real estate marketing for overseas buyers is a specific challenge and most agencies just run generic ads. This team built separate creative for our UK and Indian buyer segments, which made a noticeable difference in lead quality. We are now working with them on our next two launches.',
  5,
  true,
  4
),
(
  'James Holloway',
  'Head of Growth',
  'Stockwell Logistics Software',
  'United Kingdom',
  'Our previous website looked like it was built for a much smaller company than we actually are. The redesign gave us something we are comfortable sending to enterprise prospects, and our sales team has noticed the difference in how seriously people take the first call.',
  4,
  false,
  5
),
(
  'Sara Khan',
  'Brand Manager',
  'Lumen Hardware Co.',
  'Pakistan',
  'The launch video they produced for our Kickstarter exceeded what we expected for the budget we had. They were honest early on about what was realistic to film in the time we had, which I appreciated more than empty promises from other quotes we got.',
  5,
  false,
  6
);

-- ----------------------------------------------------------------------------
-- BLOG POSTS
-- Note: author_id is left null here since admin_profiles only populates
-- once a real super_admin account is created via Supabase Auth.
-- ----------------------------------------------------------------------------

insert into public.blog_posts
  (title, slug, excerpt, content, cover_image, category, tags, status, read_time_minutes, meta_title, meta_description, published_at)
values
(
  'How Digital Marketing Increases Revenue: A Practical Breakdown',
  'how-digital-marketing-increases-revenue',
  'Digital marketing only increases revenue when it''s tied to a clear funnel. Here''s how that actually works in practice, not in theory.',
  E'# How Digital Marketing Increases Revenue: A Practical Breakdown\n\nMost businesses know they should be "doing digital marketing," but far fewer can explain how it actually turns into revenue. The honest answer is that digital marketing increases revenue in three distinct ways, and most campaigns only ever target one of them.\n\n## 1. It Lowers the Cost of Acquiring a Customer\n\nTraditional advertising charges you for attention regardless of intent. Digital channels let you pay for intent directly — someone searching for your exact service, or matching a precise audience profile. When this is set up correctly, your cost per acquisition drops because you are no longer paying to reach people who were never going to buy.\n\n## 2. It Shortens the Sales Cycle\n\nA well-built funnel — landing page, retargeting sequence, email nurture — moves a prospect from "aware of you" to "ready to buy" faster than cold outreach ever could. Every day shaved off that cycle is cash flow recovered.\n\n## 3. It Increases the Value of Each Customer\n\nEmail marketing, retargeting, and content strategy aren''t just for new customer acquisition. The highest-leverage digital marketing increases the lifetime value of customers you already have, through upsell sequences and retention content.\n\n## Where Most Campaigns Go Wrong\n\nThe most common mistake is treating digital marketing as a visibility exercise rather than a revenue exercise. Impressions and follower counts feel like progress, but they don''t pay invoices. Every channel should be traceable to a number that matters: cost per lead, cost per acquisition, or revenue per email sent.\n\nIf you can''t draw a line from a marketing activity to one of those three numbers, it''s worth asking whether that activity should still be on the roadmap.',
  'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&q=80',
  'Digital Marketing',
  array['Digital Marketing', 'Strategy', 'Revenue Growth'],
  'published',
  6,
  'How Digital Marketing Increases Revenue | ReemDigiTech',
  'A practical breakdown of how digital marketing actually drives revenue — acquisition cost, sales cycle, and customer lifetime value explained.',
  now() - interval '18 days'
),
(
  'Why Every Business Needs a Modern Website in 2026',
  'why-every-business-needs-a-modern-website',
  'A website is no longer a digital brochure. For most businesses today, it is the first — and sometimes only — impression a customer forms before deciding whether to trust you.',
  E'# Why Every Business Needs a Modern Website in 2026\n\nThere is still a surprising number of established, profitable businesses operating with a website that hasn''t been touched since 2017. It often still "works" in the sense that it loads and lists a phone number. But working and performing are different things.\n\n## Your Website Is Doing a Trust Test Whether You Want It To or Not\n\nBefore a customer calls you, emails you, or visits your store, they almost always check your website first. In that moment, the site is answering a question the customer hasn''t asked out loud: is this business legitimate, current, and capable of doing what I need?\n\nAn outdated design, slow load time, or broken mobile layout answers that question with a quiet "no" — even if your actual service is excellent.\n\n## Speed Is Not a Technical Detail, It''s a Business Outcome\n\nEvery additional second of load time measurably increases the rate at which visitors leave before seeing anything. On mobile, where most traffic now originates, this effect is even sharper. A modern website built with performance as a requirement, not an afterthought, directly protects revenue that a slow site quietly loses.\n\n## Modern Doesn''t Mean Trend-Chasing\n\nA modern website isn''t about adopting every visual trend. It means: fast load times, mobile-first layout, clear navigation, accurate information, and a design that reflects the actual quality of the business behind it. Those fundamentals age far better than any particular visual style.\n\n## The Real Cost of Waiting\n\nThe businesses that delay a website refresh aren''t avoiding a cost — they''re paying a quieter one every day, in the form of visitors who leave without converting. A website rebuild has a clear, one-time cost. An underperforming website has an ongoing one that simply doesn''t show up on an invoice.',
  'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=1200&q=80',
  'Web Development',
  array['Web Development', 'Business Strategy'],
  'published',
  5,
  'Why Every Business Needs a Modern Website in 2026 | ReemDigiTech',
  'A modern website is no longer optional. Here is why an outdated site is quietly costing your business revenue every day.',
  now() - interval '12 days'
),
(
  'Content Creation Strategies for 2026',
  'content-creation-strategies-for-2026',
  'The content that performs in 2026 looks different from what worked even two years ago. Here are the strategies actually moving the needle right now.',
  E'# Content Creation Strategies for 2026\n\nContent creation has gone through several distinct eras in a short span of time, and the strategies that worked in 2022 are noticeably less effective today. Here is what is actually working now.\n\n## Native-Feeling Content Outperforms Polished Production\n\nAudiences have become highly sensitive to content that looks like an advertisement. Content that looks like it belongs on the platform — shot on a phone, lightly edited, conversational in tone — consistently outperforms heavily produced content for engagement, even when the production budget was identical.\n\n## Educational Content Builds Trust Faster Than Promotional Content\n\nA short video that genuinely teaches someone something related to your industry builds more trust in 90 seconds than a polished brand film does in three minutes. The brand benefit comes second; the value has to come first.\n\n## Repurposing Is a Strategy, Not a Shortcut\n\nA single well-made long-form piece — a webinar, a podcast episode, an in-depth article — can be broken into a dozen smaller pieces of content across platforms. Treating repurposing as a core part of the content plan, rather than an afterthought, multiplies the return on every piece of original content produced.\n\n## Consistency Beats Intensity\n\nA steady publishing cadence that a business can actually sustain outperforms an intense short burst of content followed by silence. Platforms reward accounts that post reliably, and audiences build a habit around a predictable presence.\n\n## What This Means Practically\n\nFor most businesses, this means investing in a smaller number of well-chosen content formats, executed consistently, rather than spreading effort thin across every platform and format at once.',
  'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=1200&q=80',
  'Content Creation',
  array['Content Creation', 'Social Media', 'Strategy'],
  'published',
  5,
  'Content Creation Strategies for 2026 | ReemDigiTech',
  'The content strategies actually working in 2026 — native-feeling production, educational content, repurposing, and consistency over intensity.',
  now() - interval '7 days'
),
(
  'A Practical Social Media Growth Guide for Small Businesses',
  'social-media-growth-guide',
  'Growing a social media following without a media budget is possible, but it requires a different approach than most businesses assume.',
  E'# A Practical Social Media Growth Guide for Small Businesses\n\nMost guidance on social media growth is written for influencers, not businesses. The goals are different — a business doesn''t need millions of followers, it needs the right few thousand who are actually likely to buy.\n\n## Start With Who You''re Trying to Reach, Not Which Platform\n\nThe biggest early mistake is choosing a platform based on where competitors are, rather than where actual customers spend time. A B2B service business chasing TikTok trends while ignoring LinkedIn is solving the wrong problem.\n\n## Comments Matter More Than Views\n\nA post with fewer views but genuine comments and shares is doing more commercial work than a high-view, low-engagement post. Comments indicate the content prompted a reaction strong enough to act on, which is a far better predictor of future purchase intent than a passive view.\n\n## Engage Like a Person, Not a Brand Account\n\nBusinesses that reply to comments and engage with other accounts in their space grow faster than those that only broadcast. Social platforms are fundamentally social, and accounts that behave that way are rewarded with more reach.\n\n## Paid Amplification Should Follow Organic Proof, Not Replace It\n\nThe most efficient use of ad spend is amplifying content that has already proven itself organically, rather than guessing which content will work and paying to find out. Let small organic tests inform where the budget goes.\n\n## Patience Is Part of the Strategy\n\nMeaningful organic growth on social media typically takes three to six months of consistent effort before it compounds. Businesses that abandon the effort at month one rarely see the results that show up by month four.',
  'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=1200&q=80',
  'Social Media',
  array['Social Media', 'Growth', 'Small Business'],
  'published',
  6,
  'Social Media Growth Guide for Small Businesses | ReemDigiTech',
  'A practical, no-fluff guide to growing social media following for small businesses without a large media budget.',
  now() - interval '4 days'
),
(
  'SEO Trends Every Company Should Know in 2026',
  'seo-trends-every-company-should-know',
  'Search behavior has shifted meaningfully with the rise of AI-powered search. Here is what that means for how companies should approach SEO now.',
  E'# SEO Trends Every Company Should Know in 2026\n\nSearch engine optimization has changed more in the past two years than in the previous decade, largely driven by how AI-powered search results now work. Here is what matters for businesses right now.\n\n## Answer Engines Are Now a Real Traffic Source\n\nAI-powered search summaries increasingly answer a user''s question directly on the results page, before they ever click a link. This has reduced raw click volume for some informational queries, but it has also created a new opportunity: content written clearly enough to be cited directly by these summaries gains visibility even without a click.\n\n## Experience and Expertise Signals Carry More Weight\n\nSearch engines have gotten better at identifying content written by someone with genuine, demonstrable expertise versus content assembled purely to rank. Author bios, original data, and specific real-world detail increasingly outperform generic, broad-strokes content.\n\n## Site Speed and Core Web Vitals Remain Non-Negotiable\n\nDespite all the algorithm shifts, technical performance has stayed a consistent ranking factor. A slow site is still penalized, regardless of how good the content sitting on it is.\n\n## Local Search Intent Is Becoming More Specific\n\nUsers increasingly search with highly specific, local intent — by neighborhood, by specific need, by immediate availability — rather than broad category terms. Businesses optimizing only for broad keywords are missing a growing share of qualified search volume.\n\n## What This Means for a Company''s SEO Strategy\n\nThe companies seeing results from SEO this year are the ones treating it as a content-quality and technical-performance discipline simultaneously, rather than treating it purely as a keyword-targeting exercise the way it was commonly approached several years ago.',
  'https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?w=1200&q=80',
  'SEO',
  array['SEO', 'Search', 'Digital Marketing'],
  'published',
  6,
  'SEO Trends Every Company Should Know in 2026 | ReemDigiTech',
  'How AI-powered search, expertise signals, and technical performance are reshaping SEO strategy for businesses in 2026.',
  now() - interval '2 days'
);
