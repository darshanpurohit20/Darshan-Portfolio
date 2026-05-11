'use client';

import { motion } from 'framer-motion';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { MagneticButton } from '@/components/ui/MagneticButton';
import { Mail, Github, Linkedin, ArrowUpRight } from 'lucide-react';

export function Contact() {
  return (
    <section id="contact" className="py-32 px-6 max-w-4xl mx-auto">
      <SectionHeader
        eyebrow="Contact"
        title="Let&apos;s build something intelligent."
        subtitle="Open to AI Engineering roles, research collaborations, and interesting problems."
      />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2 }}
        viewport={{ once: true }}
        className="mt-16 p-px rounded-2xl bg-gradient-to-br from-purple-500/30 via-blue-500/20 to-transparent"
      >
        <div className="rounded-2xl bg-[#0d0d0f] p-8 md:p-12">
          <p className="text-xl md:text-2xl font-display mb-8 text-center" style={{ fontFamily: 'var(--font-display)' }}>
            <span className="text-zinc-400">Ready to </span>
            <span className="text-white">collaborate</span>
            <span className="text-zinc-400">?</span>
          </p>
          
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <MagneticButton href="mailto:darshanpurohit2513@gmail.com" variant="primary" icon={<Mail size={16} />}>
              Send Email
            </MagneticButton>
            <MagneticButton href="https://linkedin.com/in/darshanpurohit" target="_blank" icon={<Linkedin size={16} />}>
              LinkedIn
            </MagneticButton>
            <MagneticButton href="https://github.com/darshanpurohit20" target="_blank" icon={<Github size={16} />}>
              GitHub
            </MagneticButton>
          </div>

          <div className="text-center">
            <a 
              href="mailto:darshanpurohit2513@gmail.com"
              className="text-lg md:text-xl text-zinc-300 hover:text-purple-400 transition-colors font-medium"
            >
              darshanpurohit2513@gmail.com
            </a>
            <p className="text-sm text-zinc-500 mt-4">
              Mumbai, India • Available for opportunities
            </p>
          </div>
        </div>
      </motion.div>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        viewport={{ once: true }}
        className="mt-24 pt-8 border-t border-white/[0.06] flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-zinc-500"
      >
        <p>© 2026 Darshan Purohit. Built with Next.js & Tailwind.</p>
        <div className="flex items-center gap-6">
          <a href="https://github.com/darshanpurohit20" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors flex items-center gap-1">
            GitHub <ArrowUpRight size={12} />
          </a>
          <a href="https://linkedin.com/in/darshanpurohit" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors flex items-center gap-1">
            LinkedIn <ArrowUpRight size={12} />
          </a>
        </div>
      </motion.footer>
    </section>
  );
}
