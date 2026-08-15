# Nomyra Travels — code guide

Everything lives in `/app`. Two folders matter: `backend/` (the API) and `frontend/src/` (the website).

To get the code out of Emergent: **Save to GitHub** (button in the toolbar at the bottom of the chat), or open the **VS Code / file view** in the interface to browse and copy files directly.

---

## File map

```
backend/
  server.py            All API routes, auth, enquiries, admin CRUD, sitemap
  seed_data.py         ALL WEBSITE CONTENT — packages, destinations, experiences,
                       testimonials, gallery, 12 blog articles, about text, image URLs
  migrate_content.py   One-off script to push seed_data changes into an existing database
  requirements.txt     Python dependencies
  .env.example         Environment variables checklist

frontend/src/
  App.js               Routes (URL → page)
  index.css            Colours, fonts, global styles
  lib/site.js          Brand name, tagline, nav links, trip-builder chip options
  lib/api.js           Axios instance + auth token handling
  lib/content.js       Data-fetching hooks (SWR)

  components/
    Nav.jsx              Sticky navigation
    Footer.jsx           Footer
    FloatingContact.jsx  Floating Call + WhatsApp buttons
    EnquiryForm.jsx      Enquiry dialog: fields, validation, submit, success screen
    TripBuilder.jsx      Custom trip builder chips
    Layout.jsx           Page shell (nav + footer + smooth scroll)
    PageHero.jsx         Inner-page hero
    Seo.jsx              Per-page title, meta, Open Graph, JSON-LD schema
    CTAButton.jsx        All buttons
    Img.jsx              Lazy image with hover zoom
    Reveal.jsx           Scroll animations + section headings
    cards/               PackageCard, DestinationCard, ExperienceCard,
                         TestimonialCard, GalleryCard

  pages/
    Home.jsx             Homepage (hero, packages, Meghalaya, experiences,
                         pillars, why-us, gallery, testimonials, blog, FAQ)
    Packages.jsx         /packages          PackageDetail.jsx   /packages/:slug
    StatePage.jsx        /meghalaya /arunachal /assam
    DestinationDetail.jsx /destinations/:slug
    Experiences.jsx      /experiences       ExperienceDetail.jsx /experiences/:slug
    GalleryPage.jsx      /gallery           Blog.jsx  /blog      BlogPost.jsx /blog/:slug
    About.jsx  Contact.jsx  Legal.jsx  NotFound.jsx
    AdminLogin.jsx  AdminDashboard.jsx      /admin/login and /admin

frontend/public/
  index.html           Page title, meta description, fonts, business schema
  sitemap.xml          Auto-generated at build time
  robots.txt           Auto-generated at build time

netlify.toml           Netlify build + SPA redirect config
render.yaml            Render blueprint for the API
DEPLOY.md              Full self-hosting walkthrough
```

---

## Where to change common things

| I want to change… | Edit this |
|---|---|
| Packages, destinations, experiences, gallery, blog posts | **Use the admin CMS at `/admin`** — no code needed |
| The seeded starting content (fresh database) | `backend/seed_data.py` |
| Phone, WhatsApp, email, social links | Environment variables only — never hardcoded |
| Colours | `frontend/src/index.css` (the `:root` block) and `frontend/tailwind.config.js` |
| Fonts | The Google Fonts link in `frontend/public/index.html` + `index.css` |
| Brand name, tagline, nav menu items | `frontend/src/lib/site.js` |
| Trip-builder options (destinations, styles, durations) | `TRIP_OPTIONS` in `frontend/src/lib/site.js` |
| Enquiry form fields | `frontend/src/components/EnquiryForm.jsx` **and** the `EnquiryCreate` model in `backend/server.py` |
| Homepage section order, FAQ questions, "Travel Differently" pillars | `frontend/src/pages/Home.jsx` |
| Page titles / meta descriptions | The `<Seo />` block at the top of each file in `frontend/src/pages/` |
| Add a new page | Create it in `frontend/src/pages/`, then add a `<Route>` in `frontend/src/App.js` |
| Add an API endpoint | Add a route to the `api` router in `backend/server.py` (must start with `/api`) |
| Privacy policy / terms wording | `frontend/src/pages/Legal.jsx` |

---

## Two rules that will save you debugging

1. **Every backend route must start with `/api`.** That prefix is how requests get routed to the Python service instead of the website.
2. **Never hardcode URLs, phone numbers or secrets.** The frontend reads `process.env.REACT_APP_*`; the backend reads `os.environ`. Hardcoding breaks the moment you change domains.

## After changing `seed_data.py`

Seeding only runs on an **empty** collection, so your CMS edits are never overwritten. To push seed changes into a database that already has content:

```bash
cd backend && python migrate_content.py
```

Adjust that script first — it upserts by `slug`, so it will overwrite matching records.

## Running it locally

```bash
# API
cd backend && cp .env.example .env    # fill in MONGO_URL
pip install -r requirements.txt
uvicorn server:app --reload --port 8001

# Website (second terminal)
cd frontend && cp .env.example .env   # REACT_APP_BACKEND_URL=http://localhost:8001
yarn install && yarn start
```

Full hosting instructions are in `DEPLOY.md`.
