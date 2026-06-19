import type { LucideIcon } from "lucide-react";

export function FeatureCard({
  icon: Icon,
  title,
  description,
}: {
  icon: LucideIcon;
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-3xl bg-white p-8 shadow-sm">
      <Icon className="mb-4 text-[#722F37]" size={40} />
      <h3 className="text-xl font-semibold text-gray-600">{title}</h3>
      <p className="mt-3 text-[#722F37]">{description}</p>
    </div>
  );
}

