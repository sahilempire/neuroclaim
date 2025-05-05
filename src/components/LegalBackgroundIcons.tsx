
import React, { useEffect, useState } from 'react';
import { Gavel, FileText, ClipboardCheck, Scale, Shield, Book } from 'lucide-react';

const LegalBackgroundIcons = () => {
  const [icons, setIcons] = useState<Array<{
    Icon: any;
    size: number;
    opacity: number;
    left: string;
    top: string;
    delay: number;
  }>>([]);

  useEffect(() => {
    // Base set of icons with professional configuration
    const legalIcons = [
      { Icon: Gavel, size: 28, opacity: 0.03, delay: 0 },
      { Icon: FileText, size: 34, opacity: 0.02, delay: 1.2 },
      { Icon: ClipboardCheck, size: 32, opacity: 0.025, delay: 0.7 },
      { Icon: Scale, size: 36, opacity: 0.02, delay: 2.1 },
      { Icon: Shield, size: 30, opacity: 0.03, delay: 1.5 },
      { Icon: Book, size: 32, opacity: 0.025, delay: 0.3 },
    ];

    // Generate positioned icons
    const positionedIcons = legalIcons.map(icon => ({
      ...icon,
      left: `${Math.random() * 90}%`,
      top: `${Math.random() * 90}%`,
    }));

    setIcons(positionedIcons);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {icons.map((icon, i) => {
        const { Icon, size, opacity, left, top, delay } = icon;
        
        return (
          <div
            key={i}
            className="absolute transform transition-transform"
            style={{
              left,
              top,
              opacity,
              animation: `float 15s ease-in-out ${delay}s infinite alternate`,
            }}
          >
            <Icon size={size} className="text-legal-teal" strokeWidth={1} />
          </div>
        );
      })}
    </div>
  );
};

export default LegalBackgroundIcons;
