'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  LineChart,
  Upload,
  Lightbulb,
  Factory,
  FileText,
  Settings,
  ChevronLeft,
  ChevronRight,
  X,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useUIStore } from '@/store/ui-store';
import { NAVIGATION_ITEMS } from '@/constants/navigation';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  LayoutDashboard,
  LineChart,
  Upload,
  Lightbulb,
  Factory,
  FileText,
  Settings,
};

export function Sidebar() {
  const pathname = usePathname();
  const { sidebarCollapsed, sidebarOpen, toggleSidebarCollapse, setSidebarOpen } = useUIStore();

  return (
    <>
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          'fixed left-0 top-0 z-50 flex h-screen flex-col border-r border-[var(--color-border)] bg-[var(--color-surface)] transition-all duration-200',
          // Mobile: full width, slide in/out
          'w-[280px] -translate-x-full lg:translate-x-0',
          sidebarOpen && 'translate-x-0',
          // Desktop: collapsible
          sidebarCollapsed ? 'lg:w-16' : 'lg:w-[var(--sidebar-width)]'
        )}
      >
        {/* Logo */}
        <div className="flex h-16 items-center justify-between border-b border-[var(--color-border)] px-4">
          <Link href="/dashboard" className="flex items-center gap-2" onClick={() => setSidebarOpen(false)}>
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--color-primary)] text-white">
              <span className="text-sm font-bold">Q</span>
            </div>
            {(!sidebarCollapsed || sidebarOpen) && (
              <span className="text-lg font-semibold text-[var(--color-primary)]">
                QuantumGrid
              </span>
            )}
          </Link>
          {/* Mobile close button */}
          <button
            onClick={() => setSidebarOpen(false)}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-[var(--color-text-muted)] transition-colors hover:bg-[var(--color-surface-elevated)] hover:text-[var(--color-text-primary)] lg:hidden"
            aria-label="Cerrar menú"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto p-3">
          <ul className="space-y-1">
            {NAVIGATION_ITEMS.map((item) => {
              const Icon = iconMap[item.icon];
              const isActive =
                pathname === item.href ||
                pathname.startsWith(`${item.href}/`) ||
                (item.href !== '/dashboard' && pathname.startsWith(item.href));

              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setSidebarOpen(false)}
                    className={cn(
                      'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-[var(--duration-fast)] ease-[var(--ease-default)]',
                      isActive
                        ? 'bg-[var(--color-primary)] text-white shadow-sm'
                        : 'text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-elevated)] hover:text-[var(--color-text-primary)] hover:translate-x-0.5',
                      sidebarCollapsed && !sidebarOpen && 'lg:justify-center lg:px-2 lg:hover:translate-x-0'
                    )}
                    title={sidebarCollapsed && !sidebarOpen ? item.label : undefined}
                  >
                    {Icon && <Icon className="h-5 w-5 shrink-0" />}
                    {(!sidebarCollapsed || sidebarOpen) && <span>{item.label}</span>}
                    {(!sidebarCollapsed || sidebarOpen) && item.badge && (
                      <span className="ml-auto flex h-5 w-5 items-center justify-center rounded-full bg-[var(--color-error)] text-xs text-white">
                        {item.badge}
                      </span>
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Collapse Button - Desktop only */}
        <div className="hidden border-t border-[var(--color-border)] p-3 lg:block">
          <button
            onClick={toggleSidebarCollapse}
            className="flex w-full items-center justify-center gap-2 rounded-lg px-3 py-2 text-sm text-[var(--color-text-muted)] transition-all duration-[var(--duration-fast)] ease-[var(--ease-default)] hover:bg-[var(--color-surface-elevated)] hover:text-[var(--color-text-primary)]"
            aria-label={sidebarCollapsed ? 'Expandir menú' : 'Colapsar menú'}
          >
            {sidebarCollapsed ? (
              <ChevronRight className="h-5 w-5" />
            ) : (
              <>
                <ChevronLeft className="h-5 w-5" />
                <span>Colapsar</span>
              </>
            )}
          </button>
        </div>
      </aside>
    </>
  );
}
