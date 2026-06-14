"use client";
import { useState } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { MobileMenu } from "./mobile-menu";

export function Navbar() {
  const [isFeaturesOpen, setIsFeaturesOpen] = useState(false);

  const categories = [
    { name: "Edutech", href: "/categories/edutech" },
    { name: "Fintech", href: "/categories/fintech" },
    { name: "Healthtech", href: "/categories/healthtech" },
    { name: "E-commerce", href: "/categories/ecommerce" },
  ];

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
                  {categories.map((cat) => (
                    <Link 
                      key={cat.href} 
                      href={cat.href}
                      className="block px-4 py-2.5 text-sm font-medium hover:bg-gray-50 hover:text-[#722F37] transition-colors"
                    >
                      {cat.name}
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

        <div className="flex gap-3">
          <button className="rounded-xl border px-5 py-2">Login</button>
         

          <MobileMenu />

          
        </div>
      </div>
    </header>
  );
}
