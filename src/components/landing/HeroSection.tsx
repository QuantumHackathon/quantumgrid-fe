'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { staggerContainer, staggerItem } from '@/lib/motion';
import { ArrowRight, Play } from 'lucide-react';

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-16 overflow-hidden">
      <div className="relative z-10 mx-auto max-w-6xl px-4 py-20 text-center">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center gap-6"
        >
          {/* Badge */}
          <motion.div
            variants={staggerItem}
            className="inline-flex items-center gap-2 rounded-full border border-[var(--color-border-glow)] bg-[var(--color-surface)] px-4 py-2 shadow-[var(--glow-soft)]"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--color-secondary)] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--color-secondary)]" />
            </span>
            <span className="text-sm font-medium text-[var(--color-text-secondary)]">
              Powering the AI Era
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={staggerItem}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight"
          >
            <span className="text-[var(--color-text-primary)]">
              Intelligent Decisions
            </span>
            <br />
            <span className="text-gradient-hero">
              for Energy Infrastructure
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={staggerItem}
            className="max-w-2xl text-lg md:text-xl text-[var(--color-text-secondary)]"
          >
            AI is transforming our world—and driving unprecedented energy demand.
            Prepare your grid for the future with simulation-powered intelligence.
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={staggerItem}
            className="flex flex-col sm:flex-row gap-4 mt-4"
          >
            <Link href="#demo">
              <Button size="lg" className="gap-2 group">
                Explore the Simulation
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
            <Link href="#solution">
              <Button variant="glass" size="lg" className="gap-2">
                <Play className="h-4 w-4" />
                Learn More
              </Button>
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div
            variants={staggerItem}
            className="mt-12 grid grid-cols-3 gap-8 md:gap-16"
          >
            {[
              { value: '40%', label: 'Lower Grid Losses' },
              { value: '10x', label: 'Faster Decisions' },
              { value: '99.9%', label: 'Grid Reliability' },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-[var(--color-primary)]">
                  {stat.value}
                </div>
                <div className="text-xs md:text-sm text-[var(--color-text-muted)]">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            className="flex flex-col items-center gap-2"
          >
            <span className="text-xs text-[var(--color-text-muted)]">Scroll to explore</span>
            <div className="w-6 h-10 rounded-full border-2 border-[var(--color-border-strong)] flex justify-center pt-2">
              <motion.div
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                className="w-1.5 h-1.5 rounded-full bg-[var(--color-primary)]"
              />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
