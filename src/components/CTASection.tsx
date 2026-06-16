import Link from "next/link";
import Reveal from "./Reveal";
import { getSettings, whatsappFrom } from "@/lib/content";

export default async function CTASection({
  title = "Ready to Look & Feel Your Best?",
  subtitle = "Book your appointment today and let our experts pamper you with a luxury beauty experience.",
}: {
  title?: string;
  subtitle?: string;
}) {
  const settings = await getSettings();
  return (
    <section className="bg-ink py-20">
      <Reveal className="mx-auto max-w-4xl px-5 text-center lg:px-8">
        <div className="relative overflow-hidden rounded-[2.5rem] border border-gold-400/30 bg-gradient-to-br from-ink-soft to-ink-muted px-6 py-14 shadow-2xl sm:px-12">
          <div className="pointer-events-none absolute -left-10 -top-10 h-48 w-48 rounded-full bg-pink-500/20 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-10 -right-10 h-48 w-48 rounded-full bg-gold-400/20 blur-3xl" />
          <h2 className="relative font-serif text-3xl font-bold text-cream sm:text-4xl">
            {title}
          </h2>
          <p className="relative mx-auto mt-4 max-w-xl text-cream/70">
            {subtitle}
          </p>
          <div className="relative mt-8 flex flex-wrap justify-center gap-4">
            <Link
              href="/contact#booking"
              className="rounded-full bg-gradient-to-r from-pink-500 to-pink-600 px-8 py-3.5 text-sm font-semibold text-white shadow-xl shadow-pink-600/30 transition-transform hover:scale-105"
            >
              Book Appointment
            </Link>
            <a
              href={whatsappFrom(settings.whatsapp)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-full border border-gold-400/50 px-8 py-3.5 text-sm font-semibold text-gold-200 transition-colors hover:bg-gold-400/10"
            >
              💬 WhatsApp Us
            </a>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
