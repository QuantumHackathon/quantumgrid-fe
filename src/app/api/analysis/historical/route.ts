import { NextResponse } from 'next/server';
import { mockHistoricalData, createApiResponse, simulateDelay } from '@/lib/mock-data';

export async function GET(request: Request) {
  await simulateDelay(400);

  const { searchParams } = new URL(request.url);
  const period = searchParams.get('period') || 'month';
  const region = searchParams.get('region');

  return NextResponse.json(
    createApiResponse({
      data: mockHistoricalData,
      filters: {
        period,
        region: region || undefined,
      },
      generatedAt: new Date().toISOString(),
    })
  );
}
