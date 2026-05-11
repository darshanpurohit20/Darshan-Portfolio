'use client';

import { useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export function Cursor() {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const springX = useSpring(cursorX, { stiffness: 500, damping: 30 });
  const springY = useSpring(cursorY, { stiffness: 500, damping: 30 });
  const dotX = useSpring(cursorX, { stiffness: 2000, damping: 60 });
  const dotY = useSpring(cursorY, { stiffness: 2000, damping: 60 });
  const scaleRef = useRef(1);

  useEffect(() => {
    const move = (e: MouseEvent) => {
      cursorX.set(e.clientX - 16);
      cursorY.set(e.clientY - 16);
    };
    
    const handleEnter = () => {
      scaleRef.current = 1.8;
    };
    
    const handleLeave = () => {
      scaleRef.current = 1;
    };

    window.addEventListener('mousemove', move);
    
    const interactiveElements = document.querySelectorAll('a, button, [data-cursor-grow]');
    interactiveElements.forEach((el) => {
      el.addEventListener('mouseenter', handleEnter);
      el.addEventListener('mouseleave', handleLeave);
    });

    return () => {
      window.removeEventListener('mousemove', move);
      interactiveElements.forEach((el) => {
        el.removeEventListener('mouseenter', handleEnter);
        el.removeEventListener('mouseleave', handleLeave);
      });
    };
  }, [cursorX, cursorY]);

  return (
    <>
      {/* Outer ring - hidden on touch devices */}
      <motion.div
        style={{ x: springX, y: springY }}
        className="hidden md:block fixed top-0 left-0 w-8 h-8 rounded-full border border-purple-500/50 pointer-events-none z-[9998] mix-blend-difference"
      />
      {/* Inner dot - hidden on touch devices */}
      <motion.div
        style={{ x: dotX, y: dotY }}
        className="hidden md:block fixed top-0 left-0 w-8 h-8 flex items-center justify-center pointer-events-none z-[9998]"
      >
        <div className="w-1.5 h-1.5 rounded-full bg-white" />
      </motion.div>
    </>
  );
}
