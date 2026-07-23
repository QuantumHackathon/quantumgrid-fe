'use client';

import { Bell, Search, User, LogOut } from 'lucide-react';
import { usePathname } from 'next/navigation';

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

  // Get breadcrumb label
  const currentLabel = Object.entries(pathLabels).find(([path]) =>
    pathname.startsWith(path)
  )?.[1] || 'Dashboard';

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-[var(--color-border)] bg-[var(--color-surface)] px-6">
      {/* Breadcrumbs */}
      <div className="flex items-center gap-2">
        <nav className="flex items-center gap-1 text-sm">
          <span className="text-[var(--color-text-muted)]">SIENA-CR</span>
          <span className="text-[var(--color-text-muted)]">/</span>
          <span className="font-medium text-[var(--color-text-primary)]">
            {currentLabel}
          </span>
        </nav>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2">
        {/* Search */}
        <div className="relative hidden md:block">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--color-text-muted)]" />
          <input
            type="search"
            placeholder="Buscar..."
            className="h-9 w-64 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-elevated)] pl-9 pr-4 text-sm text-[var(--color-text-primary)] outline-none transition-colors placeholder:text-[var(--color-text-muted)] focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)]"
          />
        </div>

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
        <div className="flex items-center gap-2 border-l border-[var(--color-border)] pl-4">
          <button className="flex items-center gap-2 rounded-lg px-2 py-1 text-sm text-[var(--color-text-secondary)] transition-colors hover:bg-[var(--color-surface-elevated)]">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--color-primary)] text-white">
              <User className="h-4 w-4" />
            </div>
            <span className="hidden font-medium md:inline">Usuario</span>
          </button>
          <button
            className="flex h-9 w-9 items-center justify-center rounded-lg text-[var(--color-text-muted)] transition-colors hover:bg-[var(--color-surface-elevated)] hover:text-[var(--color-error)]"
            aria-label="Cerrar sesión"
          >
            <LogOut className="h-5 w-5" />
          </button>
        </div>
      </div>
    </header>
  );
}
