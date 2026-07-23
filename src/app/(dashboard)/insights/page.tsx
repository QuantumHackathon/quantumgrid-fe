'use client';

import { useState, useMemo } from 'react';
import {
  Sparkles,
  Filter,
  CheckCircle,
  UserPlus,
  XCircle,
  RefreshCw,
  TrendingUp,
  AlertTriangle,
  Clock,
  X,
  Check,
  Users,
} from 'lucide-react';
import {
  Button,
  Select,
  Badge,
  Card,
  CardContent,
  Modal,
  ModalFooter,
  Alert,
} from '@/components/ui';
import { InsightCard, EmptyState } from '@/components/shared';
import { mockInsights as initialInsights } from '@/lib/mock-data';
import { cn } from '@/lib/utils';
import type { Insight, InsightCategory, Priority, InsightStatus } from '@/types';

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
  { value: 'implemented', label: 'Implementados' },
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

const statusLabels: Record<InsightStatus, string> = {
  new: 'Nuevo',
  viewed: 'Visto',
  assigned: 'Asignado',
  implemented: 'Implementado',
  dismissed: 'Descartado',
};

const teamMembers = [
  { id: '1', name: 'Carlos Méndez', role: 'Administrador' },
  { id: '2', name: 'María González', role: 'Analista' },
  { id: '3', name: 'José Rodríguez', role: 'Ingeniero' },
  { id: '4', name: 'Ana Vargas', role: 'Supervisora' },
];

export default function InsightsPage() {
  const [insights, setInsights] = useState<Insight[]>(initialInsights);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedPriority, setSelectedPriority] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedInsight, setSelectedInsight] = useState<Insight | null>(null);
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [selectedAssignee, setSelectedAssignee] = useState<string | null>(null);
  const [actionFeedback, setActionFeedback] = useState<{ type: 'success' | 'info'; message: string } | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const filteredInsights = useMemo(() => {
    return insights.filter((insight) => {
      if (selectedCategory !== 'all' && insight.category !== selectedCategory)
        return false;
      if (selectedPriority !== 'all' && insight.priority !== selectedPriority)
        return false;
      if (selectedStatus !== 'all' && insight.status !== selectedStatus)
        return false;
      return true;
    });
  }, [insights, selectedCategory, selectedPriority, selectedStatus]);

  const stats = useMemo(() => ({
    total: insights.length,
    new: insights.filter((i) => i.status === 'new').length,
    high: insights.filter((i) => i.priority === 'high' && i.status !== 'dismissed' && i.status !== 'implemented').length,
    implemented: insights.filter((i) => i.status === 'implemented').length,
    potentialSavings: insights
      .filter((i) => i.impactValue && i.status !== 'dismissed' && i.status !== 'implemented')
      .reduce((sum, i) => sum + (i.impactValue || 0), 0),
  }), [insights]);

  const showFeedback = (type: 'success' | 'info', message: string) => {
    setActionFeedback({ type, message });
    setTimeout(() => setActionFeedback(null), 3000);
  };

  const updateInsightStatus = (insightId: string, newStatus: InsightStatus, assignee?: string) => {
    setInsights(prev => prev.map(insight =>
      insight.id === insightId
        ? { ...insight, status: newStatus, assignedTo: assignee }
        : insight
    ));
  };

  const handleDismiss = () => {
    if (!selectedInsight) return;
    updateInsightStatus(selectedInsight.id, 'dismissed');
    showFeedback('info', 'Insight descartado');
    setSelectedInsight(null);
  };

  const handleImplement = () => {
    if (!selectedInsight) return;
    updateInsightStatus(selectedInsight.id, 'implemented');
    showFeedback('success', 'Insight marcado como implementado');
    setSelectedInsight(null);
  };

  const handleAssign = () => {
    if (!selectedInsight || !selectedAssignee) return;
    const assignee = teamMembers.find(m => m.id === selectedAssignee);
    updateInsightStatus(selectedInsight.id, 'assigned', assignee?.name);
    showFeedback('success', `Insight asignado a ${assignee?.name}`);
    setShowAssignModal(false);
    setSelectedAssignee(null);
    setSelectedInsight(null);
  };

  const handleOpenInsight = (insight: Insight) => {
    // Mark as viewed if new
    if (insight.status === 'new') {
      updateInsightStatus(insight.id, 'viewed');
    }
    setSelectedInsight(insight);
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      showFeedback('success', 'Insights actualizados');
    }, 1500);
  };

  const clearFilters = () => {
    setSelectedCategory('all');
    setSelectedPriority('all');
    setSelectedStatus('all');
  };

  const hasActiveFilters = selectedCategory !== 'all' || selectedPriority !== 'all' || selectedStatus !== 'all';

  return (
    <div className="space-y-4 lg:space-y-6">
      {/* Feedback Alert */}
      {actionFeedback && (
        <div className="fixed right-4 top-20 z-50 animate-in slide-in-from-right">
          <Alert
            variant={actionFeedback.type === 'success' ? 'success' : 'info'}
            title={actionFeedback.message}
            dismissible
            onDismiss={() => setActionFeedback(null)}
          />
        </div>
      )}

      {/* Page Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl font-bold text-[var(--color-text-primary)] lg:text-2xl">
            Insights y Recomendaciones
          </h1>
          <p className="text-xs text-[var(--color-text-muted)] lg:text-sm">
            Optimizaciones identificadas por el sistema de IA
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 rounded-lg bg-[var(--color-surface-elevated)] px-3 py-1.5">
            <Sparkles className="h-4 w-4 text-[var(--color-accent)]" />
            <span className="text-xs font-medium text-[var(--color-text-secondary)] lg:text-sm">
              Generado por IA
            </span>
          </div>
          <Button
            variant="outline"
            size="sm"
            leftIcon={<RefreshCw className={cn('h-4 w-4', isRefreshing && 'animate-spin')} />}
            onClick={handleRefresh}
            disabled={isRefreshing}
          >
            <span className="hidden sm:inline">Actualizar</span>
          </Button>
        </div>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-5 lg:gap-4">
        <Card>
          <CardContent className="p-3 lg:p-4">
            <div className="flex items-center gap-2">
              <div className="rounded-lg bg-[var(--color-primary)]/10 p-2">
                <Sparkles className="h-4 w-4 text-[var(--color-primary)]" />
              </div>
              <div>
                <p className="text-xs text-[var(--color-text-muted)]">Total</p>
                <p className="text-lg font-semibold text-[var(--color-text-primary)] lg:text-xl">
                  {stats.total}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-3 lg:p-4">
            <div className="flex items-center gap-2">
              <div className="rounded-lg bg-[var(--color-info)]/10 p-2">
                <Clock className="h-4 w-4 text-[var(--color-info)]" />
              </div>
              <div>
                <p className="text-xs text-[var(--color-text-muted)]">Nuevos</p>
                <p className="text-lg font-semibold text-[var(--color-info)] lg:text-xl">
                  {stats.new}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-3 lg:p-4">
            <div className="flex items-center gap-2">
              <div className="rounded-lg bg-[var(--color-error)]/10 p-2">
                <AlertTriangle className="h-4 w-4 text-[var(--color-error)]" />
              </div>
              <div>
                <p className="text-xs text-[var(--color-text-muted)]">Urgentes</p>
                <p className="text-lg font-semibold text-[var(--color-error)] lg:text-xl">
                  {stats.high}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-3 lg:p-4">
            <div className="flex items-center gap-2">
              <div className="rounded-lg bg-[var(--color-success)]/10 p-2">
                <CheckCircle className="h-4 w-4 text-[var(--color-success)]" />
              </div>
              <div>
                <p className="text-xs text-[var(--color-text-muted)]">Implementados</p>
                <p className="text-lg font-semibold text-[var(--color-success)] lg:text-xl">
                  {stats.implemented}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="col-span-2 lg:col-span-1">
          <CardContent className="p-3 lg:p-4">
            <div className="flex items-center gap-2">
              <div className="rounded-lg bg-[var(--color-success)]/10 p-2">
                <TrendingUp className="h-4 w-4 text-[var(--color-success)]" />
              </div>
              <div>
                <p className="text-xs text-[var(--color-text-muted)]">Ahorro Potencial</p>
                <p className="text-lg font-semibold text-[var(--color-success)] lg:text-xl">
                  ₡{(stats.potentialSavings / 1000000).toFixed(1)}M
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
                options={categoryOptions}
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="flex-1 min-w-[140px] lg:flex-none lg:w-48"
              />
              <Select
                options={priorityOptions}
                value={selectedPriority}
                onChange={(e) => setSelectedPriority(e.target.value)}
                className="flex-1 min-w-[120px] lg:flex-none lg:w-40"
              />
              <Select
                options={statusOptions}
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="flex-1 min-w-[120px] lg:flex-none lg:w-40"
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
            <div className="text-xs text-[var(--color-text-muted)] lg:text-sm">
              {filteredInsights.length} de {insights.length} insights
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Insights List */}
      {filteredInsights.length > 0 ? (
        <div className="grid gap-3 lg:grid-cols-2 lg:gap-4">
          {filteredInsights.map((insight) => (
            <div key={insight.id} className="relative">
              <InsightCard
                insight={insight}
                onClick={() => handleOpenInsight(insight)}
              />
              {insight.status === 'implemented' && (
                <div className="absolute right-3 top-3">
                  <Badge variant="success" size="sm">
                    <Check className="mr-1 h-3 w-3" />
                    Implementado
                  </Badge>
                </div>
              )}
              {insight.status === 'assigned' && insight.assignedTo && (
                <div className="absolute right-3 top-3">
                  <Badge variant="info" size="sm">
                    <Users className="mr-1 h-3 w-3" />
                    {insight.assignedTo}
                  </Badge>
                </div>
              )}
              {insight.status === 'dismissed' && (
                <div className="absolute inset-0 flex items-center justify-center rounded-lg bg-[var(--color-surface)]/80">
                  <Badge variant="default">Descartado</Badge>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <EmptyState
          variant="search"
          title="Sin resultados"
          description="No se encontraron insights con los filtros seleccionados"
          action={{
            label: 'Limpiar filtros',
            onClick: clearFilters,
          }}
        />
      )}

      {/* Insight Detail Modal */}
      <Modal
        isOpen={!!selectedInsight && !showAssignModal}
        onClose={() => setSelectedInsight(null)}
        title={selectedInsight?.title}
        size="lg"
      >
        {selectedInsight && (
          <>
            <div className="space-y-4">
              <div className="flex flex-wrap items-center gap-2">
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
                <Badge
                  variant={
                    selectedInsight.status === 'implemented' ? 'success' :
                    selectedInsight.status === 'assigned' ? 'info' :
                    selectedInsight.status === 'dismissed' ? 'default' : 'warning'
                  }
                >
                  {statusLabels[selectedInsight.status]}
                </Badge>
              </div>

              {selectedInsight.assignedTo && (
                <div className="flex items-center gap-2 rounded-lg bg-[var(--color-surface-elevated)] p-3">
                  <Users className="h-4 w-4 text-[var(--color-text-muted)]" />
                  <span className="text-sm text-[var(--color-text-secondary)]">
                    Asignado a: <strong>{selectedInsight.assignedTo}</strong>
                  </span>
                </div>
              )}

              <div>
                <h4 className="mb-2 font-medium text-[var(--color-text-primary)]">
                  Descripción
                </h4>
                <p className="text-sm text-[var(--color-text-secondary)]">
                  {selectedInsight.description}
                </p>
              </div>

              {selectedInsight.impact && (
                <div className="rounded-lg bg-[var(--color-success)]/10 p-4">
                  <h4 className="mb-1 font-medium text-[var(--color-success)]">
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

            <ModalFooter className="-mx-4 -mb-4 mt-4">
              {selectedInsight.status !== 'dismissed' && selectedInsight.status !== 'implemented' && (
                <>
                  <Button
                    variant="ghost"
                    leftIcon={<XCircle className="h-4 w-4" />}
                    onClick={handleDismiss}
                    className="text-[var(--color-error)]"
                  >
                    Descartar
                  </Button>
                  <Button
                    variant="outline"
                    leftIcon={<UserPlus className="h-4 w-4" />}
                    onClick={() => setShowAssignModal(true)}
                  >
                    Asignar
                  </Button>
                  <Button
                    variant="primary"
                    leftIcon={<CheckCircle className="h-4 w-4" />}
                    onClick={handleImplement}
                  >
                    Implementar
                  </Button>
                </>
              )}
              {(selectedInsight.status === 'dismissed' || selectedInsight.status === 'implemented') && (
                <Button variant="outline" onClick={() => setSelectedInsight(null)}>
                  Cerrar
                </Button>
              )}
            </ModalFooter>
          </>
        )}
      </Modal>

      {/* Assign Modal */}
      <Modal
        isOpen={showAssignModal}
        onClose={() => {
          setShowAssignModal(false);
          setSelectedAssignee(null);
        }}
        title="Asignar Insight"
        description="Seleccione un miembro del equipo para asignar este insight"
        size="sm"
      >
        <div className="space-y-2">
          {teamMembers.map((member) => (
            <button
              key={member.id}
              onClick={() => setSelectedAssignee(member.id)}
              className={cn(
                'flex w-full items-center gap-3 rounded-lg border p-3 text-left transition-colors',
                selectedAssignee === member.id
                  ? 'border-[var(--color-primary)] bg-[var(--color-primary)]/10'
                  : 'border-[var(--color-border)] hover:bg-[var(--color-surface-elevated)]'
              )}
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--color-primary)] text-white">
                <span className="text-sm font-medium">
                  {member.name.split(' ').map(n => n[0]).join('')}
                </span>
              </div>
              <div>
                <p className="font-medium text-[var(--color-text-primary)]">{member.name}</p>
                <p className="text-xs text-[var(--color-text-muted)]">{member.role}</p>
              </div>
              {selectedAssignee === member.id && (
                <Check className="ml-auto h-5 w-5 text-[var(--color-primary)]" />
              )}
            </button>
          ))}
        </div>
        <ModalFooter className="-mx-4 -mb-4 mt-4">
          <Button
            variant="ghost"
            onClick={() => {
              setShowAssignModal(false);
              setSelectedAssignee(null);
            }}
          >
            Cancelar
          </Button>
          <Button
            variant="primary"
            onClick={handleAssign}
            disabled={!selectedAssignee}
          >
            Asignar
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}
