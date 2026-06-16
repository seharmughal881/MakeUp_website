import type { Metadata } from "next";
import Image from "next/image";
import PageBanner from "@/components/PageBanner";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";
import CTASection from "@/components/CTASection";
import { getContent } from "@/lib/content";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about Sehar Beauty Salon — a luxury beauty destination with 10+ years of expertise in bridal makeup, hair styling and skincare.",
};

const up = (src: string) => src.startsWith("/uploads/");

export default async function AboutPage() {
  const { about } = await getContent();

  return (
    <>
      <PageBanner
        title={about.banner.title}
        subtitle={about.banner.subtitle}
        image={about.banner.image}
        crumbs={[{ label: "About" }]}
      />

      {/* Story */}
      <section className="bg-cream py-20">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 lg:grid-cols-2 lg:px-8">
          <Reveal>
            <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] border border-gold-400/30 shadow-2xl">
              <Image
                src={about.story.image}
                alt={about.story.heading}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
                unoptimized={up(about.story.image)}
              />
            </div>
          </Reveal>
          <Reveal delay={150}>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-pink-500">
              {about.story.eyebrow}
            </p>
            <h2 className="mt-3 font-serif text-3xl font-bold leading-tight text-ink sm:text-4xl">
              {about.story.heading}
            </h2>
            <div className="gold-divider mt-5" />
            {about.story.paragraphs.map((p, i) => (
              <p key={i} className="mt-4 leading-relaxed text-ink-muted/80">
                {p}
              </p>
            ))}
            <div className="mt-8 grid grid-cols-3 gap-4">
              {about.story.stats.map((s) => (
                <div
                  key={s.label}
                  className="rounded-2xl border border-gold-400/20 bg-white p-4 text-center shadow-sm"
                >
                  <p className="font-serif text-2xl font-bold text-gold-gradient">
                    {s.value}
                  </p>
                  <p className="mt-1 text-xs text-ink-muted/70">{s.label}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Values */}
      <section className="bg-gradient-to-b from-cream to-pink-50/40 py-20">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <SectionHeading
            eyebrow="What Drives Us"
            title={
              <>
                Our Core <span className="text-gold-gradient">Values</span>
              </>
            }
          />
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {about.values.map((v, i) => (
              <Reveal key={v.title} delay={i * 120}>
                <div className="h-full rounded-3xl border border-gold-400/20 bg-white p-8 text-center shadow-lg shadow-pink-900/5">
                  <div className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-gradient-to-br from-pink-50 to-gold-100 text-3xl">
                    {v.icon}
                  </div>
                  <h3 className="mt-5 font-serif text-xl font-bold text-ink">
                    {v.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-ink-muted/75">
                    {v.text}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="bg-cream py-20">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <SectionHeading
            eyebrow="Meet The Experts"
            title={
              <>
                Our Talented <span className="text-gold-gradient">Team</span>
              </>
            }
            subtitle="Skilled, certified and passionate beauty professionals dedicated to your glow."
          />
          <div className="mt-14 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
            {about.team.map((m, i) => (
              <Reveal key={`${m.name}-${i}`} delay={i * 120}>
                <div className="group overflow-hidden rounded-3xl border border-gold-400/20 bg-white shadow-lg">
                  <div className="relative h-72 overflow-hidden">
                    <Image
                      src={m.image}
                      alt={m.name}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                      unoptimized={up(m.image)}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink/60 to-transparent" />
                  </div>
                  <div className="p-6 text-center">
                    <h3 className="font-serif text-lg font-bold text-ink">
                      {m.name}
                    </h3>
                    <p className="mt-1 text-sm text-pink-500">{m.role}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
