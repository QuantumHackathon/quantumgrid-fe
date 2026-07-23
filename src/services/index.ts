/**
 * QuantumGrid API Services
 * Export all services from this file
 */

// Base API client
export { api, addRequestInterceptor, addResponseInterceptor } from './api';
export type { RequestOptions } from './api';

// Domain services
export { dashboardService } from './dashboard.service';
export { analysisService } from './analysis.service';
export type { HistoricalData } from './analysis.service';
export { insightsService } from './insights.service';
export type { InsightFilters } from './insights.service';
export { uploadService } from './upload.service';
export type { UploadResult } from './upload.service';
export { infrastructureService } from './infrastructure.service';
export type { PlantFilters } from './infrastructure.service';
export { reportsService } from './reports.service';
export type { ReportConfig, ReportResult, ReportHistory, ReportType, ReportFormat } from './reports.service';
export { authService } from './auth.service';
export type { LoginCredentials, RegisterData } from './auth.service';
