
import React from 'react';
import { cn } from '@/lib/utils';
import type { LucideIcon } from 'lucide-react';

interface LegalServiceCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  url: string;
  className?: string;
  style?: React.CSSProperties;
}

const LegalServiceCard: React.FC<LegalServiceCardProps> = ({
  title,
  description,
  icon: Icon,
  url,
  className,
  style
}) => {
  return (
    <a 
      href={url}
      className={cn(
        'legal-card group flex flex-col items-center text-center',
        'transform transition-all duration-300 hover:-translate-y-1',
        className
      )}
      style={style}
    >
      <div className="w-14 h-14 mb-4 rounded-full bg-legal-navy flex items-center justify-center border border-legal-teal/30 group-hover:border-legal-teal/60">
        <Icon className="w-7 h-7 text-legal-teal group-hover:text-legal-gold transition-colors" />
      </div>
      
      <h3 className="text-xl font-serif font-semibold mb-2 text-white group-hover:text-legal-gold transition-colors">
        {title}
      </h3>
      
      <p className="text-gray-300 text-sm mb-4">
        {description}
      </p>
      
      <span className="text-legal-teal group-hover:text-legal-gold text-sm font-medium transition-colors flex items-center">
        Learn More
        <svg className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
        </svg>
      </span>
    </a>
  );
};

export default LegalServiceCard;
