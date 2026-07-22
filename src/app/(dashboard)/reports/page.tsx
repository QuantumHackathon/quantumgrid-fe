'use client';

import { useState } from 'react';
import {
  FileText,
  Download,
  Calendar,
  Filter,
  Clock,
  CheckCircle,
  AlertCircle,
  RefreshCw,
  Plus,
  Eye,
  Trash2,
  BarChart3,
  PieChart,
  TrendingUp,
  Zap,
} from 'lucide-react';
import {
  Button,
  Select,
  Badge,
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  Modal,
  ModalFooter,
} from '@/components/ui';
import { DataTable, EmptyState } from '@/components/shared';
import type { Column } from '@/components/shared';

interface Report {
  id: string;
  name: string;
  type: 'consumption' | 'generation' | 'efficiency' | 'infrastructure';
  period: string;
  createdAt: string;
  status: 'ready' | 'generating' | 'error';
  format: 'pdf' | 'excel' | 'csv';
  size?: string;
}

const reportTypeLabels = {
  consumption: 'Consumo',
  generation: 'Generación',
  efficiency: 'Eficiencia',
  infrastructure: 'Infraestructura',
};

const reportTypeIcons = {
  consumption: BarChart3,
  generation: Zap,
  efficiency: TrendingUp,
  infrastructure: PieChart,
};

const mockReports: Report[] = [
  {
    id: '1',
    name: 'Reporte Mensual de Consumo - Enero 2024',
    type: 'consumption',
    period: 'Enero 2024',
    createdAt: '2024-01-31T10:30:00Z',
    status: 'ready',
    format: 'pdf',
    size: '2.4 MB',
  },
  {
    id: '2',
    name: 'Análisis de Generación por Fuente',
    type: 'generation',
    period: 'Q4 2023',
    createdAt: '2024-01-15T14:20:00Z',
    status: 'ready',
    format: 'excel',
    size: '5.1 MB',
  },
  {
    id: '3',
    name: 'Indicadores de Eficiencia Nacional',
    type: 'efficiency',
    period: '2023',
    createdAt: '2024-01-10T09:00:00Z',
    status: 'ready',
    format: 'pdf',
    size: '1.8 MB',
  },
  {
    id: '4',
    name: 'Estado de Infraestructura - Febrero',
    type: 'infrastructure',
    period: 'Febrero 2024',
    createdAt: '2024-02-01T08:00:00Z',
    status: 'generating',
    format: 'pdf',
  },
  {
    id: '5',
    name: 'Reporte Semanal de Demanda',
    type: 'consumption',
    period: 'Sem 5 2024',
    createdAt: '2024-02-02T12:00:00Z',
    status: 'error',
    format: 'csv',
  },
];

const reportTemplates = [
  {
    id: 'monthly-consumption',
    name: 'Reporte Mensual de Consumo',
    description: 'Análisis detallado del consumo energético por región y sector',
    type: 'consumption' as const,
  },
  {
    id: 'generation-mix',
    name: 'Mix de Generación',
    description: 'Distribución de generación por tipo de fuente energética',
    type: 'generation' as const,
  },
  {
    id: 'efficiency-kpis',
    name: 'KPIs de Eficiencia',
    description: 'Indicadores clave de rendimiento de la red eléctrica',
    type: 'efficiency' as const,
  },
  {
    id: 'infrastructure-status',
    name: 'Estado de Infraestructura',
    description: 'Resumen del estado de plantas y líneas de transmisión',
    type: 'infrastructure' as const,
  },
];

const typeOptions = [
  { value: 'all', label: 'Todos los tipos' },
  { value: 'consumption', label: 'Consumo' },
  { value: 'generation', label: 'Generación' },
  { value: 'efficiency', label: 'Eficiencia' },
  { value: 'infrastructure', label: 'Infraestructura' },
];

const statusOptions = [
  { value: 'all', label: 'Todos los estados' },
  { value: 'ready', label: 'Listo' },
  { value: 'generating', label: 'Generando' },
  { value: 'error', label: 'Error' },
];

export default function ReportsPage() {
  const [selectedType, setSelectedType] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [showNewReportModal, setShowNewReportModal] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);

  const filteredReports = mockReports.filter((report) => {
    if (selectedType !== 'all' && report.type !== selectedType) return false;
    if (selectedStatus !== 'all' && report.status !== selectedStatus) return false;
    return true;
  });

  const stats = {
    total: mockReports.length,
    ready: mockReports.filter((r) => r.status === 'ready').length,
    generating: mockReports.filter((r) => r.status === 'generating').length,
    thisMonth: mockReports.filter((r) => {
      const date = new Date(r.createdAt);
      const now = new Date();
      return date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear();
    }).length,
  };

  const columns: Column<Report>[] = [
    {
      key: 'name',
      header: 'Reporte',
      render: (_, row) => {
        const Icon = reportTypeIcons[row.type];
        return (
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--color-primary-light)]">
              <Icon className="h-5 w-5 text-[var(--color-primary)]" />
            </div>
            <div>
              <p className="font-medium text-[var(--color-text-primary)]">{row.name}</p>
              <p className="text-xs text-[var(--color-text-muted)]">
                {reportTypeLabels[row.type]} • {row.period}
              </p>
            </div>
          </div>
        );
      },
    },
    {
      key: 'createdAt',
      header: 'Fecha',
      render: (value) => (
        <div className="flex items-center gap-2 text-sm text-[var(--color-text-secondary)]">
          <Calendar className="h-4 w-4" />
          {new Date(value as string).toLocaleDateString('es-CR', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
          })}
        </div>
      ),
    },
    {
      key: 'format',
      header: 'Formato',
      render: (value) => (
        <Badge variant="default" size="sm">
          {(value as string).toUpperCase()}
        </Badge>
      ),
    },
    {
      key: 'size',
      header: 'Tamaño',
      align: 'right',
      render: (value) => (
        <span className="text-sm text-[var(--color-text-muted)]">
          {(value as string) || '-'}
        </span>
      ),
    },
    {
      key: 'status',
      header: 'Estado',
      render: (_, row) => {
        if (row.status === 'ready') {
          return (
            <Badge variant="success">
              <CheckCircle className="mr-1 h-3 w-3" />
              Listo
            </Badge>
          );
        }
        if (row.status === 'generating') {
          return (
            <Badge variant="info">
              <RefreshCw className="mr-1 h-3 w-3 animate-spin" />
              Generando
            </Badge>
          );
        }
        return (
          <Badge variant="error">
            <AlertCircle className="mr-1 h-3 w-3" />
            Error
          </Badge>
        );
      },
    },
    {
      key: 'actions',
      header: '',
      align: 'right',
      render: (_, row) => (
        <div className="flex items-center justify-end gap-2">
          {row.status === 'ready' && (
            <>
              <Button variant="ghost" size="sm">
                <Eye className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <Download className="h-4 w-4" />
              </Button>
            </>
          )}
          {row.status === 'error' && (
            <Button variant="ghost" size="sm">
              <RefreshCw className="h-4 w-4" />
            </Button>
          )}
          <Button variant="ghost" size="sm" className="text-[var(--color-error)]">
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[var(--color-text-primary)]">
            Reportes
          </h1>
          <p className="text-sm text-[var(--color-text-muted)]">
            Genere y descargue reportes del sistema energético
          </p>
        </div>
        <Button
          variant="primary"
          leftIcon={<Plus className="h-4 w-4" />}
          onClick={() => setShowNewReportModal(true)}
        >
          Nuevo Reporte
        </Button>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <FileText className="h-5 w-5 text-[var(--color-primary)]" />
              <div>
                <p className="text-sm text-[var(--color-text-muted)]">
                  Total Reportes
                </p>
                <p className="text-2xl font-semibold text-[var(--color-text-primary)]">
                  {stats.total}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <CheckCircle className="h-5 w-5 text-[var(--color-success)]" />
              <div>
                <p className="text-sm text-[var(--color-text-muted)]">Listos</p>
                <p className="text-2xl font-semibold text-[var(--color-success)]">
                  {stats.ready}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Clock className="h-5 w-5 text-[var(--color-info)]" />
              <div>
                <p className="text-sm text-[var(--color-text-muted)]">Generando</p>
                <p className="text-2xl font-semibold text-[var(--color-info)]">
                  {stats.generating}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Calendar className="h-5 w-5 text-[var(--color-accent)]" />
              <div>
                <p className="text-sm text-[var(--color-text-muted)]">Este Mes</p>
                <p className="text-2xl font-semibold text-[var(--color-text-primary)]">
                  {stats.thisMonth}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
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
              options={typeOptions}
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="w-44"
            />
            <Select
              options={statusOptions}
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-40"
            />
          </div>
        </CardContent>
      </Card>

      {/* Reports Table */}
      <Card>
        <CardHeader>
          <CardTitle>Historial de Reportes</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {filteredReports.length > 0 ? (
            <DataTable
              columns={columns}
              data={filteredReports}
              keyExtractor={(row) => row.id}
              className="border-0"
            />
          ) : (
            <div className="p-8">
              <EmptyState
                variant="search"
                title="Sin resultados"
                description="No se encontraron reportes con los filtros seleccionados"
                action={{
                  label: 'Limpiar filtros',
                  onClick: () => {
                    setSelectedType('all');
                    setSelectedStatus('all');
                  },
                }}
              />
            </div>
          )}
        </CardContent>
      </Card>

      {/* New Report Modal */}
      <Modal
        isOpen={showNewReportModal}
        onClose={() => {
          setShowNewReportModal(false);
          setSelectedTemplate(null);
        }}
        title="Crear Nuevo Reporte"
        size="lg"
      >
        <div className="space-y-4">
          <p className="text-sm text-[var(--color-text-secondary)]">
            Seleccione una plantilla para generar su reporte:
          </p>
          <div className="grid gap-3 sm:grid-cols-2">
            {reportTemplates.map((template) => {
              const Icon = reportTypeIcons[template.type];
              const isSelected = selectedTemplate === template.id;
              return (
                <button
                  key={template.id}
                  onClick={() => setSelectedTemplate(template.id)}
                  className={`rounded-lg border p-4 text-left transition-all ${
                    isSelected
                      ? 'border-[var(--color-primary)] bg-[var(--color-primary-light)]'
                      : 'border-[var(--color-border)] hover:border-[var(--color-primary)]'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={`flex h-10 w-10 items-center justify-center rounded-lg ${
                        isSelected
                          ? 'bg-[var(--color-primary)] text-white'
                          : 'bg-[var(--color-neutral-100)]'
                      }`}
                    >
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-medium text-[var(--color-text-primary)]">
                        {template.name}
                      </p>
                      <p className="mt-1 text-xs text-[var(--color-text-muted)]">
                        {template.description}
                      </p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {selectedTemplate && (
            <div className="space-y-4 border-t border-[var(--color-border)] pt-4">
              <h4 className="font-medium text-[var(--color-text-primary)]">
                Configuración del Reporte
              </h4>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-[var(--color-text-secondary)]">
                    Período
                  </label>
                  <Select
                    options={[
                      { value: 'last-week', label: 'Última semana' },
                      { value: 'last-month', label: 'Último mes' },
                      { value: 'last-quarter', label: 'Último trimestre' },
                      { value: 'last-year', label: 'Último año' },
                      { value: 'custom', label: 'Personalizado' },
                    ]}
                    defaultValue="last-month"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-[var(--color-text-secondary)]">
                    Formato
                  </label>
                  <Select
                    options={[
                      { value: 'pdf', label: 'PDF' },
                      { value: 'excel', label: 'Excel' },
                      { value: 'csv', label: 'CSV' },
                    ]}
                    defaultValue="pdf"
                  />
                </div>
              </div>
            </div>
          )}
        </div>
        <ModalFooter>
          <Button
            variant="ghost"
            onClick={() => {
              setShowNewReportModal(false);
              setSelectedTemplate(null);
            }}
          >
            Cancelar
          </Button>
          <Button variant="primary" disabled={!selectedTemplate}>
            Generar Reporte
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}
