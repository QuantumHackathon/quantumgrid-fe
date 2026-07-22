import { NextResponse } from 'next/server';
import { mockDashboardOverview, createApiResponse, simulateDelay } from '@/lib/mock-data';

export async function GET() {
  // Simulate API delay
  await simulateDelay(300);

  return NextResponse.json(createApiResponse(mockDashboardOverview));
}
