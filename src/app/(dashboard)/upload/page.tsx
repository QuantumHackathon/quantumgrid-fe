'use client';

import { useState, useCallback } from 'react';
import {
  Upload,
  FileSpreadsheet,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Trash2,
  Eye,
  RefreshCw,
} from 'lucide-react';
import { Button, Badge, Card, CardHeader, CardTitle, CardContent } from '@/components/ui';
import {
  DataTable,
  EmptyState,
  ProgressIndicator,
  StepProgress,
} from '@/components/shared';
import type { Column } from '@/components/shared';
import { mockUploadFiles } from '@/lib/mock-data';
import type { UploadFile, UploadStatus } from '@/types';
import { cn } from '@/lib/utils';

const uploadSteps = ['Seleccionar', 'Validar', 'Procesar', 'Completado'];

const statusConfig: Record<
  UploadStatus,
  { label: string; variant: 'default' | 'success' | 'warning' | 'error' | 'info'; icon: typeof CheckCircle }
> = {
  pending: { label: 'Pendiente', variant: 'default', icon: RefreshCw },
  uploading: { label: 'Subiendo', variant: 'info', icon: Upload },
  validating: { label: 'Validando', variant: 'warning', icon: AlertTriangle },
  processing: { label: 'Procesando', variant: 'info', icon: RefreshCw },
  completed: { label: 'Completado', variant: 'success', icon: CheckCircle },
  error: { label: 'Error', variant: 'error', icon: XCircle },
};

export default function UploadPage() {
  const [isDragging, setIsDragging] = useState(false);
  const [uploadingFiles, setUploadingFiles] = useState<
    Array<{ name: string; progress: number; status: UploadStatus }>
  >([]);
  const [currentStep, setCurrentStep] = useState(0);

  const simulateUpload = useCallback((files: File[]) => {
    if (files.length === 0) return;

    setCurrentStep(1);
    const newFiles = files.map((file) => ({
      name: file.name,
      progress: 0,
      status: 'uploading' as UploadStatus,
    }));
    setUploadingFiles(newFiles);

    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadingFiles((prev) =>
        prev.map((file) => {
          if (file.progress >= 100) {
            return { ...file, status: 'completed' as UploadStatus };
          }
          const newProgress = Math.min(file.progress + Math.random() * 20, 100);
          return {
            ...file,
            progress: newProgress,
            status: newProgress >= 100 ? 'validating' : 'uploading',
          };
        })
      );
    }, 300);

    setTimeout(() => {
      clearInterval(interval);
      setCurrentStep(2);
      setUploadingFiles((prev) =>
        prev.map((file) => ({ ...file, progress: 100, status: 'validating' }))
      );

      setTimeout(() => {
        setCurrentStep(3);
        setUploadingFiles((prev) =>
          prev.map((file) => ({ ...file, status: 'completed' }))
        );
      }, 1500);
    }, 3000);
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const files = Array.from(e.dataTransfer.files);
    simulateUpload(files);
  }, [simulateUpload]);

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files ? Array.from(e.target.files) : [];
    simulateUpload(files);
  }, [simulateUpload]);

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  const columns: Column<UploadFile>[] = [
    {
      key: 'name',
      header: 'Archivo',
      render: (_, row) => (
        <div className="flex items-center gap-3">
          <FileSpreadsheet className="h-5 w-5 text-[var(--color-primary)]" />
          <div>
            <p className="font-medium text-[var(--color-text-primary)]">{row.name}</p>
            <p className="text-xs text-[var(--color-text-muted)]">
              {formatFileSize(row.size)}
            </p>
          </div>
        </div>
      ),
    },
    {
      key: 'status',
      header: 'Estado',
      render: (_, row) => {
        const config = statusConfig[row.status];
        return (
          <Badge variant={config.variant}>
            {config.label}
          </Badge>
        );
      },
    },
    {
      key: 'uploadedAt',
      header: 'Fecha',
      render: (value) => new Date(value as string).toLocaleDateString('es-CR'),
    },
    {
      key: 'actions',
      header: '',
      align: 'right',
      render: (_, row) => (
        <div className="flex items-center gap-2">
          {row.status === 'completed' && (
            <Button variant="ghost" size="sm">
              <Eye className="h-4 w-4" />
            </Button>
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
      <div>
        <h1 className="text-2xl font-bold text-[var(--color-text-primary)]">
          Subir Datos
        </h1>
        <p className="text-sm text-[var(--color-text-muted)]">
          Importe archivos CSV o Excel con datos energéticos para análisis
        </p>
      </div>

      {/* Upload Progress Steps */}
      {uploadingFiles.length > 0 && (
        <Card>
          <CardContent className="p-6">
            <StepProgress steps={uploadSteps} currentStep={currentStep} />
          </CardContent>
        </Card>
      )}

      {/* Upload Zone */}
      <Card>
        <CardHeader>
          <CardTitle>Cargar archivos</CardTitle>
        </CardHeader>
        <CardContent>
          <div
            className={cn(
              'relative flex flex-col items-center justify-center rounded-lg border-2 border-dashed p-12 transition-colors',
              isDragging
                ? 'border-[var(--color-primary)] bg-[var(--color-primary-light)]'
                : 'border-[var(--color-border)] bg-[var(--color-neutral-50)]'
            )}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <input
              type="file"
              accept=".csv,.xlsx,.xls"
              multiple
              onChange={handleFileSelect}
              className="absolute inset-0 cursor-pointer opacity-0"
            />
            <div
              className={cn(
                'mb-4 flex h-14 w-14 items-center justify-center rounded-full transition-colors',
                isDragging
                  ? 'bg-[var(--color-primary)] text-white'
                  : 'bg-[var(--color-neutral-200)] text-[var(--color-text-muted)]'
              )}
            >
              <Upload className="h-7 w-7" />
            </div>
            <p className="mb-2 text-lg font-medium text-[var(--color-text-primary)]">
              {isDragging ? 'Suelte los archivos aquí' : 'Arrastre archivos aquí'}
            </p>
            <p className="mb-4 text-sm text-[var(--color-text-muted)]">
              o haga clic para seleccionar
            </p>
            <div className="flex items-center gap-4 text-xs text-[var(--color-text-muted)]">
              <span>Formatos: CSV, XLSX, XLS</span>
              <span>•</span>
              <span>Máximo: 50MB por archivo</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Currently Uploading */}
      {uploadingFiles.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Subiendo archivos</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {uploadingFiles.map((file, index) => {
              const config = statusConfig[file.status];
              const Icon = config.icon;
              return (
                <div
                  key={index}
                  className="flex items-center gap-4 rounded-lg bg-[var(--color-neutral-50)] p-4"
                >
                  <FileSpreadsheet className="h-8 w-8 text-[var(--color-primary)]" />
                  <div className="min-w-0 flex-1">
                    <div className="mb-1 flex items-center justify-between">
                      <p className="truncate font-medium text-[var(--color-text-primary)]">
                        {file.name}
                      </p>
                      <Badge variant={config.variant} size="sm">
                        <Icon className="mr-1 h-3 w-3" />
                        {config.label}
                      </Badge>
                    </div>
                    <ProgressIndicator
                      value={file.progress}
                      size="sm"
                      variant={
                        file.status === 'completed'
                          ? 'success'
                          : file.status === 'error'
                          ? 'error'
                          : 'default'
                      }
                    />
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>
      )}

      {/* Upload History */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Historial de cargas</CardTitle>
          <Button variant="ghost" size="sm">
            Ver todo
          </Button>
        </CardHeader>
        <CardContent className="p-0">
          {mockUploadFiles.length > 0 ? (
            <DataTable
              columns={columns}
              data={mockUploadFiles}
              keyExtractor={(row) => row.id}
              showPagination={false}
              className="border-0"
            />
          ) : (
            <EmptyState
              variant="upload"
              title="Sin archivos"
              description="Los archivos que cargue aparecerán aquí"
            />
          )}
        </CardContent>
      </Card>

      {/* Data Format Guide */}
      <Card>
        <CardHeader>
          <CardTitle>Formato de datos requerido</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-lg bg-[var(--color-neutral-50)] p-4">
              <h4 className="mb-2 font-medium text-[var(--color-text-primary)]">
                Datos de consumo
              </h4>
              <p className="text-sm text-[var(--color-text-muted)]">
                Columnas: fecha, hora, región, consumo_mw
              </p>
            </div>
            <div className="rounded-lg bg-[var(--color-neutral-50)] p-4">
              <h4 className="mb-2 font-medium text-[var(--color-text-primary)]">
                Datos de generación
              </h4>
              <p className="text-sm text-[var(--color-text-muted)]">
                Columnas: fecha, planta, tipo, generacion_mw
              </p>
            </div>
            <div className="rounded-lg bg-[var(--color-neutral-50)] p-4">
              <h4 className="mb-2 font-medium text-[var(--color-text-primary)]">
                Datos de infraestructura
              </h4>
              <p className="text-sm text-[var(--color-text-muted)]">
                Columnas: planta_id, capacidad, estado, mantenimiento
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
