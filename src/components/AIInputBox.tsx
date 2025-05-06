import React, { useState, useEffect, useRef } from 'react';
import { MessageSquare, ArrowRight, Mic } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

interface AIInputBoxProps {
  onSubmit: (message: string) => void;
  placeholder?: string;
  className?: string;
  loading?: boolean;
}

const placeholders = [
  'Draft me an NDA',
  'Make a legal contract',
  'Generate a privacy policy',
  'Review my agreement',
  'Summarize this contract',
  'Create a compliance checklist',
  'Write a partnership deed',
  'Prepare a trademark application',
  'Check my document for risks',
  'Suggest improvements for my patent'
];

const AIInputBox: React.FC<AIInputBoxProps> = ({
  onSubmit,
  placeholder = "Ask about legal services...",
  className,
  loading = false
}) => {
  const [inputValue, setInputValue] = useState('');
  const { toast } = useToast();
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const [typedPlaceholder, setTypedPlaceholder] = useState('');
  const [typing, setTyping] = useState(true);
  const [listening, setListening] = useState(false);
  const recognitionRef = useRef<any>(null);

  // Typing animation for placeholder
  useEffect(() => {
    let timeout: NodeJS.Timeout;
    let charIndex = 0;
    setTypedPlaceholder('');
    setTyping(true);
    function typeChar() {
      setTypedPlaceholder(placeholders[placeholderIndex].slice(0, charIndex + 1));
      charIndex++;
      if (charIndex < placeholders[placeholderIndex].length) {
        timeout = setTimeout(typeChar, 40);
      } else {
        setTyping(false);
        timeout = setTimeout(() => {
          setPlaceholderIndex((i) => (i + 1) % placeholders.length);
        }, 1800);
      }
    }
    typeChar();
    return () => clearTimeout(timeout);
  }, [placeholderIndex]);

  // Voice input setup
  useEffect(() => {
    if (!('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) return;
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    recognitionRef.current = new SpeechRecognition();
    recognitionRef.current.continuous = false;
    recognitionRef.current.interimResults = false;
    recognitionRef.current.lang = 'en-US';
    recognitionRef.current.onresult = (event: any) => {
      setInputValue(event.results[0][0].transcript);
      setListening(false);
    };
    recognitionRef.current.onend = () => setListening(false);
    recognitionRef.current.onerror = () => setListening(false);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) {
      toast({
        title: "Input required",
        description: "Please enter a question or description",
        variant: "destructive"
      });
      return;
    }
    onSubmit(inputValue);
    setInputValue('');
  };

  const handleMicClick = () => {
    if (recognitionRef.current) {
      setListening(true);
      recognitionRef.current.start();
    }
  };

  return (
    <div className={cn('w-full max-w-3xl mx-auto', className)}>
      <form onSubmit={handleSubmit} className="ai-input-wrapper group flex items-center" role="search">
        <MessageSquare className="w-5 h-5 text-gray-400 absolute left-4" aria-hidden="true" />
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder={typedPlaceholder}
          className="ai-input pl-12"
          disabled={loading}
          aria-label="Type your legal request"
        />
        {/* Microphone button for voice input */}
        <button
          type="button"
          onClick={handleMicClick}
          className={cn("absolute right-12 p-2 rounded-full text-legal-teal hover:text-legal-gold focus:outline-none focus:ring-2 focus:ring-legal-teal transition", listening && 'bg-legal-teal/20')}
          aria-label={listening ? "Listening for voice input" : "Start voice input"}
          tabIndex={0}
        >
          <Mic className={cn("w-5 h-5", listening && 'animate-pulse')} />
        </button>
        {/* Loading spinner or animated dots */}
        {loading ? (
          <span className="absolute right-2 flex items-center" aria-live="polite" aria-label="Loading">
            <span className="inline-block w-2 h-2 mx-0.5 bg-legal-teal rounded-full animate-bounce [animation-delay:0s]"></span>
            <span className="inline-block w-2 h-2 mx-0.5 bg-legal-teal rounded-full animate-bounce [animation-delay:0.15s]"></span>
            <span className="inline-block w-2 h-2 mx-0.5 bg-legal-teal rounded-full animate-bounce [animation-delay:0.3s]"></span>
          </span>
        ) : (
          <Button
            type="submit"
            variant="ghost"
            size="icon"
            disabled={loading}
            className="absolute right-2 text-legal-teal hover:text-legal-gold hover:bg-transparent"
            aria-label="Submit legal request"
            tabIndex={0}
          >
            <ArrowRight className="w-5 h-5" />
          </Button>
        )}
      </form>
      <p className="text-xs text-gray-500 mt-2 text-center">
        NeuralClaim AI helps navigate your legal needs
      </p>
    </div>
  );
};

export default AIInputBox;
