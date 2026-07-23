import { forwardRef } from 'react';
import { cn } from '@/lib/utils';
import { ChevronDown } from 'lucide-react';

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectProps
  extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'children'> {
  label?: string;
  error?: string;
  helperText?: string;
  options: SelectOption[];
  placeholder?: string;
  leftIcon?: React.ReactNode;
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (
    { className, label, error, helperText, options, placeholder, leftIcon, id, ...props },
    ref
  ) => {
    const selectId = id || label?.toLowerCase().replace(/\s+/g, '-');

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={selectId}
            className="mb-1.5 block text-sm font-medium text-[var(--color-text-primary)]"
          >
            {label}
          </label>
        )}
        <div className="relative">
          {leftIcon && (
            <div className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)]">
              {leftIcon}
            </div>
          )}
          <select
            ref={ref}
            id={selectId}
            className={cn(
              'flex h-10 w-full appearance-none rounded-lg border bg-[var(--color-surface-elevated)] pr-10 text-sm outline-none transition-all duration-[var(--duration-fast)] ease-[var(--ease-default)]',
              'focus:ring-1 focus:shadow-sm',
              leftIcon ? 'pl-10' : 'pl-3',
              error
                ? 'border-[var(--color-error)] focus:border-[var(--color-error)] focus:ring-[var(--color-error)]'
                : 'border-[var(--color-border)] focus:border-[var(--color-primary)] focus:ring-[var(--color-primary)]',
              'disabled:cursor-not-allowed disabled:bg-[var(--color-neutral-100)] disabled:text-[var(--color-text-disabled)]',
              className
            )}
            aria-invalid={!!error}
            {...props}
          >
            {placeholder && (
              <option value="" disabled>
                {placeholder}
              </option>
            )}
            {options.map((option) => (
              <option
                key={option.value}
                value={option.value}
                disabled={option.disabled}
              >
                {option.label}
              </option>
            ))}
          </select>
          <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--color-text-muted)]" />
        </div>
        {error && (
          <p className="mt-1.5 text-sm text-[var(--color-error)]">{error}</p>
        )}
        {helperText && !error && (
          <p className="mt-1.5 text-sm text-[var(--color-text-muted)]">
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Select.displayName = 'Select';

export { Select };
