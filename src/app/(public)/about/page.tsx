import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Acerca de',
  description: 'Información sobre SIENA-CR y su misión',
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16">
      <h1 className="mb-6 text-3xl font-bold text-[var(--color-text-primary)]">
        Acerca de SIENA-CR
      </h1>

      <div className="prose prose-lg max-w-none">
        <p className="text-[var(--color-text-secondary)]">
          El Sistema de Inteligencia Energética Nacional de Costa Rica
          (SIENA-CR) es una plataforma de grado gubernamental diseñada para
          optimizar la gestión de la infraestructura energética nacional.
        </p>

        <h2 className="mt-8 text-2xl font-semibold text-[var(--color-text-primary)]">
          Nuestra Misión
        </h2>
        <p className="text-[var(--color-text-secondary)]">
          Proporcionar herramientas de análisis y visualización de datos que
          permitan a los tomadores de decisiones optimizar el uso de recursos
          energéticos, aumentar la eficiencia de la red eléctrica y avanzar
          hacia un futuro 100% renovable.
        </p>

        <h2 className="mt-8 text-2xl font-semibold text-[var(--color-text-primary)]">
          Respaldo Institucional
        </h2>
        <p className="text-[var(--color-text-secondary)]">
          SIENA-CR es desarrollado en colaboración con el Instituto
          Costarricense de Electricidad (ICE) y el Ministerio de Ambiente y
          Energía (MINAE), garantizando los más altos estándares de calidad y
          seguridad para plataformas gubernamentales.
        </p>
      </div>
    </div>
  );
}
