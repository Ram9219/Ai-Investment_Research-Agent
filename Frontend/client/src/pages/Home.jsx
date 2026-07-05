import { motion } from 'framer-motion';
import { useState } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import OverviewCard from '../components/OverviewCard';
import FinancialCards from '../components/FinancialCards';
import NewsSection from '../components/NewsSection';
import RecommendationCard from '../components/RecommendationCard';
import ProsCons from '../components/ProsCons';
import Reasoning from '../components/Reasoning';
import Charts from '../components/Charts';
import Loader from '../components/Loader';
import ErrorCard from '../components/ErrorCard';
import Footer from '../components/Footer';
import { useResearch } from '../hooks/useResearch';

const Home = () => {
  const [query, setQuery] = useState('');
  const { data, error, isLoading, analyzeCompany } = useResearch();

  const handleAnalyze = async (event) => {
    event.preventDefault();
    await analyzeCompany(query);
  };

  return (
    <div className="min-h-screen bg-bg text-white">
      <Navbar />
      <Hero query={query} onQueryChange={setQuery} onAnalyze={handleAnalyze} isLoading={isLoading} />

      <main className="mx-auto flex max-w-7xl flex-col gap-6 px-4 pb-16 sm:px-6 lg:px-8">
        {!data && !error && !isLoading && (
          <div className="rounded-[32px] border border-white/10 bg-slate-900/70 p-12 text-center shadow-soft">
            <h2 className="text-2xl font-semibold">Search a company to begin AI analysis.</h2>
            <p className="mt-3 text-slate-400">The interface will surface financial insights, news, and a recommendation once a company is analyzed.</p>
          </div>
        )}

        {isLoading && <Loader />}
        {error && (
          <ErrorCard
            title={error.includes('No publicly listed company') ? '⚠ Company not found' : 'Analysis unavailable'}
            message={error.includes('No publicly listed company') ? 'We couldn’t find any publicly listed company matching your search.' : error}
            subtitle={error.includes('No publicly listed company') ? 'Please try another company name and try again.' : null}
          />
        )}

        {data && !isLoading && (
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            <OverviewCard
              company={data.company}
              symbol={data.symbol}
              industry={data.industry}
              sector={data.sector}
              currentPrice={data.currentPrice}
            />

            <FinancialCards metricsData={data.metrics} />

            <div className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
              <NewsSection news={data.news} />
              <RecommendationCard recommendation={data.recommendation} isFallback={data.isFallback} />
            </div>

            <ProsCons pros={data.pros} cons={data.cons} isFallback={data.isFallback} />
            <Reasoning analysis={data.analysis} />
            <Charts chartData={data.chartData} />
          </motion.div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Home;
