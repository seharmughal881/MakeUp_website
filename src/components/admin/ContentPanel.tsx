"use client";

import { useCallback, useEffect, useState } from "react";
import ImageUploader from "./ImageUploader";
import ServicePagesEditor, { type ServicePage } from "./ServicePagesEditor";
import { SettingsEditor, HeroEditor, AboutEditor } from "./SiteEditors";
import type {
  SiteSettings,
  HeroContent,
  AboutContent,
} from "@/lib/siteContent";

type Service = {
  slug: string;
  title: string;
  icon: string;
  short: string;
  description: string;
  image: string;
  price: string;
  href?: string;
};
type GalleryItem = { title: string; category: string; before: string; after: string };
type PriceItem = { name: string; price: string; note?: string };
type PriceGroup = { category: string; icon: string; items: PriceItem[] };
type Testimonial = {
  name: string;
  role: string;
  rating: number;
  text: string;
  image: string;
};

type Content = {
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

type SectionKey = keyof Content;

/* Admin sessions mirror the website navbar pages. */
type PageKey =
  | "home"
  | "about"
  | "services"
  | "bridal-makeup"
  | "hair-styling"
  | "skin-care"
  | "gallery"
  | "pricing"
  | "reviews"
  | "contact";

const PAGE_TABS: { key: PageKey; label: string; icon: string }[] = [
  { key: "home", label: "Home", icon: "🏠" },
  { key: "about", label: "About", icon: "ℹ️" },
  { key: "services", label: "Services", icon: "💆‍♀️" },
  { key: "bridal-makeup", label: "Bridal Makeup", icon: "💍" },
  { key: "hair-styling", label: "Hair Styling", icon: "💇‍♀️" },
  { key: "skin-care", label: "Skin Care", icon: "🌸" },
  { key: "gallery", label: "Gallery", icon: "🖼️" },
  { key: "pricing", label: "Pricing", icon: "💰" },
  { key: "reviews", label: "Reviews", icon: "⭐" },
  { key: "contact", label: "Contact", icon: "📞" },
];

const slugify = (s: string) =>
  s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");

const inputCls =
  "w-full rounded-lg border border-gold-400/25 bg-cream/60 px-3 py-2 text-sm outline-none focus:border-pink-400 focus:ring-1 focus:ring-pink-200";

function Field({
  label,
  ...rest
}: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs font-semibold text-ink-muted">
        {label}
      </span>
      <input className={inputCls} {...rest} />
    </label>
  );
}

export default function ContentPanel({ adminKey }: { adminKey: string }) {
  const [content, setContent] = useState<Content | null>(null);
  const [tab, setTab] = useState<PageKey>("home");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [savingKey, setSavingKey] = useState<SectionKey | "">("");
  const [savedKey, setSavedKey] = useState<SectionKey | "">("");

  const load = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/admin/content", {
        headers: { "x-admin-key": adminKey },
        cache: "no-store",
      });
      if (!res.ok) throw new Error("Failed to load content.");
      const data = await res.json();
      setContent(data.content);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Error.");
    } finally {
      setLoading(false);
    }
  }, [adminKey]);

  useEffect(() => {
    load();
  }, [load]);

  async function save(section: SectionKey, value: unknown) {
    setSavingKey(section);
    setSavedKey("");
    setError("");
    try {
      const res = await fetch("/api/admin/content", {
        method: "PUT",
        headers: { "Content-Type": "application/json", "x-admin-key": adminKey },
        body: JSON.stringify({ section, value }),
      });
      if (!res.ok) {
        const d = await res.json();
        throw new Error(d.error || "Save failed.");
      }
      setSavedKey(section);
      setTimeout(() => setSavedKey(""), 2500);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Save failed.");
    } finally {
      setSavingKey("");
    }
  }

  function patch<K extends SectionKey>(key: K, value: Content[K]) {
    setContent((c) => (c ? { ...c, [key]: value } : c));
  }

  if (loading)
    return <p className="py-16 text-center text-ink-muted/60">Loading content…</p>;
  if (!content)
    return (
      <p className="py-16 text-center text-red-600">
        {error || "Could not load content."}
      </p>
    );

  const saveBar = (section: SectionKey) => (
    <div className="sticky bottom-0 z-10 mt-6 flex items-center gap-3 border-t border-gold-400/15 bg-white/95 py-4 backdrop-blur">
      <button
        onClick={() => save(section, content[section])}
        disabled={savingKey === section}
        className="rounded-full bg-gradient-to-r from-pink-500 to-pink-600 px-7 py-3 text-sm font-semibold text-white shadow-lg shadow-pink-600/30 transition-transform hover:scale-[1.02] disabled:opacity-60"
      >
        {savingKey === section ? "Saving…" : "💾 Save Changes"}
      </button>
      {savedKey === section && (
        <span className="text-sm font-medium text-green-600">
          ✅ Saved! Live on the website.
        </span>
      )}
      {error && <span className="text-sm text-red-600">⚠️ {error}</span>}
    </div>
  );

  const cardCls =
    "rounded-2xl border border-gold-400/20 bg-cream/40 p-5 shadow-sm";
  const addBtnCls =
    "rounded-full border border-dashed border-pink-400 px-6 py-3 text-sm font-semibold text-pink-600 transition-colors hover:bg-pink-50";
  const delBtnCls =
    "rounded-lg border border-red-200 px-3 py-1.5 text-xs font-medium text-red-600 hover:bg-red-50";

  return (
    <div>
      {/* Page tabs (match the website navbar) */}
      <div className="flex flex-wrap gap-2">
        {PAGE_TABS.map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
              tab === t.key
                ? "bg-ink text-cream"
                : "border border-gold-400/30 bg-white text-ink-muted hover:bg-gold-400/10"
            }`}
          >
            {t.icon} {t.label}
          </button>
        ))}
      </div>

      <div className="mt-6">
        {/* CONTACT PAGE — business info, social, map */}
        {tab === "contact" && (
          <div>
            <p className="mb-4 rounded-xl bg-pink-50 px-4 py-3 text-sm text-pink-700">
              📞 This controls your <strong>Contact page</strong> and also the
              business details, phone, WhatsApp & social links shown across the
              whole website.
            </p>
            <SettingsEditor
              value={content.settings}
              onChange={(v) => patch("settings", v)}
            />
            {saveBar("settings")}
          </div>
        )}

        {/* HOME PAGE — hero banner */}
        {tab === "home" && (
          <div>
            <p className="mb-4 rounded-xl bg-pink-50 px-4 py-3 text-sm text-pink-700">
              🏠 This is the big <strong>Home page banner</strong>. The Services,
              Gallery & Reviews shown lower on the home page are managed in their
              own tabs above.
            </p>
            <HeroEditor
              value={content.hero}
              adminKey={adminKey}
              onChange={(v) => patch("hero", v)}
            />
            {saveBar("hero")}
          </div>
        )}

        {/* ABOUT PAGE */}
        {tab === "about" && (
          <div>
            <AboutEditor
              value={content.about}
              adminKey={adminKey}
              onChange={(v) => patch("about", v)}
            />
            {saveBar("about")}
          </div>
        )}

        {/* SERVICES */}
        {tab === "services" && (
          <div className="space-y-4">
            {content.services.map((s, i) => (
              <div key={i} className={cardCls}>
                <div className="grid gap-3 sm:grid-cols-2">
                  <Field
                    label="Title"
                    value={s.title}
                    onChange={(e) => {
                      const next = [...content.services];
                      next[i] = {
                        ...s,
                        title: e.target.value,
                        slug: s.slug || slugify(e.target.value),
                      };
                      patch("services", next);
                    }}
                  />
                  <Field
                    label="Price"
                    value={s.price}
                    onChange={(e) => {
                      const next = [...content.services];
                      next[i] = { ...s, price: e.target.value };
                      patch("services", next);
                    }}
                  />
                  <Field
                    label="Icon (emoji)"
                    value={s.icon}
                    onChange={(e) => {
                      const next = [...content.services];
                      next[i] = { ...s, icon: e.target.value };
                      patch("services", next);
                    }}
                  />
                  <Field
                    label="Detail page link (optional)"
                    value={s.href || ""}
                    placeholder="/bridal-makeup"
                    onChange={(e) => {
                      const next = [...content.services];
                      next[i] = { ...s, href: e.target.value };
                      patch("services", next);
                    }}
                  />
                  <label className="block sm:col-span-2">
                    <span className="mb-1 block text-xs font-semibold text-ink-muted">
                      Short description
                    </span>
                    <textarea
                      rows={2}
                      className={inputCls}
                      value={s.short}
                      onChange={(e) => {
                        const next = [...content.services];
                        next[i] = { ...s, short: e.target.value };
                        patch("services", next);
                      }}
                    />
                  </label>
                  <div className="sm:col-span-2">
                    <ImageUploader
                      label="Service image"
                      adminKey={adminKey}
                      value={s.image}
                      onChange={(url) => {
                        const next = [...content.services];
                        next[i] = { ...s, image: url };
                        patch("services", next);
                      }}
                    />
                  </div>
                </div>
                <div className="mt-3 text-right">
                  <button
                    className={delBtnCls}
                    onClick={() =>
                      patch(
                        "services",
                        content.services.filter((_, j) => j !== i)
                      )
                    }
                  >
                    Delete service
                  </button>
                </div>
              </div>
            ))}
            <button
              className={addBtnCls}
              onClick={() =>
                patch("services", [
                  ...content.services,
                  {
                    slug: `service-${content.services.length + 1}`,
                    title: "New Service",
                    icon: "✨",
                    short: "Short description",
                    description: "",
                    image: "",
                    price: "From Rs. 0",
                  },
                ])
              }
            >
              + Add Service
            </button>
            {saveBar("services")}
          </div>
        )}

        {/* SERVICE DETAIL PAGES — one tab each */}
        {(tab === "bridal-makeup" ||
          tab === "hair-styling" ||
          tab === "skin-care") && (
          <div>
            <p className="mb-4 rounded-xl bg-pink-50 px-4 py-3 text-sm text-pink-700">
              📄 Edit this page&apos;s banner, intro, highlights, packages &
              photos, then press Save.
            </p>
            <ServicePagesEditor
              pages={content.servicePages}
              adminKey={adminKey}
              slug={tab}
              onChange={(next) => patch("servicePages", next)}
            />
            {saveBar("servicePages")}
          </div>
        )}

        {/* GALLERY PAGE — Before/After section */}
        {tab === "gallery" && (
          <div className="space-y-4">
            <h3 className="font-serif text-xl font-bold text-ink">
              ✨ Before / After Transformations
            </h3>
            {content.gallery.map((g, i) => (
              <div key={i} className={cardCls}>
                <div className="grid gap-3 sm:grid-cols-2">
                  <Field
                    label="Title"
                    value={g.title}
                    onChange={(e) => {
                      const next = [...content.gallery];
                      next[i] = { ...g, title: e.target.value };
                      patch("gallery", next);
                    }}
                  />
                  <Field
                    label="Category"
                    value={g.category}
                    onChange={(e) => {
                      const next = [...content.gallery];
                      next[i] = { ...g, category: e.target.value };
                      patch("gallery", next);
                    }}
                  />
                  <ImageUploader
                    label="Before image"
                    adminKey={adminKey}
                    value={g.before}
                    onChange={(url) => {
                      const next = [...content.gallery];
                      next[i] = { ...g, before: url };
                      patch("gallery", next);
                    }}
                  />
                  <ImageUploader
                    label="After image"
                    adminKey={adminKey}
                    value={g.after}
                    onChange={(url) => {
                      const next = [...content.gallery];
                      next[i] = { ...g, after: url };
                      patch("gallery", next);
                    }}
                  />
                </div>
                <div className="mt-3 text-right">
                  <button
                    className={delBtnCls}
                    onClick={() =>
                      patch(
                        "gallery",
                        content.gallery.filter((_, j) => j !== i)
                      )
                    }
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
            <button
              className={addBtnCls}
              onClick={() =>
                patch("gallery", [
                  ...content.gallery,
                  { title: "New Transformation", category: "Makeup", before: "", after: "" },
                ])
              }
            >
              + Add Before/After
            </button>
            {saveBar("gallery")}
          </div>
        )}

        {/* GALLERY PAGE — Showcase photos section */}
        {tab === "gallery" && (
          <div className="mt-10 border-t border-gold-400/20 pt-8">
            <h3 className="mb-4 font-serif text-xl font-bold text-ink">
              🖼️ Gallery Photos
            </h3>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
              {content.showcase.map((url, i) => (
                <div key={i} className={cardCls}>
                  <ImageUploader
                    label={`Photo ${i + 1}`}
                    adminKey={adminKey}
                    value={url}
                    onChange={(u) => {
                      const next = [...content.showcase];
                      next[i] = u;
                      patch("showcase", next);
                    }}
                  />
                  <button
                    className={`${delBtnCls} mt-2 w-full`}
                    onClick={() =>
                      patch(
                        "showcase",
                        content.showcase.filter((_, j) => j !== i)
                      )
                    }
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
            <button
              className={`${addBtnCls} mt-4`}
              onClick={() => patch("showcase", [...content.showcase, ""])}
            >
              + Add Photo
            </button>
            {saveBar("showcase")}
          </div>
        )}

        {/* PRICING */}
        {tab === "pricing" && (
          <div className="space-y-5">
            {content.pricing.map((grp, gi) => (
              <div key={gi} className={cardCls}>
                <div className="grid gap-3 sm:grid-cols-2">
                  <Field
                    label="Category"
                    value={grp.category}
                    onChange={(e) => {
                      const next = [...content.pricing];
                      next[gi] = { ...grp, category: e.target.value };
                      patch("pricing", next);
                    }}
                  />
                  <Field
                    label="Icon (emoji)"
                    value={grp.icon}
                    onChange={(e) => {
                      const next = [...content.pricing];
                      next[gi] = { ...grp, icon: e.target.value };
                      patch("pricing", next);
                    }}
                  />
                </div>
                <div className="mt-4 space-y-2">
                  {grp.items.map((it, ii) => (
                    <div key={ii} className="flex flex-wrap items-end gap-2">
                      <div className="min-w-[160px] flex-1">
                        <Field
                          label="Service name"
                          value={it.name}
                          onChange={(e) => {
                            const next = [...content.pricing];
                            const items = [...grp.items];
                            items[ii] = { ...it, name: e.target.value };
                            next[gi] = { ...grp, items };
                            patch("pricing", next);
                          }}
                        />
                      </div>
                      <div className="w-32">
                        <Field
                          label="Price"
                          value={it.price}
                          onChange={(e) => {
                            const next = [...content.pricing];
                            const items = [...grp.items];
                            items[ii] = { ...it, price: e.target.value };
                            next[gi] = { ...grp, items };
                            patch("pricing", next);
                          }}
                        />
                      </div>
                      <div className="w-28">
                        <Field
                          label="Tag (optional)"
                          value={it.note || ""}
                          onChange={(e) => {
                            const next = [...content.pricing];
                            const items = [...grp.items];
                            items[ii] = { ...it, note: e.target.value };
                            next[gi] = { ...grp, items };
                            patch("pricing", next);
                          }}
                        />
                      </div>
                      <button
                        className={delBtnCls}
                        onClick={() => {
                          const next = [...content.pricing];
                          next[gi] = {
                            ...grp,
                            items: grp.items.filter((_, j) => j !== ii),
                          };
                          patch("pricing", next);
                        }}
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                  <button
                    className="text-sm font-semibold text-pink-600 hover:underline"
                    onClick={() => {
                      const next = [...content.pricing];
                      next[gi] = {
                        ...grp,
                        items: [...grp.items, { name: "New item", price: "Rs. 0" }],
                      };
                      patch("pricing", next);
                    }}
                  >
                    + Add price item
                  </button>
                </div>
                <div className="mt-3 text-right">
                  <button
                    className={delBtnCls}
                    onClick={() =>
                      patch(
                        "pricing",
                        content.pricing.filter((_, j) => j !== gi)
                      )
                    }
                  >
                    Delete category
                  </button>
                </div>
              </div>
            ))}
            <button
              className={addBtnCls}
              onClick={() =>
                patch("pricing", [
                  ...content.pricing,
                  { category: "New Category", icon: "✨", items: [] },
                ])
              }
            >
              + Add Pricing Category
            </button>
            {saveBar("pricing")}
          </div>
        )}

        {/* REVIEWS PAGE */}
        {tab === "reviews" && (
          <div className="space-y-4">
            {content.testimonials.map((t, i) => (
              <div key={i} className={cardCls}>
                <div className="grid gap-3 sm:grid-cols-2">
                  <Field
                    label="Client name"
                    value={t.name}
                    onChange={(e) => {
                      const next = [...content.testimonials];
                      next[i] = { ...t, name: e.target.value };
                      patch("testimonials", next);
                    }}
                  />
                  <Field
                    label="Role / service"
                    value={t.role}
                    onChange={(e) => {
                      const next = [...content.testimonials];
                      next[i] = { ...t, role: e.target.value };
                      patch("testimonials", next);
                    }}
                  />
                  <Field
                    label="Rating (1-5)"
                    type="number"
                    min={1}
                    max={5}
                    value={t.rating}
                    onChange={(e) => {
                      const next = [...content.testimonials];
                      next[i] = {
                        ...t,
                        rating: Math.max(1, Math.min(5, Number(e.target.value) || 5)),
                      };
                      patch("testimonials", next);
                    }}
                  />
                  <ImageUploader
                    label="Client photo"
                    adminKey={adminKey}
                    value={t.image}
                    onChange={(url) => {
                      const next = [...content.testimonials];
                      next[i] = { ...t, image: url };
                      patch("testimonials", next);
                    }}
                  />
                  <label className="block sm:col-span-2">
                    <span className="mb-1 block text-xs font-semibold text-ink-muted">
                      Review text
                    </span>
                    <textarea
                      rows={3}
                      className={inputCls}
                      value={t.text}
                      onChange={(e) => {
                        const next = [...content.testimonials];
                        next[i] = { ...t, text: e.target.value };
                        patch("testimonials", next);
                      }}
                    />
                  </label>
                </div>
                <div className="mt-3 text-right">
                  <button
                    className={delBtnCls}
                    onClick={() =>
                      patch(
                        "testimonials",
                        content.testimonials.filter((_, j) => j !== i)
                      )
                    }
                  >
                    Delete review
                  </button>
                </div>
              </div>
            ))}
            <button
              className={addBtnCls}
              onClick={() =>
                patch("testimonials", [
                  ...content.testimonials,
                  { name: "New Client", role: "Client", rating: 5, text: "", image: "" },
                ])
              }
            >
              + Add Review
            </button>
            {saveBar("testimonials")}
          </div>
        )}
      </div>
    </div>
  );
}
