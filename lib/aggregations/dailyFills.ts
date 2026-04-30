import { Fill } from '../hyperliquid/types';

export interface AggregatedDailyStats {
  date: string;
  totalVolume: string;
  totalPnl: string;
  traderCount: number;
}

export function aggregateFillsByDay(fills: Fill[]): AggregatedDailyStats[] {
  const dailyMap = new Map<string, AggregatedDailyStats>();
  
  for (const fill of fills) {
    const date = new Date(fill.time * 1000).toISOString().split('T')[0];
    
    if (!dailyMap.has(date)) {
      dailyMap.set(date, {
        date,
        totalVolume: '0',
        totalPnl: '0',
        traderCount: 0,
      });
    }
    
    const day = dailyMap.get(date)!;
    day.totalVolume = (parseFloat(day.totalVolume) + parseFloat(fill.sz)).toString();
    
    const pnl = fill.side === 'buy' ? -parseFloat(fill.sz) * parseFloat(fill.px) : parseFloat(fill.sz) * parseFloat(fill.px);
    day.totalPnl = (parseFloat(day.totalPnl) + pnl).toString();
    day.traderCount++;
  }
  
  return Array.from(dailyMap.values()).sort((a, b) => a.date.localeCompare(b.date));
}

export function getVolumeByAsset(fills: Fill[]): Record<number, string> {
  const assetVolume: Record<number, string> = {};
  
  for (const fill of fills) {
    if (!assetVolume[fill.asset]) {
      assetVolume[fill.asset] = '0';
    }
    assetVolume[fill.asset] = (parseFloat(assetVolume[fill.asset]) + parseFloat(fill.sz)).toString();
  }
  
  return assetVolume;
}

export function getTopTradersByVolume(fills: Fill[], limit = 10): Array<{ address: string; volume: string }> {
  const traderVolume: Record<string, string> = {};
  
  for (const fill of fills) {
    if (!traderVolume[fill.user]) {
      traderVolume[fill.user] = '0';
    }
    traderVolume[fill.user] = (parseFloat(traderVolume[fill.user]) + parseFloat(fill.sz)).toString();
  }
  
  return Object.entries(traderVolume)
    .map(([address, volume]) => ({ address, volume }))
    .sort((a, b) => parseFloat(b.volume) - parseFloat(a.volume))
    .slice(0, limit);
}