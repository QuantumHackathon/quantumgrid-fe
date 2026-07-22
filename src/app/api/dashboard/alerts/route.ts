import { NextResponse } from 'next/server';
import { mockAlerts, createApiResponse, simulateDelay } from '@/lib/mock-data';

export async function GET(request: Request) {
  await simulateDelay(150);

  const { searchParams } = new URL(request.url);
  const limit = searchParams.get('limit');

  let alerts = mockAlerts;
  if (limit) {
    alerts = mockAlerts.slice(0, parseInt(limit, 10));
  }

  return NextResponse.json(createApiResponse(alerts));
}
