'use client';

import { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { FloatingPill } from '@/components/ui/FloatingPill';
import { MagneticButton } from '@/components/ui/MagneticButton';
import { Github, Linkedin, Download, ArrowDown } from 'lucide-react';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import dynamic from 'next/dynamic';

// Dynamic import for ParticleField to avoid SSR issues with Three.js
const ParticleField = dynamic(
  () => import('@/components/ui/ParticleField').then((mod) => mod.ParticleField),
  { ssr: false }
);

gsap.registerPlugin(ScrollTrigger);

const STATS = [
  { value: '9.11', label: 'CGPA' },
  { value: '30K+', label: 'Trade Records Processed' },
  { value: '88.89%', label: 'Deepfake Detection Accuracy' },
  { value: '52+', label: 'GitHub Repos' },
];

const PILLS = ['RAG Pipelines', 'FastAPI', 'Pinecone', 'PyTorch', 'Semantic Search', 'LLMs', 'YOLOv8', 'MongoDB'];

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  useGSAP(() => {
    gsap.fromTo('.hero-word > span', 
      { y: 100, opacity: 0 },
      { y: 0, opacity: 1, stagger: 0.08, duration: 1, ease: 'power4.out', delay: 2.2 }
    );
    gsap.fromTo('.hero-sub',
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 2.8 }
    );
    gsap.fromTo('.hero-actions',
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', delay: 3.1 }
    );
  }, { scope: ref });

  return (
    <section ref={ref} id="hero" className="relative min-h-[100vh] h-auto flex flex-col items-center justify-center overflow-hidden py-20 md:py-0">
      
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
      <motion.div style={{ y, opacity }} className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 text-center w-full">
        
        {/* Floating pills - responsive visibility */}
        <div className="flex flex-wrap justify-center gap-2 mb-4 md:mb-6 px-2 max-w-xl mx-auto">
          {PILLS.slice(0, 6).map((pill, i) => (
            <span key={pill} className={i >= 4 ? 'hidden sm:inline-block' : 'inline-block'}>
              <FloatingPill delay={i * 0.1 + 2.5}>{pill}</FloatingPill>
            </span>
          ))}
        </div>

        {/* Main headline - split into words for better animation */}
        <h1
          className="text-[clamp(1.75rem,6vw,4rem)] sm:text-[clamp(2.25rem,6.5vw,5rem)] md:text-[clamp(2.5rem,7vw,6rem)] font-display font-bold leading-[1.1] md:leading-[0.95] tracking-tight mb-4 md:mb-6 px-2"
          style={{ fontFamily: 'var(--font-display)' }}
          aria-label="Building Intelligent Systems for the Future."
        >
          {'Building Intelligent Systems for the Future.'.split(' ').map((word, i) => (
            <span key={i} className="hero-word inline-block mr-[0.25em] overflow-hidden">
              <span className="inline-block">{word}</span>
            </span>
          ))}
        </h1>

        {/* Typing subheading */}
        <div className="hero-sub max-w-3xl mx-auto mb-6 md:mb-8 px-4">
          <p className="text-sm sm:text-base text-zinc-400 leading-relaxed">
            <span className="block sm:inline">AI Engineer building RAG systems &amp; semantic search.</span>{' '}
            <span className="block sm:inline">Backend Developer scaling FastAPI infrastructure.</span>
            <span className="block mt-2 text-zinc-500">B.Tech IT @ DJSCE — CGPA 9.11</span>
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="hero-actions flex flex-col sm:flex-row flex-wrap items-center justify-center gap-3 sm:gap-4 mb-8 md:mb-12 px-4">
          <MagneticButton
            href="https://drive.google.com/uc?export=download&id=1M73nryK-kztxwNV2u8WSHeZVmSlpXhkx"
            target="_blank"
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

        {/* Animated stats - more compact */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3 md:gap-4 max-w-3xl mx-auto px-4">
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 3.0 + i * 0.08, duration: 0.5 }}
              className="border border-white/5 rounded-lg md:rounded-xl p-2 sm:p-3 backdrop-blur-sm bg-white/[0.02]"
            >
              <div 
                className="text-base sm:text-lg md:text-xl font-bold font-display" 
                style={{ fontFamily: 'var(--font-display)', color: 'var(--purple)' }}
              >
                {stat.value}
              </div>
              <div className="text-[10px] sm:text-xs text-zinc-500 mt-0.5">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Scroll indicator - hidden on small screens */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="hidden lg:flex absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex-col items-center gap-2 text-zinc-600"
      >
        <span className="text-xs tracking-widest uppercase">Scroll</span>
        <ArrowDown size={16} />
      </motion.div>
    </section>
  );
}
