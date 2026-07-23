'use client';

import { useState, useMemo } from 'react';
import {
  ChevronUp,
  ChevronDown,
  ChevronsUpDown,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button, Skeleton } from '@/components/ui';

export interface Column<T> {
  key: keyof T | string;
  header: string;
  sortable?: boolean;
  width?: string;
  align?: 'left' | 'center' | 'right';
  render?: (value: unknown, row: T, index: number) => React.ReactNode;
}

export interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  keyExtractor: (row: T, index: number) => string;
  isLoading?: boolean;
  emptyMessage?: string;
  className?: string;
  pageSize?: number;
  showPagination?: boolean;
  onRowClick?: (row: T) => void;
  selectedRow?: string | null;
}

type SortDirection = 'asc' | 'desc' | null;

export function DataTable<T>({
  columns,
  data,
  keyExtractor,
  isLoading = false,
  emptyMessage = 'No hay datos disponibles',
  className,
  pageSize = 10,
  showPagination = true,
  onRowClick,
  selectedRow,
}: DataTableProps<T>) {
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const handleSort = (columnKey: string) => {
    if (sortColumn === columnKey) {
      if (sortDirection === 'asc') {
        setSortDirection('desc');
      } else if (sortDirection === 'desc') {
        setSortColumn(null);
        setSortDirection(null);
      }
    } else {
      setSortColumn(columnKey);
      setSortDirection('asc');
    }
  };

  const sortedData = useMemo(() => {
    if (!sortColumn || !sortDirection) return data;

    return [...data].sort((a, b) => {
      const aValue = (a as Record<string, unknown>)[sortColumn];
      const bValue = (b as Record<string, unknown>)[sortColumn];

      if (aValue === null || aValue === undefined) return 1;
      if (bValue === null || bValue === undefined) return -1;

      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return sortDirection === 'asc'
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }

      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return sortDirection === 'asc' ? aValue - bValue : bValue - aValue;
      }

      return 0;
    });
  }, [data, sortColumn, sortDirection]);

  const paginatedData = useMemo(() => {
    if (!showPagination) return sortedData;
    const start = (currentPage - 1) * pageSize;
    return sortedData.slice(start, start + pageSize);
  }, [sortedData, currentPage, pageSize, showPagination]);

  const totalPages = Math.ceil(data.length / pageSize);

  const getValue = (row: T, key: string): unknown => {
    return (row as Record<string, unknown>)[key];
  };

  const SortIcon = ({ columnKey }: { columnKey: string }) => {
    if (sortColumn !== columnKey) {
      return <ChevronsUpDown className="h-4 w-4 text-[var(--color-text-muted)]" />;
    }
    if (sortDirection === 'asc') {
      return <ChevronUp className="h-4 w-4 text-[var(--color-primary)]" />;
    }
    return <ChevronDown className="h-4 w-4 text-[var(--color-primary)]" />;
  };

  if (isLoading) {
    return (
      <div className={cn('overflow-hidden rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)]', className)}>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-[var(--color-border)] bg-[var(--color-surface-elevated)]">
              <tr>
                {columns.map((column) => (
                  <th
                    key={String(column.key)}
                    className="px-4 py-3 text-left text-sm font-medium text-[var(--color-text-secondary)]"
                    style={{ width: column.width }}
                  >
                    <Skeleton className="h-4 w-20" />
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--color-border)]">
              {Array.from({ length: 5 }).map((_, i) => (
                <tr key={i}>
                  {columns.map((column) => (
                    <td key={String(column.key)} className="px-4 py-3">
                      <Skeleton className="h-4 w-full" />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className={cn('rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-8 text-center', className)}>
        <p className="text-[var(--color-text-muted)]">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className={cn('overflow-hidden rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)]', className)}>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="border-b border-[var(--color-border)] bg-[var(--color-surface-elevated)]">
            <tr>
              {columns.map((column) => (
                <th
                  key={String(column.key)}
                  className={cn(
                    'px-4 py-3 text-sm font-medium text-[var(--color-text-secondary)] transition-colors duration-[var(--duration-fast)] ease-[var(--ease-default)]',
                    column.align === 'center' && 'text-center',
                    column.align === 'right' && 'text-right',
                    column.sortable && 'cursor-pointer select-none hover:bg-[var(--color-surface-elevated)] hover:text-[var(--color-text-primary)]'
                  )}
                  style={{ width: column.width }}
                  onClick={() => column.sortable && handleSort(String(column.key))}
                >
                  <span className="inline-flex items-center gap-1">
                    {column.header}
                    {column.sortable && <SortIcon columnKey={String(column.key)} />}
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--color-border)]">
            {paginatedData.map((row, rowIndex) => {
              const rowKey = keyExtractor(row, rowIndex);
              return (
                <tr
                  key={rowKey}
                  className={cn(
                    'transition-all duration-[var(--duration-fast)] ease-[var(--ease-default)]',
                    onRowClick && 'cursor-pointer hover:bg-[var(--color-surface-elevated)]',
                    selectedRow === rowKey && 'bg-[var(--color-primary-glow)]'
                  )}
                  onClick={() => onRowClick?.(row)}
                >
                  {columns.map((column) => {
                    const value = getValue(row, String(column.key));
                    return (
                      <td
                        key={String(column.key)}
                        className={cn(
                          'px-4 py-3 text-sm text-[var(--color-text-primary)]',
                          column.align === 'center' && 'text-center',
                          column.align === 'right' && 'text-right'
                        )}
                      >
                        {column.render
                          ? column.render(value, row, rowIndex)
                          : String(value ?? '')}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {showPagination && totalPages > 1 && (
        <div className="flex items-center justify-between border-t border-[var(--color-border)] px-4 py-3">
          <p className="text-sm text-[var(--color-text-muted)]">
            Mostrando {(currentPage - 1) * pageSize + 1} a{' '}
            {Math.min(currentPage * pageSize, data.length)} de {data.length} resultados
          </p>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span className="text-sm text-[var(--color-text-secondary)]">
              Página {currentPage} de {totalPages}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
