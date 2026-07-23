'use client';

import { Bell, Search, User, LogOut, Menu } from 'lucide-react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { useUIStore } from '@/store/ui-store';

const pathLabels: Record<string, string> = {
  '/dashboard': 'Dashboard',
  '/analysis': 'Análisis',
  '/upload': 'Subir Datos',
  '/insights': 'Insights',
  '/infrastructure': 'Infraestructura',
  '/reports': 'Reportes',
  '/settings': 'Configuración',
};

export function Topbar() {
  const pathname = usePathname();
  const { setSidebarOpen } = useUIStore();

  // Get breadcrumb label
  const currentLabel = Object.entries(pathLabels).find(([path]) =>
    pathname.startsWith(path)
  )?.[1] || 'Dashboard';

  return (
    <header className="sticky top-0 z-30 flex h-14 items-center justify-between border-b border-[var(--color-border)] bg-[var(--color-surface)] px-4 lg:h-16 lg:px-6">
      {/* Left side */}
      <div className="flex items-center gap-3">
        {/* Mobile menu button */}
        <button
          onClick={() => setSidebarOpen(true)}
          className="flex h-9 w-9 items-center justify-center rounded-lg text-[var(--color-text-muted)] transition-colors hover:bg-[var(--color-surface-elevated)] hover:text-[var(--color-text-primary)] lg:hidden"
          aria-label="Abrir menú"
        >
          <Menu className="h-5 w-5" />
        </button>

        {/* Mobile logo */}
        <Link href="/dashboard" className="flex items-center gap-2 lg:hidden">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[var(--color-primary)] text-white">
            <span className="text-xs font-bold">Q</span>
          </div>
        </Link>

        {/* Breadcrumbs - Desktop */}
        <nav className="hidden items-center gap-1 text-sm lg:flex">
          <span className="text-[var(--color-text-muted)]">QuantumGrid</span>
          <span className="text-[var(--color-text-muted)]">/</span>
          <span className="font-medium text-[var(--color-text-primary)]">
            {currentLabel}
          </span>
        </nav>

        {/* Page title - Mobile */}
        <span className="text-sm font-medium text-[var(--color-text-primary)] lg:hidden">
          {currentLabel}
        </span>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-1 lg:gap-2">
        {/* Search - Desktop only */}
        <div className="relative hidden lg:block">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--color-text-muted)]" />
          <input
            type="search"
            placeholder="Buscar..."
            className="h-9 w-64 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-elevated)] pl-9 pr-4 text-sm text-[var(--color-text-primary)] outline-none transition-colors placeholder:text-[var(--color-text-muted)] focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)]"
          />
        </div>

        {/* Search button - Mobile */}
        <button
          className="flex h-9 w-9 items-center justify-center rounded-lg text-[var(--color-text-muted)] transition-colors hover:bg-[var(--color-surface-elevated)] hover:text-[var(--color-text-primary)] lg:hidden"
          aria-label="Buscar"
        >
          <Search className="h-5 w-5" />
        </button>

        {/* Notifications */}
        <button
          className="relative flex h-9 w-9 items-center justify-center rounded-lg text-[var(--color-text-muted)] transition-colors hover:bg-[var(--color-surface-elevated)] hover:text-[var(--color-text-primary)]"
          aria-label="Notificaciones"
        >
          <Bell className="h-5 w-5" />
          <span className="absolute right-1 top-1 flex h-4 w-4 items-center justify-center rounded-full bg-[var(--color-error)] text-[10px] font-medium text-white">
            3
          </span>
        </button>

        {/* User Menu */}
        <div className="flex items-center gap-1 border-l border-[var(--color-border)] pl-2 lg:gap-2 lg:pl-4">
          <button className="flex items-center gap-2 rounded-lg px-2 py-1 text-sm text-[var(--color-text-secondary)] transition-colors hover:bg-[var(--color-surface-elevated)]">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--color-primary)] text-white">
              <User className="h-4 w-4" />
            </div>
            <span className="hidden font-medium lg:inline">Usuario</span>
          </button>
          <button
            className="hidden h-9 w-9 items-center justify-center rounded-lg text-[var(--color-text-muted)] transition-colors hover:bg-[var(--color-surface-elevated)] hover:text-[var(--color-error)] lg:flex"
            aria-label="Cerrar sesión"
          >
            <LogOut className="h-5 w-5" />
          </button>
        </div>
      </div>
    </header>
  );
}
