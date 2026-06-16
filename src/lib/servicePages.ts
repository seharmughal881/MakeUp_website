/* ============================================================
   Editable content for the dedicated service detail pages:
   Bridal Makeup · Hair Styling · Skin Care & Facial.
   Managed from Admin → Website Content → Service Pages.
   ============================================================ */

export type Highlight = { icon: string; title: string; text: string };
export type DetailPackage = {
  name: string;
  price: string;
  featured?: boolean;
  features: string[];
};

export type ServicePage = {
  slug: string; // route segment, e.g. "bridal-makeup"
  label: string; // shown in admin selector
  banner: { title: string; subtitle: string; image: string };
  intro: { eyebrow: string; heading: string; text: string[]; image: string };
  highlights: Highlight[];
  packages: DetailPackage[];
  gallery: string[];
  cta: { title: string; subtitle: string };
};

export const SERVICE_PAGES: ServicePage[] = [
  {
    slug: "bridal-makeup",
    label: "Bridal Makeup",
    banner: {
      title: "Bridal Makeup",
      subtitle: "Become the most radiant version of yourself on your big day.",
      image:
        "https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?w=1600&q=80&auto=format&fit=crop",
    },
    intro: {
      eyebrow: "Signature Bridal Artistry",
      heading: "Timeless Beauty for Your Wedding Day",
      text: [
        "Your wedding day deserves perfection. Our award-winning bridal artists create flawless, photo-ready looks using premium HD products that stay radiant from your first photo to the last dance.",
        "From soft natural elegance to glamorous traditional looks, every bridal makeover is custom-designed to complement your features, outfit and personal style — complete with a pre-wedding trial.",
      ],
      image:
        "https://images.unsplash.com/photo-1457972729786-0411a3b2b626?w=900&q=80&auto=format&fit=crop",
    },
    highlights: [
      { icon: "💄", title: "HD & Airbrush Makeup", text: "Premium, sweat-proof products for a flawless, long-lasting finish." },
      { icon: "📸", title: "Camera-Ready Looks", text: "Perfectly balanced for both natural light and wedding photography." },
      { icon: "👰", title: "Bridal Trial Included", text: "Preview and perfect your look before the big day with a trial session." },
      { icon: "💆‍♀️", title: "Skin Prep & Care", text: "Pre-bridal facials and prep for the smoothest, glowing base." },
      { icon: "🏠", title: "At-Salon or On-Location", text: "Get ready in our luxury suite or we come to your venue." },
      { icon: "💍", title: "Complete Bridal Look", text: "Makeup, hair styling, draping and finishing — all in one place." },
    ],
    packages: [
      {
        name: "Engagement",
        price: "Rs. 18,000",
        features: ["Full HD makeup", "Hair styling", "Lashes & finishing", "Saree / dupatta draping"],
      },
      {
        name: "Signature Bridal",
        price: "Rs. 25,000",
        featured: true,
        features: [
          "Premium HD / airbrush makeup",
          "Bridal trial session",
          "Bridal hair updo",
          "Lashes, draping & jewellery setting",
          "Touch-up kit included",
        ],
      },
      {
        name: "Complete Wedding",
        price: "Rs. 45,000",
        features: ["Bridal + Walima looks", "Pre-bridal facial", "Two hair styles", "On-location service"],
      },
    ],
    gallery: [
      "https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?w=600&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1457972729786-0411a3b2b626?w=600&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1522338242992-e1a54906a8da?w=600&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=600&q=80&auto=format&fit=crop",
    ],
    cta: {
      title: "Reserve Your Bridal Date",
      subtitle: "Bridal slots fill up fast during wedding season. Secure your date and trial today.",
    },
  },
  {
    slug: "hair-styling",
    label: "Hair Styling",
    banner: {
      title: "Hair Styling",
      subtitle: "Cuts, colour, treatments and red-carpet updos by expert stylists.",
      image:
        "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=1600&q=80&auto=format&fit=crop",
    },
    intro: {
      eyebrow: "Professional Hair Care",
      heading: "Hair That Turns Heads",
      text: [
        "From a fresh precision cut to luxurious colour and smoothing treatments, our stylists craft hair that looks healthy, glossy and effortlessly elegant.",
        "Whether you want everyday manageability or a show-stopping bridal updo, we use premium products and proven techniques to bring your vision to life.",
      ],
      image:
        "https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=900&q=80&auto=format&fit=crop",
    },
    highlights: [
      { icon: "✂️", title: "Precision Cuts", text: "Tailored haircuts and styling to suit your face shape and lifestyle." },
      { icon: "🎨", title: "Colour & Highlights", text: "Global colour, balayage and highlights with ammonia-free options." },
      { icon: "💧", title: "Keratin & Treatments", text: "Smoothing, repair and deep-conditioning for silky, frizz-free hair." },
      { icon: "👑", title: "Bridal Updos", text: "Elegant, long-lasting hairstyles for brides and special events." },
      { icon: "🌿", title: "Scalp Care", text: "Nourishing scalp treatments for healthy hair growth." },
      { icon: "💁‍♀️", title: "Blow Dry & Styling", text: "Glossy blow-dries and curls perfect for any occasion." },
    ],
    packages: [
      {
        name: "Classic Care",
        price: "Rs. 3,500",
        features: ["Haircut & blow dry", "Wash & conditioning", "Basic styling"],
      },
      {
        name: "Colour & Glam",
        price: "Rs. 7,000",
        featured: true,
        features: ["Global hair colour", "Haircut & blow dry", "Deep conditioning", "Styling of choice"],
      },
      {
        name: "Keratin Luxe",
        price: "Rs. 15,000",
        features: ["Keratin smoothing treatment", "Repair therapy", "Glossy blow dry", "Aftercare guidance"],
      },
    ],
    gallery: [
      "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=600&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=600&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1522337660859-02fbefca4702?w=600&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1492106087820-71f1a00d2b11?w=600&q=80&auto=format&fit=crop",
    ],
    cta: {
      title: "Book Your Hair Makeover",
      subtitle: "Treat your hair to expert care. Reserve your styling session today.",
    },
  },
  {
    slug: "skin-care",
    label: "Skin Care & Facial",
    banner: {
      title: "Skin Care & Facial",
      subtitle: "Reveal radiant, healthy and glowing skin with our luxury facials.",
      image:
        "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=1600&q=80&auto=format&fit=crop",
    },
    intro: {
      eyebrow: "Glow From Within",
      heading: "Luxury Facials for Radiant Skin",
      text: [
        "Pamper your skin with facials designed around your unique needs — whether you want deep hydration, brightening, anti-ageing or a pre-event glow.",
        "Using premium skincare and relaxing techniques, our specialists cleanse, nourish and rejuvenate your skin for a healthy, luminous complexion.",
      ],
      image:
        "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?w=900&q=80&auto=format&fit=crop",
    },
    highlights: [
      { icon: "💦", title: "Hydra Glow Facial", text: "Deep hydration for plump, dewy and refreshed skin." },
      { icon: "🌟", title: "Whitening Facial", text: "Brightens skin tone and reduces dullness and pigmentation." },
      { icon: "⏳", title: "Anti-Ageing Facial", text: "Firms, smooths and reduces fine lines for youthful skin." },
      { icon: "🏆", title: "Gold Facial", text: "Our signature luxury facial for an instant radiant glow." },
      { icon: "🧼", title: "Deep Cleansing", text: "Clears pores, removes impurities and refines texture." },
      { icon: "🌿", title: "Skin Consultation", text: "Personalised advice for your skin type and concerns." },
    ],
    packages: [
      {
        name: "Hydra Glow",
        price: "Rs. 4,000",
        features: ["Deep cleansing", "Hydration therapy", "Relaxing massage", "Glow finishing"],
      },
      {
        name: "Gold Luxe Facial",
        price: "Rs. 7,000",
        featured: true,
        features: ["24k gold facial", "Brightening & firming", "Anti-ageing serum", "Face & neck massage", "Instant radiance"],
      },
      {
        name: "Whitening Care",
        price: "Rs. 5,500",
        features: ["Skin brightening facial", "Pigmentation care", "Deep cleansing", "Soothing mask"],
      },
    ],
    gallery: [
      "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=600&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?w=600&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=600&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=600&q=80&auto=format&fit=crop",
    ],
    cta: {
      title: "Treat Your Skin Today",
      subtitle: "Book a luxury facial and let your natural glow shine through.",
    },
  },
];
