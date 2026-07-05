const tooltipText = {
  'Market Cap': 'The total market value of a company\'s outstanding shares.',
  'Pe Ratio': 'The stock price divided by earnings per share.',
  'Eps': 'Earnings per share for the most recent period.',
  'Profit Margin': 'The percentage of revenue that becomes profit.'
};

const FinancialCards = ({ metricsData }) => {
  const items = Object.entries(metricsData || {}).map(([key, value]) => ({
    label: key.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase()),
    value
  }));

  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {items.map((item) => (
        <div
          key={item.label}
          className="rounded-3xl border border-white/10 bg-slate-900/80 p-5 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:border-slate-400/20 hover:bg-slate-800/80"
          title={tooltipText[item.label] || ''}
          aria-label={item.label}
        >
          <p className="text-sm text-slate-400">{item.label}</p>
          <p className="mt-2 text-xl font-semibold text-white">{item.value}</p>
        </div>
      ))}
    </div>
  );
};

export default FinancialCards;
