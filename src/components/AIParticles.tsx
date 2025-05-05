
import React, { useEffect, useRef } from 'react';

const AIParticles = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const particles = Array.from({ length: 10 });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    
    const particleElements = container.querySelectorAll('.ai-particle');
    
    particleElements.forEach((particle, i) => {
      const size = Math.random() * 6 + 2;
      const htmlParticle = particle as HTMLElement;
      
      // Random position within container
      const x = Math.random() * container.offsetWidth;
      const y = Math.random() * container.offsetHeight;
      
      // Set styles
      htmlParticle.style.width = `${size}px`;
      htmlParticle.style.height = `${size}px`;
      htmlParticle.style.left = `${x}px`;
      htmlParticle.style.top = `${y}px`;
      htmlParticle.style.animationDelay = `${i * 0.3}s`;
      htmlParticle.style.animationDuration = `${3 + Math.random() * 3}s`;
      
      // Vary the color slightly
      htmlParticle.style.backgroundColor = i % 3 === 0 ? '#EAB308' : '#0D9488';
      htmlParticle.style.opacity = `${0.1 + Math.random() * 0.2}`;
    });
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((_, i) => (
        <div key={i} className="ai-particle" />
      ))}
    </div>
  );
};

export default AIParticles;
