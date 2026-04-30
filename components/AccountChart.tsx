'use client';

import { useEffect, useRef } from 'react';
import { createChart, IChartApi, ISeriesApi, CandlestickData, Time } from 'lightweight-charts';

interface AccountChartProps {
  data: Array<{ time: string; open: number; high: number; low: number; close: number }>;
}

export function AccountChart({ data }: AccountChartProps) {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<IChartApi | null>(null);
  const seriesRef = useRef<ISeriesApi<'Candlestick'> | null>(null);

  useEffect(() => {
    if (!chartContainerRef.current) return;

    const chart = createChart(chartContainerRef.current, {
      layout: {
        background: { color: '#1e1e30' },
        textColor: '#888',
      },
      grid: {
        vertLines: { color: '#2a2a3a' },
        horzLines: { color: '#2a2a3a' },
      },
      width: chartContainerRef.current.clientWidth,
      height: 400,
      timeScale: {
        timeVisible: true,
        secondsVisible: false,
      },
    });

    const candlestickSeries = chart.addCandlestickSeries({
      upColor: '#00d4aa',
      downColor: '#ff4757',
      borderUpColor: '#00d4aa',
      borderDownColor: '#ff4757',
      wickUpColor: '#00d4aa',
      wickDownColor: '#ff4757',
    });

    const chartData: CandlestickData<Time>[] = data.map((d) => ({
      time: d.time as Time,
      open: d.open,
      high: d.high,
      low: d.low,
      close: d.close,
    }));

    candlestickSeries.setData(chartData);

    chart.timeScale().fitContent();

    chartRef.current = chart;
    seriesRef.current = candlestickSeries;

    const handleResize = () => {
      if (chartContainerRef.current) {
        chart.applyOptions({
          width: chartContainerRef.current.clientWidth,
        });
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      chart.remove();
    };
  }, [data]);

  return (
    <div className="bg-[#1e1e30] rounded-xl border border-[#2a2a3a] p-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-white">BTC/USDD Price</h2>
        <div className="flex gap-2">
          <button className="px-3 py-1 bg-[#2a2a40] text-gray-400 rounded text-sm hover:bg-[#3a3a50]">1H</button>
          <button className="px-3 py-1 bg-amber-500 text-black rounded text-sm font-medium">4H</button>
          <button className="px-3 py-1 bg-[#2a2a40] text-gray-400 rounded text-sm hover:bg-[#3a3a50]">1D</button>
        </div>
      </div>
      <div ref={chartContainerRef} className="w-full" />
    </div>
  );
}