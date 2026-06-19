"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

type Props = {
  onBack?: () => void;
  onNext?: () => void;
};

import { useMemo, useState } from "react";

export function SubdomainStep({ onBack, onNext }: Props) {
  const [subdomain, setSubdomain] = useState("");

  const preview = useMemo(() => {
    const v = subdomain.trim();
    return v ? `https://${v}.stonelearn.app` : "https://your-school.stonelearn.app";
  }, [subdomain]);

  return (
    <section className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-black">Subdomain</h2>
        <p className="mt-1 text-sm text-black/60">
          Choose a subdomain for your school workspace.
        </p>
      </div>

      <label className="space-y-2">
        <span className="text-sm font-medium text-black/80">Your subdomain</span>

        <div className="flex items-center gap-3 rounded-xl border border-black/10 bg-white px-4 py-3">
          <span className="text-sm font-semibold text-black/70">https://</span>

          <input
            value={subdomain}
            onChange={(e) => {
              const next = e.target.value;
              // Allow only: letters, numbers, hyphens.
              // Keep it permissive (don’t block paste mid-edit).
              const cleaned = next.replace(/[^a-zA-Z0-9-]/g, "");
              setSubdomain(cleaned);
            }}
            inputMode="text"
            autoComplete="off"
            spellCheck={false}
            placeholder="your-school"
            className="flex-1 rounded-lg bg-[#722F37]/10 px-3 py-2 text-sm text-black outline-none placeholder:text-black/60 focus:ring-2 focus:ring-[#722F37]/20"
          />

          <span className="text-sm font-semibold text-black/70">.stonelearn.app</span>
        </div>

        <div className="text-sm text-black/70">
          Only letters, numbers, and hyphens are recommended.
        </div>
      </label>

      <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
        <div className="rounded-2xl border border-black/10 bg-white p-4">
          <div className="text-sm font-semibold text-black">What you get</div>
          <ul className="mt-2 list-disc pl-5 text-sm text-black/60">
            <li>Custom URL</li>
            <li>School-specific admin area</li>
          </ul>
        </div>

        <div className="rounded-2xl border border-black/10 bg-[#722F37]/5 p-4">
          <div className="text-sm font-semibold text-black">Preview</div>
          <div className="mt-2 truncate text-sm text-black/70">{preview}</div>
        </div>
      </div>

      <div className="flex justify-between gap-3 pt-2">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 rounded-2xl border px-5 py-3 font-semibold text-black"
        >
          <ChevronLeft size={18} />
          Back
        </button>

        <button
          onClick={() => onNext?.()}
          className="inline-flex items-center gap-2 rounded-2xl bg-[#722F37] px-6 py-3 font-semibold text-white"
        >
          Continue
          <ChevronRight size={18} />
        </button>
      </div>
    </section>
  );
}



