import { useMemo, useState } from 'react';
import { BarChart, Bar, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid, LabelList } from 'recharts';

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
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const data = useMemo(() => {
    const values = Array.isArray(chartData) ? chartData : [];
    const resolvedValues = values.slice(0, 3);

    const metrics = resolvedValues.map((entry, index) => {
      const label = entry?.name || 'Metric';
      const value = Number(entry?.value ?? 0);
      const color = index === 0 ? '#3B82F6' : index === 1 ? '#22C55E' : '#EF4444';

      return {
        label,
        value,
        displayValue: formatCurrency(value),
        color,
        key: index
      };
    });

    const maxValue = Math.max(...metrics.map((item) => item.value || 0), 1);

    return metrics.map((item) => ({ ...item, normalizedValue: (item.value / maxValue) * 100 }));
  }, [chartData]);

  const currentPrice = data[0]?.value ?? null;
  const weekHigh = data[1]?.value ?? null;
  const weekLow = data[2]?.value ?? null;

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

  const renderBar = (props) => {
    const { x, y, width, height, fill, payload, index } = props;
    const isHovered = hoveredIndex === index;

    return (
      <g>
        <rect
          x={x}
          y={y}
          width={width}
          height={height}
          rx={10}
          ry={10}
          fill={payload?.color || fill}
          opacity={isHovered ? 1 : 0.95}
          transform={isHovered ? 'translate(0, -3)' : 'translate(0, 0)'}
          style={{ transition: 'all 200ms ease' }}
          onMouseEnter={() => setHoveredIndex(index)}
          onMouseLeave={() => setHoveredIndex(null)}
        />
      </g>
    );
  };

  return (
    <div className="rounded-3xl border border-white/10 bg-slate-900/80 p-6 shadow-soft">
      <div className="mb-5">
        <p className="text-sm uppercase tracking-[0.25em] text-slate-400">Stock Metrics</p>
        <h3 className="text-xl font-semibold">Momentum overview</h3>
      </div>

      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} layout="vertical" barCategoryGap={18} margin={{ top: 8, right: 24, bottom: 8, left: 8 }}>
            <CartesianGrid stroke="rgba(255,255,255,0.08)" horizontal={true} vertical={false} />
            <XAxis type="number" domain={[0, 100]} hide />
            <YAxis
              dataKey="label"
              type="category"
              axisLine={false}
              tickLine={false}
              width={120}
              tick={{ fill: '#94a3b8', fontSize: 12 }}
            />
            <Tooltip
              cursor={{ fill: 'rgba(255,255,255,0.04)' }}
              formatter={(value, name, props) => props?.payload?.displayValue || value}
            />
            <Bar dataKey="normalizedValue" radius={[0, 12, 12, 0]} barSize={24} shape={renderBar}>
              <LabelList dataKey="displayValue" position="right" offset={8} fill="#e2e8f0" fontSize={12} />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
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
