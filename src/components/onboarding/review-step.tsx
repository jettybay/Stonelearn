"use client";



export function ReviewStep() {
  return (
    <section className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-black">Review</h2>
        <p className="mt-1 text-sm text-black/60">Confirm your details before creating the workspace.</p>
      </div>

      <div className="space-y-3 rounded-2xl border border-black/10 bg-white p-4">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="text-sm font-semibold text-black">School Information</div>
            <div className="mt-1 text-sm text-black/60">Green Valley Academy</div>
          </div>
          <div className="text-xs font-semibold text-black/50">✓</div>
        </div>

        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="text-sm font-semibold text-black">Subdomain</div>
            <div className="mt-1 text-sm text-black/60">your-school.stonelearn.app</div>
          </div>
          <div className="text-xs font-semibold text-black/50">✓</div>
        </div>

        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="text-sm font-semibold text-black">Branding</div>
            <div className="mt-1 text-sm text-black/60">Primary color: #722F37</div>
          </div>
          <div className="text-xs font-semibold text-black/50">✓</div>
        </div>

        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="text-sm font-semibold text-black">Admin</div>
            <div className="mt-1 text-sm text-black/60">admin@school.com</div>
          </div>
          <div className="text-xs font-semibold text-black/50">✓</div>
        </div>
      </div>

      <div className="flex items-center justify-end gap-3">
        <button className="rounded-xl border border-black/10 bg-white px-4 py-2.5 text-sm font-semibold text-black/80 hover:bg-black/[0.03]">
          Back
        </button>
        <button className="rounded-xl bg-[#722F37] px-4 py-2.5 text-sm font-semibold text-white shadow-sm shadow-[#722F37]/20 hover:bg-[#722F37]/90">
          Create workspace
        </button>
      </div>
    </section>
  );
}

