
import React from 'react';
import { cn } from '@/lib/utils';

interface LegalNavProps {
  className?: string;
}

const LegalNav: React.FC<LegalNavProps> = ({ className }) => {
  return (
    <nav className={cn('flex items-center justify-between py-4 px-6 w-full', className)}>
      <div className="flex items-center">
        <h1 className="text-xl font-serif font-bold">
          <span className="text-legal-teal">Mindful</span>
          <span className="text-white">Legal</span>
        </h1>
      </div>
      
      <div className="hidden md:flex items-center space-x-6">
        <a href="#" className="text-sm text-gray-300 hover:text-legal-teal transition duration-200">Home</a>
        <a href="#" className="text-sm text-gray-300 hover:text-legal-teal transition duration-200">About</a>
        <a href="#" className="text-sm text-gray-300 hover:text-legal-teal transition duration-200">Services</a>
        <a href="#" className="text-sm text-gray-300 hover:text-legal-teal transition duration-200">Contact</a>
      </div>
      
      <button className="hidden md:inline-flex items-center px-4 py-2 bg-legal-teal text-white rounded-md hover:bg-opacity-90 transition duration-200">
        Login
      </button>
    </nav>
  );
};

export default LegalNav;
