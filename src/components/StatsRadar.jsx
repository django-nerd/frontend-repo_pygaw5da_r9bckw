import React, { useEffect, useRef } from 'react';
import { Chart, RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend } from 'chart.js';

Chart.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

export default function StatsRadar({ stats }) {
  const canvasRef = useRef(null);
  const chartRef = useRef(null);

  useEffect(() => {
    const ctx = canvasRef.current.getContext('2d');
    if (chartRef.current) chartRef.current.destroy();

    const gradient = ctx.createLinearGradient(0, 0, 0, 300);
    gradient.addColorStop(0, 'rgba(248, 113, 113, 0.6)'); // red-400
    gradient.addColorStop(1, 'rgba(190, 18, 60, 0.2)'); // rose-700

    chartRef.current = new Chart(ctx, {
      type: 'radar',
      data: {
        labels: ['Health', 'Productivity', 'Social', 'Personal Growth', 'Fitness', 'Knowledge'],
        datasets: [
          {
            label: 'Progress',
            data: [
              stats.Health || 0,
              stats.Productivity || 0,
              stats.Social || 0,
              stats['Personal Growth'] || 0,
              stats.Fitness || 0,
              stats.Knowledge || 0,
            ],
            backgroundColor: gradient,
            borderColor: 'rgb(248, 113, 113)',
            borderWidth: 2,
            pointBackgroundColor: 'rgb(248, 113, 113)',
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: { labels: { color: '#fecaca' } },
          tooltip: { enabled: true },
        },
        scales: {
          r: {
            angleLines: { color: 'rgba(255,255,255,0.2)' },
            grid: { color: 'rgba(255,255,255,0.15)' },
            pointLabels: { color: '#fecaca' },
            ticks: { display: false, beginAtZero: true, maxTicksLimit: 5 },
            suggestedMin: 0,
            suggestedMax: 100,
          },
        },
      },
    });

    return () => {
      if (chartRef.current) chartRef.current.destroy();
    };
  }, [stats]);

  return (
    <section className="mx-auto w-full max-w-6xl px-4 mt-8">
      <div className="rounded-2xl border border-red-500/30 bg-black/60 p-5">
        <h2 className="text-white font-bold text-lg">Progress Overview</h2>
        <div className="mt-4">
          <canvas ref={canvasRef} height={320} />
        </div>
      </div>
    </section>
  );
}
