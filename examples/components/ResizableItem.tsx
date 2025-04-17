import React, { useEffect, useMemo, useRef, useState } from 'react';
import { GalleryItem } from '../../src/types';
import { useGalleryStore } from '../store/galleryStore';
import './ResizableItem.css';

type ResizeDirection = 'right' | 'bottom';

interface ResizableItemProps {
  item: GalleryItem;
  index: number;
  wrapperSelector: string; // Selector for the wrapper element to calculate grid
  lazyLoad?: boolean;
  devMode?: boolean;
  columns?: number; // Number of columns in the grid
  gutter?: number; // Space between grid items
  threshold?: number; // Minimum distance to trigger resize
  resizeDirectionAllowed?: ResizeDirection[];
  onClick?: (item: GalleryItem, index: number) => void;
}

const ResizableItem: React.FC<ResizableItemProps> = ({
  item,
  index,
  onClick,
  wrapperSelector,
  lazyLoad = true,
  devMode = false,
  columns = 12, // Default to 12 columns if not specified
  gutter = 10, // Default gutter size
  threshold = 10, // Default threshold for resize
  resizeDirectionAllowed = ['right', 'bottom'],
}) => {
  const { updateItemSpan, setIsDragging } = useGalleryStore();
  const itemRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [resizeDirection, setResizeDirection] = useState<ResizeDirection | null>(null);

  // Calculate grid cell dimensions
  const getCellDimensions = useMemo(() => {
    const wrapper = document.querySelector(wrapperSelector);
    if (!wrapper) return { width: 0, height: 0 };
    
    const wrapperRect = wrapper.getBoundingClientRect();
    const cellWidth = (wrapperRect.width - (columns - 1) * gutter) / columns;
    return { width: cellWidth, height: cellWidth };
  }, [wrapperSelector, columns, gutter]);

  // Memoize resize capabilities
  const resizeCapabilities = useMemo(() => ({
    right: resizeDirectionAllowed.includes('right'),
    bottom: resizeDirectionAllowed.includes('bottom'),
  }), [resizeDirectionAllowed]);

  // Handle hover effects
  useEffect(() => {
    if (!devMode || !itemRef.current?.parentElement) return;
    
    const parent = itemRef.current.parentElement;
    parent.style.border = '2px dashed transparent';
    parent.style.borderRadius = '4px';
    parent.style.borderColor = isHovered ? 'rgba(0, 0, 0, 1)' : 'transparent';
  }, [devMode, isHovered]);

  const handleMouseEnter = () => {
    if (!devMode) return;
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    if (!devMode) return;
    setIsHovered(false);
  };

  const handleResizeStart = (direction: 'right' | 'bottom', e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!itemRef.current) return;
    
    setIsResizing(true);
    setResizeDirection(direction);
    setIsDragging(true);
  };

  const handleResizeMove = (e: MouseEvent) => {
    if (!isResizing || !resizeDirection || !itemRef.current) return;

    const { width: cellWidth, height: cellHeight } = getCellDimensions;
    if (cellWidth === 0) return;

    const itemRect = itemRef.current.getBoundingClientRect();
    const deltaX = e.clientX - itemRect.left;
    const deltaY = e.clientY - itemRect.top;

    let newColSpan = item.colSpan || 1;
    let newRowSpan = item.rowSpan || 1;

    switch (resizeDirection) {
      case 'right': {
        const newWidth = Math.max(cellWidth, deltaX + threshold);
        newColSpan = Math.min(columns, Math.max(1, Math.ceil(newWidth / cellWidth)));
        break;
      }
      case 'bottom': {
        const newHeight = Math.max(cellHeight, deltaY + threshold);
        newRowSpan = Math.max(1, Math.ceil(newHeight / cellHeight));
        break;
      }
    }

    if (newColSpan !== item.colSpan || newRowSpan !== item.rowSpan) {
      updateItemSpan(item.id, { colSpan: newColSpan, rowSpan: newRowSpan });
    }
  };

  const handleResizeEnd = () => {
    if (!itemRef.current) return;

    const { width: cellWidth, height: cellHeight } = getCellDimensions;
    if (cellWidth === 0) return;

    const itemRect = itemRef.current.getBoundingClientRect();
    let newColSpan = Math.max(1, Math.ceil(itemRect.width / cellWidth));
    let newRowSpan = Math.max(1, Math.ceil(itemRect.height / cellHeight));

    newColSpan = Math.min(columns, newColSpan);

    if (newColSpan !== item.colSpan || newRowSpan !== item.rowSpan) {
      updateItemSpan(item.id, { colSpan: newColSpan, rowSpan: newRowSpan });
    }

    setIsResizing(false);
    setResizeDirection(null);
    setIsDragging(false);
  };

  useEffect(() => {
    if (!isResizing) return;

    window.addEventListener('mousemove', handleResizeMove);
    window.addEventListener('mouseup', handleResizeEnd);

    return () => {
      window.removeEventListener('mousemove', handleResizeMove);
      window.removeEventListener('mouseup', handleResizeEnd);
    };
  }, [isResizing, resizeDirection]);

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
          {resizeCapabilities.right && (
            <div 
              className={`resize-button right ${isHovered ? 'visible' : ''}`}
              onMouseDown={(e) => handleResizeStart('right', e)}
            />
          )}
          {resizeCapabilities.bottom && (
            <div 
              className={`resize-button bottom ${isHovered ? 'visible' : ''}`}
              onMouseDown={(e) => handleResizeStart('bottom', e)}
            />
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