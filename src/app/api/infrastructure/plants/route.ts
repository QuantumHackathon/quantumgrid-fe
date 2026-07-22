import { NextResponse } from 'next/server';
import { mockPlants, createApiResponse, simulateDelay } from '@/lib/mock-data';

export async function GET(request: Request) {
  await simulateDelay(200);

  const { searchParams } = new URL(request.url);
  const type = searchParams.get('type');
  const region = searchParams.get('region');
  const status = searchParams.get('status');

  let filteredPlants = mockPlants;

  if (type) {
    filteredPlants = filteredPlants.filter(p => p.type === type);
  }
  if (region) {
    filteredPlants = filteredPlants.filter(p => p.region === region);
  }
  if (status) {
    filteredPlants = filteredPlants.filter(p => p.status === status);
  }

  return NextResponse.json(createApiResponse(filteredPlants));
}
