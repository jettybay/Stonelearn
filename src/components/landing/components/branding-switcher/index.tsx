"use client";

import { useState, type CSSProperties } from "react";

const themes = [
  { name: "Crimson", primary: "#722F37", bg: "#F7EDEE" },
  { name: "Indigo", primary: "#3730A3", bg: "#EEF2FF" },
  { name: "Emerald", primary: "#047857", bg: "#ECFDF5" },
];

interface BrandingSwitcherProps {
  onThemeChange?: (theme: (typeof themes)[number]) => void;
}

export function BrandingSwitcher({ onThemeChange }: BrandingSwitcherProps) {
  const [themeIndex, setThemeIndex] = useState(0);

  const handleThemeChange = (idx: number) => {
    setThemeIndex(idx);
    onThemeChange?.(themes[idx]);
  };

  return (
    <div className="flex items-center justify-center gap-3">
      <span className="text-sm font-medium text-gray-600">Brand</span>
      <div className="flex rounded-xl border bg-white p-1">
        {themes.map((t, idx) => (
          <button
            key={t.name}
            type="button"
            onClick={() => handleThemeChange(idx)}
            className={`px-3 py-1 text-sm font-semibold rounded-lg transition ${
              idx === themeIndex
                ? "bg-[var(--brand-primary)] text-white"
                : "text-gray-600 hover:bg-gray-50"
            }`}
            style={{
              "--brand-primary": t.primary,
            } as CSSProperties}
          >
            {t.name}
          </button>
        ))}
      </div>
    </div>
  );
}
