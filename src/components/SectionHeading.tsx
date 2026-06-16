import Reveal from "./Reveal";

type Props = {
  eyebrow?: string;
  title: React.ReactNode;
  subtitle?: string;
  center?: boolean;
  light?: boolean;
};

export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  center = true,
  light = false,
}: Props) {
  return (
    <Reveal
      className={`max-w-2xl ${center ? "mx-auto text-center" : "text-left"}`}
    >
      {eyebrow && (
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-pink-500">
          {eyebrow}
        </p>
      )}
      <h2
        className={`font-serif text-3xl font-bold leading-tight sm:text-4xl md:text-5xl ${
          light ? "text-cream" : "text-ink"
        }`}
      >
        {title}
      </h2>
      <div className={`gold-divider mt-5 ${center ? "mx-auto" : ""}`} />
      {subtitle && (
        <p
          className={`mt-5 text-base leading-relaxed ${
            light ? "text-cream/70" : "text-ink-muted/80"
          }`}
        >
          {subtitle}
        </p>
      )}
    </Reveal>
  );
}
