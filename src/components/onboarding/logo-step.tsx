"use client";



export function LogoStep() {
  return (
    <section className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-black">Logo</h2>
        <p className="mt-1 text-sm text-black/60">Upload a logo that will appear in your workspace.</p>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="rounded-2xl border border-black/10 bg-white p-4">
          <div className="text-sm font-semibold text-black">Upload</div>
          <div className="mt-3 flex items-center justify-center rounded-xl border border-dashed border-black/20 bg-black/[0.02] p-8">
            <div className="text-center">
              <div className="text-sm font-semibold text-[#722F37]">Drop file here</div>
              <div className="mt-1 text-xs text-black/50">SVG, PNG recommended</div>
            </div>
          </div>
          <div className="mt-3 text-xs text-black/50">Logo size: 256×256 or higher.</div>
        </div>

        <div className="rounded-2xl border border-black/10 bg-white p-4">
          <div className="text-sm font-semibold text-black">Preview</div>
          <div className="mt-4 flex items-center gap-3">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#722F37]/10">
              <div className="h-5 w-5 rounded bg-[#722F37]" />
            </div>
            <div>
              <div className="text-sm font-semibold text-black">School logo</div>
              <div className="text-xs text-black/50">Shown in sidebar & header</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

