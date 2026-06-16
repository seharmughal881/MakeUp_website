import Image from "next/image";
import Link from "next/link";
import Hero from "@/components/Hero";
import SectionHeading from "@/components/SectionHeading";
import ServiceCard from "@/components/ServiceCard";
import Reveal from "@/components/Reveal";
import Testimonials from "@/components/Testimonials";
import BeforeAfter from "@/components/BeforeAfter";
import CTASection from "@/components/CTASection";
import { getContent } from "@/lib/content";

export const dynamic = "force-dynamic";

const features = [
  {
    icon: "👑",
    title: "Expert Artists",
    text: "Certified makeup artists & stylists with 10+ years of experience.",
  },
  {
    icon: "💎",
    title: "Premium Products",
    text: "Only luxury, skin-friendly international beauty brands.",
  },
  {
    icon: "🧖‍♀️",
    title: "Relaxing Ambience",
    text: "An elegant, hygienic and comfortable salon environment.",
  },
  {
    icon: "💗",
    title: "Personalised Care",
    text: "Custom looks tailored to your features and occasion.",
  },
];

export default async function Home() {
  const { hero, settings, services, gallery, showcase, testimonials } =
    await getContent();
  return (
    <>
      <Hero hero={hero} whatsapp={settings.whatsapp} />

      {/* Why Choose Us */}
      <section className="bg-cream py-20">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <SectionHeading
            eyebrow="Why Choose Us"
            title={
              <>
                The Sehar <span className="text-gold-gradient">Difference</span>
              </>
            }
            subtitle="We blend artistry, premium products and personal care to deliver a beauty experience that feels truly luxurious."
          />
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((f, i) => (
              <Reveal key={f.title} delay={i * 100}>
                <div className="group h-full rounded-3xl border border-gold-400/20 bg-white p-7 text-center shadow-lg shadow-pink-900/5 transition-all duration-500 hover:-translate-y-2 hover:border-gold-400/60">
                  <div className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-gradient-to-br from-pink-50 to-gold-100 text-3xl transition-transform group-hover:scale-110">
                    {f.icon}
                  </div>
                  <h3 className="mt-5 font-serif text-lg font-bold text-ink">
                    {f.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-muted/75">
                    {f.text}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="bg-gradient-to-b from-cream to-pink-50/40 py-20">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <SectionHeading
            eyebrow="Our Services"
            title={
              <>
                Indulge in Our{" "}
                <span className="text-gold-gradient">Signature</span> Treatments
              </>
            }
            subtitle="From breathtaking bridal looks to rejuvenating facials — discover services crafted to make you glow."
          />
          <div className="mt-14 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s, i) => (
              <Reveal key={s.slug} delay={(i % 3) * 100}>
                <ServiceCard service={s} />
              </Reveal>
            ))}
          </div>
          <div className="mt-12 text-center">
            <Link
              href="/services"
              className="inline-block rounded-full border border-gold-400/50 px-8 py-3.5 text-sm font-semibold text-ink transition-colors hover:bg-gold-400/10"
            >
              View All Services →
            </Link>
          </div>
        </div>
      </section>

      {/* About teaser */}
      <section className="bg-cream py-20">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 lg:grid-cols-2 lg:px-8">
          <Reveal>
            <div className="relative">
              <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem] border border-gold-400/30 shadow-2xl">
                <Image
                  src="https://images.unsplash.com/photo-1633681926022-84c23e8cb2d6?w=900&q=80&auto=format&fit=crop"
                  alt="Sehar Beauty Salon interior"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-4 rounded-2xl bg-gradient-to-r from-pink-500 to-pink-600 px-6 py-5 text-white shadow-xl">
                <p className="font-serif text-3xl font-bold">10+</p>
                <p className="text-xs">Years of Beauty Excellence</p>
              </div>
            </div>
          </Reveal>
          <Reveal delay={150}>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-pink-500">
              About Sehar Beauty
            </p>
            <h2 className="mt-3 font-serif text-3xl font-bold leading-tight text-ink sm:text-4xl">
              A Luxury Destination for{" "}
              <span className="text-gold-gradient">Timeless Beauty</span>
            </h2>
            <div className="gold-divider mt-5" />
            <p className="mt-5 leading-relaxed text-ink-muted/80">
              At Sehar Beauty Salon, beauty is an art and every client is our
              muse. For over a decade we have helped thousands of women look and
              feel their absolute best — on their wedding day, at special events,
              and every day in between.
            </p>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {[
                "Award-winning bridal artistry",
                "Hygienic & sanitised tools",
                "Luxury imported products",
                "Personalised consultations",
              ].map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-2 text-sm text-ink-muted"
                >
                  <span className="text-gold-400">✦</span> {item}
                </li>
              ))}
            </ul>
            <Link
              href="/about"
              className="mt-8 inline-block rounded-full bg-ink px-8 py-3.5 text-sm font-semibold text-cream transition-colors hover:bg-ink-soft"
            >
              Learn More About Us
            </Link>
          </Reveal>
        </div>
      </section>

      {/* Before & After */}
      <section className="bg-gradient-to-b from-pink-50/40 to-cream py-20">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <SectionHeading
            eyebrow="Real Transformations"
            title={
              <>
                Before <span className="text-gold-gradient">&</span> After
              </>
            }
            subtitle="Drag the slider to reveal the stunning transformations created by our talented team."
          />
          <div className="mt-14 grid gap-7 md:grid-cols-2">
            {gallery.slice(0, 2).map((item, i) => (
              <Reveal key={item.title} delay={i * 120}>
                <BeforeAfter item={item} />
              </Reveal>
            ))}
          </div>
          <div className="mt-12 text-center">
            <Link
              href="/gallery"
              className="inline-block rounded-full border border-gold-400/50 px-8 py-3.5 text-sm font-semibold text-ink transition-colors hover:bg-gold-400/10"
            >
              View Full Gallery →
            </Link>
          </div>
        </div>
      </section>

      {/* Gallery strip */}
      <section className="bg-cream py-20">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <SectionHeading
            eyebrow="Our Work"
            title={
              <>
                A Glimpse of Our{" "}
                <span className="text-gold-gradient">Artistry</span>
              </>
            }
          />
          <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {showcase.map((src, i) => (
              <Reveal key={src} delay={(i % 4) * 80}>
                <div className="group relative aspect-square overflow-hidden rounded-2xl border border-gold-400/20">
                  <Image
                    src={src}
                    alt={`Salon work ${i + 1}`}
                    fill
                    sizes="(max-width: 640px) 50vw, 25vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    unoptimized={src.startsWith("/uploads/")}
                  />
                  <div className="absolute inset-0 bg-pink-600/0 transition-colors group-hover:bg-pink-600/20" />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-gradient-to-b from-cream to-pink-50/40 py-20">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <SectionHeading
            eyebrow="Happy Clients"
            title={
              <>
                What Our <span className="text-gold-gradient">Clients</span> Say
              </>
            }
          />
          <Testimonials items={testimonials} />
        </div>
      </section>

      <CTASection />
    </>
  );
}
