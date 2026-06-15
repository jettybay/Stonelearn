"use client";



export function SchoolInformationStep() {
  return (
    <section className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-black">School Information</h2>
        <p className="mt-1 text-sm text-black/60">
          Provide the basic details about your institution.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <label className="space-y-2">
          <span className="text-sm font-medium text-black/80">School name</span>
          <input
            className="w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-sm outline-none focus:border-[#722F37] focus:ring-2 focus:ring-[#722F37]/10"
            placeholder="e.g. Green Valley Academy"
          />
        </label>

        <label className="space-y-2">
          <span className="text-sm font-medium text-black/80">Country</span>
          <input
            className="w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-sm outline-none focus:border-[#722F37] focus:ring-2 focus:ring-[#722F37]/10"
            placeholder="e.g. United States"
          />
        </label>

        <label className="space-y-2 md:col-span-2">
          <span className="text-sm font-medium text-black/80">Address</span>
          <input
            className="w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-sm outline-none focus:border-[#722F37] focus:ring-2 focus:ring-[#722F37]/10"
            placeholder="Street, city, region"
          />
        </label>
      </div>

      <div className="rounded-2xl border border-black/10 bg-black/[0.02] p-4 text-sm text-black/70">
        Tip: You can update this information later in the admin dashboard.
      </div>
    </section>
  );
}

