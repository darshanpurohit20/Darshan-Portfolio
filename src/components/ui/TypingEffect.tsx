'use client';

import { useEffect, useState } from 'react';

interface Props {
  strings: string[];
  speed?: number;
  deleteSpeed?: number;
  pause?: number;
}

export function TypingEffect({ 
  strings, 
  speed = 50, 
  deleteSpeed = 30, 
  pause = 2000 
}: Props) {
  const [currentStringIndex, setCurrentStringIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const currentString = strings[currentStringIndex];
    
    if (isPaused) {
      const timeout = setTimeout(() => {
        setIsPaused(false);
        setIsDeleting(true);
      }, pause);
      return () => clearTimeout(timeout);
    }

    if (isDeleting) {
      if (currentText === '') {
        setIsDeleting(false);
        setCurrentStringIndex((prev) => (prev + 1) % strings.length);
        return;
      }

      const timeout = setTimeout(() => {
        setCurrentText(currentText.slice(0, -1));
      }, deleteSpeed);
      return () => clearTimeout(timeout);
    }

    if (currentText === currentString) {
      setIsPaused(true);
      return;
    }

    const timeout = setTimeout(() => {
      setCurrentText(currentString.slice(0, currentText.length + 1));
    }, speed + Math.random() * 30);

    return () => clearTimeout(timeout);
  }, [currentText, currentStringIndex, isDeleting, isPaused, strings, speed, deleteSpeed, pause]);

  return (
    <span className="inline-block">
      {currentText}
      <span className="animate-pulse ml-0.5">|</span>
    </span>
  );
}
