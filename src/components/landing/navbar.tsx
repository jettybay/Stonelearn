import Link from "next/link";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
        <Link href="/">
          <h1 className="text-2xl font-bold text-[#722F37]">
            Stonelearn
          </h1>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          <a href="#features">Features</a>
          <a href="#how-it-works">How It Works</a>
          <a href="#pricing">Pricing</a>
          <a href="#contact">Contact</a>
        </nav>

        <div className="flex gap-3">
          <button className="rounded-xl border px-5 py-2">
            Login
          </button>

          <button className="rounded-xl bg-[#722F37] px-5 py-2 text-white">
            Get Started
          </button>
        </div>
      </div>
    </header>
  );
}