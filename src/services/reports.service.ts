/**
 * Reports Service
 * API calls for report generation
 */

import { api } from './api';
import type { AnalysisFilters } from '@/types';

export type ReportType = 'consumption' | 'generation' | 'efficiency' | 'summary';
export type ReportFormat = 'pdf' | 'xlsx' | 'csv';

export interface ReportConfig {
  type: ReportType;
  format: ReportFormat;
  filters: AnalysisFilters;
  includeCharts?: boolean;
  includeSummary?: boolean;
  language?: 'es' | 'en';
}

export interface ReportResult {
  id: string;
  type: ReportType;
  format: ReportFormat;
  status: 'pending' | 'processing' | 'completed' | 'error';
  downloadUrl?: string;
  createdAt: string;
  completedAt?: string;
  errorMessage?: string;
}

export interface ReportHistory {
  reports: ReportResult[];
  total: number;
}

export const reportsService = {
  /**
   * Generate a new report
   */
  async generate(config: ReportConfig): Promise<ReportResult> {
    const response = await api.post<ReportResult>('/reports/generate', config);
    return response.data;
  },

  /**
   * Get report status
   */
  async getStatus(reportId: string): Promise<ReportResult> {
    const response = await api.get<ReportResult>(`/reports/${reportId}`);
    return response.data;
  },

  /**
   * Download a completed report
   */
  async download(reportId: string): Promise<Blob> {
    const response = await fetch(`/api/reports/${reportId}/download`);
    if (!response.ok) {
      throw new Error('Error al descargar el reporte');
    }
    return response.blob();
  },

  /**
   * Get report history
   */
  async getHistory(page: number = 1, limit: number = 10): Promise<ReportHistory> {
    const response = await api.get<ReportHistory>('/reports/history', {
      params: { page, limit },
    });
    return response.data;
  },

  /**
   * Delete a report
   */
  async delete(reportId: string): Promise<void> {
    await api.delete(`/reports/${reportId}`);
  },

  /**
   * Get available report templates
   */
  async getTemplates(): Promise<{ id: string; name: string; description: string; type: ReportType }[]> {
    const response = await api.get<{ id: string; name: string; description: string; type: ReportType }[]>('/reports/templates');
    return response.data;
  },
};
