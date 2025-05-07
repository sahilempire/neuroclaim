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
  onClose?: () => void;
}

const AIResponse: React.FC<AIResponseProps> = ({ 
  message, 
  suggestedServices,
  className,
  externalLink,
  onClose
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
    <div className={cn('ai-response animate-fade-in shadow-2xl border-2 bg-gradient-to-br from-legal-navy/90 to-gray-900/80 backdrop-blur-lg fustat relative', className)}>
      {onClose && (
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-white text-2xl font-bold hover:text-legal-teal transition-colors z-10"
          aria-label="Close"
        >
          &times;
        </button>
      )}
      {externalLink && !isTyping ? (
        <div className="mb-2 p-8 rounded-2xl flex flex-col items-center animate-slide-up">
          <div className="flex items-center mb-3">
            <span className="ml-4 text-2xl md:text-3xl text-white drop-shadow-lg">Instantly Solve This with <span className="text-white font-bold">{externalLink.label.split(' ')[0]}</span>!</span>
          </div>
          <p className="mt-2 text-lg text-blue-100 text-center font-fustat animate-fade-in">Tap below for the fastest legal help.</p>
          <a href={externalLink.url} target="_blank" rel="noopener noreferrer" className="mt-6 inline-block px-10 py-4 rounded-full bg-white text-black text-xl shadow-xl hover:bg-gray-200 hover:text-gray-900 transition-all duration-200">
            Go to {externalLink.label.split(' ')[0]}
          </a>
        </div>
      ) : (
        <>
          <div className="mb-4">
            <h3 className="text-lg font-bold text-white tracking-wide">Lawbit</h3>
            <p className="text-xs text-[#FFFFFFAB] font-semibold">Your Legal Copilot</p>
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
