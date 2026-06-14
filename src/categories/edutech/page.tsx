import {
  BookOpen,
  Palette,
  Award,
} from "lucide-react";

import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

import { SectionHeader } from "@/components/section-header";
import { FeatureCard } from "@/components/feature-card";
import { DashboardPreview } from "@/components/dashboard-preview";
import { BrandingSwitcher } from "@/components/branding-switcher";
import { PricingCard } from "@/components/pricing-card";
import { FAQItem } from "@/components/faq-item";
import { AnimatedCounter } from "@/components/animated-counter";

import { FadeIn } from "@/components/motion/fade-in";

export default function EdutechPage() {
  return (
    <main className="bg-white">

      <Navbar />

      {/* HERO */}

      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(114,47,55,.15),transparent_60%)]" />

        <div className="relative mx-auto max-w-7xl px-6 py-24 lg:py-32">

          <div className="grid gap-16 lg:grid-cols-2 lg:items-center">

            <div>

              <span className="rounded-full bg-[#F7EDEE] px-4 py-2 text-sm font-semibold text-[#722F37]">
                Multi-Tenant Learning Platform
              </span>

              <h1 className="mt-6 text-5xl font-extrabold leading-tight tracking-tight lg:text-7xl">
                The Learning Platform Built For Modern Schools
              </h1>

              <p className="mt-6 max-w-xl text-lg text-gray-600">
                Launch a fully branded LMS for your school.
                Manage students, teachers, courses, quizzes,
                certificates and analytics from one platform.
              </p>

              <div className="mt-10 flex flex-wrap gap-4">

                <button className="rounded-xl bg-[#722F37] px-8 py-4 font-semibold text-white">
                  Start Free Trial
                </button>

                <button className="rounded-xl border px-8 py-4 font-semibold">
                  Watch Demo
                </button>

              </div>

            </div>

            <DashboardPreview />

          </div>
        </div>
      </section>

      {/* STATS */}

      <section className="border-y bg-gray-50 py-16">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 px-6 md:grid-cols-4">

          <div className="text-center">
            <AnimatedCounter value={100} suffix="+" />
            <p className="mt-2 text-gray-500">Schools</p>
          </div>

          <div className="text-center">
            <AnimatedCounter value={50000} suffix="+" />
            <p className="mt-2 text-gray-500">Students</p>
          </div>

          <div className="text-center">
            <AnimatedCounter value={5000} suffix="+" />
            <p className="mt-2 text-gray-500">Courses</p>
          </div>

          <div className="text-center">
            <AnimatedCounter value={99} suffix="%" />
            <p className="mt-2 text-gray-500">Completion Rate</p>
          </div>

        </div>
      </section>

      {/* FEATURES */}

      <section
        id="features"
        className="py-24"
      >
        <div className="mx-auto max-w-7xl px-6">

          <SectionHeader
            kicker="Everything You Need"
            title="Run Your Entire School Online"
            description="Stonelearn gives schools all the tools required to manage digital learning."
          />
<div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">

  <FadeIn>
    <FeatureCard
      icon={Palette}
      title="Custom Branding"
      description="Each school gets its own colors, logo and subdomain."
    />
  </FadeIn>

  <FadeIn>
    <FeatureCard
      icon={BookOpen}
      title="Course Management"
      description="Create lessons, modules and resources."
    />
  </FadeIn>

  <FadeIn>
    <FeatureCard
      icon={Award}
      title="Certificates"
      description="Generate certificates automatically."
    />
  </FadeIn>

</div>
          
        </div>
      </section>

      {/* BRANDING */}

      <section className="bg-gray-50 py-24">

        <div className="mx-auto max-w-7xl px-6">

          <SectionHeader
            kicker="Multi-Tenant Branding"
            title="Every School Gets Its Own Identity"
            description="Switch between school themes instantly."
          />

          <div className="mt-10 flex justify-center">
            <BrandingSwitcher />
          </div>

          <div className="mt-12">
            <DashboardPreview />
          </div>

        </div>

      </section>

      {/* PRICING */}

      <section
        id="pricing"
        className="py-24"
      >
        <div className="mx-auto max-w-7xl px-6">

          <SectionHeader
            kicker="Pricing"
            title="Simple Pricing For Every Institution"
          />

          <div className="mt-16 grid gap-8 lg:grid-cols-3">

            <PricingCard
              name="Starter"
              price="$29"
              description="Perfect for small schools."
              features={[
                "500 Students",
                "Custom Branding",
                "Course Management",
              ]}
              cta="Get Started"
            />

            <PricingCard
              name="Growth"
              price="$99"
              description="Most popular choice."
              highlighted
              features={[
                "Unlimited Students",
                "Certificates",
                "Analytics",
                "Custom Domain",
              ]}
              cta="Start Trial"
            />

            <PricingCard
              name="Enterprise"
              price="Custom"
              description="For large institutions."
              features={[
                "White Label",
                "Dedicated Support",
                "Advanced Reporting",
              ]}
              cta="Contact Sales"
            />

          </div>
        </div>
      </section>

      {/* FAQ */}

      <section className="bg-gray-50 py-24">

        <div className="mx-auto max-w-4xl px-6">

          <SectionHeader
            kicker="FAQ"
            title="Frequently Asked Questions"
          />

          <div className="mt-12 space-y-4">

            <FAQItem
              question="Can I use my own school colors?"
              answer="Yes. Every school can customize branding."
            />

            <FAQItem
              question="Do students receive certificates?"
              answer="Yes. Certificates can be generated automatically."
            />

            <FAQItem
              question="Can teachers upload videos?"
              answer="Absolutely. Teachers can upload videos and resources."
            />

          </div>

        </div>

      </section>

      {/* CTA */}

      <section className="py-24">

        <div className="mx-auto max-w-5xl px-6">

          <div className="rounded-[32px] bg-[#722F37] p-16 text-center text-white">

            <h2 className="text-5xl font-bold">
              Ready To Launch Your School LMS?
            </h2>

            <p className="mt-6 text-lg text-white/80">
              Start building your digital campus today.
            </p>

            <button className="mt-8 rounded-xl bg-white px-8 py-4 font-semibold text-[#722F37]">
              Start Free Trial
            </button>

          </div>

        </div>

      </section>

      <Footer />

    </main>
  );
}