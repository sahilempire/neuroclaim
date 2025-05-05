
import React, { useState } from 'react';
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

const AIInputBox: React.FC<AIInputBoxProps> = ({
  onSubmit,
  placeholder = "Ask about legal services...",
  className,
  loading = false
}) => {
  const [inputValue, setInputValue] = useState('');
  const { toast } = useToast();

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
          placeholder={placeholder}
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
        MindfulLegal AI helps navigate your legal needs
      </p>
    </div>
  );
};

export default AIInputBox;
