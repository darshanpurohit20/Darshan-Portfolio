'use client';

import { motion } from 'framer-motion';

interface Props { 
  children: string; 
  delay?: number;
}

export function FloatingPill({ children, delay = 0 }: Props) {
  return (
    <motion.span
      initial={{ opacity: 0, y: 10, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay, duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
      whileHover={{ y: -2, scale: 1.05, borderColor: 'rgba(124,92,252,0.3)' }}
      className="px-3 py-1.5 rounded-full text-xs border border-white/[0.08] text-zinc-500 bg-white/[0.02] cursor-default transition-colors"
    >
      {children}
    </motion.span>
  );
}
