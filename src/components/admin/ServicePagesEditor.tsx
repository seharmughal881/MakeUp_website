"use client";

import { useState } from "react";
import ImageUploader from "./ImageUploader";

type Highlight = { icon: string; title: string; text: string };
type DetailPackage = {
  name: string;
  price: string;
  featured?: boolean;
  features: string[];
};
export type ServicePage = {
  slug: string;
  label: string;
  banner: { title: string; subtitle: string; image: string };
  intro: { eyebrow: string; heading: string; text: string[]; image: string };
  highlights: Highlight[];
  packages: DetailPackage[];
  gallery: string[];
  cta: { title: string; subtitle: string };
};

const inputCls =
  "w-full rounded-lg border border-gold-400/25 bg-cream/60 px-3 py-2 text-sm outline-none focus:border-pink-400 focus:ring-1 focus:ring-pink-200";
const labelCls = "mb-1 block text-xs font-semibold text-ink-muted";
const cardCls = "rounded-2xl border border-gold-400/20 bg-cream/40 p-5";
const addBtn =
  "rounded-full border border-dashed border-pink-400 px-5 py-2.5 text-sm font-semibold text-pink-600 hover:bg-pink-50";
const delBtn =
  "rounded-lg border border-red-200 px-3 py-1.5 text-xs font-medium text-red-600 hover:bg-red-50";

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mt-6">
      <h4 className="font-serif text-lg font-bold text-ink">{title}</h4>
      <div className="mt-3 space-y-3">{children}</div>
    </div>
  );
}

export default function ServicePagesEditor({
  pages,
  onChange,
  adminKey,
  slug,
}: {
  pages: ServicePage[];
  onChange: (next: ServicePage[]) => void;
  adminKey: string;
  /** When set, edit only this page and hide the page selector. */
  slug?: string;
}) {
  const lockedIdx = slug ? pages.findIndex((p) => p.slug === slug) : -1;
  const [selIdx, setSelIdx] = useState(0);
  const idx = lockedIdx >= 0 ? lockedIdx : selIdx;
  const setIdx = setSelIdx;
  const page = pages[idx];
  if (!page) return <p className="text-ink-muted/60">No service page found.</p>;

  // update the currently selected page
  const update = (patch: Partial<ServicePage>) => {
    const next = [...pages];
    next[idx] = { ...page, ...patch };
    onChange(next);
  };

  return (
    <div>
      {/* Page selector (hidden when locked to a single page) */}
      {lockedIdx < 0 && (
        <div className="flex flex-wrap gap-2">
          {pages.map((p, i) => (
            <button
              key={p.slug}
              onClick={() => setIdx(i)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                i === idx
                  ? "bg-gradient-to-r from-pink-500 to-pink-600 text-white"
                  : "border border-gold-400/30 bg-white text-ink-muted hover:bg-gold-400/10"
              }`}
            >
              {p.label}
            </button>
          ))}
        </div>
      )}

      <p className="mt-1 text-xs text-ink-muted/60">
        Editing page: <code className="text-pink-500">/{page.slug}</code>
      </p>

      {/* Banner */}
      <Section title="Page Banner (top)">
        <div className="grid gap-3 sm:grid-cols-2">
          <label className="block">
            <span className={labelCls}>Banner title</span>
            <input
              className={inputCls}
              value={page.banner.title}
              onChange={(e) =>
                update({ banner: { ...page.banner, title: e.target.value } })
              }
            />
          </label>
          <label className="block">
            <span className={labelCls}>Banner subtitle</span>
            <input
              className={inputCls}
              value={page.banner.subtitle}
              onChange={(e) =>
                update({ banner: { ...page.banner, subtitle: e.target.value } })
              }
            />
          </label>
        </div>
        <ImageUploader
          label="Banner background image"
          adminKey={adminKey}
          value={page.banner.image}
          onChange={(url) =>
            update({ banner: { ...page.banner, image: url } })
          }
        />
      </Section>

      {/* Intro */}
      <Section title="Intro Section">
        <div className="grid gap-3 sm:grid-cols-2">
          <label className="block">
            <span className={labelCls}>Eyebrow (small label)</span>
            <input
              className={inputCls}
              value={page.intro.eyebrow}
              onChange={(e) =>
                update({ intro: { ...page.intro, eyebrow: e.target.value } })
              }
            />
          </label>
          <label className="block">
            <span className={labelCls}>Heading</span>
            <input
              className={inputCls}
              value={page.intro.heading}
              onChange={(e) =>
                update({ intro: { ...page.intro, heading: e.target.value } })
              }
            />
          </label>
        </div>
        {page.intro.text.map((para, pi) => (
          <div key={pi} className="flex gap-2">
            <textarea
              rows={2}
              className={inputCls}
              value={para}
              onChange={(e) => {
                const text = [...page.intro.text];
                text[pi] = e.target.value;
                update({ intro: { ...page.intro, text } });
              }}
            />
            <button
              className={delBtn}
              onClick={() =>
                update({
                  intro: {
                    ...page.intro,
                    text: page.intro.text.filter((_, j) => j !== pi),
                  },
                })
              }
            >
              ✕
            </button>
          </div>
        ))}
        <button
          className="text-sm font-semibold text-pink-600 hover:underline"
          onClick={() =>
            update({ intro: { ...page.intro, text: [...page.intro.text, ""] } })
          }
        >
          + Add paragraph
        </button>
        <ImageUploader
          label="Intro image"
          adminKey={adminKey}
          value={page.intro.image}
          onChange={(url) => update({ intro: { ...page.intro, image: url } })}
        />
      </Section>

      {/* Highlights */}
      <Section title="Highlights (feature cards)">
        {page.highlights.map((h, hi) => (
          <div key={hi} className={`${cardCls} flex flex-wrap items-end gap-2`}>
            <div className="w-20">
              <span className={labelCls}>Icon</span>
              <input
                className={inputCls}
                value={h.icon}
                onChange={(e) => {
                  const hs = [...page.highlights];
                  hs[hi] = { ...h, icon: e.target.value };
                  update({ highlights: hs });
                }}
              />
            </div>
            <div className="min-w-[140px] flex-1">
              <span className={labelCls}>Title</span>
              <input
                className={inputCls}
                value={h.title}
                onChange={(e) => {
                  const hs = [...page.highlights];
                  hs[hi] = { ...h, title: e.target.value };
                  update({ highlights: hs });
                }}
              />
            </div>
            <div className="min-w-[180px] flex-[2]">
              <span className={labelCls}>Description</span>
              <input
                className={inputCls}
                value={h.text}
                onChange={(e) => {
                  const hs = [...page.highlights];
                  hs[hi] = { ...h, text: e.target.value };
                  update({ highlights: hs });
                }}
              />
            </div>
            <button
              className={delBtn}
              onClick={() =>
                update({
                  highlights: page.highlights.filter((_, j) => j !== hi),
                })
              }
            >
              Delete
            </button>
          </div>
        ))}
        <button
          className={addBtn}
          onClick={() =>
            update({
              highlights: [
                ...page.highlights,
                { icon: "✨", title: "New highlight", text: "" },
              ],
            })
          }
        >
          + Add highlight
        </button>
      </Section>

      {/* Packages */}
      <Section title="Packages / Prices">
        {page.packages.map((pkg, pi) => (
          <div key={pi} className={cardCls}>
            <div className="grid gap-3 sm:grid-cols-3">
              <label className="block">
                <span className={labelCls}>Package name</span>
                <input
                  className={inputCls}
                  value={pkg.name}
                  onChange={(e) => {
                    const ps = [...page.packages];
                    ps[pi] = { ...pkg, name: e.target.value };
                    update({ packages: ps });
                  }}
                />
              </label>
              <label className="block">
                <span className={labelCls}>Price</span>
                <input
                  className={inputCls}
                  value={pkg.price}
                  onChange={(e) => {
                    const ps = [...page.packages];
                    ps[pi] = { ...pkg, price: e.target.value };
                    update({ packages: ps });
                  }}
                />
              </label>
              <label className="flex items-center gap-2 pt-6 text-sm text-ink-muted">
                <input
                  type="checkbox"
                  checked={!!pkg.featured}
                  onChange={(e) => {
                    const ps = [...page.packages];
                    ps[pi] = { ...pkg, featured: e.target.checked };
                    update({ packages: ps });
                  }}
                />
                Highlight as “Most Popular”
              </label>
            </div>
            <div className="mt-3">
              <span className={labelCls}>Features (one per line)</span>
              {pkg.features.map((f, fi) => (
                <div key={fi} className="mt-1 flex gap-2">
                  <input
                    className={inputCls}
                    value={f}
                    onChange={(e) => {
                      const ps = [...page.packages];
                      const feats = [...pkg.features];
                      feats[fi] = e.target.value;
                      ps[pi] = { ...pkg, features: feats };
                      update({ packages: ps });
                    }}
                  />
                  <button
                    className={delBtn}
                    onClick={() => {
                      const ps = [...page.packages];
                      ps[pi] = {
                        ...pkg,
                        features: pkg.features.filter((_, j) => j !== fi),
                      };
                      update({ packages: ps });
                    }}
                  >
                    ✕
                  </button>
                </div>
              ))}
              <button
                className="mt-2 text-sm font-semibold text-pink-600 hover:underline"
                onClick={() => {
                  const ps = [...page.packages];
                  ps[pi] = { ...pkg, features: [...pkg.features, ""] };
                  update({ packages: ps });
                }}
              >
                + Add feature
              </button>
            </div>
            <div className="mt-3 text-right">
              <button
                className={delBtn}
                onClick={() =>
                  update({
                    packages: page.packages.filter((_, j) => j !== pi),
                  })
                }
              >
                Delete package
              </button>
            </div>
          </div>
        ))}
        <button
          className={addBtn}
          onClick={() =>
            update({
              packages: [
                ...page.packages,
                { name: "New Package", price: "Rs. 0", features: [] },
              ],
            })
          }
        >
          + Add package
        </button>
      </Section>

      {/* Gallery */}
      <Section title="Gallery Photos">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {page.gallery.map((url, gi) => (
            <div key={gi} className={cardCls}>
              <ImageUploader
                label={`Photo ${gi + 1}`}
                adminKey={adminKey}
                value={url}
                onChange={(u) => {
                  const g = [...page.gallery];
                  g[gi] = u;
                  update({ gallery: g });
                }}
              />
              <button
                className={`${delBtn} mt-2 w-full`}
                onClick={() =>
                  update({ gallery: page.gallery.filter((_, j) => j !== gi) })
                }
              >
                Delete
              </button>
            </div>
          ))}
        </div>
        <button
          className={addBtn}
          onClick={() => update({ gallery: [...page.gallery, ""] })}
        >
          + Add photo
        </button>
      </Section>

      {/* CTA */}
      <Section title="Bottom Call-to-Action">
        <div className="grid gap-3 sm:grid-cols-2">
          <label className="block">
            <span className={labelCls}>CTA title</span>
            <input
              className={inputCls}
              value={page.cta.title}
              onChange={(e) =>
                update({ cta: { ...page.cta, title: e.target.value } })
              }
            />
          </label>
          <label className="block">
            <span className={labelCls}>CTA subtitle</span>
            <input
              className={inputCls}
              value={page.cta.subtitle}
              onChange={(e) =>
                update({ cta: { ...page.cta, subtitle: e.target.value } })
              }
            />
          </label>
        </div>
      </Section>
    </div>
  );
}
