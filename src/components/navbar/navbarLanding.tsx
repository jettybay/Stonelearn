"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown, ArrowRight, Menu, X } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

const categories = [
  { name: "Edutech", href: "/categories/edutech", description: "Scale learning with modern school management tools" },
  { name: "Fintech", href: "/categories/fintech", description: "Robust payment & banking infrastructure" },
  { name: "Healthtech", href: "/categories/healthtech", description: "Streamline patient care and clinic operations" },
  { name: "Ecommerce", href: "/categories/ecommerce", description: "Launch and scale your online retail brand" },
];

export function NavbarLanding() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-xl bg-[#722F37]" />
          <span className="text-xl font-bold text-[#722F37]">Stonelearn</span>
        </div>

        <nav className="hidden md:flex items-center gap-8">
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="flex items-center gap-1 font-medium transition-colors py-2 focus:outline-none text-[#722F37]"
            >
              Categories
              <ChevronDown
                size={16}
                className={`transition-transform duration-200 ${
                  isOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {isOpen && (
              <div className="absolute left-0 top-full mt-4 w-80 rounded-[28px] border border-gray-100 bg-white p-4 shadow-2xl z-50 animate-in fade-in zoom-in-95 slide-in-from-top-2 duration-200">
                <div className="grid gap-2">
                  {categories.map((cat) => (
                    <Link
                      key={cat.name}
                      href={cat.href}
                      onClick={() => setIsOpen(false)}
                      className="group flex items-center justify-between rounded-2xl px-4 py-4 text-[#722F37] hover:bg-[#722F37]/5 transition-all duration-200"
                    >
                      <div className="flex-1">
                        <h4 className="text-base font-bold leading-none">
                          {cat.name}
                        </h4>
                        <p className="mt-2 text-xs text-[#722F37]/70 transition-colors">
                          {cat.description}
                        </p>
                      </div>
                      <ArrowRight size={18} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </nav>

        <div className="flex items-center gap-3">
          <div className="hidden md:flex gap-3">
            <button className="rounded-xl border border-[#722F37]/20 px-5 py-2 text-[#722F37] hover:bg-gray-50 transition">
              Login
            </button>
            <Link 
              href="/Auth/Signup"
              className="rounded-xl bg-[#722F37] px-6 py-2 text-white hover:bg-[#722F37]/90 transition text-center"
            >
              Get Started
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-black hover:bg-gray-100 rounded-xl transition"
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
            className="md:hidden border-t bg-white overflow-hidden"
          >
            <div className="flex flex-col gap-8 p-6">
              <div className="flex flex-col gap-4">
                <p className="text-xs font-bold uppercase tracking-wider text-[#722F37]/60 px-2">
                  Categories
                </p>
                <div className="grid gap-2">
                  {categories.map((cat) => (
                    <Link
                      key={cat.name}
                      href={cat.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="group flex flex-col gap-1 rounded-2xl px-4 py-4 text-[#722F37] hover:bg-[#722F37]/5"
                    >
                      <span className="font-bold transition-colors">
                        {cat.name}
                      </span>
                      <span className="text-xs text-[#722F37]/70">
                        {cat.description}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-3 border-t pt-6">
                <button className="w-full rounded-xl border border-[#722F37]/20 py-4 font-bold text-[#722F37]">
                  Login
                </button>
                <Link 
                  href="/Auth/Signup"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-full rounded-xl bg-[#722F37] py-4 font-bold text-white shadow-lg shadow-[#722F37]/20 text-center"
                >
                  Get Started
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
