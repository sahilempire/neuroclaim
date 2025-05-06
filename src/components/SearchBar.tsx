import React from 'react';

interface SearchBarProps {
  placeholder?: string;
  className?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ placeholder, className = '' }) => {
  return (
    <div className={`relative max-w-2xl mx-auto ${className}`}>
      <input
        type="text"
        placeholder={placeholder}
        className="w-full px-6 py-4 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-legal-teal transition-colors"
      />
      <button className="absolute right-3 top-1/2 -translate-y-1/2 px-4 py-2 bg-legal-teal text-white rounded-md hover:bg-opacity-90 transition-colors">
        Search
      </button>
    </div>
  );
};

export default SearchBar; 