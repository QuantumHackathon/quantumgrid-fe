import Link from 'next/link';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-[var(--color-border)] bg-[var(--color-background-secondary)]">
      <div className="mx-auto max-w-6xl px-4 py-12">
        <div className="grid gap-8 md:grid-cols-4">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--color-primary)] text-[var(--color-text-inverse)] shadow-[var(--glow-soft)]">
                <span className="text-lg font-bold">Q</span>
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-semibold leading-tight text-[var(--color-text-primary)]">
                  Quantum Grid Intelligence
                </span>
                <span className="text-xs text-[var(--color-text-muted)]">
                  Powering the AI Era
                </span>
              </div>
            </div>
            <p className="text-sm text-[var(--color-text-muted)] max-w-md">
              Decision intelligence platform preparing energy infrastructure for the AI era.
              Smarter grids, faster decisions, sustainable future.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold text-[var(--color-text-primary)] mb-4">
              Platform
            </h4>
            <nav className="flex flex-col gap-2">
              <Link
                href="#solution"
                className="text-sm text-[var(--color-text-muted)] transition-colors hover:text-[var(--color-primary)]"
              >
                Solution
              </Link>
              <Link
                href="#demo"
                className="text-sm text-[var(--color-text-muted)] transition-colors hover:text-[var(--color-primary)]"
              >
                Demo
              </Link>
              <Link
                href="#benefits"
                className="text-sm text-[var(--color-text-muted)] transition-colors hover:text-[var(--color-primary)]"
              >
                Benefits
              </Link>
              <Link
                href="/login"
                className="text-sm text-[var(--color-text-muted)] transition-colors hover:text-[var(--color-primary)]"
              >
                Get Started
              </Link>
            </nav>
          </div>

          {/* Legal Links */}
          <div>
            <h4 className="text-sm font-semibold text-[var(--color-text-primary)] mb-4">
              Legal
            </h4>
            <nav className="flex flex-col gap-2">
              <Link
                href="/privacy"
                className="text-sm text-[var(--color-text-muted)] transition-colors hover:text-[var(--color-primary)]"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="text-sm text-[var(--color-text-muted)] transition-colors hover:text-[var(--color-primary)]"
              >
                Terms of Service
              </Link>
              <Link
                href="/accessibility"
                className="text-sm text-[var(--color-text-muted)] transition-colors hover:text-[var(--color-primary)]"
              >
                Accessibility
              </Link>
            </nav>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-[var(--color-border)]">
          <p className="text-sm text-[var(--color-text-muted)] text-center">
            &copy; {currentYear} Quantum Grid Intelligence. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
