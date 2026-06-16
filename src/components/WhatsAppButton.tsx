"use client";

import { useSettings, waLink } from "./SettingsProvider";
import { WhatsAppIcon } from "./SocialIcon";

export default function WhatsAppButton() {
  const settings = useSettings();
  return (
    <a
      href={waLink(settings.whatsapp)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Book on WhatsApp"
      className="group fixed bottom-6 right-6 z-50 flex items-center gap-3"
    >
      <span className="pointer-events-none hidden rounded-full bg-ink px-4 py-2 text-sm font-medium text-cream opacity-0 shadow-lg transition-opacity group-hover:opacity-100 sm:block">
        Book on WhatsApp
      </span>
      <span className="relative grid h-14 w-14 place-items-center rounded-full bg-[#25D366] text-white shadow-xl shadow-green-900/30 transition-transform hover:scale-110">
        <span className="absolute inset-0 animate-ping rounded-full bg-[#25D366] opacity-40" />
        <WhatsAppIcon className="relative h-7 w-7" />
      </span>
    </a>
  );
}
