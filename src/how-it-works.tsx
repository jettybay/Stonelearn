const steps = [
  "Create Your School",
  "Choose Branding",
  "Launch Your LMS"
];

export function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="py-24"
    >
      <div className="mx-auto max-w-7xl px-6">

        <h2 className="text-center text-4xl font-bold">
          How It Works
        </h2>

        <div className="mt-16 grid gap-8 md:grid-cols-3">

          {steps.map((step, index) => (
            <div
              key={step}
              className="rounded-3xl border p-8 text-center"
            >
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#722F37] text-white">
                {index + 1}
              </div>

              <h3 className="mt-6 text-xl font-semibold">
                {step}
              </h3>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
}