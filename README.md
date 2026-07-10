# 🚀 STEM Innovation Club — Website MVP

This repository contains the source code for the **STEM Innovation Club** website MVP. 
The project is designed as an elegant, futuristic landing page to introduce the club to students, teachers, and parents, and to facilitate member registration.

## 📋 Table of Contents
- [Product Brief](#product-brief)
- [Tech Stack](#tech-stack)
- [Visual Direction & Design System](#visual-direction--design-system)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Development Roadmap](#development-roadmap)

---

## 💡 Product Brief
- **Name**: STEM Innovation Club
- **Type**: Landing page MVP (Single-page application)
- **Target Audience**: Students, Teachers, Parents
- **Language**: Bilingual (Vietnamese / English) toggle supported.
- **Goal**: Showcase the club's activities, projects, and recruit new members through an immersive visual experience.

---

## 🛠 Tech Stack
The project is built with a modern frontend stack focusing on performance and animations:
- **Framework**: [Next.js](https://nextjs.org/) (App Router)
- **Language**: TypeScript
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **UI Architecture**: Component-driven with Context API for state management (Device and Language).

---

## 🎨 Visual Direction & Design System
**Concept**: "Elegant STEM Lab" — a futuristic scientific console where technology meets art.

### Core Visual Principles
- **Lightweight HUD**: Thin 1px borders, subtle corner brackets, decorative SVG circuit lines.
- **Glassmorphism**: Cards use heavy backdrop blurs (`backdrop-blur-xl`) with semi-transparent white backgrounds and thin borders.
- **Ambient Glow**: Soft cyan/violet radial gradients acting as background blobs.
- **Typography-forward**: Bold headings with gradient text (Space Grotesk), readable clean body text (Inter).
- **Adaptive HUD**: Animations and decorative elements degrade gracefully from Desktop down to Mobile devices.

### Color Palette
- **Backgrounds**: Deep dark `#050816` (Primary) up to `#111832` (Elevated).
- **Accents**: Cyan (`#00D4FF`) and Violet (`#8B5CF6`).
- **Text**: Slate/white hues for readable contrast against dark backgrounds.

---

## 📁 Project Structure

```text
stem_club/
├── PROPOSAL.md          # Original project specifications and design docs
└── website/             # Next.js Application source code
    ├── public/          # Static assets (images, icons)
    └── src/
        ├── app/         # Next.js App Router (layout, page, global CSS)
        ├── components/  # React components
        │   ├── adaptive/    # Device and HUD level wrappers
        │   ├── decorative/  # HUD elements, grid patterns, glow orbs
        │   ├── layout/      # Navbar, Footer, wrappers
        │   ├── sections/    # Landing page sections (Hero, About, etc.)
        │   ├── shared/      # Reusable shared components
        │   └── ui/          # Base UI components (buttons, cards)
        ├── context/     # React Context (LanguageProvider, DeviceProvider)
        ├── data/        # Static data (i18n text, activities, projects)
        ├── hooks/       # Custom React hooks
        └── lib/         # Utility functions and constants
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm, yarn, pnpm, or bun

### Installation
1. Clone the repository and navigate to the website directory:
   ```bash
   cd stem_club/website
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```
4. Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🗺 Development Roadmap

- **Phase 1 (Current)**: MVP Landing Page (Setup, Design system, UI Layout, 9 sections, responsive adaptive HUD, animations).
- **Phase 2**: Real content integration (replace placeholders, SEO optimization, add SVG illustrations).
- **Phase 3**: Form Backend integration (Connect registration to Supabase/Google Sheets, email confirmation).
- **Phase 4**: Extended Features (News, detailed gallery, user dashboards).
