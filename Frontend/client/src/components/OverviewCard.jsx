const OverviewCard = ({ company, symbol, industry, sector, currentPrice }) => {
  return (
    <div className="rounded-3xl border border-white/10 bg-slate-900/80 p-6 shadow-soft backdrop-blur-xl">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm uppercase tracking-[0.25em] text-slate-400">Company Overview</p>
          <h3 className="mt-2 text-2xl font-semibold">{company}</h3>
          <div className="mt-4 flex flex-wrap gap-2 text-sm text-slate-400">
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">{symbol}</span>
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">{industry}</span>
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">{sector}</span>
          </div>
        </div>
        <div className="rounded-2xl border border-blue-400/20 bg-blue-500/10 px-4 py-3 text-right">
          <p className="text-sm text-slate-400">Current Price</p>
          <p className="text-2xl font-semibold text-blue-300">{currentPrice}</p>
        </div>
      </div>
    </div>
  );
};

export default OverviewCard;
