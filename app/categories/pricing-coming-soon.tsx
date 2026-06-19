"use client";

import { NavbarLanding } from "@/components/navbar/navbarLanding";
import { ArrowRight, Clock, Mail } from "lucide-react";
import { useState } from "react";

export default function PricingComingSoonPage({ category }: { category: string }) {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleNotify = () => {
    if (email) {
      setSubmitted(true);
      setEmail("");
      setTimeout(() => setSubmitted(false), 3000);
    }
  };

  const categoryInfo: Record<string, { title: string; description: string; emoji: string }> = {
    fintech: {
      title: "Fintech Pricing",
      description: "Flexible pricing for payments, banking, and financial operations",
      emoji: "💰"
    },
    healthtech: {
      title: "Healthtech Pricing",
      description: "Transparent pricing for hospitals, clinics, and healthcare providers",
      emoji: "🏥"
    },
    ecommerce: {
      title: "E-commerce Pricing",
      description: "Scalable pricing for retailers, supermarkets, and online stores",
      emoji: "🛍️"
    }
  };

  const info = categoryInfo[category] || categoryInfo.fintech;

  return (
    <main className="min-h-screen bg-white">
      <NavbarLanding />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center py-20 lg:py-0">
        {/* Background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-[-200px] right-[-200px] w-[700px] h-[700px] rounded-full bg-[#722F37]/10 blur-3xl" />
          <div className="absolute bottom-[-150px] left-[-150px] w-[500px] h-[500px] rounded-full bg-[#722F37]/5 blur-3xl" />
        </div>

        <div className="container mx-auto px-6 lg:px-16 relative z-10">
          <div className="max-w-2xl mx-auto text-center">
            {/* Icon */}
            <div className="inline-block mb-6">
              <div className="text-8xl">{info.emoji}</div>
            </div>

            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-100 text-amber-700 font-medium mb-6">
              <Clock size={16} />
              Coming Soon
            </div>

            {/* Heading */}
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-[#111111] leading-tight mb-6">
              {info.title}
            </h1>

            {/* Description */}
            <p className="text-lg md:text-xl text-gray-600 mb-8 leading-relaxed">
              {info.description}
            </p>

            {/* Sub-description */}
            <p className="text-base text-gray-500 mb-12 max-w-xl mx-auto">
              We're crafting a comprehensive pricing strategy tailored specifically for {category} businesses. 
              Be among the first to know when our pricing details are released.
            </p>

            {/* Email Notification */}
            <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm mb-8 max-w-md mx-auto">
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-2 text-sm font-semibold text-[#722F37]">
                  <Mail size={18} />
                  Get notified when pricing is available
                </div>

                <div className="flex gap-2">
                  <input
                    type="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleNotify()}
                    className="flex-1 px-4 py-3 rounded-xl border border-gray-300 text-black placeholder:text-gray-400 outline-none focus:border-[#722F37] focus:ring-2 focus:ring-[#722F37]/10"
                  />
                  <button
                    onClick={handleNotify}
                    disabled={!email}
                    className="bg-[#722F37] hover:bg-[#5f262d] disabled:bg-gray-300 text-white px-6 py-3 rounded-xl font-semibold transition flex items-center gap-2"
                  >
                    <span>Notify</span>
                    <ArrowRight size={16} />
                  </button>
                </div>

                {submitted && (
                  <div className="text-sm text-green-600 font-medium">
                    ✓ Thanks! We'll notify you soon.
                  </div>
                )}
              </div>
            </div>

            {/* Info Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 mb-12">
              <div className="rounded-2xl border border-gray-200 bg-gray-50 p-6">
                <div className="text-3xl mb-3">📊</div>
                <h3 className="font-bold text-black mb-2">Flexible Plans</h3>
                <p className="text-sm text-gray-600">Pricing options designed for businesses of all sizes</p>
              </div>

              <div className="rounded-2xl border border-gray-200 bg-gray-50 p-6">
                <div className="text-3xl mb-3">💡</div>
                <h3 className="font-bold text-black mb-2">Smart Features</h3>
                <p className="text-sm text-gray-600">Purpose-built tools for {category} operations</p>
              </div>

              <div className="rounded-2xl border border-gray-200 bg-gray-50 p-6">
                <div className="text-3xl mb-3">🚀</div>
                <h3 className="font-bold text-black mb-2">Quick Start</h3>
                <p className="text-sm text-gray-600">Get started in minutes with our simple setup</p>
              </div>
            </div>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-[#722F37] hover:bg-[#5f262d] transition text-white px-8 py-4 rounded-xl font-semibold flex items-center justify-center gap-2">
                Get Started Early
                <ArrowRight size={18} />
              </button>

              <a href="/categories" className="border border-gray-300 hover:bg-gray-50 transition px-8 py-4 rounded-xl font-semibold text-[#111111]">
                Explore Other Categories
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
