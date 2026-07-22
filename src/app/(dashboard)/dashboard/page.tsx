'use client';

import { useState, useCallback } from 'react';
import {
  LazyAreaChart,
  LazyPieChart,
  LazyResponsiveContainer,
  Area,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from '@/components/charts';
import { RefreshCw, Download, Bell } from 'lucide-react';
import { Button, Badge, Alert } from '@/components/ui';
import { MetricCard, ChartWrapper, InsightCard } from '@/components/shared';
import {
  mockMetrics,
  mockConsumptionData,
  mockGenerationMix,
  mockAlerts,
  mockInsights,
} from '@/lib/mock-data';
import { cn } from '@/lib/utils';

export default function DashboardPage() {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [dismissedAlerts, setDismissedAlerts] = useState<string[]>([]);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 1500);
  };

  const activeAlerts = mockAlerts.filter(
    (alert) => !dismissedAlerts.includes(alert.id)
  );

  const formatTime = useCallback((timestamp: string) => {
    const now = new Date();
    const diff = now.getTime() - new Date(timestamp).getTime();
    const minutes = Math.floor(diff / 60000);
    if (minutes < 60) return `Hace ${minutes} min`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `Hace ${hours}h`;
    return `Hace ${Math.floor(hours / 24)}d`;
  }, []);

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[var(--color-text-primary)]">
            Dashboard Nacional
          </h1>
          <p className="text-sm text-[var(--color-text-muted)]">
            Última actualización:{' '}
            {new Date().toLocaleString('es-CR', {
              dateStyle: 'medium',
              timeStyle: 'short',
            })}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="sm"
            leftIcon={<Download className="h-4 w-4" />}
          >
            Exportar
          </Button>
          <Button
            variant="primary"
            size="sm"
            leftIcon={<RefreshCw className={cn('h-4 w-4', isRefreshing && 'animate-spin')} />}
            onClick={handleRefresh}
            isLoading={isRefreshing}
          >
            Actualizar
          </Button>
        </div>
      </div>

      {/* KPI Metrics Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {mockMetrics.map((metric) => (
          <MetricCard key={metric.id} metric={metric} />
        ))}
      </div>

      {/* Alerts Banner */}
      {activeAlerts.length > 0 && (
        <div className="space-y-2">
          {activeAlerts.slice(0, 2).map((alert) => (
            <Alert
              key={alert.id}
              variant={alert.type === 'warning' ? 'warning' : alert.type === 'error' ? 'error' : 'info'}
              title={alert.title}
              dismissible
              onDismiss={() => setDismissedAlerts([...dismissedAlerts, alert.id])}
            >
              {alert.message}
            </Alert>
          ))}
        </div>
      )}

      {/* Charts Row */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Consumption Chart */}
        <ChartWrapper
          title="Consumo Energético"
          subtitle="Últimas 24 horas"
          className="lg:col-span-2"
          height={320}
          actions={
            <Badge variant="success" size="sm">
              En vivo
            </Badge>
          }
        >
          <LazyResponsiveContainer width="100%" height="100%">
            <LazyAreaChart
              data={mockConsumptionData}
              margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#1E3A5F" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#1E3A5F" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorPredicted" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#006341" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#006341" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis
                dataKey="hour"
                tick={{ fontSize: 12, fill: '#6B7280' }}
                tickFormatter={(value) => `${value}:00`}
              />
              <YAxis
                tick={{ fontSize: 12, fill: '#6B7280' }}
                tickFormatter={(value) => `${value} MW`}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'white',
                  border: '1px solid #E5E7EB',
                  borderRadius: '8px',
                }}
                formatter={(value) => [`${Number(value).toFixed(0)} MW`, '']}
                labelFormatter={(label) => `${label}:00 hrs`}
              />
              <Legend />
              <Area
                type="monotone"
                dataKey="value"
                name="Consumo Real"
                stroke="#1E3A5F"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorValue)"
              />
              <Area
                type="monotone"
                dataKey="predicted"
                name="Pronóstico"
                stroke="#006341"
                strokeWidth={2}
                strokeDasharray="5 5"
                fillOpacity={1}
                fill="url(#colorPredicted)"
              />
            </LazyAreaChart>
          </LazyResponsiveContainer>
        </ChartWrapper>

        {/* Generation Mix Pie Chart */}
        <ChartWrapper title="Mix de Generación" subtitle="Distribución actual" height={320}>
          <LazyResponsiveContainer width="100%" height="100%">
            <LazyPieChart>
              <Pie
                data={mockGenerationMix}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={90}
                paddingAngle={2}
                dataKey="value"
              >
                {mockGenerationMix.map((entry) => (
                  <Cell key={entry.source} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: 'white',
                  border: '1px solid #E5E7EB',
                  borderRadius: '8px',
                }}
                formatter={(value, _name, props) => [
                  `${value} MW (${props.payload.percentage}%)`,
                  props.payload.label,
                ]}
              />
              <Legend
                formatter={(value) => {
                  const item = mockGenerationMix.find((g) => g.source === value);
                  return item?.label || value;
                }}
              />
            </LazyPieChart>
          </LazyResponsiveContainer>
        </ChartWrapper>
      </div>

      {/* Bottom Row: Insights and Recent Activity */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* AI Insights */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-[var(--color-text-primary)]">
              Insights de IA
            </h2>
            <Button variant="ghost" size="sm">
              Ver todos
            </Button>
          </div>
          <div className="space-y-3">
            {mockInsights.slice(0, 3).map((insight) => (
              <InsightCard
                key={insight.id}
                insight={insight}
                compact
                onClick={() => {}}
              />
            ))}
          </div>
        </div>

        {/* Recent Alerts */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-[var(--color-text-primary)]">
              Actividad Reciente
            </h2>
            <Button variant="ghost" size="sm" leftIcon={<Bell className="h-4 w-4" />}>
              Configurar
            </Button>
          </div>
          <div className="rounded-lg border border-[var(--color-border)] bg-white">
            {mockAlerts.map((alert, idx) => (
              <div
                key={alert.id}
                className={cn(
                  'flex items-center justify-between p-4',
                  idx !== mockAlerts.length - 1 && 'border-b border-[var(--color-border)]'
                )}
              >
                <div className="flex items-center gap-3">
                  <span
                    className={cn(
                      'h-2.5 w-2.5 rounded-full',
                      alert.type === 'warning' && 'bg-[var(--color-warning)]',
                      alert.type === 'error' && 'bg-[var(--color-error)]',
                      alert.type === 'info' && 'bg-[var(--color-info)]',
                      alert.type === 'success' && 'bg-[var(--color-success)]'
                    )}
                  />
                  <div>
                    <p className="text-sm font-medium text-[var(--color-text-primary)]">
                      {alert.title}
                    </p>
                    <p className="text-xs text-[var(--color-text-muted)]">
                      {alert.message}
                    </p>
                  </div>
                </div>
                <span className="shrink-0 text-xs text-[var(--color-text-muted)]">
                  {formatTime(alert.timestamp)}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
