'use client';

import { useState } from 'react';
import {
  User,
  Bell,
  Shield,
  Palette,
  Globe,
  Mail,
  Phone,
  Building,
  Save,
  Key,
  Eye,
  EyeOff,
  CheckCircle,
  Monitor,
  Moon,
  Sun,
} from 'lucide-react';
import {
  Button,
  Input,
  Select,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  Badge,
} from '@/components/ui';

type TabId = 'profile' | 'notifications' | 'security' | 'appearance';

const tabs: { id: TabId; label: string; icon: typeof User }[] = [
  { id: 'profile', label: 'Perfil', icon: User },
  { id: 'notifications', label: 'Notificaciones', icon: Bell },
  { id: 'security', label: 'Seguridad', icon: Shield },
  { id: 'appearance', label: 'Apariencia', icon: Palette },
];

const timezoneOptions = [
  { value: 'America/Costa_Rica', label: 'Costa Rica (GMT-6)' },
  { value: 'America/Panama', label: 'Panamá (GMT-5)' },
  { value: 'America/Bogota', label: 'Colombia (GMT-5)' },
  { value: 'America/Mexico_City', label: 'México (GMT-6)' },
];

const languageOptions = [
  { value: 'es', label: 'Español' },
  { value: 'en', label: 'English' },
];

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<TabId>('profile');
  const [showPassword, setShowPassword] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Form states
  const [profile, setProfile] = useState({
    name: 'Carlos Rodríguez',
    email: 'carlos.rodriguez@ice.go.cr',
    phone: '+506 2220-1234',
    department: 'Operaciones',
    role: 'Analista Senior',
  });

  const [notifications, setNotifications] = useState({
    emailAlerts: true,
    smsAlerts: false,
    dailyDigest: true,
    weeklyReport: true,
    criticalOnly: false,
    maintenanceNotices: true,
  });

  const [appearance, setAppearance] = useState({
    theme: 'system',
    language: 'es',
    timezone: 'America/Costa_Rica',
    compactMode: false,
  });

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => setIsSaving(false), 1500);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[var(--color-text-primary)]">
            Configuración
          </h1>
          <p className="text-sm text-[var(--color-text-muted)]">
            Administre su perfil y preferencias del sistema
          </p>
        </div>
        <Button
          variant="primary"
          leftIcon={<Save className="h-4 w-4" />}
          onClick={handleSave}
          isLoading={isSaving}
        >
          Guardar Cambios
        </Button>
      </div>

      <div className="grid gap-6 lg:grid-cols-4">
        {/* Sidebar Navigation */}
        <Card className="lg:col-span-1">
          <CardContent className="p-2">
            <nav className="space-y-1">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm font-medium transition-colors ${
                      isActive
                        ? 'bg-[var(--color-primary)] text-white'
                        : 'text-[var(--color-text-secondary)] hover:bg-[var(--color-neutral-100)]'
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    {tab.label}
                  </button>
                );
              })}
            </nav>
          </CardContent>
        </Card>

        {/* Main Content */}
        <div className="lg:col-span-3">
          {/* Profile Tab */}
          {activeTab === 'profile' && (
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Información Personal</CardTitle>
                  <CardDescription>
                    Actualice su información de perfil y datos de contacto
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[var(--color-primary)]">
                      <span className="text-2xl font-bold text-white">CR</span>
                    </div>
                    <div>
                      <Button variant="outline" size="sm">
                        Cambiar foto
                      </Button>
                      <p className="mt-1 text-xs text-[var(--color-text-muted)]">
                        JPG, PNG o GIF. Máximo 2MB.
                      </p>
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <Input
                      label="Nombre completo"
                      value={profile.name}
                      onChange={(e) =>
                        setProfile({ ...profile, name: e.target.value })
                      }
                      leftIcon={<User className="h-4 w-4" />}
                    />
                    <Input
                      label="Correo electrónico"
                      type="email"
                      value={profile.email}
                      onChange={(e) =>
                        setProfile({ ...profile, email: e.target.value })
                      }
                      leftIcon={<Mail className="h-4 w-4" />}
                    />
                    <Input
                      label="Teléfono"
                      value={profile.phone}
                      onChange={(e) =>
                        setProfile({ ...profile, phone: e.target.value })
                      }
                      leftIcon={<Phone className="h-4 w-4" />}
                    />
                    <Input
                      label="Departamento"
                      value={profile.department}
                      onChange={(e) =>
                        setProfile({ ...profile, department: e.target.value })
                      }
                      leftIcon={<Building className="h-4 w-4" />}
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Rol y Permisos</CardTitle>
                  <CardDescription>
                    Información sobre su rol en el sistema
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between rounded-lg bg-[var(--color-neutral-50)] p-4">
                    <div>
                      <p className="font-medium text-[var(--color-text-primary)]">
                        {profile.role}
                      </p>
                      <p className="text-sm text-[var(--color-text-muted)]">
                        Acceso a: Dashboard, Análisis, Reportes, Infraestructura
                      </p>
                    </div>
                    <Badge variant="info">Activo</Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Notifications Tab */}
          {activeTab === 'notifications' && (
            <Card>
              <CardHeader>
                <CardTitle>Preferencias de Notificaciones</CardTitle>
                <CardDescription>
                  Configure cómo y cuándo desea recibir notificaciones
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h4 className="font-medium text-[var(--color-text-primary)]">
                    Canales de Notificación
                  </h4>

                  <ToggleOption
                    label="Alertas por correo electrónico"
                    description="Reciba alertas importantes en su correo"
                    checked={notifications.emailAlerts}
                    onChange={(checked) =>
                      setNotifications({ ...notifications, emailAlerts: checked })
                    }
                  />

                  <ToggleOption
                    label="Alertas por SMS"
                    description="Reciba alertas críticas por mensaje de texto"
                    checked={notifications.smsAlerts}
                    onChange={(checked) =>
                      setNotifications({ ...notifications, smsAlerts: checked })
                    }
                  />
                </div>

                <div className="border-t border-[var(--color-border)] pt-6">
                  <h4 className="mb-4 font-medium text-[var(--color-text-primary)]">
                    Frecuencia de Reportes
                  </h4>

                  <ToggleOption
                    label="Resumen diario"
                    description="Reciba un resumen diario de la actividad del sistema"
                    checked={notifications.dailyDigest}
                    onChange={(checked) =>
                      setNotifications({ ...notifications, dailyDigest: checked })
                    }
                  />

                  <ToggleOption
                    label="Reporte semanal"
                    description="Reciba un reporte semanal con métricas clave"
                    checked={notifications.weeklyReport}
                    onChange={(checked) =>
                      setNotifications({ ...notifications, weeklyReport: checked })
                    }
                  />
                </div>

                <div className="border-t border-[var(--color-border)] pt-6">
                  <h4 className="mb-4 font-medium text-[var(--color-text-primary)]">
                    Tipos de Alertas
                  </h4>

                  <ToggleOption
                    label="Solo alertas críticas"
                    description="Reciba únicamente alertas de prioridad alta"
                    checked={notifications.criticalOnly}
                    onChange={(checked) =>
                      setNotifications({ ...notifications, criticalOnly: checked })
                    }
                  />

                  <ToggleOption
                    label="Avisos de mantenimiento"
                    description="Reciba notificaciones sobre mantenimientos programados"
                    checked={notifications.maintenanceNotices}
                    onChange={(checked) =>
                      setNotifications({ ...notifications, maintenanceNotices: checked })
                    }
                  />
                </div>
              </CardContent>
            </Card>
          )}

          {/* Security Tab */}
          {activeTab === 'security' && (
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Cambiar Contraseña</CardTitle>
                  <CardDescription>
                    Actualice su contraseña periódicamente para mayor seguridad
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Input
                    label="Contraseña actual"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    leftIcon={<Key className="h-4 w-4" />}
                    rightIcon={
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)]"
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </button>
                    }
                  />
                  <Input
                    label="Nueva contraseña"
                    type="password"
                    placeholder="••••••••"
                    leftIcon={<Key className="h-4 w-4" />}
                    helperText="Mínimo 8 caracteres, incluya mayúsculas, números y símbolos"
                  />
                  <Input
                    label="Confirmar nueva contraseña"
                    type="password"
                    placeholder="••••••••"
                    leftIcon={<Key className="h-4 w-4" />}
                  />
                  <Button variant="primary">Actualizar Contraseña</Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Autenticación de Dos Factores</CardTitle>
                  <CardDescription>
                    Añada una capa adicional de seguridad a su cuenta
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between rounded-lg bg-[var(--color-success-light)] p-4">
                    <div className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-[var(--color-success)]" />
                      <div>
                        <p className="font-medium text-[var(--color-text-primary)]">
                          2FA Habilitado
                        </p>
                        <p className="text-sm text-[var(--color-text-muted)]">
                          Usando aplicación autenticadora
                        </p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      Configurar
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Sesiones Activas</CardTitle>
                  <CardDescription>
                    Administre los dispositivos conectados a su cuenta
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <SessionItem
                    device="MacBook Pro"
                    location="San José, Costa Rica"
                    lastActive="Ahora mismo"
                    current
                  />
                  <SessionItem
                    device="iPhone 14"
                    location="San José, Costa Rica"
                    lastActive="Hace 2 horas"
                  />
                  <SessionItem
                    device="Windows PC"
                    location="Heredia, Costa Rica"
                    lastActive="Hace 3 días"
                  />
                </CardContent>
              </Card>
            </div>
          )}

          {/* Appearance Tab */}
          {activeTab === 'appearance' && (
            <Card>
              <CardHeader>
                <CardTitle>Preferencias de Apariencia</CardTitle>
                <CardDescription>
                  Personalice la apariencia del sistema según sus preferencias
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <label className="mb-3 block text-sm font-medium text-[var(--color-text-primary)]">
                    Tema
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    <ThemeOption
                      icon={Sun}
                      label="Claro"
                      selected={appearance.theme === 'light'}
                      onClick={() => setAppearance({ ...appearance, theme: 'light' })}
                    />
                    <ThemeOption
                      icon={Moon}
                      label="Oscuro"
                      selected={appearance.theme === 'dark'}
                      onClick={() => setAppearance({ ...appearance, theme: 'dark' })}
                    />
                    <ThemeOption
                      icon={Monitor}
                      label="Sistema"
                      selected={appearance.theme === 'system'}
                      onClick={() => setAppearance({ ...appearance, theme: 'system' })}
                    />
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-[var(--color-text-primary)]">
                      Idioma
                    </label>
                    <Select
                      options={languageOptions}
                      value={appearance.language}
                      onChange={(e) =>
                        setAppearance({ ...appearance, language: e.target.value })
                      }
                      leftIcon={<Globe className="h-4 w-4" />}
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-[var(--color-text-primary)]">
                      Zona horaria
                    </label>
                    <Select
                      options={timezoneOptions}
                      value={appearance.timezone}
                      onChange={(e) =>
                        setAppearance({ ...appearance, timezone: e.target.value })
                      }
                    />
                  </div>
                </div>

                <div className="border-t border-[var(--color-border)] pt-6">
                  <ToggleOption
                    label="Modo compacto"
                    description="Reduce el espaciado para mostrar más información"
                    checked={appearance.compactMode}
                    onChange={(checked) =>
                      setAppearance({ ...appearance, compactMode: checked })
                    }
                  />
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}

// Toggle Option Component
function ToggleOption({
  label,
  description,
  checked,
  onChange,
}: {
  label: string;
  description: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}) {
  return (
    <div className="flex items-center justify-between py-2">
      <div>
        <p className="font-medium text-[var(--color-text-primary)]">{label}</p>
        <p className="text-sm text-[var(--color-text-muted)]">{description}</p>
      </div>
      <button
        type="button"
        onClick={() => onChange(!checked)}
        className={`relative h-6 w-11 rounded-full transition-colors ${
          checked ? 'bg-[var(--color-primary)]' : 'bg-[var(--color-neutral-300)]'
        }`}
      >
        <span
          className={`absolute left-0.5 top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${
            checked ? 'translate-x-5' : 'translate-x-0'
          }`}
        />
      </button>
    </div>
  );
}

// Theme Option Component
function ThemeOption({
  icon: Icon,
  label,
  selected,
  onClick,
}: {
  icon: typeof Sun;
  label: string;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex flex-col items-center gap-2 rounded-lg border p-4 transition-all ${
        selected
          ? 'border-[var(--color-primary)] bg-[var(--color-primary-light)]'
          : 'border-[var(--color-border)] hover:border-[var(--color-primary)]'
      }`}
    >
      <Icon
        className={`h-6 w-6 ${
          selected ? 'text-[var(--color-primary)]' : 'text-[var(--color-text-muted)]'
        }`}
      />
      <span
        className={`text-sm font-medium ${
          selected ? 'text-[var(--color-primary)]' : 'text-[var(--color-text-secondary)]'
        }`}
      >
        {label}
      </span>
    </button>
  );
}

// Session Item Component
function SessionItem({
  device,
  location,
  lastActive,
  current,
}: {
  device: string;
  location: string;
  lastActive: string;
  current?: boolean;
}) {
  return (
    <div className="flex items-center justify-between rounded-lg border border-[var(--color-border)] p-4">
      <div className="flex items-center gap-3">
        <Monitor className="h-5 w-5 text-[var(--color-text-muted)]" />
        <div>
          <div className="flex items-center gap-2">
            <p className="font-medium text-[var(--color-text-primary)]">{device}</p>
            {current && (
              <Badge variant="success" size="sm">
                Actual
              </Badge>
            )}
          </div>
          <p className="text-sm text-[var(--color-text-muted)]">
            {location} • {lastActive}
          </p>
        </div>
      </div>
      {!current && (
        <Button variant="ghost" size="sm" className="text-[var(--color-error)]">
          Cerrar sesión
        </Button>
      )}
    </div>
  );
}
