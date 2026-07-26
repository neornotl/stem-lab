"use client";
import { LanguageProvider } from "@/context/LanguageContext";
import { DeviceProvider } from "@/context/DeviceContext";
import { ThemeProvider } from "@/context/ThemeContext";
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

export default function Home() {
  return (
    <DeviceProvider>
      <ThemeProvider>
        <LanguageProvider>
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
        </LanguageProvider>
      </ThemeProvider>
    </DeviceProvider>
  );
}
