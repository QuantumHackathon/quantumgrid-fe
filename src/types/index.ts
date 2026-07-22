/**
 * SIENA-CR Type Definitions
 * Sistema de Inteligencia Energética Nacional
 */

// ============================================
// Common Types
// ============================================

export type Status = 'idle' | 'loading' | 'success' | 'error';

export type Priority = 'high' | 'medium' | 'low';

export type Period = 'day' | 'week' | 'month' | 'year' | 'custom';

// ============================================
// API Types
// ============================================

export interface APIResponse<T> {
  data: T;
  success: boolean;
  message?: string;
  timestamp: string;
}

export interface APIError {
  code: string;
  message: string;
  details?: Record<string, string>;
}

export interface PaginationParams {
  page: number;
  limit: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// ============================================
// Dashboard Types
// ============================================

export interface KPIMetric {
  id: string;
  label: string;
  value: number;
  unit: string;
  change: number;
  changeType: 'increase' | 'decrease' | 'neutral';
  subtext?: string;
}

export interface ConsumptionDataPoint {
  timestamp: string;
  hour: number;
  value: number;
  predicted?: number;
}

export interface GenerationMixItem {
  source: 'hydro' | 'wind' | 'solar' | 'thermal' | 'other';
  label: string;
  value: number;
  percentage: number;
  color: string;
}

export interface Alert {
  id: string;
  type: 'warning' | 'info' | 'error' | 'success';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  actionUrl?: string;
}

export interface DashboardOverview {
  metrics: KPIMetric[];
  consumption: ConsumptionDataPoint[];
  generationMix: GenerationMixItem[];
  alerts: Alert[];
  lastUpdated: string;
}

// ============================================
// Analysis Types
// ============================================

export interface AnalysisFilters {
  region?: string;
  period: Period;
  startDate?: string;
  endDate?: string;
  metric?: string;
}

export interface HistoricalDataPoint {
  date: string;
  consumption: number;
  generation: number;
  balance: number;
}

export interface StatisticsSummary {
  peak: number;
  minimum: number;
  average: number;
  standardDeviation: number;
  total: number;
}

export interface ComparisonData {
  current: {
    period: string;
    value: number;
  };
  previous: {
    period: string;
    value: number;
  };
  change: number;
  changePercentage: number;
}

// ============================================
// Insights Types
// ============================================

export type InsightCategory =
  | 'efficiency'
  | 'capacity'
  | 'maintenance'
  | 'cost'
  | 'sustainability';

export interface Insight {
  id: string;
  title: string;
  description: string;
  category: InsightCategory;
  priority: Priority;
  impact: string;
  impactValue?: number;
  recommendation: string;
  createdAt: string;
  status: 'new' | 'viewed' | 'assigned' | 'dismissed';
  assignedTo?: string;
}

// ============================================
// Upload Types
// ============================================

export type UploadStatus =
  | 'pending'
  | 'uploading'
  | 'validating'
  | 'processing'
  | 'completed'
  | 'error';

export interface UploadFile {
  id: string;
  name: string;
  size: number;
  type: string;
  status: UploadStatus;
  progress: number;
  uploadedAt: string;
  processedAt?: string;
  errorMessage?: string;
}

export interface ValidationResult {
  valid: boolean;
  errors: ValidationError[];
  warnings: ValidationWarning[];
  rowCount: number;
  preview: Record<string, unknown>[];
}

export interface ValidationError {
  row: number;
  column: string;
  message: string;
}

export interface ValidationWarning {
  row: number;
  column: string;
  message: string;
}

// ============================================
// Infrastructure Types
// ============================================

export type PlantStatus = 'online' | 'offline' | 'maintenance' | 'warning';

export interface Plant {
  id: string;
  name: string;
  type: 'hydro' | 'wind' | 'solar' | 'thermal';
  region: string;
  capacity: number;
  currentOutput: number;
  status: PlantStatus;
  lastMaintenance: string;
  nextMaintenance?: string;
}

export interface GridStatus {
  totalCapacity: number;
  currentLoad: number;
  loadPercentage: number;
  frequency: number;
  voltage: number;
  status: 'normal' | 'warning' | 'critical';
}

// ============================================
// User Types
// ============================================

export type UserRole = 'admin' | 'analyst' | 'operator' | 'viewer';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  department?: string;
  avatar?: string;
  lastLogin?: string;
}

export interface AuthSession {
  user: User;
  accessToken: string;
  expiresAt: string;
}

// ============================================
// Navigation Types
// ============================================

export interface NavItem {
  label: string;
  href: string;
  icon: string;
  children?: NavItem[];
  badge?: number;
  adminOnly?: boolean;
}

export interface Breadcrumb {
  label: string;
  href?: string;
}
