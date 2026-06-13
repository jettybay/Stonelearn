import { Navbar } from "./navbar";
import { Hero } from "./hero";
import { Stats } from "./stats";
import { Features } from "./features";
import { HowItWorks } from "./how-it-works";
import { Testimonials } from "./testimonials";
import { CTA } from "./cta";
import { Footer } from "./footer";

export default function Landing() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <Stats />
        <Features />
        <HowItWorks />
        <Testimonials />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}

