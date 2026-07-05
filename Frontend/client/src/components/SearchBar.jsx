import { motion } from 'framer-motion';
import { FiArrowRight, FiSearch } from 'react-icons/fi';

const SearchBar = ({ value, onChange, onSubmit, isLoading }) => {
  return (
    <form onSubmit={onSubmit} className="mx-auto w-full max-w-3xl">
      <div className="rounded-[28px] border border-white/10 bg-slate-900/80 p-2 shadow-soft backdrop-blur-xl">
        <div className="flex flex-col gap-3 rounded-[24px] border border-white/10 bg-slate-950/80 p-3 sm:flex-row sm:items-center">
          <div className="flex flex-1 items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
            <FiSearch className="text-slate-400" />
            <input
              value={value}
              onChange={(e) => onChange(e.target.value)}
              placeholder="Search company..."
              className="w-full bg-transparent text-base outline-none placeholder:text-slate-500"
            />
          </div>
          <motion.button
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={isLoading}
            className="flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-blue-500 to-indigo-600 px-5 py-3 font-semibold text-white transition disabled:cursor-not-allowed disabled:opacity-70"
          >
            <FiArrowRight />
            {isLoading ? 'Analyzing...' : 'Analyze'}
          </motion.button>
        </div>
        <div className="mt-3 flex flex-wrap gap-2 px-2 text-sm text-slate-400">
          {['Tesla', 'Apple', 'Microsoft', 'NVIDIA'].map((example) => (
            <button
              key={example}
              type="button"
              onClick={() => onChange(example)}
              className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 transition hover:border-blue-400/30 hover:text-white"
            >
              {example}
            </button>
          ))}
        </div>
      </div>
    </form>
  );
};

export default SearchBar;
