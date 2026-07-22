# QuantumGrid

Plataforma de gestión inteligente de infraestructura energética impulsada por IA y simulaciones cuánticas.

## Descripción

QuantumGrid es una solución diseñada para optimizar la toma de decisiones en redes eléctricas mediante simulaciones avanzadas e inteligencia artificial. La plataforma permite a operadores de infraestructura energética visualizar, analizar y predecir el comportamiento de sus redes en tiempo real.

### Características principales

- **Dashboard interactivo** - Visualización en tiempo real de métricas de generación y consumo energético
- **Análisis predictivo** - Estadísticas históricas y proyecciones basadas en IA
- **Gestión de infraestructura** - Monitoreo de plantas de generación y estado de la red
- **Insights inteligentes** - Recomendaciones automatizadas para optimización
- **Reportes** - Generación de informes detallados
- **Carga de datos** - Importación de datasets para análisis

## Tech Stack

- **Framework:** Next.js 16 con App Router
- **UI:** React 19, Tailwind CSS 4, Framer Motion
- **Estado:** Zustand, TanStack Query
- **Gráficos:** Recharts
- **Validación:** Zod
- **Tipado:** TypeScript

## Instalación

```bash
npm install
```

## Desarrollo

```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## Scripts disponibles

| Comando | Descripción |
|---------|-------------|
| `npm run dev` | Servidor de desarrollo |
| `npm run build` | Build de producción |
| `npm run start` | Servidor de producción |
| `npm run lint` | Ejecutar ESLint |
| `npm run lint:fix` | Corregir errores de lint |
| `npm run format` | Formatear código con Prettier |
| `npm run typecheck` | Verificar tipos de TypeScript |

## Estructura del proyecto

```
src/
├── app/                  # Rutas y páginas (App Router)
│   ├── (dashboard)/      # Rutas protegidas del dashboard
│   ├── (public)/         # Rutas públicas (landing, login)
│   └── api/              # API Routes
├── components/           # Componentes React
│   ├── charts/           # Componentes de gráficos
│   ├── landing/          # Componentes del landing page
│   ├── layout/           # Layout components
│   ├── shared/           # Componentes reutilizables
│   └── ui/               # Componentes UI base
├── hooks/                # Custom React hooks
├── lib/                  # Utilidades y configuraciones
├── providers/            # Context providers
├── services/             # Servicios y API clients
├── store/                # Estado global (Zustand)
└── types/                # Definiciones de TypeScript
```
