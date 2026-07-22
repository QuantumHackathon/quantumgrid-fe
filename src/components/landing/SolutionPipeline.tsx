'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { staggerContainer, staggerItem } from '@/lib/motion';
import { Network, Box, Cpu, Sparkles, Target } from 'lucide-react';

const pipelineSteps = [
  {
    icon: Network,
    title: 'Power Grid',
    description: 'Real-time data from sensors and meters across the network',
    gradient: 'from-[var(--color-primary)] to-[var(--color-primary-dark)]',
  },
  {
    icon: Box,
    title: 'Digital Twin',
    description: 'Virtual replica modeling every component and connection',
    gradient: 'from-[var(--color-primary)] to-[var(--color-tertiary)]',
  },
  {
    icon: Cpu,
    title: 'Simulation Engine',
    description: 'Run thousands of scenarios in seconds, not days',
    gradient: 'from-[var(--color-tertiary)] to-[var(--color-accent)]',
  },
  {
    icon: Sparkles,
    title: 'Optimization',
    description: 'Quantum-inspired algorithms find optimal solutions',
    gradient: 'from-[var(--color-accent)] to-[var(--color-secondary)]',
  },
  {
    icon: Target,
    title: 'Recommendations',
    description: 'Actionable insights delivered to decision makers',
    gradient: 'from-[var(--color-secondary)] to-[var(--color-secondary-dark)]',
  },
];

export function SolutionPipeline() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="solution" className="relative py-24 bg-[var(--color-background-secondary)]">
      <div className="mx-auto max-w-6xl px-4" ref={ref}>
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="text-center mb-16"
        >
          <motion.span
            variants={staggerItem}
            className="inline-block text-sm font-medium text-[var(--color-secondary)] mb-2"
          >
            THE SOLUTION
          </motion.span>
          <motion.h2
            variants={staggerItem}
            className="text-3xl md:text-4xl font-bold text-[var(--color-text-primary)] mb-4"
          >
            From Data to Decisions
          </motion.h2>
          <motion.p
            variants={staggerItem}
            className="max-w-2xl mx-auto text-[var(--color-text-secondary)]"
          >
            Our end-to-end pipeline transforms raw grid data into optimized recommendations
          </motion.p>
        </motion.div>

        {/* Pipeline visualization */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="relative"
        >
          {/* Connecting line */}
          <div className="hidden lg:block absolute top-24 left-[10%] right-[10%] h-1 rounded-full bg-gradient-to-r from-[var(--color-primary)] via-[var(--color-tertiary)] via-[var(--color-accent)] to-[var(--color-secondary)] opacity-30" />

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {pipelineSteps.map((step, index) => (
              <motion.div
                key={step.title}
                variants={staggerItem}
                whileHover={{ y: -8 }}
                className="relative group"
              >
                <div className="flex flex-col items-center p-6 rounded-2xl bg-[var(--color-surface)] border border-[var(--color-border)] transition-all duration-300 group-hover:border-[var(--color-border-strong)] group-hover:shadow-[var(--glow-soft)]">
                  {/* Step number */}
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 flex h-6 w-6 items-center justify-center rounded-full bg-[var(--color-surface-elevated)] border border-[var(--color-border)] text-xs font-semibold text-[var(--color-text-muted)]">
                    {index + 1}
                  </div>

                  {/* Icon */}
                  <div
                    className={`flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br ${step.gradient} mb-4`}
                  >
                    <step.icon className="h-7 w-7 text-white" />
                  </div>

                  {/* Content */}
                  <h3 className="font-semibold text-[var(--color-text-primary)] mb-2 text-center">
                    {step.title}
                  </h3>
                  <p className="text-sm text-[var(--color-text-muted)] text-center">
                    {step.description}
                  </p>
                </div>

                {/* Arrow connector (mobile) */}
                {index < pipelineSteps.length - 1 && (
                  <div className="flex md:hidden justify-center my-2">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-[var(--color-text-muted)] opacity-50 rotate-90">
                      <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
