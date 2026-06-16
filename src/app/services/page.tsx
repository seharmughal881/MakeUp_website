import type { Metadata } from "next";
import PageBanner from "@/components/PageBanner";
import SectionHeading from "@/components/SectionHeading";
import ServiceCard from "@/components/ServiceCard";
import Reveal from "@/components/Reveal";
import CTASection from "@/components/CTASection";
import { getContent } from "@/lib/content";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Explore our full range of luxury beauty services — bridal & party makeup, hair styling, facials, manicure, pedicure, threading and waxing.",
};

const process = [
  { step: "01", title: "Consultation", text: "We understand your style, occasion and preferences." },
  { step: "02", title: "Customisation", text: "Our experts design a look tailored just for you." },
  { step: "03", title: "Pampering", text: "Relax while our artists work their magic." },
  { step: "04", title: "Reveal", text: "Walk out glowing, confident and camera-ready." },
];

export default async function ServicesPage() {
  const { services } = await getContent();
  return (
    <>
      <PageBanner
        title="Our Services"
        subtitle="A complete menu of luxury beauty treatments designed to make you shine."
        image="https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=1600&q=80&auto=format&fit=crop"
        crumbs={[{ label: "Services" }]}
      />

      <section className="bg-cream py-20">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <SectionHeading
            eyebrow="What We Offer"
            title={
              <>
                Premium Beauty{" "}
                <span className="text-gold-gradient">Treatments</span>
              </>
            }
            subtitle="Each service is delivered with premium products, expert skill and a personal touch."
          />
          <div className="mt-14 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s, i) => (
              <Reveal key={s.slug} delay={(i % 3) * 100}>
                <ServiceCard service={s} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="bg-gradient-to-b from-cream to-pink-50/40 py-20">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <SectionHeading
            eyebrow="How It Works"
            title={
              <>
                Your Beauty{" "}
                <span className="text-gold-gradient">Journey</span>
              </>
            }
          />
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {process.map((p, i) => (
              <Reveal key={p.step} delay={i * 100}>
                <div className="h-full rounded-3xl border border-gold-400/20 bg-white p-7 shadow-lg shadow-pink-900/5">
                  <span className="font-serif text-4xl font-bold text-pink-200">
                    {p.step}
                  </span>
                  <h3 className="mt-3 font-serif text-lg font-bold text-ink">
                    {p.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-muted/75">
                    {p.text}
                  </p>
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
