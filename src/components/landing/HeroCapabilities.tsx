'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { staggerContainer, staggerItem } from '@/lib/motion';

// ============================================
// Single Source of Truth - Capabilities Data
// ============================================

const capabilities = [
  {
    number: '01',
    eyebrow: 'CAPABILITY',
    title: 'Grid Simulation',
    description:
      'Model the entire electrical network with high-fidelity physics-based simulation. Understand power flows, voltage levels, and system dynamics in real-time.',
    tags: ['Real-time Modeling', 'Physics Engine', 'Network Topology'],
    media: '/images/capabilities/simulation.jpg',
    mediaAlt: 'Grid simulation visualization',
    cta: 'Explore simulation',
    href: '#simulation',
  },
  {
    number: '02',
    eyebrow: 'CAPABILITY',
    title: 'Network Analysis',
    description:
      'Detect bottlenecks, assess stability margins, and identify optimization opportunities across your transmission and distribution networks.',
    tags: ['Bottleneck Detection', 'Stability Assessment', 'Power Flow Analysis'],
    media: '/images/capabilities/analysis.jpg',
    mediaAlt: 'Network analysis dashboard',
    cta: 'Explore analysis',
    href: '#analysis',
  },
  {
    number: '03',
    eyebrow: 'CAPABILITY',
    title: 'Scenario Generation',
    description:
      'Generate millions of possible operating configurations. Evaluate renewable integration scenarios, demand variations, and contingency responses.',
    tags: ['Monte Carlo', 'Scenario Planning', 'What-If Analysis'],
    media: '/images/capabilities/scenarios.jpg',
    mediaAlt: 'Scenario generation interface',
    cta: 'Explore scenarios',
    href: '#scenarios',
  },
  {
    number: '04',
    eyebrow: 'CAPABILITY',
    title: 'Quantum-Inspired Optimization',
    description:
      'Leverage quantum-inspired algorithms to efficiently search the vast solution space and find optimal grid configurations faster than traditional methods.',
    tags: ['Quantum Computing', 'Optimization', 'Smart Search'],
    media: '/images/capabilities/optimization.jpg',
    mediaAlt: 'Quantum optimization visualization',
    cta: 'Explore optimization',
    href: '#optimization',
  },
  {
    number: '05',
    eyebrow: 'CAPABILITY',
    title: 'Decision Intelligence',
    description:
      'Deliver actionable recommendations to grid operators. Transform complex analysis into clear, prioritized actions for real-time decision support.',
    tags: ['AI Recommendations', 'Operator Support', 'Real-time Decisions'],
    media: '/images/capabilities/decisions.jpg',
    mediaAlt: 'Decision intelligence dashboard',
    cta: 'Explore decisions',
    href: '#decisions',
  },
];

// ============================================
// Desktop: Interactive Vertical Tabs
// ============================================

function DesktopCapabilities() {
  const [activeIndex, setActiveIndex] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const activeCapability = capabilities[activeIndex];

  return (
    <motion.div
      ref={ref}
      variants={staggerContainer}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      className="hidden lg:grid lg:grid-cols-[280px_1fr] gap-8 xl:gap-12"
    >
      {/* Vertical Tabs */}
      <motion.div variants={staggerItem} className="space-y-2">
        {capabilities.map((cap, index) => (
          <button
            key={cap.number}
            onClick={() => setActiveIndex(index)}
            className={`
              w-full text-left px-4 py-4 rounded-xl transition-all duration-300
              border group relative overflow-hidden
              ${
                activeIndex === index
                  ? 'bg-[var(--color-surface-elevated)] border-[var(--color-primary)] border-opacity-50'
                  : 'bg-transparent border-[var(--color-border)] hover:border-[var(--color-border-strong)] hover:bg-[var(--color-surface)]'
              }
            `}
          >
            {/* Active indicator line */}
            {activeIndex === index && (
              <motion.div
                layoutId="activeTab"
                className="absolute left-0 top-0 bottom-0 w-[3px] bg-[var(--color-primary)]"
                transition={{ type: 'spring', stiffness: 500, damping: 35 }}
              />
            )}

            <div className="flex items-center gap-4">
              <span
                className={`
                  text-sm font-mono transition-colors duration-300
                  ${activeIndex === index ? 'text-[var(--color-primary)]' : 'text-[var(--color-text-muted)]'}
                `}
              >
                {cap.number}
              </span>
              <span
                className={`
                  font-medium transition-colors duration-300
                  ${activeIndex === index ? 'text-[var(--color-text-primary)]' : 'text-[var(--color-text-secondary)]'}
                `}
              >
                {cap.title}
              </span>
            </div>
          </button>
        ))}
      </motion.div>

      {/* Dynamic Showcase */}
      <motion.div variants={staggerItem} className="relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-6"
          >
            {/* Eyebrow + Number */}
            <div className="flex items-center gap-3">
              <span className="text-xs font-medium tracking-[0.2em] uppercase text-[var(--color-text-muted)]">
                {activeCapability.eyebrow}
              </span>
              <span className="text-xs font-mono text-[var(--color-primary)]">
                {activeCapability.number}
              </span>
            </div>

            {/* Title */}
            <h3 className="text-3xl xl:text-4xl font-bold text-[var(--color-text-primary)] tracking-tight">
              {activeCapability.title}
            </h3>

            {/* Description */}
            <p className="text-base xl:text-lg text-[var(--color-text-secondary)] leading-relaxed max-w-xl">
              {activeCapability.description}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {activeCapability.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1.5 rounded-full text-xs font-medium bg-[var(--color-surface-elevated)] text-[var(--color-text-secondary)] border border-[var(--color-border)]"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Media */}
            <div className="relative aspect-[16/10] rounded-2xl overflow-hidden bg-[var(--color-surface)] border border-[var(--color-border)]">
              <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-primary-glow)] via-transparent to-[var(--color-tertiary-glow)]" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-tertiary)] flex items-center justify-center">
                    <span className="text-2xl font-bold text-white">
                      {activeCapability.number}
                    </span>
                  </div>
                  <p className="text-sm text-[var(--color-text-muted)]">
                    {activeCapability.title} Visualization
                  </p>
                </div>
              </div>
            </div>

            {/* CTA */}
            <Link
              href={activeCapability.href}
              className="inline-flex items-center gap-2 text-[var(--color-primary)] font-medium group/cta"
            >
              <span>{activeCapability.cta}</span>
              <ArrowUpRight className="w-4 h-4 transition-transform duration-200 group-hover/cta:translate-x-0.5 group-hover/cta:-translate-y-0.5" />
            </Link>
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}

// ============================================
// Mobile: Vertical Capability Showcase
// ============================================

function MobileCapabilityItem({
  capability,
}: {
  capability: (typeof capabilities)[0];
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.7,
        ease: [0.16, 1, 0.3, 1],
        delay: 0.1,
      }}
      className="relative"
    >
      {/* Number / Eyebrow */}
      <div className="flex items-center gap-2 mb-4">
        <span className="text-sm font-mono text-[var(--color-primary)]">
          {capability.number}
        </span>
        <span className="text-[10px] font-medium tracking-[0.2em] uppercase text-[var(--color-text-muted)]">
          / {capability.eyebrow}
        </span>
      </div>

      {/* Title */}
      <h3
        className="text-[clamp(2rem,8vw,3rem)] font-bold text-[var(--color-text-primary)] leading-[0.95] tracking-[-0.03em] mb-5"
      >
        {capability.title}
      </h3>

      {/* Description */}
      <p className="text-base text-[var(--color-text-secondary)] leading-[1.6] mb-6 max-w-[90%]">
        {capability.description}
      </p>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-8">
        {capability.tags.map((tag) => (
          <span
            key={tag}
            className="px-3 py-1.5 rounded-full text-xs font-medium bg-[var(--color-surface-elevated)] text-[var(--color-text-secondary)] border border-[var(--color-border)]"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Media */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={isInView ? { opacity: 1, scale: 1 } : {}}
        transition={{
          duration: 0.8,
          ease: [0.16, 1, 0.3, 1],
          delay: 0.2,
        }}
        className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-[var(--color-surface)] border border-[var(--color-border)] mb-6"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-primary-glow)] via-transparent to-[var(--color-tertiary-glow)]" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="w-14 h-14 mx-auto mb-3 rounded-xl bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-tertiary)] flex items-center justify-center">
              <span className="text-xl font-bold text-white">
                {capability.number}
              </span>
            </div>
            <p className="text-xs text-[var(--color-text-muted)]">
              {capability.title}
            </p>
          </div>
        </div>
      </motion.div>

      {/* CTA */}
      <Link
        href={capability.href}
        className="inline-flex items-center gap-2 text-[var(--color-primary)] font-medium text-sm group/cta"
      >
        <span>{capability.cta}</span>
        <ArrowUpRight className="w-4 h-4 transition-transform duration-200 group-hover/cta:translate-x-0.5 group-hover/cta:-translate-y-0.5" />
      </Link>
    </motion.article>
  );
}

function MobileCapabilities() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <div ref={ref} className="lg:hidden">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="mb-12"
      >
        <span className="text-xs font-medium tracking-[0.2em] uppercase text-[var(--color-primary)] mb-2 block">
          CAPABILITIES
        </span>
        <h2 className="text-2xl font-bold text-[var(--color-text-primary)]">
          What We Deliver
        </h2>
      </motion.div>

      <div className="space-y-0">
        {capabilities.map((capability, index) => (
          <div key={capability.number}>
            <div className="py-12 sm:py-16">
              <MobileCapabilityItem capability={capability} />
            </div>
            {/* Divider - not on last item */}
            {index < capabilities.length - 1 && (
              <div className="border-t border-[var(--color-border)]" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// ============================================
// Main Export
// ============================================

export function HeroCapabilities() {
  return (
    <section className="relative py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-6xl px-4">
        {/* Section Header - Desktop only */}
        <div className="hidden lg:block mb-16">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-xs font-medium tracking-[0.2em] uppercase text-[var(--color-primary)] mb-3 block"
          >
            CAPABILITIES
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl md:text-4xl font-bold text-[var(--color-text-primary)]"
          >
            Intelligence for Grid Operations
          </motion.h2>
        </div>

        {/* Desktop Experience */}
        <DesktopCapabilities />

        {/* Mobile Experience */}
        <MobileCapabilities />
      </div>
    </section>
  );
}
