'use client';

import { cn } from '@/lib/utils';

export interface ProgressIndicatorProps {
  value: number;
  max?: number;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'success' | 'warning' | 'error';
  showLabel?: boolean;
  label?: string;
  className?: string;
}

const sizeStyles = {
  sm: 'h-1',
  md: 'h-2',
  lg: 'h-3',
};

const variantStyles = {
  default: 'bg-[var(--color-primary)]',
  success: 'bg-[var(--color-success)]',
  warning: 'bg-[var(--color-warning)]',
  error: 'bg-[var(--color-error)]',
};

export function ProgressIndicator({
  value,
  max = 100,
  size = 'md',
  variant = 'default',
  showLabel = false,
  label,
  className,
}: ProgressIndicatorProps) {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

  return (
    <div className={cn('w-full', className)}>
      {(showLabel || label) && (
        <div className="mb-1 flex items-center justify-between">
          {label && (
            <span className="text-sm text-[var(--color-text-secondary)]">
              {label}
            </span>
          )}
          {showLabel && (
            <span className="text-sm font-medium text-[var(--color-text-primary)]">
              {Math.round(percentage)}%
            </span>
          )}
        </div>
      )}
      <div
        className={cn(
          'w-full overflow-hidden rounded-full bg-[var(--color-neutral-200)]',
          sizeStyles[size]
        )}
        role="progressbar"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={max}
      >
        <div
          className={cn(
            'h-full rounded-full transition-all duration-[var(--duration-slow)] ease-[var(--ease-default)]',
            variantStyles[variant]
          )}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}

// Stepped progress indicator for multi-step processes
export interface StepProgressProps {
  steps: string[];
  currentStep: number;
  className?: string;
}

export function StepProgress({ steps, currentStep, className }: StepProgressProps) {
  return (
    <div className={cn('w-full', className)}>
      <div className="flex items-center justify-between">
        {steps.map((step, index) => {
          const isCompleted = index < currentStep;
          const isCurrent = index === currentStep;

          return (
            <div key={step} className="flex flex-1 items-center">
              <div className="flex flex-col items-center">
                <div
                  className={cn(
                    'flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium transition-all duration-[var(--duration-normal)] ease-[var(--ease-default)]',
                    isCompleted && 'bg-[var(--color-success)] text-white scale-100',
                    isCurrent && 'bg-[var(--color-primary)] text-white scale-110',
                    !isCompleted && !isCurrent && 'bg-[var(--color-neutral-200)] text-[var(--color-text-muted)] scale-100'
                  )}
                >
                  {isCompleted ? '✓' : index + 1}
                </div>
                <span
                  className={cn(
                    'mt-2 text-xs',
                    isCurrent
                      ? 'font-medium text-[var(--color-text-primary)]'
                      : 'text-[var(--color-text-muted)]'
                  )}
                >
                  {step}
                </span>
              </div>
              {index < steps.length - 1 && (
                <div
                  className={cn(
                    'mx-2 h-0.5 flex-1 transition-colors duration-[var(--duration-slow)] ease-[var(--ease-default)]',
                    index < currentStep
                      ? 'bg-[var(--color-success)]'
                      : 'bg-[var(--color-neutral-200)]'
                  )}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
