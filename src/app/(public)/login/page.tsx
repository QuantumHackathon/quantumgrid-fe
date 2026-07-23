import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Iniciar Sesión',
  description: 'Acceso al portal QuantumGrid',
};

export default function LoginPage() {
  return (
    <div className="flex min-h-[80vh] items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-xl bg-[var(--color-primary)] text-white">
            <span className="text-2xl font-bold">Q</span>
          </div>
          <h1 className="text-2xl font-bold text-[var(--color-text-primary)]">
            Acceder a QuantumGrid
          </h1>
          <p className="mt-2 text-[var(--color-text-muted)]">
            Sistema de Inteligencia Energética Nacional
          </p>
        </div>

        {/* Login Form */}
        <form className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-[var(--color-text-primary)]"
            >
              Correo electrónico
            </label>
            <input
              type="email"
              id="email"
              className="mt-1 block h-10 w-full rounded-lg border border-[var(--color-border)] px-3 text-sm outline-none transition-colors focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)]"
              placeholder="usuario@gobierno.go.cr"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-[var(--color-text-primary)]"
            >
              Contraseña
            </label>
            <input
              type="password"
              id="password"
              className="mt-1 block h-10 w-full rounded-lg border border-[var(--color-border)] px-3 text-sm outline-none transition-colors focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)]"
              placeholder="••••••••"
            />
          </div>

          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                className="h-4 w-4 rounded border-[var(--color-border)] text-[var(--color-primary)]"
              />
              <span className="text-sm text-[var(--color-text-muted)]">
                Recordarme
              </span>
            </label>
            <Link
              href="/forgot-password"
              className="text-sm text-[var(--color-primary)] hover:underline"
            >
              ¿Olvidó su contraseña?
            </Link>
          </div>

          <Link
            href="/dashboard"
            className="flex h-10 w-full items-center justify-center rounded-lg bg-[var(--color-primary)] font-medium text-white transition-colors hover:bg-[var(--color-primary-dark)]"
          >
            Iniciar Sesión
          </Link>
        </form>

        {/* Divider */}
        <div className="my-6 flex items-center gap-4">
          <div className="h-px flex-1 bg-[var(--color-border)]" />
          <span className="text-sm text-[var(--color-text-muted)]">o</span>
          <div className="h-px flex-1 bg-[var(--color-border)]" />
        </div>

        {/* SSO Button */}
        <button
          type="button"
          className="flex h-10 w-full items-center justify-center gap-2 rounded-lg border border-[var(--color-border)] font-medium text-[var(--color-text-primary)] transition-colors hover:bg-[var(--color-neutral-50)]"
        >
          <span>Acceder con SSO Gubernamental</span>
        </button>

        {/* Footer */}
        <p className="mt-8 text-center text-sm text-[var(--color-text-muted)]">
          ¿Necesita ayuda?{' '}
          <Link
            href="/support"
            className="text-[var(--color-primary)] hover:underline"
          >
            Contacte a soporte
          </Link>
        </p>
      </div>
    </div>
  );
}
