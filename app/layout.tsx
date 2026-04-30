import { ReactNode } from 'react';

export const metadata = {
  title: 'Whale Tracker | Hyperliquid',
  description: 'Monitor whale positions on Hyperliquid in real-time. Track entries, exits, PnL and open orders of top traders.',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className="bg-[#0f0f1a] text-white antialiased">
        {children}
      </body>
    </html>
  );
}