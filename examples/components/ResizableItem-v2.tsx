import React, { useState, useRef, useEffect, useMemo } from 'react';
import { GalleryItem } from '../../src/types';
import { useGalleryStore } from '../store/galleryStore';
import './ResizableItem.css';

type ResizeDirection = 'left' | 'right' | 'top' | 'bottom';

interface ResizableItemProps {
  item: GalleryItem;
  index: number;
  onClick?: (item: GalleryItem, index: number) => void;
  lazyLoad?: boolean;
  devMode?: boolean;
  resizeDirectionAllowed?: ResizeDirection[];
}

const ResizableItem: React.FC<ResizableItemProps> = ({
  item,
  index,
  onClick,
  lazyLoad = true,
  devMode = false,
  resizeDirectionAllowed = ['left', 'right', 'top', 'bottom'],
}) => {
  const { updateItemSpan } = useGalleryStore();
  const itemRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Memoize resize capabilities based on both item state and allowed directions
  const resizeCapabilities = useMemo(() => ({
    left: (item.colSpan || 1) > 1 && resizeDirectionAllowed.includes('left'),
    right: resizeDirectionAllowed.includes('right'),
    top: (item.rowSpan || 1) > 1 && resizeDirectionAllowed.includes('top'),
    bottom: resizeDirectionAllowed.includes('bottom'),
  }), [item.colSpan, item.rowSpan, resizeDirectionAllowed]);

  useEffect(() => {
    if (!devMode) return;
    
    const parent = itemRef.current?.parentElement;
    if (parent) {
      parent.style.border = '2px dashed transparent';
      parent.style.borderRadius = '4px';
    }
  }, [devMode]);

  const handleMouseEnter = () => {
    if (!devMode) return;
    const parent = itemRef.current?.parentElement;
    if (parent) {
      parent.style.borderColor = 'rgba(0, 0, 0, 1)';
    }
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    if (!devMode) return;
    const parent = itemRef.current?.parentElement;
    if (parent) {
      parent.style.borderColor = 'transparent';
    }
    setIsHovered(false);
  };

  const handleResize = (direction: ResizeDirection) => {
    if (!devMode || !resizeDirectionAllowed.includes(direction)) return;

    const currentColSpan = item.colSpan || 1;
    const currentRowSpan = item.rowSpan || 1;

    let newColSpan = currentColSpan;
    let newRowSpan = currentRowSpan;

    switch (direction) {
      case 'left':
        if (currentColSpan > 1) newColSpan = currentColSpan - 1;
        break;
      case 'right':
        newColSpan = currentColSpan + 1;
        break;
      case 'top':
        if (currentRowSpan > 1) newRowSpan = currentRowSpan - 1;
        break;
      case 'bottom':
        newRowSpan = currentRowSpan + 1;
        break;
    }

    updateItemSpan(item.id, { colSpan: newColSpan, rowSpan: newRowSpan });
  };

  return (
    <div
      ref={itemRef}
      className={`resizable-item ${devMode ? 'dev-mode' : ''}`}
      onClick={devMode ? () => onClick?.(item, index) : undefined}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="item-content">
        {lazyLoad ? (
          <img
            src={item.src}
            alt={item.alt || `Gallery item ${index}`}
            loading="lazy"
          />
        ) : (
          <img
            src={item.src}
            alt={item.alt || `Gallery item ${index}`}
          />
        )}
      </div>

      {devMode && (
        <div className={`resize-overlay ${isHovered ? 'visible' : ''}`}>
          {/* Left Button */}
          {resizeCapabilities.left && (
            <button
              className={`resize-button left ${isHovered ? 'visible' : ''}`}
              onClick={(e) => {
                e.stopPropagation();
                handleResize('left');
              }}
              title="Decrease width"
            >
              ←
            </button>
          )}

          {/* Right Button */}
          {resizeCapabilities.right && (
            <button
              className={`resize-button right ${isHovered ? 'visible' : ''}`}
              onClick={(e) => {
                e.stopPropagation();
                handleResize('right');
              }}
              title="Increase width"
            >
              →
            </button>
          )}

          {/* Top Button */}
          {resizeCapabilities.top && (
            <button
              className={`resize-button top ${isHovered ? 'visible' : ''}`}
              onClick={(e) => {
                e.stopPropagation();
                handleResize('top');
              }}
              title="Decrease height"
            >
              ↑
            </button>
          )}

          {/* Bottom Button */}
          {resizeCapabilities.bottom && (
            <button
              className={`resize-button bottom ${isHovered ? 'visible' : ''}`}
              onClick={(e) => {
                e.stopPropagation();
                handleResize('bottom');
              }}
              title="Increase height"
            >
              ↓
            </button>
          )}

          <div className="span-info">
            {item.colSpan || 1}×{item.rowSpan || 1}
          </div>
        </div>
      )}
    </div>
  );
};

export default ResizableItem;
