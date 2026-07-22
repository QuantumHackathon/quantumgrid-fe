'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { staggerContainer, staggerItem } from '@/lib/motion';

const metrics = {
  before: {
    losses: 15.2,
    efficiency: 78,
    congestion: 42,
    renewable: 25,
  },
  after: {
    losses: 9.1,
    efficiency: 94,
    congestion: 8,
    renewable: 61,
  },
};

export function DemoSection() {
  const [isOptimized, setIsOptimized] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const currentMetrics = isOptimized ? metrics.after : metrics.before;

  return (
    <section id="demo" className="relative py-24 bg-[var(--color-background-secondary)]">
      <div className="mx-auto max-w-6xl px-4" ref={ref}>
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="text-center mb-12"
        >
          <motion.span
            variants={staggerItem}
            className="inline-block text-sm font-medium text-[var(--color-accent)] mb-2"
          >
            LIVE DEMO
          </motion.span>
          <motion.h2
            variants={staggerItem}
            className="text-3xl md:text-4xl font-bold text-[var(--color-text-primary)] mb-4"
          >
            See the Difference
          </motion.h2>
          <motion.p
            variants={staggerItem}
            className="max-w-2xl mx-auto text-[var(--color-text-secondary)]"
          >
            Toggle between standard operation and optimized mode to see the impact
          </motion.p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid lg:grid-cols-2 gap-8 items-center"
        >
          {/* Grid visualization */}
          <motion.div variants={staggerItem} className="relative">
            <div className="aspect-square max-w-md mx-auto rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 overflow-hidden">
              {/* Grid SVG visualization */}
              <svg viewBox="0 0 400 400" className="w-full h-full">
                {/* Grid lines */}
                {[...Array(5)].map((_, i) => (
                  <g key={`h-${i}`}>
                    <motion.line
                      x1="50"
                      y1={80 + i * 60}
                      x2="350"
                      y2={80 + i * 60}
                      stroke={isOptimized ? 'var(--color-secondary)' : 'var(--color-text-muted)'}
                      strokeWidth="2"
                      strokeOpacity={0.3}
                      animate={{
                        stroke: isOptimized ? 'var(--color-secondary)' : 'var(--color-text-muted)',
                      }}
                      transition={{ duration: 0.5 }}
                    />
                  </g>
                ))}
                {[...Array(5)].map((_, i) => (
                  <g key={`v-${i}`}>
                    <motion.line
                      x1={80 + i * 60}
                      y1="50"
                      x2={80 + i * 60}
                      y2="350"
                      stroke={isOptimized ? 'var(--color-secondary)' : 'var(--color-text-muted)'}
                      strokeWidth="2"
                      strokeOpacity={0.3}
                      animate={{
                        stroke: isOptimized ? 'var(--color-secondary)' : 'var(--color-text-muted)',
                      }}
                      transition={{ duration: 0.5 }}
                    />
                  </g>
                ))}

                {/* Nodes */}
                {[
                  { x: 80, y: 80 }, { x: 200, y: 80 }, { x: 320, y: 80 },
                  { x: 80, y: 200 }, { x: 200, y: 200 }, { x: 320, y: 200 },
                  { x: 80, y: 320 }, { x: 200, y: 320 }, { x: 320, y: 320 },
                ].map((node, i) => (
                  <motion.circle
                    key={i}
                    cx={node.x}
                    cy={node.y}
                    r="12"
                    fill={isOptimized ? 'var(--color-secondary)' : 'var(--color-primary)'}
                    animate={{
                      fill: isOptimized ? 'var(--color-secondary)' : 'var(--color-primary)',
                      scale: isOptimized ? [1, 1.1, 1] : 1,
                    }}
                    transition={{
                      fill: { duration: 0.5 },
                      scale: { duration: 1, repeat: isOptimized ? Infinity : 0, repeatDelay: 0.5 },
                    }}
                  />
                ))}

                {/* Congestion indicators (before) */}
                <AnimatePresence>
                  {!isOptimized && (
                    <>
                      {[
                        { x: 140, y: 140 },
                        { x: 260, y: 200 },
                        { x: 140, y: 260 },
                      ].map((pos, i) => (
                        <motion.circle
                          key={`congestion-${i}`}
                          cx={pos.x}
                          cy={pos.y}
                          r="20"
                          fill="var(--color-error)"
                          fillOpacity={0.3}
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.6, 0.3] }}
                          exit={{ scale: 0, opacity: 0 }}
                          transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            delay: i * 0.3,
                          }}
                        />
                      ))}
                    </>
                  )}
                </AnimatePresence>

                {/* Flow indicators (after) */}
                <AnimatePresence>
                  {isOptimized && (
                    <>
                      {[0, 1, 2, 3, 4].map((i) => (
                        <motion.circle
                          key={`flow-${i}`}
                          r="4"
                          fill="var(--color-secondary)"
                          initial={{ opacity: 0 }}
                          animate={{
                            cx: [80, 200, 320],
                            cy: [80 + i * 60, 80 + i * 60, 80 + i * 60],
                            opacity: [0, 1, 0],
                          }}
                          exit={{ opacity: 0 }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            delay: i * 0.4,
                          }}
                        />
                      ))}
                    </>
                  )}
                </AnimatePresence>
              </svg>

              {/* Status badge */}
              <div className="absolute top-4 right-4">
                <motion.div
                  className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium"
                  animate={{
                    backgroundColor: isOptimized
                      ? 'rgba(0, 255, 136, 0.15)'
                      : 'rgba(255, 71, 87, 0.15)',
                    color: isOptimized
                      ? 'var(--color-secondary)'
                      : 'var(--color-error)',
                  }}
                >
                  <span
                    className="w-2 h-2 rounded-full"
                    style={{
                      backgroundColor: isOptimized
                        ? 'var(--color-secondary)'
                        : 'var(--color-error)',
                    }}
                  />
                  {isOptimized ? 'Optimized' : 'Standard'}
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* Controls and metrics */}
          <motion.div variants={staggerItem} className="space-y-8">
            {/* Toggle */}
            <div className="flex items-center justify-center lg:justify-start gap-4">
              <span className={`text-sm font-medium ${!isOptimized ? 'text-[var(--color-text-primary)]' : 'text-[var(--color-text-muted)]'}`}>
                Before
              </span>
              <button
                onClick={() => setIsOptimized(!isOptimized)}
                className={`relative w-14 h-8 rounded-full transition-colors duration-300 ${
                  isOptimized ? 'bg-[var(--color-secondary)]' : 'bg-[var(--color-surface-elevated)]'
                }`}
              >
                <motion.div
                  className="absolute top-1 left-1 w-6 h-6 rounded-full bg-white shadow-md"
                  animate={{ x: isOptimized ? 24 : 0 }}
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                />
              </button>
              <span className={`text-sm font-medium ${isOptimized ? 'text-[var(--color-text-primary)]' : 'text-[var(--color-text-muted)]'}`}>
                After
              </span>
            </div>

            {/* Metrics */}
            <div className="grid grid-cols-2 gap-4">
              {[
                {
                  label: 'Grid Losses',
                  value: currentMetrics.losses,
                  unit: '%',
                  improved: currentMetrics.losses < metrics.before.losses,
                },
                {
                  label: 'Efficiency',
                  value: currentMetrics.efficiency,
                  unit: '%',
                  improved: currentMetrics.efficiency > metrics.before.efficiency,
                },
                {
                  label: 'Congestion',
                  value: currentMetrics.congestion,
                  unit: '%',
                  improved: currentMetrics.congestion < metrics.before.congestion,
                },
                {
                  label: 'Renewable Mix',
                  value: currentMetrics.renewable,
                  unit: '%',
                  improved: currentMetrics.renewable > metrics.before.renewable,
                },
              ].map((metric) => (
                <div
                  key={metric.label}
                  className="p-4 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)]"
                >
                  <div className="text-sm text-[var(--color-text-muted)] mb-1">
                    {metric.label}
                  </div>
                  <div className="flex items-baseline gap-1">
                    <motion.span
                      key={metric.value}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`text-2xl font-bold ${
                        isOptimized && metric.improved
                          ? 'text-[var(--color-secondary)]'
                          : 'text-[var(--color-text-primary)]'
                      }`}
                    >
                      {metric.value}
                    </motion.span>
                    <span className="text-sm text-[var(--color-text-muted)]">
                      {metric.unit}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
