"use client";
import { LanguageProvider } from "@/context/LanguageContext";
import { DeviceProvider } from "@/context/DeviceContext";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import ActivityAreaSection from "@/components/sections/ActivityAreaSection";
import AudienceSection from "@/components/sections/AudienceSection";
import FeaturedActivitiesSection from "@/components/sections/FeaturedActivitiesSection";
import ProjectShowcaseSection from "@/components/sections/ProjectShowcaseSection";
import JoinProcessSection from "@/components/sections/JoinProcessSection";
import RegistrationSection from "@/components/sections/RegistrationSection";
import FAQSection from "@/components/sections/FAQSection";
import ScrollToTop from "@/components/shared/ScrollToTop";
import CustomCursor from "@/components/decorative/CustomCursor";
import ScanLine from "@/components/decorative/ScanLine";
import CornerDecorations from "@/components/decorative/CornerDecorations";
import NoiseOverlay from "@/components/decorative/NoiseOverlay";
import HudSidebar from "@/components/decorative/HudSidebar";

export default function Home() {
  return (
    <DeviceProvider>
      <LanguageProvider>
        {/* === MAIN CONTENT (z-0) === */}
        <Navbar />
        <main className="relative z-0">
          <HeroSection />
          <AboutSection />
          <ActivityAreaSection />
          <AudienceSection />
          <FeaturedActivitiesSection />
          <ProjectShowcaseSection />
          <JoinProcessSection />
          <RegistrationSection />
          <FAQSection />
        </main>
        <Footer />
        <ScrollToTop />

        {/* === HUD OVERLAY LAYER (pointer-events-none, z-[200]+) === */}
        {/* These are visual-only decorations rendered ABOVE content */}
        <ScanLine />
        <NoiseOverlay />
        <CornerDecorations />
        <HudSidebar />

        {/* Custom cursor — needs pointer-events on interactive elements */}
        <CustomCursor />

        {/* Subtle vignette — very light, only on edges */}
        <div
          className="fixed inset-0 pointer-events-none z-[75]"
          style={{
            boxShadow: "inset 0 0 200px 80px rgba(5, 8, 22, 0.4)",
          }}
        />
      </LanguageProvider>
    </DeviceProvider>
  );
}
