import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PageBanner from "@/components/PageBanner";
import ServiceDetail from "@/components/ServiceDetail";
import CTASection from "@/components/CTASection";
import { getServicePage } from "@/lib/content";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Hair Styling",
  description:
    "Expert hair styling at Sehar Beauty Salon — precision cuts, glossy colour, keratin treatments and elegant bridal updos by professional stylists.",
};

export default async function HairStylingPage() {
  const page = await getServicePage("hair-styling");
  if (!page) notFound();

  return (
    <>
      <PageBanner
        title={page.banner.title}
        subtitle={page.banner.subtitle}
        image={page.banner.image}
        crumbs={[
          { label: "Services", href: "/services" },
          { label: page.label },
        ]}
      />
      <ServiceDetail
        intro={page.intro}
        highlights={page.highlights}
        packages={page.packages}
        gallery={page.gallery}
      />
      <CTASection title={page.cta.title} subtitle={page.cta.subtitle} />
    </>
  );
}
