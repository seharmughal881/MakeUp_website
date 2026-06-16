import type { Metadata } from "next";
import Image from "next/image";
import PageBanner from "@/components/PageBanner";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";
import CTASection from "@/components/CTASection";
import { getContent } from "@/lib/content";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Customer Reviews",
  description:
    "Read genuine reviews from happy clients of Sehar Beauty Salon — bridal makeup, hair styling, facials and beauty services rated 5 stars.",
};

const stats = [
  { value: "4.9", label: "Average Rating" },
  { value: "1,200+", label: "5-Star Reviews" },
  { value: "98%", label: "Would Recommend" },
  { value: "5K+", label: "Happy Clients" },
];

export default async function ReviewsPage() {
  const { testimonials: reviews } = await getContent();
  return (
    <>
      <PageBanner
        title="Customer Reviews"
        subtitle="Don't just take our word for it — hear from the women we've pampered."
        image="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=1600&q=80&auto=format&fit=crop"
        crumbs={[{ label: "Reviews" }]}
      />

      {/* Stats */}
      <section className="bg-ink py-14">
        <div className="mx-auto grid max-w-5xl grid-cols-2 gap-6 px-5 sm:grid-cols-4 lg:px-8">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 80} className="text-center">
              <p className="font-serif text-4xl font-bold text-gold-gradient">
                {s.value}
              </p>
              <p className="mt-1 text-sm text-cream/60">{s.label}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Reviews grid */}
      <section className="bg-cream py-20">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <SectionHeading
            eyebrow="Testimonials"
            title={
              <>
                Loved by{" "}
                <span className="text-gold-gradient">Thousands</span>
              </>
            }
            subtitle="Real stories from real clients who trust us with their beauty."
          />
          <div className="mt-14 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
            {reviews.map((r, i) => (
              <Reveal key={r.name} delay={(i % 3) * 100}>
                <div className="flex h-full flex-col rounded-3xl border border-gold-400/20 bg-white p-7 shadow-lg shadow-pink-900/5 transition-all duration-500 hover:-translate-y-2">
                  <div className="flex items-center gap-1 text-gold-400">
                    {Array.from({ length: r.rating }).map((_, j) => (
                      <span key={j}>★</span>
                    ))}
                  </div>
                  <p className="mt-4 flex-1 text-sm leading-relaxed text-ink-muted/80">
                    “{r.text}”
                  </p>
                  <div className="mt-6 flex items-center gap-3 border-t border-gold-400/15 pt-5">
                    <div className="relative h-12 w-12 overflow-hidden rounded-full border-2 border-gold-400/40">
                      <Image
                        src={r.image}
                        alt={r.name}
                        fill
                        sizes="48px"
                        className="object-cover"
                        unoptimized={r.image.startsWith("/uploads/")}
                      />
                    </div>
                    <div>
                      <p className="font-serif font-semibold text-ink">
                        {r.name}
                      </p>
                      <p className="text-xs text-pink-500">{r.role}</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        title="Become Our Next Happy Client"
        subtitle="Experience the luxury for yourself. Book your appointment today."
      />
    </>
  );
}
