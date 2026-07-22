import { NextResponse } from 'next/server';
import { mockPlants, createApiResponse, simulateDelay } from '@/lib/mock-data';

export async function GET() {
  await simulateDelay(150);

  const summary = {
    totalCapacity: mockPlants.reduce((sum, p) => sum + p.capacity, 0),
    currentGeneration: mockPlants.reduce((sum, p) => sum + p.currentOutput, 0),
    plantsOnline: mockPlants.filter(p => p.status === 'online').length,
    plantsOffline: mockPlants.filter(p => p.status === 'offline').length,
    plantsMaintenance: mockPlants.filter(p => p.status === 'maintenance').length,
    plantsWarning: mockPlants.filter(p => p.status === 'warning').length,
  };

  return NextResponse.json(createApiResponse(summary));
}
