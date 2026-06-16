import type { Metadata } from "next";
import { Playfair_Display, Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { SettingsProvider } from "@/components/SettingsProvider";
import { SITE } from "@/lib/data";
import { getSettings } from "@/lib/content";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} — Luxury Bridal Makeup & Beauty Salon`,
    template: `%s | ${SITE.name}`,
  },
  description:
    "Sehar Beauty Salon offers premium bridal makeup, party makeup, hair styling, facials, skin care and beauty services for women. Book your appointment today.",
  keywords: [
    "beauty salon",
    "bridal makeup",
    "party makeup",
    "hair styling",
    "facial",
    "skin care",
    "manicure",
    "Sehar Beauty Salon",
    "luxury salon",
    "women beauty services",
  ],
  authors: [{ name: SITE.name }],
  openGraph: {
    title: `${SITE.name} — Luxury Bridal Makeup & Beauty Salon`,
    description:
      "Premium bridal makeup, hair styling, facials and beauty services for women. Book your appointment today.",
    url: SITE.url,
    siteName: SITE.name,
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE.name} — Luxury Beauty Salon`,
    description:
      "Premium bridal makeup, hair styling, facials and beauty services for women.",
  },
  robots: { index: true, follow: true },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const settings = await getSettings();
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BeautySalon",
    name: settings.name,
    image: SITE.url,
    url: SITE.url,
    telephone: settings.phone,
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      streetAddress: settings.address,
      addressLocality: settings.city,
      addressCountry: "PK",
    },
    openingHours: "Mo-Su 10:00-20:00",
    sameAs: [
      settings.social.instagram,
      settings.social.facebook,
      settings.social.tiktok,
    ],
  };

  return (
    <html
      lang="en"
      className={`${playfair.variable} ${poppins.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-cream text-ink-soft">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <SettingsProvider settings={settings}>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
          <WhatsAppButton />
        </SettingsProvider>
      </body>
    </html>
  );
}
