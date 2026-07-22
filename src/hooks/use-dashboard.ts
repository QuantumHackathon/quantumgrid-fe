/**
 * Dashboard Hooks
 * React Query hooks for dashboard data
 */

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { dashboardService } from '@/services';
import type { DashboardOverview, KPIMetric, ConsumptionDataPoint, GenerationMixItem, Alert } from '@/types';

// Query keys
export const dashboardKeys = {
  all: ['dashboard'] as const,
  overview: () => [...dashboardKeys.all, 'overview'] as const,
  metrics: () => [...dashboardKeys.all, 'metrics'] as const,
  consumption: (period: string) => [...dashboardKeys.all, 'consumption', period] as const,
  generation: () => [...dashboardKeys.all, 'generation'] as const,
  alerts: (limit?: number) => [...dashboardKeys.all, 'alerts', limit] as const,
};

/**
 * Hook to fetch dashboard overview
 */
export function useDashboardOverview() {
  return useQuery<DashboardOverview>({
    queryKey: dashboardKeys.overview(),
    queryFn: dashboardService.getOverview,
  });
}

/**
 * Hook to fetch KPI metrics
 */
export function useDashboardMetrics() {
  return useQuery<KPIMetric[]>({
    queryKey: dashboardKeys.metrics(),
    queryFn: dashboardService.getMetrics,
  });
}

/**
 * Hook to fetch consumption data
 */
export function useConsumptionData(period: string = 'today') {
  return useQuery<ConsumptionDataPoint[]>({
    queryKey: dashboardKeys.consumption(period),
    queryFn: () => dashboardService.getConsumption(period),
  });
}

/**
 * Hook to fetch generation mix
 */
export function useGenerationMix() {
  return useQuery<GenerationMixItem[]>({
    queryKey: dashboardKeys.generation(),
    queryFn: dashboardService.getGenerationMix,
  });
}

/**
 * Hook to fetch alerts
 */
export function useAlerts(limit?: number) {
  return useQuery<Alert[]>({
    queryKey: dashboardKeys.alerts(limit),
    queryFn: () => dashboardService.getAlerts(limit),
  });
}

/**
 * Hook to mark an alert as read
 */
export function useMarkAlertRead() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: dashboardService.markAlertRead,
    onSuccess: () => {
      // Invalidate alerts queries to refetch
      queryClient.invalidateQueries({ queryKey: dashboardKeys.all });
    },
  });
}

/**
 * Hook to dismiss an alert
 */
export function useDismissAlert() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: dashboardService.dismissAlert,
    onSuccess: () => {
      // Invalidate alerts queries to refetch
      queryClient.invalidateQueries({ queryKey: dashboardKeys.all });
    },
  });
}
