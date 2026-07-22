'use client';

import { AlertTriangle, RefreshCw, Home, HelpCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui';

export type ErrorSeverity = 'warning' | 'error' | 'critical';

export interface ErrorStateProps {
  severity?: ErrorSeverity;
  title?: string;
  message: string;
  details?: string;
  onRetry?: () => void;
  onGoHome?: () => void;
  onGetHelp?: () => void;
  className?: string;
  showRetry?: boolean;
  isRetrying?: boolean;
}

const severityStyles: Record<ErrorSeverity, { bg: string; icon: string; border: string }> = {
  warning: {
    bg: 'bg-[var(--color-warning-light)]',
    icon: 'text-[var(--color-warning)]',
    border: 'border-[var(--color-warning)]',
  },
  error: {
    bg: 'bg-[var(--color-error-light)]',
    icon: 'text-[var(--color-error)]',
    border: 'border-[var(--color-error)]',
  },
  critical: {
    bg: 'bg-[var(--color-error)]',
    icon: 'text-white',
    border: 'border-[var(--color-error-dark)]',
  },
};

const defaultTitles: Record<ErrorSeverity, string> = {
  warning: 'Advertencia',
  error: 'Ha ocurrido un error',
  critical: 'Error crítico',
};

export function ErrorState({
  severity = 'error',
  title,
  message,
  details,
  onRetry,
  onGoHome,
  onGetHelp,
  className,
  showRetry = true,
  isRetrying = false,
}: ErrorStateProps) {
  const styles = severityStyles[severity];
  const displayTitle = title || defaultTitles[severity];

  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center px-4 py-12 text-center',
        className
      )}
    >
      <div
        className={cn(
          'mb-4 flex h-16 w-16 items-center justify-center rounded-full',
          styles.bg
        )}
      >
        <AlertTriangle className={cn('h-8 w-8', styles.icon)} />
      </div>
      <h3
        className={cn(
          'mb-2 text-lg font-semibold',
          severity === 'critical'
            ? 'text-[var(--color-error)]'
            : 'text-[var(--color-text-primary)]'
        )}
      >
        {displayTitle}
      </h3>
      <p className="mb-2 max-w-md text-sm text-[var(--color-text-muted)]">
        {message}
      </p>
      {details && (
        <details className="mb-6 max-w-md">
          <summary className="cursor-pointer text-sm text-[var(--color-text-muted)] hover:text-[var(--color-text-secondary)]">
            Ver detalles técnicos
          </summary>
          <pre className="mt-2 overflow-auto rounded-lg bg-[var(--color-neutral-100)] p-3 text-left text-xs text-[var(--color-text-secondary)]">
            {details}
          </pre>
        </details>
      )}
      <div className="flex items-center gap-3">
        {showRetry && onRetry && (
          <Button
            variant="primary"
            onClick={onRetry}
            isLoading={isRetrying}
            leftIcon={<RefreshCw className="h-4 w-4" />}
          >
            Reintentar
          </Button>
        )}
        {onGoHome && (
          <Button
            variant="outline"
            onClick={onGoHome}
            leftIcon={<Home className="h-4 w-4" />}
          >
            Ir al inicio
          </Button>
        )}
        {onGetHelp && (
          <Button
            variant="ghost"
            onClick={onGetHelp}
            leftIcon={<HelpCircle className="h-4 w-4" />}
          >
            Obtener ayuda
          </Button>
        )}
      </div>
    </div>
  );
}
