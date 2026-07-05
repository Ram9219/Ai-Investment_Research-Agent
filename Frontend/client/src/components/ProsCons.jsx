import { FiCheckCircle, FiXCircle } from 'react-icons/fi';

const ProsCons = ({ pros, cons, isFallback }) => {
  if (isFallback) {
    return (
      <div className="rounded-3xl border border-white/10 bg-slate-900/80 p-6 shadow-soft">
        <h3 className="text-lg font-semibold">AI Insights</h3>
        <p className="mt-3 text-sm leading-7 text-slate-300">AI insights are currently unavailable.</p>
      </div>
    );
  }

  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <div className="rounded-3xl border border-emerald-500/20 bg-emerald-500/10 p-6 shadow-soft">
        <div className="mb-4 flex items-center gap-2">
          <FiCheckCircle className="text-emerald-400" />
          <h3 className="text-lg font-semibold">Pros</h3>
        </div>
        <ul className="space-y-3 text-sm text-slate-200">
          {pros?.map((item) => (
            <li key={item} className="rounded-2xl border border-emerald-400/10 bg-white/5 p-3">
              {item}
            </li>
          ))}
        </ul>
      </div>
      <div className="rounded-3xl border border-red-500/20 bg-red-500/10 p-6 shadow-soft">
        <div className="mb-4 flex items-center gap-2">
          <FiXCircle className="text-red-400" />
          <h3 className="text-lg font-semibold">Cons</h3>
        </div>
        <ul className="space-y-3 text-sm text-slate-200">
          {cons?.map((item) => (
            <li key={item} className="rounded-2xl border border-red-400/10 bg-white/5 p-3">
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ProsCons;
