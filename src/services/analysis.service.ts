/**
 * Analysis Service
 * API calls for historical analysis and statistics
 */

import { api } from './api';
import type {
  AnalysisFilters,
  HistoricalDataPoint,
  StatisticsSummary,
  ComparisonData,
} from '@/types';

export interface HistoricalData {
  data: HistoricalDataPoint[];
  filters: AnalysisFilters;
  generatedAt: string;
}

export const analysisService = {
  /**
   * Get historical data based on filters
   */
  async getHistorical(filters: AnalysisFilters): Promise<HistoricalData> {
    const response = await api.get<HistoricalData>('/analysis/historical', {
      params: {
        region: filters.region,
        period: filters.period,
        startDate: filters.startDate,
        endDate: filters.endDate,
        metric: filters.metric,
      },
    });
    return response.data;
  },

  /**
   * Get comparison between two periods
   */
  async getComparison(period1: string, period2: string): Promise<ComparisonData> {
    const response = await api.get<ComparisonData>('/analysis/comparison', {
      params: { period1, period2 },
    });
    return response.data;
  },

  /**
   * Get statistics summary
   */
  async getStatistics(filters: AnalysisFilters): Promise<StatisticsSummary> {
    const response = await api.get<StatisticsSummary>('/analysis/statistics', {
      params: {
        region: filters.region,
        period: filters.period,
        startDate: filters.startDate,
        endDate: filters.endDate,
        metric: filters.metric,
      },
    });
    return response.data;
  },

  /**
   * Export analysis data
   */
  async exportData(filters: AnalysisFilters, format: 'csv' | 'xlsx' | 'pdf'): Promise<Blob> {
    const response = await fetch(`/api/analysis/export`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ filters, format }),
    });

    if (!response.ok) {
      throw new Error('Error al exportar datos');
    }

    return response.blob();
  },
};
