const { GoogleGenerativeAI } = require("@google/generative-ai");
const env = require("../config/env");

class GeminiService {
  constructor() {
    this.apiKey = env.GEMINI_API_KEY || env.GOOGLE_API_KEY || process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY || "";
    this.genAI = this.apiKey ? new GoogleGenerativeAI(this.apiKey) : null;
    this.model = this.genAI ? this.genAI.getGenerativeModel({ model: "gemini-2.0-flash" }) : null;
  }

  async analyzeInvestment(financialData, news) {
    if (!this.model) {
      console.warn("Gemini API key is not configured. Using heuristic fallback analysis.");
      return this.createFallbackAnalysis(financialData, news, "API key is not configured.");
    }

    try {
      const prompt = `You are an investment research analyst. Analyze the following company data and news. Respond with valid JSON only. Do not include markdown, code fences, or extra text.

Financial Data:
${JSON.stringify(financialData, null, 2)}

Recent News:
${JSON.stringify(news, null, 2)}

Return JSON in this exact shape:
{
  "recommendation": "Buy|Hold|Sell",
  "confidence": 0,
  "pros": ["..."],
  "cons": ["..."],
  "reasoning": "..."
}

Evaluate:
- Company financial health
- Risks
- Opportunities
- Recent news impact
- Final recommendation`;

      const result = await this.model.generateContent(prompt);
      const responseText = result?.response?.text?.() || "";

      if (!responseText) {
        throw new Error("Empty Gemini response");
      }

      return this.parseResponse(responseText);
    } catch (error) {
      const message = error?.message || String(error);
      console.warn("Gemini analysis failed, using fallback analysis:", message);
      return this.createFallbackAnalysis(financialData, news, message);
    }
  }

  createFallbackAnalysis(financialData, news, reason) {
    const metrics = financialData || {};
    const positiveSignals = [];
    const negativeSignals = [];

    if (Number(metrics.profitMargin) > 0) positiveSignals.push("Positive profit margin");
    if (Number(metrics.peRatio) > 0 && Number(metrics.peRatio) < 30) positiveSignals.push("Reasonable valuation");
    if (Number(metrics.currentPrice) > 0) positiveSignals.push("Market price available");
    if (Array.isArray(news) && news.length > 0) positiveSignals.push("Recent news available");

    if (Number(metrics.peRatio) > 0 && Number(metrics.peRatio) >= 30) negativeSignals.push("High valuation");
    if (Number(metrics.profitMargin) < 0) negativeSignals.push("Negative profit margin");
    if (Array.isArray(news) && news.length === 0) negativeSignals.push("Limited recent news coverage");

    let recommendation = "Hold";
    let confidence = 0.45;

    if (positiveSignals.length >= 3 && negativeSignals.length === 0) {
      recommendation = "Buy";
      confidence = 0.58;
    } else if (negativeSignals.length >= 2) {
      recommendation = "Sell";
      confidence = 0.6;
    }

//     return {
//   recommendation,
//   confidence,
//   pros: positiveSignals.length ? positiveSignals : ["Financial data available"],
//   cons: negativeSignals.length ? negativeSignals : ["AI analysis temporarily unavailable"],
//   reasoning:
//     "AI analysis is temporarily unavailable. Financial data and recent news are still available. Please try again later.",
//   isFallback: true
// };
return {
  recommendation: null,
  confidence: null,
  pros: [],
  cons: [],
  reasoning:
    "AI analysis is temporarily unavailable. Financial data and recent news are still available. Please try again later.",
  isFallback: true
};
  }

  parseResponse(responseText) {
    const cleanedText = responseText
      .replace(/```json/gim, "")
      .replace(/```/g, "")
      .trim();

    const parsed = JSON.parse(cleanedText);

    // return {
    //   recommendation: parsed.recommendation || "Hold",
    //   confidence: Number(parsed.confidence) || 0,
    //   pros: Array.isArray(parsed.pros) ? parsed.pros : [],
    //   cons: Array.isArray(parsed.cons) ? parsed.cons : [],
    //   reasoning: parsed.reasoning || "No reasoning provided.",
    // };
    return {
  recommendation: parsed.recommendation || null,
  confidence: Number(parsed.confidence) || null,
  pros: Array.isArray(parsed.pros) ? parsed.pros : [],
  cons: Array.isArray(parsed.cons) ? parsed.cons : [],
  reasoning: parsed.reasoning || "No reasoning provided.",
  isFallback: false,
};
  }
}

module.exports = new GeminiService();
