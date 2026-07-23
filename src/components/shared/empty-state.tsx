'use client';

import { FileQuestion, Search, Database, Upload, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui';

export type EmptyStateVariant = 'default' | 'search' | 'data' | 'upload' | 'error';

export interface EmptyStateProps {
  variant?: EmptyStateVariant;
  title: string;
  description?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  secondaryAction?: {
    label: string;
    onClick: () => void;
  };
  className?: string;
  icon?: React.ReactNode;
}

const variantIcons: Record<EmptyStateVariant, typeof FileQuestion> = {
  default: FileQuestion,
  search: Search,
  data: Database,
  upload: Upload,
  error: AlertCircle,
};

export function EmptyState({
  variant = 'default',
  title,
  description,
  action,
  secondaryAction,
  className,
  icon,
}: EmptyStateProps) {
  const Icon = variantIcons[variant];

  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center px-4 py-12 text-center',
        className
      )}
    >
      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[var(--color-surface-elevated)]">
        {icon || <Icon className="h-8 w-8 text-[var(--color-text-muted)]" />}
      </div>
      <h3 className="mb-2 text-lg font-semibold text-[var(--color-text-primary)]">
        {title}
      </h3>
      {description && (
        <p className="mb-6 max-w-md text-sm text-[var(--color-text-muted)]">
          {description}
        </p>
      )}
      {(action || secondaryAction) && (
        <div className="flex items-center gap-3">
          {action && (
            <Button variant="primary" onClick={action.onClick}>
              {action.label}
            </Button>
          )}
          {secondaryAction && (
            <Button variant="outline" onClick={secondaryAction.onClick}>
              {secondaryAction.label}
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
