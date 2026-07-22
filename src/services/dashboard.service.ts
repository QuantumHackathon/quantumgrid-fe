/**
 * Dashboard Service
 * API calls for dashboard data
 */

import { api } from './api';
import type {
  DashboardOverview,
  KPIMetric,
  ConsumptionDataPoint,
  GenerationMixItem,
  Alert,
} from '@/types';

export const dashboardService = {
  /**
   * Get complete dashboard overview
   */
  async getOverview(): Promise<DashboardOverview> {
    const response = await api.get<DashboardOverview>('/dashboard/overview');
    return response.data;
  },

  /**
   * Get KPI metrics
   */
  async getMetrics(): Promise<KPIMetric[]> {
    const response = await api.get<KPIMetric[]>('/dashboard/metrics');
    return response.data;
  },

  /**
   * Get consumption data for a specific period
   */
  async getConsumption(period: string = 'today'): Promise<ConsumptionDataPoint[]> {
    const response = await api.get<ConsumptionDataPoint[]>('/dashboard/consumption', {
      params: { period },
    });
    return response.data;
  },

  /**
   * Get energy generation mix
   */
  async getGenerationMix(): Promise<GenerationMixItem[]> {
    const response = await api.get<GenerationMixItem[]>('/dashboard/generation');
    return response.data;
  },

  /**
   * Get system alerts
   */
  async getAlerts(limit?: number): Promise<Alert[]> {
    const response = await api.get<Alert[]>('/dashboard/alerts', {
      params: { limit },
    });
    return response.data;
  },

  /**
   * Mark an alert as read
   */
  async markAlertRead(alertId: string): Promise<void> {
    await api.patch(`/dashboard/alerts/${alertId}`, { read: true });
  },

  /**
   * Dismiss an alert
   */
  async dismissAlert(alertId: string): Promise<void> {
    await api.delete(`/dashboard/alerts/${alertId}`);
  },
};
