"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

import type { AdminAccountData } from "./admin-step";

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
  onLaunch?: () => void;
};

export function ReviewStep({ onBack, data, onLaunch }: Props) {
  const schoolInfo = data?.schoolName?.trim() || "—";
  const subdomain = data?.subdomain?.trim() || "—";
  const branding = data?.brandingLabel?.trim() || "—";
  const logo = data?.logoLabel?.trim() || "—";
  const adminEmail = data?.admin?.email?.trim() || "—";

  return (
    <section className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-black">Review & Launch</h2>
        <p className="mt-1 text-sm text-black/60">Confirm your details before creating the workspace.</p>
      </div>

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
            <div className="mt-1 text-sm text-black/60">{subdomain}</div>
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

      <div className="flex items-center justify-end gap-3">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 rounded-xl border border-black/10 bg-white px-4 py-2.5 text-sm font-semibold text-black/80 hover:bg-black/[0.03]"
        >
          <ChevronLeft size={18} />
          Back
        </button>

        <button
          onClick={onLaunch}
          className="inline-flex items-center gap-2 rounded-xl bg-[#722F37] px-4 py-2.5 text-sm font-semibold text-white shadow-sm shadow-[#722F37]/20 hover:bg-[#722F37]/90"
        >
          Launch School
          <ChevronRight size={18} />
        </button>
      </div>
    </section>
  );
}




