type VictorMonogramProps = {
  className?: string;
};

export default function VictorMonogram({
  className = "",
}: VictorMonogramProps) {
  return (
    <span className={`victor-monogram ${className}`.trim()} aria-hidden="true">
      <span className="victor-monogram-v">V</span>
      <span className="victor-monogram-h">H</span>
      <span className="victor-monogram-star" />
    </span>
  );
}
