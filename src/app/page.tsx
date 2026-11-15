import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { FloatingContactDock } from "@/components/layout/FloatingContactDock";
import { GlobalScroll3DCanvas } from "@/components/three/LogisticsStageWrapper";
import { HeroAndFleetSection } from "@/components/sections/HeroSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { BranchesAndAboutSection } from "@/components/sections/BranchesAndAboutSection";
import { VerticalMarketsAndToolsSection } from "@/components/sections/VerticalMarketsAndToolsSection";
import { QuoteAndContactSection } from "@/components/sections/QuoteAndContactSection";

export default function HomePage() {
  return (
    <div className="relative min-h-screen text-[var(--text-primary)]">
      {/* Continuous Full-Viewport Scroll-Synced 3D World */}
      <GlobalScroll3DCanvas />

      <div className="relative z-10">
        <Navbar />
        <main>
          <HeroAndFleetSection />
          <ServicesSection />
          <BranchesAndAboutSection />
          <VerticalMarketsAndToolsSection />
          <QuoteAndContactSection />
        </main>
        <Footer />
        <FloatingContactDock />
      </div>
    </div>
  );
}
