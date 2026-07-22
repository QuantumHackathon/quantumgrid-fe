import { NextResponse } from 'next/server';
import { mockInsights, createApiResponse, simulateDelay } from '@/lib/mock-data';
import type { Priority, InsightCategory, Insight } from '@/types';

export async function GET() {
  await simulateDelay(200);

  const summary = {
    total: mockInsights.length,
    byPriority: mockInsights.reduce(
      (acc, insight) => {
        acc[insight.priority] = (acc[insight.priority] || 0) + 1;
        return acc;
      },
      {} as Record<Priority, number>
    ),
    byCategory: mockInsights.reduce(
      (acc, insight) => {
        acc[insight.category] = (acc[insight.category] || 0) + 1;
        return acc;
      },
      {} as Record<InsightCategory, number>
    ),
    byStatus: mockInsights.reduce(
      (acc, insight) => {
        acc[insight.status] = (acc[insight.status] || 0) + 1;
        return acc;
      },
      {} as Record<Insight['status'], number>
    ),
  };

  return NextResponse.json(createApiResponse(summary));
}
