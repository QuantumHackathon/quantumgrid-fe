/**
 * Infrastructure Hooks
 * React Query hooks for grid and plant monitoring
 */

import { useQuery } from '@tanstack/react-query';
import { infrastructureService, type PlantFilters } from '@/services';
import type { Plant, GridStatus } from '@/types';

// Query keys
export const infrastructureKeys = {
  all: ['infrastructure'] as const,
  grid: () => [...infrastructureKeys.all, 'grid'] as const,
  plants: (filters?: PlantFilters) => [...infrastructureKeys.all, 'plants', filters] as const,
  plant: (id: string) => [...infrastructureKeys.all, 'plant', id] as const,
  plantHistory: (id: string, period: string) => [...infrastructureKeys.all, 'plant', id, 'history', period] as const,
  summary: () => [...infrastructureKeys.all, 'summary'] as const,
};

/**
 * Hook to fetch grid status
 */
export function useGridStatus() {
  return useQuery<GridStatus>({
    queryKey: infrastructureKeys.grid(),
    queryFn: infrastructureService.getGridStatus,
    // Refresh more frequently for real-time monitoring
    refetchInterval: 30000, // 30 seconds
  });
}

/**
 * Hook to fetch all plants
 */
export function usePlants(filters?: PlantFilters) {
  return useQuery<Plant[]>({
    queryKey: infrastructureKeys.plants(filters),
    queryFn: () => infrastructureService.getPlants(filters),
  });
}

/**
 * Hook to fetch a single plant
 */
export function usePlant(plantId: string) {
  return useQuery<Plant>({
    queryKey: infrastructureKeys.plant(plantId),
    queryFn: () => infrastructureService.getPlantById(plantId),
    enabled: !!plantId,
  });
}

/**
 * Hook to fetch plant history
 */
export function usePlantHistory(plantId: string, period: 'day' | 'week' | 'month' = 'day') {
  return useQuery<{ timestamp: string; output: number }[]>({
    queryKey: infrastructureKeys.plantHistory(plantId, period),
    queryFn: () => infrastructureService.getPlantHistory(plantId, period),
    enabled: !!plantId,
  });
}

/**
 * Hook to fetch infrastructure summary
 */
export function useInfrastructureSummary() {
  return useQuery<{
    totalCapacity: number;
    currentGeneration: number;
    plantsOnline: number;
    plantsOffline: number;
    plantsMaintenance: number;
    plantsWarning: number;
  }>({
    queryKey: infrastructureKeys.summary(),
    queryFn: infrastructureService.getSummary,
  });
}
