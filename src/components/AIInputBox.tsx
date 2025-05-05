import React, { useState, useEffect } from 'react';
import { MessageSquare, ArrowRight } from 'lucide-react';
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

  return (
    <div className={cn('w-full max-w-3xl mx-auto', className)}>
      <form onSubmit={handleSubmit} className="ai-input-wrapper group flex items-center">
        <MessageSquare className="w-5 h-5 text-gray-400 absolute left-4" />
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder={typedPlaceholder}
          className="ai-input pl-12"
          disabled={loading}
        />
        <Button
          type="submit"
          variant="ghost"
          size="icon"
          disabled={loading}
          className="absolute right-2 text-legal-teal hover:text-legal-gold hover:bg-transparent"
        >
          <ArrowRight className="w-5 h-5" />
        </Button>
      </form>
      <p className="text-xs text-gray-500 mt-2 text-center">
        NeuroClaim AI helps navigate your legal needs
      </p>
    </div>
  );
};

export default AIInputBox;
