"use client";

import Link from "next/link";
import { NAV_LINKS } from "@/lib/data";
import { useSettings, waLink } from "./SettingsProvider";
import { SOCIAL_ICONS, WhatsAppIcon } from "./SocialIcon";

const SOCIAL_ORDER: { key: keyof typeof SOCIAL_ICONS; label: string }[] = [
  { key: "instagram", label: "Instagram" },
  { key: "facebook", label: "Facebook" },
  { key: "tiktok", label: "TikTok" },
  { key: "youtube", label: "YouTube" },
];

export default function Footer() {
  const settings = useSettings();
  const [firstWord, ...restWords] = settings.name.split(" ");

  return (
    <footer className="bg-ink text-cream">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-16 lg:grid-cols-4 lg:px-8">
        {/* Brand */}
        <div className="lg:col-span-1">
          <div className="flex items-center gap-2">
            <span className="grid h-10 w-10 place-items-center rounded-full border border-gold-400/60 text-lg">
              🌸
            </span>
            <span className="font-serif text-2xl font-bold">
              {firstWord}{" "}
              <span className="text-gold-gradient">{restWords.join(" ")}</span>
            </span>
          </div>
          <p className="mt-4 text-sm leading-relaxed text-cream/70">
            {settings.tagline}. A luxury beauty destination for bridal makeup,
            hair styling, facials and premium beauty care.
          </p>
          <div className="mt-5 flex gap-3">
            {SOCIAL_ORDER.map(({ key, label }) => {
              const href = settings.social[key];
              if (!href) return null;
              const Icon = SOCIAL_ICONS[key];
              return (
                <a
                  key={key}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="grid h-10 w-10 place-items-center rounded-full border border-gold-400/30 text-gold-300 transition-all hover:scale-110 hover:border-gold-400 hover:bg-gold-400/10"
                >
                  <Icon className="h-5 w-5" />
                </a>
              );
            })}
          </div>
        </div>

        {/* Quick links */}
        <div>
          <h3 className="font-serif text-lg font-semibold text-gold-300">
            Quick Links
          </h3>
          <ul className="mt-4 grid grid-cols-2 gap-2 text-sm">
            {NAV_LINKS.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="text-cream/70 transition-colors hover:text-gold-200"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="font-serif text-lg font-semibold text-gold-300">
            Get In Touch
          </h3>
          <ul className="mt-4 space-y-3 text-sm text-cream/70">
            <li className="flex gap-2">
              <span>📍</span>
              <span>
                {settings.address}
                <br />
                {settings.city}
              </span>
            </li>
            <li className="flex gap-2">
              <span>📞</span>
              <a href={`tel:${settings.phone}`} className="hover:text-gold-200">
                {settings.phone}
              </a>
            </li>
            <li className="flex gap-2">
              <span>✉️</span>
              <a
                href={`mailto:${settings.email}`}
                className="hover:text-gold-200"
              >
                {settings.email}
              </a>
            </li>
            <li className="flex gap-2">
              <span>🕒</span>
              <span>{settings.hours}</span>
            </li>
          </ul>
        </div>

        {/* CTA */}
        <div>
          <h3 className="font-serif text-lg font-semibold text-gold-300">
            Book Your Glow
          </h3>
          <p className="mt-4 text-sm text-cream/70">
            Ready to look your best? Reserve your appointment in seconds.
          </p>
          <Link
            href="/contact#booking"
            className="mt-4 inline-block rounded-full bg-gradient-to-r from-pink-500 to-pink-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-pink-600/30 transition-transform hover:scale-105"
          >
            Book Appointment
          </Link>
          <a
            href={waLink(settings.whatsapp)}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 flex w-fit items-center gap-2 rounded-full border border-green-500/50 px-6 py-3 text-sm font-semibold text-green-300 transition-colors hover:bg-green-500/10"
          >
            <WhatsAppIcon className="h-4 w-4" /> WhatsApp Us
          </a>
        </div>
      </div>

      <div className="border-t border-gold-400/15">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-5 py-6 text-center text-xs text-cream/50 sm:flex-row lg:px-8">
          <p>
            © {new Date().getFullYear()} {settings.name}. All rights reserved.
          </p>
          <p>Crafted with 💗 for timeless beauty.</p>
        </div>
      </div>
    </footer>
  );
}
