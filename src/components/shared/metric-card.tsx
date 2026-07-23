'use client';

import { memo, useMemo } from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Card, CardContent } from '@/components/ui';
import type { KPIMetric } from '@/types';

export interface MetricCardProps {
  metric: KPIMetric;
  className?: string;
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

export const MetricCard = memo(function MetricCard({ metric, className }: MetricCardProps) {
  const ChangeIcon = changeIcons[metric.changeType];
  const changeColor = changeColors[metric.changeType];

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
      <CardContent className="p-3 lg:p-4">
        <p className="mb-1 text-xs font-medium text-[var(--color-text-muted)] lg:text-sm line-clamp-1">
          {metric.label}
        </p>
        <div className="flex items-baseline gap-1 lg:gap-2">
          <span className="text-lg font-semibold text-[var(--color-text-primary)] lg:text-2xl">
            {formattedValue}
          </span>
          <span className="text-xs text-[var(--color-text-muted)] lg:text-sm">
            {metric.unit}
          </span>
        </div>
        <div className="mt-1.5 flex items-center gap-1 text-xs lg:mt-2 lg:text-sm">
          <ChangeIcon className={cn('h-3 w-3 lg:h-4 lg:w-4', changeColor)} />
          <span className={changeColor}>{formattedChange}</span>
          {metric.subtext && (
            <span className="hidden text-[var(--color-text-muted)] sm:inline">
              {metric.subtext}
            </span>
          )}
        </div>
      </CardContent>
    </Card>
  );
});
