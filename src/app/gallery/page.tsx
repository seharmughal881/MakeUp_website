import type { Metadata } from "next";
import Image from "next/image";
import PageBanner from "@/components/PageBanner";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";
import BeforeAfter from "@/components/BeforeAfter";
import CTASection from "@/components/CTASection";
import { getContent } from "@/lib/content";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "Browse the Sehar Beauty Salon gallery — real before & after transformations of bridal makeup, hair styling, facials and beauty makeovers.",
};

export default async function GalleryPage() {
  const { gallery, showcase } = await getContent();
  return (
    <>
      <PageBanner
        title="Gallery"
        subtitle="Real clients, real transformations — see the artistry for yourself."
        image="https://images.unsplash.com/photo-1522338242992-e1a54906a8da?w=1600&q=80&auto=format&fit=crop"
        crumbs={[{ label: "Gallery" }]}
      />

      {/* Before & After */}
      <section className="bg-cream py-20">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <SectionHeading
            eyebrow="Transformations"
            title={
              <>
                Before <span className="text-gold-gradient">&</span> After
              </>
            }
            subtitle="Drag the slider on each image to reveal the stunning transformation."
          />
          <div className="mt-14 grid gap-7 md:grid-cols-2">
            {gallery.map((item, i) => (
              <Reveal key={item.title} delay={(i % 2) * 120}>
                <BeforeAfter item={item} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Showcase grid */}
      <section className="bg-gradient-to-b from-cream to-pink-50/40 py-20">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <SectionHeading
            eyebrow="Our Portfolio"
            title={
              <>
                Moments of{" "}
                <span className="text-gold-gradient">Beauty</span>
              </>
            }
          />
          <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {[...showcase, ...showcase.slice(0, 4)].map(
              (src, i) => (
                <Reveal key={`${src}-${i}`} delay={(i % 4) * 70}>
                  <div
                    className={`group relative overflow-hidden rounded-2xl border border-gold-400/20 ${
                      i % 5 === 0 ? "row-span-2 aspect-[3/4]" : "aspect-square"
                    }`}
                  >
                    <Image
                      src={src}
                      alt={`Gallery image ${i + 1}`}
                      fill
                      sizes="(max-width: 640px) 50vw, 25vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                      unoptimized={src.startsWith("/uploads/")}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink/50 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                  </div>
                </Reveal>
              )
            )}
          </div>
        </div>
      </section>

      <CTASection
        title="Want a Look Like This?"
        subtitle="Book your appointment and let our artists create your perfect look."
      />
    </>
  );
}
