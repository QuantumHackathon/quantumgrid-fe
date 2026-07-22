'use client';

import { useState } from 'react';
import {
  Droplets,
  Wind,
  Sun,
  Flame,
  Activity,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Wrench,
  MapPin,
  Zap,
} from 'lucide-react';
import {
  Select,
  Badge,
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from '@/components/ui';
import { DataTable, ChartWrapper } from '@/components/shared';
import type { Column } from '@/components/shared';
import { mockPlants, regions } from '@/lib/mock-data';
import type { Plant, PlantStatus } from '@/types';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

const plantTypeIcons = {
  hydro: Droplets,
  wind: Wind,
  solar: Sun,
  thermal: Flame,
};

const plantTypeLabels = {
  hydro: 'Hidroeléctrica',
  wind: 'Eólica',
  solar: 'Solar',
  thermal: 'Térmica',
};

const plantTypeColors = {
  hydro: '#006341',
  wind: '#1E3A5F',
  solar: '#C4A35A',
  thermal: '#DC2626',
};

const statusConfig: Record<
  PlantStatus,
  { label: string; variant: 'success' | 'error' | 'warning' | 'default'; icon: typeof CheckCircle }
> = {
  online: { label: 'En línea', variant: 'success', icon: CheckCircle },
  offline: { label: 'Fuera de línea', variant: 'error', icon: XCircle },
  maintenance: { label: 'Mantenimiento', variant: 'warning', icon: Wrench },
  warning: { label: 'Advertencia', variant: 'warning', icon: AlertTriangle },
};

const typeOptions = [
  { value: 'all', label: 'Todos los tipos' },
  { value: 'hydro', label: 'Hidroeléctrica' },
  { value: 'wind', label: 'Eólica' },
  { value: 'solar', label: 'Solar' },
  { value: 'thermal', label: 'Térmica' },
];

const statusOptions = [
  { value: 'all', label: 'Todos los estados' },
  { value: 'online', label: 'En línea' },
  { value: 'offline', label: 'Fuera de línea' },
  { value: 'maintenance', label: 'Mantenimiento' },
];

export default function InfrastructurePage() {
  const [selectedType, setSelectedType] = useState('all');
  const [selectedRegion, setSelectedRegion] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');

  const filteredPlants = mockPlants.filter((plant) => {
    if (selectedType !== 'all' && plant.type !== selectedType) return false;
    if (
      selectedRegion !== 'all' &&
      plant.region.toLowerCase().replace(/\s+/g, '-') !== selectedRegion
    )
      return false;
    if (selectedStatus !== 'all' && plant.status !== selectedStatus) return false;
    return true;
  });

  // Stats
  const totalCapacity = mockPlants.reduce((sum, p) => sum + p.capacity, 0);
  const currentOutput = mockPlants.reduce((sum, p) => sum + p.currentOutput, 0);
  const onlinePlants = mockPlants.filter((p) => p.status === 'online').length;
  const utilization = ((currentOutput / totalCapacity) * 100).toFixed(1);

  // Capacity by type for chart
  const capacityByType = Object.entries(
    mockPlants.reduce((acc, plant) => {
      acc[plant.type] = (acc[plant.type] || 0) + plant.capacity;
      return acc;
    }, {} as Record<string, number>)
  ).map(([type, capacity]) => ({
    name: plantTypeLabels[type as keyof typeof plantTypeLabels],
    value: capacity,
    color: plantTypeColors[type as keyof typeof plantTypeColors],
  }));

  const columns: Column<Plant>[] = [
    {
      key: 'name',
      header: 'Planta',
      render: (_, row) => {
        const Icon = plantTypeIcons[row.type];
        return (
          <div className="flex items-center gap-3">
            <div
              className="flex h-10 w-10 items-center justify-center rounded-lg"
              style={{ backgroundColor: `${plantTypeColors[row.type]}20` }}
            >
              <Icon
                className="h-5 w-5"
                style={{ color: plantTypeColors[row.type] }}
              />
            </div>
            <div>
              <p className="font-medium text-[var(--color-text-primary)]">
                {row.name}
              </p>
              <p className="text-xs text-[var(--color-text-muted)]">
                {plantTypeLabels[row.type]}
              </p>
            </div>
          </div>
        );
      },
    },
    {
      key: 'region',
      header: 'Región',
      render: (_, row) => (
        <div className="flex items-center gap-2">
          <MapPin className="h-4 w-4 text-[var(--color-text-muted)]" />
          <span>{row.region}</span>
        </div>
      ),
    },
    {
      key: 'capacity',
      header: 'Capacidad',
      align: 'right',
      render: (_, row) => `${row.capacity} MW`,
    },
    {
      key: 'currentOutput',
      header: 'Generación Actual',
      align: 'right',
      render: (_, row) => (
        <div className="text-right">
          <p className="font-medium">{row.currentOutput} MW</p>
          <p className="text-xs text-[var(--color-text-muted)]">
            {((row.currentOutput / row.capacity) * 100).toFixed(0)}% capacidad
          </p>
        </div>
      ),
    },
    {
      key: 'status',
      header: 'Estado',
      render: (_, row) => {
        const config = statusConfig[row.status];
        const Icon = config.icon;
        return (
          <Badge variant={config.variant}>
            <Icon className="mr-1 h-3 w-3" />
            {config.label}
          </Badge>
        );
      },
    },
    {
      key: 'lastMaintenance',
      header: 'Últ. Mantenimiento',
      render: (value) =>
        new Date(value as string).toLocaleDateString('es-CR', {
          day: 'numeric',
          month: 'short',
          year: 'numeric',
        }),
    },
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-[var(--color-text-primary)]">
          Infraestructura
        </h1>
        <p className="text-sm text-[var(--color-text-muted)]">
          Estado de la red eléctrica y plantas de generación
        </p>
      </div>

      {/* Grid Status */}
      <Card className="border-l-4 border-l-[var(--color-success)]">
        <CardContent className="p-4">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--color-success-light)]">
              <Activity className="h-6 w-6 text-[var(--color-success)]" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h3 className="font-semibold text-[var(--color-text-primary)]">
                  Estado de la Red
                </h3>
                <Badge variant="success">Normal</Badge>
              </div>
              <p className="text-sm text-[var(--color-text-muted)]">
                Frecuencia: 60.00 Hz | Voltaje: 138 kV | Carga: {utilization}%
              </p>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-[var(--color-text-primary)]">
                {currentOutput.toLocaleString()} MW
              </p>
              <p className="text-sm text-[var(--color-text-muted)]">
                de {totalCapacity.toLocaleString()} MW instalados
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats and Chart */}
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="grid gap-4 sm:grid-cols-2 lg:col-span-2 lg:grid-cols-4">
          <Card>
            <CardContent className="p-4">
              <Zap className="mb-2 h-5 w-5 text-[var(--color-primary)]" />
              <p className="text-sm text-[var(--color-text-muted)]">
                Plantas Totales
              </p>
              <p className="text-2xl font-semibold text-[var(--color-text-primary)]">
                {mockPlants.length}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <CheckCircle className="mb-2 h-5 w-5 text-[var(--color-success)]" />
              <p className="text-sm text-[var(--color-text-muted)]">En Línea</p>
              <p className="text-2xl font-semibold text-[var(--color-success)]">
                {onlinePlants}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <Activity className="mb-2 h-5 w-5 text-[var(--color-info)]" />
              <p className="text-sm text-[var(--color-text-muted)]">
                Utilización
              </p>
              <p className="text-2xl font-semibold text-[var(--color-text-primary)]">
                {utilization}%
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <Wrench className="mb-2 h-5 w-5 text-[var(--color-warning)]" />
              <p className="text-sm text-[var(--color-text-muted)]">
                En Mantenimiento
              </p>
              <p className="text-2xl font-semibold text-[var(--color-warning)]">
                {mockPlants.filter((p) => p.status === 'maintenance').length}
              </p>
            </CardContent>
          </Card>
        </div>

        <ChartWrapper title="Capacidad por Tipo" height={200}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={capacityByType}
                cx="50%"
                cy="50%"
                innerRadius={40}
                outerRadius={70}
                paddingAngle={2}
                dataKey="value"
              >
                {capacityByType.map((entry, index) => (
                  <Cell key={index} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                formatter={(value) => [`${value} MW`, 'Capacidad']}
              />
            </PieChart>
          </ResponsiveContainer>
        </ChartWrapper>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-wrap items-center gap-4">
            <span className="text-sm font-medium text-[var(--color-text-secondary)]">
              Filtros:
            </span>
            <Select
              options={typeOptions}
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="w-44"
            />
            <Select
              options={regions}
              value={selectedRegion}
              onChange={(e) => setSelectedRegion(e.target.value)}
              className="w-44"
            />
            <Select
              options={statusOptions}
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-44"
            />
          </div>
        </CardContent>
      </Card>

      {/* Plants Table */}
      <Card>
        <CardHeader>
          <CardTitle>Plantas de Generación</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <DataTable
            columns={columns}
            data={filteredPlants}
            keyExtractor={(row) => row.id}
            className="border-0"
          />
        </CardContent>
      </Card>
    </div>
  );
}
