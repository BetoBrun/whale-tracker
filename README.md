# Whale Tracker - Hyperliquid Smart Money Dashboard

Track smart money traders on Hyperliquid with real-time aggregation, FIFO matching, and TWAP detection.

## Features

- **Hyperliquid Info API Integration** - Type-safe client with rate limiting (4 req/s) and exponential backoff
- **Smart Money Detection** - Identify and track known whale wallets with labeled catalogs
- **Aggregation Engine** - Daily fills, round-trip detection, TWAP markers, and capital flow analysis
- **Real-time Dashboard** - Next.js 14 app with SWR for live updates

## Tech Stack

- Next.js 14 (App Router)
- TypeScript (strict mode)
- lightweight-charts (TradingView charts)
- SWR (real-time data fetching)
- Hyperliquid Info API

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

## Project Structure

```
whale-tracker/
├── app/                    # Next.js pages
│   ├── page.tsx            # Main dashboard
│   ├── smart-money/        # Smart money leaderboard
│   └── trader/[address]/   # Individual trader analysis
├── components/            # Reusable UI components
│   ├── Leaderboard.tsx
│   ├── AccountValueChart.tsx
│   └── TraderHeader.tsx
├── lib/
│   ├── hyperliquid/       # API client & types
│   └── aggregations/      # Data processing pipelines
└── data/                  # Static whale catalog
```

## API Endpoints

- `GET /api/leaderboard` - Top traders by P&L
- `GET /api/trader/[address]` - Individual trader data
- `GET /api/flow/[address]` - 90-day deposit/withdraw flow

## Roadmap

- [ ] Leaderboard with sorting by P&L
- [ ] Account value chart with lightweight-charts
- [ ] TWAP fill detection visualization
- [ ] Round-trip trade matching
- [ ] Telegram/Discord alerts

## License

MIT