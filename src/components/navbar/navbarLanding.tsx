"use client";

import React, { useState, useRef, useEffect } from "react";
import { ChevronDown, ArrowRight } from "lucide-react";
import Link from "next/link";

const categories = [
  { name: "Edutech", href: "/edutech", description: "Scale learning with modern school management tools" },
  { name: "Fintech", href: "/fintech", description: "Robust payment & banking infrastructure" },
  { name: "Healthtech", href: "/healthtech", description: "Streamline patient care and clinic operations" },
  { name: "Ecommerce", href: "/ecommerce", description: "Launch and scale your online retail brand" },
];

export function NavbarLanding() {
  const [isOpen, setIsOpen] = useState(false);
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
          <span className="text-xl font-bold">Stonelearn</span>
        </div>

        <nav className="hidden md:flex items-center gap-8">
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`flex items-center gap-1 font-medium transition-colors py-2 focus:outline-none ${
                isOpen ? "text-[#722F37]" : "text-gray-600 hover:text-[#722F37]"
              }`}
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
                <div className="mb-2 px-4 py-2">
                  <p className="text-[11px] font-bold uppercase tracking-widest text-gray-400">
                    Industry Solutions
                  </p>
                </div>
                <div className="grid gap-2">
                  {categories.map((cat) => (
                    <Link
                      key={cat.name}
                      href={cat.href}
                      onClick={() => setIsOpen(false)}
                      className="group flex items-center justify-between rounded-2xl px-4 py-4 text-gray-700 hover:bg-[#722F37]/5 hover:text-[#722F37] transition-all duration-200"
                    >
                      <div className="flex-1">
                        <h4 className="text-base font-bold leading-none">
                          {cat.name}
                        </h4>
                        <p className="mt-2 text-xs text-gray-500 group-hover:text-[#722F37]/70 transition-colors">
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

        <div className="flex gap-3">
          <button className="rounded-xl border px-5 py-2">Login</button>
          
        </div>
      </div>
    </header>
  );
}
