const Reasoning = ({ analysis }) => {
  return (
    <div className="rounded-3xl border border-white/10 bg-slate-900/80 p-6 shadow-soft">
      <p className="text-sm uppercase tracking-[0.25em] text-slate-400">AI Reasoning</p>
      <div className="mt-4 space-y-3 rounded-2xl border border-white/10 bg-slate-950/70 p-5">
        {analysis?.map((point) => (
          <div key={point} className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm leading-7 text-slate-300">
            {point}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Reasoning;
