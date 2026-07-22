import { NextResponse } from 'next/server';
import { mockStatistics, createApiResponse, simulateDelay } from '@/lib/mock-data';

export async function GET() {
  await simulateDelay(300);
  return NextResponse.json(createApiResponse(mockStatistics));
}
