"use client";
import { useState } from "react";
import Link from "next/link";
import { ChevronDown, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function Navbar() {
  const [isFeaturesOpen, setIsFeaturesOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Dynamic dropdown items based on current route
  // (category landing pages)
  // Note: using "wine" primary color for dropdown text.
  const pathname = typeof window !== "undefined" ? window.location.pathname : "";

  const featureItems = (() => {
    if (pathname.includes("/categories/edutech")) {
      return ["Schools", "CBT", "Quizzes", "Examinations"].map((label) => ({
        label,
        href: pathname,
      }));
    }

    if (pathname.includes("/categories/ecommerce")) {
      return ["Mall", "Supermarket", "Store"].map((label) => ({
        label,
        href: pathname,
      }));
    }

    if (pathname.includes("/categories/healthtech")) {
      return ["Hospital", "Pharmacy", "Laboratory", "Fitness"].map((label) => ({
        label,
        href: pathname,
      }));
    }

    if (pathname.includes("/categories/fintech")) {
      return [
        "Regular Finance",
        "Micro-finance",
        "Co-operative",
        "Audit",
        "Payment management",
        "e-Ticket",
      ].map((label) => ({
        label,
        href: pathname,
      }));
    }

    // Fallback (when not on category pages)
    return [
      { label: "Edutech", href: "/categories/edutech" },
      { label: "Fintech", href: "/categories/fintech" },
      { label: "Healthtech", href: "/categories/healthtech" },
      { label: "E-commerce", href: "/categories/ecommerce" },
    ];
  })();







  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-xl bg-[#722F37]" />
          <span className="text-xl font-bold">
            Stonelearn
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          <div 
            className="relative h-full flex items-center"
            onMouseEnter={() => setIsFeaturesOpen(true)}
            onMouseLeave={() => setIsFeaturesOpen(false)}
          >
            <button className="flex items-center gap-1 hover:text-[#722F37] transition-colors py-2 font-medium">
              Features
              <ChevronDown size={14} className={`transition-transform duration-200 ${isFeaturesOpen ? 'rotate-180' : ''}`} />
            </button>

            <AnimatePresence>
              {isFeaturesOpen && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute left-0 top-[calc(100%-10px)] w-48 rounded-xl bg-white border shadow-xl py-2 z-50"
                >
                  {featureItems.map((item) => (
                    <Link
                      key={item.label}
                      href={item.href}
                      className="block px-4 py-2.5 text-sm font-medium transition-colors"
                      style={{ color: "#722F37" }}
                      onClick={() => setIsFeaturesOpen(false)}
                    >
                      {item.label}
                    </Link>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <a href="#how-it-works">How It Works</a>
          <a href="#pricing">Pricing</a>
          <a href="#contact">Contact</a>
        </nav>

        <div className="flex items-center gap-3">
          <button className="hidden sm:block rounded-xl border px-5 py-2 font-medium hover:bg-gray-50 transition-colors">
            Login
          </button>
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t bg-white overflow-hidden shadow-lg"
          >
            <div className="flex flex-col gap-2 p-6">
              <div className="space-y-1">
                <button 
                  onClick={() => setIsFeaturesOpen(!isFeaturesOpen)}
                  className="flex w-full items-center justify-between py-2 font-medium text-left hover:text-[#722F37] transition-colors"
                >
                  Features
                  <ChevronDown size={16} className={`transition-transform duration-200 ${isFeaturesOpen ? 'rotate-180' : ''}`} />
                </button>
                
                <AnimatePresence>
                  {isFeaturesOpen && (
                    <motion.div 
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="pl-4 space-y-1 overflow-hidden"
                    >
                      {featureItems.map((item) => (
                        <Link
                          key={item.label}
                          href={item.href}
                          className="block py-2 text-sm transition-colors"
                          style={{ color: "#722F37" }}
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          {item.label}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              <a href="#how-it-works" className="py-2 font-medium hover:text-[#722F37] transition-colors" onClick={() => setIsMobileMenuOpen(false)}>How It Works</a>
              <a href="#pricing" className="py-2 font-medium hover:text-[#722F37] transition-colors" onClick={() => setIsMobileMenuOpen(false)}>Pricing</a>
              <a href="#contact" className="py-2 font-medium hover:text-[#722F37] transition-colors" onClick={() => setIsMobileMenuOpen(false)}>Contact</a>
              <div className="pt-4">
                <button className="w-full rounded-xl bg-[#722F37] text-white px-5 py-3 font-medium active:scale-95 transition-transform">
                  Login
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
