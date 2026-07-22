'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { staggerContainer, staggerItem } from '@/lib/motion';
import { TrendingDown, DollarSign, Leaf, Shield, Zap } from 'lucide-react';

const benefits = [
  {
    icon: TrendingDown,
    title: 'Lower Losses',
    description: 'Reduce transmission losses by up to 40% through optimized load distribution',
    metric: '-40%',
    metricLabel: 'Grid Losses',
    color: 'var(--color-primary)',
  },
  {
    icon: DollarSign,
    title: 'Reduced Costs',
    description: 'Cut operational expenses with predictive maintenance and efficient routing',
    metric: '-30%',
    metricLabel: 'Operating Costs',
    color: 'var(--color-secondary)',
  },
  {
    icon: Leaf,
    title: 'Renewable Integration',
    description: 'Seamlessly integrate solar and wind with intelligent load balancing',
    metric: '+60%',
    metricLabel: 'Renewable Capacity',
    color: 'var(--color-secondary)',
  },
  {
    icon: Shield,
    title: 'Higher Resilience',
    description: 'Predict and prevent outages before they impact customers',
    metric: '99.9%',
    metricLabel: 'Uptime',
    color: 'var(--color-tertiary)',
  },
  {
    icon: Zap,
    title: 'Faster Decisions',
    description: 'Real-time analysis enables instant response to grid events',
    metric: '10x',
    metricLabel: 'Faster Response',
    color: 'var(--color-accent)',
  },
];

export function BenefitCards() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="benefits" className="relative py-24">
      <div className="mx-auto max-w-6xl px-4" ref={ref}>
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="text-center mb-16"
        >
          <motion.span
            variants={staggerItem}
            className="inline-block text-sm font-medium text-[var(--color-primary)] mb-2"
          >
            BENEFITS
          </motion.span>
          <motion.h2
            variants={staggerItem}
            className="text-3xl md:text-4xl font-bold text-[var(--color-text-primary)] mb-4"
          >
            Transform Your Grid Operations
          </motion.h2>
          <motion.p
            variants={staggerItem}
            className="max-w-2xl mx-auto text-[var(--color-text-secondary)]"
          >
            Measurable improvements across every aspect of grid management
          </motion.p>
        </motion.div>

        {/* Benefits grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.title}
              variants={staggerItem}
              whileHover="hover"
              className={`relative overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 transition-all duration-300 hover:border-[var(--color-border-strong)] ${
                index === 0 || index === 3 ? 'md:col-span-2 lg:col-span-1' : ''
              }`}
              style={{
                boxShadow: `inset 0 1px 0 0 rgba(255,255,255,0.05)`,
              }}
            >
              {/* Glow effect on hover */}
              <motion.div
                className="absolute inset-0 opacity-0 transition-opacity duration-300"
                style={{
                  background: `radial-gradient(circle at 50% 50%, ${benefit.color}10 0%, transparent 70%)`,
                }}
                variants={{
                  hover: { opacity: 1 },
                }}
              />

              <div className="relative z-10">
                {/* Icon and metric row */}
                <div className="flex items-start justify-between mb-4">
                  <div
                    className="flex h-12 w-12 items-center justify-center rounded-xl"
                    style={{
                      backgroundColor: `${benefit.color}15`,
                      border: `1px solid ${benefit.color}30`,
                    }}
                  >
                    <benefit.icon
                      className="h-6 w-6"
                      style={{ color: benefit.color }}
                    />
                  </div>
                  <div className="text-right">
                    <div
                      className="text-2xl font-bold"
                      style={{ color: benefit.color }}
                    >
                      {benefit.metric}
                    </div>
                    <div className="text-xs text-[var(--color-text-muted)]">
                      {benefit.metricLabel}
                    </div>
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-lg font-semibold text-[var(--color-text-primary)] mb-2">
                  {benefit.title}
                </h3>
                <p className="text-sm text-[var(--color-text-muted)]">
                  {benefit.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
