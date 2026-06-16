import type { Metadata } from "next";
import Link from "next/link";
import PageBanner from "@/components/PageBanner";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";
import CTASection from "@/components/CTASection";
import { getContent, getSettings, whatsappFrom } from "@/lib/content";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Transparent pricing for all beauty services at Sehar Beauty Salon — bridal makeup, hair styling, facials, manicure, pedicure and more.",
};

export default async function PricingPage() {
  const { pricing } = await getContent();
  const settings = await getSettings();
  return (
    <>
      <PageBanner
        title="Pricing"
        subtitle="Transparent, honest pricing for every luxury beauty service."
        image="https://images.unsplash.com/photo-1604654894610-df63bc536371?w=1600&q=80&auto=format&fit=crop"
        crumbs={[{ label: "Pricing" }]}
      />

      <section className="bg-cream py-20">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <SectionHeading
            eyebrow="Our Menu"
            title={
              <>
                Service <span className="text-gold-gradient">Price List</span>
              </>
            }
            subtitle="Prices may vary based on hair length, product choice and customisation. Contact us for a personalised quote."
          />

          <div className="mt-14 grid gap-7 md:grid-cols-2">
            {pricing.map((group, gi) => (
              <Reveal key={group.category} delay={(gi % 2) * 120}>
                <div className="h-full rounded-3xl border border-gold-400/20 bg-white p-7 shadow-lg shadow-pink-900/5 sm:p-8">
                  <div className="flex items-center gap-3 border-b border-gold-400/15 pb-4">
                    <span className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-pink-50 to-gold-100 text-2xl">
                      {group.icon}
                    </span>
                    <h3 className="font-serif text-xl font-bold text-ink">
                      {group.category}
                    </h3>
                  </div>
                  <ul className="mt-5 space-y-4">
                    {group.items.map((item) => (
                      <li
                        key={item.name}
                        className="flex items-center justify-between gap-4"
                      >
                        <span className="flex items-center gap-2 text-sm text-ink-muted">
                          {item.name}
                          {item.note && (
                            <span className="rounded-full bg-pink-50 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-pink-600">
                              {item.note}
                            </span>
                          )}
                        </span>
                        <span className="shrink-0 font-serif text-base font-bold text-gold-500">
                          {item.price}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal className="mx-auto mt-14 max-w-2xl rounded-3xl border border-gold-400/30 bg-gradient-to-br from-pink-50 to-gold-100/50 p-8 text-center">
            <h3 className="font-serif text-2xl font-bold text-ink">
              Need a Custom Package?
            </h3>
            <p className="mt-2 text-sm text-ink-muted/80">
              Planning a wedding or group event? We offer special bundled rates.
              Get in touch for a tailored quote.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-4">
              <Link
                href="/contact#booking"
                className="rounded-full bg-gradient-to-r from-pink-500 to-pink-600 px-7 py-3 text-sm font-semibold text-white shadow-lg shadow-pink-600/30 transition-transform hover:scale-105"
              >
                Get a Quote
              </Link>
              <a
                href={whatsappFrom(settings.whatsapp)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-full border border-green-500/40 bg-white px-7 py-3 text-sm font-semibold text-green-600 transition-colors hover:bg-green-50"
              >
                💬 Ask on WhatsApp
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      <CTASection />
    </>
  );
}
