import { useEffect, useRef } from 'react';

export interface AccountValueChartProps {
  data: Array<{ time: number; value: number }>;
  width?: number;
  height?: number;
}

export function AccountValueChart({ data, width = 600, height = 300 }: AccountValueChartProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<unknown>(null);

  useEffect(() => {
    if (!containerRef.current || data.length === 0) return;

    const initChart = async () => {
      const { createChart } = await import('lightweight-charts');
      
      if (chartRef.current) {
        (chartRef.current as { destroy: () => void }).destroy();
      }

      const chart = createChart(containerRef.current!, {
        width,
        height,
        layout: {
          background: { color: '#111827' },
          textColor: '#9CA3AF',
        },
        grid: {
          vertLines: { color: '#1F2937' },
          horzLines: { color: '#1F2937' },
        },
        crosshair: {
          mode: 0,
        },
        timeScale: {
          borderColor: '#374151',
        },
      });

      const areaSeries = chart.addAreaSeries({
        lineColor: '#F59E0B',
        topColor: 'rgba(245, 158, 11, 0.2)',
        bottomColor: 'rgba(245, 158, 11, 0.0)',
      });

      areaSeries.setData(
        data.map((d) => ({
          time: Math.floor(d.time / 1000) as import('lightweight-charts').Time,
          value: d.value,
        }))
      );

      chart.timeScale().fitContent();
      chartRef.current = chart;
    };

    initChart();

    return () => {
      if (chartRef.current) {
        (chartRef.current as { destroy: () => void }).destroy();
      }
    };
  }, [data, width, height]);

  return <div ref={containerRef} className="rounded-lg overflow-hidden" />;
}