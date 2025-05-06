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
  externalLink?: { url: string; label: string };
}

const AIResponse: React.FC<AIResponseProps> = ({ 
  message, 
  suggestedServices,
  className,
  externalLink
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
    <div className={cn('ai-response animate-fade-in shadow-2xl border-2 border-legal-teal/40 bg-gradient-to-br from-legal-navy/90 to-gray-900/80 backdrop-blur-lg', className)}>
      {externalLink && !isTyping ? (
        <div className="mb-2 p-8 rounded-2xl bg-gradient-to-br from-blue-900/90 to-legal-teal/40 border-2 border-legal-teal/80 shadow-2xl flex flex-col items-center animate-slide-up">
          <div className="flex items-center mb-3">
            <span className="ml-4 text-2xl md:text-3xl font-bold text-white drop-shadow-lg">Instantly Solve This with <span className="text-legal-teal">{externalLink.label.split(' ')[0]}</span>!</span>
          </div>
          <p className="mt-2 text-lg text-blue-100 text-center font-semibold animate-fade-in">Tap below for the fastest legal help.</p>
          <a href={externalLink.url} target="_blank" rel="noopener noreferrer" className="mt-6 inline-block px-10 py-4 rounded-full bg-legal-teal text-white font-extrabold text-xl shadow-xl hover:bg-legal-gold hover:text-gray-900 transition-all duration-200">
            Go to {externalLink.label.split(' ')[0]}
          </a>
        </div>
      ) : (
        <>
          <div className="flex items-center mb-4">
            <div className="w-10 h-10 rounded-full bg-legal-teal/30 flex items-center justify-center mr-4 shadow-lg">
              <svg className="w-6 h-6 text-legal-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-bold text-white tracking-wide">NeuralClaim AI</h3>
              <p className="text-xs text-legal-teal font-semibold">Your Legal Copilot</p>
            </div>
          </div>
          <div className="mb-6">
            <p className="text-gray-100 leading-relaxed text-lg font-medium">
              {displayMessage}
              {isTyping && <span className="ml-1 inline-block w-2 h-4 bg-legal-teal/70 animate-typing-cursor"></span>}
            </p>
          </div>
        </>
      )}
    </div>
  );
};

export default AIResponse;
