export interface LeaderboardProps {
  data: Array<{
    address: string;
    pnl: string;
    volume: string;
    rank: number;
  }>;
}

export function Leaderboard({ data }: LeaderboardProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="text-left text-gray-400 border-b border-gray-700">
            <th className="p-3">Rank</th>
            <th className="p-3">Address</th>
            <th className="p-3">P&L</th>
            <th className="p-3">Volume</th>
          </tr>
        </thead>
        <tbody>
          {data.map((trader) => (
            <tr key={trader.address} className="border-b border-gray-800 hover:bg-gray-800">
              <td className="p-3">#{trader.rank}</td>
              <td className="p-3 font-mono text-sm">
                {trader.address.slice(0, 10)}...
              </td>
              <td className="p-3">{trader.pnl}</td>
              <td className="p-3">{trader.volume}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}