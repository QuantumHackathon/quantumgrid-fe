'use client';

import { cn } from '@/lib/utils';
import { Card, CardHeader, CardTitle, CardContent, Skeleton } from '@/components/ui';

export interface ChartWrapperProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  className?: string;
  height?: number | string;
  isLoading?: boolean;
  actions?: React.ReactNode;
  footer?: React.ReactNode;
}

export function ChartWrapper({
  title,
  subtitle,
  children,
  className,
  height = 300,
  isLoading = false,
  actions,
  footer,
}: ChartWrapperProps) {
  const heightValue = typeof height === 'number' ? `${height}px` : height;

  return (
    <Card className={cn('overflow-hidden', className)}>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>{title}</CardTitle>
          {subtitle && (
            <p className="mt-1 text-sm text-[var(--color-text-muted)]">
              {subtitle}
            </p>
          )}
        </div>
        {actions && <div className="flex items-center gap-2">{actions}</div>}
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div style={{ height: heightValue }}>
            <Skeleton variant="rectangular" className="h-full w-full" />
          </div>
        ) : (
          <div
            className="animate-fade-in"
            style={{ height: heightValue, width: '100%' }}
          >
            {children}
          </div>
        )}
      </CardContent>
      {footer && (
        <div className="border-t border-[var(--color-border)] px-4 py-3">
          {footer}
        </div>
      )}
    </Card>
  );
}
