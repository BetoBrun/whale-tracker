import { Fill, TwapMarker } from '../hyperliquid/types';

const TWAP_THRESHOLD_SECONDS = 300;
const TWAP_MIN_FILLS = 3;

export function detectTwapFills(fills: Fill[], address: string): TwapMarker[] {
  const userFills = fills
    .filter(f => f.user.toLowerCase() === address.toLowerCase())
    .sort((a, b) => a.time - b.time);
  
  if (userFills.length < TWAP_MIN_FILLS) return [];
  
  const twapMarkers: TwapMarker[] = [];
  
  for (let i = 0; i < userFills.length - 1; i++) {
    const current = userFills[i];
    const next = userFills[i + 1];
    
    if (current.asset !== next.asset) continue;
    if (current.side !== next.side) continue;
    
    const timeDiff = next.time - current.time;
    const priceDiff = Math.abs(parseFloat(next.px) - parseFloat(current.px));
    const priceChangePercent = priceDiff / parseFloat(current.px);
    
    const isTwap = timeDiff <= TWAP_THRESHOLD_SECONDS && priceChangePercent < 0.01;
    
    if (isTwap) {
      twapMarkers.push({
        tid: current.tid,
        address: current.user,
        asset: current.asset,
        side: current.side,
        size: (parseFloat(current.sz) + parseFloat(next.sz)).toString(),
        price: ((parseFloat(current.px) + parseFloat(next.px)) / 2).toString(),
        time: current.time,
        isTwap: true,
      });
    }
  }
  
  return twapMarkers;
}

export function filterTwapByAsset(twapMarkers: TwapMarker[], asset: number): TwapMarker[] {
  return twapMarkers.filter(m => m.asset === asset);
}

export function calculateTwapStats(twapMarkers: TwapMarker[]): {
  totalTwaps: number;
  totalVolume: string;
  averageSize: string;
  buyCount: number;
  sellCount: number;
} {
  const totalTwaps = twapMarkers.length;
  const totalVolume = twapMarkers.reduce((sum, m) => sum + parseFloat(m.size), 0);
  const averageSize = totalTwaps > 0 ? totalVolume / totalTwaps : 0;
  const buyCount = twapMarkers.filter(m => m.side === 'buy').length;
  const sellCount = twapMarkers.filter(m => m.side === 'sell').length;
  
  return {
    totalTwaps,
    totalVolume: totalVolume.toString(),
    averageSize: averageSize.toString(),
    buyCount,
    sellCount,
  };
}