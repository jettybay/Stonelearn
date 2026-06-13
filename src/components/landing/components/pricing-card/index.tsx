export function PricingCard({
  name,
  price,
  description,
  features,
  highlighted,
  cta,
}: {
  name: string;
  price: string;
  description: string;
  features: string[];
  highlighted?: boolean;
  cta: string;
}) {
  return (
    <div
      className={
        "rounded-[32px] border bg-white p-8 shadow-sm " +
        (highlighted ? "border-[#722F37] ring-1 ring-[#722F37]/20" : "")
      }
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-xl font-bold">{name}</h3>
          <p className="mt-2 text-gray-600">{description}</p>
        </div>
        {highlighted ? (
          <span className="rounded-full bg-[#722F37] px-3 py-1 text-xs font-semibold text-white">
            Popular
          </span>
        ) : null}
      </div>

      <div className="mt-6">
        <div className="flex items-end gap-2">
          <span className="text-4xl font-bold text-[#722F37]">{price}</span>
          <span className="pb-1 text-sm text-gray-500">/ month</span>
        </div>
      </div>

      <ul className="mt-6 space-y-3">
        {features.map((f) => (
          <li key={f} className="flex items-start gap-3 text-gray-700">
            <span className="mt-1 h-2 w-2 rounded-full bg-[#722F37]" />
            <span>{f}</span>
          </li>
        ))}
      </ul>

      <button
        className={
          "mt-8 w-full rounded-xl px-5 py-3 text-center font-semibold transition " +
          (highlighted
            ? "bg-[#722F37] text-white hover:opacity-90"
            : "border bg-white text-[#722F37] hover:bg-gray-50")
        }
      >
        {cta}
      </button>
    </div>
  );
}

