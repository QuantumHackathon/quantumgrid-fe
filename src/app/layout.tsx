import type { Metadata, Viewport } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import { QueryProvider } from '@/providers';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-jetbrains',
});

export const metadata: Metadata = {
  title: {
    default: 'Quantum Grid Intelligence | Powering the AI Era',
    template: '%s | QGI',
  },
  description:
    'Decision intelligence platform preparing energy infrastructure for the AI era. Smarter grids, faster decisions, sustainable future.',
  keywords: [
    'AI',
    'Energy',
    'Grid Intelligence',
    'Digital Twin',
    'Optimization',
    'Smart Grid',
    'Infrastructure',
    'Simulation',
  ],
  authors: [{ name: 'Quantum Grid Intelligence' }],
  creator: 'QGI',
  publisher: 'Quantum Grid Intelligence',
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'Quantum Grid Intelligence',
    title: 'Quantum Grid Intelligence | Powering the AI Era',
    description:
      'Decision intelligence platform preparing energy infrastructure for the AI era. Smarter grids, faster decisions, sustainable future.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Quantum Grid Intelligence | Powering the AI Era',
    description:
      'Decision intelligence platform preparing energy infrastructure for the AI era. Smarter grids, faster decisions, sustainable future.',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#050508',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="flex min-h-screen flex-col bg-[var(--color-background)] font-sans antialiased">
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}
