# Deploying Nomyra Travels yourself (free tiers)

The site has three parts. Each one has a free host:

| Part | Folder | Free host |
|---|---|---|
| Website (React) | `frontend/` | **Netlify** |
| API (FastAPI) | `backend/` | **Render** (free web service) |
| Database (MongoDB) | — | **MongoDB Atlas** (M0 free cluster) |

Do them in this order: **database → API → website**. The website needs the API's URL, and the API needs the database's URL.

Total time: about 45 minutes. Cost: ₹0 (plus your domain).

---

## Step 0 — Get the code onto GitHub

In Emergent, use **Save to GitHub** to push this project to your own repository (private is fine). Netlify and Render both deploy straight from GitHub, so every future change is just a `git push`.

`.env` files are **not** included in the export — that is deliberate. You will type those values into Netlify and Render instead. Use `backend/.env.example` and `frontend/.env.example` as your checklists.

---

## Step 1 — MongoDB Atlas (database)

1. Sign up at [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas) → **Create** → **M0 Free** cluster → pick the region closest to you (Mumbai `ap-south-1`).
2. **Database Access** → Add New Database User → username + a strong password → role **Read and write to any database**. Save the password somewhere.
3. **Network Access** → Add IP Address → **Allow access from anywhere** (`0.0.0.0/0`). Render's free tier has no fixed IP, so this is required.
4. **Connect** → **Drivers** → copy the connection string. It looks like:
   ```
   mongodb+srv://USER:PASSWORD@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```
   Replace `USER` and `PASSWORD` with the ones you just created. Keep this string — it is your `MONGO_URL`.

---

## Step 2 — Render (API)

1. Sign up at [render.com](https://render.com) → **New** → **Web Service** → connect your GitHub repo.
2. Settings:
   - **Root Directory**: `backend`
   - **Runtime**: Python 3
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `uvicorn server:app --host 0.0.0.0 --port $PORT`
   - **Instance Type**: Free
   - **Health Check Path**: `/api/`
3. **Environment** → add every variable from `backend/.env.example`. The important ones:
   - `MONGO_URL` — from Step 1
   - `DB_NAME` — `nomyra`
   - `CORS_ORIGINS` — `https://yourdomain.com,https://www.yourdomain.com` (add your `*.netlify.app` URL too while testing)
   - `JWT_SECRET` — generate with `python -c "import secrets; print(secrets.token_hex(32))"`
   - `ADMIN_EMAIL` / `ADMIN_PASSWORD` — your CMS login
   - `BUSINESS_PHONE`, `BUSINESS_WHATSAPP`, `BUSINESS_EMAIL`, `SITE_URL`
   - `WHATSAPP_CLOUD_ENABLED` — `false` for now
4. **Create Web Service**. First build takes ~5 minutes.
5. Test it: open `https://your-service.onrender.com/api/packages` — you should see JSON with 3 packages. The database seeds itself with all your content (packages, 13 destinations, 6 experiences, 18 photos, 12 blog articles) on first start.

> A repo `render.yaml` is included, so you can also use Render's **Blueprint** option instead of filling the form manually.

**Free tier caveat:** the service sleeps after ~15 minutes of no traffic and takes 30–60 seconds to wake. The first visitor after a quiet period will see a slow-loading page. A free uptime pinger like [cron-job.org](https://cron-job.org) hitting `https://your-service.onrender.com/api/` every 10 minutes mostly avoids this. Render's paid Starter plan (~$7/month) removes it entirely.

---

## Step 3 — Netlify (website)

1. Sign up at [netlify.com](https://netlify.com) → **Add new site** → **Import an existing project** → your GitHub repo.
2. Netlify reads `netlify.toml` from the repo root, so the build settings fill themselves in (base `frontend`, command `yarn build`, publish `build`). Leave them.
3. **Site settings → Environment variables** → add everything from `frontend/.env.example`:
   - `REACT_APP_BACKEND_URL` — your Render URL from Step 2, **no trailing slash**
   - `REACT_APP_SITE_URL` — `https://yourdomain.com`
   - `REACT_APP_BUSINESS_PHONE` — `"+917002492612"` (keep the quotes)
   - `REACT_APP_BUSINESS_WHATSAPP`, `REACT_APP_BUSINESS_EMAIL`, `REACT_APP_BUSINESS_LOCATION`
   - `CI` — `false`
4. **Deploy site**. Open the `*.netlify.app` URL and check that packages, destinations and blog posts load. If they don't, it is almost always `REACT_APP_BACKEND_URL` or `CORS_ORIGINS`.

> These `REACT_APP_*` values are baked in at build time. After changing any of them you must **Trigger deploy → Clear cache and deploy site**, otherwise the old values stay live.

---

## Step 4 — Your domain

1. Buy the domain (GoDaddy, Namecheap, Cloudflare — all fine).
2. Netlify → **Domain management** → **Add a domain** → enter it → follow the instructions. Two ways:
   - **Netlify DNS** (easiest): point your registrar's nameservers at the four Netlify nameservers shown.
   - **External DNS**: add an `A` record for `@` → `75.2.60.5` and a `CNAME` for `www` → `your-site.netlify.app`.
3. Netlify issues a free Let's Encrypt SSL certificate automatically within a few minutes. Turn on **Force HTTPS**.
4. Go back and update, then redeploy:
   - Netlify: `REACT_APP_SITE_URL` → your domain (clear cache and deploy)
   - Render: `SITE_URL` → your domain, and `CORS_ORIGINS` → your domain

---

## Step 5 — Get on Google

`sitemap.xml` and `robots.txt` are regenerated from `REACT_APP_SITE_URL` on every build, so they always carry the right domain.

1. [Google Search Console](https://search.google.com/search-console) → **Add property** → **Domain** → your domain.
2. Verify with the DNS `TXT` record it gives you (add it at your registrar or in Netlify DNS).
3. **Sitemaps** → submit `sitemap.xml`.
4. **URL Inspection** → paste your homepage → **Request indexing**. Do the same for `/packages` and two or three blog articles.
5. Create a free [Google Business Profile](https://www.google.com/business/) for Nomyra Travels — for a local travel operator this often brings more calls than the website ranking itself.

Indexing takes a few days to a few weeks. The FAQ section on your homepage has FAQPage structured data, so those questions can appear as expandable results in Google.

---

## Your admin CMS

- **URL**: `https://yourdomain.com/admin/login`
- **Email / password**: whatever you set as `ADMIN_EMAIL` / `ADMIN_PASSWORD` on Render
- To change the password later: update `ADMIN_PASSWORD` on Render and restart the service — it re-syncs on startup.

From there you edit packages, destinations, experiences, testimonials, gallery photos and blog posts, and read every enquiry that comes in. No code, no redeploy.

---

## Turning on automatic WhatsApp alerts (later)

Enquiries are saved to the database and open a pre-filled WhatsApp message for the traveller today. To also get an automatic message on your own phone the moment an enquiry lands:

1. Set up a Meta WhatsApp Business / Cloud API app and get a permanent **access token** and **phone number ID**.
2. On Render set `WHATSAPP_ACCESS_TOKEN`, `WHATSAPP_PHONE_NUMBER_ID`, `WHATSAPP_ADMIN_NUMBER` and flip `WHATSAPP_CLOUD_ENABLED` to `true`.
3. Restart. The code is already written — nothing else to change.

---

## Quick troubleshooting

| Symptom | Cause | Fix |
|---|---|---|
| Page loads but no packages/blog | API URL wrong or asleep | Open `REACT_APP_BACKEND_URL` + `/api/packages` directly; check for a trailing slash |
| Browser console shows a CORS error | `CORS_ORIGINS` missing your domain | Add the exact origin (with `https://`) on Render and restart |
| Phone/WhatsApp buttons do nothing | `REACT_APP_BUSINESS_*` not set at build | Add them on Netlify, then clear cache and redeploy |
| Admin login fails | `ADMIN_EMAIL`/`ADMIN_PASSWORD` not set, or 5 wrong attempts | Check Render env vars; lockout clears after 15 minutes |
| Refreshing `/packages` gives a 404 | SPA redirect missing | Confirm `netlify.toml` is in the repo root |
| Sitemap shows the old domain | Built before `REACT_APP_SITE_URL` changed | Clear cache and deploy again |

## Local development

```bash
# API
cd backend && cp .env.example .env   # fill in MONGO_URL etc.
pip install -r requirements.txt
uvicorn server:app --reload --port 8001

# Website (second terminal)
cd frontend && cp .env.example .env  # REACT_APP_BACKEND_URL=http://localhost:8001
yarn install && yarn start
```
