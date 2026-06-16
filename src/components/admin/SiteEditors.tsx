"use client";

import ImageUploader from "./ImageUploader";
import type {
  SiteSettings,
  HeroContent,
  AboutContent,
} from "@/lib/siteContent";

const inputCls =
  "w-full rounded-lg border border-gold-400/25 bg-cream/60 px-3 py-2 text-sm outline-none focus:border-pink-400 focus:ring-1 focus:ring-pink-200";
const labelCls = "mb-1 block text-xs font-semibold text-ink-muted";
const cardCls = "rounded-2xl border border-gold-400/20 bg-cream/40 p-5";
const addBtn =
  "rounded-full border border-dashed border-pink-400 px-5 py-2.5 text-sm font-semibold text-pink-600 hover:bg-pink-50";
const delBtn =
  "rounded-lg border border-red-200 px-3 py-1.5 text-xs font-medium text-red-600 hover:bg-red-50";

function Text({
  label,
  value,
  onChange,
  area,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  area?: boolean;
  placeholder?: string;
}) {
  return (
    <label className="block">
      <span className={labelCls}>{label}</span>
      {area ? (
        <textarea
          rows={2}
          className={inputCls}
          value={value}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
        />
      ) : (
        <input
          className={inputCls}
          value={value}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
        />
      )}
    </label>
  );
}

function StatRows({
  stats,
  onChange,
}: {
  stats: { value: string; label: string }[];
  onChange: (s: { value: string; label: string }[]) => void;
}) {
  return (
    <div className="space-y-2">
      <span className={labelCls}>Stats (number + label)</span>
      {stats.map((s, i) => (
        <div key={i} className="flex gap-2">
          <input
            className={`${inputCls} w-24`}
            value={s.value}
            placeholder="10+"
            onChange={(e) => {
              const next = [...stats];
              next[i] = { ...s, value: e.target.value };
              onChange(next);
            }}
          />
          <input
            className={inputCls}
            value={s.label}
            placeholder="Years Experience"
            onChange={(e) => {
              const next = [...stats];
              next[i] = { ...s, label: e.target.value };
              onChange(next);
            }}
          />
          <button
            className={delBtn}
            onClick={() => onChange(stats.filter((_, j) => j !== i))}
          >
            ✕
          </button>
        </div>
      ))}
      <button
        className="text-sm font-semibold text-pink-600 hover:underline"
        onClick={() => onChange([...stats, { value: "", label: "" }])}
      >
        + Add stat
      </button>
    </div>
  );
}

/* ------------------------- SETTINGS ------------------------- */
export function SettingsEditor({
  value,
  onChange,
}: {
  value: SiteSettings;
  onChange: (v: SiteSettings) => void;
}) {
  const set = (patch: Partial<SiteSettings>) => onChange({ ...value, ...patch });
  const setSocial = (patch: Partial<SiteSettings["social"]>) =>
    onChange({ ...value, social: { ...value.social, ...patch } });

  return (
    <div className="space-y-5">
      <div className={cardCls}>
        <h4 className="mb-3 font-serif text-lg font-bold text-ink">
          Business Info
        </h4>
        <div className="grid gap-3 sm:grid-cols-2">
          <Text label="Salon name" value={value.name} onChange={(v) => set({ name: v })} />
          <Text label="Tagline" value={value.tagline} onChange={(v) => set({ tagline: v })} />
          <Text label="Phone (display)" value={value.phone} onChange={(v) => set({ phone: v })} />
          <Text
            label="WhatsApp number (digits only, e.g. 923001234567)"
            value={value.whatsapp}
            onChange={(v) => set({ whatsapp: v.replace(/\D/g, "") })}
          />
          <Text label="Email" value={value.email} onChange={(v) => set({ email: v })} />
          <Text label="Opening hours" value={value.hours} onChange={(v) => set({ hours: v })} />
          <Text label="Address" value={value.address} onChange={(v) => set({ address: v })} />
          <Text label="City / Country" value={value.city} onChange={(v) => set({ city: v })} />
        </div>
        <div className="mt-3">
          <Text
            label="Google Maps embed URL (Share → Embed a map → copy the src link)"
            value={value.mapsEmbed}
            onChange={(v) => set({ mapsEmbed: v })}
            area
          />
        </div>
      </div>

      <div className={cardCls}>
        <h4 className="mb-3 font-serif text-lg font-bold text-ink">
          Social Media Links
        </h4>
        <div className="grid gap-3 sm:grid-cols-2">
          <Text label="Instagram URL" value={value.social.instagram} onChange={(v) => setSocial({ instagram: v })} />
          <Text label="Facebook URL" value={value.social.facebook} onChange={(v) => setSocial({ facebook: v })} />
          <Text label="TikTok URL" value={value.social.tiktok} onChange={(v) => setSocial({ tiktok: v })} />
          <Text label="YouTube URL" value={value.social.youtube} onChange={(v) => setSocial({ youtube: v })} />
        </div>
        <p className="mt-2 text-xs text-ink-muted/60">
          Leave a field empty to hide that icon in the footer.
        </p>
      </div>
    </div>
  );
}

/* ------------------------- HERO ------------------------- */
export function HeroEditor({
  value,
  onChange,
  adminKey,
}: {
  value: HeroContent;
  onChange: (v: HeroContent) => void;
  adminKey: string;
}) {
  const set = (patch: Partial<HeroContent>) => onChange({ ...value, ...patch });
  return (
    <div className="space-y-5">
      <div className={cardCls}>
        <div className="grid gap-3 sm:grid-cols-2">
          <Text label="Badge text (top pill)" value={value.badge} onChange={(v) => set({ badge: v })} />
          <Text label="Title — line 1" value={value.titleLine} onChange={(v) => set({ titleLine: v })} />
          <Text label="Title — highlighted (gold) line" value={value.titleHighlight} onChange={(v) => set({ titleHighlight: v })} />
        </div>
        <div className="mt-3">
          <Text label="Subtitle" value={value.subtitle} onChange={(v) => set({ subtitle: v })} area />
        </div>
      </div>
      <div className={`${cardCls} grid gap-4 sm:grid-cols-2`}>
        <ImageUploader
          label="Background image (large banner)"
          adminKey={adminKey}
          value={value.bgImage}
          onChange={(url) => set({ bgImage: url })}
        />
        <ImageUploader
          label="Side image (model card)"
          adminKey={adminKey}
          value={value.sideImage}
          onChange={(url) => set({ sideImage: url })}
        />
      </div>
      <div className={cardCls}>
        <StatRows stats={value.stats} onChange={(stats) => set({ stats })} />
      </div>
    </div>
  );
}

/* ------------------------- ABOUT ------------------------- */
export function AboutEditor({
  value,
  onChange,
  adminKey,
}: {
  value: AboutContent;
  onChange: (v: AboutContent) => void;
  adminKey: string;
}) {
  const setBanner = (patch: Partial<AboutContent["banner"]>) =>
    onChange({ ...value, banner: { ...value.banner, ...patch } });
  const setStory = (patch: Partial<AboutContent["story"]>) =>
    onChange({ ...value, story: { ...value.story, ...patch } });

  return (
    <div className="space-y-5">
      {/* Banner */}
      <div className={cardCls}>
        <h4 className="mb-3 font-serif text-lg font-bold text-ink">Page Banner</h4>
        <div className="grid gap-3 sm:grid-cols-2">
          <Text label="Title" value={value.banner.title} onChange={(v) => setBanner({ title: v })} />
          <Text label="Subtitle" value={value.banner.subtitle} onChange={(v) => setBanner({ subtitle: v })} />
        </div>
        <div className="mt-3">
          <ImageUploader
            label="Banner background image"
            adminKey={adminKey}
            value={value.banner.image}
            onChange={(url) => setBanner({ image: url })}
          />
        </div>
      </div>

      {/* Story */}
      <div className={cardCls}>
        <h4 className="mb-3 font-serif text-lg font-bold text-ink">Story</h4>
        <div className="grid gap-3 sm:grid-cols-2">
          <Text label="Eyebrow" value={value.story.eyebrow} onChange={(v) => setStory({ eyebrow: v })} />
          <Text label="Heading" value={value.story.heading} onChange={(v) => setStory({ heading: v })} />
        </div>
        <div className="mt-3 space-y-2">
          <span className={labelCls}>Paragraphs</span>
          {value.story.paragraphs.map((p, i) => (
            <div key={i} className="flex gap-2">
              <textarea
                rows={2}
                className={inputCls}
                value={p}
                onChange={(e) => {
                  const paragraphs = [...value.story.paragraphs];
                  paragraphs[i] = e.target.value;
                  setStory({ paragraphs });
                }}
              />
              <button
                className={delBtn}
                onClick={() =>
                  setStory({
                    paragraphs: value.story.paragraphs.filter((_, j) => j !== i),
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
              setStory({ paragraphs: [...value.story.paragraphs, ""] })
            }
          >
            + Add paragraph
          </button>
        </div>
        <div className="mt-3 grid gap-4 sm:grid-cols-2">
          <ImageUploader
            label="Story image"
            adminKey={adminKey}
            value={value.story.image}
            onChange={(url) => setStory({ image: url })}
          />
          <StatRows
            stats={value.story.stats}
            onChange={(stats) => setStory({ stats })}
          />
        </div>
      </div>

      {/* Values */}
      <div className={cardCls}>
        <h4 className="mb-3 font-serif text-lg font-bold text-ink">
          Core Values
        </h4>
        <div className="space-y-2">
          {value.values.map((v, i) => (
            <div key={i} className="flex flex-wrap items-end gap-2">
              <div className="w-20">
                <Text
                  label="Icon"
                  value={v.icon}
                  onChange={(val) => {
                    const vals = [...value.values];
                    vals[i] = { ...v, icon: val };
                    onChange({ ...value, values: vals });
                  }}
                />
              </div>
              <div className="min-w-[120px] flex-1">
                <Text
                  label="Title"
                  value={v.title}
                  onChange={(val) => {
                    const vals = [...value.values];
                    vals[i] = { ...v, title: val };
                    onChange({ ...value, values: vals });
                  }}
                />
              </div>
              <div className="min-w-[180px] flex-[2]">
                <Text
                  label="Text"
                  value={v.text}
                  onChange={(val) => {
                    const vals = [...value.values];
                    vals[i] = { ...v, text: val };
                    onChange({ ...value, values: vals });
                  }}
                />
              </div>
              <button
                className={delBtn}
                onClick={() =>
                  onChange({
                    ...value,
                    values: value.values.filter((_, j) => j !== i),
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
              onChange({
                ...value,
                values: [...value.values, { icon: "✨", title: "", text: "" }],
              })
            }
          >
            + Add value
          </button>
        </div>
      </div>

      {/* Team */}
      <div className={cardCls}>
        <h4 className="mb-3 font-serif text-lg font-bold text-ink">
          Team Members
        </h4>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {value.team.map((m, i) => (
            <div key={i} className="rounded-xl border border-gold-400/20 bg-white p-4">
              <Text
                label="Name"
                value={m.name}
                onChange={(val) => {
                  const team = [...value.team];
                  team[i] = { ...m, name: val };
                  onChange({ ...value, team });
                }}
              />
              <div className="mt-2">
                <Text
                  label="Role"
                  value={m.role}
                  onChange={(val) => {
                    const team = [...value.team];
                    team[i] = { ...m, role: val };
                    onChange({ ...value, team });
                  }}
                />
              </div>
              <div className="mt-2">
                <ImageUploader
                  label="Photo"
                  adminKey={adminKey}
                  value={m.image}
                  onChange={(url) => {
                    const team = [...value.team];
                    team[i] = { ...m, image: url };
                    onChange({ ...value, team });
                  }}
                />
              </div>
              <button
                className={`${delBtn} mt-2 w-full`}
                onClick={() =>
                  onChange({
                    ...value,
                    team: value.team.filter((_, j) => j !== i),
                  })
                }
              >
                Delete member
              </button>
            </div>
          ))}
        </div>
        <button
          className={`${addBtn} mt-4`}
          onClick={() =>
            onChange({
              ...value,
              team: [...value.team, { name: "", role: "", image: "" }],
            })
          }
        >
          + Add team member
        </button>
      </div>
    </div>
  );
}
