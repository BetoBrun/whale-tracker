import { NextRequest, NextResponse } from 'next/server';
import { fetchLeaderboard, fetchTrader, fetchTraderFlow, scanDexUsers } from './endpoints';

export const dynamic = 'force-dynamic';
export const revalidate = 60;

export async function GET(
  request: NextRequest,
  { params }: { params: { address?: string[] } }
) {
  try {
    const path = request.nextUrl.pathname;
    
    if (path === '/api/leaderboard') {
      const data = await fetchLeaderboard();
      return NextResponse.json(data);
    }
    
    if (path.startsWith('/api/trader/')) {
      const address = path.split('/api/trader/')[1];
      if (!address) {
        return NextResponse.json({ error: 'Address required' }, { status: 400 });
      }
      const data = await fetchTrader(address);
      return NextResponse.json(data);
    }
    
    if (path.startsWith('/api/flow/')) {
      const address = path.split('/api/flow/')[1];
      if (!address) {
        return NextResponse.json({ error: 'Address required' }, { status: 400 });
      }
      const days = parseInt(request.nextUrl.searchParams.get('days') || '90');
      const data = await fetchTraderFlow(address, days);
      return NextResponse.json(data);
    }
    
    if (path.startsWith('/api/dex/')) {
      const dex = path.split('/api/dex/')[1];
      if (!dex) {
        return NextResponse.json({ error: 'DEX name required' }, { status: 400 });
      }
      const data = await scanDexUsers(dex);
      return NextResponse.json(data);
    }
    
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
    
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { address, type } = body;
    
    if (type === 'trader') {
      const data = await fetchTrader(address);
      return NextResponse.json(data);
    }
    
    if (type === 'flow') {
      const days = body.days || 90;
      const data = await fetchTraderFlow(address, days);
      return NextResponse.json(data);
    }
    
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
    
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}