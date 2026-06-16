/* ============================================================
   Central data for Sehar Beauty Salon
   Edit business details, services, pricing & content here.
   ============================================================ */

export const SITE = {
  name: "Sehar Beauty Salon",
  tagline: "Where Elegance Meets Beauty",
  url: "https://seharbeautysalon.com",
  phone: "+92 300 1234567",
  // WhatsApp number in international format, digits only
  whatsapp: "923001234567",
  email: "hello@seharbeautysalon.com",
  address: "123 Gulberg Avenue, Main Boulevard",
  city: "Lahore, Pakistan",
  hours: "Mon – Sun · 10:00 AM – 8:00 PM",
  mapsEmbed:
    "https://www.google.com/maps?q=Lahore,Pakistan&output=embed",
  social: {
    instagram: "https://instagram.com",
    facebook: "https://facebook.com",
    tiktok: "https://tiktok.com",
    youtube: "https://youtube.com",
  },
};

export const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Bridal Makeup", href: "/bridal-makeup" },
  { label: "Hair Styling", href: "/hair-styling" },
  { label: "Skin Care", href: "/skin-care" },
  { label: "Gallery", href: "/gallery" },
  { label: "Pricing", href: "/pricing" },
  { label: "Reviews", href: "/reviews" },
  { label: "Contact", href: "/contact" },
];

export type Service = {
  slug: string;
  title: string;
  icon: string;
  short: string;
  description: string;
  image: string;
  price: string;
  href?: string;
};

export const SERVICES: Service[] = [
  {
    slug: "bridal-makeup",
    title: "Bridal Makeup",
    icon: "💍",
    short: "Flawless, long-lasting bridal looks for your big day.",
    description:
      "Signature bridal artistry with premium products, custom-blended foundation and HD finishing that lasts from ceremony to celebration.",
    image:
      "https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?w=900&q=80&auto=format&fit=crop",
    price: "From Rs. 25,000",
    href: "/bridal-makeup",
  },
  {
    slug: "party-makeup",
    title: "Party & Glam Makeup",
    icon: "✨",
    short: "Show-stopping party glam for every occasion.",
    description:
      "From soft glam to bold statement looks — perfect for engagements, parties and photoshoots.",
    image:
      "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=900&q=80&auto=format&fit=crop",
    price: "From Rs. 8,000",
  },
  {
    slug: "hair-styling",
    title: "Hair Styling",
    icon: "💇‍♀️",
    short: "Cuts, colour, treatments & elegant updos.",
    description:
      "Precision cuts, glossy colour, keratin treatments and red-carpet updos by expert stylists.",
    image:
      "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=900&q=80&auto=format&fit=crop",
    price: "From Rs. 3,500",
    href: "/hair-styling",
  },
  {
    slug: "skin-care",
    title: "Skin Care & Facial",
    icon: "🌸",
    short: "Glowing skin with luxury facials & treatments.",
    description:
      "Hydrating, brightening and anti-ageing facials using premium skincare for radiant, healthy skin.",
    image:
      "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=900&q=80&auto=format&fit=crop",
    price: "From Rs. 4,000",
    href: "/skin-care",
  },
  {
    slug: "manicure-pedicure",
    title: "Manicure & Pedicure",
    icon: "💅",
    short: "Pampering nail care & spa treatments.",
    description:
      "Luxurious manicures, pedicures, gel polish and nail art in a relaxing spa setting.",
    image:
      "https://images.unsplash.com/photo-1604654894610-df63bc536371?w=900&q=80&auto=format&fit=crop",
    price: "From Rs. 2,500",
  },
  {
    slug: "threading-waxing",
    title: "Threading & Waxing",
    icon: "🪞",
    short: "Precise grooming for smooth, flawless skin.",
    description:
      "Gentle threading, brow shaping and full-body waxing for soft, smooth, hair-free skin.",
    image:
      "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=900&q=80&auto=format&fit=crop",
    price: "From Rs. 800",
  },
];

export type PriceItem = { name: string; price: string; note?: string };
export type PriceGroup = { category: string; icon: string; items: PriceItem[] };

export const PRICING: PriceGroup[] = [
  {
    category: "Bridal & Party Makeup",
    icon: "💍",
    items: [
      { name: "Signature Bridal Makeup", price: "Rs. 25,000", note: "Most popular" },
      { name: "Engagement / Walima Makeup", price: "Rs. 18,000" },
      { name: "Party / Guest Makeup", price: "Rs. 8,000" },
      { name: "Photoshoot Makeup", price: "Rs. 12,000" },
    ],
  },
  {
    category: "Hair Styling",
    icon: "💇‍♀️",
    items: [
      { name: "Haircut & Blow Dry", price: "Rs. 3,500" },
      { name: "Hair Colour (Global)", price: "Rs. 7,000" },
      { name: "Keratin Treatment", price: "Rs. 15,000" },
      { name: "Bridal Hair Updo", price: "Rs. 9,000" },
    ],
  },
  {
    category: "Skin Care & Facial",
    icon: "🌸",
    items: [
      { name: "Hydra Glow Facial", price: "Rs. 4,000" },
      { name: "Whitening Facial", price: "Rs. 5,500" },
      { name: "Anti-Ageing Facial", price: "Rs. 6,500" },
      { name: "Gold Facial", price: "Rs. 7,000", note: "Luxury" },
    ],
  },
  {
    category: "Nails & Grooming",
    icon: "💅",
    items: [
      { name: "Manicure", price: "Rs. 2,500" },
      { name: "Pedicure", price: "Rs. 3,000" },
      { name: "Gel Polish & Nail Art", price: "Rs. 3,500" },
      { name: "Threading (Full Face)", price: "Rs. 1,200" },
    ],
  },
];

export type Testimonial = {
  name: string;
  role: string;
  rating: number;
  text: string;
  image: string;
};

export const TESTIMONIALS: Testimonial[] = [
  {
    name: "Ayesha Khan",
    role: "Bride",
    rating: 5,
    text: "My bridal makeup was absolutely flawless and lasted the entire day. The team made me feel like a queen. Highly recommended for every bride!",
    image:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&q=80&auto=format&fit=crop",
  },
  {
    name: "Fatima Noor",
    role: "Regular Client",
    rating: 5,
    text: "The gold facial gave my skin the most beautiful glow. Such a relaxing, luxurious experience every single time I visit.",
    image:
      "https://images.unsplash.com/photo-1554151228-14d9def656e4?w=200&q=80&auto=format&fit=crop",
  },
  {
    name: "Hira Ahmed",
    role: "Party Makeup",
    rating: 5,
    text: "I got party makeup for my friend's wedding and received endless compliments. The artists truly understand what suits you.",
    image:
      "https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?w=200&q=80&auto=format&fit=crop",
  },
  {
    name: "Sana Malik",
    role: "Hair Styling",
    rating: 5,
    text: "Best keratin treatment in town! My hair feels silky and healthy. The salon ambience is elegant and so welcoming.",
    image:
      "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=200&q=80&auto=format&fit=crop",
  },
  {
    name: "Mahnoor Tariq",
    role: "Facial Client",
    rating: 5,
    text: "The hydra glow facial completely transformed my skin before my engagement. So gentle and professional!",
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80&auto=format&fit=crop",
  },
  {
    name: "Iqra Javed",
    role: "Bride",
    rating: 5,
    text: "From the trial to the wedding day, everything was perfect. I felt confident and absolutely stunning. Thank you Sehar!",
    image:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&q=80&auto=format&fit=crop",
  },
  {
    name: "Komal Raza",
    role: "Manicure & Pedicure",
    rating: 5,
    text: "Such a relaxing, hygienic and pampering experience. The nail art was exactly what I wanted. Will be back!",
    image:
      "https://images.unsplash.com/photo-1546961329-78bef0414d7c?w=200&q=80&auto=format&fit=crop",
  },
];

export type GalleryItem = {
  before: string;
  after: string;
  title: string;
  category: string;
};

export const GALLERY: GalleryItem[] = [
  {
    title: "Bridal Transformation",
    category: "Bridal Makeup",
    before:
      "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=700&q=80&auto=format&fit=crop",
    after:
      "https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?w=700&q=80&auto=format&fit=crop",
  },
  {
    title: "Glam Party Look",
    category: "Party Makeup",
    before:
      "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=700&q=80&auto=format&fit=crop",
    after:
      "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=700&q=80&auto=format&fit=crop",
  },
  {
    title: "Hair Makeover",
    category: "Hair Styling",
    before:
      "https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=700&q=80&auto=format&fit=crop",
    after:
      "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=700&q=80&auto=format&fit=crop",
  },
  {
    title: "Glow Facial Result",
    category: "Skin Care",
    before:
      "https://images.unsplash.com/photo-1612817288484-6f916006741a?w=700&q=80&auto=format&fit=crop",
    after:
      "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=700&q=80&auto=format&fit=crop",
  },
];

export const GALLERY_SHOWCASE: string[] = [
  "https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?w=600&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=600&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=600&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=600&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1604654894610-df63bc536371?w=600&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1522338242992-e1a54906a8da?w=600&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=600&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1457972729786-0411a3b2b626?w=600&q=80&auto=format&fit=crop",
];

export const SERVICE_OPTIONS = [
  "Bridal Makeup",
  "Party / Glam Makeup",
  "Hair Styling",
  "Skin Care & Facial",
  "Manicure & Pedicure",
  "Threading & Waxing",
  "Other",
];

export function whatsappLink(message?: string) {
  const text = encodeURIComponent(
    message ??
      `Hello ${SITE.name}! I would like to book an appointment. Please share availability.`
  );
  return `https://wa.me/${SITE.whatsapp}?text=${text}`;
}
