"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";

export function MobileMenu() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="md:hidden"
      >
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
            <a href="#features">Features</a>
            <a href="#pricing">Pricing</a>
            <a href="#faq">FAQ</a>
            <button className="rounded-xl bg-[#722F37] py-3 text-white">
              Get Started
            </button>
          </nav>
        </div>
      )}
    </>
  );
}