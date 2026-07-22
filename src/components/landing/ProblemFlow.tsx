'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { staggerContainer, staggerItem } from '@/lib/motion';
import { Cpu, Server, Zap, AlertTriangle, Brain } from 'lucide-react';

const problemSteps = [
  {
    icon: Cpu,
    label: 'AI Revolution',
    color: 'var(--color-tertiary)',
    description: 'AI systems multiply',
  },
  {
    icon: Server,
    label: 'Data Centers',
    color: 'var(--color-primary)',
    description: 'Infrastructure expands',
  },
  {
    icon: Zap,
    label: 'Energy Demand',
    color: 'var(--color-warning)',
    description: 'Consumption surges',
  },
  {
    icon: AlertTriangle,
    label: 'Grid Stress',
    color: 'var(--color-error)',
    description: 'Systems strain',
  },
  {
    icon: Brain,
    label: 'Smart Decisions',
    color: 'var(--color-secondary)',
    description: 'Intelligence needed',
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
            AI is Reshaping Energy Demand
          </motion.h2>
          <motion.p
            variants={staggerItem}
            className="max-w-2xl mx-auto text-[var(--color-text-secondary)]"
          >
            The exponential growth of AI creates a cascade effect on energy infrastructure
          </motion.p>
        </motion.div>

        {/* Flow visualization */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="relative flex flex-col md:flex-row items-center justify-between gap-4 md:gap-0"
        >
          {/* Connection line */}
          <div className="hidden md:block absolute top-1/2 left-0 right-0 h-[2px] bg-gradient-to-r from-[var(--color-tertiary)] via-[var(--color-warning)] to-[var(--color-secondary)] opacity-30" />

          {problemSteps.map((step, index) => (
            <motion.div
              key={step.label}
              variants={staggerItem}
              className="relative flex flex-col items-center"
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

              {/* Label */}
              <div className="mt-4 text-center">
                <div className="font-semibold text-[var(--color-text-primary)]">
                  {step.label}
                </div>
                <div className="text-sm text-[var(--color-text-muted)]">
                  {step.description}
                </div>
              </div>

              {/* Arrow (except last item) */}
              {index < problemSteps.length - 1 && (
                <div className="hidden md:flex absolute -right-8 top-1/2 -translate-y-1/2 translate-x-full items-center">
                  <motion.svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    initial={{ opacity: 0, x: -10 }}
                    animate={isInView ? { opacity: 0.5, x: 0 } : { opacity: 0 }}
                    transition={{ delay: index * 0.1 + 0.5 }}
                  >
                    <path
                      d="M5 12H19M19 12L12 5M19 12L12 19"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-[var(--color-text-muted)]"
                    />
                  </motion.svg>
                </div>
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
