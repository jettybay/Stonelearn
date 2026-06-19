"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  ShieldCheck,
  Users,
  BarChart3,
  CheckCircle2,
} from "lucide-react";

import { NavbarLanding } from "@/components/navbar/navbarLanding";

export default function Page() {
  return (
    <main className="overflow-hidden bg-white">
      <NavbarLanding />
      {/* Hero */}
      <section className="relative min-h-screen flex items-center py-20 lg:py-0">
        {/* Background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-[-200px] right-[-200px] w-[700px] h-[700px] rounded-full bg-[#722F37]/10 blur-3xl" />

          <div className="absolute bottom-[-150px] left-[-150px] w-[500px] h-[500px] rounded-full bg-[#722F37]/5 blur-3xl" />
        </div>

        <div className="container mx-auto px-6 lg:px-16 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* LEFT */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
            >
              {/* Badge */}
              <div className="inline-flex mt-2 items-center gap-2 px-4 py-2 rounded-full bg-[#722F37]/10 text-[#722F37] font-medium mb-8">
                <CheckCircle2 size={16} />
                Trusted by 500+ Businesses
              </div>

              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-[#111111] leading-tight">
                Grow your
                <span className="block text-[#722F37]">
                  business smarter
                </span>
                with modern ERP
              </h1>

              <p className="mt-8 text-lg text-gray-600 max-w-xl leading-relaxed">
                Streamline operations, manage finances, track inventory,
                automate workflows, and gain real-time insights from a single
                platform built for ambitious companies.
              </p>

              {/* Buttons */}
              <div className="flex flex-wrap gap-4 mt-10">
                <button className="bg-[#722F37] hover:bg-[#5f262d] transition text-white px-8 py-4 rounded-xl font-semibold flex items-center gap-2">
                  Get Started
                  <ArrowRight size={18} />
                </button>

                <button className="border border-gray-300 px-8 py-4 rounded-xl font-semibold text-[#111111] hover:bg-gray-50 transition">
                  Book Demo
                </button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-8 mt-14">
                <div>
                  <h3 className="text-3xl font-bold text-[#111111]">
                    15K+
                  </h3>
                  <p className="text-gray-500">Active Users</p>
                </div>

                <div>
                  <h3 className="text-3xl font-bold text-[#111111]">
                    99.9%
                  </h3>
                  <p className="text-gray-500">System Uptime</p>
                </div>

                <div>
                  <h3 className="text-3xl font-bold text-[#111111]">
                    500+
                  </h3>
                  <p className="text-gray-500">Companies</p>
                </div>
              </div>
            </motion.div>

            {/* RIGHT */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              {/* Floating Card 1 */}
              <motion.div
                animate={{ y: [0, -12, 0] }}
                transition={{
                  repeat: Infinity,
                  duration: 5,
                }}
                className="absolute -top-10 left-4 md:-left-10 bg-white shadow-2xl rounded-3xl p-5 border z-20"
              >
                <div className="flex items-center gap-4">
                  <ShieldCheck
                    className="text-[#722F37]"
                    size={35}
                  />

                  <div>
                    <h4 className="font-semibold text-gray-600">
                      Enterprise Security
                    </h4>
                    <p className="text-sm text-gray-500">
                      Fully encrypted
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Main Dashboard */}
              <div className="rounded-[40px] bg-gradient-to-br from-[#722F37] to-[#4f1f26] p-2 shadow-2xl">
                <div className="bg-white rounded-[35px] p-8">
                  {/* Top Bar */}
                  <div className="flex justify-between items-center mb-8">
                    <h3 className="font-bold text-xl text-gray-600">
                      Business Overview
                    </h3>

                    <div className="bg-[#722F37]/10 text-[#722F37] px-4 py-2 rounded-lg text-sm">
                      Live Data
                    </div>
                  </div>

                  {/* Analytics */}
                  <div className="grid grid-cols-2 gap-5">
                    <div className="bg-gray-50 p-5 rounded-2xl">
                      <Users
                        className="text-[#722F37] mb-3"
                        size={30}
                      />
                      <p className="text-gray-500 text-sm">
                        Customers
                      </p>
                      <h4 className="text-3xl font-bold text-[#722F37]">
                        12,845
                      </h4>
                    </div>

                    <div className="bg-gray-50 p-5 rounded-2xl">
                      <BarChart3
                        className="text-[#722F37] mb-3"
                        size={30}
                      />
                      <p className="text-gray-500 text-sm">
                        Revenue
                      </p>
                      <h4 className="text-3xl font-bold text-[#722F37]">
                        248K CFA
                      </h4>
                    </div>
                  </div>

                  {/* Chart */}
                  <div className="mt-8 h-48 rounded-2xl bg-gradient-to-r from-[#722F37]/10 to-[#722F37]/20 flex items-end p-6 gap-3">
                    {[40, 60, 90, 55, 110, 130, 160].map(
                      (height, index) => (
                        <div
                          key={index}
                          className="bg-[#722F37] rounded-md flex-1"
                          style={{ height }}
                        />
                      )
                    )}
                  </div>
                </div>
              </div>

              {/* Floating Card 2 */}
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{
                  repeat: Infinity,
                  duration: 4,
                }}
                className="absolute -bottom-10 right-4 md:right-0 bg-white border shadow-xl rounded-2xl px-6 py-4"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-[#722F37]/10 flex items-center justify-center">
                    📈
                  </div>

                  <div>
                    <h4 className="font-bold text-lg text-red-800">
                      +38%
                    </h4>
                    <p className="text-gray-500 text-sm">
                      Revenue Growth
                    </p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
}