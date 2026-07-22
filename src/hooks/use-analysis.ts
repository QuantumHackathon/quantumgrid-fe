/**
 * Analysis Hooks
 * React Query hooks for historical analysis
 */

import { useQuery, useMutation } from '@tanstack/react-query';
import { analysisService, type HistoricalData } from '@/services';
import type { AnalysisFilters, StatisticsSummary, ComparisonData } from '@/types';

// Query keys
export const analysisKeys = {
  all: ['analysis'] as const,
  historical: (filters: AnalysisFilters) => [...analysisKeys.all, 'historical', filters] as const,
  statistics: (filters: AnalysisFilters) => [...analysisKeys.all, 'statistics', filters] as const,
  comparison: (period1: string, period2: string) => [...analysisKeys.all, 'comparison', period1, period2] as const,
};

/**
 * Hook to fetch historical data
 */
export function useHistoricalData(filters: AnalysisFilters) {
  return useQuery<HistoricalData>({
    queryKey: analysisKeys.historical(filters),
    queryFn: () => analysisService.getHistorical(filters),
    enabled: !!filters.period,
  });
}

/**
 * Hook to fetch statistics summary
 */
export function useStatistics(filters: AnalysisFilters) {
  return useQuery<StatisticsSummary>({
    queryKey: analysisKeys.statistics(filters),
    queryFn: () => analysisService.getStatistics(filters),
    enabled: !!filters.period,
  });
}

/**
 * Hook to fetch comparison data
 */
export function useComparison(period1: string, period2: string) {
  return useQuery<ComparisonData>({
    queryKey: analysisKeys.comparison(period1, period2),
    queryFn: () => analysisService.getComparison(period1, period2),
    enabled: !!period1 && !!period2,
  });
}

/**
 * Hook to export analysis data
 */
export function useExportData() {
  return useMutation({
    mutationFn: ({ filters, format }: { filters: AnalysisFilters; format: 'csv' | 'xlsx' | 'pdf' }) =>
      analysisService.exportData(filters, format),
    onSuccess: (blob, { format }) => {
      // Create download link
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `analisis-${new Date().toISOString().split('T')[0]}.${format}`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    },
  });
}
