import Image from "next/image";
import Link from "next/link";
import { whatsappFrom } from "@/lib/content";
import type { HeroContent } from "@/lib/siteContent";

export default function Hero({
  hero,
  whatsapp,
}: {
  hero: HeroContent;
  whatsapp: string;
}) {
  return (
    <section className="relative overflow-hidden bg-ink">
      {/* Background image */}
      <div className="absolute inset-0">
        <Image
          src={hero.bgImage}
          alt="Luxury beauty salon interior"
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-40"
          unoptimized={hero.bgImage.startsWith("/uploads/")}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/85 to-ink/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-transparent" />
      </div>

      {/* Floating gold orbs */}
      <div className="pointer-events-none absolute -left-20 top-20 h-72 w-72 rounded-full bg-pink-500/20 blur-3xl animate-float" />
      <div className="pointer-events-none absolute -right-10 bottom-10 h-80 w-80 rounded-full bg-gold-400/20 blur-3xl animate-float [animation-delay:2s]" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-5 py-24 md:py-32 lg:grid-cols-2 lg:px-8">
        <div className="max-w-xl">
          <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-gold-400/40 bg-white/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-gold-300 [animation:fadeUp_0.6s_ease_forwards]">
            ✦ {hero.badge}
          </p>
          <h1 className="font-serif text-4xl font-bold leading-tight text-cream sm:text-5xl md:text-6xl [animation:fadeUp_0.7s_ease_forwards]">
            {hero.titleLine}
            <span className="block text-gold-gradient animate-shimmer">
              {hero.titleHighlight}
            </span>
          </h1>
          <p className="mt-6 max-w-md text-base leading-relaxed text-cream/75 sm:text-lg [animation:fadeUp_0.8s_ease_forwards]">
            {hero.subtitle}
          </p>

          <div className="mt-8 flex flex-wrap gap-4 [animation:fadeUp_0.9s_ease_forwards]">
            <Link
              href="/contact#booking"
              className="rounded-full bg-gradient-to-r from-pink-500 to-pink-600 px-8 py-3.5 text-sm font-semibold text-white shadow-xl shadow-pink-600/30 transition-transform hover:scale-105"
            >
              Book Appointment
            </Link>
            <a
              href={whatsappFrom(whatsapp)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-full border border-gold-400/50 px-8 py-3.5 text-sm font-semibold text-gold-200 backdrop-blur transition-colors hover:bg-gold-400/10"
            >
              💬 WhatsApp Booking
            </a>
          </div>

          {/* Stats */}
          <div className="mt-12 grid max-w-md grid-cols-3 gap-4 [animation:fadeUp_1s_ease_forwards]">
            {hero.stats.map((s) => (
              <div key={s.label}>
                <p className="font-serif text-3xl font-bold text-gold-gradient">
                  {s.value}
                </p>
                <p className="mt-1 text-xs text-cream/60">{s.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Decorative image card */}
        <div className="relative hidden lg:block">
          <div className="relative ml-auto aspect-[4/5] w-80 overflow-hidden rounded-[2rem] border border-gold-400/30 shadow-2xl animate-float">
            <Image
              src={hero.sideImage}
              alt="Beauty model"
              fill
              priority
              sizes="320px"
              className="object-cover"
              unoptimized={hero.sideImage.startsWith("/uploads/")}
            />
          </div>
          <div className="absolute -bottom-6 -left-6 rounded-2xl border border-gold-400/30 bg-ink/90 px-6 py-4 shadow-xl backdrop-blur">
            <p className="flex items-center gap-1 text-gold-300">★★★★★</p>
            <p className="mt-1 text-sm font-semibold text-cream">
              Trusted by 5,000+ women
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
