"use client";

import {
  Palette,
  GraduationCap,
  ChartNoAxesCombined,
} from "lucide-react";


const features = [
  {
    title: "Custom School Branding",
    icon: Palette,
    description:
      "Every school gets its own colors, logo and subdomain."
  },
  {
    title: "Course Management",
    icon: GraduationCap,
    description:
      "Create lessons, quizzes and certificates effortlessly."
  },
  {
    title: "Learning Analytics",
    icon: ChartNoAxesCombined,
    description:
      "Track engagement, performance and completion rates."
  }
];

export function Features() {
  return (
    <section
      id="features"
      className="bg-gray-50 py-24"
    >
      <div className="mx-auto max-w-7xl px-6">

        <h2 className="text-center text-4xl font-bold">
          Everything Your School Needs
        </h2>

        <div className="mt-16 grid gap-8 md:grid-cols-3">

          {features.map((feature) => (
            <div
              key={feature.title}
              className="rounded-3xl bg-white p-8 shadow-sm"
            >
              <feature.icon
                className="mb-4 text-[#722F37]"
                size={40}
              />

              <h3 className="text-xl font-semibold">
                {feature.title}
              </h3>

              <p className="mt-3 text-black">
                {feature.description}
              </p>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
}