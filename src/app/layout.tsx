import type { Metadata } from "next";
import { Space_Grotesk, Inter, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-heading",
  subsets: ["latin", "vietnamese"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin", "vietnamese"],
  display: "swap",
});

const mono = IBM_Plex_Mono({
  variable: "--font-mono",
  weight: ["400", "500", "600"],
  subsets: ["latin", "vietnamese"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://stem-lab-pi.vercel.app"),
  title: "CLB STEM-AI-ROBOTIC",
  description:
    "CLB STEM-AI-ROBOTIC — nơi khoa học gặp sáng tạo. Rô-bốt, AI, Lập trình, IoT và nhiều lĩnh vực nữa.",
  alternates: {
    canonical: "https://stem-lab-pi.vercel.app",
  },
  openGraph: {
    title: "CLB STEM-AI-ROBOTIC",
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
    title: "CLB STEM-AI-ROBOTIC",
    description:
      "CLB STEM-AI-ROBOTIC — nơi khoa học gặp sáng tạo. Rô-bốt, AI, Lập trình, IoT và nhiều lĩnh vực nữa.",
  },
};

// Runs before hydration/paint to apply the saved theme (default: light) and
// avoid a flash of the wrong theme.
const themeInitScript = `(function(){try{var t=localStorage.getItem('stem-theme');document.documentElement.dataset.theme=(t==='dark')?'dark':'light';}catch(e){document.documentElement.dataset.theme='light';}})();`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="vi"
      data-theme="light"
      suppressHydrationWarning
      className={`${spaceGrotesk.variable} ${inter.variable} ${mono.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="min-h-dvh bg-bg-deep text-text antialiased">
        {children}
      </body>
    </html>
  );
}
