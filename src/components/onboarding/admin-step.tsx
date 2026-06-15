"use client";



export function AdminStep() {
  return (
    <section className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-black">Admin Account</h2>
        <p className="mt-1 text-sm text-black/60">Set up the first admin user for this workspace.</p>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <label className="space-y-2">
          <span className="text-sm font-medium text-black/80">Full name</span>
          <input
            className="w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-sm outline-none focus:border-[#722F37] focus:ring-2 focus:ring-[#722F37]/10"
            placeholder="e.g. Amina Yusuf"
          />
        </label>

        <label className="space-y-2">
          <span className="text-sm font-medium text-black/80">Email</span>
          <input
            type="email"
            className="w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-sm outline-none focus:border-[#722F37] focus:ring-2 focus:ring-[#722F37]/10"
            placeholder="admin@school.com"
          />
        </label>

        <label className="space-y-2 md:col-span-2">
          <span className="text-sm font-medium text-black/80">Temporary password</span>
          <input
            type="password"
            className="w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-sm outline-none focus:border-[#722F37] focus:ring-2 focus:ring-[#722F37]/10"
            placeholder="Create a password"
          />
        </label>
      </div>

      <div className="rounded-2xl border border-black/10 bg-black/[0.02] p-4 text-sm text-black/70">
        You can invite additional admins after the workspace is created.
      </div>
    </section>
  );
}

