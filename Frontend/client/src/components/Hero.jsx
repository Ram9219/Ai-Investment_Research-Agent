import { motion } from 'framer-motion';
import SearchBar from './SearchBar';

const Hero = ({ query, onQueryChange, onAnalyze, isLoading }) => {
  return (
    <section className="mx-auto flex max-w-7xl flex-col items-center px-4 py-20 text-center sm:px-6 lg:px-8 lg:py-24">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl"
      >
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-400/20 bg-blue-500/10 px-3 py-1 text-sm text-blue-200">
          <span className="h-2 w-2 rounded-full bg-blue-400" />
          AI-powered financial research
        </div>
        <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-7xl">
          AI Investment Research Agent
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-400 sm:text-xl">
          Analyze any public company using AI-powered financial research, market context, and concise investment guidance.
        </p>
        <div className="mt-10">
          <SearchBar value={query} onChange={onQueryChange} onSubmit={onAnalyze} isLoading={isLoading} />
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
