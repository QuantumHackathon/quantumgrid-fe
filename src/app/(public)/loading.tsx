import { Skeleton } from '@/components/ui';

export default function PublicLoading() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Header Skeleton */}
      <div className="border-b border-[var(--color-border)] bg-white px-6 py-4">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <Skeleton className="h-8 w-32" />
          <div className="flex items-center gap-4">
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-9 w-24" />
          </div>
        </div>
      </div>

      {/* Content Skeleton */}
      <div className="flex flex-1 items-center justify-center">
        <div className="text-center">
          <Skeleton variant="circular" className="mx-auto mb-4 h-12 w-12" />
          <Skeleton className="mx-auto mb-2 h-4 w-32" />
        </div>
      </div>
    </div>
  );
}
