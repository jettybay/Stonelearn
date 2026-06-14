import type { ReactNode } from "react";

export function SectionHeader({
  kicker,
  title,
  description,
}: {
  kicker?: string;
  title: string;
  description?: ReactNode;
}) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      {kicker ? (
        <p className="text-base font-semibold leading-7 text-[#722F37]">
          {kicker}
        </p>
      ) : null}
      <h2 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
        {title}
      </h2>
      {description ? (
        <div className="mt-4 text-lg leading-8 text-gray-600">{description}</div>
      ) : null}
    </div>
  );
}

