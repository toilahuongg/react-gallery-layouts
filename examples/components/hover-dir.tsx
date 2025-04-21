import React, { useRef, useCallback } from 'react';
import './hover-dir.css';
import TweenMax from './TweenMax';

interface HoverDirProps {
  children: React.ReactNode;
  overlay: React.ReactNode;
  className?: string;
}

interface Point {
  x: number;
  y: number;
}

const HoverDir: React.FC<HoverDirProps> = ({ 
  children, 
  overlay,
  className = ''
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  // Calculate distance metric (squared distance)
  const calculateDistance = useCallback((x1: number, y1: number, x2: number, y2: number): number => {
    const xDiff = x1 - x2;
    const yDiff = y1 - y2;
    return xDiff * xDiff + yDiff * yDiff;
  }, []);

  // Find closest edge
  const findClosestEdge = useCallback((x: number, y: number, width: number, height: number): 'left' | 'right' | 'top' | 'bottom' => {
    const topEdgeDist = calculateDistance(x, y, width / 2, 0);
    const bottomEdgeDist = calculateDistance(x, y, width / 2, height);
    const leftEdgeDist = calculateDistance(x, y, 0, height / 2);
    const rightEdgeDist = calculateDistance(x, y, width, height / 2);

    const min = Math.min(topEdgeDist, bottomEdgeDist, leftEdgeDist, rightEdgeDist);

    if (min === leftEdgeDist) return 'left';
    if (min === rightEdgeDist) return 'right';
    if (min === topEdgeDist) return 'top';
    return 'bottom';
  }, [calculateDistance]);

  const handleMouseEnter = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current || !overlayRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const edge = findClosestEdge(x, y, rect.width, rect.height);

    // Reset overlay position
    overlayRef.current.style.top = '0%';
    overlayRef.current.style.left = '0%';

    // Animate based on edge
    switch (edge) {
      case 'left':
        overlayRef.current.style.left = '-100%';
        TweenMax.to(overlayRef.current, 0.5, { 
          left: 0,
          ease: TweenMax.Ease.cubicOut
        });
        break;
      case 'right':
        overlayRef.current.style.left = '100%';
        TweenMax.to(overlayRef.current, 0.5, { 
          left: 0,
          ease: TweenMax.Ease.cubicOut
        });
        break;
      case 'top':
        overlayRef.current.style.top = '-100%';
        TweenMax.to(overlayRef.current, 0.5, { 
          top: 0,
          ease: TweenMax.Ease.cubicOut
        });
        break;
      case 'bottom':
        overlayRef.current.style.top = '100%';
        TweenMax.to(overlayRef.current, 0.5, { 
          top: 0,
          ease: TweenMax.Ease.cubicOut
        });
        break;
    }
  }, [findClosestEdge]);

  const handleMouseLeave = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current || !overlayRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const edge = findClosestEdge(x, y, rect.width, rect.height);

    // Animate based on edge
    switch (edge) {
      case 'left':
        TweenMax.to(overlayRef.current, 0.5, { 
          left: -100,
          ease: TweenMax.Ease.cubicIn
        });
        break;
      case 'right':
        TweenMax.to(overlayRef.current, 0.5, { 
          left: 100,
          ease: TweenMax.Ease.cubicIn
        });
        break;
      case 'top':
        TweenMax.to(overlayRef.current, 0.5, { 
          top: -100,
          ease: TweenMax.Ease.cubicIn
        });
        break;
      case 'bottom':
        TweenMax.to(overlayRef.current, 0.5, { 
          top: 100,
          ease: TweenMax.Ease.cubicIn
        });
        break;
    }
  }, [findClosestEdge]);

  return (
    <div
      ref={containerRef}
      data-testid="hover-dir-container"
      className={`hover-dir-container ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div ref={overlayRef} className="hover-dir-overlay">
        {overlay}
      </div>
      <div className="hover-dir-content">
        {children}
      </div>
    </div>
  );
};

export default HoverDir;
