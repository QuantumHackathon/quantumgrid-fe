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
  Smartphone,
  Laptop,
  X,
  Check,
  AlertCircle,
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
  Alert,
} from '@/components/ui';
import { cn } from '@/lib/utils';

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

type Session = {
  id: string;
  device: string;
  deviceType: 'desktop' | 'mobile' | 'tablet';
  location: string;
  lastActive: string;
  current: boolean;
};

const initialSessions: Session[] = [
  { id: '1', device: 'MacBook Pro', deviceType: 'desktop', location: 'San José, Costa Rica', lastActive: 'Ahora mismo', current: true },
  { id: '2', device: 'iPhone 14', deviceType: 'mobile', location: 'San José, Costa Rica', lastActive: 'Hace 2 horas', current: false },
  { id: '3', device: 'Windows PC', deviceType: 'desktop', location: 'Heredia, Costa Rica', lastActive: 'Hace 3 días', current: false },
];

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<TabId>('profile');
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [sessions, setSessions] = useState<Session[]>(initialSessions);

  // Password states
  const [passwordForm, setPasswordForm] = useState({
    current: '',
    new: '',
    confirm: '',
  });
  const [passwordError, setPasswordError] = useState('');
  const [passwordSuccess, setPasswordSuccess] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);

  // Form states
  const [profile, setProfile] = useState({
    name: 'Carlos Méndez',
    email: 'carlos.mendez@ice.go.cr',
    phone: '+506 2220-1234',
    department: 'Operaciones',
    role: 'Administrador',
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
    theme: 'dark',
    language: 'es',
    timezone: 'America/Costa_Rica',
    compactMode: false,
  });

  const [twoFactorEnabled, setTwoFactorEnabled] = useState(true);

  const handleSave = () => {
    setIsSaving(true);
    setSaveSuccess(false);
    setTimeout(() => {
      setIsSaving(false);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    }, 1000);
  };

  const handlePasswordChange = () => {
    setPasswordError('');
    setPasswordSuccess(false);

    if (!passwordForm.current) {
      setPasswordError('Ingrese su contraseña actual');
      return;
    }
    if (passwordForm.new.length < 8) {
      setPasswordError('La nueva contraseña debe tener al menos 8 caracteres');
      return;
    }
    if (passwordForm.new !== passwordForm.confirm) {
      setPasswordError('Las contraseñas no coinciden');
      return;
    }

    setIsChangingPassword(true);
    setTimeout(() => {
      setIsChangingPassword(false);
      setPasswordSuccess(true);
      setPasswordForm({ current: '', new: '', confirm: '' });
      setTimeout(() => setPasswordSuccess(false), 3000);
    }, 1500);
  };

  const handleCloseSession = (sessionId: string) => {
    setSessions(sessions.filter(s => s.id !== sessionId));
  };

  const handleCloseAllSessions = () => {
    setSessions(sessions.filter(s => s.current));
  };

  const getDeviceIcon = (type: string) => {
    switch (type) {
      case 'mobile': return Smartphone;
      case 'tablet': return Monitor;
      default: return Laptop;
    }
  };

  return (
    <div className="space-y-4 lg:space-y-6">
      {/* Page Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl font-bold text-[var(--color-text-primary)] lg:text-2xl">
            Configuración
          </h1>
          <p className="text-xs text-[var(--color-text-muted)] lg:text-sm">
            Administre su perfil y preferencias del sistema
          </p>
        </div>
        <div className="flex items-center gap-2">
          {saveSuccess && (
            <span className="flex items-center gap-1 text-sm text-[var(--color-success)]">
              <Check className="h-4 w-4" />
              Guardado
            </span>
          )}
          <Button
            variant="primary"
            size="sm"
            leftIcon={<Save className="h-4 w-4" />}
            onClick={handleSave}
            isLoading={isSaving}
          >
            <span className="hidden sm:inline">Guardar Cambios</span>
            <span className="sm:hidden">Guardar</span>
          </Button>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-4 lg:gap-6">
        {/* Sidebar Navigation */}
        <Card className="lg:col-span-1">
          <CardContent className="p-2">
            <nav className="flex gap-1 overflow-x-auto lg:flex-col lg:space-y-1">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={cn(
                      'flex shrink-0 items-center gap-2 rounded-lg px-3 py-2 text-left text-sm font-medium transition-colors lg:w-full lg:gap-3 lg:py-2.5',
                      isActive
                        ? 'bg-[var(--color-primary)] text-white'
                        : 'text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-elevated)] hover:text-[var(--color-text-primary)]'
                    )}
                  >
                    <Icon className="h-4 w-4" />
                    <span className="hidden lg:inline">{tab.label}</span>
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
            <div className="space-y-4 lg:space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Información Personal</CardTitle>
                  <CardDescription>
                    Actualice su información de perfil y datos de contacto
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex flex-col items-center gap-4 sm:flex-row">
                    <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[var(--color-primary)]">
                      <span className="text-2xl font-bold text-white">
                        {profile.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                      </span>
                    </div>
                    <div className="text-center sm:text-left">
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
                  <div className="flex items-center justify-between rounded-lg bg-[var(--color-surface-elevated)] p-4">
                    <div>
                      <p className="font-medium text-[var(--color-text-primary)]">
                        {profile.role}
                      </p>
                      <p className="text-sm text-[var(--color-text-muted)]">
                        Acceso completo al sistema
                      </p>
                    </div>
                    <Badge variant="success">Activo</Badge>
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
            <div className="space-y-4 lg:space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Cambiar Contraseña</CardTitle>
                  <CardDescription>
                    Actualice su contraseña periódicamente para mayor seguridad
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {passwordError && (
                    <Alert variant="error" title="Error">
                      {passwordError}
                    </Alert>
                  )}
                  {passwordSuccess && (
                    <Alert variant="success" title="Contraseña actualizada">
                      Su contraseña ha sido cambiada exitosamente
                    </Alert>
                  )}
                  <Input
                    label="Contraseña actual"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    value={passwordForm.current}
                    onChange={(e) => setPasswordForm({ ...passwordForm, current: e.target.value })}
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
                    type={showNewPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    value={passwordForm.new}
                    onChange={(e) => setPasswordForm({ ...passwordForm, new: e.target.value })}
                    leftIcon={<Key className="h-4 w-4" />}
                    helperText="Mínimo 8 caracteres"
                    rightIcon={
                      <button
                        type="button"
                        onClick={() => setShowNewPassword(!showNewPassword)}
                        className="text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)]"
                      >
                        {showNewPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </button>
                    }
                  />
                  <Input
                    label="Confirmar nueva contraseña"
                    type="password"
                    placeholder="••••••••"
                    value={passwordForm.confirm}
                    onChange={(e) => setPasswordForm({ ...passwordForm, confirm: e.target.value })}
                    leftIcon={<Key className="h-4 w-4" />}
                  />
                  <Button
                    variant="primary"
                    onClick={handlePasswordChange}
                    isLoading={isChangingPassword}
                  >
                    Actualizar Contraseña
                  </Button>
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
                  <div className={cn(
                    "flex items-center justify-between rounded-lg p-4",
                    twoFactorEnabled
                      ? "bg-[var(--color-success)]/10"
                      : "bg-[var(--color-surface-elevated)]"
                  )}>
                    <div className="flex items-center gap-3">
                      {twoFactorEnabled ? (
                        <CheckCircle className="h-5 w-5 text-[var(--color-success)]" />
                      ) : (
                        <AlertCircle className="h-5 w-5 text-[var(--color-warning)]" />
                      )}
                      <div>
                        <p className="font-medium text-[var(--color-text-primary)]">
                          {twoFactorEnabled ? '2FA Habilitado' : '2FA Deshabilitado'}
                        </p>
                        <p className="text-sm text-[var(--color-text-muted)]">
                          {twoFactorEnabled
                            ? 'Usando aplicación autenticadora'
                            : 'Su cuenta es menos segura'}
                        </p>
                      </div>
                    </div>
                    <Button
                      variant={twoFactorEnabled ? "outline" : "primary"}
                      size="sm"
                      onClick={() => setTwoFactorEnabled(!twoFactorEnabled)}
                    >
                      {twoFactorEnabled ? 'Deshabilitar' : 'Habilitar'}
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>Sesiones Activas</CardTitle>
                    <CardDescription>
                      Administre los dispositivos conectados a su cuenta
                    </CardDescription>
                  </div>
                  {sessions.filter(s => !s.current).length > 0 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-[var(--color-error)]"
                      onClick={handleCloseAllSessions}
                    >
                      Cerrar todas
                    </Button>
                  )}
                </CardHeader>
                <CardContent className="space-y-3">
                  {sessions.map((session) => {
                    const DeviceIcon = getDeviceIcon(session.deviceType);
                    return (
                      <div
                        key={session.id}
                        className="flex items-center justify-between rounded-lg border border-[var(--color-border)] p-3 lg:p-4"
                      >
                        <div className="flex items-center gap-3">
                          <DeviceIcon className="h-5 w-5 text-[var(--color-text-muted)]" />
                          <div>
                            <div className="flex items-center gap-2">
                              <p className="text-sm font-medium text-[var(--color-text-primary)] lg:text-base">
                                {session.device}
                              </p>
                              {session.current && (
                                <Badge variant="success" size="sm">
                                  Actual
                                </Badge>
                              )}
                            </div>
                            <p className="text-xs text-[var(--color-text-muted)] lg:text-sm">
                              {session.location} • {session.lastActive}
                            </p>
                          </div>
                        </div>
                        {!session.current && (
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-[var(--color-error)]"
                            onClick={() => handleCloseSession(session.id)}
                          >
                            <X className="h-4 w-4 lg:mr-1" />
                            <span className="hidden lg:inline">Cerrar</span>
                          </Button>
                        )}
                      </div>
                    );
                  })}
                  {sessions.length === 1 && (
                    <p className="py-4 text-center text-sm text-[var(--color-text-muted)]">
                      No hay otras sesiones activas
                    </p>
                  )}
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
                  <div className="grid grid-cols-3 gap-2 lg:gap-3">
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
    <div className="flex items-center justify-between gap-4 py-2">
      <div className="min-w-0">
        <p className="text-sm font-medium text-[var(--color-text-primary)] lg:text-base">{label}</p>
        <p className="text-xs text-[var(--color-text-muted)] lg:text-sm">{description}</p>
      </div>
      <button
        type="button"
        onClick={() => onChange(!checked)}
        className={cn(
          'relative h-6 w-11 shrink-0 rounded-full transition-colors',
          checked ? 'bg-[var(--color-primary)]' : 'bg-[var(--color-border)]'
        )}
      >
        <span
          className={cn(
            'absolute left-0.5 top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform',
            checked && 'translate-x-5'
          )}
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
      className={cn(
        'flex flex-col items-center gap-1.5 rounded-lg border p-3 transition-all lg:gap-2 lg:p-4',
        selected
          ? 'border-[var(--color-primary)] bg-[var(--color-primary)]/10'
          : 'border-[var(--color-border)] hover:border-[var(--color-primary)]'
      )}
    >
      <Icon
        className={cn(
          'h-5 w-5 lg:h-6 lg:w-6',
          selected ? 'text-[var(--color-primary)]' : 'text-[var(--color-text-muted)]'
        )}
      />
      <span
        className={cn(
          'text-xs font-medium lg:text-sm',
          selected ? 'text-[var(--color-primary)]' : 'text-[var(--color-text-secondary)]'
        )}
      >
        {label}
      </span>
    </button>
  );
}
