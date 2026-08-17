# ForYouPure Website — Deployment Guide

This is a plain HTML/CSS/JS site with a Supabase backend for email lead capture.
No build tools, no frameworks — you can deploy it as-is.

## Files in this folder

| File | Purpose |
|---|---|
| `index.html` | The site itself — hero, story, products, pillars, signup form |
| `style.css` | All styling (forest green / gold / kraft cream palette) |
| `script.js` | Connects the signup form + channel links to Supabase |
| `schema.sql` | Creates the database tables in Supabase |
| `README.md` | This file |

## Before you launch: what's still a placeholder

- All product images are stock Unsplash photos — swap for real product photography before launch.
- WhatsApp, Amazon, and email links say "Coming Soon" — update once those channels are live.
- `script.js` has two placeholder values (`SUPABASE_URL`, `SUPABASE_ANON_KEY`) that must be replaced — see Step 2 below. Until they're filled in, the signup form will show a friendly "not connected yet" message instead of failing silently.

---

## Step 1: Deploy to Netlify (free)

1. Go to [netlify.com](https://netlify.com) and sign up (no card required).
2. Click **Add new site > Deploy manually**.
3. Drag this whole folder into the upload area.
4. Netlify gives you a live URL like `foryoupure.netlify.app` within a minute.

## Step 2: Set up Supabase (free)

1. Go to [supabase.com](https://supabase.com) and create a free account + new project.
2. Open **SQL Editor > New query**, paste in the contents of `schema.sql`, and run it.
3. Go to **Project Settings > API** and copy your **Project URL** and **anon public key**.
4. Open `script.js` and replace:
   ```js
   const SUPABASE_URL = "YOUR_SUPABASE_PROJECT_URL";
   const SUPABASE_ANON_KEY = "YOUR_SUPABASE_ANON_KEY";
   ```
   with your real values.
5. Re-deploy: drag the updated folder into Netlify again (or push to GitHub if you've connected a repo).
6. Test it — submit your own email on the live site and confirm it appears in Supabase under **Table Editor > leads**.

## Step 3: Connect your domain

1. Buy your domain (Namecheap or GoDaddy).
2. In Netlify: **Site settings > Domain management > Add custom domain**.
3. Netlify shows you DNS records to add (usually an A record + CNAME for `www`).
4. In your domain registrar's DNS settings, add those exact records.
5. Wait 30 minutes–4 hours for DNS to propagate. Netlify auto-issues a free HTTPS certificate once it detects the domain is pointed correctly.

## Step 4: Add analytics (optional, free)

- **Google Analytics 4**: create a property at [analytics.google.com](https://analytics.google.com), add the tracking snippet to the `<head>` of `index.html`.
- **Google Search Console**: verify your domain at [search.google.com/search-console](https://search.google.com/search-console) to start tracking search performance.

---

## Ongoing costs

| Item | Cost |
|---|---|
| Domain | ~₹700–1,200/year |
| Netlify hosting | Free (up to 100GB bandwidth/month) |
| Supabase database | Free (up to 500MB storage, 50k monthly active users) |

Total: **domain only**, until you outgrow the free tiers.
