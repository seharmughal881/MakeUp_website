# 🚀 Deploy on Vercel — Setup Guide

The site runs on Vercel with **persistent images + data** using:

- **Vercel Blob** → uploaded images
- **Upstash Redis (KV)** → bookings + website content

Locally (no env vars) it automatically falls back to the filesystem, so `npm run dev` keeps working with no setup.

---

## Step 1 — Import the project
1. Go to **vercel.com → Add New → Project**
2. Import the GitHub repo `seharmughal881/MakeUp_website`
3. Framework auto-detects as **Next.js**. Don't deploy yet — set up storage first (or redeploy after).

## Step 2 — Create a Blob store (for images)
1. In your Vercel project → **Storage** tab → **Create Database** → **Blob**
2. Name it (e.g. `salon-images`) → Create → **Connect to project**
3. ✅ This auto-adds the env var **`BLOB_READ_WRITE_TOKEN`** — you don't type it manually.

## Step 3 — Create a Redis/KV store (for bookings & content)
1. Storage tab → **Create Database** → **Upstash Redis** (Marketplace) → Create
2. **Connect to project**
3. ✅ This auto-adds the env vars **`KV_REST_API_URL`** + **`KV_REST_API_TOKEN`**
   (or `UPSTASH_REDIS_REST_URL` / `UPSTASH_REDIS_REST_TOKEN` — the code accepts both).

## Step 4 — Add your admin password
Project → **Settings → Environment Variables** → add:

| Key | Value |
|-----|-------|
| `ADMIN_PASSWORD` | your strong admin password |

## Step 5 — Deploy
Click **Deploy** (or **Redeploy** if you deployed earlier). Done ✅

---

## What env keys end up in Vercel

| Key | Added by | Purpose |
|-----|----------|---------|
| `BLOB_READ_WRITE_TOKEN` | Blob store (auto) | Save uploaded images |
| `KV_REST_API_URL` | Redis store (auto) | Bookings + content data |
| `KV_REST_API_TOKEN` | Redis store (auto) | Bookings + content data |
| `ADMIN_PASSWORD` | you (manual) | Admin panel login |

> You only manually add **`ADMIN_PASSWORD`**. The storage keys are added automatically when you connect the Blob & Redis stores to the project.

## How it behaves
- **No env vars (local dev):** images → `public/uploads/`, data → `data/*.json`
- **On Vercel (env vars present):** images → Vercel Blob, data → Redis
- Same code, no changes needed between the two.

## After deploying
- Open `https://your-app.vercel.app/admin`, log in with `ADMIN_PASSWORD`, and upload images / edit content — everything now persists.
- Free tiers (Blob + Upstash) are plenty for a salon site.
