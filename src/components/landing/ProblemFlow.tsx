'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { staggerContainer, staggerItem } from '@/lib/motion';
import { Cpu, Server, Zap, Network, HelpCircle } from 'lucide-react';

const problemSteps = [
  {
    icon: Cpu,
    label: 'AI Explosion',
    color: 'var(--color-tertiary)',
    description: 'AI models grow exponentially',
    stat: '10x',
    statLabel: 'compute growth/year',
  },
  {
    icon: Server,
    label: 'Data Centers',
    color: 'var(--color-primary)',
    description: 'Infrastructure scales rapidly',
    stat: '35%',
    statLabel: 'of new energy demand',
  },
  {
    icon: Zap,
    label: 'Energy Surge',
    color: 'var(--color-warning)',
    description: 'Grids face unprecedented load',
    stat: '2x',
    statLabel: 'demand by 2030',
  },
  {
    icon: Network,
    label: 'Grid Complexity',
    color: 'var(--color-accent)',
    description: 'Millions of operating scenarios',
    stat: '1M+',
    statLabel: 'possible configurations',
  },
  {
    icon: HelpCircle,
    label: 'Critical Decisions',
    color: 'var(--color-error)',
    description: 'Operators need intelligent support',
    stat: '24/7',
    statLabel: 'real-time optimization',
  },
];

export function ProblemFlow() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section className="relative py-24 overflow-hidden">
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
            THE CHALLENGE
          </motion.span>
          <motion.h2
            variants={staggerItem}
            className="text-3xl md:text-4xl font-bold text-[var(--color-text-primary)] mb-4"
          >
            AI is Transforming Energy Demand
          </motion.h2>
          <motion.p
            variants={staggerItem}
            className="max-w-2xl mx-auto text-[var(--color-text-secondary)]"
          >
            The rise of AI creates a cascade effect: more compute, more data centers,
            more energy demand, and increasingly complex grids that require intelligent decision support.
          </motion.p>
        </motion.div>

        {/* Flow visualization */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="relative grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 md:gap-4"
        >
          {/* Connection line */}
          <div className="hidden md:block absolute top-12 left-[8%] right-[8%] h-[2px] bg-gradient-to-r from-[var(--color-tertiary)] via-[var(--color-warning)] to-[var(--color-error)] opacity-30" />

          {problemSteps.map((step, index) => (
            <motion.div
              key={step.label}
              variants={staggerItem}
              className={`relative flex flex-col items-center ${index === 4 ? 'col-span-2 sm:col-span-1' : ''}`}
            >
              {/* Icon container */}
              <motion.div
                whileHover={{ scale: 1.1, y: -4 }}
                className="relative z-10 flex h-16 w-16 items-center justify-center rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] shadow-lg"
                style={{
                  boxShadow: `0 0 30px ${step.color}20`,
                  borderColor: `${step.color}40`,
                }}
              >
                <step.icon
                  className="h-8 w-8"
                  style={{ color: step.color }}
                />
              </motion.div>

              {/* Label and stats */}
              <div className="mt-4 text-center">
                <div className="font-semibold text-[var(--color-text-primary)]">
                  {step.label}
                </div>
                <div className="text-sm text-[var(--color-text-muted)] mb-2">
                  {step.description}
                </div>
                <div
                  className="text-lg font-bold"
                  style={{ color: step.color }}
                >
                  {step.stat}
                </div>
                <div className="text-xs text-[var(--color-text-muted)]">
                  {step.statLabel}
                </div>
              </div>

            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
