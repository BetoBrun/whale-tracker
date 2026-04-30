'use client';

import { Sidebar } from '@/components/Sidebar';
import { StatsCard } from '@/components/StatsCards';
import { WhaleTable, WhaleData } from '@/components/WhaleTable';
import { AccountChart } from '@/components/AccountChart';
import { useState, useEffect } from 'react';

const mockWhaleData: WhaleData[] = [
  { rank: 1, address: '0x742d35Cc6634C0532925a3b844Bc9e7595f', label: 'Alpha Whale', pnl: 1250000, pnlPercent: 45.2, volume: 85000000, position: 'long', lastActive: '2 min ago' },
  { rank: 2, address: '0x9B3a54D092a4f22d6b3A7a1e7d2F8C5A3B2D1E0F', pnl: 890000, pnlPercent: 28.5, volume: 62000000, position: 'long', lastActive: '5 min ago' },
  { rank: 3, address: '0x1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p', label: 'Whale King', pnl: -450000, pnlPercent: -12.3, volume: 45000000, position: 'short', lastActive: '10 min ago' },
  { rank: 4, address: '0x5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b', pnl: 720000, pnlPercent: 18.7, volume: 38000000, position: 'long', lastActive: '15 min ago' },
  { rank: 5, address: '0x4d3c2b1a0f9e8d7c6b5a4f3e2d1c0b9a', pnl: 560000, pnlPercent: 15.2, volume: 32000000, position: 'long', lastActive: '20 min ago' },
  { rank: 6, address: '0x8f7e6d5c4b3a2f1e0d9c8b7a6f5e4d3c', pnl: -320000, pnlPercent: -8.5, volume: 28000000, position: 'short', lastActive: '25 min ago' },
  { rank: 7, address: '0x2a1b0c9d8e7f6a5b4c3d2e1f0a9b8c7d', label: 'Crypto Whale', pnl: 410000, pnlPercent: 11.8, volume: 24000000, position: 'long', lastActive: '30 min ago' },
  { rank: 8, address: '0x9c8b7a6f5e4d3c2b1a0f9e8d7c6b5a4', pnl: 280000, pnlPercent: 7.2, volume: 19000000, position: 'neutral', lastActive: '35 min ago' },
  { rank: 9, address: '0x3f2e1d0c9b8a7f6e5d4c3b2a1f0e9d8c', pnl: -180000, pnlPercent: -5.1, volume: 15000000, position: 'short', lastActive: '40 min ago' },
  { rank: 10, address: '0x6a5b4c3d2e1f0a9b8c7d6e5f4a3b2c1d', pnl: 150000, pnlPercent: 3.8, volume: 12000000, position: 'long', lastActive: '45 min ago' },
];

const mockChartData = [
  { time: '2024-01-01', open: 42000, high: 43500, low: 41800, close: 43200 },
  { time: '2024-01-02', open: 43200, high: 44500, low: 42800, close: 44100 },
  { time: '2024-01-03', open: 44100, high: 45200, low: 43800, close: 44500 },
  { time: '2024-01-04', open: 44500, high: 46800, low: 44200, close: 46500 },
  { time: '2024-01-05', open: 46500, high: 47500, low: 45800, close: 47200 },
  { time: '2024-01-06', open: 47200, high: 48500, low: 46800, close: 48200 },
  { time: '2024-01-07', open: 48200, high: 49500, low: 47800, close: 49000 },
  { time: '2024-01-08', open: 49000, high: 50200, low: 48500, close: 49800 },
  { time: '2024-01-09', open: 49800, high: 51000, low: 49200, close: 50500 },
  { time: '2024-01-10', open: 50500, high: 51800, low: 50000, close: 51200 },
];

export default function Home() {
  const [timeframe, setTimeframe] = useState<'24h' | '7d' | '30d'>('24h');

  return (
    <div className="flex min-h-screen bg-[#0f0f1a]">
      <Sidebar />
      
      <main className="flex-1 p-6 overflow-auto">
        <header className="flex items-center gap-2 mb-6">
          <h1 className="text-2xl font-bold text-white">Whale Tracker</h1>
          <span className="bg-gradient-to-r from-amber-500 to-yellow-400 text-black text-xs px-2 py-0.5 rounded font-bold">PRO</span>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <StatsCard 
            title="Total P&L" 
            value="$4.2M" 
            change="+12.5% (24h)"
            changeType="positive"
          />
          <StatsCard 
            title="Active Whales" 
            value="156" 
            change="+8 new today"
            changeType="positive"
          />
          <StatsCard 
            title="Total Volume" 
            value="$842M" 
            change="+5.2% (24h)"
            changeType="positive"
          />
          <StatsCard 
            title="Win Rate" 
            value="68.5%" 
            change="-2.1% vs last week"
            changeType="negative"
          />
        </div>

        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-white">Market Overview</h2>
            <div className="flex gap-2">
              {(['24h', '7d', '30d'] as const).map((tf) => (
                <button
                  key={tf}
                  onClick={() => setTimeframe(tf)}
                  className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${
                    timeframe === tf 
                      ? 'bg-amber-500 text-black font-medium' 
                      : 'bg-[#1e1e30] text-gray-400 hover:bg-[#2a2a40]'
                  }`}
                >
                  {tf}
                </button>
              ))}
            </div>
          </div>
          <AccountChart data={mockChartData} />
        </div>

        <WhaleTable data={mockWhaleData} />

        <footer className="mt-8 text-center text-gray-500 text-sm">
          <p>Data sourced from Hyperliquid • Last updated: just now</p>
        </footer>
      </main>
    </div>
  );
}