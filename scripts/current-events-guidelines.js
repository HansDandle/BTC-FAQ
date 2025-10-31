// Enhanced content guidelines for current events Bitcoin blogging
const CURRENT_EVENTS_TOPICS = {
  political: [
    "US Presidential Election impact on Bitcoin policy",
    "Congressional cryptocurrency hearings and legislation",
    "State-level Bitcoin mining regulations",
    "International diplomatic tensions affecting crypto markets",
    "Central Bank Digital Currency (CBDC) developments",
    "Political campaign contributions in cryptocurrency"
  ],
  
  regulatory: [
    "SEC enforcement actions and settlements",
    "New cryptocurrency exchange regulations",
    "Bitcoin ETF approval process updates",
    "Tax policy changes for digital assets",
    "Anti-money laundering (AML) rule updates",
    "Global regulatory coordination efforts"
  ],
  
  market: [
    "Institutional Bitcoin adoption announcements",
    "Corporate treasury Bitcoin purchases",
    "Major exchange listing decisions",
    "Derivatives market developments",
    "Cross-market correlation analysis",
    "On-chain metrics and whale movements"
  ],
  
  macro: [
    "Federal Reserve policy impact on Bitcoin",
    "Inflation data correlation with crypto prices",
    "Global economic uncertainty and safe haven assets",
    "Currency devaluation and Bitcoin adoption",
    "Recession predictions and portfolio allocation",
    "International trade tensions affecting markets"
  ]
};

const CONTENT_QUALITY_STANDARDS = {
  timeliness: {
    description: "Content must reference events from the last 7 days",
    requirements: [
      "Include specific dates for recent events",
      "Reference current market prices and percentages",
      "Mention recent regulatory announcements",
      "Connect to ongoing political developments"
    ]
  },
  
  depth: {
    description: "Provide expert-level analysis beyond surface news",
    requirements: [
      "Explain implications of current events",
      "Connect multiple data points and trends",
      "Provide historical context for current developments",
      "Offer actionable insights for readers"
    ]
  },
  
  objectivity: {
    description: "Maintain balanced perspective while being engaging",
    requirements: [
      "Present multiple viewpoints on controversial topics",
      "Distinguish between facts and speculation",
      "Acknowledge uncertainty in market predictions",
      "Avoid hyperbolic language while staying engaging"
    ]
  }
};

const SEO_KEYWORDS_CURRENT = {
  primary: [
    "Bitcoin price analysis [CURRENT_DATE]",
    "Bitcoin regulation news [CURRENT_MONTH]",
    "Bitcoin market trends [CURRENT_YEAR]",
    "Bitcoin investment strategy [CURRENT_DATE]"
  ],
  
  secondary: [
    "cryptocurrency market analysis",
    "Bitcoin ETF updates",
    "Federal Reserve Bitcoin impact",
    "Bitcoin political news",
    "institutional Bitcoin adoption",
    "Bitcoin price prediction"
  ],
  
  longTail: [
    "how does politics affect Bitcoin price",
    "Bitcoin regulation impact on market",
    "should I buy Bitcoin during recession",
    "Bitcoin correlation with stock market [CURRENT_YEAR]",
    "best time to buy Bitcoin [CURRENT_MONTH]"
  ]
};

const AFFILIATE_INTEGRATION_STRATEGIES = {
  natural: [
    "When discussing portfolio security during market volatility",
    "After explaining regulatory risks to exchange holdings",
    "When covering institutional custody solutions",
    "During discussion of self-sovereignty themes",
    "When addressing security concerns after exchange hacks"
  ],
  
  contextual: [
    "Link security discussions to current exchange issues",
    "Connect political instability to self-custody importance",
    "Relate regulatory uncertainty to hardware wallet benefits",
    "Use market volatility as reason for secure storage"
  ]
};

const CONTENT_STRUCTURE_TEMPLATE = {
  introduction: {
    purpose: "Hook reader with current event relevance",
    elements: [
      "Current market snapshot with specific data",
      "Reference to major recent event",
      "Preview of analysis to come",
      "Engagement question or striking statistic"
    ]
  },
  
  analysis: {
    purpose: "Deep dive into current events and implications",
    sections: [
      "Market Data Analysis (prices, volumes, trends)",
      "Political/Regulatory Development Breakdown",
      "Institutional Activity Assessment",
      "Technical Analysis with Current Levels",
      "Macro Economic Context"
    ]
  },
  
  implications: {
    purpose: "What this means for Bitcoin holders",
    elements: [
      "Short-term price expectations",
      "Long-term trend implications",
      "Risk factors to monitor",
      "Opportunities for investors"
    ]
  },
  
  actionable: {
    purpose: "Concrete next steps for readers",
    elements: [
      "Portfolio considerations",
      "Security recommendations (Ledger integration)",
      "Monitoring suggestions",
      "Timeline for reassessment"
    ]
  }
};

module.exports = {
  CURRENT_EVENTS_TOPICS,
  CONTENT_QUALITY_STANDARDS,
  SEO_KEYWORDS_CURRENT,
  AFFILIATE_INTEGRATION_STRATEGIES,
  CONTENT_STRUCTURE_TEMPLATE
};