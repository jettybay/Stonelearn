
import { MobileMenu } from "./mobile-menu";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
        <div className="flex items-center gap-3">
  <div className="h-9 w-9 rounded-xl bg-[#722F37]" />
  <span className="text-xl font-bold">
    Stonelearn
  </span>
</div>

        <nav className="hidden md:flex items-center gap-8">
          <a href="#features">Features</a>
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

