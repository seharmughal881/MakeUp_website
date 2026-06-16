"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { NAV_LINKS } from "@/lib/data";
import { useSettings } from "./SettingsProvider";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const settings = useSettings();
  const [firstWord, ...restWords] = settings.name.split(" ");
  const rest = restWords.join(" ");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll while the mobile menu is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-ink/95 shadow-lg shadow-black/30 backdrop-blur"
          : "bg-ink/80 backdrop-blur-sm"
      }`}
    >
      <nav className="mx-auto flex max-w-[1536px] items-center justify-between gap-2 px-4 py-3 sm:px-6 sm:py-4">
        {/* Logo */}
        <Link href="/" className="group flex shrink-0 items-center gap-2">
          <span className="grid h-9 w-9 place-items-center rounded-full border border-gold-400/60 text-base sm:h-10 sm:w-10 sm:text-lg">
            🌸
          </span>
          <span className="font-serif text-lg font-bold leading-none text-cream sm:text-xl 2xl:text-2xl">
            {firstWord} <span className="text-gold-gradient">{rest}</span>
          </span>
        </Link>

        {/* Desktop links */}
        <ul className="hidden min-w-0 items-center gap-0 xl:flex 2xl:gap-1">
          {NAV_LINKS.map((link) => {
            const active = pathname === link.href;
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`relative whitespace-nowrap rounded-full px-2 py-2 text-[13px] font-medium transition-colors 2xl:px-3 2xl:text-sm ${
                    active ? "text-gold-300" : "text-cream/80 hover:text-gold-200"
                  }`}
                >
                  {link.label}
                  {active && (
                    <span className="absolute inset-x-3 -bottom-0.5 h-px bg-gold-400" />
                  )}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Desktop CTA */}
        <Link
          href="/contact#booking"
          className="ml-1 hidden shrink-0 whitespace-nowrap rounded-full bg-gradient-to-r from-pink-500 to-pink-600 px-4 py-2.5 text-[13px] font-semibold text-white shadow-lg shadow-pink-600/30 transition-transform hover:scale-105 xl:inline-block 2xl:px-5 2xl:text-sm"
        >
          Book Now
        </Link>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
          aria-expanded={open}
          className="flex h-10 w-10 shrink-0 flex-col items-center justify-center gap-1.5 xl:hidden"
        >
          <span
            className={`h-0.5 w-6 bg-gold-300 transition-all ${
              open ? "translate-y-2 rotate-45" : ""
            }`}
          />
          <span
            className={`h-0.5 w-6 bg-gold-300 transition-all ${
              open ? "opacity-0" : ""
            }`}
          />
          <span
            className={`h-0.5 w-6 bg-gold-300 transition-all ${
              open ? "-translate-y-2 -rotate-45" : ""
            }`}
          />
        </button>
      </nav>

      {/* Mobile menu */}
      <div
        className={`overflow-hidden border-gold-400/20 bg-ink/98 backdrop-blur transition-[max-height] duration-500 xl:hidden ${
          open ? "max-h-[calc(100vh-4rem)] border-t" : "max-h-0"
        }`}
      >
        <ul
          onClick={() => setOpen(false)}
          className="flex max-h-[calc(100vh-4rem)] flex-col gap-1 overflow-y-auto px-4 py-4 sm:px-5"
        >
          {NAV_LINKS.map((link) => {
            const active = pathname === link.href;
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`block rounded-lg px-4 py-3 text-base font-medium transition-colors ${
                    active
                      ? "bg-gold-400/10 text-gold-300"
                      : "text-cream/85 hover:bg-white/5 hover:text-gold-200"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
          <li className="mt-2">
            <Link
              href="/contact#booking"
              className="block rounded-full bg-gradient-to-r from-pink-500 to-pink-600 px-5 py-3 text-center text-base font-semibold text-white"
            >
              Book Appointment
            </Link>
          </li>
          <li className="mt-1 pb-1 text-center text-sm text-cream/60">
            Call us: {settings.phone}
          </li>
        </ul>
      </div>
    </header>
  );
}
