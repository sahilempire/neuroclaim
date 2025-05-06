import React, { useEffect, useRef } from 'react';

interface GradientTextProps {
  colors: string[];
  animationSpeed?: number;
  showBorder?: boolean;
  className?: string;
  children: React.ReactNode;
}

const GradientText: React.FC<GradientTextProps> = ({
  colors,
  animationSpeed = 2,
  showBorder = false,
  className = '',
  children
}) => {
  const textRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!textRef.current) return;

    const text = textRef.current;
    const style = text.style;
    const keyframes = `
      @keyframes gradient {
        0% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
        100% { background-position: 0% 50%; }
      }
    `;

    // Create and append the keyframes
    const styleSheet = document.createElement('style');
    styleSheet.textContent = keyframes;
    document.head.appendChild(styleSheet);

    // Set up the gradient
    const gradient = `linear-gradient(45deg, ${colors.join(', ')})`;
    style.background = gradient;
    style.backgroundSize = '200% 200%';
    style.animation = `gradient ${animationSpeed}s ease infinite`;
    style.webkitBackgroundClip = 'text';
    style.backgroundClip = 'text';
    style.color = 'transparent';
    style.display = 'inline-block';

    if (showBorder) {
      style.border = '2px solid transparent';
      style.borderImage = `${gradient} 1`;
    }

    return () => {
      document.head.removeChild(styleSheet);
    };
  }, [colors, animationSpeed, showBorder]);

  return (
    <span ref={textRef} className={className}>
      {children}
    </span>
  );
};

export default GradientText; 