import type { Metadata } from "next";
import PageBanner from "@/components/PageBanner";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";
import BookingForm from "@/components/BookingForm";
import GoogleMap from "@/components/GoogleMap";
import { getSettings, whatsappFrom } from "@/lib/content";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Contact Sehar Beauty Salon to book an appointment. Call, WhatsApp, email or visit us. Online appointment booking available.",
};

export default async function ContactPage() {
  const settings = await getSettings();
  const contactCards = [
    { icon: "📍", title: "Visit Us", lines: [settings.address, settings.city] },
    {
      icon: "📞",
      title: "Call Us",
      lines: [settings.phone],
      href: `tel:${settings.phone}`,
    },
    {
      icon: "✉️",
      title: "Email Us",
      lines: [settings.email],
      href: `mailto:${settings.email}`,
    },
    { icon: "🕒", title: "Opening Hours", lines: [settings.hours] },
  ];
  return (
    <>
      <PageBanner
        title="Contact Us"
        subtitle="Book your appointment or reach out — we'd love to hear from you."
        image="https://images.unsplash.com/photo-1633681926022-84c23e8cb2d6?w=1600&q=80&auto=format&fit=crop"
        crumbs={[{ label: "Contact" }]}
      />

      {/* Contact info cards */}
      <section className="bg-cream py-16">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {contactCards.map((c, i) => (
              <Reveal key={c.title} delay={i * 90}>
                <div className="h-full rounded-3xl border border-gold-400/20 bg-white p-7 text-center shadow-lg shadow-pink-900/5">
                  <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-pink-50 to-gold-100 text-2xl">
                    {c.icon}
                  </div>
                  <h3 className="mt-4 font-serif text-lg font-bold text-ink">
                    {c.title}
                  </h3>
                  {c.lines.map((line) => (
                    <p key={line} className="mt-1 text-sm text-ink-muted/75">
                      {c.href ? (
                        <a href={c.href} className="hover:text-pink-600">
                          {line}
                        </a>
                      ) : (
                        line
                      )}
                    </p>
                  ))}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Booking form + side info */}
      <section id="booking" className="scroll-mt-24 bg-gradient-to-b from-cream to-pink-50/40 py-20">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <SectionHeading
            eyebrow="Online Booking"
            title={
              <>
                Reserve Your{" "}
                <span className="text-gold-gradient">Appointment</span>
              </>
            }
            subtitle="Fill in the form and our team will confirm your slot. Prefer chatting? Book instantly on WhatsApp."
          />

          <div className="mt-14 grid items-start gap-10 lg:grid-cols-5">
            <Reveal className="lg:col-span-3">
              <BookingForm />
            </Reveal>

            <Reveal delay={150} className="lg:col-span-2">
              <div className="rounded-[2rem] border border-gold-400/25 bg-ink p-8 text-cream shadow-xl">
                <h3 className="font-serif text-2xl font-bold text-gold-300">
                  Prefer to Talk?
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-cream/70">
                  Our friendly team is ready to help you choose the perfect
                  service and find a time that suits you.
                </p>
                <div className="mt-6 space-y-4">
                  <a
                    href={whatsappFrom(settings.whatsapp)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 rounded-full bg-[#25D366] px-6 py-3.5 text-sm font-semibold text-white transition-transform hover:scale-[1.02]"
                  >
                    💬 Book on WhatsApp
                  </a>
                  <a
                    href={`tel:${settings.phone}`}
                    className="flex items-center justify-center gap-2 rounded-full border border-gold-400/40 px-6 py-3.5 text-sm font-semibold text-gold-200 transition-colors hover:bg-gold-400/10"
                  >
                    📞 Call {settings.phone}
                  </a>
                </div>
                <div className="mt-8 border-t border-gold-400/15 pt-6">
                  <p className="text-sm font-semibold text-gold-300">
                    Opening Hours
                  </p>
                  <p className="mt-2 text-sm text-cream/70">{settings.hours}</p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Map */}
      <section className="bg-cream py-20">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <SectionHeading
            eyebrow="Find Us"
            title={
              <>
                Our <span className="text-gold-gradient">Location</span>
              </>
            }
            subtitle={`${settings.address}, ${settings.city}`}
          />
          <Reveal className="mt-12">
            <GoogleMap embed={settings.mapsEmbed} name={settings.name} />
          </Reveal>
        </div>
      </section>
    </>
  );
}
