export interface TraderHeaderProps {
  address: string;
  label?: string;
  pnl?: string;
  volume?: string;
}

export function TraderHeader({ address, label, pnl, volume }: TraderHeaderProps) {
  return (
    <div className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
      <div>
        <h2 className="text-xl font-bold">{label || 'Unknown'}</h2>
        <p className="font-mono text-sm text-gray-400">{address}</p>
      </div>
      <div className="text-right">
        <p className="text-sm text-gray-400">P&L</p>
        <p className="text-2xl font-bold">{pnl || '0'}</p>
      </div>
    </div>
  );
}