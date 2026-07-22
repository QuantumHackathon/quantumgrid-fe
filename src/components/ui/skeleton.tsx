import { cn } from '@/lib/utils';

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'text' | 'circular' | 'rectangular';
  width?: string | number;
  height?: string | number;
}

export function Skeleton({
  className,
  variant = 'text',
  width,
  height,
  style,
  ...props
}: SkeletonProps) {
  const variants = {
    text: 'rounded',
    circular: 'rounded-full',
    rectangular: 'rounded-lg',
  };

  const defaultHeights = {
    text: 'h-4',
    circular: 'h-10 w-10',
    rectangular: 'h-24',
  };

  return (
    <div
      className={cn(
        'animate-skeleton-pulse bg-[var(--color-neutral-200)]',
        variants[variant],
        !height && defaultHeights[variant],
        !width && variant === 'text' && 'w-full',
        className
      )}
      style={{
        width: typeof width === 'number' ? `${width}px` : width,
        height: typeof height === 'number' ? `${height}px` : height,
        ...style,
      }}
      {...props}
    />
  );
}

// Pre-built skeleton patterns for common use cases
export function SkeletonCard() {
  return (
    <div className="rounded-lg border border-[var(--color-border)] bg-white p-4">
      <Skeleton variant="text" className="mb-2 h-3 w-1/3" />
      <Skeleton variant="text" className="mb-1 h-6 w-1/2" />
      <Skeleton variant="text" className="h-3 w-1/4" />
    </div>
  );
}

export function SkeletonChart() {
  return (
    <div className="rounded-lg border border-[var(--color-border)] bg-white p-4">
      <Skeleton variant="text" className="mb-4 h-5 w-1/4" />
      <Skeleton variant="rectangular" className="h-64 w-full" />
    </div>
  );
}

export function SkeletonTable({ rows = 5 }: { rows?: number }) {
  return (
    <div className="rounded-lg border border-[var(--color-border)] bg-white">
      <div className="border-b border-[var(--color-border)] p-4">
        <div className="flex gap-4">
          <Skeleton className="h-4 w-1/4" />
          <Skeleton className="h-4 w-1/4" />
          <Skeleton className="h-4 w-1/4" />
          <Skeleton className="h-4 w-1/4" />
        </div>
      </div>
      {Array.from({ length: rows }).map((_, i) => (
        <div
          key={i}
          className="flex gap-4 border-b border-[var(--color-border)] p-4 last:border-b-0"
        >
          <Skeleton className="h-4 w-1/4" />
          <Skeleton className="h-4 w-1/4" />
          <Skeleton className="h-4 w-1/4" />
          <Skeleton className="h-4 w-1/4" />
        </div>
      ))}
    </div>
  );
}
