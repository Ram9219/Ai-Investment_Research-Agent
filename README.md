<div align="center">

# 🚀 AI Investment Research Agent

### AI-Powered Financial Research Platform using LangGraph, Gemini AI, Yahoo Finance & News Intelligence

Analyze publicly listed companies through an AI-driven multi-agent workflow that combines live financial market data, recent news intelligence, and Large Language Model reasoning to generate structured investment recommendations.

---

![React](https://img.shields.io/badge/React-19-blue?logo=react)
![NodeJS](https://img.shields.io/badge/Node.js-Express-green?logo=node.js)
![LangGraph](https://img.shields.io/badge/LangGraph-AI-orange)
![Gemini](https://img.shields.io/badge/Google-Gemini-purple)
![Yahoo Finance](https://img.shields.io/badge/Yahoo-Finance-blue)
![License](https://img.shields.io/badge/License-MIT-success)

</div>

---

# 📌 Overview

AI Investment Research Agent is an end-to-end financial intelligence platform designed to automate company research using modern AI orchestration techniques.

Instead of relying solely on raw market data, the application combines multiple independent information sources into a unified analysis pipeline.

The platform performs:

- Live Financial Data Retrieval
- Market News Aggregation
- AI-powered Investment Analysis
- Risk Assessment
- Investment Recommendation
- Confidence Estimation
- Interactive Financial Dashboard

---

# ✨ Features

## Financial Intelligence

- Live stock market information
- Market capitalization
- P/E Ratio
- EPS
- Revenue
- Profit Margin
- 52 Week High / Low
- Current Market Price

---

## News Intelligence

- Aggregates latest company news
- Filters recent market events
- AI considers news sentiment during recommendation generation

---

## AI Recommendation Engine

Powered by **Google Gemini**

Produces

- Buy / Hold / Sell Recommendation
- Confidence Score
- Pros
- Cons
- Detailed Reasoning

---

## Intelligent Error Handling

Instead of exposing server errors:

- Invalid company detection
- Case-insensitive company search
- AI fallback responses
- Graceful quota handling
- User-friendly error messages

---

## Modern UI

- Responsive Design
- Animated Dashboard
- Dark Financial Theme
- Interactive Charts
- Real-time Loading States

---

# 🏗 Architecture

```
                User
                  │
                  ▼
          React Frontend
                  │
         Axios REST API
                  │
                  ▼
          Express Backend
                  │
        Investment Controller
                  │
                  ▼
          LangGraph Workflow
                  │
     ┌────────────┼─────────────┐
     ▼            ▼             ▼
Yahoo Finance   News API     Gemini AI
     │            │             │
     └────────────┼─────────────┘
                  │
                  ▼
       Structured Investment Report
                  │
                  ▼
          React Dashboard
```

---

# ⚙ Technology Stack

## Frontend

- React 19
- Vite
- Tailwind CSS
- Framer Motion
- Axios
- React Icons

---

## Backend

- Node.js
- Express.js
- LangGraph
- Google Gemini API
- Yahoo Finance API

---

## AI

- LangGraph Workflow
- Google Gemini
- Prompt Engineering
- JSON Structured Output

---

## APIs

- Yahoo Finance
- Google Gemini
- Financial News API

---

# 🧠 AI Workflow

The backend is designed as a sequential AI workflow.

```
START

   │

   ▼

Fetch Financial Data

   │

   ▼

Fetch Latest News

   │

   ▼

Generate AI Recommendation

   │

   ▼

Return Structured JSON

   │

   ▼

END
```

---

# 📂 Project Structure

```
AI-Investment-Research-Agent/

│

├── Frontend/

│   ├── src/
│   │
│   ├── components/
│   ├── hooks/
│   ├── services/
│   ├── pages/
│   └── assets/

│
├── Backend/

│   ├── src/
│   │
│   ├── agents/
│   ├── controllers/
│   ├── routes/
│   ├── services/
│   ├── middleware/
│   ├── config/
│   ├── utils/
│   └── server.js

│
└── README.md
```

---

# 🔄 Request Lifecycle

```
User Search

     │

     ▼

React Search Component

     │

     ▼

POST /api/research

     │

     ▼

Controller

     │

     ▼

LangGraph Agent

     │

     ├───────────────► Yahoo Finance

     │

     ├───────────────► News Service

     │

     └───────────────► Gemini AI

                     │

                     ▼

             Investment Report

                     │

                     ▼

Frontend Dashboard
```

---

# 🧩 Core Modules

### Finance Service

Responsible for

- Company Lookup
- Stock Metrics
- Market Data

---

### News Service

Responsible for

- News Collection
- Headline Processing

---

### Gemini Service

Responsible for

- Prompt Generation
- Financial Reasoning
- Recommendation Generation
- Confidence Calculation

---

### LangGraph Agent

Responsible for orchestrating the complete workflow between all services.

---

# 📊 Dashboard Sections

- Company Overview
- Financial Metrics
- AI Recommendation
- Latest News
- Pros & Cons
- AI Reasoning
- Momentum Overview
- Market Visualization

---

# 🚀 Deployment

## Frontend

Deploy on

- Vercel

```
Frontend/client
https://ai-investment-research-agent-opal.vercel.app/
```

---

## Backend

Deploy on

- Render

```
Backend/
```

---

# 🔐 Environment Variables

Backend

```
PORT=

GEMINI_API_KEY=

NEWS_API_KEY=

FINANCIAL_API_KEY=
```

Frontend

```
VITE_API_URL=
```

---

# 🛡 Error Handling

The application includes robust fallback mechanisms.

- Invalid Company Detection
- AI Quota Handling
- API Failure Recovery
- Network Failure Handling
- Structured Error Responses
- Graceful UI Degradation

---

# 📈 Future Improvements

- Company Search Autocomplete
- AI Sentiment Analysis
- Historical Stock Charts
- Watchlist
- Portfolio Analysis
- Technical Indicators
- AI Chat Assistant
- Cached AI Responses
- Multi-Model AI Support

---

# 👨‍💻 Author

**Ram Kumar**

Computer Science Engineering

Full Stack Developer

AI & Financial Intelligence Enthusiast

---

# ⭐ If you found this project useful, consider giving it a star.
