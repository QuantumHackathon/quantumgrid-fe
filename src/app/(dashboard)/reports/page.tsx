'use client';

import { useState, useMemo } from 'react';
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
  X,
  FileDown,
  Printer,
  Share2,
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
  Alert,
} from '@/components/ui';
import { EmptyState } from '@/components/shared';
import { cn } from '@/lib/utils';

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

const initialReports: Report[] = [
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

const periodOptions = [
  { value: 'last-week', label: 'Última semana' },
  { value: 'last-month', label: 'Último mes' },
  { value: 'last-quarter', label: 'Último trimestre' },
  { value: 'last-year', label: 'Último año' },
];

const formatOptions = [
  { value: 'pdf', label: 'PDF' },
  { value: 'excel', label: 'Excel' },
  { value: 'csv', label: 'CSV' },
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

const periodLabels: Record<string, string> = {
  'last-week': 'Última semana',
  'last-month': 'Último mes',
  'last-quarter': 'Último trimestre',
  'last-year': 'Último año',
};

export default function ReportsPage() {
  const [reports, setReports] = useState<Report[]>(initialReports);
  const [selectedType, setSelectedType] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [showNewReportModal, setShowNewReportModal] = useState(false);
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [selectedPeriod, setSelectedPeriod] = useState('last-month');
  const [selectedFormat, setSelectedFormat] = useState('pdf');
  const [reportToPreview, setReportToPreview] = useState<Report | null>(null);
  const [reportToDelete, setReportToDelete] = useState<Report | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error' | 'info'; message: string } | null>(null);

  const filteredReports = useMemo(() => {
    return reports.filter((report) => {
      if (selectedType !== 'all' && report.type !== selectedType) return false;
      if (selectedStatus !== 'all' && report.status !== selectedStatus) return false;
      return true;
    });
  }, [reports, selectedType, selectedStatus]);

  const stats = useMemo(() => ({
    total: reports.length,
    ready: reports.filter((r) => r.status === 'ready').length,
    generating: reports.filter((r) => r.status === 'generating').length,
    thisMonth: reports.filter((r) => {
      const date = new Date(r.createdAt);
      const now = new Date();
      return date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear();
    }).length,
  }), [reports]);

  const showFeedback = (type: 'success' | 'error' | 'info', message: string) => {
    setFeedback({ type, message });
    setTimeout(() => setFeedback(null), 3000);
  };

  const handleGenerateReport = () => {
    if (!selectedTemplate) return;

    const template = reportTemplates.find(t => t.id === selectedTemplate);
    if (!template) return;

    setIsGenerating(true);

    const newReport: Report = {
      id: Date.now().toString(),
      name: `${template.name} - ${periodLabels[selectedPeriod]}`,
      type: template.type,
      period: periodLabels[selectedPeriod],
      createdAt: new Date().toISOString(),
      status: 'generating',
      format: selectedFormat as 'pdf' | 'excel' | 'csv',
    };

    setReports(prev => [newReport, ...prev]);
    setShowNewReportModal(false);
    setSelectedTemplate(null);
    setIsGenerating(false);
    showFeedback('info', 'Generando reporte...');

    // Simulate report generation
    setTimeout(() => {
      setReports(prev => prev.map(r =>
        r.id === newReport.id
          ? { ...r, status: 'ready' as const, size: `${(Math.random() * 5 + 1).toFixed(1)} MB` }
          : r
      ));
      showFeedback('success', 'Reporte generado exitosamente');
    }, 3000);
  };

  const handleDownload = (report: Report) => {
    showFeedback('success', `Descargando ${report.name}...`);
    // Simulate download
    setTimeout(() => {
      const content = `Reporte: ${report.name}\nTipo: ${reportTypeLabels[report.type]}\nPeríodo: ${report.period}\nGenerado: ${new Date(report.createdAt).toLocaleString('es-CR')}`;
      const blob = new Blob([content], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${report.name}.${report.format}`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }, 500);
  };

  const handleRetry = (reportId: string) => {
    setReports(prev => prev.map(r =>
      r.id === reportId ? { ...r, status: 'generating' as const } : r
    ));
    showFeedback('info', 'Reintentando generar reporte...');

    setTimeout(() => {
      setReports(prev => prev.map(r =>
        r.id === reportId
          ? { ...r, status: 'ready' as const, size: `${(Math.random() * 5 + 1).toFixed(1)} MB` }
          : r
      ));
      showFeedback('success', 'Reporte generado exitosamente');
    }, 2000);
  };

  const handleDelete = () => {
    if (!reportToDelete) return;
    setReports(prev => prev.filter(r => r.id !== reportToDelete.id));
    showFeedback('info', 'Reporte eliminado');
    setShowDeleteModal(false);
    setReportToDelete(null);
  };

  const clearFilters = () => {
    setSelectedType('all');
    setSelectedStatus('all');
  };

  const hasActiveFilters = selectedType !== 'all' || selectedStatus !== 'all';

  return (
    <div className="space-y-4 lg:space-y-6">
      {/* Feedback Alert */}
      {feedback && (
        <div className="fixed right-4 top-20 z-50 animate-in slide-in-from-right">
          <Alert
            variant={feedback.type}
            title={feedback.message}
            dismissible
            onDismiss={() => setFeedback(null)}
          />
        </div>
      )}

      {/* Page Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl font-bold text-[var(--color-text-primary)] lg:text-2xl">
            Reportes
          </h1>
          <p className="text-xs text-[var(--color-text-muted)] lg:text-sm">
            Genere y descargue reportes del sistema energético
          </p>
        </div>
        <Button
          variant="primary"
          size="sm"
          leftIcon={<Plus className="h-4 w-4" />}
          onClick={() => setShowNewReportModal(true)}
        >
          Nuevo Reporte
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-4">
        <Card>
          <CardContent className="p-3 lg:p-4">
            <div className="flex items-center gap-2 lg:gap-3">
              <div className="rounded-lg bg-[var(--color-primary)]/10 p-2">
                <FileText className="h-4 w-4 text-[var(--color-primary)] lg:h-5 lg:w-5" />
              </div>
              <div>
                <p className="text-xs text-[var(--color-text-muted)]">Total</p>
                <p className="text-lg font-semibold text-[var(--color-text-primary)] lg:text-2xl">
                  {stats.total}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-3 lg:p-4">
            <div className="flex items-center gap-2 lg:gap-3">
              <div className="rounded-lg bg-[var(--color-success)]/10 p-2">
                <CheckCircle className="h-4 w-4 text-[var(--color-success)] lg:h-5 lg:w-5" />
              </div>
              <div>
                <p className="text-xs text-[var(--color-text-muted)]">Listos</p>
                <p className="text-lg font-semibold text-[var(--color-success)] lg:text-2xl">
                  {stats.ready}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-3 lg:p-4">
            <div className="flex items-center gap-2 lg:gap-3">
              <div className="rounded-lg bg-[var(--color-info)]/10 p-2">
                <Clock className="h-4 w-4 text-[var(--color-info)] lg:h-5 lg:w-5" />
              </div>
              <div>
                <p className="text-xs text-[var(--color-text-muted)]">Generando</p>
                <p className="text-lg font-semibold text-[var(--color-info)] lg:text-2xl">
                  {stats.generating}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-3 lg:p-4">
            <div className="flex items-center gap-2 lg:gap-3">
              <div className="rounded-lg bg-[var(--color-accent)]/10 p-2">
                <Calendar className="h-4 w-4 text-[var(--color-accent)] lg:h-5 lg:w-5" />
              </div>
              <div>
                <p className="text-xs text-[var(--color-text-muted)]">Este Mes</p>
                <p className="text-lg font-semibold text-[var(--color-text-primary)] lg:text-2xl">
                  {stats.thisMonth}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-3 lg:p-4">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:gap-4">
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-[var(--color-text-muted)]" />
              <span className="text-sm font-medium text-[var(--color-text-secondary)]">
                Filtros:
              </span>
            </div>
            <div className="flex flex-1 flex-wrap gap-2 lg:gap-3">
              <Select
                options={typeOptions}
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="flex-1 min-w-[130px] lg:flex-none lg:w-44"
              />
              <Select
                options={statusOptions}
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="flex-1 min-w-[130px] lg:flex-none lg:w-40"
              />
              {hasActiveFilters && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearFilters}
                  leftIcon={<X className="h-4 w-4" />}
                >
                  Limpiar
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Reports List */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base lg:text-lg">Historial de Reportes</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {filteredReports.length > 0 ? (
            <div className="divide-y divide-[var(--color-border)]">
              {filteredReports.map((report) => {
                const Icon = reportTypeIcons[report.type];
                return (
                  <div
                    key={report.id}
                    className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between"
                  >
                    <div className="flex items-start gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[var(--color-primary)]/10">
                        <Icon className="h-5 w-5 text-[var(--color-primary)]" />
                      </div>
                      <div className="min-w-0">
                        <p className="font-medium text-[var(--color-text-primary)] line-clamp-1">
                          {report.name}
                        </p>
                        <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-[var(--color-text-muted)]">
                          <span>{reportTypeLabels[report.type]}</span>
                          <span>•</span>
                          <span>{report.period}</span>
                          <span>•</span>
                          <span>
                            {new Date(report.createdAt).toLocaleDateString('es-CR', {
                              day: 'numeric',
                              month: 'short',
                            })}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between gap-3 sm:justify-end">
                      <div className="flex items-center gap-2">
                        <Badge variant="default" size="sm">
                          {report.format.toUpperCase()}
                        </Badge>
                        {report.status === 'ready' && (
                          <Badge variant="success" size="sm">
                            <CheckCircle className="mr-1 h-3 w-3" />
                            {report.size}
                          </Badge>
                        )}
                        {report.status === 'generating' && (
                          <Badge variant="info" size="sm">
                            <RefreshCw className="mr-1 h-3 w-3 animate-spin" />
                            Generando
                          </Badge>
                        )}
                        {report.status === 'error' && (
                          <Badge variant="error" size="sm">
                            <AlertCircle className="mr-1 h-3 w-3" />
                            Error
                          </Badge>
                        )}
                      </div>

                      <div className="flex items-center gap-1">
                        {report.status === 'ready' && (
                          <>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => {
                                setReportToPreview(report);
                                setShowPreviewModal(true);
                              }}
                              title="Vista previa"
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDownload(report)}
                              title="Descargar"
                            >
                              <Download className="h-4 w-4" />
                            </Button>
                          </>
                        )}
                        {report.status === 'error' && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleRetry(report.id)}
                            title="Reintentar"
                          >
                            <RefreshCw className="h-4 w-4" />
                          </Button>
                        )}
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-[var(--color-error)]"
                          onClick={() => {
                            setReportToDelete(report);
                            setShowDeleteModal(true);
                          }}
                          title="Eliminar"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="p-8">
              <EmptyState
                variant="search"
                title="Sin resultados"
                description="No se encontraron reportes con los filtros seleccionados"
                action={{
                  label: 'Limpiar filtros',
                  onClick: clearFilters,
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
                  className={cn(
                    'rounded-lg border p-4 text-left transition-all',
                    isSelected
                      ? 'border-[var(--color-primary)] bg-[var(--color-primary)]/10'
                      : 'border-[var(--color-border)] hover:border-[var(--color-primary)]'
                  )}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={cn(
                        'flex h-10 w-10 items-center justify-center rounded-lg',
                        isSelected
                          ? 'bg-[var(--color-primary)] text-white'
                          : 'bg-[var(--color-surface-elevated)] text-[var(--color-text-muted)]'
                      )}
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
                    options={periodOptions}
                    value={selectedPeriod}
                    onChange={(e) => setSelectedPeriod(e.target.value)}
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-[var(--color-text-secondary)]">
                    Formato
                  </label>
                  <Select
                    options={formatOptions}
                    value={selectedFormat}
                    onChange={(e) => setSelectedFormat(e.target.value)}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
        <ModalFooter className="-mx-4 -mb-4 mt-4">
          <Button
            variant="ghost"
            onClick={() => {
              setShowNewReportModal(false);
              setSelectedTemplate(null);
            }}
          >
            Cancelar
          </Button>
          <Button
            variant="primary"
            disabled={!selectedTemplate}
            onClick={handleGenerateReport}
            isLoading={isGenerating}
          >
            Generar Reporte
          </Button>
        </ModalFooter>
      </Modal>

      {/* Preview Modal */}
      <Modal
        isOpen={showPreviewModal}
        onClose={() => {
          setShowPreviewModal(false);
          setReportToPreview(null);
        }}
        title={reportToPreview?.name || 'Vista Previa'}
        size="lg"
      >
        {reportToPreview && (
          <>
            <div className="space-y-4">
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="info">{reportTypeLabels[reportToPreview.type]}</Badge>
                <Badge variant="default">{reportToPreview.format.toUpperCase()}</Badge>
                <Badge variant="success">{reportToPreview.size}</Badge>
              </div>

              <div className="rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-elevated)] p-6">
                <div className="flex flex-col items-center justify-center py-8 text-center">
                  <FileText className="mb-4 h-16 w-16 text-[var(--color-text-muted)]" />
                  <h3 className="text-lg font-medium text-[var(--color-text-primary)]">
                    {reportToPreview.name}
                  </h3>
                  <p className="mt-2 text-sm text-[var(--color-text-muted)]">
                    Período: {reportToPreview.period}
                  </p>
                  <p className="text-sm text-[var(--color-text-muted)]">
                    Generado: {new Date(reportToPreview.createdAt).toLocaleString('es-CR')}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div className="rounded-lg bg-[var(--color-surface-elevated)] p-4 text-center">
                  <p className="text-2xl font-semibold text-[var(--color-primary)]">24</p>
                  <p className="text-xs text-[var(--color-text-muted)]">Páginas</p>
                </div>
                <div className="rounded-lg bg-[var(--color-surface-elevated)] p-4 text-center">
                  <p className="text-2xl font-semibold text-[var(--color-success)]">12</p>
                  <p className="text-xs text-[var(--color-text-muted)]">Gráficos</p>
                </div>
                <div className="rounded-lg bg-[var(--color-surface-elevated)] p-4 text-center">
                  <p className="text-2xl font-semibold text-[var(--color-info)]">8</p>
                  <p className="text-xs text-[var(--color-text-muted)]">Tablas</p>
                </div>
              </div>
            </div>

            <ModalFooter className="-mx-4 -mb-4 mt-4">
              <Button
                variant="ghost"
                leftIcon={<Share2 className="h-4 w-4" />}
                onClick={() => {
                  showFeedback('success', 'Enlace copiado al portapapeles');
                }}
              >
                Compartir
              </Button>
              <Button
                variant="outline"
                leftIcon={<Printer className="h-4 w-4" />}
                onClick={() => {
                  showFeedback('info', 'Enviando a impresora...');
                }}
              >
                Imprimir
              </Button>
              <Button
                variant="primary"
                leftIcon={<FileDown className="h-4 w-4" />}
                onClick={() => {
                  handleDownload(reportToPreview);
                  setShowPreviewModal(false);
                }}
              >
                Descargar
              </Button>
            </ModalFooter>
          </>
        )}
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={showDeleteModal}
        onClose={() => {
          setShowDeleteModal(false);
          setReportToDelete(null);
        }}
        title="Eliminar Reporte"
        size="sm"
      >
        <div className="space-y-4">
          <p className="text-[var(--color-text-secondary)]">
            ¿Está seguro que desea eliminar este reporte?
          </p>
          {reportToDelete && (
            <div className="rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-elevated)] p-3">
              <p className="font-medium text-[var(--color-text-primary)]">
                {reportToDelete.name}
              </p>
              <p className="text-sm text-[var(--color-text-muted)]">
                {reportTypeLabels[reportToDelete.type]} • {reportToDelete.period}
              </p>
            </div>
          )}
          <p className="text-sm text-[var(--color-text-muted)]">
            Esta acción no se puede deshacer.
          </p>
        </div>
        <ModalFooter className="-mx-4 -mb-4 mt-4">
          <Button
            variant="ghost"
            onClick={() => {
              setShowDeleteModal(false);
              setReportToDelete(null);
            }}
          >
            Cancelar
          </Button>
          <Button
            variant="primary"
            className="bg-[var(--color-error)] hover:bg-[var(--color-error)]/90"
            onClick={handleDelete}
          >
            Eliminar
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}
