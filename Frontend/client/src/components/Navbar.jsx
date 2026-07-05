import { useState } from 'react';
import { FiGithub, FiCpu, FiZap } from 'react-icons/fi';
import WorkflowModal from './WorkflowModal';

const Navbar = () => {
  const [isWorkflowOpen, setIsWorkflowOpen] = useState(false);

  return (
    <>
      <nav className="sticky top-0 z-20 border-b border-white/10 bg-slate-950/70 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 shadow-soft">
              <FiCpu className="text-xl" />
            </div>
            <div>
              <p className="text-lg font-semibold tracking-tight">AI Investment Research Agent</p>
              <p className="text-sm text-slate-400">Premium AI Research Workspace</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsWorkflowOpen(true)}
              className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-slate-200 transition duration-200 hover:-translate-y-0.5 hover:bg-white/10"
            >
              <FiZap className="text-blue-300" />
              AI Workflow
            </button>
            <a
              href="https://github.com/Ram9219/Ai-Investment_Research-Agent.git"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 rounded-full border border-blue-400/20 bg-blue-500/10 px-4 py-2 text-sm font-medium text-slate-100 shadow-[0_0_0_1px_rgba(59,130,246,0.08)] transition duration-200 hover:-translate-y-0.5 hover:border-blue-400/40 hover:bg-blue-500/20"
            >
              <FiGithub />
              GitHub
            </a>
          </div>
        </div>
      </nav>

      <WorkflowModal isOpen={isWorkflowOpen} onClose={() => setIsWorkflowOpen(false)} />
    </>
  );
};

export default Navbar;
