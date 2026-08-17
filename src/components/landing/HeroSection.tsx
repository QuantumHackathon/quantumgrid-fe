'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { staggerContainer, staggerItem } from '@/lib/motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import { HeroCapabilities } from './HeroCapabilities';

// NVIDIA Brand Colors
const NVIDIA_GREEN = '#76B900';
const NVIDIA_GREEN_LIGHT = '#8DC63F';

export function HeroSection() {
  return (
    <>
      {/* Main Hero */}
      <section className="relative h-screen overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="/logo/hero.png"
            alt="Quantum Grid Intelligence Platform"
            fill
            className="object-cover object-center"
            priority
          />
          {/* Gradient overlay for text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-background)] via-[var(--color-background)]/60 to-transparent" />
        </div>

        {/* Content positioned at bottom */}
        <div className="relative z-10 h-full flex flex-col justify-end">
          <div className="mx-auto max-w-6xl px-4 pb-16 md:pb-24">
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="flex flex-col items-start gap-4"
            >
              {/* Category */}
              <motion.p
                variants={staggerItem}
                className="text-xs sm:text-sm tracking-[0.3em] uppercase font-medium"
                style={{ color: NVIDIA_GREEN }}
              >
                DATA CENTERS · ENERGY · AI INFRASTRUCTURE
              </motion.p>

              {/* Headline */}
              <motion.h1
                variants={staggerItem}
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight"
              >
                <span
                  className="bg-clip-text text-transparent"
                  style={{
                    backgroundImage: `linear-gradient(135deg, ${NVIDIA_GREEN} 0%, ${NVIDIA_GREEN_LIGHT} 50%, #ffffff 100%)`,
                    backgroundSize: '200% 200%',
                    animation: 'gradient-shift 6s ease infinite'
                  }}
                >
                  Powering the Intelligence Era
                </span>
              </motion.h1>

              {/* Subtitle */}
              <motion.p
                variants={staggerItem}
                className="max-w-3xl text-lg md:text-xl lg:text-2xl text-[var(--color-text-secondary)]"
              >
                Engineering the energy systems behind the next generation of intelligence.
              </motion.p>

              {/* CTAs */}
              <motion.div
                variants={staggerItem}
                className="flex flex-col sm:flex-row gap-4 mt-4"
              >
                <Link href="#demo">
                  <Button
                    size="lg"
                    className="gap-2 group text-black font-semibold"
                    style={{
                      backgroundColor: NVIDIA_GREEN,
                      borderColor: NVIDIA_GREEN
                    }}
                  >
                    See the Impact
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
                <Link href="#hybrid">
                  <Button
                    variant="glass"
                    size="lg"
                    className="gap-2"
                    style={{
                      borderColor: `${NVIDIA_GREEN}50`,
                      color: NVIDIA_GREEN
                    }}
                  >
                    <Sparkles className="h-4 w-4" />
                    How It Works
                  </Button>
                </Link>
              </motion.div>

            </motion.div>
          </div>
        </div>
      </section>

      {/* Capabilities Showcase */}
      <HeroCapabilities />
    </>
  );
}
