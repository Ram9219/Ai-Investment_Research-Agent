import axios from 'axios';

const client = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000',
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json'
  }
});

const parseNumericValue = (value) => {
  if (value === null || value === undefined || value === '') {
    return null;
  }

  if (typeof value === 'number') {
    return Number.isFinite(value) ? value : null;
  }

  const normalized = String(value).replace(/[$,%]/g, '').trim();
  const parsed = Number(normalized);
  return Number.isFinite(parsed) ? parsed : null;
};

const formatCurrency = (value) => {
  const numericValue = parseNumericValue(value);
  if (numericValue === null) {
    return 'N/A';
  }

  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: numericValue >= 1000 ? 0 : 2
  }).format(numericValue);
};

const formatCompactNumber = (value) => {
  const numericValue = parseNumericValue(value);
  if (numericValue === null) {
    return 'N/A';
  }

  return new Intl.NumberFormat('en-US', {
    notation: 'compact',
    maximumFractionDigits: 1
  }).format(numericValue);
};

const formatRatio = (value) => {
  const numericValue = parseNumericValue(value);
  if (numericValue === null) {
    return 'N/A';
  }

  return `${numericValue.toFixed(2)}x`;
};

const formatPercent = (value) => {
  const numericValue = parseNumericValue(value);
  if (numericValue === null) {
    return 'N/A';
  }

  return `${(numericValue * 100).toFixed(1)}%`;
};

const normalizeRecommendation = (action, isFallback = false) => {
  if (isFallback || action === null || action === undefined || action === '') {
    return null;
  }

  const normalized = String(action).toUpperCase();
  if (normalized === 'BUY' || normalized === 'SELL') {
    return normalized;
  }

  return 'HOLD';
};

const normalizeConfidence = (confidence, isFallback = false) => {
  if (isFallback || confidence === null || confidence === undefined || confidence === '') {
    return null;
  }

  const numericValue = Number(confidence);
  return Number.isFinite(numericValue) ? numericValue : null;
};

const normalizeResearchResponse = (payload, companyName) => {
  const backendData = payload?.data ?? payload;
  const financialData = backendData?.financialData ?? {};
  const analysis = backendData?.analysis ?? {};
  const news = Array.isArray(backendData?.news) ? backendData.news : [];
  const isFallback = Boolean(backendData?.isFallback);

  const currentPrice = parseNumericValue(financialData.currentPrice);
  const weekHigh = parseNumericValue(financialData.fiftyTwoWeekHigh);
  const weekLow = parseNumericValue(financialData.fiftyTwoWeekLow);

  return {
    company: financialData.companyName || companyName || 'Unknown Company',
    symbol: financialData.symbol || 'N/A',
    industry: financialData.industry || 'N/A',
    sector: financialData.sector || 'N/A',
    currentPrice: currentPrice !== null ? formatCurrency(currentPrice) : 'N/A',
    metrics: {
      marketCap: financialData.marketCap != null ? formatCompactNumber(financialData.marketCap) : 'N/A',
      peRatio: financialData.peRatio != null ? formatRatio(financialData.peRatio) : 'N/A',
      eps: financialData.eps != null ? formatCurrency(financialData.eps) : 'N/A',
      revenue: financialData.revenue != null ? formatCompactNumber(financialData.revenue) : 'N/A',
      profitMargin: financialData.profitMargin != null ? formatPercent(financialData.profitMargin) : 'N/A',
      weekHigh: weekHigh !== null ? formatCurrency(weekHigh) : 'N/A',
      weekLow: weekLow !== null ? formatCurrency(weekLow) : 'N/A'
    },
    recommendation: isFallback
      ? null
      : {
          action: normalizeRecommendation(analysis?.recommendation, isFallback),
          confidence: normalizeConfidence(analysis?.confidence, isFallback),
          reasoning: analysis?.reasoning || 'No reasoning available.'
        },
    isFallback,
    pros: Array.isArray(analysis?.pros) ? analysis.pros : [],
    cons: Array.isArray(analysis?.cons) ? analysis.cons : [],
    news: news.map((article) => ({
      title: article?.title || 'Untitled article',
      source: article?.source || 'Unknown source',
      publishedAt: article?.publishedAt || 'Recent'
    })),
    chartData: [
      { name: 'Current', value: currentPrice ?? 0 },
      { name: '52W High', value: weekHigh ?? 0 },
      { name: '52W Low', value: weekLow ?? 0 }
    ],
    analysis: analysis?.reasoning
      ? [analysis.reasoning]
      : ['No reasoning available.']
  };
};

export const researchApi = {
  async analyzeCompany(query) {
    const trimmedQuery = query?.trim();

    if (!trimmedQuery || trimmedQuery.length < 2) {
      throw new Error('Please enter a company name to begin analysis.');
    }

    try {
      const response = await client.post('/api/research', { companyName: trimmedQuery });
      return normalizeResearchResponse(response.data, trimmedQuery);
    } catch (error) {
      const message = error?.response?.data?.message || error?.message || 'Unable to analyze company right now.';
      throw new Error(message);
    }
  }
};
