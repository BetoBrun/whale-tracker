'use client';

import { useState } from 'react';

export interface WhaleData {
  rank: number;
  address: string;
  label?: string;
  pnl: number;
  pnlPercent: number;
  volume: number;
  position: 'long' | 'short' | 'neutral';
  lastActive: string;
}

interface WhaleTableProps {
  data: WhaleData[];
}

export function WhaleTable({ data }: WhaleTableProps) {
  const [filter, setFilter] = useState<'all' | 'long' | 'short'>('all');
  const [sortBy, setSortBy] = useState<'pnl' | 'volume'>('pnl');

  const filteredData = data.filter((whale) => {
    if (filter === 'all') return true;
    return whale.position === filter;
  });

  const sortedData = [...filteredData].sort((a, b) => {
    if (sortBy === 'pnl') return b.pnl - a.pnl;
    return b.volume - a.volume;
  });

  return (
    <div className="bg-[#1e1e30] rounded-xl border border-[#2a2a3a] overflow-hidden">
      <div className="p-4 border-b border-[#2a2a3a] flex flex-wrap gap-4 items-center justify-between">
        <h2 className="text-lg font-semibold text-white">Top Whales</h2>
        
        <div className="flex gap-2">
          <button
            onClick={() => setFilter('all')}
            className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${
              filter === 'all' ? 'bg-amber-500 text-black' : 'bg-[#2a2a40] text-gray-400 hover:bg-[#3a3a50]'
            }`}
          >
            All
          </button>
          <button
            onClick={() => setFilter('long')}
            className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${
              filter === 'long' ? 'bg-green-500 text-black' : 'bg-[#2a2a40] text-gray-400 hover:bg-[#3a3a50]'
            }`}
          >
            Long
          </button>
          <button
            onClick={() => setFilter('short')}
            className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${
              filter === 'short' ? 'bg-red-500 text-white' : 'bg-[#2a2a40] text-gray-400 hover:bg-[#3a3a50]'
            }`}
          >
            Short
          </button>
        </div>

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as 'pnl' | 'volume')}
          className="bg-[#2a2a40] text-gray-300 px-3 py-1.5 rounded-lg text-sm border border-[#3a3a5a]"
        >
          <option value="pnl">Sort by P&L</option>
          <option value="volume">Sort by Volume</option>
        </select>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-left text-gray-500 text-sm border-b border-[#2a2a3a]">
              <th className="p-4 font-medium">#</th>
              <th className="p-4 font-medium">Wallet</th>
              <th className="p-4 font-medium">Position</th>
              <th className="p-4 font-medium">P&L</th>
              <th className="p-4 font-medium">P&L %</th>
              <th className="p-4 font-medium">Volume (24h)</th>
              <th className="p-4 font-medium">Last Active</th>
            </tr>
          </thead>
          <tbody>
            {sortedData.map((whale) => (
              <tr
                key={whale.address}
                className="border-b border-[#2a2a3a] hover:bg-[#252540] transition-colors cursor-pointer"
              >
                <td className="p-4">
                  <span className="text-gray-400">#{whale.rank}</span>
                </td>
                <td className="p-4">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-gray-300 text-sm">
                      {whale.address.slice(0, 8)}...{whale.address.slice(-6)}
                    </span>
                    {whale.label && (
                      <span className="text-xs bg-[#2a2a40] text-amber-400 px-2 py-0.5 rounded">
                        {whale.label}
                      </span>
                    )}
                  </div>
                </td>
                <td className="p-4">
                  <span
                    className={`px-2 py-1 rounded text-xs font-medium ${
                      whale.position === 'long'
                        ? 'bg-green-500/20 text-green-400'
                        : whale.position === 'short'
                        ? 'bg-red-500/20 text-red-400'
                        : 'bg-gray-500/20 text-gray-400'
                    }`}
                  >
                    {whale.position.toUpperCase()}
                  </span>
                </td>
                <td className="p-4">
                  <span className={whale.pnl >= 0 ? 'text-green-400' : 'text-red-400'}>
                    ${whale.pnl.toLocaleString()}
                  </span>
                </td>
                <td className="p-4">
                  <span className={whale.pnlPercent >= 0 ? 'text-green-400' : 'text-red-400'}>
                    {whale.pnlPercent >= 0 ? '+' : ''}
                    {whale.pnlPercent.toFixed(2)}%
                  </span>
                </td>
                <td className="p-4 text-gray-300">
                  ${(whale.volume / 1000000).toFixed(2)}M
                </td>
                <td className="p-4 text-gray-400 text-sm">{whale.lastActive}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {sortedData.length === 0 && (
        <div className="p-8 text-center text-gray-500">
          No whales found matching the filter
        </div>
      )}
    </div>
  );
}