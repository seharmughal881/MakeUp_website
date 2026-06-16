"use client";

import { createContext, useContext } from "react";
import type { SiteSettings } from "@/lib/siteContent";

const SettingsContext = createContext<SiteSettings | null>(null);

export function SettingsProvider({
  settings,
  children,
}: {
  settings: SiteSettings;
  children: React.ReactNode;
}) {
  return (
    <SettingsContext.Provider value={settings}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings(): SiteSettings {
  const ctx = useContext(SettingsContext);
  if (!ctx) throw new Error("useSettings must be used within SettingsProvider");
  return ctx;
}

/** WhatsApp deep-link helper (client-side). */
export function waLink(whatsapp: string, message?: string): string {
  const text = encodeURIComponent(
    message ??
      "Hello! I would like to book an appointment. Please share availability."
  );
  return `https://wa.me/${whatsapp}?text=${text}`;
}
