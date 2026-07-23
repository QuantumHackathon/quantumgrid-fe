'use client';

import { memo, useCallback } from 'react';
import {
  Lightbulb,
  Zap,
  Wrench,
  DollarSign,
  Leaf,
  ChevronRight,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Card, CardContent, Badge } from '@/components/ui';
import type { Insight, InsightCategory, Priority } from '@/types';

export interface InsightCardProps {
  insight: Insight;
  className?: string;
  onClick?: (insight: Insight) => void;
  compact?: boolean;
}

const categoryIcons: Record<InsightCategory, typeof Lightbulb> = {
  efficiency: Zap,
  capacity: Lightbulb,
  maintenance: Wrench,
  cost: DollarSign,
  sustainability: Leaf,
};

const categoryLabels: Record<InsightCategory, string> = {
  efficiency: 'Eficiencia',
  capacity: 'Capacidad',
  maintenance: 'Mantenimiento',
  cost: 'Costos',
  sustainability: 'Sostenibilidad',
};

const priorityVariants: Record<Priority, 'error' | 'warning' | 'info'> = {
  high: 'error',
  medium: 'warning',
  low: 'info',
};

const priorityLabels: Record<Priority, string> = {
  high: 'Alta',
  medium: 'Media',
  low: 'Baja',
};

export const InsightCard = memo(function InsightCard({
  insight,
  className,
  onClick,
  compact = false,
}: InsightCardProps) {
  const CategoryIcon = categoryIcons[insight.category];

  const handleClick = useCallback(() => {
    onClick?.(insight);
  }, [onClick, insight]);

  return (
    <Card
      className={cn(
        'transition-all',
        onClick && 'cursor-pointer hover:shadow-md hover:border-[var(--color-primary)] active:scale-[0.99]',
        className
      )}
      onClick={handleClick}
    >
      <CardContent className={cn('p-4', compact && 'p-3')}>
        <div className="flex items-start gap-3">
          <div
            className={cn(
              'flex shrink-0 items-center justify-center rounded-lg bg-[var(--color-primary-light)] p-2',
              compact && 'p-1.5'
            )}
          >
            <CategoryIcon
              className={cn(
                'h-5 w-5 text-[var(--color-primary)]',
                compact && 'h-4 w-4'
              )}
            />
          </div>
          <div className="min-w-0 flex-1">
            <div className="mb-1 flex items-center justify-between gap-2">
              <span className="text-xs text-[var(--color-text-muted)]">
                {categoryLabels[insight.category]}
              </span>
              <Badge
                variant={priorityVariants[insight.priority]}
                size="sm"
              >
                {priorityLabels[insight.priority]}
              </Badge>
            </div>
            <h4
              className={cn(
                'mb-1 font-medium text-[var(--color-text-primary)]',
                compact ? 'text-sm' : 'text-base'
              )}
            >
              {insight.title}
            </h4>
            {!compact && (
              <p className="mb-2 line-clamp-2 text-sm text-[var(--color-text-muted)]">
                {insight.description}
              </p>
            )}
            <div className="flex items-center justify-between">
              {insight.impact && (
                <span
                  className={cn(
                    'font-medium text-[var(--color-success)]',
                    compact ? 'text-xs' : 'text-sm'
                  )}
                >
                  {insight.impact}
                </span>
              )}
              {onClick && (
                <ChevronRight className="h-4 w-4 text-[var(--color-text-muted)]" />
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
});
