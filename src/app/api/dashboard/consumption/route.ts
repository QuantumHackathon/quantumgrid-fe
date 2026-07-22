import { NextResponse } from 'next/server';
import { mockConsumption, createApiResponse, simulateDelay } from '@/lib/mock-data';

export async function GET() {
  await simulateDelay(200);
  return NextResponse.json(createApiResponse(mockConsumption));
}
