'use client';

import { useEffect, useState } from 'react';
import { motion, useSpring } from 'framer-motion';

export function ScrollProgress() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const scaleX = useSpring(scrollProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    const updateScrollProgress = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = window.scrollY / scrollHeight;
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', updateScrollProgress, { passive: true });
    return () => window.removeEventListener('scroll', updateScrollProgress);
  }, []);

  useEffect(() => {
    scaleX.set(scrollProgress);
  }, [scrollProgress, scaleX]);

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[2px] bg-[var(--gradient-primary)] origin-left z-[100]"
      style={{ scaleX }}
    />
  );
}
