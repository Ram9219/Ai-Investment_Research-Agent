import { motion } from 'framer-motion';

const Loader = () => {
  return (
    <div className="rounded-3xl border border-white/10 bg-slate-900/80 p-8 shadow-soft">
      <div className="flex items-center gap-4">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1.2, repeat: Infinity, ease: 'linear' }}
          className="h-12 w-12 rounded-full border-2 border-blue-400/30 border-t-blue-400"
        />
        <div>
          <p className="text-lg font-semibold">Gathering market context</p>
          <p className="text-sm text-slate-400">Fetching financial signals, news, and AI reasoning…</p>
        </div>
      </div>
    </div>
  );
};

export default Loader;
