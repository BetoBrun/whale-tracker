import { ReactNode } from 'react';

export const metadata = {
  title: 'Whale Tracker - Hyperliquid Smart Money',
  description: 'Track smart money traders on Hyperliquid',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-900 text-white">{children}</body>
    </html>
  );
}