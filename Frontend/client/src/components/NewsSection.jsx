import { FiArrowUpRight } from 'react-icons/fi';

const NewsSection = ({ news }) => {
  return (
    <div className="rounded-3xl border border-white/10 bg-slate-900/80 p-6 shadow-soft">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.25em] text-slate-400">Latest News</p>
          <h3 className="text-xl font-semibold">Recent market developments</h3>
        </div>
      </div>
      <div className="space-y-3">
        {news?.map((article) => (
          <div key={article.title} className="flex items-start justify-between rounded-2xl border border-white/10 bg-white/5 p-4">
            <div>
              <p className="font-medium text-white">{article.title}</p>
              <div className="mt-2 flex flex-wrap gap-3 text-sm text-slate-400">
                <span>{article.source}</span>
                <span>•</span>
                <span>{article.publishedAt}</span>
              </div>
            </div>
            <button className="rounded-full border border-white/10 bg-white/5 p-2 transition hover:bg-white/10">
              <FiArrowUpRight />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewsSection;
