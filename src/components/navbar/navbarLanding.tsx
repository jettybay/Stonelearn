"use client";

import React, { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import Link from "next/link";

const categories = [
  { name: "Edutech", href: "/edutech" },
  { name: "Fintech", href: "/fintech" },
  { name: "Healthtech", href: "/healthtech" },
  { name: "Ecommerce", href: "/ecommerce" },
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
              className="flex items-center gap-1 font-medium text-gray-600 hover:text-[#722F37] transition-colors py-2 focus:outline-none"
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
              <div className="absolute left-0 top-full mt-1 w-48 rounded-xl border bg-white p-2 shadow-xl z-50 animate-in fade-in zoom-in-95 duration-200">
                {categories.map((cat) => (
                  <Link
                    key={cat.name}
                    href={cat.href}
                    onClick={() => setIsOpen(false)}
                    className="block rounded-lg px-4 py-2.5 text-sm text-gray-600 hover:bg-gray-50 hover:text-[#722F37] transition-colors"
                  >
                    {cat.name}
                  </Link>
                ))}
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
