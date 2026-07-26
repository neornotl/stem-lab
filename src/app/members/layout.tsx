import type { Metadata } from "next";
import { Be_Vietnam_Pro, Fraunces, Shantell_Sans, Space_Mono } from "next/font/google";
import "../lab/notebook.css";

const fraunces = Fraunces({
  subsets: ["latin", "vietnamese"],
  variable: "--font-nb-display",
  display: "swap",
});

const shantell = Shantell_Sans({
  subsets: ["latin", "vietnamese"],
  variable: "--font-nb-hand",
  display: "swap",
});

const beVietnam = Be_Vietnam_Pro({
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-nb-body",
  display: "swap",
});

const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-nb-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Thành viên tiêu biểu — CLB STEM-AI-ROBOTIC",
  description: "Những gương mặt nổi bật đứng sau các dự án của CLB.",
  alternates: {
    canonical: "https://stem-lab-pi.vercel.app/members",
  },
  openGraph: {
    title: "Thành viên tiêu biểu — CLB STEM-AI-ROBOTIC",
    description: "Những gương mặt nổi bật đứng sau các dự án của CLB.",
    url: "https://stem-lab-pi.vercel.app/members",
    siteName: "CLB STEM-AI-ROBOTIC",
    type: "website",
    locale: "vi_VN",
    images: [{ url: "/og.png", width: 1792, height: 1024, alt: "CLB STEM-AI-ROBOTIC" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Thành viên tiêu biểu — CLB STEM-AI-ROBOTIC",
    description: "Những gương mặt nổi bật đứng sau các dự án của CLB.",
  },
};

export default function MembersLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div
      className={`${fraunces.variable} ${shantell.variable} ${beVietnam.variable} ${spaceMono.variable}`}
    >
      <a
        href="#nb-main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded focus:bg-[var(--nb-blue)] focus:px-4 focus:py-2 focus:text-sm focus:font-bold focus:text-white"
      >
        Bỏ qua nội dung / Skip to content
      </a>
      {children}
    </div>
  );
}
