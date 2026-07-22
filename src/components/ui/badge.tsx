import { cn } from '@/lib/utils';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'success' | 'warning' | 'error' | 'info';
  size?: 'sm' | 'md';
}

export function Badge({
  className,
  variant = 'default',
  size = 'md',
  children,
  ...props
}: BadgeProps) {
  const variants = {
    default:
      'bg-[var(--color-neutral-100)] text-[var(--color-text-secondary)]',
    success:
      'bg-[var(--color-success-light)] text-[var(--color-success-dark)]',
    warning:
      'bg-[var(--color-warning-light)] text-[var(--color-warning-dark)]',
    error: 'bg-[var(--color-error-light)] text-[var(--color-error-dark)]',
    info: 'bg-[var(--color-info-light)] text-[var(--color-info-dark)]',
  };

  const sizes = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-1 text-xs',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full font-medium',
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
