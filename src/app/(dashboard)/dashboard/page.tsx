'use client';

import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
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
import { RefreshCw, Download, ArrowRight, Settings, ExternalLink } from 'lucide-react';
import { Button, Badge, Alert, Modal, ModalFooter } from '@/components/ui';
import { MetricCard, ChartWrapper, InsightCard } from '@/components/shared';
import {
  mockMetrics,
  mockConsumptionData,
  mockGenerationMix,
  mockAlerts,
  mockInsights,
} from '@/lib/mock-data';
import { cn } from '@/lib/utils';
import type { Insight } from '@/types';

export default function DashboardPage() {
  const router = useRouter();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [dismissedAlerts, setDismissedAlerts] = useState<string[]>([]);
  const [selectedInsight, setSelectedInsight] = useState<Insight | null>(null);
  const [showExportModal, setShowExportModal] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [isExporting, setIsExporting] = useState(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 1500);
  };

  const handleExport = (format: 'csv' | 'json' | 'pdf') => {
    setIsExporting(true);

    // Simulate export
    setTimeout(() => {
      const data = {
        metrics: mockMetrics,
        consumption: mockConsumptionData,
        generationMix: mockGenerationMix,
        exportedAt: new Date().toISOString(),
      };

      if (format === 'csv') {
        // Create CSV for consumption data
        const headers = ['Hora', 'Consumo Real (MW)', 'Pronóstico (MW)'];
        const rows = mockConsumptionData.map(d =>
          [d.hour, d.value.toFixed(2), d.predicted?.toFixed(2) || ''].join(',')
        );
        const csv = [headers.join(','), ...rows].join('\n');
        downloadFile(csv, 'dashboard-data.csv', 'text/csv');
      } else if (format === 'json') {
        downloadFile(JSON.stringify(data, null, 2), 'dashboard-data.json', 'application/json');
      } else {
        // For PDF, just show a message (in a real app, would generate PDF)
        alert('La exportación a PDF estará disponible próximamente.');
      }

      setIsExporting(false);
      setShowExportModal(false);
    }, 1000);
  };

  const downloadFile = (content: string, filename: string, type: string) => {
    const blob = new Blob([content], { type });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
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

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-[var(--color-error)]';
      case 'medium': return 'text-[var(--color-warning)]';
      default: return 'text-[var(--color-info)]';
    }
  };

  const getCategoryLabel = (category: string) => {
    const labels: Record<string, string> = {
      efficiency: 'Eficiencia',
      capacity: 'Capacidad',
      maintenance: 'Mantenimiento',
      cost: 'Costos',
      sustainability: 'Sostenibilidad',
    };
    return labels[category] || category;
  };

  return (
    <div className="space-y-4 lg:space-y-6">
      {/* Page Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl font-bold text-[var(--color-text-primary)] lg:text-2xl">
            Dashboard Nacional
          </h1>
          <p className="text-xs text-[var(--color-text-muted)] lg:text-sm">
            Última actualización:{' '}
            {new Date().toLocaleString('es-CR', {
              dateStyle: 'medium',
              timeStyle: 'short',
            })}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            leftIcon={<Download className="h-4 w-4" />}
            onClick={() => setShowExportModal(true)}
          >
            <span className="hidden sm:inline">Exportar</span>
          </Button>
          <Button
            variant="primary"
            size="sm"
            leftIcon={<RefreshCw className={cn('h-4 w-4', isRefreshing && 'animate-spin')} />}
            onClick={handleRefresh}
            isLoading={isRefreshing}
          >
            <span className="hidden sm:inline">Actualizar</span>
          </Button>
        </div>
      </div>

      {/* KPI Metrics Grid */}
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-4">
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
              <span className="text-sm">{alert.message}</span>
            </Alert>
          ))}
        </div>
      )}

      {/* Charts Row */}
      <div className="grid gap-4 lg:grid-cols-3 lg:gap-6">
        {/* Consumption Chart */}
        <ChartWrapper
          title="Consumo Energético"
          subtitle="Últimas 24 horas"
          className="lg:col-span-2"
          height={280}
          actions={
            <Badge variant="success" size="sm">
              En vivo
            </Badge>
          }
        >
          <LazyResponsiveContainer width="100%" height="100%">
            <LazyAreaChart
              data={mockConsumptionData}
              margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
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
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis
                dataKey="hour"
                tick={{ fontSize: 10, fill: 'rgba(255,255,255,0.5)' }}
                tickFormatter={(value) => `${value}h`}
                interval="preserveStartEnd"
              />
              <YAxis
                tick={{ fontSize: 10, fill: 'rgba(255,255,255,0.5)' }}
                tickFormatter={(value) => `${value}`}
                width={40}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#15151f',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '8px',
                  color: '#fff',
                  fontSize: '12px',
                }}
                formatter={(value) => [`${Number(value).toFixed(0)} MW`, '']}
                labelFormatter={(label) => `${label}:00 hrs`}
              />
              <Legend wrapperStyle={{ fontSize: '12px' }} />
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
        <ChartWrapper title="Mix de Generación" subtitle="Distribución actual" height={280}>
          <LazyResponsiveContainer width="100%" height="100%">
            <LazyPieChart>
              <Pie
                data={mockGenerationMix}
                cx="50%"
                cy="45%"
                innerRadius={50}
                outerRadius={75}
                paddingAngle={2}
                dataKey="value"
              >
                {mockGenerationMix.map((entry) => (
                  <Cell key={entry.source} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: '#15151f',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '8px',
                  color: '#fff',
                  fontSize: '12px',
                }}
                formatter={(value, _name, props) => [
                  `${value} MW (${props.payload.percentage}%)`,
                  props.payload.label,
                ]}
              />
              <Legend
                wrapperStyle={{ fontSize: '11px' }}
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
      <div className="grid gap-4 lg:grid-cols-2 lg:gap-6">
        {/* AI Insights */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-semibold text-[var(--color-text-primary)] lg:text-lg">
              Insights de IA
            </h2>
            <Button
              variant="ghost"
              size="sm"
              rightIcon={<ArrowRight className="h-4 w-4" />}
              onClick={() => router.push('/insights')}
            >
              Ver todos
            </Button>
          </div>
          <div className="space-y-3">
            {mockInsights.slice(0, 3).map((insight) => (
              <InsightCard
                key={insight.id}
                insight={insight}
                compact
                onClick={() => setSelectedInsight(insight)}
              />
            ))}
          </div>
        </div>

        {/* Recent Alerts */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-semibold text-[var(--color-text-primary)] lg:text-lg">
              Actividad Reciente
            </h2>
            <Button
              variant="ghost"
              size="sm"
              leftIcon={<Settings className="h-4 w-4" />}
              onClick={() => setShowSettingsModal(true)}
            >
              Configurar
            </Button>
          </div>
          <div className="rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)]">
            {mockAlerts.map((alert, idx) => (
              <div
                key={alert.id}
                className={cn(
                  'flex items-start justify-between gap-3 p-3 lg:p-4',
                  idx !== mockAlerts.length - 1 && 'border-b border-[var(--color-border)]'
                )}
              >
                <div className="flex items-start gap-3">
                  <span
                    className={cn(
                      'mt-1.5 h-2 w-2 shrink-0 rounded-full',
                      alert.type === 'warning' && 'bg-[var(--color-warning)]',
                      alert.type === 'error' && 'bg-[var(--color-error)]',
                      alert.type === 'info' && 'bg-[var(--color-info)]',
                      alert.type === 'success' && 'bg-[var(--color-success)]'
                    )}
                  />
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-[var(--color-text-primary)]">
                      {alert.title}
                    </p>
                    <p className="mt-0.5 text-xs text-[var(--color-text-muted)] line-clamp-2">
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

      {/* Export Modal */}
      <Modal
        isOpen={showExportModal}
        onClose={() => setShowExportModal(false)}
        title="Exportar Datos"
        description="Seleccione el formato de exportación"
        size="sm"
      >
        <div className="space-y-3">
          <button
            onClick={() => handleExport('csv')}
            disabled={isExporting}
            className="flex w-full items-center justify-between rounded-lg border border-[var(--color-border)] p-4 text-left transition-colors hover:bg-[var(--color-surface-elevated)] disabled:opacity-50"
          >
            <div>
              <p className="font-medium text-[var(--color-text-primary)]">CSV</p>
              <p className="text-sm text-[var(--color-text-muted)]">Datos de consumo en formato CSV</p>
            </div>
            <Download className="h-5 w-5 text-[var(--color-text-muted)]" />
          </button>
          <button
            onClick={() => handleExport('json')}
            disabled={isExporting}
            className="flex w-full items-center justify-between rounded-lg border border-[var(--color-border)] p-4 text-left transition-colors hover:bg-[var(--color-surface-elevated)] disabled:opacity-50"
          >
            <div>
              <p className="font-medium text-[var(--color-text-primary)]">JSON</p>
              <p className="text-sm text-[var(--color-text-muted)]">Todos los datos en formato JSON</p>
            </div>
            <Download className="h-5 w-5 text-[var(--color-text-muted)]" />
          </button>
          <button
            onClick={() => handleExport('pdf')}
            disabled={isExporting}
            className="flex w-full items-center justify-between rounded-lg border border-[var(--color-border)] p-4 text-left transition-colors hover:bg-[var(--color-surface-elevated)] disabled:opacity-50"
          >
            <div>
              <p className="font-medium text-[var(--color-text-primary)]">PDF</p>
              <p className="text-sm text-[var(--color-text-muted)]">Reporte visual en PDF</p>
            </div>
            <Download className="h-5 w-5 text-[var(--color-text-muted)]" />
          </button>
        </div>
        {isExporting && (
          <div className="mt-4 flex items-center justify-center gap-2 text-sm text-[var(--color-text-muted)]">
            <RefreshCw className="h-4 w-4 animate-spin" />
            Exportando...
          </div>
        )}
      </Modal>

      {/* Settings Modal */}
      <Modal
        isOpen={showSettingsModal}
        onClose={() => setShowSettingsModal(false)}
        title="Configurar Notificaciones"
        description="Personalice sus preferencias de alertas"
        size="md"
      >
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-[var(--color-text-primary)]">Alertas de mantenimiento</p>
              <p className="text-sm text-[var(--color-text-muted)]">Recibir notificaciones de mantenimiento programado</p>
            </div>
            <input type="checkbox" defaultChecked className="h-5 w-5 rounded" />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-[var(--color-text-primary)]">Alertas de eficiencia</p>
              <p className="text-sm text-[var(--color-text-muted)]">Notificaciones cuando la eficiencia baje del umbral</p>
            </div>
            <input type="checkbox" defaultChecked className="h-5 w-5 rounded" />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-[var(--color-text-primary)]">Reportes semanales</p>
              <p className="text-sm text-[var(--color-text-muted)]">Recibir resumen semanal por correo</p>
            </div>
            <input type="checkbox" className="h-5 w-5 rounded" />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-[var(--color-text-primary)]">Insights de IA</p>
              <p className="text-sm text-[var(--color-text-muted)]">Notificaciones de nuevos insights</p>
            </div>
            <input type="checkbox" defaultChecked className="h-5 w-5 rounded" />
          </div>
        </div>
        <ModalFooter className="-mx-4 -mb-4 mt-4">
          <Button variant="ghost" onClick={() => setShowSettingsModal(false)}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={() => setShowSettingsModal(false)}>
            Guardar cambios
          </Button>
        </ModalFooter>
      </Modal>

      {/* Insight Detail Modal */}
      <Modal
        isOpen={!!selectedInsight}
        onClose={() => setSelectedInsight(null)}
        title={selectedInsight?.title || ''}
        size="lg"
      >
        {selectedInsight && (
          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="default">{getCategoryLabel(selectedInsight.category)}</Badge>
              <Badge
                variant={
                  selectedInsight.priority === 'high' ? 'error' :
                  selectedInsight.priority === 'medium' ? 'warning' : 'info'
                }
              >
                {selectedInsight.priority === 'high' ? 'Alta' :
                 selectedInsight.priority === 'medium' ? 'Media' : 'Baja'} prioridad
              </Badge>
              {selectedInsight.status === 'new' && (
                <Badge variant="success">Nuevo</Badge>
              )}
            </div>

            <div>
              <h4 className="text-sm font-medium text-[var(--color-text-muted)]">Descripción</h4>
              <p className="mt-1 text-[var(--color-text-primary)]">{selectedInsight.description}</p>
            </div>

            <div className="rounded-lg bg-[var(--color-surface-elevated)] p-4">
              <h4 className="text-sm font-medium text-[var(--color-text-muted)]">Impacto estimado</h4>
              <p className={cn('mt-1 text-lg font-semibold', getPriorityColor(selectedInsight.priority))}>
                {selectedInsight.impact}
              </p>
            </div>

            <div>
              <h4 className="text-sm font-medium text-[var(--color-text-muted)]">Recomendación</h4>
              <p className="mt-1 text-[var(--color-text-primary)]">{selectedInsight.recommendation}</p>
            </div>

            <div className="text-xs text-[var(--color-text-muted)]">
              Generado: {new Date(selectedInsight.createdAt).toLocaleString('es-CR')}
            </div>
          </div>
        )}
        <ModalFooter className="-mx-4 -mb-4 mt-4">
          <Button variant="ghost" onClick={() => setSelectedInsight(null)}>
            Cerrar
          </Button>
          <Button
            variant="primary"
            rightIcon={<ExternalLink className="h-4 w-4" />}
            onClick={() => {
              router.push('/insights');
              setSelectedInsight(null);
            }}
          >
            Ver en Insights
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}
