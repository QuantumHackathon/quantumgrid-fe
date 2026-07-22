/**
 * Insights Hooks
 * React Query hooks for AI insights
 */

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { insightsService, type InsightFilters } from '@/services';
import type { Insight, PaginatedResponse, Priority, InsightCategory } from '@/types';

// Query keys
export const insightsKeys = {
  all: ['insights'] as const,
  lists: () => [...insightsKeys.all, 'list'] as const,
  list: (filters?: InsightFilters) => [...insightsKeys.lists(), filters] as const,
  details: () => [...insightsKeys.all, 'detail'] as const,
  detail: (id: string) => [...insightsKeys.details(), id] as const,
  summary: () => [...insightsKeys.all, 'summary'] as const,
};

/**
 * Hook to fetch all insights
 */
export function useInsights(filters?: InsightFilters) {
  return useQuery<PaginatedResponse<Insight>>({
    queryKey: insightsKeys.list(filters),
    queryFn: () => insightsService.getAll(filters),
  });
}

/**
 * Hook to fetch a single insight
 */
export function useInsight(id: string) {
  return useQuery<Insight>({
    queryKey: insightsKeys.detail(id),
    queryFn: () => insightsService.getById(id),
    enabled: !!id,
  });
}

/**
 * Hook to fetch insights summary
 */
export function useInsightsSummary() {
  return useQuery<{
    total: number;
    byPriority: Record<Priority, number>;
    byCategory: Record<InsightCategory, number>;
    byStatus: Record<Insight['status'], number>;
  }>({
    queryKey: insightsKeys.summary(),
    queryFn: insightsService.getSummary,
  });
}

/**
 * Hook to mark insight as viewed
 */
export function useMarkInsightViewed() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: insightsService.markViewed,
    onSuccess: (updatedInsight) => {
      // Update the specific insight in cache
      queryClient.setQueryData(insightsKeys.detail(updatedInsight.id), updatedInsight);
      // Invalidate lists to refetch
      queryClient.invalidateQueries({ queryKey: insightsKeys.lists() });
      queryClient.invalidateQueries({ queryKey: insightsKeys.summary() });
    },
  });
}

/**
 * Hook to dismiss an insight
 */
export function useDismissInsight() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, reason }: { id: string; reason: string }) =>
      insightsService.dismiss(id, reason),
    onSuccess: (_, { id }) => {
      // Invalidate queries
      queryClient.invalidateQueries({ queryKey: insightsKeys.detail(id) });
      queryClient.invalidateQueries({ queryKey: insightsKeys.lists() });
      queryClient.invalidateQueries({ queryKey: insightsKeys.summary() });
    },
  });
}

/**
 * Hook to assign an insight
 */
export function useAssignInsight() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, userId }: { id: string; userId: string }) =>
      insightsService.assign(id, userId),
    onSuccess: (updatedInsight) => {
      queryClient.setQueryData(insightsKeys.detail(updatedInsight.id), updatedInsight);
      queryClient.invalidateQueries({ queryKey: insightsKeys.lists() });
      queryClient.invalidateQueries({ queryKey: insightsKeys.summary() });
    },
  });
}
