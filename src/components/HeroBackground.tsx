import React from 'react';

const HeroBackground = () => {
  return (
    <div className="fixed inset-0 w-full h-full">
      <img 
        src="/hero.png" 
        alt="Background" 
        className="w-full h-full object-cover"
      />
    </div>
  );
};

export default HeroBackground; 