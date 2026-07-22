/**
 * Insights Service
 * API calls for AI-generated insights management
 */

import { api } from './api';
import type { Insight, InsightCategory, Priority, PaginatedResponse } from '@/types';

export interface InsightFilters {
  category?: InsightCategory;
  priority?: Priority;
  status?: Insight['status'];
  page?: number;
  limit?: number;
}

export const insightsService = {
  /**
   * Get all insights with optional filters
   */
  async getAll(filters?: InsightFilters): Promise<PaginatedResponse<Insight>> {
    const response = await api.get<PaginatedResponse<Insight>>('/insights', {
      params: filters as Record<string, string | number | undefined>,
    });
    return response.data;
  },

  /**
   * Get a single insight by ID
   */
  async getById(id: string): Promise<Insight> {
    const response = await api.get<Insight>(`/insights/${id}`);
    return response.data;
  },

  /**
   * Mark insight as viewed
   */
  async markViewed(id: string): Promise<Insight> {
    const response = await api.patch<Insight>(`/insights/${id}`, { status: 'viewed' });
    return response.data;
  },

  /**
   * Dismiss an insight
   */
  async dismiss(id: string, reason: string): Promise<void> {
    await api.patch(`/insights/${id}`, {
      status: 'dismissed',
      dismissReason: reason,
    });
  },

  /**
   * Assign insight to a user
   */
  async assign(id: string, userId: string): Promise<Insight> {
    const response = await api.post<Insight>(`/insights/${id}/assign`, { userId });
    return response.data;
  },

  /**
   * Unassign insight
   */
  async unassign(id: string): Promise<Insight> {
    const response = await api.delete<Insight>(`/insights/${id}/assign`);
    return response.data;
  },

  /**
   * Get insights summary/stats
   */
  async getSummary(): Promise<{
    total: number;
    byPriority: Record<Priority, number>;
    byCategory: Record<InsightCategory, number>;
    byStatus: Record<Insight['status'], number>;
  }> {
    const response = await api.get<{
      total: number;
      byPriority: Record<Priority, number>;
      byCategory: Record<InsightCategory, number>;
      byStatus: Record<Insight['status'], number>;
    }>('/insights/summary');
    return response.data;
  },
};
