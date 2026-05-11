'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function Loader() {
  const [visible, setVisible] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(timer);
          setTimeout(() => setVisible(false), 600);
          return 100;
        }
        return p + Math.random() * 15;
      });
    }, 80);
    
    return () => clearInterval(timer);
  }, []);

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
            style={{ 
              fontFamily: 'var(--font-display)', 
              color: 'var(--purple)', 
              textShadow: 'var(--glow-purple)' 
            }}
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
  );
}
