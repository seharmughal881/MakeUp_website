"use client";

import Image from "next/image";
import { useState } from "react";
import { TESTIMONIALS, type Testimonial } from "@/lib/data";

export default function Testimonials({
  items = TESTIMONIALS,
}: {
  items?: Testimonial[];
}) {
  const [active, setActive] = useState(0);
  if (items.length === 0) return null;
  const t = items[Math.min(active, items.length - 1)];

  return (
    <div className="mx-auto mt-12 max-w-3xl">
      <div className="relative rounded-[2rem] border border-gold-400/25 bg-white p-8 shadow-xl shadow-pink-900/5 sm:p-12">
        <span className="absolute -top-6 left-8 font-serif text-7xl leading-none text-pink-200">
          “
        </span>
        <p className="relative mt-4 text-center text-lg font-light leading-relaxed text-ink-muted sm:text-xl">
          {t.text}
        </p>

        <div className="mt-6 flex items-center justify-center gap-1 text-gold-400">
          {Array.from({ length: t.rating }).map((_, i) => (
            <span key={i}>★</span>
          ))}
        </div>

        <div className="mt-6 flex items-center justify-center gap-4">
          <div className="relative h-14 w-14 overflow-hidden rounded-full border-2 border-gold-400/50">
            <Image
              src={t.image}
              alt={t.name}
              fill
              sizes="56px"
              className="object-cover"
              unoptimized={t.image.startsWith("/uploads/")}
            />
          </div>
          <div className="text-left">
            <p className="font-serif text-lg font-semibold text-ink">{t.name}</p>
            <p className="text-sm text-pink-500">{t.role}</p>
          </div>
        </div>
      </div>

      {/* Dots */}
      <div className="mt-8 flex justify-center gap-3">
        {items.map((item, i) => (
          <button
            key={item.name}
            onClick={() => setActive(i)}
            aria-label={`Show review from ${item.name}`}
            className={`h-2.5 rounded-full transition-all ${
              i === active
                ? "w-8 bg-gradient-to-r from-pink-500 to-gold-400"
                : "w-2.5 bg-gold-400/30 hover:bg-gold-400/60"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
