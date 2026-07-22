import { forwardRef } from 'react';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger' | 'outline' | 'glass' | 'glow';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = 'primary',
      size = 'md',
      isLoading = false,
      leftIcon,
      rightIcon,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-[var(--duration-fast)] ease-[var(--ease-default)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-background)] disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98] cursor-pointer';

    const variants = {
      primary:
        'bg-[var(--color-primary)] text-[var(--color-text-inverse)] hover:bg-[var(--color-primary-light)] hover:shadow-[var(--glow-primary)] focus-visible:ring-[var(--color-primary)]',
      secondary:
        'bg-[var(--color-secondary)] text-[var(--color-text-inverse)] hover:bg-[var(--color-secondary-light)] hover:shadow-[var(--glow-secondary)] focus-visible:ring-[var(--color-secondary)]',
      ghost:
        'bg-transparent text-[var(--color-text-primary)] hover:bg-[var(--color-surface)] hover:text-[var(--color-primary)] focus-visible:ring-[var(--color-primary)]',
      danger:
        'bg-[var(--color-error)] text-white hover:bg-[var(--color-error-dark)] hover:shadow-[0_0_20px_rgba(255,71,87,0.3)] focus-visible:ring-[var(--color-error)]',
      outline:
        'border border-[var(--color-border-strong)] bg-transparent text-[var(--color-text-primary)] hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] focus-visible:ring-[var(--color-primary)]',
      glass:
        'bg-[var(--glass-background)] backdrop-blur-[var(--glass-blur)] border border-[var(--glass-border)] text-[var(--color-text-primary)] hover:bg-[var(--color-surface)] hover:border-[var(--color-border-strong)] focus-visible:ring-[var(--color-primary)]',
      glow:
        'bg-[var(--color-surface)] border border-[var(--color-border-glow)] text-[var(--color-primary)] shadow-[var(--glow-soft)] hover:shadow-[var(--glow-primary)] hover:border-[var(--color-primary)] focus-visible:ring-[var(--color-primary)]',
    };

    const sizes = {
      sm: 'h-8 px-3 text-sm gap-1.5',
      md: 'h-10 px-4 text-sm gap-2',
      lg: 'h-12 px-6 text-base gap-2',
    };

    return (
      <button
        ref={ref}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          leftIcon
        )}
        {children}
        {!isLoading && rightIcon}
      </button>
    );
  }
);

Button.displayName = 'Button';

export { Button };
