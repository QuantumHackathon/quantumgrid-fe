/**
 * Mock Dashboard Data
 * Used for development and testing
 */

import type {
  KPIMetric,
  ConsumptionDataPoint,
  GenerationMixItem,
  Alert,
} from '@/types';

export const mockKPIs: KPIMetric[] = [
  {
    id: 'consumption',
    label: 'Consumo Actual',
    value: 2847,
    unit: 'MW',
    change: 2.3,
    changeType: 'increase',
    subtext: 'vs. ayer',
  },
  {
    id: 'generation',
    label: 'Generación Total',
    value: 3012,
    unit: 'MW',
    change: 1.8,
    changeType: 'increase',
    subtext: 'Capacidad 92%',
  },
  {
    id: 'balance',
    label: 'Balance Neto',
    value: 165,
    unit: 'MW',
    change: 0,
    changeType: 'neutral',
    subtext: 'Superávit',
  },
  {
    id: 'efficiency',
    label: 'Eficiencia de Red',
    value: 94.2,
    unit: '%',
    change: 0.5,
    changeType: 'increase',
    subtext: 'Objetivo: 95%',
  },
];

export const mockConsumptionData: ConsumptionDataPoint[] = Array.from(
  { length: 24 },
  (_, i) => ({
    timestamp: new Date(2024, 0, 1, i).toISOString(),
    hour: i,
    value: 2000 + Math.random() * 1200 + (i > 8 && i < 21 ? 500 : 0),
    predicted: 2100 + Math.random() * 1000 + (i > 8 && i < 21 ? 450 : 0),
  })
);

export const mockGenerationMix: GenerationMixItem[] = [
  {
    source: 'hydro',
    label: 'Hidroeléctrica',
    value: 2170,
    percentage: 72,
    color: '#006341',
  },
  {
    source: 'wind',
    label: 'Eólica',
    value: 452,
    percentage: 15,
    color: '#0284C7',
  },
  {
    source: 'solar',
    label: 'Solar',
    value: 241,
    percentage: 8,
    color: '#C4A35A',
  },
  {
    source: 'thermal',
    label: 'Térmica',
    value: 150,
    percentage: 5,
    color: '#64748B',
  },
];

export const mockAlerts: Alert[] = [
  {
    id: '1',
    type: 'warning',
    title: 'Alta demanda proyectada',
    message: 'Se espera pico de demanda entre 18:00-21:00',
    timestamp: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
    read: false,
    actionUrl: '/analysis',
  },
  {
    id: '2',
    type: 'info',
    title: 'Mantenimiento programado',
    message: 'Planta Arenal: mantenimiento preventivo mañana 06:00-10:00',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    read: false,
    actionUrl: '/infrastructure',
  },
  {
    id: '3',
    type: 'success',
    title: 'Optimización completada',
    message: 'Redistribución de carga regional exitosa',
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    read: true,
  },
];
