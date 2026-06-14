"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";

export function MobileMenu() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button onClick={() => setOpen(true)} className="md:hidden">
        <Menu size={24} />
      </button>

      {open && (
        <div className="fixed inset-0 z-50 bg-white">
          <div className="flex justify-end p-6">
            <button onClick={() => setOpen(false)}>
              <X size={24} />
            </button>
          </div>

          <nav className="flex flex-col gap-6 p-6">
            <a
              href="#features"
              onClick={() => setOpen(false)}
            >
              Features
            </a>
            <a
              href="#how-it-works"
              onClick={() => setOpen(false)}
            >
              How It Works
            </a>
            <a href="#pricing" onClick={() => setOpen(false)}>
              Pricing
            </a>
            <a href="#contact" onClick={() => setOpen(false)}>
              Contact
            </a>

            <a
              href="#contact"
              className="rounded-xl bg-[#722F37] py-3 text-center text-white"
              onClick={() => setOpen(false)}
            >
              Get Started
            </a>
          </nav>
        </div>
      )}
    </>
  );
}
