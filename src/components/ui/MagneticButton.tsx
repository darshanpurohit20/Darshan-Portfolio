'use client';

import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface Props {
  children: React.ReactNode;
  href?: string;
  download?: boolean;
  target?: string;
  variant?: 'primary' | 'ghost';
  icon?: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

export function MagneticButton({ 
  children, 
  href, 
  variant = 'ghost', 
  icon, 
  onClick, 
  className,
  ...props 
}: Props) {
  const ref = useRef<HTMLAnchorElement | HTMLButtonElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setPosition({ x: x * 0.3, y: y * 0.3 });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  const buttonClassName = cn(
    'relative flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium transition-all duration-300',
    variant === 'primary'
      ? 'bg-purple-600 text-white hover:bg-purple-500 shadow-[0_0_30px_rgba(124,92,252,0.4)]'
      : 'border border-white/10 text-zinc-300 hover:border-white/25 hover:text-white backdrop-blur-sm bg-white/[0.03]',
    className
  );

  const content = (
    <motion.span
      animate={{ x: position.x, y: position.y }}
      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      className={buttonClassName}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {icon}
      {children}
    </motion.span>
  );

  if (href) {
    return (
      <a 
        ref={ref as React.RefObject<HTMLAnchorElement>} 
        href={href} 
        className="inline-block"
        {...props}
      >
        {content}
      </a>
    );
  }
  
  return (
    <button 
      ref={ref as React.RefObject<HTMLButtonElement>} 
      onClick={onClick}
      className="inline-block"
    >
      {content}
    </button>
  );
}
