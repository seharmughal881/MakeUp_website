"use client";

import Image from "next/image";
import { useState } from "react";
import type { GalleryItem } from "@/lib/data";

export default function BeforeAfter({ item }: { item: GalleryItem }) {
  const [pos, setPos] = useState(50);

  return (
    <div className="group overflow-hidden rounded-3xl border border-gold-400/20 bg-white shadow-lg">
      <div className="relative aspect-[4/3] select-none">
        {/* After (base) */}
        <Image
          src={item.after}
          alt={`${item.title} after`}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover"
          unoptimized={item.after.startsWith("/uploads/")}
        />
        {/* Before (clipped overlay) */}
        <div
          className="absolute inset-0 overflow-hidden"
          style={{ width: `${pos}%` }}
        >
          <Image
            src={item.before}
            alt={`${item.title} before`}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
            style={{ width: "100%", maxWidth: "none" }}
            unoptimized={item.before.startsWith("/uploads/")}
          />
          <span className="absolute left-3 top-3 rounded-full bg-ink/80 px-3 py-1 text-xs font-semibold text-cream">
            Before
          </span>
        </div>
        <span className="absolute right-3 top-3 rounded-full bg-pink-600/90 px-3 py-1 text-xs font-semibold text-white">
          After
        </span>

        {/* Slider handle line */}
        <div
          className="pointer-events-none absolute inset-y-0 w-0.5 bg-gold-300"
          style={{ left: `${pos}%` }}
        >
          <span className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 grid h-9 w-9 place-items-center rounded-full bg-gold-400 text-ink shadow-lg">
            ⇆
          </span>
        </div>

        <input
          type="range"
          min={0}
          max={100}
          value={pos}
          onChange={(e) => setPos(Number(e.target.value))}
          aria-label={`Reveal before and after for ${item.title}`}
          className="absolute inset-0 h-full w-full cursor-ew-resize opacity-0"
        />
      </div>
      <div className="flex items-center justify-between p-5">
        <h3 className="font-serif text-lg font-semibold text-ink">
          {item.title}
        </h3>
        <span className="rounded-full bg-pink-50 px-3 py-1 text-xs font-medium text-pink-600">
          {item.category}
        </span>
      </div>
    </div>
  );
}
