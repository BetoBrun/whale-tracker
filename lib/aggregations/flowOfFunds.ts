import { DepositWithdraw } from '../hyperliquid/types';

export interface FlowOfFunds {
  address: string;
  deposits_90d: string;
  withdrawals_90d: string;
  netFlow: string;
  deposits_count: number;
  withdrawals_count: number;
  averageDeposit: string;
  averageWithdraw: string;
}

export function calculateFlowOfFunds(
  deposits: DepositWithdraw[],
  address: string,
  days = 90
): FlowOfFunds {
  const now = Math.floor(Date.now() / 1000);
  const startTime = now - days * 24 * 60 * 60;
  
  const filtered = deposits.filter(
    d => d.address.toLowerCase() === address.toLowerCase() && d.time >= startTime
  );
  
  const depositsList = filtered.filter(d => d.type === 'deposit');
  const withdrawalsList = filtered.filter(d => d.type === 'withdraw');
  
  const deposits_90d = depositsList.reduce((sum, d) => sum + parseFloat(d.amount), 0);
  const withdrawals_90d = withdrawalsList.reduce((sum, d) => sum + parseFloat(d.amount), 0);
  
  const deposits_count = depositsList.length;
  const withdrawals_count = withdrawalsList.length;
  
  const averageDeposit = deposits_count > 0 ? deposits_90d / deposits_count : 0;
  const averageWithdraw = withdrawals_count > 0 ? withdrawals_90d / withdrawals_count : 0;
  
  return {
    address,
    deposits_90d: deposits_90d.toString(),
    withdrawals_90d: withdrawals_90d.toString(),
    netFlow: (deposits_90d - withdrawals_90d).toString(),
    deposits_count,
    withdrawals_count,
    averageDeposit: averageDeposit.toString(),
    averageWithdraw: averageWithdraw.toString(),
  };
}

export function getFlowTrend(flowHistory: FlowOfFunds[]): 'inflow' | 'outflow' | 'neutral' {
  if (flowHistory.length < 2) return 'neutral';
  
  const recent = flowHistory[flowHistory.length - 1];
  const previous = flowHistory[flowHistory.length - 2];
  
  const recentNet = parseFloat(recent.netFlow);
  const previousNet = parseFloat(previous.netFlow);
  
  if (recentNet > 0 && previousNet > 0) return 'inflow';
  if (recentNet < 0 && previousNet < 0) return 'outflow';
  return 'neutral';
}

export function calculateNetFlowByAsset(
  deposits: DepositWithdraw[],
  address: string
): Record<number, string> {
  const assetFlow: Record<number, string> = {};
  
  for (const d of deposits) {
    if (d.address.toLowerCase() !== address.toLowerCase()) continue;
    
    const token = d.token;
    if (!token) continue;
    
    const amount = d.type === 'deposit' ? parseFloat(d.amount) : -parseFloat(d.amount);
    
    if (!assetFlow[token]) {
      assetFlow[token] = '0';
    }
    assetFlow[token] = (parseFloat(assetFlow[token]) + amount).toString();
  }
  
  return assetFlow;
}