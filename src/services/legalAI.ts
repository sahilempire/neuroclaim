import axios from 'axios';

/**
 * Mock AI service to analyze user queries and suggest legal services
 */

interface LegalService {
  id: string;
  title: string;
  description: string;
  url: string;
  keywords: string[];
}

const legalServices: LegalService[] = [
  {
    id: 'patents',
    title: 'Patent Services',
    description: 'Protect your innovations with our patent services',
    url: '/patents',
    keywords: ['patent', 'invention', 'innovation', 'intellectual property', 'protect', 'idea', 'product', 'technology', 'ip']
  },
  {
    id: 'trademarks',
    title: 'Trademark Registration',
    description: 'Secure your brand with trademark protection',
    url: '/trademarks',
    keywords: ['trademark', 'brand', 'logo', 'name', 'slogan', 'business', 'company', 'protection', 'register', 'registration']
  },
  {
    id: 'legal-drafting',
    title: 'Legal Document Drafting',
    description: 'Professional legal document preparation services',
    url: '/legal-drafting',
    keywords: ['document', 'draft', 'agreement', 'contract', 'legal', 'write', 'prepare', 'terms', 'conditions', 'letter', 'template']
  },
  {
    id: 'compliance',
    title: 'Compliance Solutions',
    description: 'Stay compliant with regulations and standards',
    url: '/compliance',
    keywords: ['compliance', 'regulation', 'standard', 'law', 'requirement', 'policy', 'guideline', 'rule', 'legal', 'gdpr', 'privacy', 'data']
  }
];

export interface LegalServiceSuggestion {
  title: string;
  description: string;
  url: string;
  relevanceScore: number;
}

export interface AIAnalysisResult {
  message: string;
  suggestedServices: LegalServiceSuggestion[];
  externalLink?: { url: string; label: string };
}

const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY;
const OPENAI_API_URL = 'https://api.openai.com/v1/chat/completions';

async function analyzeQuery(query: string): Promise<AIAnalysisResult> {
  const normalizedQuery = query.toLowerCase();

  // Keyword-based external link logic
  let externalLink: { url: string; label: string } | undefined = undefined;
  if (/(trademark|patent)/.test(normalizedQuery)) {
    externalLink = { url: 'https://radar.neuralarc.ai/', label: 'Radar NeuralArc (IP/Trademark/Patent)' };
  } else if (/(legal draft|draft|agreement|contract|document)/.test(normalizedQuery)) {
    externalLink = { url: 'https://lawbit.ai/', label: 'LawBit (Legal Drafts & Agreements)' };
  } else if (/(compliance|regulation|policy)/.test(normalizedQuery)) {
    externalLink = { url: 'https://compli-ai-shield.vercel.app/', label: 'Compli AI Shield (Compliance)' };
  }

  // OpenAI API call
  let message = '';
  let systemPrompt = 'You are a highly creative, friendly, and persuasive legal AI assistant. Always provide helpful, engaging, and actionable advice. If a recommended service link is provided, encourage the user to visit it for the best results. Reply in 1–2 sentences. Be concise, energetic, and encourage the user to click the recommended link.';
  if (externalLink) {
    systemPrompt += `\nFor this query, the best resource is: ${externalLink.label} (${externalLink.url}). Persuasively explain why the user should visit this link for more information or to take action, but keep your response very short.`;
  }
  try {
    const response = await axios.post(
      OPENAI_API_URL,
      {
        model: 'gpt-3.5-turbo',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: query }
        ],
        max_tokens: 60
      },
      {
        headers: {
          'Authorization': `Bearer ${OPENAI_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );
    message = response.data.choices[0].message.content.trim();
  } catch (err: any) {
    if (err.response && err.response.status === 429) {
      message = 'You are making requests too quickly. Please wait a few seconds before trying again.';
    } else {
      message = 'Sorry, I could not process your request at the moment.';
    }
  }

  // Use the old keyword matching for suggested services
  const scoredServices = legalServices.map(service => {
    let score = 0;
    service.keywords.forEach(keyword => {
      if (normalizedQuery.includes(keyword.toLowerCase())) {
        score += service.title.toLowerCase().includes(keyword.toLowerCase()) ? 10 : 5;
      }
    });
    if (normalizedQuery.includes(service.title.toLowerCase())) {
      score += 15;
    }
    if (normalizedQuery.includes(service.id.toLowerCase())) {
      score += 20;
    }
    return {
      title: service.title,
      description: service.description,
      url: service.url,
      relevanceScore: score
    };
  });
  const suggestedServices = scoredServices.filter(service => service.relevanceScore > 0);

  return {
    message,
    suggestedServices,
    externalLink
  };
}

export default {
  analyzeQuery
};
