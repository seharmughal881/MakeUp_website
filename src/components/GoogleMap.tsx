export default function GoogleMap({
  embed,
  name,
}: {
  embed: string;
  name: string;
}) {
  return (
    <div className="overflow-hidden rounded-3xl border border-gold-400/25 shadow-xl">
      <iframe
        title={`${name} location on Google Maps`}
        src={embed}
        width="100%"
        height="420"
        style={{ border: 0 }}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        allowFullScreen
      />
    </div>
  );
}
