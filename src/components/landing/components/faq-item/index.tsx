"use client";

import { useId, useState } from "react";

export function FAQItem({
  question,
  answer,
  defaultOpen,
}: {
  question: string;
  answer: string;
  defaultOpen?: boolean;
}) {
  const id = useId();
  const [open, setOpen] = useState(!!defaultOpen);

  return (
    <div className="rounded-2xl border bg-white p-6">
      <button
        type="button"
        className="flex w-full items-start justify-between gap-4 text-left"
        aria-expanded={open}
        aria-controls={id}
        onClick={() => setOpen((v) => !v)}
      >
        <span className="font-semibold text-gray-900">{question}</span>
        <span className="mt-1 text-[#722F37]">{open ? "−" : "+"}</span>
      </button>
      <div
        id={id}
        className={"mt-4 text-gray-600 transition-all " + (open ? "block" : "hidden")}
      >
        {answer}
      </div>
    </div>
  );
}

