import { cn } from '@/lib/utils';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'outlined' | 'glass' | 'glow' | 'elevated';
  interactive?: boolean;
}

export function Card({
  className,
  variant = 'default',
  interactive = false,
  children,
  ...props
}: CardProps) {
  const variants = {
    default:
      'bg-[var(--color-surface)] border border-[var(--color-border)]',
    outlined:
      'bg-transparent border border-[var(--color-border-strong)]',
    glass:
      'bg-[var(--glass-background)] backdrop-blur-[var(--glass-blur)] border border-[var(--glass-border)]',
    glow:
      'bg-[var(--color-surface)] border border-[var(--color-border-glow)] shadow-[var(--glow-soft)]',
    elevated:
      'bg-[var(--color-surface-elevated)] border border-[var(--color-border)] shadow-lg',
  };

  const interactiveStyles = {
    default: 'hover:border-[var(--color-border-strong)] hover:shadow-md',
    outlined: 'hover:border-[var(--color-primary)] hover:shadow-[var(--glow-soft)]',
    glass: 'hover:bg-[var(--color-surface-glass)] hover:border-[var(--color-border-strong)]',
    glow: 'hover:shadow-[var(--glow-primary)] hover:border-[var(--color-primary)]',
    elevated: 'hover:shadow-xl hover:-translate-y-0.5',
  };

  return (
    <div
      className={cn(
        'rounded-xl transition-all duration-[var(--duration-normal)] ease-[var(--ease-default)]',
        variants[variant],
        interactive && 'cursor-pointer',
        interactive && interactiveStyles[variant],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardHeader({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        'border-b border-[var(--color-border)] px-5 py-4',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardTitle({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3
      className={cn(
        'text-lg font-semibold text-[var(--color-text-primary)]',
        className
      )}
      {...props}
    >
      {children}
    </h3>
  );
}

export function CardDescription({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      className={cn('text-sm text-[var(--color-text-muted)]', className)}
      {...props}
    >
      {children}
    </p>
  );
}

export function CardContent({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn('p-5', className)} {...props}>
      {children}
    </div>
  );
}

export function CardFooter({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        'border-t border-[var(--color-border)] px-5 py-4',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
