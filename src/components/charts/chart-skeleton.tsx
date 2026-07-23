'use client';

import { cn } from '@/lib/utils';

interface ChartSkeletonProps {
  height?: number | string;
  className?: string;
  variant?: 'area' | 'pie' | 'line' | 'bar';
}

export function ChartSkeleton({
  height = 300,
  className,
  variant = 'area'
}: ChartSkeletonProps) {
  const heightValue = typeof height === 'number' ? `${height}px` : height;

  return (
    <div
      className={cn(
        'flex items-center justify-center rounded-lg bg-[var(--color-surface-elevated)]',
        className
      )}
      style={{ height: heightValue, width: '100%' }}
    >
      <div className="flex flex-col items-center gap-3">
        {variant === 'pie' ? (
          <div className="h-24 w-24 animate-pulse rounded-full border-8 border-[var(--color-neutral-200)] border-t-[var(--color-primary)]" />
        ) : (
          <div className="flex items-end gap-1">
            {[40, 60, 45, 80, 55, 70, 50].map((h, i) => (
              <div
                key={i}
                className="w-4 animate-pulse rounded-t bg-[var(--color-neutral-200)]"
                style={{
                  height: `${h}px`,
                  animationDelay: `${i * 100}ms`
                }}
              />
            ))}
          </div>
        )}
        <span className="text-sm text-[var(--color-text-muted)]">
          Cargando gráfico...
        </span>
      </div>
    </div>
  );
}
