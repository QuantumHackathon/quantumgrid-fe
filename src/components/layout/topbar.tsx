'use client';

import { useState, useRef, useEffect } from 'react';
import { Bell, User, LogOut, Menu, X } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useUIStore } from '@/store/ui-store';
import { mockAlerts } from '@/lib/mock-data';
import { cn } from '@/lib/utils';

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
  const router = useRouter();
  const { setSidebarOpen } = useUIStore();
  const [showNotifications, setShowNotifications] = useState(false);
  const [dismissedAlerts, setDismissedAlerts] = useState<string[]>([]);
  const notificationRef = useRef<HTMLDivElement>(null);

  const activeAlerts = mockAlerts.filter(alert => !dismissedAlerts.includes(alert.id));

  // Close notifications when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
        setShowNotifications(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Get breadcrumb label
  const currentLabel = Object.entries(pathLabels).find(([path]) =>
    pathname.startsWith(path)
  )?.[1] || 'Dashboard';

  const formatTime = (timestamp: string) => {
    const now = new Date();
    const diff = now.getTime() - new Date(timestamp).getTime();
    const minutes = Math.floor(diff / 60000);
    if (minutes < 60) return `Hace ${minutes} min`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `Hace ${hours}h`;
    return `Hace ${Math.floor(hours / 24)}d`;
  };

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
        {/* Notifications */}
        <div className="relative" ref={notificationRef}>
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className={cn(
              "relative flex h-9 w-9 items-center justify-center rounded-lg transition-colors",
              showNotifications
                ? "bg-[var(--color-surface-elevated)] text-[var(--color-text-primary)]"
                : "text-[var(--color-text-muted)] hover:bg-[var(--color-surface-elevated)] hover:text-[var(--color-text-primary)]"
            )}
            aria-label="Notificaciones"
          >
            <Bell className="h-5 w-5" />
            {activeAlerts.length > 0 && (
              <span className="absolute right-1 top-1 flex h-4 w-4 items-center justify-center rounded-full bg-[var(--color-error)] text-[10px] font-medium text-white">
                {activeAlerts.length}
              </span>
            )}
          </button>

          {/* Notifications Dropdown */}
          {showNotifications && (
            <div className="absolute right-0 top-full mt-2 w-80 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] shadow-lg">
              <div className="flex items-center justify-between border-b border-[var(--color-border)] p-3">
                <h3 className="font-medium text-[var(--color-text-primary)]">Notificaciones</h3>
                {activeAlerts.length > 0 && (
                  <button
                    onClick={() => setDismissedAlerts(mockAlerts.map(a => a.id))}
                    className="text-xs text-[var(--color-primary)] hover:underline"
                  >
                    Marcar todas como leídas
                  </button>
                )}
              </div>
              <div className="max-h-80 overflow-y-auto">
                {activeAlerts.length > 0 ? (
                  activeAlerts.map((alert) => (
                    <div
                      key={alert.id}
                      className="flex items-start gap-3 border-b border-[var(--color-border)] p-3 last:border-b-0 hover:bg-[var(--color-surface-elevated)]"
                    >
                      <span
                        className={cn(
                          'mt-1.5 h-2 w-2 shrink-0 rounded-full',
                          alert.type === 'warning' && 'bg-[var(--color-warning)]',
                          alert.type === 'error' && 'bg-[var(--color-error)]',
                          alert.type === 'info' && 'bg-[var(--color-info)]',
                          alert.type === 'success' && 'bg-[var(--color-success)]'
                        )}
                      />
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium text-[var(--color-text-primary)]">
                          {alert.title}
                        </p>
                        <p className="mt-0.5 text-xs text-[var(--color-text-muted)] line-clamp-2">
                          {alert.message}
                        </p>
                        <p className="mt-1 text-xs text-[var(--color-text-muted)]">
                          {formatTime(alert.timestamp)}
                        </p>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setDismissedAlerts([...dismissedAlerts, alert.id]);
                        }}
                        className="shrink-0 rounded p-1 text-[var(--color-text-muted)] hover:bg-[var(--color-surface)] hover:text-[var(--color-text-primary)]"
                        aria-label="Descartar"
                      >
                        <X className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  ))
                ) : (
                  <div className="p-6 text-center text-sm text-[var(--color-text-muted)]">
                    No hay notificaciones nuevas
                  </div>
                )}
              </div>
              {activeAlerts.length > 0 && (
                <div className="border-t border-[var(--color-border)] p-2">
                  <button
                    onClick={() => {
                      setShowNotifications(false);
                      router.push('/settings');
                    }}
                    className="w-full rounded-lg py-2 text-center text-sm text-[var(--color-primary)] hover:bg-[var(--color-surface-elevated)]"
                  >
                    Ver configuración
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

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
