# Darshan Purohit — World-Class Portfolio: Full Implementation Guide

> AI Agent Instructions: Follow this guide sequentially. Every step is actionable. All code is production-ready.

---

## Stack Decision

| Layer | Choice | Why |
|---|---|---|
| Framework | Next.js 15 (App Router) | File-based routing, RSC, streaming |
| Styling | TailwindCSS v4 + CSS variables | Utility-first, design tokens |
| Animation | Framer Motion v11 + GSAP 3 | Motion for React, GSAP for scroll |
| Smooth Scroll | Lenis v2 | Best-in-class smooth scrolling |
| 3D | Three.js r165 + @react-three/fiber | WebGL particles/background |
| UI Primitives | shadcn/ui | Accessible base components |
| Effects | Aceternity UI patterns (manual) | Custom magnetic, spotlight, grid |
| Fonts | Satoshi + Clash Display (Fontshare) | Premium, modern, memorable |
| Icons | Lucide React | Clean SVG icons |
| Deployment | Vercel | Zero-config, edge network |

---

## Project Scaffold

```bash
npx create-next-app@latest darshan-portfolio \
  --typescript --tailwind --eslint --app --src-dir

cd darshan-portfolio

# Core deps
npm install framer-motion gsap @gsap/react lenis \
  three @react-three/fiber @react-three/drei \
  lucide-react clsx tailwind-merge \
  @radix-ui/react-dialog @radix-ui/react-tooltip \
  react-intersection-observer

# Dev deps
npm install -D @types/three
```

---

## Folder Structure

```
src/
  app/
    layout.tsx          ← Root layout (fonts, Lenis, cursor)
    page.tsx            ← Assembles all sections
    globals.css         ← CSS variables, Tailwind base
  components/
    layout/
      Cursor.tsx        ← Custom magnetic cursor
      Loader.tsx        ← Cinematic loading screen
      Navbar.tsx        ← Minimal floating nav
      CommandPalette.tsx ← ⌘K command palette
    sections/
      Hero.tsx
      About.tsx
      Projects.tsx
      Experience.tsx
      Skills.tsx
      GitHub.tsx
      Contact.tsx
    ui/
      MagneticButton.tsx
      SpotlightCard.tsx
      FloatingPill.tsx
      TextReveal.tsx
      ParticleField.tsx ← Three.js
      GlowBorder.tsx
      ProjectModal.tsx
      TypingEffect.tsx
  lib/
    utils.ts
    github.ts           ← GitHub API helpers
  hooks/
    useLenis.ts
    useMousePosition.ts
    useMagnet.ts
```

---

## 1. globals.css — Design Tokens

```css
@import "tailwindcss";

@font-face {
  font-family: 'Satoshi';
  src: url('/fonts/Satoshi-Variable.woff2') format('woff2');
  font-weight: 300 900;
}
@font-face {
  font-family: 'ClashDisplay';
  src: url('/fonts/ClashDisplay-Variable.woff2') format('woff2');
  font-weight: 200 700;
}

:root {
  --black: #080808;
  --surface: #0d0d0f;
  --surface-2: #141416;
  --border: rgba(255,255,255,0.07);
  --border-hover: rgba(255,255,255,0.15);
  --purple: #7c5cfc;
  --purple-dim: rgba(124,92,252,0.15);
  --blue: #3b82f6;
  --blue-dim: rgba(59,130,246,0.12);
  --glow-purple: 0 0 60px rgba(124,92,252,0.4);
  --glow-blue: 0 0 60px rgba(59,130,246,0.3);
  --text: #f5f5f5;
  --text-2: #a1a1aa;
  --text-3: #52525b;
  --font-display: 'ClashDisplay', sans-serif;
  --font-body: 'Satoshi', sans-serif;
  --ease-spring: cubic-bezier(0.34, 1.56, 0.64, 1);
  --ease-out: cubic-bezier(0.16, 1, 0.3, 1);
}

* { box-sizing: border-box; margin: 0; padding: 0; }
html { scroll-behavior: auto; } /* Lenis handles smooth */
body {
  background: var(--black);
  color: var(--text);
  font-family: var(--font-body);
  overflow-x: hidden;
  cursor: none; /* Custom cursor active */
}

::selection { background: var(--purple-dim); color: var(--purple); }

/* Noise texture overlay */
body::before {
  content: '';
  position: fixed;
  inset: 0;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E");
  pointer-events: none;
  z-index: 9999;
  opacity: 0.35;
}
```

---

## 2. Root layout.tsx

```tsx
import type { Metadata } from 'next'
import './globals.css'
import { Cursor } from '@/components/layout/Cursor'
import { Loader } from '@/components/layout/Loader'
import { Navbar } from '@/components/layout/Navbar'
import { CommandPalette } from '@/components/layout/CommandPalette'
import { LenisProvider } from '@/components/layout/LenisProvider'

export const metadata: Metadata = {
  title: 'Darshan Purohit — AI Engineer & Backend Developer',
  description: 'Building intelligent systems for the future. RAG pipelines, semantic search, deepfake detection, scalable AI infrastructure.',
  openGraph: {
    title: 'Darshan Purohit',
    description: 'AI Engineer & Backend Developer',
    images: ['/og.png'],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <LenisProvider>
          <Loader />
          <Cursor />
          <CommandPalette />
          <Navbar />
          <main>{children}</main>
        </LenisProvider>
      </body>
    </html>
  )
}
```

---

## 3. LenisProvider.tsx

```tsx
'use client'
import { useEffect, useRef } from 'react'
import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function LenisProvider({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null)

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    })
    lenisRef.current = lenis

    lenis.on('scroll', ScrollTrigger.update)

    gsap.ticker.add((time) => lenis.raf(time * 1000))
    gsap.ticker.lagSmoothing(0)

    return () => {
      lenis.destroy()
      gsap.ticker.remove((time) => lenis.raf(time * 1000))
    }
  }, [])

  return <>{children}</>
}
```

---

## 4. Cursor.tsx — Custom Magnetic Cursor

```tsx
'use client'
import { useEffect, useRef } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export function Cursor() {
  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)
  const springX = useSpring(cursorX, { stiffness: 500, damping: 30 })
  const springY = useSpring(cursorY, { stiffness: 500, damping: 30 })
  const dotX = useSpring(cursorX, { stiffness: 2000, damping: 60 })
  const dotY = useSpring(cursorY, { stiffness: 2000, damping: 60 })
  const scaleRef = useRef(1)

  useEffect(() => {
    const move = (e: MouseEvent) => {
      cursorX.set(e.clientX - 16)
      cursorY.set(e.clientY - 16)
    }
    const enter = () => scaleRef.current = 1.8
    const leave = () => scaleRef.current = 1

    window.addEventListener('mousemove', move)
    document.querySelectorAll('a,button,[data-cursor-grow]').forEach(el => {
      el.addEventListener('mouseenter', enter)
      el.addEventListener('mouseleave', leave)
    })

    return () => window.removeEventListener('mousemove', move)
  }, [])

  return (
    <>
      {/* Outer ring */}
      <motion.div
        style={{ x: springX, y: springY }}
        className="fixed top-0 left-0 w-8 h-8 rounded-full border border-purple-500/50 pointer-events-none z-[9998] mix-blend-difference"
      />
      {/* Inner dot */}
      <motion.div
        style={{ x: dotX, y: dotY }}
        className="fixed top-0 left-0 w-8 h-8 flex items-center justify-center pointer-events-none z-[9998]"
      >
        <div className="w-1.5 h-1.5 rounded-full bg-white" />
      </motion.div>
    </>
  )
}
```

---

## 5. Loader.tsx — Cinematic Loading Screen

```tsx
'use client'
import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export function Loader() {
  const [visible, setVisible] = useState(true)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(p => {
        if (p >= 100) { clearInterval(timer); setTimeout(() => setVisible(false), 600); return 100 }
        return p + Math.random() * 15
      })
    }, 80)
    return () => clearInterval(timer)
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[99999] bg-[#080808] flex flex-col items-center justify-center"
        >
          {/* Glowing logo / initials */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-6xl font-display font-bold mb-12"
            style={{ fontFamily: 'var(--font-display)', color: 'var(--purple)', textShadow: 'var(--glow-purple)' }}
          >
            DP
          </motion.div>

          {/* Progress bar */}
          <div className="w-48 h-px bg-white/10 relative overflow-hidden">
            <motion.div
              className="absolute left-0 top-0 h-full bg-gradient-to-r from-purple-500 to-blue-500"
              style={{ width: `${Math.min(progress, 100)}%` }}
              transition={{ duration: 0.1 }}
            />
          </div>

          {/* Counter */}
          <motion.p className="mt-4 text-xs text-zinc-600 tabular-nums">
            {Math.floor(Math.min(progress, 100)).toString().padStart(3, '0')}
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
```

---

## 6. Hero Section — Full Implementation

```tsx
'use client'
import { useEffect, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Canvas } from '@react-three/fiber'
import { ParticleField } from '@/components/ui/ParticleField'
import { MagneticButton } from '@/components/ui/MagneticButton'
import { TypingEffect } from '@/components/ui/TypingEffect'
import { FloatingPill } from '@/components/ui/FloatingPill'
import { Github, Linkedin, Download, ArrowDown } from 'lucide-react'
import { gsap } from 'gsap'

const STATS = [
  { value: '9.11', label: 'CGPA' },
  { value: '30K+', label: 'Trade Records Processed' },
  { value: '88.89%', label: 'Deepfake Detection Accuracy' },
  { value: '52+', label: 'GitHub Repos' },
]

const PILLS = ['RAG Pipelines', 'FastAPI', 'Pinecone', 'PyTorch', 'Semantic Search', 'LLMs', 'YOLOv8', 'MongoDB']

export function Hero() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0])

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.hero-char', 
        { y: 120, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.015, duration: 1.2, ease: 'power4.out', delay: 2.2 }
      )
      gsap.fromTo('.hero-sub',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 2.8 }
      )
      gsap.fromTo('.hero-actions',
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', delay: 3.1 }
      )
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={ref} id="hero" className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      
      {/* Three.js particle background */}
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 5] }}>
          <ParticleField />
        </Canvas>
      </div>

      {/* Animated gradient radial */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(124,92,252,0.15),rgba(0,0,0,0))]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_80%_80%,rgba(59,130,246,0.08),transparent)]" />
      </div>

      {/* Moving grid */}
      <div
        className="absolute inset-0 z-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(var(--text) 1px, transparent 1px), linear-gradient(90deg, var(--text) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
          animation: 'gridMove 20s linear infinite',
        }}
      />

      {/* Content */}
      <motion.div style={{ y, opacity }} className="relative z-10 max-w-6xl mx-auto px-6 text-center">
        
        {/* Floating pills */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {PILLS.map((pill, i) => (
            <FloatingPill key={pill} delay={i * 0.1 + 2.5}>{pill}</FloatingPill>
          ))}
        </div>

        {/* Main headline — split into chars for GSAP */}
        <h1
          className="text-[clamp(3rem,10vw,8rem)] font-display font-bold leading-[0.9] tracking-tight mb-8 overflow-hidden"
          style={{ fontFamily: 'var(--font-display)' }}
          aria-label="Building Intelligent Systems for the Future."
        >
          {'Building Intelligent Systems for the Future.'.split('').map((char, i) => (
            <span key={i} className="hero-char inline-block" style={{ whiteSpace: char === ' ' ? 'pre' : 'normal' }}>
              {char}
            </span>
          ))}
        </h1>

        {/* Typing subheading */}
        <div className="hero-sub max-w-3xl mx-auto mb-12">
          <p className="text-[clamp(1rem,2vw,1.25rem)] text-zinc-400 leading-relaxed">
            <TypingEffect
              strings={[
                'AI Engineer building RAG systems & semantic search.',
                'Backend Developer scaling FastAPI infrastructure.',
                'Research Enthusiast in deepfake detection.',
                'B.Tech IT @ DJSCE — CGPA 9.11',
              ]}
              speed={50}
              deleteSpeed={30}
              pause={2000}
            />
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="hero-actions flex flex-wrap items-center justify-center gap-4 mb-20">
          <MagneticButton
            href="/Darshan_Purohit_Resume.pdf"
            download
            variant="primary"
            icon={<Download size={16} />}
          >
            Download Resume
          </MagneticButton>
          <MagneticButton href="https://github.com/darshanpurohit20" target="_blank" icon={<Github size={16} />}>
            GitHub
          </MagneticButton>
          <MagneticButton href="https://linkedin.com/in/darshanpurohit" target="_blank" icon={<Linkedin size={16} />}>
            LinkedIn
          </MagneticButton>
        </div>

        {/* Animated stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 3.3 + i * 0.1, duration: 0.6 }}
              className="border border-white/5 rounded-xl p-4 backdrop-blur-sm bg-white/[0.02]"
            >
              <div className="text-2xl font-bold font-display text-white" style={{ fontFamily: 'var(--font-display)', color: 'var(--purple)' }}>
                {stat.value}
              </div>
              <div className="text-xs text-zinc-500 mt-1">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-zinc-600"
      >
        <span className="text-xs tracking-widest uppercase">Scroll</span>
        <ArrowDown size={16} />
      </motion.div>
    </section>
  )
}
```

---

## 7. ParticleField.tsx — Three.js Background

```tsx
'use client'
import { useRef, useMemo } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

export function ParticleField() {
  const ref = useRef<THREE.Points>(null)
  const { mouse } = useThree()

  const [positions, colors] = useMemo(() => {
    const count = 2000
    const pos = new Float32Array(count * 3)
    const col = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      pos[i * 3]     = (Math.random() - 0.5) * 20
      pos[i * 3 + 1] = (Math.random() - 0.5) * 20
      pos[i * 3 + 2] = (Math.random() - 0.5) * 10
      // Purple to blue gradient
      const t = Math.random()
      col[i * 3]     = 0.48 + t * (0.23 - 0.48)
      col[i * 3 + 1] = 0.36 + t * (0.51 - 0.36)
      col[i * 3 + 2] = 0.98 + t * (0.96 - 0.98)
    }
    return [pos, col]
  }, [])

  useFrame((_, delta) => {
    if (!ref.current) return
    ref.current.rotation.y += delta * 0.02
    ref.current.rotation.x += delta * 0.01
    // Subtle mouse parallax
    ref.current.position.x += (mouse.x * 0.5 - ref.current.position.x) * 0.05
    ref.current.position.y += (mouse.y * 0.5 - ref.current.position.y) * 0.05
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.025} vertexColors transparent opacity={0.6} sizeAttenuation />
    </points>
  )
}
```

---

## 8. MagneticButton.tsx

```tsx
'use client'
import { useRef } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface Props {
  children: React.ReactNode
  href?: string
  download?: boolean
  target?: string
  variant?: 'primary' | 'ghost'
  icon?: React.ReactNode
  onClick?: () => void
}

export function MagneticButton({ children, href, variant = 'ghost', icon, onClick, ...props }: Props) {
  const ref = useRef<HTMLAnchorElement | HTMLButtonElement>(null)
  const xRef = useRef(0)
  const yRef = useRef(0)

  const handleMouse = (e: React.MouseEvent) => {
    const rect = ref.current!.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2
    xRef.current = x * 0.3
    yRef.current = y * 0.3
  }

  const handleLeave = () => {
    xRef.current = 0
    yRef.current = 0
  }

  const className = cn(
    'relative flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium transition-all duration-300',
    variant === 'primary'
      ? 'bg-purple-600 text-white hover:bg-purple-500 shadow-[0_0_30px_rgba(124,92,252,0.4)]'
      : 'border border-white/10 text-zinc-300 hover:border-white/25 hover:text-white backdrop-blur-sm bg-white/[0.03]'
  )

  const content = (
    <motion.span
      animate={{ x: xRef.current, y: yRef.current }}
      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      className={className}
      onMouseMove={handleMouse}
      onMouseLeave={handleLeave}
    >
      {icon}
      {children}
    </motion.span>
  )

  if (href) {
    return <a ref={ref as any} href={href} {...props}>{content}</a>
  }
  return <button ref={ref as any} onClick={onClick}>{content}</button>
}
```

---

## 9. Projects Section — Full Implementation

```tsx
'use client'
import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ExternalLink, Github, X } from 'lucide-react'
import { SpotlightCard } from '@/components/ui/SpotlightCard'

gsap.registerPlugin(ScrollTrigger)

export const PROJECTS = [
  {
    id: 'tipe',
    title: 'TIPE',
    subtitle: 'AI Trade Intelligence Platform',
    date: 'Feb 2026',
    description: 'FastAPI-based backend for AI-powered trade intelligence featuring authentication, lead management, semantic search, and real-time trade analytics.',
    tech: ['Python', 'FastAPI', 'Pinecone', 'MongoDB', 'RAG', 'LLM'],
    stats: [
      { value: '30K+', label: 'Trade Records' },
      { value: 'RAG', label: 'Chatbot' },
      { value: 'B2B', label: 'Matchmaking' },
    ],
    color: '#7c5cfc',
    gradient: 'from-purple-600/20 via-purple-500/5 to-transparent',
    github: 'https://github.com/darshanpurohit20/Tipe',
    features: [
      'RAG-powered chatbot using Pinecone vector search',
      'LLM-based response generation for trade queries',
      'Semantic lead retrieval and intelligent B2B matchmaking',
      'Real-time trade analytics and news summarization',
    ],
    mockup: 'trade-dashboard',
  },
  {
    id: 'stockfolio',
    title: 'StockFolio',
    subtitle: 'Real-Time Portfolio Analytics',
    date: 'Apr 2026 – Present',
    description: 'Real-time portfolio analytics platform tracking individual stock performance using live NSE market data with AI-powered import via OCR + LLM.',
    tech: ['Python', 'FastAPI', 'Data Analytics', 'OCR', 'LLM'],
    stats: [
      { value: 'Live', label: 'NSE Data' },
      { value: 'OCR', label: 'Import' },
      { value: 'P&L', label: 'Insights' },
    ],
    color: '#3b82f6',
    gradient: 'from-blue-600/20 via-blue-500/5 to-transparent',
    github: 'https://github.com/darshanpurohit20/Portfolio_Insights',
    features: [
      '52-week range, day high/low, sector allocation',
      'Concurrent data fetching and caching',
      'AI-powered portfolio import via broker screenshots',
      'Portfolio-level P&L insights and analytics',
    ],
    mockup: 'portfolio-dashboard',
  },
  {
    id: 'clipshare',
    title: 'ClipShare',
    subtitle: 'Anonymous File & Text Sharing',
    date: 'Apr 2025',
    description: 'Anonymous file and text sharing platform with secure one-time access codes, QR-based sharing, and configurable auto-expiry.',
    tech: ['Python', 'Flask', 'HTML', 'CSS', 'JavaScript'],
    stats: [
      { value: '1GB', label: 'Max Upload' },
      { value: 'QR', label: 'Sharing' },
      { value: '0', label: 'Login Required' },
    ],
    color: '#10b981',
    gradient: 'from-emerald-600/20 via-emerald-500/5 to-transparent',
    github: 'https://github.com/darshanpurohit20/ClipShare',
    features: [
      'Secure one-time access codes',
      'QR-based sharing for instant mobile access',
      'Configurable auto-expiry timers',
      'Multi-file uploads up to 1GB with ZIP bundling',
    ],
    mockup: 'sharing-ui',
  },
  {
    id: 'deepfake',
    title: 'Deepfake Detection',
    subtitle: 'High-Fidelity Detection System',
    date: 'Aug 2024 – Dec 2025',
    description: 'Spatiotemporal deepfake detection framework combining ResNet50 spatial features and BiLSTM temporal modeling. Presented at AGC 2026.',
    tech: ['Python', 'ResNet50', 'BiLSTM', 'YOLOv8', 'PyTorch'],
    stats: [
      { value: '88.89%', label: 'Val Accuracy' },
      { value: '86%', label: 'Test Accuracy' },
      { value: '3', label: 'Datasets' },
    ],
    color: '#f59e0b',
    gradient: 'from-amber-600/20 via-amber-500/5 to-transparent',
    github: 'https://github.com/darshanpurohit20/deepfake_detection',
    features: [
      'ResNet50 for spatial feature extraction',
      'BiLSTM for temporal sequence modeling',
      'YOLOv8-based face detection pipeline',
      'Trained on Celeb-DF, FaceForensics++, DFDC',
    ],
    mockup: 'ml-dashboard',
  },
]

export function Projects() {
  const [selected, setSelected] = useState<typeof PROJECTS[0] | null>(null)
  const ref = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    gsap.fromTo('.project-card',
      { y: 60, opacity: 0 },
      {
        y: 0, opacity: 1, stagger: 0.15, duration: 0.9, ease: 'power3.out',
        scrollTrigger: { trigger: ref.current, start: 'top 80%' }
      }
    )
  }, { scope: ref })

  return (
    <section ref={ref} id="projects" className="py-32 px-6 max-w-7xl mx-auto">
      <SectionHeader
        eyebrow="Work"
        title="Projects that matter."
        subtitle="Real systems. Real data. Real impact."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
        {PROJECTS.map((project) => (
          <SpotlightCard
            key={project.id}
            className="project-card cursor-pointer group"
            color={project.color}
            onClick={() => setSelected(project)}
          >
            {/* Card gradient top */}
            <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
            
            <div className="relative p-8">
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div>
                  <p className="text-xs text-zinc-500 mb-2">{project.date}</p>
                  <h3 className="text-2xl font-bold font-display" style={{ fontFamily: 'var(--font-display)', color: project.color }}>
                    {project.title}
                  </h3>
                  <p className="text-zinc-400 text-sm mt-1">{project.subtitle}</p>
                </div>
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={e => e.stopPropagation()}
                  className="p-2 rounded-lg border border-white/10 hover:border-white/25 transition-colors"
                >
                  <Github size={16} className="text-zinc-400" />
                </a>
              </div>

              {/* Description */}
              <p className="text-zinc-500 text-sm leading-relaxed mb-6 line-clamp-2">{project.description}</p>

              {/* Stats */}
              <div className="flex gap-4 mb-6">
                {project.stats.map(stat => (
                  <div key={stat.label}>
                    <div className="text-lg font-bold" style={{ color: project.color }}>{stat.value}</div>
                    <div className="text-xs text-zinc-600">{stat.label}</div>
                  </div>
                ))}
              </div>

              {/* Tech badges */}
              <div className="flex flex-wrap gap-2">
                {project.tech.map(t => (
                  <span key={t} className="px-2 py-1 rounded-md text-xs border border-white/[0.06] text-zinc-400 bg-white/[0.03]">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </SpotlightCard>
        ))}
      </div>

      {/* Project Detail Modal */}
      <AnimatePresence>
        {selected && (
          <ProjectModal project={selected} onClose={() => setSelected(null)} />
        )}
      </AnimatePresence>
    </section>
  )
}

function ProjectModal({ project, onClose }: { project: typeof PROJECTS[0]; onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/80 backdrop-blur-md"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        onClick={e => e.stopPropagation()}
        className="max-w-2xl w-full rounded-2xl border border-white/10 bg-[#0d0d0f] p-8 relative"
        style={{ boxShadow: `0 0 80px ${project.color}20` }}
      >
        <button onClick={onClose} className="absolute top-4 right-4 p-2 rounded-lg hover:bg-white/5 transition-colors">
          <X size={16} className="text-zinc-400" />
        </button>

        <h3 className="text-3xl font-bold mb-1" style={{ fontFamily: 'var(--font-display)', color: project.color }}>
          {project.title}
        </h3>
        <p className="text-zinc-400 mb-6">{project.subtitle}</p>
        <p className="text-zinc-300 leading-relaxed mb-8">{project.description}</p>

        <div className="mb-8">
          <h4 className="text-sm font-medium text-zinc-400 mb-4">Key Features</h4>
          <ul className="space-y-3">
            {project.features.map(f => (
              <li key={f} className="flex items-start gap-3 text-sm text-zinc-300">
                <span className="mt-1 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: project.color }} />
                {f}
              </li>
            ))}
          </ul>
        </div>

        <div className="flex gap-3">
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm border border-white/10 hover:border-white/25 transition-colors text-zinc-300"
          >
            <Github size={16} /> View on GitHub
          </a>
        </div>
      </motion.div>
    </motion.div>
  )
}
```

---

## 10. SpotlightCard.tsx — Mouse-Tracking Glow

```tsx
'use client'
import { useRef, MouseEvent } from 'react'
import { cn } from '@/lib/utils'

interface Props {
  children: React.ReactNode
  className?: string
  color?: string
  onClick?: () => void
}

export function SpotlightCard({ children, className, color = '#7c5cfc', onClick }: Props) {
  const ref = useRef<HTMLDivElement>(null)

  const handleMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = ref.current!.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    ref.current!.style.setProperty('--mouse-x', `${x}px`)
    ref.current!.style.setProperty('--mouse-y', `${y}px`)
    ref.current!.style.setProperty('--spotlight-color', color + '25')
  }

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onClick={onClick}
      className={cn(
        'relative rounded-2xl border border-white/[0.06] bg-[#0d0d0f] overflow-hidden transition-all duration-300 hover:border-white/12',
        'before:absolute before:inset-0 before:opacity-0 before:transition-opacity before:duration-300 hover:before:opacity-100',
        className
      )}
      style={{
        '--spotlight-color': color + '20',
      } as any}
    >
      {/* Spotlight effect via pseudo-element (handled with inline style trick) */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{
          background: `radial-gradient(600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), var(--spotlight-color, rgba(124,92,252,0.1)), transparent 40%)`,
        }}
      />
      {children}
    </div>
  )
}
```

---

## 11. Skills Section — Orbit Animation

```tsx
'use client'
import { motion } from 'framer-motion'

const SKILLS = {
  'AI / ML': {
    color: '#7c5cfc',
    items: ['PyTorch', 'RAG', 'LLMs', 'YOLOv8', 'ResNet50', 'BiLSTM', 'Pinecone', 'Embeddings'],
  },
  'Backend': {
    color: '#3b82f6',
    items: ['FastAPI', 'Flask', 'RESTful APIs', 'Python', 'Docker', 'C++'],
  },
  'Databases': {
    color: '#10b981',
    items: ['MongoDB', 'MySQL', 'Pinecone', 'Vector DB'],
  },
  'Tools': {
    color: '#f59e0b',
    items: ['Git', 'Docker', 'VS Code', 'Postman', 'Jupyter', 'Streamlit'],
  },
}

export function Skills() {
  return (
    <section id="skills" className="py-32 px-6 max-w-7xl mx-auto">
      <SectionHeader eyebrow="Capabilities" title="Built to build." subtitle="The toolkit behind the systems." />
      
      <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {Object.entries(SKILLS).map(([category, { color, items }], ci) => (
          <motion.div
            key={category}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: ci * 0.1, duration: 0.6 }}
            viewport={{ once: true }}
            className="rounded-2xl border border-white/[0.06] bg-[#0d0d0f] p-6"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-2 h-2 rounded-full" style={{ background: color, boxShadow: `0 0 10px ${color}` }} />
              <span className="text-sm font-medium text-zinc-300">{category}</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {items.map((skill, i) => (
                <motion.span
                  key={skill}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: ci * 0.1 + i * 0.05 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.05, borderColor: color }}
                  className="px-3 py-1.5 rounded-lg text-xs text-zinc-400 border border-white/[0.06] bg-white/[0.02] transition-colors cursor-default"
                >
                  {skill}
                </motion.span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
```

---

## 12. CommandPalette.tsx — ⌘K

```tsx
'use client'
import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Github, Linkedin, Download, Home, Briefcase, User, Mail } from 'lucide-react'

const COMMANDS = [
  { label: 'Go to Hero', icon: Home, action: () => document.getElementById('hero')?.scrollIntoView({ behavior: 'smooth' }) },
  { label: 'View Projects', icon: Briefcase, action: () => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' }) },
  { label: 'About Me', icon: User, action: () => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' }) },
  { label: 'Contact', icon: Mail, action: () => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }) },
  { label: 'GitHub Profile', icon: Github, action: () => window.open('https://github.com/darshanpurohit20', '_blank') },
  { label: 'LinkedIn', icon: Linkedin, action: () => window.open('https://linkedin.com/in/darshanpurohit', '_blank') },
  { label: 'Download Resume', icon: Download, action: () => window.open('/Darshan_Purohit_Resume.pdf', '_blank') },
]

export function CommandPalette() {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setOpen(o => !o)
      }
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [])

  const filtered = COMMANDS.filter(c => c.label.toLowerCase().includes(query.toLowerCase()))

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[9990] flex items-start justify-center pt-[20vh] bg-black/60 backdrop-blur-sm"
          onClick={() => setOpen(false)}
        >
          <motion.div
            initial={{ scale: 0.95, y: -10, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.95, y: -10, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            onClick={e => e.stopPropagation()}
            className="w-full max-w-lg rounded-2xl border border-white/10 bg-[#0d0d0f] overflow-hidden shadow-2xl"
          >
            <div className="flex items-center gap-3 px-4 py-3 border-b border-white/5">
              <Search size={16} className="text-zinc-500" />
              <input
                autoFocus
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="Search commands…"
                className="flex-1 bg-transparent text-sm text-zinc-300 placeholder-zinc-600 outline-none"
              />
              <kbd className="text-xs text-zinc-600 border border-white/10 rounded px-1.5 py-0.5">ESC</kbd>
            </div>
            <div className="p-2">
              {filtered.map(cmd => (
                <button
                  key={cmd.label}
                  onClick={() => { cmd.action(); setOpen(false) }}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-zinc-300 hover:bg-white/[0.05] hover:text-white transition-colors text-left"
                >
                  <cmd.icon size={16} className="text-zinc-500" />
                  {cmd.label}
                </button>
              ))}
            </div>
            <div className="px-4 py-2 border-t border-white/5 flex gap-4 text-xs text-zinc-600">
              <span>⌘K to toggle</span>
              <span>↑↓ navigate</span>
              <span>↵ select</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
```

---

## 13. GitHub Section — API Integration

```tsx
// lib/github.ts
export async function getGitHubData(username: string) {
  const [user, repos] = await Promise.all([
    fetch(`https://api.github.com/users/${username}`, {
      headers: { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` },
      next: { revalidate: 3600 }
    }).then(r => r.json()),
    fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=6`, {
      headers: { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` },
      next: { revalidate: 3600 }
    }).then(r => r.json()),
  ])
  return { user, repos }
}

// In GitHub section — use as Server Component
import { getGitHubData } from '@/lib/github'

export async function GitHubSection() {
  const { user, repos } = await getGitHubData('darshanpurohit20')
  // Render repos as animated cards
  // Link to contribution graph via GitHub README stats API
}
```

---

## 14. Contact Section

```tsx
export function Contact() {
  return (
    <section id="contact" className="py-32 px-6 max-w-4xl mx-auto text-center">
      <SectionHeader
        eyebrow="Contact"
        title="Let's build something intelligent."
        subtitle="Open to AI Engineering roles, research collaborations, and interesting problems."
      />

      <div className="mt-16 p-px rounded-2xl bg-gradient-to-br from-purple-500/30 via-blue-500/20 to-transparent">
        <div className="rounded-2xl bg-[#0d0d0f] p-12">
          <p className="text-2xl font-display mb-8" style={{ fontFamily: 'var(--font-display)' }}>
            darshanpurohit2513@gmail.com
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <MagneticButton href="mailto:darshanpurohit2513@gmail.com" variant="primary">
              Send Email
            </MagneticButton>
            <MagneticButton href="https://linkedin.com/in/darshanpurohit" target="_blank">
              LinkedIn
            </MagneticButton>
            <MagneticButton href="https://github.com/darshanpurohit20" target="_blank">
              GitHub
            </MagneticButton>
          </div>
        </div>
      </div>
    </section>
  )
}
```

---

## 15. SectionHeader Component

```tsx
interface Props { eyebrow: string; title: string; subtitle?: string }

export function SectionHeader({ eyebrow, title, subtitle }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
      className="mb-4"
    >
      <p className="text-xs uppercase tracking-widest text-purple-400 mb-4">{eyebrow}</p>
      <h2
        className="text-[clamp(2.5rem,6vw,5rem)] font-bold leading-tight"
        style={{ fontFamily: 'var(--font-display)' }}
      >
        {title}
      </h2>
      {subtitle && <p className="text-zinc-400 text-lg mt-4">{subtitle}</p>}
    </motion.div>
  )
}
```

---

## 16. FloatingPill.tsx

```tsx
interface Props { children: string; delay?: number }

export function FloatingPill({ children, delay = 0 }: Props) {
  return (
    <motion.span
      initial={{ opacity: 0, y: 10, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay, duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
      whileHover={{ y: -2, scale: 1.05 }}
      className="px-3 py-1.5 rounded-full text-xs border border-white/[0.08] text-zinc-500 bg-white/[0.02] cursor-default"
    >
      {children}
    </motion.span>
  )
}
```

---

## 17. GSAP CSS for Grid Animation

```css
/* In globals.css */
@keyframes gridMove {
  0% { background-position: 0 0; }
  100% { background-position: 60px 60px; }
}

@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-8px); }
}
```

---

## 18. Environment Variables

```bash
# .env.local
GITHUB_TOKEN=your_github_personal_access_token
NEXT_PUBLIC_SITE_URL=https://darshanpurohit.dev
```

---

## 19. Vercel Deployment

```bash
npm run build      # Verify no errors
npx vercel         # Deploy
```

Add these to Vercel dashboard → Environment Variables:
- `GITHUB_TOKEN`
- `NEXT_PUBLIC_SITE_URL`

---

## 20. Performance Checklist

- [ ] `next/image` for all images with `priority` on hero
- [ ] `loading="lazy"` on below-fold sections
- [ ] Three.js Canvas wrapped in `Suspense` with fallback
- [ ] GSAP imports via dynamic() for SSR safety: `const { gsap } = await import('gsap')`
- [ ] Font preload in `<head>` via `next/font` or `<link rel="preload">`
- [ ] `will-change: transform` only on actively animated elements
- [ ] `@media (prefers-reduced-motion: reduce)` disables GSAP and Framer animations
- [ ] Vercel Analytics + Speed Insights: `npm install @vercel/analytics @vercel/speed-insights`

---

## 21. Easter Eggs (Optional)

```tsx
// In useEffect on layout
const KONAMI = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a']
let idx = 0
window.addEventListener('keydown', (e) => {
  if (e.key === KONAMI[idx]) {
    idx++
    if (idx === KONAMI.length) {
      // Show secret easter egg toast / animation
      idx = 0
    }
  } else { idx = 0 }
})
```

---

## Summary

This guide gives an AI agent everything needed to produce a production-grade portfolio. Copy each section into the corresponding file. The key differentiators are:

1. **Lenis + GSAP ScrollTrigger** — buttery smooth scrolling with precise scroll-driven animations
2. **Three.js particle field** — subtle WebGL background that responds to mouse
3. **SpotlightCard** — mouse-tracking radial glow per card
4. **MagneticButton** — spring-physics cursor attraction
5. **Command Palette** — ⌘K power-user UX
6. **Cinematic loader** — sets tone before content loads
7. **Custom cursor** — zero friction brand touchpoint

Each component is self-contained, typed, and ready to drop in.