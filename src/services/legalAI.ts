
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
}

// Simple keyword matching algorithm
function analyzeQuery(query: string): AIAnalysisResult {
  const normalizedQuery = query.toLowerCase();
  
  // Calculate relevance for each service
  const scoredServices = legalServices.map(service => {
    let score = 0;
    
    // Check for keyword matches
    service.keywords.forEach(keyword => {
      if (normalizedQuery.includes(keyword.toLowerCase())) {
        // Keywords in title are more important
        score += service.title.toLowerCase().includes(keyword.toLowerCase()) ? 10 : 5;
      }
    });
    
    // Boost score if the service title is directly mentioned
    if (normalizedQuery.includes(service.title.toLowerCase())) {
      score += 15;
    }
    
    // Boost score for the service ID being mentioned
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
  
  // Filter to services with some relevance
  const suggestedServices = scoredServices.filter(service => service.relevanceScore > 0);
  
  // Generate response message based on matches
  let message = "";
  
  if (suggestedServices.length === 0) {
    message = "I understand you're looking for legal assistance. Could you please provide more details about your specific legal needs? For example, are you interested in patents, trademarks, legal document drafting, or compliance solutions?";
  } else if (suggestedServices.length === 1) {
    message = `Based on your query, I believe our ${suggestedServices[0].title} would be perfect for your needs. Would you like more information about this service?`;
  } else {
    message = "Based on your query, I've identified several services that might help you. Please take a look at these recommendations:";
  }
  
  return {
    message,
    suggestedServices
  };
}

export default {
  analyzeQuery
};
