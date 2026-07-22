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
  const { sidebarCollapsed, toggleSidebarCollapse } = useUIStore();

  return (
    <aside
      className={cn(
        'fixed left-0 top-0 z-40 flex h-screen flex-col border-r border-[var(--color-border)] bg-white transition-all duration-200',
        sidebarCollapsed ? 'w-16' : 'w-[var(--sidebar-width)]'
      )}
    >
      {/* Logo */}
      <div className="flex h-16 items-center border-b border-[var(--color-border)] px-4">
        <Link href="/dashboard" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--color-primary)] text-white">
            <span className="text-sm font-bold">S</span>
          </div>
          {!sidebarCollapsed && (
            <span className="text-lg font-semibold text-[var(--color-primary)]">
              SIENA-CR
            </span>
          )}
        </Link>
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
                  className={cn(
                    'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all duration-[var(--duration-fast)] ease-[var(--ease-default)]',
                    isActive
                      ? 'bg-[var(--color-primary)] text-white shadow-sm'
                      : 'text-[var(--color-text-secondary)] hover:bg-[var(--color-neutral-100)] hover:text-[var(--color-text-primary)] hover:translate-x-0.5',
                    sidebarCollapsed && 'justify-center px-2 hover:translate-x-0'
                  )}
                  title={sidebarCollapsed ? item.label : undefined}
                >
                  {Icon && <Icon className="h-5 w-5 shrink-0" />}
                  {!sidebarCollapsed && <span>{item.label}</span>}
                  {!sidebarCollapsed && item.badge && (
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

      {/* Collapse Button */}
      <div className="border-t border-[var(--color-border)] p-3">
        <button
          onClick={toggleSidebarCollapse}
          className="flex w-full items-center justify-center gap-2 rounded-lg px-3 py-2 text-sm text-[var(--color-text-muted)] transition-all duration-[var(--duration-fast)] ease-[var(--ease-default)] hover:bg-[var(--color-neutral-100)] hover:text-[var(--color-text-primary)]"
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
  );
}
