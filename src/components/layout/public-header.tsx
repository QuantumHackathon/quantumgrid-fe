'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Search, Globe, User, X, Menu } from 'lucide-react';

// Navigation items
const mainNavItems = [
  { label: 'Products', href: '#products' },
  { label: 'Solutions', href: '#solution' },
  { label: 'Industries', href: '#industries' },
];

const utilityNavItems = [
  { label: 'Shop', href: '#shop' },
  { label: 'Drivers', href: '#drivers' },
  { label: 'Support', href: '#support' },
];

export function PublicHeader() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-white',
        (isScrolled || isMobileMenuOpen) && 'shadow-sm'
      )}
    >
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 lg:px-6">
        {/* Left Section: Logo + Main Nav */}
        <div className="flex items-center gap-8">
          {/* Logo */}
          <Link href="/" className="flex items-center group shrink-0">
            <Image
              src="/logo/quant_energy.png"
              alt="Quantum Grid Intelligence"
              width={120}
              height={32}
              className="h-8 w-auto transition-opacity group-hover:opacity-80"
              priority
            />
          </Link>

          {/* Main Navigation - Desktop */}
          <nav className="hidden items-center gap-1 lg:flex">
            {mainNavItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="px-3 py-2 text-sm font-medium text-black transition-colors hover:text-black/70 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 focus-visible:ring-offset-2 rounded-md"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Right Section: Utility Nav + Actions - Desktop */}
        <div className="hidden items-center gap-1 lg:flex">
          {/* Utility Navigation */}
          {utilityNavItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="px-3 py-2 text-sm font-medium text-black transition-colors hover:text-black/70 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 focus-visible:ring-offset-2 rounded-md"
            >
              {item.label}
            </Link>
          ))}

          {/* Divider */}
          <div className="mx-2 h-5 w-px bg-gray-200" />

          {/* Search */}
          <button
            className="flex h-9 w-9 items-center justify-center rounded-md text-black transition-colors hover:text-black/70 hover:bg-gray-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-400"
            aria-label="Search"
          >
            <Search className="h-[18px] w-[18px]" />
          </button>

          {/* Country/Language Selector */}
          <button
            className="flex h-9 items-center gap-1.5 rounded-md px-2 text-sm font-medium text-black transition-colors hover:text-black/70 hover:bg-gray-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-400"
            aria-label="Select country"
          >
            <Globe className="h-[18px] w-[18px]" />
            <span>US</span>
          </button>

          {/* Sign In */}
          <Link
            href="/login"
            className="flex h-9 items-center gap-1.5 rounded-md px-2 text-sm font-medium text-black transition-colors hover:text-black/70 hover:bg-gray-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-400"
          >
            <User className="h-[18px] w-[18px]" />
            <span>Sign In</span>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="flex h-9 w-9 items-center justify-center rounded-md text-gray-900 hover:bg-gray-100 lg:hidden transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-400"
          aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isMobileMenuOpen}
        >
          {isMobileMenuOpen ? (
            <X className="h-5 w-5" />
          ) : (
            <Menu className="h-5 w-5" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={cn(
          'lg:hidden overflow-hidden transition-all duration-300 ease-in-out bg-white',
          isMobileMenuOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
        )}
      >
        <nav className="mx-4 py-4 space-y-1 border-t border-gray-200">
          {/* Main Nav Items */}
          <div className="pb-3 mb-3 border-b border-gray-200">
            {mainNavItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center px-3 py-2.5 text-sm font-medium text-black transition-colors hover:text-black/70 hover:bg-gray-100 rounded-md"
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Utility Nav Items */}
          <div className="pb-3 mb-3 border-b border-gray-200">
            {utilityNavItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center px-3 py-2.5 text-sm font-medium text-black transition-colors hover:text-black/70 hover:bg-gray-100 rounded-md"
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Actions */}
          <div className="space-y-1">
            <button
              className="flex w-full items-center gap-2 px-3 py-2.5 text-sm font-medium text-black transition-colors hover:text-black/70 hover:bg-gray-100 rounded-md"
            >
              <Search className="h-4 w-4" />
              <span>Search</span>
            </button>

            <button
              className="flex w-full items-center gap-2 px-3 py-2.5 text-sm font-medium text-black transition-colors hover:text-black/70 hover:bg-gray-100 rounded-md"
            >
              <Globe className="h-4 w-4" />
              <span>United States</span>
            </button>

            <Link
              href="/login"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center gap-2 px-3 py-2.5 text-sm font-medium text-black transition-colors hover:text-black/70 hover:bg-gray-100 rounded-md"
            >
              <User className="h-4 w-4" />
              <span>Sign In</span>
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}
