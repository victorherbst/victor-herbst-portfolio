type TechnicalItem = readonly [label: string, value: string];

export default function TechnicalSignature({
  label,
  items,
  tone = "light",
  className = "",
}: {
  label: string;
  items: readonly TechnicalItem[];
  tone?: "light" | "dark";
  className?: string;
}) {
  return (
    <aside className={`technical-signature technical-signature-${tone} ${className}`.trim()} aria-label={label}>
      <strong>{label}</strong>
      <dl>
        {items.map(([term, value]) => (
          <div key={term}>
            <dt>{term}</dt>
            <dd>{value}</dd>
          </div>
        ))}
      </dl>
    </aside>
  );
}
