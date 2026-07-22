import { NextResponse } from 'next/server';
import { mockUploads, createApiResponse, createPaginatedResponse, simulateDelay } from '@/lib/mock-data';

export async function GET(request: Request) {
  await simulateDelay(200);

  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get('page') || '1', 10);
  const limit = parseInt(searchParams.get('limit') || '10', 10);

  return NextResponse.json(createApiResponse(createPaginatedResponse(mockUploads, page, limit)));
}
