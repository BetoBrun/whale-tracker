interface StatsCardProps {
  title: string;
  value: string;
  change?: string;
  changeType?: 'positive' | 'negative' | 'neutral';
}

export function StatsCard({ title, value, change, changeType = 'neutral' }: StatsCardProps) {
  const changeColors = {
    positive: 'text-green-400',
    negative: 'text-red-400',
    neutral: 'text-gray-400',
  };

  return (
    <div className="bg-[#1e1e30] rounded-xl p-6 border border-[#2a2a3a]">
      <p className="text-gray-500 text-sm mb-2">{title}</p>
      <p className="text-2xl font-bold text-white">{value}</p>
      {change && (
        <p className={`text-sm mt-2 ${changeColors[changeType]}`}>
          {change}
        </p>
      )}
    </div>
  );
}