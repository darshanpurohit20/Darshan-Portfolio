# Darshan Purohit — AI Engineer & Backend Developer Portfolio

[![Next.js](https://img.shields.io/badge/Next.js-14-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-11-0055FF?style=flat-square&logo=framer)](https://www.framer.com/motion/)
[![Three.js](https://img.shields.io/badge/Three.js-r165-black?style=flat-square&logo=three.js)](https://threejs.org/)

> A world-class portfolio showcasing AI engineering expertise, backend development skills, and research work in deepfake detection.

**Live Site:** [darshanpurohit.dev](https://darshanpurohit.dev)

---

## Tech Stack

| Category | Technology |
|----------|------------|
| **Framework** | Next.js 14 (App Router) |
| **Language** | TypeScript |
| **Styling** | Tailwind CSS v4 |
| **Animations** | Framer Motion v11, GSAP 3 |
| **Smooth Scroll** | Lenis v2 |
| **3D Graphics** | Three.js r165, @react-three/fiber |
| **UI Components** | shadcn/ui patterns |
| **Icons** | Lucide React |
| **Fonts** | Space Grotesk, Inter |

---

## Features

### Interactive Experience
- 🎯 **Custom Magnetic Cursor** — Spring-physics cursor with mix-blend-difference effect
- ✨ **Three.js Particle Field** — WebGL background with mouse parallax
- 🌊 **Smooth Scrolling** — Lenis + GSAP ScrollTrigger for buttery smooth navigation
- 💫 **Spotlight Cards** — Mouse-tracking radial glow on project cards
- 🧲 **Magnetic Buttons** — Physics-based cursor attraction
- ⌨️ **Command Palette** — ⌘K shortcut for quick navigation
- 🎬 **Cinematic Loader** — Animated progress screen on initial load

### Sections
1. **Hero** — Animated text reveal, floating tech pills, live statistics
2. **Projects** — 4 featured projects with spotlight hover effects and detail modals
3. **Skills** — Categorized tech stack with animated badges
4. **About** — Bio, education timeline, experience
5. **GitHub** — Live repository fetching with stats
6. **Contact** — Email CTA with gradient border card

### Performance
- ⚡ Static generation with Next.js
- 🖼️ Optimized images and fonts
- 🎭 Reduced motion support for accessibility
- 📱 Fully responsive design

---

## Project Structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout with providers
│   ├── page.tsx            # Main page composition
│   └── globals.css         # Design tokens & animations
├── components/
│   ├── layout/             # Global UI components
│   │   ├── Cursor.tsx
│   │   ├── Loader.tsx
│   │   ├── Navbar.tsx
│   │   ├── CommandPalette.tsx
│   │   └── LenisProvider.tsx
│   ├── ui/                 # Reusable UI components
│   │   ├── MagneticButton.tsx
│   │   ├── SpotlightCard.tsx
│   │   ├── FloatingPill.tsx
│   │   ├── ParticleField.tsx
│   │   └── SectionHeader.tsx
│   └── sections/           # Page sections
│       ├── Hero.tsx
│       ├── Projects.tsx
│       ├── Skills.tsx
│       ├── About.tsx
│       ├── GitHub.tsx
│       └── Contact.tsx
├── lib/
│   ├── utils.ts            # Utility functions
│   └── github.ts           # GitHub API helpers
```

---

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/darshanpurohit20/Darshan-Portfolio.git
cd Darshan-Portfolio

# Install dependencies
npm install

# Set up environment variables
cp .env.local.example .env.local
# Edit .env.local with your GitHub token (optional, for API rate limits)

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

### Build for Production

```bash
npm run build
npm start
```

---

## Environment Variables

```bash
# .env.local
GITHUB_TOKEN=your_github_personal_access_token  # Optional, increases API rate limit
NEXT_PUBLIC_SITE_URL=https://darshanpurohit.dev
```

---

## Design System

### Colors
- **Primary:** `#7c5cfc` (Purple)
- **Secondary:** `#3b82f6` (Blue)
- **Background:** `#080808` (Near Black)
- **Surface:** `#0d0d0f`, `#141416`
- **Text:** `#f5f5f5`, `#a1a1aa`, `#52525b`

### Typography
- **Display:** Space Grotesk
- **Body:** Inter

### Animations
- **Ease Spring:** `cubic-bezier(0.34, 1.56, 0.64, 1)`
- **Ease Out:** `cubic-bezier(0.16, 1, 0.3, 1)`
- **Grid Animation:** 20s infinite linear scroll

---

## Projects Featured

| Project | Tech Stack | Highlights |
|---------|------------|------------|
| **TIPE** | FastAPI, Pinecone, MongoDB, RAG | 30K+ trade records, semantic search, LLM chatbot |
| **StockFolio** | FastAPI, OCR, LLM | Live NSE data, AI-powered portfolio import |
| **ClipShare** | Flask, HTML/CSS/JS | Anonymous file sharing, QR codes, 1GB uploads |
| **Deepfake Detection** | PyTorch, ResNet50, BiLSTM, YOLOv8 | 88.89% accuracy, published at AGC 2026 |

---

## Key Achievements

- 🎓 **B.Tech IT** @ DJSCE — CGPA 9.11
- 🔬 **Research Paper** on Deepfake Detection presented at AGC 2026
- 💼 **Backend Developer Intern** @ Konnect Insights (Jan–Jun 2025)
- 🏆 **88.89%** Validation accuracy on deepfake detection system

---

## Contact

- 📧 **Email:** [darshanpurohit2513@gmail.com](mailto:darshanpurohit2513@gmail.com)
- 💼 **LinkedIn:** [linkedin.com/in/darshanpurohit](https://linkedin.com/in/darshanpurohit)
- 🐙 **GitHub:** [github.com/darshanpurohit20](https://github.com/darshanpurohit20)

---

## License

MIT License — feel free to use this as a template for your own portfolio.

---

<p align="center">
  Built with ❤️ by <strong>Darshan Purohit</strong>
</p>
