import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PageBanner from "@/components/PageBanner";
import ServiceDetail from "@/components/ServiceDetail";
import CTASection from "@/components/CTASection";
import { getServicePage } from "@/lib/content";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Bridal Makeup",
  description:
    "Luxury bridal makeup at Sehar Beauty Salon. Flawless, long-lasting HD bridal looks for your wedding, engagement and walima. Book your bridal trial today.",
};

export default async function BridalMakeupPage() {
  const page = await getServicePage("bridal-makeup");
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
