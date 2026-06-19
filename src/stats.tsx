const stats = [
  {
    value: "100+",
    label: "Schools"
  },
  {
    value: "50,000+",
    label: "Students"
  },
  {
    value: "5,000+",
    label: "Courses"
  },
  {
    value: "99.9%",
    label: "Uptime"
  }
];

export function Stats() {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-7xl px-6">

        <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">

          {stats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-2xl border p-8 text-center"
            >
              <h3 className="text-4xl font-bold text-[#722F37]">
                {stat.value}
              </h3>

              <p className="mt-2 text-black">
                {stat.label}
              </p>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
}