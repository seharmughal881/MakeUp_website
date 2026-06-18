import { getJSON, setJSON } from "./storage";
import {
  SERVICES,
  GALLERY,
  GALLERY_SHOWCASE,
  PRICING,
  TESTIMONIALS,
  type Service,
  type GalleryItem,
  type PriceGroup,
  type Testimonial,
} from "./data";
import { SERVICE_PAGES, type ServicePage } from "./servicePages";
import {
  DEFAULT_SETTINGS,
  DEFAULT_HERO,
  DEFAULT_ABOUT,
  type SiteSettings,
  type HeroContent,
  type AboutContent,
} from "./siteContent";

export type ContentData = {
  settings: SiteSettings;
  hero: HeroContent;
  about: AboutContent;
  services: Service[];
  gallery: GalleryItem[];
  showcase: string[];
  pricing: PriceGroup[];
  testimonials: Testimonial[];
  servicePages: ServicePage[];
};

export type ContentSection = keyof ContentData;

/** Defaults come from data.ts — used to seed the editable store on first run. */
export function defaultContent(): ContentData {
  return {
    settings: DEFAULT_SETTINGS,
    hero: DEFAULT_HERO,
    about: DEFAULT_ABOUT,
    services: SERVICES,
    gallery: GALLERY,
    showcase: GALLERY_SHOWCASE,
    pricing: PRICING,
    testimonials: TESTIMONIALS,
    servicePages: SERVICE_PAGES,
  };
}

/** Convenience: just the editable business settings (merged over defaults). */
export async function getSettings(): Promise<SiteSettings> {
  const { settings } = await getContent();
  return { ...DEFAULT_SETTINGS, ...settings, social: { ...DEFAULT_SETTINGS.social, ...settings.social } };
}

/** Build a WhatsApp deep-link from the current settings. */
export function whatsappFrom(whatsapp: string, message?: string): string {
  const text = encodeURIComponent(
    message ??
      "Hello! I would like to book an appointment. Please share availability."
  );
  return `https://wa.me/${whatsapp}?text=${text}`;
}

/** Find a single editable service page by slug (falls back to default). */
export async function getServicePage(
  slug: string
): Promise<ServicePage | undefined> {
  const { servicePages } = await getContent();
  return servicePages.find((p) => p.slug === slug);
}

/** Read editable content, merged over defaults so missing keys never break pages. */
export async function getContent(): Promise<ContentData> {
  const base = defaultContent();
  const stored = await getJSON<Partial<ContentData> | null>("content", null);
  return stored ? { ...base, ...stored } : base;
}

export async function writeContent(content: ContentData): Promise<void> {
  await setJSON("content", content);
}

/** Replace a single section and persist. */
export async function updateSection<K extends ContentSection>(
  section: K,
  value: ContentData[K]
): Promise<ContentData> {
  const content = await getContent();
  content[section] = value;
  await writeContent(content);
  return content;
}

export const CONTENT_SECTIONS: ContentSection[] = [
  "settings",
  "hero",
  "about",
  "services",
  "gallery",
  "showcase",
  "pricing",
  "testimonials",
  "servicePages",
];

/** Sections that are objects (not arrays). */
export const OBJECT_SECTIONS: ContentSection[] = ["settings", "hero", "about"];
