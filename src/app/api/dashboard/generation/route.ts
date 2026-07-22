import { NextResponse } from 'next/server';
import { mockGenerationMix, createApiResponse, simulateDelay } from '@/lib/mock-data';

export async function GET() {
  await simulateDelay(200);
  return NextResponse.json(createApiResponse(mockGenerationMix));
}
