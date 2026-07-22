import type { NavItem } from '@/types';

/**
 * Main navigation items for the dashboard sidebar
 */
export const NAVIGATION_ITEMS: NavItem[] = [
  {
    label: 'Dashboard',
    href: '/dashboard',
    icon: 'LayoutDashboard',
  },
  {
    label: 'Análisis',
    href: '/analysis',
    icon: 'LineChart',
    children: [
      {
        label: 'Histórico',
        href: '/analysis?view=historical',
        icon: 'History',
      },
      {
        label: 'Tendencias',
        href: '/analysis?view=trends',
        icon: 'TrendingUp',
      },
    ],
  },
  {
    label: 'Datos',
    href: '/upload',
    icon: 'Upload',
    children: [
      {
        label: 'Subir Datos',
        href: '/upload',
        icon: 'Upload',
      },
      {
        label: 'Historial',
        href: '/upload/history',
        icon: 'FileStack',
      },
    ],
  },
  {
    label: 'Insights',
    href: '/insights',
    icon: 'Lightbulb',
  },
  {
    label: 'Infraestructura',
    href: '/infrastructure',
    icon: 'Factory',
    children: [
      {
        label: 'Red Eléctrica',
        href: '/infrastructure?view=grid',
        icon: 'Zap',
      },
      {
        label: 'Plantas',
        href: '/infrastructure?view=plants',
        icon: 'Building2',
      },
    ],
  },
  {
    label: 'Reportes',
    href: '/reports',
    icon: 'FileText',
  },
  {
    label: 'Configuración',
    href: '/settings',
    icon: 'Settings',
    adminOnly: true,
  },
];

/**
 * Public navigation items (header)
 */
export const PUBLIC_NAV_ITEMS: NavItem[] = [
  {
    label: 'Inicio',
    href: '/',
    icon: 'Home',
  },
  {
    label: 'Acerca de',
    href: '/about',
    icon: 'Info',
  },
  {
    label: 'Contacto',
    href: '/contact',
    icon: 'Mail',
  },
];

/**
 * Footer links
 */
export const FOOTER_LINKS = {
  legal: [
    { label: 'Política de Privacidad', href: '/privacy' },
    { label: 'Términos de Uso', href: '/terms' },
    { label: 'Accesibilidad', href: '/accessibility' },
  ],
  resources: [
    { label: 'Documentación', href: '/docs' },
    { label: 'API', href: '/api-docs' },
    { label: 'Soporte', href: '/support' },
  ],
};

/**
 * Region options for filters
 */
export const REGIONS = [
  { value: 'all', label: 'Todas las regiones' },
  { value: 'central', label: 'Región Central' },
  { value: 'chorotega', label: 'Región Chorotega' },
  { value: 'pacifico-central', label: 'Pacífico Central' },
  { value: 'brunca', label: 'Región Brunca' },
  { value: 'huetar-atlantica', label: 'Huetar Atlántica' },
  { value: 'huetar-norte', label: 'Huetar Norte' },
];

/**
 * Period options for filters
 */
export const PERIODS = [
  { value: 'day', label: 'Día' },
  { value: 'week', label: 'Semana' },
  { value: 'month', label: 'Mes' },
  { value: 'year', label: 'Año' },
  { value: 'custom', label: 'Personalizado' },
];

/**
 * Generation source colors for charts
 */
export const GENERATION_COLORS = {
  hydro: '#006341',    // Costa Rica Green
  wind: '#0284C7',     // Info blue
  solar: '#C4A35A',    // Accent gold
  thermal: '#64748B',  // Neutral
  other: '#94A3B8',    // Light neutral
};
