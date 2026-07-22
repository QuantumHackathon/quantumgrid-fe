'use client';

import { useState } from 'react';
import {
  LazyLineChart,
  LazyBarChart,
  LazyResponsiveContainer,
  Line,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from '@/components/charts';
import { Download, Filter, Calendar } from 'lucide-react';
import {
  Button,
  Select,
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from '@/components/ui';
import { ChartWrapper, MetricCard } from '@/components/shared';
import { mockHistoricalData, regions, periods } from '@/lib/mock-data';
import type { KPIMetric } from '@/types';

const analysisMetrics: KPIMetric[] = [
  {
    id: '1',
    label: 'Consumo Promedio',
    value: 1823,
    unit: 'MW',
    change: -2.1,
    changeType: 'decrease',
    subtext: 'vs. mes anterior',
  },
  {
    id: '2',
    label: 'Demanda Pico',
    value: 2147,
    unit: 'MW',
    change: 1.8,
    changeType: 'increase',
    subtext: 'máximo del período',
  },
  {
    id: '3',
    label: 'Generación Total',
    value: 52.4,
    unit: 'GWh',
    change: 3.2,
    changeType: 'increase',
    subtext: 'acumulado',
  },
  {
    id: '4',
    label: 'Balance Promedio',
    value: 45,
    unit: 'MW',
    change: 15.3,
    changeType: 'increase',
    subtext: 'superávit',
  },
];

export default function AnalysisPage() {
  const [selectedRegion, setSelectedRegion] = useState('all');
  const [selectedPeriod, setSelectedPeriod] = useState('month');

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[var(--color-text-primary)]">
            Análisis de Datos
          </h1>
          <p className="text-sm text-[var(--color-text-muted)]">
            Explore tendencias históricas y proyecciones energéticas
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="sm"
            leftIcon={<Download className="h-4 w-4" />}
          >
            Exportar reporte
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-[var(--color-text-muted)]" />
              <span className="text-sm font-medium text-[var(--color-text-secondary)]">
                Filtros:
              </span>
            </div>
            <Select
              options={regions}
              value={selectedRegion}
              onChange={(e) => setSelectedRegion(e.target.value)}
              className="w-48"
            />
            <Select
              options={periods}
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="w-40"
            />
            <Button variant="ghost" size="sm" leftIcon={<Calendar className="h-4 w-4" />}>
              Rango personalizado
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* KPI Summary */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {analysisMetrics.map((metric) => (
          <MetricCard key={metric.id} metric={metric} />
        ))}
      </div>

      {/* Main Charts */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Historical Trend */}
        <ChartWrapper
          title="Tendencia Histórica"
          subtitle="Consumo vs Generación (últimos 30 días)"
          height={350}
          className="lg:col-span-2"
        >
          <LazyResponsiveContainer width="100%" height="100%">
            <LazyLineChart
              data={mockHistoricalData}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis
                dataKey="date"
                tick={{ fontSize: 11, fill: '#6B7280' }}
                tickFormatter={(value) => {
                  const date = new Date(value);
                  return `${date.getDate()}/${date.getMonth() + 1}`;
                }}
              />
              <YAxis
                tick={{ fontSize: 11, fill: '#6B7280' }}
                tickFormatter={(value) => `${value}`}
                label={{
                  value: 'MW',
                  angle: -90,
                  position: 'insideLeft',
                  style: { fontSize: 11, fill: '#6B7280' },
                }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'white',
                  border: '1px solid #E5E7EB',
                  borderRadius: '8px',
                }}
                formatter={(value) => [`${value} MW`, '']}
                labelFormatter={(label) =>
                  new Date(String(label)).toLocaleDateString('es-CR', {
                    weekday: 'short',
                    day: 'numeric',
                    month: 'short',
                  })
                }
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="consumption"
                name="Consumo"
                stroke="#1E3A5F"
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 6 }}
              />
              <Line
                type="monotone"
                dataKey="generation"
                name="Generación"
                stroke="#006341"
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 6 }}
              />
            </LazyLineChart>
          </LazyResponsiveContainer>
        </ChartWrapper>

        {/* Balance Chart */}
        <ChartWrapper
          title="Balance Energético"
          subtitle="Superávit/déficit diario"
          height={300}
        >
          <LazyResponsiveContainer width="100%" height="100%">
            <LazyBarChart
              data={mockHistoricalData}
              margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis
                dataKey="date"
                tick={{ fontSize: 10, fill: '#6B7280' }}
                tickFormatter={(value) => {
                  const date = new Date(value);
                  return `${date.getDate()}`;
                }}
              />
              <YAxis
                tick={{ fontSize: 11, fill: '#6B7280' }}
                tickFormatter={(value) => `${value}`}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'white',
                  border: '1px solid #E5E7EB',
                  borderRadius: '8px',
                }}
                formatter={(value) => [
                  `${Number(value) > 0 ? '+' : ''}${value} MW`,
                  'Balance',
                ]}
              />
              <Bar
                dataKey="balance"
                name="Balance"
                fill="#006341"
                radius={[4, 4, 0, 0]}
              />
            </LazyBarChart>
          </LazyResponsiveContainer>
        </ChartWrapper>

        {/* Comparison Chart */}
        <ChartWrapper
          title="Comparativa Mensual"
          subtitle="Consumo por mes vs año anterior"
          height={300}
        >
          <LazyResponsiveContainer width="100%" height="100%">
            <LazyBarChart
              data={[
                { month: 'Oct', current: 1820, previous: 1750 },
                { month: 'Nov', current: 1890, previous: 1800 },
                { month: 'Dic', current: 1950, previous: 1870 },
                { month: 'Ene', current: 1780, previous: 1720 },
              ]}
              margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#6B7280' }} />
              <YAxis tick={{ fontSize: 11, fill: '#6B7280' }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'white',
                  border: '1px solid #E5E7EB',
                  borderRadius: '8px',
                }}
              />
              <Legend />
              <Bar
                dataKey="current"
                name="2024"
                fill="#1E3A5F"
                radius={[4, 4, 0, 0]}
              />
              <Bar
                dataKey="previous"
                name="2023"
                fill="#94A3B8"
                radius={[4, 4, 0, 0]}
              />
            </LazyBarChart>
          </LazyResponsiveContainer>
        </ChartWrapper>
      </div>

      {/* Statistics Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Resumen Estadístico</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-lg bg-[var(--color-neutral-50)] p-4">
              <p className="text-sm text-[var(--color-text-muted)]">
                Mínimo registrado
              </p>
              <p className="mt-1 text-2xl font-semibold text-[var(--color-text-primary)]">
                1,234 MW
              </p>
              <p className="mt-1 text-xs text-[var(--color-text-muted)]">
                03:00 hrs - 15 Ene
              </p>
            </div>
            <div className="rounded-lg bg-[var(--color-neutral-50)] p-4">
              <p className="text-sm text-[var(--color-text-muted)]">
                Máximo registrado
              </p>
              <p className="mt-1 text-2xl font-semibold text-[var(--color-text-primary)]">
                2,147 MW
              </p>
              <p className="mt-1 text-xs text-[var(--color-text-muted)]">
                19:30 hrs - 08 Ene
              </p>
            </div>
            <div className="rounded-lg bg-[var(--color-neutral-50)] p-4">
              <p className="text-sm text-[var(--color-text-muted)]">
                Desviación estándar
              </p>
              <p className="mt-1 text-2xl font-semibold text-[var(--color-text-primary)]">
                ±187 MW
              </p>
              <p className="mt-1 text-xs text-[var(--color-text-muted)]">
                variabilidad
              </p>
            </div>
            <div className="rounded-lg bg-[var(--color-neutral-50)] p-4">
              <p className="text-sm text-[var(--color-text-muted)]">
                Factor de carga
              </p>
              <p className="mt-1 text-2xl font-semibold text-[var(--color-text-primary)]">
                72.4%
              </p>
              <p className="mt-1 text-xs text-[var(--color-text-muted)]">
                promedio del período
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
