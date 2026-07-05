import { useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { FiArrowDown, FiCpu, FiFileText, FiGlobe, FiSearch, FiZap, FiX } from 'react-icons/fi';

const workflowSteps = [
  {
    title: 'Fetch Company Financial Data',
    subtitle: 'Yahoo Finance',
    icon: <FiSearch />
  },
  {
    title: 'Collect Latest News',
    subtitle: 'GNews API',
    icon: <FiGlobe />
  },
  {
    title: 'LangGraph Orchestration',
    subtitle: 'Multi-step reasoning flow',
    icon: <FiCpu />
  },
  {
    title: 'AI Decision Engine',
    subtitle: 'Gemini + LangGraph',
    icon: <FiZap />
  },
  {
    title: 'Generate Investment Report',
    subtitle: 'Structured recommendation',
    icon: <FiFileText />
  }
];

const techBadges = ['React', 'Express', 'LangGraph', 'Gemini', 'Yahoo Finance', 'GNews'];

const WorkflowModal = ({ isOpen, onClose }) => {
  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 px-4 py-6 backdrop-blur-md"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.98 }}
            transition={{ duration: 0.2 }}
            className="relative w-full max-w-3xl rounded-[28px] border border-white/10 bg-slate-900/85 p-5 shadow-soft backdrop-blur-xl sm:p-8"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              onClick={onClose}
              className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 transition hover:bg-white/10"
              aria-label="Close workflow modal"
            >
              <FiX />
            </button>

            <div className="pr-10">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-400/20 bg-blue-500/10 px-3 py-1 text-sm text-blue-200">
                <FiZap />
                AI Research Pipeline
              </div>
              <h2 className="text-2xl font-semibold text-white sm:text-3xl">⚡ AI Research Pipeline</h2>
              <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-400 sm:text-base">
                This application uses a LangGraph-powered AI agent to analyze public companies and produce an investment brief.
              </p>
            </div>

            <div className="mt-8 space-y-3">
              {workflowSteps.map((step, index) => (
                <div key={step.title} className="flex flex-col items-center gap-2">
                  <div className="flex w-full items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-3 sm:p-4">
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500/20 to-indigo-600/20 text-blue-200">
                      {step.icon}
                    </div>
                    <div>
                      <p className="font-medium text-white">{step.title}</p>
                      <p className="text-sm text-slate-400">{step.subtitle}</p>
                    </div>
                  </div>
                  {index < workflowSteps.length - 1 && (
                    <div className="flex items-center justify-center py-1 text-slate-500">
                      <FiArrowDown />
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap gap-2">
              {techBadges.map((badge) => (
                <span key={badge} className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-sm text-slate-300">
                  {badge}
                </span>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default WorkflowModal;
