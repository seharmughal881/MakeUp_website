# 💄 Sehar Beauty Salon — Makeup Website

A modern, elegant and luxury **beauty parlour website** with a full admin CMS, built with **Next.js 16, TypeScript & Tailwind CSS**.

Premium **pink · black · gold** theme. Fully responsive (mobile / tablet / desktop), SEO-optimised and fast.

## ✨ Features

**Website (10 pages):** Home, About, Services, Bridal Makeup, Hair Styling, Skin Care & Facial, Gallery (with Before/After slider), Pricing, Reviews, Contact.

- Luxury hero banner, animated hover effects & scroll reveals
- Online appointment **booking form** + floating **WhatsApp** button
- Service cards with prices, testimonials, Google Maps, social links
- SEO: per-page metadata, sitemap, robots, JSON-LD structured data

**Backend / Admin (`/admin`):**
- Password-protected admin panel
- 📅 **Bookings** — view, change status (pending / confirmed / done / cancelled), delete, and notify customers via WhatsApp/Email
- 🎨 **Website Content (CMS)** — page-wise editors mirroring the navbar:
  Home, About, Services, Bridal/Hair/Skin pages, Gallery, Pricing, Reviews, Contact
- **Image upload** for every section
- Changes go live instantly

## 🚀 Getting Started

```bash
npm install
npm run dev      # http://localhost:3000
```

Build for production:

```bash
npm run build
npm start
```

## 🔐 Admin

- URL: `/admin`
- Default password: `sehar-admin`

> **Important:** change the admin password before going live by setting an env var in `.env.local`:
>
> ```
> ADMIN_PASSWORD=your-strong-password
> ```

## 🛠 Tech Stack

- [Next.js 16](https://nextjs.org/) (App Router)
- TypeScript
- Tailwind CSS v4
- File-based data store (`data/` — bookings & editable content)

## 📁 Notes

- `data/` and `public/uploads/` are git-ignored (runtime data & uploaded images).
- For serverless hosting (e.g. Vercel), move uploads to cloud storage (Cloudinary/S3) and bookings/content to a database.
