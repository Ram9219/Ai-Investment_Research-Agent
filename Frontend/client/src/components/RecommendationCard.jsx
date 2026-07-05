import { motion } from 'framer-motion';

const getConfidenceColor = (value) => {
  if (value === null || value === undefined || Number.isNaN(value)) {
    return '#64748b';
  }

  if (value >= 80) {
    return '#22c55e';
  }

  if (value >= 50) {
    return '#eab308';
  }

  return '#ef4444';
};

const formatConfidence = (value) => {
  if (value === null || value === undefined || value === '') {
    return null;
  }

  const numericValue = Number(value);
  if (!Number.isFinite(numericValue)) {
    return null;
  }

  const normalizedValue = numericValue > 1 ? numericValue : numericValue * 100;
  return Math.max(0, Math.min(100, normalizedValue));
};

const RecommendationCard = ({ recommendation, isFallback }) => {
  const confidenceValue = formatConfidence(recommendation?.confidence);
  const confidenceColor = getConfidenceColor(confidenceValue);
  const actionColor =
    recommendation?.action === 'BUY'
      ? 'text-success border-success/20 bg-success/10'
      : recommendation?.action === 'SELL'
        ? 'text-danger border-danger/20 bg-danger/10'
        : 'text-warning border-warning/20 bg-warning/10';

  if (isFallback || recommendation == null || recommendation?.action == null || recommendation?.confidence == null) {
    return (
      <div className="group rounded-3xl border border-white/10 bg-slate-900/80 p-6 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:border-slate-400/20 hover:bg-slate-800/80">
        <p className="text-sm uppercase tracking-[0.25em] text-slate-400">AI Recommendation</p>
        <div className="mt-4 rounded-2xl border border-white/10 bg-slate-950/70 p-5">
          <p className="text-lg font-semibold text-slate-100">🤖 AI Analysis Unavailable</p>
          <p className="mt-3 text-sm leading-7 text-slate-300">
            AI recommendation could not be generated at the moment.
          </p>
          <div className="mt-4 rounded-2xl border border-white/10 bg-white/5 p-4">
            <p className="text-xs uppercase tracking-[0.25em] text-slate-400">Reasoning</p>
            <p className="mt-2 text-sm leading-7 text-slate-300">
              {recommendation?.reasoning || 'Reasoning is temporarily unavailable.'}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="group rounded-3xl border border-white/10 bg-slate-900/80 p-6 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:border-slate-400/20 hover:bg-slate-800/80">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
        <div className="flex-1">
          <p className="text-sm uppercase tracking-[0.25em] text-slate-400">AI Recommendation</p>
          <div className={`mt-3 inline-flex rounded-full border px-4 py-2 text-lg font-semibold ${actionColor}`}>
            {recommendation?.action}
          </div>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-300">{recommendation?.reasoning}</p>
        </div>
        <div className="flex items-center justify-center lg:justify-end">
          <div
            className="relative flex h-28 w-28 items-center justify-center rounded-full border border-white/10 bg-slate-950/70 p-2"
            aria-label={confidenceValue === null ? 'Confidence unavailable' : `Confidence ${confidenceValue}%`}
          >
            <svg viewBox="0 0 120 120" className="h-24 w-24 -rotate-90">
              <circle cx="60" cy="60" r="40" stroke="rgba(255,255,255,0.12)" strokeWidth="10" fill="none" />
              <motion.circle
                cx="60"
                cy="60"
                r="40"
                stroke={confidenceColor}
                strokeWidth="10"
                strokeLinecap="round"
                fill="none"
                initial={{ strokeDasharray: 251, strokeDashoffset: 251 }}
                animate={{ strokeDasharray: 251, strokeDashoffset: 251 - (251 * (confidenceValue ?? 0)) / 100 }}
                transition={{ duration: 1.2, ease: 'easeOut' }}
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="rounded-full bg-slate-900/90 px-3 py-2 text-center">
                <p className="text-[10px] uppercase tracking-[0.25em] text-slate-400">Confidence</p>
                <p className="text-lg font-semibold text-white">{confidenceValue === null ? 'N/A' : `${confidenceValue}%`}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecommendationCard;
