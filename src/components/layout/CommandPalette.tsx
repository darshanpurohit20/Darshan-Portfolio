'use client';

import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Github, Linkedin, Download, Home, Briefcase, User, Mail, Code, Terminal } from 'lucide-react';

const COMMANDS = [
  { label: 'Go to Hero', icon: Home, action: () => document.getElementById('hero')?.scrollIntoView({ behavior: 'smooth' }) },
  { label: 'View Projects', icon: Briefcase, action: () => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' }) },
  { label: 'View Skills', icon: Code, action: () => document.getElementById('skills')?.scrollIntoView({ behavior: 'smooth' }) },
  { label: 'About Me', icon: User, action: () => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' }) },
  { label: 'Contact', icon: Mail, action: () => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }) },
  { label: 'GitHub Profile', icon: Github, action: () => window.open('https://github.com/darshanpurohit20', '_blank') },
  { label: 'LinkedIn', icon: Linkedin, action: () => window.open('https://linkedin.com/in/darshanpurohit', '_blank') },
  { label: 'Download Resume', icon: Download, action: () => window.open('/Darshan_Purohit_Resume.pdf', '_blank') },
];

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  
  const filtered = COMMANDS.filter((c) => 
    c.label.toLowerCase().includes(query.toLowerCase())
  );
  
  // Use ref to avoid dependency issues in keyboard handler
  const filteredRef = useRef(filtered);
  filteredRef.current = filtered;
  const selectedIndexRef = useRef(selectedIndex);
  selectedIndexRef.current = selectedIndex;

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setOpen((o) => !o);
      }
      if (e.key === 'Escape') setOpen(false);
      
      if (open) {
        const currentFiltered = filteredRef.current;
        const currentIndex = selectedIndexRef.current;
        
        if (e.key === 'ArrowDown') {
          e.preventDefault();
          setSelectedIndex((prev) => (prev + 1) % currentFiltered.length);
        }
        if (e.key === 'ArrowUp') {
          e.preventDefault();
          setSelectedIndex((prev) => (prev - 1 + currentFiltered.length) % currentFiltered.length);
        }
        if (e.key === 'Enter') {
          e.preventDefault();
          if (currentFiltered[currentIndex]) {
            currentFiltered[currentIndex].action();
            setOpen(false);
          }
        }
      }
    };
    
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [open]);

  // Reset selected index when query changes or filtered length changes
  useEffect(() => {
    setSelectedIndex(0);
  }, [query, filtered.length]);

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
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-lg rounded-2xl border border-white/10 bg-[#0d0d0f] overflow-hidden shadow-2xl"
          >
            <div className="flex items-center gap-3 px-4 py-3 border-b border-white/5">
              <Search size={16} className="text-zinc-500" />
              <input
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search commands..."
                className="flex-1 bg-transparent text-sm text-zinc-300 placeholder-zinc-600 outline-none"
              />
              <kbd className="text-xs text-zinc-600 border border-white/10 rounded px-1.5 py-0.5">ESC</kbd>
            </div>
            <div className="p-2 max-h-[300px] overflow-y-auto">
              {filtered.map((cmd, index) => (
                <button
                  key={cmd.label}
                  onClick={() => {
                    cmd.action();
                    setOpen(false);
                  }}
                  onMouseEnter={() => setSelectedIndex(index)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors text-left ${
                    index === selectedIndex 
                      ? 'bg-white/[0.08] text-white' 
                      : 'text-zinc-300 hover:bg-white/[0.05] hover:text-white'
                  }`}
                >
                  <cmd.icon size={16} className={index === selectedIndex ? 'text-purple-400' : 'text-zinc-500'} />
                  {cmd.label}
                </button>
              ))}
              {filtered.length === 0 && (
                <div className="px-3 py-8 text-center text-zinc-500 text-sm">
                  No commands found
                </div>
              )}
            </div>
            <div className="px-4 py-2 border-t border-white/5 flex gap-4 text-xs text-zinc-600">
              <span className="flex items-center gap-1">
                <kbd className="border border-white/10 rounded px-1">⌘</kbd>
                <kbd className="border border-white/10 rounded px-1">K</kbd>
                <span className="ml-1">to toggle</span>
              </span>
              <span>↑↓ navigate</span>
              <span>↵ select</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
