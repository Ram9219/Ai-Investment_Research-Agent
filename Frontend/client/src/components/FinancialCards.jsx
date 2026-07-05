const metrics = [
  { label: 'Market Cap', value: '$790.2B' },
  { label: 'PE Ratio', value: '44.8x' },
  { label: 'EPS', value: '$5.54' },
  { label: 'Revenue', value: '$97.7B' },
  { label: 'Profit Margin', value: '12.4%' },
  { label: '52W High', value: '$299.29' },
  { label: '52W Low', value: '$138.80' }
];

const FinancialCards = ({ metricsData }) => {
  const items = Object.entries(metricsData || {}).map(([key, value]) => ({
    label: key.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase()),
    value
  }));

  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {items.map((item) => (
        <div key={item.label} className="rounded-3xl border border-white/10 bg-slate-900/80 p-5 shadow-soft">
          <p className="text-sm text-slate-400">{item.label}</p>
          <p className="mt-2 text-xl font-semibold text-white">{item.value}</p>
        </div>
      ))}
    </div>
  );
};

export default FinancialCards;
