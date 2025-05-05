
import React, { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { Link } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface LegalService {
  title: string;
  description: string;
  url: string;
  relevanceScore: number;
}

interface AIResponseProps {
  message: string;
  suggestedServices: LegalService[];
  className?: string;
}

const AIResponse: React.FC<AIResponseProps> = ({ 
  message, 
  suggestedServices,
  className 
}) => {
  const [displayMessage, setDisplayMessage] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  
  useEffect(() => {
    let index = 0;
    setDisplayMessage('');
    setIsTyping(true);
    
    const typingInterval = setInterval(() => {
      setDisplayMessage(prev => prev + message.charAt(index));
      index++;
      
      if (index >= message.length) {
        clearInterval(typingInterval);
        setIsTyping(false);
      }
    }, 20);
    
    return () => clearInterval(typingInterval);
  }, [message]);

  return (
    <div className={cn('ai-response animate-fade-in', className)}>
      <div className="flex items-center mb-4">
        <div className="w-8 h-8 rounded-full bg-legal-teal/20 flex items-center justify-center mr-3">
          <svg className="w-5 h-5 text-legal-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        </div>
        <div>
          <h3 className="text-md font-bold text-white">MindfulLegal AI</h3>
          <p className="text-xs text-gray-400">Legal Assistant</p>
        </div>
      </div>
      
      <div className="mb-5">
        <p className="text-gray-200 leading-relaxed">
          {displayMessage}
          {isTyping && <span className="ml-1 inline-block w-2 h-4 bg-legal-teal/70 animate-typing-cursor"></span>}
        </p>
      </div>
      
      {!isTyping && suggestedServices.length > 0 && (
        <div className="mt-4">
          <h4 className="text-sm font-semibold text-legal-teal mb-3">Recommended Services:</h4>
          <div className="flex flex-col space-y-3">
            {suggestedServices
              .sort((a, b) => b.relevanceScore - a.relevanceScore)
              .map((service) => (
                <a 
                  key={service.title} 
                  href={service.url}
                  className="flex items-center p-3 rounded-md bg-gray-800/50 hover:bg-gray-700/50 border border-gray-700 transition-colors"
                >
                  <div className="mr-3 p-2 rounded-full bg-legal-navy">
                    <Link className="w-4 h-4 text-legal-gold" />
                  </div>
                  <div>
                    <h5 className="text-sm font-medium text-white">{service.title}</h5>
                    <p className="text-xs text-gray-400 mt-0.5">{service.description}</p>
                  </div>
                </a>
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AIResponse;
