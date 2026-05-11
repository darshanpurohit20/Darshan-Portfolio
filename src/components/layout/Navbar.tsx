'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Github, Linkedin, FileText } from 'lucide-react';

const NAV_LINKS = [
  { label: 'Projects', href: '#projects' },
  { label: 'Skills', href: '#skills' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 3, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-6 left-1/2 -translate-x-1/2 z-[100] transition-all duration-300 ${
          scrolled ? 'translate-y-0' : ''
        }`}
      >
        <div className="flex items-center gap-1 px-2 py-2 rounded-full border border-white/10 bg-[#0d0d0f]/80 backdrop-blur-md">
          {/* Logo */}
          <a
            href="#hero"
            className="px-4 py-2 text-sm font-display font-medium text-white hover:text-purple-400 transition-colors"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            DP
          </a>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="px-4 py-2 text-sm text-zinc-400 hover:text-white transition-colors rounded-full hover:bg-white/5"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="h-4 w-px bg-white/10 mx-2 hidden md:block" />

          {/* Social Links */}
          <div className="hidden md:flex items-center gap-1">
            <a
              href="https://github.com/darshanpurohit20"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-zinc-400 hover:text-white transition-colors rounded-full hover:bg-white/5"
            >
              <Github size={16} />
            </a>
            <a
              href="https://linkedin.com/in/darshanpurohit"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-zinc-400 hover:text-white transition-colors rounded-full hover:bg-white/5"
            >
              <Linkedin size={16} />
            </a>
            <a
              href="/Darshan_Purohit_Resume.pdf"
              download
              className="p-2 text-zinc-400 hover:text-purple-400 transition-colors rounded-full hover:bg-white/5"
            >
              <FileText size={16} />
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-zinc-400 hover:text-white transition-colors rounded-full hover:bg-white/5"
          >
            {isOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-24 left-1/2 -translate-x-1/2 z-[99] w-[90%] max-w-sm md:hidden"
          >
            <div className="rounded-2xl border border-white/10 bg-[#0d0d0f]/95 backdrop-blur-md p-4">
              <div className="flex flex-col gap-2">
                {NAV_LINKS.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="px-4 py-3 text-sm text-zinc-400 hover:text-white transition-colors rounded-xl hover:bg-white/5"
                  >
                    {link.label}
                  </a>
                ))}
                <div className="h-px bg-white/10 my-2" />
                <div className="flex items-center gap-2 px-4">
                  <a
                    href="https://github.com/darshanpurohit20"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 text-zinc-400 hover:text-white transition-colors rounded-full hover:bg-white/5"
                  >
                    <Github size={18} />
                  </a>
                  <a
                    href="https://linkedin.com/in/darshanpurohit"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 text-zinc-400 hover:text-white transition-colors rounded-full hover:bg-white/5"
                  >
                    <Linkedin size={18} />
                  </a>
                  <a
                    href="/Darshan_Purohit_Resume.pdf"
                    download
                    className="flex items-center gap-2 px-3 py-2 text-sm text-zinc-400 hover:text-purple-400 transition-colors rounded-full hover:bg-white/5"
                  >
                    <FileText size={16} />
                    Resume
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
