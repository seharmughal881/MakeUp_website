import Image from "next/image";
import Link from "next/link";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";
import { getSettings, whatsappFrom } from "@/lib/content";

const up = (src: string) => src.startsWith("/uploads/");

export type DetailPackage = {
  name: string;
  price: string;
  features: string[];
  featured?: boolean;
};

type Props = {
  intro: { eyebrow: string; heading: string; text: string[]; image: string };
  highlights: { icon: string; title: string; text: string }[];
  packages: DetailPackage[];
  gallery: string[];
};

/** Render a heading with its last word in the gold gradient for an elegant look. */
function GoldHeading({ text }: { text: string }) {
  const words = text.trim().split(" ");
  if (words.length < 2) return <span className="text-gold-gradient">{text}</span>;
  const last = words.pop();
  return (
    <>
      {words.join(" ")} <span className="text-gold-gradient">{last}</span>
    </>
  );
}

export default async function ServiceDetail({
  intro,
  highlights,
  packages,
  gallery,
}: Props) {
  const settings = await getSettings();
  return (
    <>
      {/* Intro */}
      <section className="bg-cream py-20">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 lg:grid-cols-2 lg:px-8">
          <Reveal>
            <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] border border-gold-400/30 shadow-2xl">
              <Image
                src={intro.image}
                alt={intro.eyebrow}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
                unoptimized={up(intro.image)}
              />
            </div>
          </Reveal>
          <Reveal delay={150}>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-pink-500">
              {intro.eyebrow}
            </p>
            <h2 className="mt-3 font-serif text-3xl font-bold leading-tight text-ink sm:text-4xl">
              <GoldHeading text={intro.heading} />
            </h2>
            <div className="gold-divider mt-5" />
            {intro.text.map((p, i) => (
              <p key={i} className="mt-4 leading-relaxed text-ink-muted/80">
                {p}
              </p>
            ))}
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/contact#booking"
                className="rounded-full bg-gradient-to-r from-pink-500 to-pink-600 px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-pink-600/30 transition-transform hover:scale-105"
              >
                Book Now
              </Link>
              <a
                href={whatsappFrom(settings.whatsapp)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-full border border-green-500/40 px-8 py-3.5 text-sm font-semibold text-green-600 transition-colors hover:bg-green-50"
              >
                💬 WhatsApp
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Highlights */}
      <section className="bg-gradient-to-b from-cream to-pink-50/40 py-20">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <SectionHeading
            eyebrow="Why Book With Us"
            title={
              <>
                What Makes It{" "}
                <span className="text-gold-gradient">Special</span>
              </>
            }
          />
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {highlights.map((h, i) => (
              <Reveal key={h.title} delay={i * 100}>
                <div className="h-full rounded-3xl border border-gold-400/20 bg-white p-7 shadow-lg shadow-pink-900/5">
                  <div className="grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-pink-50 to-gold-100 text-2xl">
                    {h.icon}
                  </div>
                  <h3 className="mt-4 font-serif text-lg font-bold text-ink">
                    {h.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-muted/75">
                    {h.text}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Packages */}
      <section className="bg-cream py-20">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <SectionHeading
            eyebrow="Our Packages"
            title={
              <>
                Choose Your{" "}
                <span className="text-gold-gradient">Package</span>
              </>
            }
          />
          <div className="mt-14 grid gap-7 md:grid-cols-3">
            {packages.map((pkg, i) => (
              <Reveal key={pkg.name} delay={i * 100}>
                <div
                  className={`relative flex h-full flex-col rounded-3xl border p-8 shadow-lg transition-all duration-500 hover:-translate-y-2 ${
                    pkg.featured
                      ? "border-gold-400 bg-ink text-cream shadow-2xl"
                      : "border-gold-400/20 bg-white"
                  }`}
                >
                  {pkg.featured && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-pink-500 to-gold-400 px-4 py-1 text-xs font-semibold text-white">
                      Most Popular
                    </span>
                  )}
                  <h3
                    className={`font-serif text-xl font-bold ${
                      pkg.featured ? "text-gold-300" : "text-ink"
                    }`}
                  >
                    {pkg.name}
                  </h3>
                  <p
                    className={`mt-3 font-serif text-3xl font-bold ${
                      pkg.featured ? "text-cream" : "text-pink-600"
                    }`}
                  >
                    {pkg.price}
                  </p>
                  <ul className="mt-6 flex-1 space-y-3 text-sm">
                    {pkg.features.map((f) => (
                      <li key={f} className="flex items-start gap-2">
                        <span className="text-gold-400">✦</span>
                        <span
                          className={
                            pkg.featured ? "text-cream/80" : "text-ink-muted/80"
                          }
                        >
                          {f}
                        </span>
                      </li>
                    ))}
                  </ul>
                  <Link
                    href="/contact#booking"
                    className={`mt-7 rounded-full px-6 py-3 text-center text-sm font-semibold transition-transform hover:scale-105 ${
                      pkg.featured
                        ? "bg-gradient-to-r from-pink-500 to-pink-600 text-white"
                        : "border border-gold-400/50 text-ink hover:bg-gold-400/10"
                    }`}
                  >
                    Book This Package
                  </Link>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="bg-gradient-to-b from-cream to-pink-50/40 py-20">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <SectionHeading
            eyebrow="Inspiration"
            title={
              <>
                Looks We&apos;ve{" "}
                <span className="text-gold-gradient">Created</span>
              </>
            }
          />
          <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {gallery.map((src, i) => (
              <Reveal key={src} delay={(i % 4) * 80}>
                <div className="group relative aspect-square overflow-hidden rounded-2xl border border-gold-400/20">
                  <Image
                    src={src}
                    alt={`Look ${i + 1}`}
                    fill
                    sizes="(max-width: 640px) 50vw, 25vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    unoptimized={up(src)}
                  />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
