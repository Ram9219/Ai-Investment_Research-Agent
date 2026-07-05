import { motion } from 'framer-motion';

const RecommendationCard = ({ recommendation, isFallback }) => {
  const actionColor =
    recommendation?.action === 'BUY'
      ? 'text-success border-success/20 bg-success/10'
      : recommendation?.action === 'SELL'
        ? 'text-danger border-danger/20 bg-danger/10'
        : 'text-warning border-warning/20 bg-warning/10';

  if (isFallback || recommendation == null || (recommendation?.action == null && recommendation?.confidence == null)) {
    return (
      <div className="rounded-3xl border border-white/10 bg-slate-900/80 p-6 shadow-soft">
        <p className="text-sm uppercase tracking-[0.25em] text-slate-400">AI Recommendation</p>
        <div className="mt-4 rounded-2xl border border-white/10 bg-slate-950/70 p-5">
          <p className="text-lg font-semibold text-slate-100">🤖 AI Analysis Temporarily Unavailable</p>
          <p className="mt-3 text-sm leading-7 text-slate-300">
            AI recommendation could not be generated at the moment.
          </p>
          <p className="mt-2 text-sm leading-7 text-slate-300">
            Financial data and recent news are still available.
          </p>
          <p className="mt-2 text-sm leading-7 text-slate-300">
            Please try again later.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-3xl border border-white/10 bg-slate-900/80 p-6 shadow-soft">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.25em] text-slate-400">AI Recommendation</p>
          <div className={`mt-3 inline-flex rounded-full border px-4 py-2 text-lg font-semibold ${actionColor}`}>
            {recommendation?.action}
          </div>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-300">{recommendation?.reasoning}</p>
        </div>
        <div className="flex items-center gap-6">
          <div className="relative flex h-28 w-28 items-center justify-center rounded-full border border-white/10 bg-slate-950/70">
            <motion.div
              initial={{ strokeDashoffset: 251 }}
              animate={{ strokeDashoffset: 251 - (251 * (recommendation?.confidence || 0)) / 100 }}
              transition={{ duration: 1.2 }}
              className="h-24 w-24 rounded-full"
              style={{
                background: `conic-gradient(#3B82F6 ${(recommendation?.confidence || 0) * 3.6}deg, rgba(255,255,255,0.08) 0deg)`
              }}
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="rounded-full bg-slate-900/90 p-4 text-center">
                <p className="text-xs text-slate-400">Confidence</p>
                <p className="text-xl font-semibold">{recommendation?.confidence}%</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecommendationCard;
