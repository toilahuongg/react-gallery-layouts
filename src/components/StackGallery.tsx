import React, { useMemo } from 'react';
import { StackGalleryProps, GalleryItem } from '../types';
import { getColumnsCount, normalizeItems } from '../utils';

const StackGallery: React.FC<StackGalleryProps> = ({
  items,
  gutter = 10,
  columns = 3,
  maxWidth = '100%',
  alignment = 'flex-start',
  renderItem,
  className = '',
  style = {},
  itemClassName = '',
  itemStyle = {},
  onItemClick,
  lazyLoad = false,
}) => {
  const normalizedItems = useMemo(() => normalizeItems(items), [items]);
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
        height: 'auto', // Auto height to preserve aspect ratio
        display: 'block',
      }}
    />
  );

  return (
    <div
      className={`stack-gallery ${className}`}
      style={{
        width: maxWidth,
        display: 'flex',
        flexWrap: 'wrap',
        gap: gutterSize,
        alignItems: alignment,
        ...style
      }}
    >
      {normalizedItems.map((item, index) => {
        const itemKey = item.id || `stack-item-${index}`;
        const colSpan = Math.min(item.colSpan || 1, columnsCount);
        const rowSpan = item.rowSpan || 1;
        
        // Calculate the width of this item based on colSpan
        const itemWidth = `calc(${(100 / columnsCount) * colSpan}% - ${(columnsCount - colSpan) * gutterSize / columnsCount}px)`;
        
        return (
          <div 
            key={itemKey}
            style={{
              flexBasis: itemWidth,
              flexGrow: 0,
              flexShrink: 0,
              marginBottom: rowSpan > 1 ? `calc(${gutterSize}px * ${rowSpan - 1})` : 0,
            }}
          >
            <div
              className={`stack-gallery-item ${itemClassName}`}
              style={{
                width: '100%',
                overflow: 'hidden',
                height: rowSpan > 1 ? `calc(100% + ${gutterSize}px * ${rowSpan - 1})` : '100%',
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

export default StackGallery; 