'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { staggerContainer, staggerItem } from '@/lib/motion';
import {
  Cpu,
  Sparkles,
  ArrowDown,
  Target,
  ChevronDown,
  Brain,
  Workflow,
  Lightbulb,
} from 'lucide-react';

const classicalSteps = [
  {
    icon: Brain,
    title: 'Grid Simulation',
    description: 'Model the entire electrical network with high fidelity',
  },
  {
    icon: Workflow,
    title: 'Network Analysis',
    description: 'Analyze power flows, detect bottlenecks, assess stability',
  },
  {
    icon: Cpu,
    title: 'Scenario Generation',
    description: 'Generate millions of possible operating configurations',
  },
];

const quantumSteps = [
  {
    icon: Sparkles,
    title: 'Smart Search',
    description: 'Efficiently explore the vast solution space',
  },
  {
    icon: Target,
    title: 'Optimal Selection',
    description: 'Find high-quality configurations faster',
  },
  {
    icon: Lightbulb,
    title: 'Recommendations',
    description: 'Deliver actionable insights to operators',
  },
];

export function HybridIntelligence() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <section id="hybrid" className="relative py-24 bg-[var(--color-background-secondary)]">
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
            OUR APPROACH
          </motion.span>
          <motion.h2
            variants={staggerItem}
            className="text-3xl md:text-4xl font-bold text-[var(--color-text-primary)] mb-4"
          >
            Hybrid Intelligence
          </motion.h2>
          <motion.p
            variants={staggerItem}
            className="max-w-2xl mx-auto text-[var(--color-text-secondary)]"
          >
            We combine the analytical power of classical computing with the search
            efficiency of quantum-inspired optimization.
          </motion.p>
        </motion.div>

        {/* Two-column architecture visualization */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid lg:grid-cols-2 gap-8 mb-12"
        >
          {/* Classical Intelligence Column */}
          <motion.div variants={staggerItem} className="relative">
            <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4 md:p-6 h-full">
              {/* Header */}
              <div className="flex items-center gap-3 mb-4 md:mb-6">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--color-primary)] bg-opacity-20">
                  <Cpu className="h-5 w-5 text-[var(--color-primary)]" />
                </div>
                <div>
                  <h3 className="font-semibold text-[var(--color-text-primary)] text-sm md:text-base">
                    Classical Intelligence
                  </h3>
                  <p className="text-xs md:text-sm text-[var(--color-text-muted)]">
                    Heavy analytical work
                  </p>
                </div>
              </div>

              {/* Steps */}
              <div className="space-y-4">
                {classicalSteps.map((step, index) => (
                  <motion.div
                    key={step.title}
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    className="flex items-start gap-4"
                  >
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[var(--color-primary)] bg-opacity-10 border border-[var(--color-primary)] border-opacity-20">
                      <step.icon className="h-4 w-4 text-[var(--color-primary)]" />
                    </div>
                    <div>
                      <div className="font-medium text-[var(--color-text-primary)]">
                        {step.title}
                      </div>
                      <div className="text-sm text-[var(--color-text-muted)]">
                        {step.description}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Quantum-Inspired Optimization Column */}
          <motion.div variants={staggerItem} className="relative">
            <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4 md:p-6 h-full">
              {/* Header */}
              <div className="flex items-center gap-3 mb-4 md:mb-6">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--color-tertiary)] bg-opacity-20">
                  <Sparkles className="h-5 w-5 text-[var(--color-tertiary)]" />
                </div>
                <div>
                  <h3 className="font-semibold text-[var(--color-text-primary)] text-sm md:text-base">
                    Quantum-Inspired Optimization
                  </h3>
                  <p className="text-xs md:text-sm text-[var(--color-text-muted)]">
                    Efficient solution search
                  </p>
                </div>
              </div>

              {/* Steps */}
              <div className="space-y-4">
                {quantumSteps.map((step, index) => (
                  <motion.div
                    key={step.title}
                    initial={{ opacity: 0, x: 20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    className="flex items-start gap-4"
                  >
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[var(--color-tertiary)] bg-opacity-10 border border-[var(--color-tertiary)] border-opacity-20">
                      <step.icon className="h-4 w-4 text-[var(--color-tertiary)]" />
                    </div>
                    <div>
                      <div className="font-medium text-[var(--color-text-primary)]">
                        {step.title}
                      </div>
                      <div className="text-sm text-[var(--color-text-muted)]">
                        {step.description}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Center flow connector */}
        <motion.div
          variants={staggerItem}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="flex flex-col items-center gap-4 mb-12"
        >
          <div className="flex items-center gap-4">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-[var(--color-primary)]" />
            <motion.div
              animate={{ y: [0, 4, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-[var(--color-secondary)] bg-[var(--color-surface)]"
            >
              <ArrowDown className="h-5 w-5 text-[var(--color-secondary)]" />
            </motion.div>
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-[var(--color-tertiary)]" />
          </div>
          <div className="text-center">
            <div className="text-lg font-semibold text-[var(--color-secondary)]">
              Smarter Recommendations
            </div>
            <div className="text-sm text-[var(--color-text-muted)]">
              Together, they produce better decisions faster
            </div>
          </div>
        </motion.div>

        {/* Expandable technical insight */}
        <motion.div
          variants={staggerItem}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="max-w-2xl mx-auto"
        >
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="w-full flex items-center justify-between p-4 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] hover:border-[var(--color-border-strong)] transition-colors"
          >
            <span className="text-sm font-medium text-[var(--color-text-secondary)]">
              How does the optimization work?
            </span>
            <motion.div
              animate={{ rotate: isExpanded ? 180 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <ChevronDown className="h-5 w-5 text-[var(--color-text-muted)]" />
            </motion.div>
          </button>

          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="p-6 mt-2 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)]">
                  <div className="space-y-4 text-sm text-[var(--color-text-secondary)]">
                    <div className="flex items-start gap-3">
                      <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[var(--color-primary)] bg-opacity-20 text-xs font-medium text-[var(--color-primary)]">
                        1
                      </div>
                      <p>
                        <span className="font-medium text-[var(--color-text-primary)]">
                          Modern electrical grids generate millions of possible operating configurations.
                        </span>{' '}
                        Each decision about power routing, load balancing, and renewable integration
                        creates exponentially more possibilities.
                      </p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[var(--color-primary)] bg-opacity-20 text-xs font-medium text-[var(--color-primary)]">
                        2
                      </div>
                      <p>
                        <span className="font-medium text-[var(--color-text-primary)]">
                          Evaluating every possible combination becomes computationally expensive.
                        </span>{' '}
                        Traditional approaches can take hours or days to find optimal solutions.
                      </p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[var(--color-tertiary)] bg-opacity-20 text-xs font-medium text-[var(--color-tertiary)]">
                        3
                      </div>
                      <p>
                        <span className="font-medium text-[var(--color-text-primary)]">
                          Our quantum-inspired optimization intelligently searches promising alternatives.
                        </span>{' '}
                        Instead of brute-force evaluation, we focus computational resources on the most
                        promising solution paths.
                      </p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[var(--color-secondary)] bg-opacity-20 text-xs font-medium text-[var(--color-secondary)]">
                        4
                      </div>
                      <p>
                        <span className="font-medium text-[var(--color-text-primary)]">
                          This allows operators to obtain high-quality recommendations faster.
                        </span>{' '}
                        Real-time decision support for complex grid operations.
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
