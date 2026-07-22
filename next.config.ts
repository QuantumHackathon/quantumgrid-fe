import type { NextConfig } from "next";
import bundleAnalyzer from '@next/bundle-analyzer';

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

const nextConfig: NextConfig = {
  // Optimize images
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
  },
  // Enable experimental optimizations
  experimental: {
    optimizePackageImports: ['lucide-react', 'recharts'],
  },
  // Compress responses
  compress: true,
  // Power off x-powered-by header for security
  poweredByHeader: false,
};

export default withBundleAnalyzer(nextConfig);
