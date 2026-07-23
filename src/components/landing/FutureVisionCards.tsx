'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { staggerContainer, staggerItem } from '@/lib/motion';
import { Server, Sun, Zap, Car, Globe } from 'lucide-react';

const visions = [
  {
    icon: Server,
    title: 'AI Data Centers',
    description: 'Optimize power delivery to GPU clusters and hyperscale facilities driving the AI revolution',
    gradient: 'from-[var(--color-tertiary)] to-[var(--color-primary)]',
    bgGlow: 'rgba(168, 85, 247, 0.1)',
    stat: '35%',
    statLabel: 'of new load',
  },
  {
    icon: Sun,
    title: 'Renewable Integration',
    description: 'Balance intermittent solar and wind with intelligent demand-side management',
    gradient: 'from-[var(--color-secondary)] to-[var(--color-accent)]',
    bgGlow: 'rgba(0, 255, 136, 0.1)',
    stat: '60%',
    statLabel: 'more capacity',
  },
  {
    icon: Zap,
    title: 'Grid Congestion',
    description: 'Identify and resolve transmission bottlenecks before they cause outages',
    gradient: 'from-[var(--color-warning)] to-[var(--color-error)]',
    bgGlow: 'rgba(255, 107, 53, 0.1)',
    stat: '90%',
    statLabel: 'fewer events',
  },
  {
    icon: Car,
    title: 'EV Infrastructure',
    description: 'Scale charging networks intelligently without overwhelming local distribution',
    gradient: 'from-[var(--color-accent)] to-[var(--color-secondary)]',
    bgGlow: 'rgba(0, 255, 136, 0.1)',
    stat: '3x',
    statLabel: 'charging capacity',
  },
  {
    icon: Globe,
    title: 'National Grids',
    description: 'Support country-scale infrastructure planning with comprehensive simulation',
    gradient: 'from-[var(--color-primary)] to-[var(--color-tertiary)]',
    bgGlow: 'rgba(0, 212, 255, 0.1)',
    stat: '100+',
    statLabel: 'GW networks',
  },
];

export function FutureVisionCards() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section className="relative py-24">
      <div className="mx-auto max-w-6xl px-4" ref={ref}>
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="text-center mb-16"
        >
          <motion.span
            variants={staggerItem}
            className="inline-block text-sm font-medium text-[var(--color-tertiary)] mb-2"
          >
            USE CASES
          </motion.span>
          <motion.h2
            variants={staggerItem}
            className="text-3xl md:text-4xl font-bold text-[var(--color-text-primary)] mb-4"
          >
            Powering the AI Era
          </motion.h2>
          <motion.p
            variants={staggerItem}
            className="max-w-2xl mx-auto text-[var(--color-text-secondary)]"
          >
            From hyperscale data centers to national infrastructure, our platform scales
            to meet the energy challenges of an AI-driven world.
          </motion.p>
        </motion.div>

        {/* Vision cards */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {visions.map((vision, index) => (
            <motion.div
              key={vision.title}
              variants={staggerItem}
              whileHover={{ y: -8, scale: 1.02 }}
              className={`group relative overflow-hidden rounded-2xl p-[1px] ${
                index === 0 ? 'md:col-span-2 lg:col-span-1' : ''
              }`}
            >
              {/* Gradient border */}
              <div
                className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${vision.gradient} opacity-30 group-hover:opacity-60 transition-opacity duration-300`}
              />

              {/* Card content */}
              <div className="relative rounded-2xl bg-[var(--color-surface)] p-6 h-full">
                {/* Background glow */}
                <div
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: `radial-gradient(circle at 50% 0%, ${vision.bgGlow} 0%, transparent 70%)`,
                  }}
                />

                <div className="relative z-10">
                  {/* Header with icon and stat */}
                  <div className="flex items-start justify-between mb-4">
                    <div
                      className={`inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${vision.gradient}`}
                    >
                      <vision.icon className="h-6 w-6 text-white" />
                    </div>
                    <div className="text-right">
                      <div className={`text-xl font-bold bg-gradient-to-br ${vision.gradient} bg-clip-text text-transparent`}>
                        {vision.stat}
                      </div>
                      <div className="text-xs text-[var(--color-text-muted)]">
                        {vision.statLabel}
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <h3 className="text-lg font-semibold text-[var(--color-text-primary)] mb-2">
                    {vision.title}
                  </h3>
                  <p className="text-sm text-[var(--color-text-muted)]">
                    {vision.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
