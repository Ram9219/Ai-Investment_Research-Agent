import { useMemo } from 'react';
import { motion } from 'framer-motion';

const formatCurrency = (value) => {
  if (value === null || value === undefined || Number.isNaN(value)) {
    return 'N/A';
  }

  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 2
  }).format(value);
};

const Charts = ({ chartData }) => {
  const metrics = useMemo(() => {
    const values = Array.isArray(chartData) ? chartData : [];
    const resolvedValues = values.slice(0, 3);

    return resolvedValues.map((entry, index) => {
      const label = entry?.name || 'Metric';
      const value = Number(entry?.value ?? 0);
      const color = index === 0 ? '#3B82F6' : index === 1 ? '#22C55E' : '#EF4444';

      return {
        label,
        value,
        displayValue: formatCurrency(value),
        color
      };
    });
  }, [chartData]);

  const maxValue = Math.max(...metrics.map((item) => item.value || 0), 1);
  const currentPrice = metrics[0]?.value ?? null;
  const weekHigh = metrics[1]?.value ?? null;
  const weekLow = metrics[2]?.value ?? null;

  const belowHighPct = currentPrice !== null && weekHigh !== null && weekHigh > 0
    ? ((weekHigh - currentPrice) / weekHigh) * 100
    : null;
  const belowHighDiff = currentPrice !== null && weekHigh !== null
    ? weekHigh - currentPrice
    : null;
  const aboveLowPct = currentPrice !== null && weekLow !== null && weekLow > 0
    ? ((currentPrice - weekLow) / weekLow) * 100
    : null;
  const aboveLowDiff = currentPrice !== null && weekLow !== null
    ? currentPrice - weekLow
    : null;

  return (
    <div className="rounded-3xl border border-white/10 bg-slate-900/80 p-6 shadow-soft transition-all duration-300 hover:border-slate-400/20 hover:bg-slate-800/80">
      <div className="mb-5">
        <p className="text-sm uppercase tracking-[0.25em] text-slate-400">Stock Metrics</p>
        <h3 className="text-xl font-semibold">Momentum overview</h3>
      </div>

      <div className="space-y-4">
        {metrics.map((item) => (
          <div key={item.label} className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-300">{item.label}</span>
              <span className="font-medium text-white">{item.displayValue}</span>
            </div>
            <div className="h-3 overflow-hidden rounded-full bg-white/10">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${Math.max(6, (item.value / maxValue) * 100)}%` }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                className="h-full rounded-full"
                style={{ background: `linear-gradient(90deg, ${item.color}, ${item.color}cc)` }}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <div className="rounded-2xl border border-white/10 bg-slate-950/70 p-4">
          <p className="text-sm text-slate-400">Current Price vs 52W High</p>
          <p className="mt-2 text-lg font-semibold text-white">
            {belowHighPct !== null ? `${belowHighPct.toFixed(1)}% below` : 'N/A'}
          </p>
          <p className="mt-1 text-sm text-slate-400">
            {belowHighDiff !== null ? `${formatCurrency(belowHighDiff)} below the 52W high` : 'No comparison data'}
          </p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-slate-950/70 p-4">
          <p className="text-sm text-slate-400">Current Price vs 52W Low</p>
          <p className="mt-2 text-lg font-semibold text-white">
            {aboveLowPct !== null ? `${aboveLowPct.toFixed(1)}% above` : 'N/A'}
          </p>
          <p className="mt-1 text-sm text-slate-400">
            {aboveLowDiff !== null ? `${formatCurrency(aboveLowDiff)} above the 52W low` : 'No comparison data'}
          </p>
        </div>
      </div>

      <p className="mt-4 text-center text-xs text-slate-500">Stock prices are based on the latest available market data.</p>
    </div>
  );
};

export default Charts;
