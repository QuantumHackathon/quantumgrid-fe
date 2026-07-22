/**
 * Infrastructure Service
 * API calls for grid and plant monitoring
 */

import { api } from './api';
import type { Plant, GridStatus, PlantStatus } from '@/types';

export interface PlantFilters {
  type?: Plant['type'];
  region?: string;
  status?: PlantStatus;
}

export const infrastructureService = {
  /**
   * Get current grid status
   */
  async getGridStatus(): Promise<GridStatus> {
    const response = await api.get<GridStatus>('/infrastructure/grid');
    return response.data;
  },

  /**
   * Get all plants with optional filters
   */
  async getPlants(filters?: PlantFilters): Promise<Plant[]> {
    const response = await api.get<Plant[]>('/infrastructure/plants', {
      params: filters as Record<string, string | undefined>,
    });
    return response.data;
  },

  /**
   * Get a specific plant by ID
   */
  async getPlantById(plantId: string): Promise<Plant> {
    const response = await api.get<Plant>(`/infrastructure/plants/${plantId}`);
    return response.data;
  },

  /**
   * Get plant performance history
   */
  async getPlantHistory(
    plantId: string,
    period: 'day' | 'week' | 'month' = 'day'
  ): Promise<{ timestamp: string; output: number }[]> {
    const response = await api.get<{ timestamp: string; output: number }[]>(
      `/infrastructure/plants/${plantId}/history`,
      { params: { period } }
    );
    return response.data;
  },

  /**
   * Get infrastructure summary
   */
  async getSummary(): Promise<{
    totalCapacity: number;
    currentGeneration: number;
    plantsOnline: number;
    plantsOffline: number;
    plantsMaintenance: number;
    plantsWarning: number;
  }> {
    const response = await api.get<{
      totalCapacity: number;
      currentGeneration: number;
      plantsOnline: number;
      plantsOffline: number;
      plantsMaintenance: number;
      plantsWarning: number;
    }>('/infrastructure/summary');
    return response.data;
  },
};
