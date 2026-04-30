import { User, Position, Fill, DepositWithdraw, LeaderboardEntry } from './types';

const API_BASE = 'https://api.hyperliquid.xyz/info';
const MAX_REQ_PER_SEC = 4;
const RETRY_ATTEMPTS = 3;
const RETRY_DELAY_MS = 1000;

let lastRequestTime = 0;
let requestCount = 0;
const requestQueue: Array<() => Promise<unknown>> = [];

async function rateLimitedFetch<T>(fn: () => Promise<T>): Promise<T> {
  const now = Date.now();
  
  if (now - lastRequestTime >= 1000) {
    requestCount = 0;
    lastRequestTime = now;
  }
  
  if (requestCount >= MAX_REQ_PER_SEC) {
    const waitTime = 1000 - (now - lastRequestTime);
    await new Promise(resolve => setTimeout(resolve, waitTime));
    return rateLimitedFetch(fn);
  }
  
  requestCount++;
  return fn();
}

async function fetchWithRetry<T>(fn: () => Promise<T>, attempts = RETRY_ATTEMPTS): Promise<T> {
  try {
    return await rateLimitedFetch(fn);
  } catch (error) {
    if (attempts <= 1) throw error;
    
    const status = (error as Response)?.status;
    if (status === 429) {
      await new Promise(resolve => setTimeout(resolve, RETRY_DELAY_MS * (RETRY_ATTEMPTS - attempts + 1)));
      return fetchWithRetry(fn, attempts - 1);
    }
    throw error;
  }
}

export async function getUser(address: string): Promise<User> {
  return fetchWithRetry(() =>
    fetch(`${API_BASE}/user`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ address, all: true })
    }).then(res => res.json())
  ) as Promise<User>;
}

export async function getUserPositions(address: string): Promise<Position[]> {
  const user = await getUser(address);
  return user.positions || [];
}

export async function getUserFills(address: string, startTime?: number): Promise<Fill[]> {
  const endpoint = startTime ? `${API_BASE}/fills` : `${API_BASE}/fills`;
  return fetchWithRetry(() =>
    fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ address, startTime: startTime || 0 })
    }).then(res => res.json())
  ) as Promise<Fill[]>;
}

export async function getLeaderboard(): Promise<LeaderboardEntry[]> {
  return fetchWithRetry(() =>
    fetch(`${API_BASE}/leaderboard`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    }).then(res => res.json())
  ) as Promise<LeaderboardEntry[]>;
}

export async function getDepositsWithdraws(address: string): Promise<DepositWithdraw[]> {
  return fetchWithRetry(() =>
    fetch(`${API_BASE}/multiVaultHistory`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        address,
        type: { 
          Raw: { 
            chain: "Arbitrum", 
            fromTime: 0, 
            toTime: Math.floor(Date.now() / 1000) 
          } 
        } 
      })
    }).then(res => res.json())
  ) as Promise<DepositWithdraw[]>;
}

export async function getAssetUsers(asset: number): Promise<string[]> {
  return fetchWithRetry(() =>
    fetch(`${API_BASE}/assetUsers`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ asset })
    }).then(res => res.json())
  ) as Promise<string[]>;
}