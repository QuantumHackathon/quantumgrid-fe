'use client';

import { memo, useMemo } from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Card, CardContent } from '@/components/ui';
import type { KPIMetric } from '@/types';

export interface MetricCardProps {
  metric: KPIMetric;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

const changeIcons = {
  increase: TrendingUp,
  decrease: TrendingDown,
  neutral: Minus,
};

const changeColors = {
  increase: 'text-[var(--color-success)]',
  decrease: 'text-[var(--color-error)]',
  neutral: 'text-[var(--color-text-muted)]',
};

const sizes = {
  sm: {
    value: 'text-xl',
    label: 'text-xs',
    change: 'text-xs',
  },
  md: {
    value: 'text-2xl',
    label: 'text-sm',
    change: 'text-sm',
  },
  lg: {
    value: 'text-3xl',
    label: 'text-base',
    change: 'text-base',
  },
};

export const MetricCard = memo(function MetricCard({ metric, className, size = 'md' }: MetricCardProps) {
  const ChangeIcon = changeIcons[metric.changeType];
  const changeColor = changeColors[metric.changeType];
  const sizeStyles = sizes[size];

  const formattedValue = useMemo(() => {
    const { value, unit } = metric;
    if (unit === 'MW' || unit === 'GWh') {
      return value.toLocaleString('es-CR', { maximumFractionDigits: 1 });
    }
    if (unit === '%') {
      return value.toFixed(1);
    }
    return value.toLocaleString('es-CR');
  }, [metric]);

  const formattedChange = useMemo(() => {
    const prefix = metric.change > 0 ? '+' : '';
    return `${prefix}${metric.change.toFixed(1)}%`;
  }, [metric.change]);

  return (
    <Card className={cn('transition-shadow hover:shadow-md', className)}>
      <CardContent className="p-4">
        <p
          className={cn(
            'mb-1 font-medium text-[var(--color-text-muted)]',
            sizeStyles.label
          )}
        >
          {metric.label}
        </p>
        <div className="flex items-baseline gap-2">
          <span
            className={cn(
              'font-semibold text-[var(--color-text-primary)]',
              sizeStyles.value
            )}
          >
            {formattedValue}
          </span>
          <span
            className={cn('text-[var(--color-text-muted)]', sizeStyles.label)}
          >
            {metric.unit}
          </span>
        </div>
        <div className={cn('mt-2 flex items-center gap-1', sizeStyles.change)}>
          <ChangeIcon className={cn('h-4 w-4', changeColor)} />
          <span className={changeColor}>{formattedChange}</span>
          {metric.subtext && (
            <span className="text-[var(--color-text-muted)]">
              {metric.subtext}
            </span>
          )}
        </div>
      </CardContent>
    </Card>
  );
});
