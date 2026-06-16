import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PageBanner from "@/components/PageBanner";
import ServiceDetail from "@/components/ServiceDetail";
import CTASection from "@/components/CTASection";
import { getServicePage } from "@/lib/content";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Skin Care & Facial",
  description:
    "Luxury facials and skin care at Sehar Beauty Salon — hydrating, whitening, anti-ageing and gold facials for radiant, healthy, glowing skin.",
};

export default async function SkinCarePage() {
  const page = await getServicePage("skin-care");
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
