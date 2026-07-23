'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { staggerContainer, staggerItem } from '@/lib/motion';
import { ArrowRight } from 'lucide-react';

export function CTASection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-background)] via-[var(--color-background-secondary)] to-[var(--color-background)]" />
      <div
        className="absolute inset-0 opacity-30"
        style={{
          background: 'radial-gradient(ellipse at 50% 50%, rgba(0, 212, 255, 0.15) 0%, transparent 60%)',
        }}
      />

      <div className="relative mx-auto max-w-4xl px-4" ref={ref}>
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="relative rounded-3xl border border-[var(--color-border-glow)] bg-[var(--color-surface)] p-8 md:p-12 text-center overflow-hidden"
        >
          {/* Glow effects */}
          <div className="absolute -top-20 -left-20 w-40 h-40 bg-[var(--color-primary)] rounded-full blur-[100px] opacity-20" />
          <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-[var(--color-secondary)] rounded-full blur-[100px] opacity-20" />

          <div className="relative z-10">
            <motion.div
              variants={staggerItem}
              className="inline-flex items-center gap-2 rounded-full border border-[var(--color-border)] bg-[var(--color-surface-elevated)] px-4 py-2 mb-6"
            >
              <span className="text-sm text-[var(--color-text-secondary)]">
                Ready to transform your grid?
              </span>
            </motion.div>

            <motion.h2
              variants={staggerItem}
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-[var(--color-text-primary)] mb-4"
            >
              Start Your{' '}
              <span className="text-gradient">
                Intelligence Journey
              </span>
            </motion.h2>

            <motion.p
              variants={staggerItem}
              className="max-w-xl mx-auto text-[var(--color-text-secondary)] mb-8"
            >
              Join leading energy providers who are already using Quantum Grid Intelligence
              to optimize their infrastructure and prepare for the AI era.
            </motion.p>

            <motion.div
              variants={staggerItem}
              className="flex justify-center"
            >
              <Link href="/dashboard">
                <Button size="lg" className="gap-2 group">
                  Open Dashboard
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
