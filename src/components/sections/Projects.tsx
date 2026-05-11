'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ExternalLink, Github, X } from 'lucide-react';
import { SpotlightCard } from '@/components/ui/SpotlightCard';
import { SectionHeader } from '@/components/ui/SectionHeader';

gsap.registerPlugin(ScrollTrigger);

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
  },
];

export function Projects() {
  const [selected, setSelected] = useState<typeof PROJECTS[0] | null>(null);
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.fromTo('.project-card',
      { y: 60, opacity: 0 },
      {
        y: 0, opacity: 1, stagger: 0.15, duration: 0.9, ease: 'power3.out',
        scrollTrigger: { trigger: ref.current, start: 'top 80%' }
      }
    );
  }, { scope: ref });

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
                  <h3 
                    className="text-2xl font-bold font-display" 
                    style={{ fontFamily: 'var(--font-display)', color: project.color }}
                  >
                    {project.title}
                  </h3>
                  <p className="text-zinc-400 text-sm mt-1">{project.subtitle}</p>
                </div>
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="p-2 rounded-lg border border-white/10 hover:border-white/25 transition-colors"
                >
                  <Github size={16} className="text-zinc-400" />
                </a>
              </div>

              {/* Description */}
              <p className="text-zinc-500 text-sm leading-relaxed mb-6 line-clamp-2">{project.description}</p>

              {/* Stats */}
              <div className="flex gap-4 mb-6">
                {project.stats.map((stat) => (
                  <div key={stat.label}>
                    <div className="text-lg font-bold" style={{ color: project.color }}>{stat.value}</div>
                    <div className="text-xs text-zinc-600">{stat.label}</div>
                  </div>
                ))}
              </div>

              {/* Tech badges */}
              <div className="flex flex-wrap gap-2">
                {project.tech.map((t) => (
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
  );
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
        onClick={(e) => e.stopPropagation()}
        className="max-w-2xl w-full rounded-2xl border border-white/10 bg-[#0d0d0f] p-8 relative"
        style={{ boxShadow: `0 0 80px ${project.color}20` }}
      >
        <button onClick={onClose} className="absolute top-4 right-4 p-2 rounded-lg hover:bg-white/5 transition-colors">
          <X size={16} className="text-zinc-400" />
        </button>

        <h3 
          className="text-3xl font-bold mb-1" 
          style={{ fontFamily: 'var(--font-display)', color: project.color }}
        >
          {project.title}
        </h3>
        <p className="text-zinc-400 mb-6">{project.subtitle}</p>
        <p className="text-zinc-300 leading-relaxed mb-8">{project.description}</p>

        <div className="mb-8">
          <h4 className="text-sm font-medium text-zinc-400 mb-4">Key Features</h4>
          <ul className="space-y-3">
            {project.features.map((f) => (
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
  );
}
