export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 py-28">

        <div className="grid gap-12 lg:grid-cols-2 items-center">

          <div>
            <span className="rounded-full bg-[#F7EDEE] px-4 py-2 text-sm font-medium text-[#722F37]">
              Multi-Tenant LMS Platform
            </span>

            <h1 className="mt-6 text-5xl font-bold leading-tight lg:text-7xl">
              Empower Schools With Modern Digital Learning
            </h1>

            <p className="mt-6 text-lg text-gray-600">
              Launch a fully branded LMS for your institution.
              Manage students, teachers, courses, quizzes,
              certificates and analytics from one platform.
            </p>

            <div className="mt-8 flex gap-4">
              <button className="rounded-xl bg-[#722F37] px-8 py-4 text-white">
                Start Free Trial
              </button>

              <button className="rounded-xl border px-8 py-4">
                Book Demo
              </button>
            </div>
          </div>

          <div>
            <div className="rounded-3xl border bg-white p-4 shadow-2xl">
              <img
                src="/dashboard-preview.png"
                alt="Dashboard Preview"
                className="rounded-2xl"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}