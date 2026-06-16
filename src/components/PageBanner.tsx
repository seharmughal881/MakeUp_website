import Image from "next/image";
import Link from "next/link";

type Crumb = { label: string; href?: string };

type Props = {
  title: string;
  subtitle?: string;
  image: string;
  crumbs?: Crumb[];
};

export default function PageBanner({
  title,
  subtitle,
  image,
  crumbs = [],
}: Props) {
  return (
    <section className="relative overflow-hidden bg-ink">
      <div className="absolute inset-0">
        <Image
          src={image}
          alt={title}
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-35"
          unoptimized={image.startsWith("/uploads/")}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/80 via-ink/70 to-ink/95" />
      </div>
      <div className="pointer-events-none absolute -right-10 top-0 h-72 w-72 rounded-full bg-pink-500/20 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-5 py-20 text-center md:py-28 lg:px-8">
        <h1 className="font-serif text-4xl font-bold text-cream sm:text-5xl md:text-6xl">
          {title}
        </h1>
        <div className="gold-divider mx-auto mt-5" />
        {subtitle && (
          <p className="mx-auto mt-5 max-w-2xl text-base text-cream/75 sm:text-lg">
            {subtitle}
          </p>
        )}

        <nav className="mt-7 flex items-center justify-center gap-2 text-sm text-cream/60">
          <Link href="/" className="hover:text-gold-300">
            Home
          </Link>
          {crumbs.map((c) => (
            <span key={c.label} className="flex items-center gap-2">
              <span className="text-gold-400">/</span>
              {c.href ? (
                <Link href={c.href} className="hover:text-gold-300">
                  {c.label}
                </Link>
              ) : (
                <span className="text-gold-300">{c.label}</span>
              )}
            </span>
          ))}
        </nav>
      </div>
    </section>
  );
}
