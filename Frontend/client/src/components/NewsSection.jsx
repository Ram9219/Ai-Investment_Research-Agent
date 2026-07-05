import { FiArrowUpRight } from 'react-icons/fi';

const NewsSection = ({ news }) => {
  const hasNews = Array.isArray(news) && news.length > 0;

  return (
    <div className="rounded-3xl border border-white/10 bg-slate-900/80 p-6 shadow-soft transition-all duration-300 hover:border-slate-400/20 hover:bg-slate-800/80">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.25em] text-slate-400">Latest News</p>
          <h3 className="text-xl font-semibold">Recent market developments</h3>
        </div>
      </div>
      {hasNews ? (
        <div className="space-y-3">
          {news.map((article) => (
            <div key={article.title} className="flex items-start justify-between gap-3 rounded-2xl border border-white/10 bg-white/5 p-4 transition hover:bg-white/10">
              <div>
                <p className="font-medium text-white">{article.title}</p>
                <div className="mt-2 flex flex-wrap gap-3 text-sm text-slate-400">
                  <span>{article.source}</span>
                  <span>•</span>
                  <span>{article.publishedAt}</span>
                </div>
              </div>
              <button type="button" className="rounded-full border border-white/10 bg-white/5 p-2 transition hover:bg-white/10" aria-label={`Open article: ${article.title}`}>
                <FiArrowUpRight />
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-white/10 bg-slate-950/70 p-6 text-center">
          <p className="text-lg font-semibold text-slate-100">News unavailable</p>
          <p className="mt-2 text-sm leading-7 text-slate-400">Recent market updates are not available right now.</p>
        </div>
      )}
    </div>
  );
};

export default NewsSection;
