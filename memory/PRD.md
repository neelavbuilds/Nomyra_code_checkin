# Nomyra Travels — PRD

## Original problem statement
Build a premium, modern, visually immersive travel website for **Nomyra Travels**, a company running curated journeys across Northeast India. Tagline: *"Discover the Northeast, Beyond the Ordinary."* It must feel like a professional 2026 travel brand (cinematic, nature-inspired, editorial) rather than a template, and its primary objective is **lead generation via travel enquiries** (call + WhatsApp), not just showcasing destinations.

## User choices (June 2026)
- Contact: phone & WhatsApp `7002492612`, email `nomadaccidental@gmail.com`, socials to be added later
- WhatsApp: wa.me click-to-chat now, Meta WhatsApp Cloud API wired but disabled until keys are added
- Admin CMS: yes, password protected (`nomadaccidental@gmail.com`)
- Blog: real draft articles for the listed SEO topics
- Design: dark cinematic, forest-green + charcoal editorial

## Architecture
- **Backend** — FastAPI (`/app/backend/server.py`), MongoDB via motor. Collections: `packages`, `destinations`, `experiences`, `testimonials`, `gallery`, `blog`, `enquiries`, `site_content`, `users`, `login_attempts`. Seed content in `seed_data.py`, inserted only when a collection is empty (CMS edits are never overwritten).
- **Auth** — bcrypt + JWT (12h access / 7d refresh), single admin seeded from env, brute-force lockout (5 attempts / 15 min). Admin frontend uses `Authorization: Bearer` from localStorage.
- **Enquiries** — validated, stored in Mongo, `build_whatsapp_message()` returns a pre-filled `wa.me` link; `notify_admin_whatsapp()` posts to the Meta Cloud API when `WHATSAPP_CLOUD_ENABLED=true`.
- **Frontend** — React 19 + React Router 7, Tailwind (custom night/forest/beige/terra palette), Cormorant Garamond + Manrope, framer-motion reveals, Lenis smooth scroll, SWR content hooks, lazy-loaded routes.
- **Reusable components** — `PackageCard`, `DestinationCard`, `ExperienceCard`, `TestimonialCard`, `GalleryCard`, `EnquiryForm`, `CTAButton`, `PageHero`, `Reveal`, `Seo`, `TripBuilder`.
- **SEO** — per-route title/description/canonical/OG/Twitter + JSON-LD (`TravelAgency`, `TouristTrip`, `TouristAttraction`, `Article`, `ItemList`), `/api/sitemap.xml` generated from the DB, `robots.txt`.

## Core requirements (static)
1. Lead generation first: call + WhatsApp reachable from every screen
2. No invented business facts (no fake reviews, awards, founder names, experience claims)
3. All contact details, images, packages and content editable without code changes
4. Mobile-first, premium on every breakpoint, no horizontal scroll
5. Scalable content model — new packages/destinations/experiences/posts require no design change

## Implemented (13 June 2026)
- Full site: Home (hero, brand statement, 3 packages, Meghalaya bento grid, dark "Go Beyond the Tourist Trail" experiences, 4 pillars, trip builder, Why Nomyra, gallery preview, testimonials, blog preview, dual enquiry CTA, journey strip), Packages + package detail, Meghalaya / Arunachal / Assam state pages, destination detail, Experiences + detail, Gallery with category filters, About, Contact, Blog + article pages, Privacy, Terms, 404
- 13 destinations, 6 experiences, 18 gallery photos, 12 full-length SEO blog articles
- Custom Trip Builder that pre-populates the enquiry dialog
- Enquiry form with validation → DB + wa.me hand-off + success state
- Floating Call/WhatsApp widget, sticky shrinking nav with mobile menu
- Admin CMS at `/admin` — enquiry inbox with statuses, CRUD for all 6 content collections
- Verified by testing agent: backend 23/23 pytest cases, all frontend flows passing

## Backlog
**P0** — none outstanding
**P1**
- Connect Meta WhatsApp Cloud API (needs access token + phone number ID) for automated admin notifications
- Editable contact/social settings from the admin dashboard (currently env-driven with runtime fallback)
- Add Instagram / Facebook / YouTube links once available
- Real testimonials and founder/team photos + bios
**P2**
- Per-package pricing, day-by-day itineraries and online booking + payments
- Newsletter, coupons, CRM export of enquiries
- Image uploads to object storage from the admin CMS (currently image URLs)
- Google Search Console verification after deployment

## Next tasks
1. Wire the Cloud API keys when the client's Meta Business account is ready
2. Admin-editable contact settings + social links
3. Founder/team content and genuine reviews
4. Itineraries and pricing per package
