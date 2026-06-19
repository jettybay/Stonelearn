"use client";

import { ChevronLeft, Rocket, AlertCircle, Loader } from "lucide-react";
import type { AdminAccountData } from "./admin-step";
import { useState } from "react";

export type ReviewStepData = {
  schoolName: string;
  subdomain: string;
  brandingLabel: string;
  logoLabel: string;
  admin: Pick<AdminAccountData, "email">;
};

type Props = {
  onBack?: () => void;
  data?: Partial<ReviewStepData>;
  onLaunch?: () => Promise<void>;
};

export function ReviewStep({ onBack, data, onLaunch }: Props) {
  const [isLaunching, setIsLaunching] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const schoolInfo = data?.schoolName?.trim() || "—";
  const subdomain = data?.subdomain?.trim() || "—";
  const branding = data?.brandingLabel?.trim() || "—";
  const logo = data?.logoLabel?.trim() || "—";
  const adminEmail = data?.admin?.email?.trim() || "—";

  // Check if all data is present
  const isComplete = schoolInfo !== "—" && subdomain !== "—" && adminEmail !== "—";

  const handleLaunch = async () => {
    setError(null);
    setIsLaunching(true);

    try {
      await onLaunch?.();
    } catch (err) {
      setError(String(err) || "Failed to launch school");
      setIsLaunching(false);
    }
  };

  return (
    <section className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-black">Review & Launch</h2>
        <p className="mt-1 text-sm text-black/60">Confirm your details before creating the workspace.</p>
      </div>

      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 p-4 flex gap-3">
          <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-medium text-red-900">Launch Error</p>
            <p className="text-sm text-red-700 mt-1">{error}</p>
          </div>
        </div>
      )}

      <div className="space-y-3 rounded-2xl border border-black/10 bg-white p-4">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="text-sm font-semibold text-black">✓ School Information</div>
            <div className="mt-1 text-sm text-black/60">{schoolInfo}</div>
          </div>
        </div>

        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="text-sm font-semibold text-black">✓ Subdomain</div>
            <div className="mt-1 text-sm text-black/60">
              https://{subdomain}.stonelearn.app
            </div>
          </div>
        </div>

        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="text-sm font-semibold text-black">✓ Branding</div>
            <div className="mt-1 text-sm text-black/60">{branding}</div>
          </div>
        </div>

        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="text-sm font-semibold text-black">✓ Logo</div>
            <div className="mt-1 text-sm text-black/60">{logo}</div>
          </div>
        </div>

        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="text-sm font-semibold text-black">✓ Admin</div>
            <div className="mt-1 text-sm text-black/60">{adminEmail}</div>
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-blue-200 bg-blue-50 p-4">
        <p className="text-sm text-blue-900">
          ✨ <strong>Ready to go!</strong> Click "Launch School" to activate your workspace and start using Stonelearn.
        </p>
      </div>

      <div className="flex items-center justify-between gap-3 pt-2">
        <button
          onClick={onBack}
          disabled={isLaunching}
          className="inline-flex items-center gap-2 rounded-2xl border px-5 py-3 font-semibold text-black disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ChevronLeft size={18} />
          Back
        </button>

        <button
          onClick={handleLaunch}
          disabled={!isComplete || isLaunching}
          className="inline-flex items-center gap-2 rounded-2xl bg-[#722F37] px-6 py-3 font-semibold text-white hover:bg-[#722F37]/90 disabled:bg-slate-400 disabled:cursor-not-allowed transition"
        >
          {isLaunching ? (
            <>
              <Loader size={18} className="animate-spin" />
              Launching...
            </>
          ) : (
            <>
              <Rocket size={18} />
              Launch School
            </>
          )}
        </button>
      </div>
    </section>
  );
}




