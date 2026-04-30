export interface User {
  address: string;
  email?: string;
}

export interface Position {
  asset: number;
  side: 'buy' | 'sell';
  size: string;
  entry: string;
  unrealizedPnl?: string;
}

export interface Fill {
  id: string;
  user: string;
  side: 'buy' | 'sell';
  asset: number;
  sz: string;
  px: string;
  fee: string;
 oid: string;
  time: number;
  tid: number;
  startVite?: number;
}

export interface DepositWithdraw {
  address: string;
  amount: string;
  token: string;
  time: number;
  type: 'deposit' | 'withdraw';
}

export interface LeaderboardEntry {
  address: string;
  pnl: string;
  volume: string;
  rank: number;
}

export interface AggregatedDailyStats {
  date: string;
  totalVolume: string;
  totalPnl: string;
  traderCount: number;
}

export interface RoundTrip {
  entryId: string;
  exitId: string;
  asset: number;
  entryTime: number;
  exitTime: number;
  pnl: string;
}

export interface TwapMarker {
  tid: number;
  address: string;
  asset: number;
  side: 'buy' | 'sell';
  size: string;
  price: string;
  time: number;
  isTwap: boolean;
}

export interface FlowOfFunds {
  address: string;
  deposits_90d: string;
  withdrawals_90d: string;
  netFlow: string;
}