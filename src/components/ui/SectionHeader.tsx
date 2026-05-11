'use client';

import { motion } from 'framer-motion';

interface Props { 
  eyebrow: string; 
  title: string; 
  subtitle?: string;
}

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
  );
}
