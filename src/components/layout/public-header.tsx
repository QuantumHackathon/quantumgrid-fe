'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

export function PublicHeader() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled
          ? 'bg-[var(--glass-background)] backdrop-blur-[var(--glass-blur)] border-b border-[var(--glass-border)]'
          : 'bg-transparent'
      )}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--color-primary)] text-[var(--color-text-inverse)] shadow-[var(--glow-soft)] transition-all group-hover:shadow-[var(--glow-primary)]">
            <span className="text-lg font-bold">Q</span>
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-semibold leading-tight text-[var(--color-text-primary)] group-hover:text-[var(--color-primary)] transition-colors">
              QGI
            </span>
            <span className="text-[10px] uppercase tracking-wider text-[var(--color-text-muted)]">
              Grid Intelligence
            </span>
          </div>
        </Link>

        {/* Navigation */}
        <nav className="hidden items-center gap-6 md:flex">
          <Link
            href="#solution"
            className="text-sm font-medium text-[var(--color-text-secondary)] transition-colors hover:text-[var(--color-primary)]"
          >
            Solution
          </Link>
          <Link
            href="#demo"
            className="text-sm font-medium text-[var(--color-text-secondary)] transition-colors hover:text-[var(--color-primary)]"
          >
            Demo
          </Link>
          <Link
            href="#benefits"
            className="text-sm font-medium text-[var(--color-text-secondary)] transition-colors hover:text-[var(--color-primary)]"
          >
            Benefits
          </Link>
          <Link
            href="/login"
            className="inline-flex h-9 items-center justify-center rounded-lg bg-[var(--color-primary)] px-4 text-sm font-medium text-[var(--color-text-inverse)] transition-all hover:bg-[var(--color-primary-light)] hover:shadow-[var(--glow-primary)]"
          >
            Get Started
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="flex h-9 w-9 items-center justify-center rounded-lg hover:bg-[var(--color-surface)] md:hidden transition-colors"
          aria-label="Open menu"
        >
          <svg
            className="h-6 w-6 text-[var(--color-text-primary)]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>
    </header>
  );
}
