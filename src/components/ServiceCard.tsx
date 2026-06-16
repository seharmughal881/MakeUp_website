import Image from "next/image";
import Link from "next/link";
import type { Service } from "@/lib/data";

export default function ServiceCard({ service }: { service: Service }) {
  const cardClass =
    "group relative flex flex-col overflow-hidden rounded-3xl border border-gold-400/20 bg-white shadow-lg shadow-pink-900/5 transition-all duration-500 hover:-translate-y-2 hover:border-gold-400/60 hover:shadow-2xl hover:shadow-pink-900/15";

  const inner = (
    <>
      <div className="relative h-56 overflow-hidden">
        <Image
          src={service.image}
          alt={service.title}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover transition-transform duration-700 group-hover:scale-110"
          unoptimized={service.image.startsWith("/uploads/")}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/10 to-transparent" />
        <span className="absolute left-4 top-4 grid h-11 w-11 place-items-center rounded-full bg-cream/95 text-xl shadow-md">
          {service.icon}
        </span>
        <span className="absolute bottom-4 right-4 rounded-full bg-gradient-to-r from-pink-500 to-pink-600 px-4 py-1.5 text-sm font-semibold text-white shadow-lg">
          {service.price}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <h3 className="font-serif text-xl font-bold text-ink transition-colors group-hover:text-pink-600">
          {service.title}
        </h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-muted/75">
          {service.short}
        </p>
        <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-gold-500">
          {service.href ? "Explore service" : "Available now"}
          <span className="transition-transform group-hover:translate-x-1">
            →
          </span>
        </span>
      </div>
    </>
  );

  if (service.href) {
    return (
      <Link href={service.href} className={cardClass}>
        {inner}
      </Link>
    );
  }

  return <div className={cardClass}>{inner}</div>;
}
