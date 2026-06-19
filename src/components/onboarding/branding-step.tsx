"use client";

import { useState } from "react";

export type BrandingStepData = {
  primaryColor: string;
};

type Props = {
  onNext?: (color: string) => void;
};

export function BrandingStep({ onNext }: Props) {
  const [primaryColor, setPrimaryColor] = useState("#722F37");

  return (
    <section className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-black">Branding</h2>
        <p className="mt-1 text-sm text-black/60">Set a primary color and UI style for your workspace.</p>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <label className="space-y-2">
          <span className="text-sm font-bold text-black/100">School color</span>
          <p className="text-sm text-black/60">
            Click the color to choose your school color.
          </p>
          <input
            type="color"
            value={primaryColor}
            onChange={(e) => setPrimaryColor(e.target.value)}
            className="h-12 w-12 cursor-pointer rounded-xl border border-black/10 bg-white p-1"
          />
        </label>

        <div className="rounded-2xl border border-black/10 bg-white p-4">
          <div className="text-sm font-semibold text-black">Button preview</div>
          <div className="mt-3">
            <button
              type="button"
              onClick={() => onNext?.(primaryColor)}
              className="rounded-xl px-4 py-2.5 text-sm font-semibold text-white shadow-sm"
              style={{
                backgroundColor: primaryColor,
                boxShadow: `0 4px 6px ${primaryColor}33`,
              }}
            >
              Continue
            </button>
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-black/10 bg-black/[0.02] p-4 text-sm text-black/70">
        Your branding settings will be applied across the onboarding flow and admin UI.
      </div>
    </section>
  );
}

