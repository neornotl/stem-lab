import type { Metadata } from "next";
import { Fraunces, Shantell_Sans, Be_Vietnam_Pro, Space_Mono } from "next/font/google";
import "./notebook.css";

/* ————— notebook typefaces (all Vietnamese-subsetted) ————— */
const fraunces = Fraunces({
  variable: "--nb-display",
  subsets: ["latin", "vietnamese"],
  weight: ["500", "700", "900"],
  display: "swap",
});

const shantell = Shantell_Sans({
  variable: "--nb-hand",
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "700"],
  display: "swap",
});

const beVietnam = Be_Vietnam_Pro({
  variable: "--nb-body",
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const spaceMono = Space_Mono({
  variable: "--nb-mono",
  subsets: ["latin", "vietnamese"],
  weight: ["400", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Sổ tay thí nghiệm — CLB STEM-AI-ROBOTIC",
  description:
    "Một phiên bản khác của CLB STEM-AI-ROBOTIC — được trình bày như một cuốn sổ tay thí nghiệm.",
  alternates: {
    canonical: "https://stem-lab-pi.vercel.app",
  },
  openGraph: {
    title: "Sổ tay thí nghiệm — CLB STEM-AI-ROBOTIC",
    description:
      "CLB STEM-AI-ROBOTIC — nơi khoa học gặp sáng tạo. Rô-bốt, AI, Lập trình, IoT và nhiều lĩnh vực nữa.",
    url: "https://stem-lab-pi.vercel.app",
    siteName: "CLB STEM-AI-ROBOTIC",
    type: "website",
    locale: "vi_VN",
    images: [{ url: "/og.png", width: 1792, height: 1024, alt: "CLB STEM-AI-ROBOTIC" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sổ tay thí nghiệm — CLB STEM-AI-ROBOTIC",
    description:
      "CLB STEM-AI-ROBOTIC — nơi khoa học gặp sáng tạo. Rô-bốt, AI, Lập trình, IoT và nhiều lĩnh vực nữa.",
  },
};

export default function LabLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={`nb-root ${fraunces.variable} ${shantell.variable} ${beVietnam.variable} ${spaceMono.variable}`}
    >
      <a
        href="#nb-main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded focus:bg-[var(--nb-blue)] focus:px-4 focus:py-2 focus:text-sm focus:font-bold focus:text-white"
      >
        Bỏ qua nội dung / Skip to content
      </a>
      <span className="nb-margin-line" aria-hidden />
      {children}
    </div>
  );
}
