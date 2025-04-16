import React, { useMemo } from 'react';
import { GridGalleryProps, GalleryItem } from '../types';
import { getColumnsCount } from '../utils';

const GridGallery: React.FC<GridGalleryProps> = ({
  items,
  columns = 3,
  gutter = 10,
  itemHeight,
  renderItem,
  className = '',
  style = {},
  itemClassName = '',
  itemStyle = {},
  onItemClick,
  lazyLoad = false,
}) => {
  const columnsCount = useMemo(() => getColumnsCount(columns), [columns]);
  
  // Calculate the effective gutter value
  const gutterSize = typeof gutter === 'number' ? gutter : 10;
  
  const defaultRenderItem = (item: GalleryItem, index: number) => (
    <img 
      src={item.src} 
      alt={item.alt || `Gallery item ${index}`}
      loading={lazyLoad ? "lazy" : undefined}
      style={{ 
        width: '100%',
        height: itemHeight || 'auto',
        objectFit: 'cover',
        display: 'block',
      }} 
    />
  );

  return (
    <div 
      className={`grid-gallery ${className}`}
      style={{ 
        display: 'grid',
        gridTemplateColumns: `repeat(${columnsCount}, 1fr)`,
        gap: gutterSize,
        ...style 
      }}
    >
      {items.map((item, index) => {
        const itemKey = item.id || `grid-item-${index}`;
        const colSpan = item.colSpan || 1;
        const rowSpan = item.rowSpan || 1;
        
        return (
          <div 
            key={itemKey}
            style={{
              gridColumn: `span ${colSpan}`,
              gridRow: `span ${rowSpan}`,
            }}
          >
            <div
              className={`grid-gallery-item ${itemClassName}`}
              style={{
                width: '100%',
                height: '100%',
                overflow: 'hidden',
                ...itemStyle,
              }}
              onClick={onItemClick ? () => onItemClick(item, index) : undefined}
            >
              {renderItem 
                ? renderItem(item, index) 
                : defaultRenderItem(item, index)
              }
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default GridGallery; 