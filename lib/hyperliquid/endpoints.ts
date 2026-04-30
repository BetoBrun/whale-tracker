import { getUser, getUserPositions, getUserFills, getLeaderboard, getDepositsWithdraws, getAssetUsers } from './client';

export const endpoints = {
  user: getUser,
  positions: getUserPositions,
  fills: getUserFills,
  leaderboard: getLeaderboard,
  depositsWithdraws: getDepositsWithdraws,
  assetUsers: getAssetUsers,
};

export function fetchLeaderboard() {
  return endpoints.leaderboard();
}

export function fetchTrader(address: string) {
  return Promise.all([
    endpoints.user(address),
    endpoints.positions(address),
    endpoints.fills(address),
  ]).then(([user, positions, fills]) => ({
    user,
    positions,
    fills,
  }));
}

export function fetchSmartMoney() {
  return fetchLeaderboard().then(leaderboard => 
    leaderboard.slice(0, 50)
  );
}

export function fetchTraderFlow(address: string, days = 90) {
  const startTime = Math.floor((Date.now() / 1000) - days * 24 * 60 * 60);
  return endpoints.depositsWithdraws(address).then(deposits => {
    const filtered = deposits.filter(d => d.time >= startTime);
    const totalDeposits = filtered
      .filter(d => d.type === 'deposit')
      .reduce((sum, d) => sum + parseFloat(d.amount), 0);
    const totalWithdrawals = filtered
      .filter(d => d.type === 'withdraw')
      .reduce((sum, d) => sum + parseFloat(d.amount), 0);
    return {
      deposits_90d: totalDeposits.toString(),
      withdrawals_90d: totalWithdrawals.toString(),
      netFlow: (totalDeposits - totalWithdrawals).toString(),
    };
  });
}

export async function scanDexUsers(dex: string): Promise<string[]> {
  const DEX_MAP: Record<string, number> = {
    'uniswap-v3': 1,
    'raydium': 2,
    'orca': 3,
    'jupiter': 4,
    'camelot': 5,
  };
  
  const assetId = DEX_MAP[dex];
  if (!assetId) return [];
  
  return endpoints.assetUsers(assetId);
}