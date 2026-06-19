"use client";

import { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Upload,
  Image as ImageIcon,
} from "lucide-react";

type Props = {
  onBack?: () => void;
  onNext?: (logoFile: File | null) => void;
};

export function LogoStep({ onBack, onNext }: Props) {
  const [logo, setLogo] = useState<File | null>(null);

  const [preview, setPreview] = useState<string | null>(null);

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0] ?? null;

    setLogo(file);

    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  return (
<div className="rounded-[32px] border border-[#5E252C]/20 bg-white p-8 shadow-sm lg:p-10">
      <div>
        <span className="text-sm font-semibold text-[#722F37]">
          Step 4 of 6
        </span>

        <h1 className="mt-2 text-3xl font-bold text-slate-900">
          Upload School Logo
        </h1>

<p className="mt-3 text-[#1A1A1A]/80">
          Add your school logo to personalize your Stonelearn workspace.
        </p>
      </div>

      <div className="mt-10">
        <label
          htmlFor="logo-upload"
          className="flex min-h-[240px] cursor-pointer flex-col items-center justify-center rounded-3xl border-2 border-dashed border-slate-300 bg-slate-50 p-6 transition hover:border-[#722F37]"
        >
          {preview ? (
            <img
              src={preview}
              alt="Logo Preview"
              className="max-h-32 object-contain"
            />
          ) : (
            <>
              <Upload size={40} className="text-slate-400" />

              <p className="mt-4 font-medium">Upload School Logo</p>

<p className="mt-2 text-sm text-black/70">
                PNG, JPG or SVG
              </p>
            </>
          )}
        </label>

        <input
          id="logo-upload"
          type="file"
          accept=".png,.jpg,.jpeg,.svg"
          className="hidden"
          onChange={handleFileChange}
        />
      </div>

      <div className="mt-8 rounded-2xl border bg-slate-50 p-5">
        <div className="flex items-center gap-3">
          <ImageIcon size={18} className="text-[#722F37]" />
          <p className="font-medium">Logo Guidelines</p>
        </div>

<ul className="mt-3 space-y-2 text-sm text-black/80">
          <li>• Square logos work best</li>
          <li>• Transparent PNG recommended</li>
          <li>• Maximum size: 5MB</li>
          <li>• SVG supported</li>
        </ul>
      </div>

      <div className="mt-10 flex justify-between">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 rounded-2xl border px-5 py-3 font-semibold"
        >
          <ChevronLeft size={18} />
          Back
        </button>

        <button
          onClick={() => onNext?.(logo)}
          className="inline-flex items-center gap-2 rounded-2xl bg-[#722F37] px-6 py-3 font-semibold text-white"
        >
          Continue
          <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
}


