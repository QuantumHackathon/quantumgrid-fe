import { NextResponse } from 'next/server';
import { mockGridStatus, createApiResponse, simulateDelay } from '@/lib/mock-data';

export async function GET() {
  await simulateDelay(150);
  return NextResponse.json(createApiResponse(mockGridStatus));
}
