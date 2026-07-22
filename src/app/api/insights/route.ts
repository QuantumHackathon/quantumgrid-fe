import { NextResponse } from 'next/server';
import { mockInsights, createApiResponse, createPaginatedResponse, simulateDelay } from '@/lib/mock-data';

export async function GET(request: Request) {
  await simulateDelay(300);

  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get('page') || '1', 10);
  const limit = parseInt(searchParams.get('limit') || '10', 10);
  const category = searchParams.get('category');
  const priority = searchParams.get('priority');
  const status = searchParams.get('status');

  let filteredInsights = mockInsights;

  if (category) {
    filteredInsights = filteredInsights.filter(i => i.category === category);
  }
  if (priority) {
    filteredInsights = filteredInsights.filter(i => i.priority === priority);
  }
  if (status) {
    filteredInsights = filteredInsights.filter(i => i.status === status);
  }

  return NextResponse.json(createApiResponse(createPaginatedResponse(filteredInsights, page, limit)));
}
