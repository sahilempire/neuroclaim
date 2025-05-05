
import React from 'react';
import { Gavel, FileText, ClipboardCheck, Scale, Shield, Book } from 'lucide-react';

const LegalBackgroundIcons = () => {
  const legalIcons = [
    { Icon: Gavel, size: 32, opacity: 0.07, delay: 0 },
    { Icon: FileText, size: 48, opacity: 0.05, delay: 1.2 },
    { Icon: ClipboardCheck, size: 36, opacity: 0.06, delay: 0.7 },
    { Icon: Scale, size: 52, opacity: 0.04, delay: 2.1 },
    { Icon: Shield, size: 44, opacity: 0.05, delay: 1.5 },
    { Icon: Book, size: 38, opacity: 0.06, delay: 0.3 },
  ];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {legalIcons.map((icon, i) => {
        const { Icon, size, opacity, delay } = icon;
        
        // Calculate random positions
        const left = `${Math.random() * 90}%`;
        const top = `${Math.random() * 90}%`;
        
        return (
          <div
            key={i}
            className="absolute transform transition-transform"
            style={{
              left,
              top,
              opacity,
              animation: `float 8s ease-in-out ${delay}s infinite alternate`,
            }}
          >
            <Icon size={size} className="text-legal-teal" />
          </div>
        );
      })}
    </div>
  );
};

export default LegalBackgroundIcons;
