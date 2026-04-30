import Link from 'next/link';

const navItems = [
  { href: '/', icon: '📊', label: 'Pools' },
  { href: '/earn', icon: '💰', label: 'Earn' },
  { href: '/learn', icon: '🎓', label: 'Learn' },
  { href: '/lend', icon: '🧮', label: 'Lend Simulator' },
  { href: '/liquidity-calc', icon: '🧮', label: 'Liquidity Calculator' },
  { href: '/stake', icon: '🏛️', label: 'Stake' },
  { href: '/whale-tracker', icon: '🐋', label: 'Whale Tracker', pro: true },
  { href: '/bitcoin-lab', icon: '₿', label: 'Bitcoin Lab', pro: true },
];

export function Sidebar() {
  return (
    <aside className="w-64 bg-[#0f0f1a] border-r border-[#2a2a3a] min-h-screen flex flex-col">
      <div className="p-4 border-b border-[#2a2a3a]">
        <Link href="/" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-amber-500 to-yellow-400 flex items-center justify-center">
            <span className="text-xl">🐋</span>
          </div>
          <div>
            <h1 className="font-bold text-white">Whale Tracker</h1>
            <p className="text-xs text-gray-500">Hyperliquid Analytics</p>
          </div>
        </Link>
      </div>

      <nav className="flex-1 p-4">
        <div className="text-xs text-gray-500 mb-2 px-2 uppercase tracking-wider">Navigation</div>
        <ul className="space-y-1">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-[#1e1e30] transition-colors ${
                  item.href === '/whale-tracker' ? 'bg-[#1e1e30] text-white' : 'text-gray-400'
                }`}
              >
                <span>{item.icon}</span>
                <span className="text-sm">{item.label}</span>
                {item.pro && (
                  <span className="ml-auto text-xs bg-gradient-to-r from-amber-500 to-yellow-400 text-black px-1.5 py-0.5 rounded font-bold">
                    PRO
                  </span>
                )}
              </Link>
            </li>
          ))}
        </ul>

        <div className="mt-6">
          <div className="text-xs text-gray-500 mb-2 px-2 uppercase tracking-wider">Pro</div>
          <Link
            href="/pro"
            className="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-400 hover:bg-[#1e1e30] transition-colors"
          >
            <span>👑</span>
            <span className="text-sm">Pro Plan</span>
          </Link>
        </div>
      </nav>

      <div className="p-4 border-t border-[#2a2a3a]">
        <button className="w-full bg-gradient-to-r from-amber-500 to-yellow-400 text-black font-semibold py-2 px-4 rounded-lg hover:opacity-90 transition-opacity">
          Connect Wallet
        </button>
      </div>
    </aside>
  );
}