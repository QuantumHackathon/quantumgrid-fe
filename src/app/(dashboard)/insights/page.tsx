'use client';

import { useState } from 'react';
import {
  Sparkles,
  Filter,
  CheckCircle,
  UserPlus,
  XCircle,
} from 'lucide-react';
import {
  Button,
  Select,
  Badge,
  Card,
  CardContent,
  Modal,
  ModalFooter,
} from '@/components/ui';
import { InsightCard, EmptyState } from '@/components/shared';
import { mockInsights } from '@/lib/mock-data';
import type { Insight, InsightCategory, Priority } from '@/types';

const categoryOptions = [
  { value: 'all', label: 'Todas las categorías' },
  { value: 'efficiency', label: 'Eficiencia' },
  { value: 'capacity', label: 'Capacidad' },
  { value: 'maintenance', label: 'Mantenimiento' },
  { value: 'cost', label: 'Costos' },
  { value: 'sustainability', label: 'Sostenibilidad' },
];

const priorityOptions = [
  { value: 'all', label: 'Todas las prioridades' },
  { value: 'high', label: 'Alta' },
  { value: 'medium', label: 'Media' },
  { value: 'low', label: 'Baja' },
];

const statusOptions = [
  { value: 'all', label: 'Todos los estados' },
  { value: 'new', label: 'Nuevos' },
  { value: 'viewed', label: 'Vistos' },
  { value: 'assigned', label: 'Asignados' },
  { value: 'dismissed', label: 'Descartados' },
];

const categoryLabels: Record<InsightCategory, string> = {
  efficiency: 'Eficiencia',
  capacity: 'Capacidad',
  maintenance: 'Mantenimiento',
  cost: 'Costos',
  sustainability: 'Sostenibilidad',
};

const priorityLabels: Record<Priority, string> = {
  high: 'Alta',
  medium: 'Media',
  low: 'Baja',
};

export default function InsightsPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedPriority, setSelectedPriority] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedInsight, setSelectedInsight] = useState<Insight | null>(null);

  const filteredInsights = mockInsights.filter((insight) => {
    if (selectedCategory !== 'all' && insight.category !== selectedCategory)
      return false;
    if (selectedPriority !== 'all' && insight.priority !== selectedPriority)
      return false;
    if (selectedStatus !== 'all' && insight.status !== selectedStatus)
      return false;
    return true;
  });

  const stats = {
    total: mockInsights.length,
    new: mockInsights.filter((i) => i.status === 'new').length,
    high: mockInsights.filter((i) => i.priority === 'high').length,
    potentialSavings: mockInsights
      .filter((i) => i.impactValue && i.category === 'efficiency')
      .reduce((sum, i) => sum + (i.impactValue || 0), 0),
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[var(--color-text-primary)]">
            Insights y Recomendaciones
          </h1>
          <p className="text-sm text-[var(--color-text-muted)]">
            Optimizaciones identificadas por el sistema de IA
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-[var(--color-accent)]" />
          <span className="text-sm font-medium text-[var(--color-text-secondary)]">
            Generado por IA
          </span>
        </div>
      </div>

      {/* Stats Summary */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-[var(--color-text-muted)]">
              Total de Insights
            </p>
            <p className="mt-1 text-2xl font-semibold text-[var(--color-text-primary)]">
              {stats.total}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-[var(--color-text-muted)]">Nuevos</p>
            <p className="mt-1 text-2xl font-semibold text-[var(--color-info)]">
              {stats.new}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-[var(--color-text-muted)]">
              Alta Prioridad
            </p>
            <p className="mt-1 text-2xl font-semibold text-[var(--color-error)]">
              {stats.high}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-[var(--color-text-muted)]">
              Ahorro Potencial
            </p>
            <p className="mt-1 text-2xl font-semibold text-[var(--color-success)]">
              ₡{(stats.potentialSavings / 1000000).toFixed(0)}M
            </p>
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
              options={categoryOptions}
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-48"
            />
            <Select
              options={priorityOptions}
              value={selectedPriority}
              onChange={(e) => setSelectedPriority(e.target.value)}
              className="w-40"
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

      {/* Insights List */}
      {filteredInsights.length > 0 ? (
        <div className="grid gap-4 lg:grid-cols-2">
          {filteredInsights.map((insight) => (
            <InsightCard
              key={insight.id}
              insight={insight}
              onClick={setSelectedInsight}
            />
          ))}
        </div>
      ) : (
        <EmptyState
          variant="search"
          title="Sin resultados"
          description="No se encontraron insights con los filtros seleccionados"
          action={{
            label: 'Limpiar filtros',
            onClick: () => {
              setSelectedCategory('all');
              setSelectedPriority('all');
              setSelectedStatus('all');
            },
          }}
        />
      )}

      {/* Insight Detail Modal */}
      <Modal
        isOpen={!!selectedInsight}
        onClose={() => setSelectedInsight(null)}
        title={selectedInsight?.title}
        size="lg"
      >
        {selectedInsight && (
          <>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Badge variant="info">
                  {categoryLabels[selectedInsight.category]}
                </Badge>
                <Badge
                  variant={
                    selectedInsight.priority === 'high'
                      ? 'error'
                      : selectedInsight.priority === 'medium'
                      ? 'warning'
                      : 'default'
                  }
                >
                  Prioridad: {priorityLabels[selectedInsight.priority]}
                </Badge>
              </div>

              <div>
                <h4 className="mb-2 font-medium text-[var(--color-text-primary)]">
                  Descripción
                </h4>
                <p className="text-sm text-[var(--color-text-secondary)]">
                  {selectedInsight.description}
                </p>
              </div>

              {selectedInsight.impact && (
                <div className="rounded-lg bg-[var(--color-success-light)] p-4">
                  <h4 className="mb-1 font-medium text-[var(--color-success-dark)]">
                    Impacto Estimado
                  </h4>
                  <p className="text-lg font-semibold text-[var(--color-success)]">
                    {selectedInsight.impact}
                  </p>
                </div>
              )}

              <div>
                <h4 className="mb-2 font-medium text-[var(--color-text-primary)]">
                  Recomendación
                </h4>
                <p className="text-sm text-[var(--color-text-secondary)]">
                  {selectedInsight.recommendation}
                </p>
              </div>

              <div className="text-xs text-[var(--color-text-muted)]">
                Generado:{' '}
                {new Date(selectedInsight.createdAt).toLocaleDateString('es-CR', {
                  dateStyle: 'long',
                })}
              </div>
            </div>

            <ModalFooter>
              <Button
                variant="ghost"
                leftIcon={<XCircle className="h-4 w-4" />}
                onClick={() => setSelectedInsight(null)}
              >
                Descartar
              </Button>
              <Button
                variant="outline"
                leftIcon={<UserPlus className="h-4 w-4" />}
              >
                Asignar
              </Button>
              <Button
                variant="primary"
                leftIcon={<CheckCircle className="h-4 w-4" />}
              >
                Implementar
              </Button>
            </ModalFooter>
          </>
        )}
      </Modal>
    </div>
  );
}
