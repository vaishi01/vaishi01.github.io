import React, { useEffect, useRef, ReactNode } from 'react';

interface GlowCardProps {
  children: ReactNode;
  className?: string;
  glowColor?: 'blue' | 'purple' | 'green' | 'red' | 'orange';
  size?: 'sm' | 'md' | 'lg';
  width?: string | number;
  height?: string | number;
  customSize?: boolean; // When true, ignores size prop and uses width/height or className
}

const glowColorMap = {
  blue: { color: '59, 130, 246' }, // rgb(59, 130, 246) - blue-500
  red: { color: '239, 68, 68' },   // rgb(239, 68, 68) - red-500
  purple: { color: '168, 85, 247' },
  green: { color: '34, 197, 94' },
  orange: { color: '249, 115, 22' }
};

const sizeMap = {
  sm: 'w-48 h-64',
  md: 'w-64 h-80',
  lg: 'w-80 h-96'
};

const GlowCard: React.FC<GlowCardProps> = ({ 
  children, 
  className = '', 
  glowColor = 'blue',
  size = 'md',
  width,
  height,
  customSize = false
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  // Determine sizing
  const getSizeClasses = () => {
    if (customSize) {
      return ''; // Let className or inline styles handle sizing
    }
    return sizeMap[size];
  };

  const getInlineStyles = () => {
    const { color } = glowColorMap[glowColor];
    const baseStyles: React.CSSProperties = {
      backgroundColor: 'transparent',
      border: `2px solid rgba(${color}, 0.3)`,
      position: 'relative',
      touchAction: 'pan-y',
    } as React.CSSProperties;

    // Add width and height if provided
    if (width !== undefined) {
      baseStyles.width = typeof width === 'number' ? `${width}px` : width;
    }
    if (height !== undefined) {
      baseStyles.height = typeof height === 'number' ? `${height}px` : height;
    }

    return baseStyles;
  };

  const beforeAfterStyles = ``;

  return (
    <div
      ref={cardRef}
      style={getInlineStyles()}
      className={`
        ${getSizeClasses()}
        ${!customSize ? 'aspect-[3/4]' : ''}
        rounded-2xl 
        relative 
        grid 
        grid-rows-[1fr_auto] 
        shadow-[0_1rem_2rem_-1rem_black] 
        p-4 
        gap-4 
        backdrop-blur-[5px]
        ${className}
      `}
    >
      {children}
    </div>
  );
};

export { GlowCard };