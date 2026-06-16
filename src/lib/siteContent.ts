import { SITE } from "./data";

/* ============================================================
   Editable site-wide content: business settings, hero, about.
   Managed from Admin → Website Content.
   ============================================================ */

export type SocialLinks = {
  instagram: string;
  facebook: string;
  tiktok: string;
  youtube: string;
};

export type SiteSettings = {
  name: string;
  tagline: string;
  phone: string;
  whatsapp: string; // digits only, international format
  email: string;
  address: string;
  city: string;
  hours: string;
  mapsEmbed: string;
  social: SocialLinks;
};

export type HeroContent = {
  badge: string;
  titleLine: string;
  titleHighlight: string;
  subtitle: string;
  bgImage: string;
  sideImage: string;
  stats: { value: string; label: string }[];
};

export type AboutContent = {
  banner: { title: string; subtitle: string; image: string };
  story: {
    eyebrow: string;
    heading: string;
    paragraphs: string[];
    image: string;
    stats: { value: string; label: string }[];
  };
  values: { icon: string; title: string; text: string }[];
  team: { name: string; role: string; image: string }[];
};

export const DEFAULT_SETTINGS: SiteSettings = {
  name: SITE.name,
  tagline: SITE.tagline,
  phone: SITE.phone,
  whatsapp: SITE.whatsapp,
  email: SITE.email,
  address: SITE.address,
  city: SITE.city,
  hours: SITE.hours,
  mapsEmbed: SITE.mapsEmbed,
  social: { ...SITE.social },
};

export const DEFAULT_HERO: HeroContent = {
  badge: "Where Elegance Meets Beauty",
  titleLine: "Reveal Your",
  titleHighlight: "Timeless Beauty",
  subtitle:
    "Luxury bridal makeup, hair styling, facials and premium beauty services — crafted by expert artists to make every woman feel radiant and confident.",
  bgImage:
    "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=1600&q=80&auto=format&fit=crop",
  sideImage:
    "https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?w=800&q=80&auto=format&fit=crop",
  stats: [
    { value: "10+", label: "Years Experience" },
    { value: "5K+", label: "Happy Clients" },
    { value: "500+", label: "Bridal Looks" },
  ],
};

export const DEFAULT_ABOUT: AboutContent = {
  banner: {
    title: "About Us",
    subtitle: "A decade of artistry, elegance and beauty excellence.",
    image:
      "https://images.unsplash.com/photo-1633681926022-84c23e8cb2d6?w=1600&q=80&auto=format&fit=crop",
  },
  story: {
    eyebrow: "Our Story",
    heading: "Beauty Crafted with Passion",
    paragraphs: [
      "Sehar Beauty Salon began with a simple dream — to create a space where every woman feels celebrated. What started as a small studio has grown into one of the city's most loved luxury salons.",
      "Today, our team of certified artists and stylists combines international techniques with premium products to deliver looks that are flawless, long-lasting and uniquely you. From your wedding day to everyday glamour, we are honoured to be part of your most beautiful moments.",
    ],
    image:
      "https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?w=900&q=80&auto=format&fit=crop",
    stats: [
      { value: "5K+", label: "Happy Clients" },
      { value: "500+", label: "Bridal Looks" },
      { value: "10+", label: "Years" },
    ],
  },
  values: [
    { icon: "🎯", title: "Our Mission", text: "To empower every woman to feel confident and beautiful through artistry, care and luxury." },
    { icon: "✨", title: "Our Vision", text: "To be the most trusted and loved beauty salon, setting the standard for elegance and quality." },
    { icon: "🤝", title: "Our Promise", text: "Premium products, hygienic practices and a personalised experience on every single visit." },
  ],
  team: [
    {
      name: "Sehar Ahmed",
      role: "Founder & Lead Bridal Artist",
      image:
        "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=500&q=80&auto=format&fit=crop",
    },
    {
      name: "Mahnoor Ali",
      role: "Senior Hair Stylist",
      image:
        "https://images.unsplash.com/photo-1607746882042-944635dfe10e?w=500&q=80&auto=format&fit=crop",
    },
    {
      name: "Zara Sheikh",
      role: "Skincare Specialist",
      image:
        "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=500&q=80&auto=format&fit=crop",
    },
  ],
};
