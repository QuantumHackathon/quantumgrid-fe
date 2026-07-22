import { cn } from '@/lib/utils';
import {
  AlertCircle,
  CheckCircle,
  Info,
  AlertTriangle,
  X,
} from 'lucide-react';

export interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'info' | 'success' | 'warning' | 'error';
  title?: string;
  dismissible?: boolean;
  onDismiss?: () => void;
}

const icons = {
  info: Info,
  success: CheckCircle,
  warning: AlertTriangle,
  error: AlertCircle,
};

const variants = {
  info: {
    container: 'bg-[var(--color-info-light)] border-[var(--color-info)]',
    icon: 'text-[var(--color-info)]',
    title: 'text-[var(--color-info-dark)]',
    text: 'text-[var(--color-info-dark)]',
  },
  success: {
    container: 'bg-[var(--color-success-light)] border-[var(--color-success)]',
    icon: 'text-[var(--color-success)]',
    title: 'text-[var(--color-success-dark)]',
    text: 'text-[var(--color-success-dark)]',
  },
  warning: {
    container: 'bg-[var(--color-warning-light)] border-[var(--color-warning)]',
    icon: 'text-[var(--color-warning)]',
    title: 'text-[var(--color-warning-dark)]',
    text: 'text-[var(--color-warning-dark)]',
  },
  error: {
    container: 'bg-[var(--color-error-light)] border-[var(--color-error)]',
    icon: 'text-[var(--color-error)]',
    title: 'text-[var(--color-error-dark)]',
    text: 'text-[var(--color-error-dark)]',
  },
};

export function Alert({
  className,
  variant = 'info',
  title,
  dismissible,
  onDismiss,
  children,
  ...props
}: AlertProps) {
  const Icon = icons[variant];
  const styles = variants[variant];

  return (
    <div
      role="alert"
      className={cn(
        'relative flex gap-3 rounded-lg border p-4 animate-slide-in-up',
        styles.container,
        className
      )}
      {...props}
    >
      <Icon className={cn('h-5 w-5 shrink-0', styles.icon)} />
      <div className="flex-1">
        {title && (
          <h5 className={cn('mb-1 font-medium', styles.title)}>{title}</h5>
        )}
        <div className={cn('text-sm', styles.text)}>{children}</div>
      </div>
      {dismissible && (
        <button
          onClick={onDismiss}
          className={cn(
            'absolute right-2 top-2 rounded p-1 transition-all duration-[var(--duration-fast)] ease-[var(--ease-default)] hover:bg-black/5 hover:scale-110 active:scale-95',
            styles.icon
          )}
          aria-label="Cerrar alerta"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}
