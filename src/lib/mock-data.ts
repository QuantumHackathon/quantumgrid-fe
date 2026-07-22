/**
 * Mock Data for SIENA-CR
 * Development and demonstration data
 */

import type {
  KPIMetric,
  ConsumptionDataPoint,
  GenerationMixItem,
  Alert,
  Insight,
  Plant,
  UploadFile,
  HistoricalDataPoint,
} from '@/types';

// Dashboard KPI Metrics
export const mockMetrics: KPIMetric[] = [
  {
    id: '1',
    label: 'Consumo Total Nacional',
    value: 1847.3,
    unit: 'MW',
    change: 2.4,
    changeType: 'increase',
    subtext: 'vs. ayer',
  },
  {
    id: '2',
    label: 'Generación Renovable',
    value: 98.7,
    unit: '%',
    change: 0.3,
    changeType: 'increase',
    subtext: 'matriz actual',
  },
  {
    id: '3',
    label: 'Demanda Pico',
    value: 1924,
    unit: 'MW',
    change: -1.2,
    changeType: 'decrease',
    subtext: 'hoy',
  },
  {
    id: '4',
    label: 'Eficiencia de Red',
    value: 94.2,
    unit: '%',
    change: 0.5,
    changeType: 'increase',
    subtext: 'promedio',
  },
];

// Consumption data for charts (24 hours)
export const mockConsumptionData: ConsumptionDataPoint[] = Array.from(
  { length: 24 },
  (_, i) => ({
    timestamp: new Date(2024, 0, 15, i).toISOString(),
    hour: i,
    value: 1200 + Math.sin(((i - 6) * Math.PI) / 12) * 400 + Math.random() * 100,
    predicted:
      1200 + Math.sin(((i - 6) * Math.PI) / 12) * 400 + Math.random() * 50,
  })
);

// Generation Mix
export const mockGenerationMix: GenerationMixItem[] = [
  {
    source: 'hydro',
    label: 'Hidroeléctrica',
    value: 1285,
    percentage: 69.5,
    color: '#006341',
  },
  {
    source: 'wind',
    label: 'Eólica',
    value: 342,
    percentage: 18.5,
    color: '#1E3A5F',
  },
  {
    source: 'solar',
    label: 'Solar',
    value: 148,
    percentage: 8.0,
    color: '#C4A35A',
  },
  {
    source: 'thermal',
    label: 'Térmica',
    value: 54,
    percentage: 2.9,
    color: '#DC2626',
  },
  {
    source: 'other',
    label: 'Otros',
    value: 18,
    percentage: 1.1,
    color: '#6B7280',
  },
];

// System Alerts
export const mockAlerts: Alert[] = [
  {
    id: '1',
    type: 'warning',
    title: 'Mantenimiento Programado',
    message:
      'Planta Hidroeléctrica Arenal entrará en mantenimiento el 20 de enero.',
    timestamp: new Date().toISOString(),
    read: false,
    actionUrl: '/infrastructure',
  },
  {
    id: '2',
    type: 'info',
    title: 'Nuevo reporte disponible',
    message: 'El reporte semanal de eficiencia energética está listo.',
    timestamp: new Date(Date.now() - 3600000).toISOString(),
    read: false,
    actionUrl: '/reports',
  },
  {
    id: '3',
    type: 'success',
    title: 'Meta de renovables alcanzada',
    message: 'Se ha superado el 98% de generación renovable este mes.',
    timestamp: new Date(Date.now() - 7200000).toISOString(),
    read: true,
  },
];

// AI Insights
export const mockInsights: Insight[] = [
  {
    id: '1',
    title: 'Optimización de carga en horas pico',
    description:
      'Se detectó un patrón de consumo atípico entre las 18:00 y 20:00 horas. La redistribución de carga podría reducir costos operativos.',
    category: 'efficiency',
    priority: 'high',
    impact: 'Ahorro potencial: ₡45M/mes',
    impactValue: 45000000,
    recommendation:
      'Implementar programa de gestión de demanda con incentivos para grandes consumidores.',
    createdAt: new Date().toISOString(),
    status: 'new',
  },
  {
    id: '2',
    title: 'Mantenimiento preventivo requerido',
    description:
      'El análisis predictivo indica que la turbina #3 de Cachí requiere inspección en los próximos 15 días.',
    category: 'maintenance',
    priority: 'medium',
    impact: 'Prevención de fallas',
    recommendation:
      'Programar inspección técnica antes del 25 de enero.',
    createdAt: new Date(Date.now() - 86400000).toISOString(),
    status: 'viewed',
  },
  {
    id: '3',
    title: 'Capacidad solar subutilizada',
    description:
      'Las plantas solares en Guanacaste operan al 72% de capacidad. Condiciones climáticas favorables permiten mayor captación.',
    category: 'capacity',
    priority: 'low',
    impact: '+48 MW disponibles',
    impactValue: 48,
    recommendation:
      'Revisar configuración de inversores y orientación de paneles.',
    createdAt: new Date(Date.now() - 172800000).toISOString(),
    status: 'new',
  },
  {
    id: '4',
    title: 'Reducción de emisiones de CO₂',
    description:
      'La matriz energética actual permite reducir emisiones en un 15% adicional mediante la optimización de despacho térmico.',
    category: 'sustainability',
    priority: 'medium',
    impact: '-2,400 ton CO₂/mes',
    recommendation:
      'Priorizar despacho de renovables durante horas de alta demanda.',
    createdAt: new Date(Date.now() - 259200000).toISOString(),
    status: 'new',
  },
];

// Infrastructure - Plants
export const mockPlants: Plant[] = [
  {
    id: '1',
    name: 'P.H. Arenal',
    type: 'hydro',
    region: 'Guanacaste',
    capacity: 157,
    currentOutput: 142,
    status: 'online',
    lastMaintenance: '2023-11-15',
    nextMaintenance: '2024-01-20',
  },
  {
    id: '2',
    name: 'P.H. Cachí',
    type: 'hydro',
    region: 'Cartago',
    capacity: 103,
    currentOutput: 98,
    status: 'online',
    lastMaintenance: '2023-10-20',
  },
  {
    id: '3',
    name: 'P.H. Angostura',
    type: 'hydro',
    region: 'Cartago',
    capacity: 177,
    currentOutput: 165,
    status: 'online',
    lastMaintenance: '2023-12-01',
  },
  {
    id: '4',
    name: 'P.E. Tejona',
    type: 'wind',
    region: 'Guanacaste',
    capacity: 20,
    currentOutput: 18,
    status: 'online',
    lastMaintenance: '2023-09-15',
  },
  {
    id: '5',
    name: 'P.E. Chiripa',
    type: 'wind',
    region: 'Guanacaste',
    capacity: 50,
    currentOutput: 42,
    status: 'online',
    lastMaintenance: '2023-08-20',
  },
  {
    id: '6',
    name: 'P.S. Miravalles Solar',
    type: 'solar',
    region: 'Guanacaste',
    capacity: 12,
    currentOutput: 9,
    status: 'online',
    lastMaintenance: '2023-11-01',
  },
  {
    id: '7',
    name: 'P.T. Garabito',
    type: 'thermal',
    region: 'Puntarenas',
    capacity: 200,
    currentOutput: 0,
    status: 'offline',
    lastMaintenance: '2023-07-15',
  },
  {
    id: '8',
    name: 'P.H. Reventazón',
    type: 'hydro',
    region: 'Limón',
    capacity: 306,
    currentOutput: 285,
    status: 'online',
    lastMaintenance: '2023-12-10',
  },
];

// Upload history
export const mockUploadFiles: UploadFile[] = [
  {
    id: '1',
    name: 'consumo_enero_2024.csv',
    size: 2456789,
    type: 'text/csv',
    status: 'completed',
    progress: 100,
    uploadedAt: new Date(Date.now() - 3600000).toISOString(),
    processedAt: new Date(Date.now() - 3500000).toISOString(),
  },
  {
    id: '2',
    name: 'generacion_regional.xlsx',
    size: 1234567,
    type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    status: 'completed',
    progress: 100,
    uploadedAt: new Date(Date.now() - 86400000).toISOString(),
    processedAt: new Date(Date.now() - 86300000).toISOString(),
  },
  {
    id: '3',
    name: 'demanda_historica.csv',
    size: 5678901,
    type: 'text/csv',
    status: 'error',
    progress: 45,
    uploadedAt: new Date(Date.now() - 172800000).toISOString(),
    errorMessage: 'Formato de fecha inválido en columna 3',
  },
];

// Historical data for analysis
export const mockHistoricalData: HistoricalDataPoint[] = Array.from(
  { length: 30 },
  (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (29 - i));
    const consumption = 1700 + Math.random() * 400;
    const generation = consumption + (Math.random() - 0.5) * 100;
    return {
      date: date.toISOString().split('T')[0],
      consumption: Math.round(consumption),
      generation: Math.round(generation),
      balance: Math.round(generation - consumption),
    };
  }
);

// Region data for filters
export const regions = [
  { value: 'all', label: 'Todas las regiones' },
  { value: 'san-jose', label: 'San José' },
  { value: 'alajuela', label: 'Alajuela' },
  { value: 'cartago', label: 'Cartago' },
  { value: 'heredia', label: 'Heredia' },
  { value: 'guanacaste', label: 'Guanacaste' },
  { value: 'puntarenas', label: 'Puntarenas' },
  { value: 'limon', label: 'Limón' },
];

// Period options
export const periods = [
  { value: 'day', label: 'Hoy' },
  { value: 'week', label: 'Esta semana' },
  { value: 'month', label: 'Este mes' },
  { value: 'year', label: 'Este año' },
  { value: 'custom', label: 'Personalizado' },
];

// Grid Status
export const mockGridStatus = {
  totalCapacity: 3500,
  currentLoad: 1847,
  loadPercentage: 52.8,
  frequency: 60.02,
  voltage: 138.5,
  status: 'normal' as const,
};

// Statistics Summary
export const mockStatistics = {
  peak: 1924,
  minimum: 1245,
  average: 1685,
  standardDeviation: 187,
  total: 40440,
};

// Dashboard Overview
export const mockDashboardOverview = {
  metrics: mockMetrics,
  consumption: mockConsumptionData,
  generationMix: mockGenerationMix,
  alerts: mockAlerts,
  lastUpdated: new Date().toISOString(),
};

// Alias for consumption data
export const mockConsumption = mockConsumptionData;

// Alias for uploads
export const mockUploads = mockUploadFiles;

// ============================================
// Helper Functions
// ============================================

/**
 * Create API response wrapper
 */
export function createApiResponse<T>(data: T, success = true, message?: string) {
  return {
    data,
    success,
    message,
    timestamp: new Date().toISOString(),
  };
}

/**
 * Create paginated response
 */
export function createPaginatedResponse<T>(
  data: T[],
  page: number = 1,
  limit: number = 10
) {
  const start = (page - 1) * limit;
  const paginatedData = data.slice(start, start + limit);

  return {
    data: paginatedData,
    pagination: {
      page,
      limit,
      total: data.length,
      totalPages: Math.ceil(data.length / limit),
    },
  };
}

/**
 * Simulate API delay
 */
export function simulateDelay(ms: number = 500): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}
