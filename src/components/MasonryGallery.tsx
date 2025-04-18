import React, { useMemo } from 'react';
import { MasonryGalleryProps, GalleryItem } from '../types';
import { normalizeItems, getColumnsCount, getGutter } from '../utils';
import useWindowResize from '../hooks/useWindowResize';

const MasonryGallery: React.FC<MasonryGalleryProps> = ({
  items,
  columns = 3,
  gutter = 10,
  renderItem,
  className = '',
  style = {},
  itemClassName = '',
  itemStyle = {},
  onItemClick,
  lazyLoad = false,
}) => {
  const normalizedItems = useMemo(() => normalizeItems(items), [items]);
  const windowSize = useWindowResize();
  const columnsCount = useMemo(() => getColumnsCount(columns, windowSize), [columns, windowSize]);
  const gutterSize = useMemo(() => getGutter(gutter, windowSize), [gutter, windowSize]);
  
  const gridItems = useMemo(() => {
    // Create grid layout with positions for each item
    const grid: Array<Array<number | null>> = [];
    const itemsWithPosition: Array<GalleryItem & { 
      gridRow: number; 
      gridColumn: number; 
      gridRowSpan: number; 
      gridColumnSpan: number;
    }> = [];
    
    // Keep track of the current height of each column
    const columnHeights = Array(columnsCount).fill(0);
    
    // Sort items by colSpan (larger items first) for better distribution
    const sortedItems = [...normalizedItems].sort((a, b) => (b.colSpan || 1) - (a.colSpan || 1));
    
    sortedItems.forEach((item, index) => {
      const colSpan = Math.min(item.colSpan || 1, columnsCount);
      
      // Find the best position for this item
      let bestColumn = 0;
      let lowestHeight = Infinity;
      
      // For items with colSpan > 1, find consecutive columns with lowest max height
      if (colSpan > 1) {
        for (let i = 0; i <= columnsCount - colSpan; i++) {
          const maxHeightInSpan = Math.max(...columnHeights.slice(i, i + colSpan));
          if (maxHeightInSpan < lowestHeight) {
            lowestHeight = maxHeightInSpan;
            bestColumn = i;
          }
        }
      } else {
        // For single column items, find the shortest column
        bestColumn = columnHeights.indexOf(Math.min(...columnHeights));
        lowestHeight = columnHeights[bestColumn];
      }
      
      // Calculate height based on aspect ratio and column span
      const aspectRatio = (item.height || 100) / (item.width || 100);
      // Calculate the actual height in grid units based on column span
      const height = Math.max(1, Math.round(aspectRatio * colSpan * 10));
      
      // Add item to the grid with position information
      itemsWithPosition.push({
        ...item,
        gridRow: lowestHeight + 1,
        gridColumn: bestColumn + 1,
        gridRowSpan: height,
        gridColumnSpan: colSpan
      });
      
      // Update column heights
      for (let i = bestColumn; i < bestColumn + colSpan; i++) {
        if (i < columnsCount) {
          columnHeights[i] = lowestHeight + height;
        }
      }
      
      // Update the grid representation
      for (let i = lowestHeight; i < lowestHeight + height; i++) {
        if (!grid[i]) grid[i] = Array(columnsCount).fill(null);
        for (let j = bestColumn; j < bestColumn + colSpan; j++) {
          if (j < columnsCount) {
            grid[i][j] = index;
          }
        }
      }
    });
    
    return itemsWithPosition;
  }, [normalizedItems, columnsCount]);
  
  const defaultRenderItem = (item: GalleryItem, index: number) => (
    <img 
      src={item.src} 
      alt={item.alt || `Gallery item ${index}`}
      loading={lazyLoad ? "lazy" : undefined}
      style={{ 
        width: '100%', 
        height: '100%',
        objectFit: 'cover',
        display: 'block',
      }} 
    />
  );

  return (
    <div 
      className={`masonry-gallery ${className}`}
      style={{ 
        display: 'grid',
        gridTemplateColumns: `repeat(${columnsCount}, 1fr)`,
        gap: gutterSize,
        position: 'relative',
        ...style 
      }}
    >
      {gridItems.map((item, index) => {
        const itemKey = item.id || `item-${index}`;
        
        return (
          <div 
            key={itemKey}
            className={`masonry-gallery-item ${itemClassName}`}
            style={{
              gridColumn: `${item.gridColumn} / span ${item.gridColumnSpan}`,
              gridRow: `${item.gridRow} / span ${item.gridRowSpan}`,
              position: 'relative',
              overflow: 'hidden',
              ...itemStyle,
            }}
            onClick={onItemClick ? () => onItemClick(item, index) : undefined}
          >
            {renderItem 
              ? renderItem(item, lazyLoad, index) 
              : defaultRenderItem(item, index)
            }
          </div>
        );
      })}
    </div>
  );
};

export default MasonryGallery; 