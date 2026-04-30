import { Fill } from '../hyperliquid/types';

export interface RoundTrip {
  entryId: string;
  exitId: string;
  address: string;
  asset: number;
  entryTime: number;
  exitTime: number;
  entryPrice: string;
  exitPrice: string;
  size: string;
  pnl: string;
  duration: number;
}

export function findRoundTrips(fills: Fill[], address: string): RoundTrip[] {
  const assetFills = fills
    .filter(f => f.user.toLowerCase() === address.toLowerCase())
    .sort((a, b) => a.time - b.time);
  
  const positionStack: Array<{
    id: string;
    asset: number;
    side: 'buy' | 'sell';
    size: string;
    price: string;
    time: number;
  }> = [];
  
  const roundTrips: RoundTrip[] = [];
  
  for (const fill of assetFills) {
    const size = parseFloat(fill.sz);
    let remainingSize = size;
    
    const while (remainingSize > 0 && positionStack.length > 0) {
      const position = positionStack[positionStack.length - 1];
      
      if (position.side !== fill.side) {
        const matchedSize = Math.min(remainingSize, parseFloat(position.size));
        const matchedPnL = fill.side === 'sell'
          ? matchedSize * (parseFloat(fill.px) - parseFloat(position.price))
          : matchedSize * (parseFloat(position.price) - parseFloat(fill.px));
        
        roundTrips.push({
          entryId: position.id,
          exitId: fill.id,
          address: fill.user,
          asset: fill.asset,
          entryTime: position.time,
          exitTime: fill.time,
          entryPrice: position.price,
          exitPrice: fill.px,
          size: matchedSize.toString(),
          pnl: matchedPnL.toString(),
          duration: fill.time - position.time,
        });
        
        remainingSize -= matchedSize;
        position.size = (parseFloat(position.size) - matchedSize).toString();
        
        if (parseFloat(position.size) <= 0) {
          positionStack.pop();
        }
      }
      
      remainingSize -= remainingSize > 0 ? matchedSize : 0;
    }
    
    if (remainingSize > 0) {
      positionStack.push({
        id: fill.id,
        asset: fill.asset,
        side: fill.side,
        size: remainingSize.toString(),
        price: fill.px,
        time: fill.time,
      });
    }
  }
  
  return roundTrips;
}

export function calculateTotalPnl(roundTrips: RoundTrip[]): string {
  return roundTrips.reduce((sum, rt) => sum + parseFloat(rt.pnl), 0).toString();
}

export function calculateWinRate(roundTrips: RoundTrip[]): number {
  if (roundTrips.length === 0) return 0;
  const wins = roundTrips.filter(rt => parseFloat(rt.pnl) > 0).length;
  return wins / roundTrips.length;
}

export function calculateAverageHoldingTime(roundTrips: RoundTrip[]): number {
  if (roundTrips.length === 0) return 0;
  const totalTime = roundTrips.reduce((sum, rt) => sum + rt.duration, 0);
  return totalTime / roundTrips.length;
}