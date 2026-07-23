'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { staggerContainer, staggerItem } from '@/lib/motion';
import { Activity, Box, Search, Sparkles, Target } from 'lucide-react';

const pipelineSteps = [
  {
    icon: Activity,
    title: 'Simulate',
    description: 'Model the grid with real-time data and physics-based simulation',
    gradient: 'from-[var(--color-primary)] to-[var(--color-primary-dark)]',
    label: 'Input',
  },
  {
    icon: Search,
    title: 'Analyze',
    description: 'Detect bottlenecks, assess stability, identify opportunities',
    gradient: 'from-[var(--color-primary)] to-[var(--color-tertiary)]',
    label: 'Classical',
  },
  {
    icon: Box,
    title: 'Generate',
    description: 'Create millions of possible operating configurations',
    gradient: 'from-[var(--color-tertiary)] to-[var(--color-accent)]',
    label: 'Classical',
  },
  {
    icon: Sparkles,
    title: 'Optimize',
    description: 'Quantum-inspired search finds best configurations fast',
    gradient: 'from-[var(--color-accent)] to-[var(--color-secondary)]',
    label: 'Quantum',
  },
  {
    icon: Target,
    title: 'Recommend',
    description: 'Deliver actionable decisions to grid operators',
    gradient: 'from-[var(--color-secondary)] to-[var(--color-secondary-dark)]',
    label: 'Output',
  },
];

export function SolutionPipeline() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="solution" className="relative py-24">
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
            THE PLATFORM
          </motion.span>
          <motion.h2
            variants={staggerItem}
            className="text-3xl md:text-4xl font-bold text-[var(--color-text-primary)] mb-4"
          >
            From Grid Data to Smart Decisions
          </motion.h2>
          <motion.p
            variants={staggerItem}
            className="max-w-2xl mx-auto text-[var(--color-text-secondary)]"
          >
            Our platform simulates the grid, analyzes the network, optimizes energy distribution,
            and recommends better operational decisions.
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
          <div className="hidden lg:block absolute top-[4.5rem] left-[10%] right-[10%] h-1 rounded-full bg-gradient-to-r from-[var(--color-primary)] via-[var(--color-tertiary)] via-[var(--color-accent)] to-[var(--color-secondary)] opacity-30" />

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {pipelineSteps.map((step, index) => (
              <motion.div
                key={step.title}
                variants={staggerItem}
                whileHover={{ y: -8 }}
                className="relative group"
              >
                <div className="flex flex-col items-center p-6 rounded-2xl bg-[var(--color-surface)] border border-[var(--color-border)] transition-all duration-300 group-hover:border-[var(--color-border-strong)] group-hover:shadow-[var(--glow-soft)]">
                  {/* Label badge */}
                  <div
                    className={`absolute -top-3 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                      step.label === 'Quantum'
                        ? 'bg-[var(--color-tertiary)] bg-opacity-20 text-[var(--color-tertiary)] border border-[var(--color-tertiary)] border-opacity-30'
                        : step.label === 'Classical'
                          ? 'bg-[var(--color-primary)] bg-opacity-20 text-[var(--color-primary)] border border-[var(--color-primary)] border-opacity-30'
                          : 'bg-[var(--color-surface-elevated)] text-[var(--color-text-muted)] border border-[var(--color-border)]'
                    }`}
                  >
                    {step.label}
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
