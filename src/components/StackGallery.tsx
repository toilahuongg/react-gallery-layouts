import React, { useMemo } from 'react';
import { StackGalleryProps, GalleryItem } from '../types';
import { getColumnsCount, normalizeItems } from '../utils';

const StackGallery: React.FC<StackGalleryProps> = ({
  items,
  gutter = 10,
  columns = 3,
  maxWidth = '100%',
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
        display: 'grid',
        gridTemplateColumns: `repeat(${columnsCount}, 1fr)`,
        gap: gutterSize,
        ...style
      }}
    >
      {normalizedItems.map((item, index) => {
        const itemKey = item.id || `stack-item-${index}`;
        const colSpan = item.colSpan || 1;
        const rowSpan = item.rowSpan || 1;
        
        return (
          <div key={itemKey}
            style={{
              gridColumn: `span ${colSpan}`,
              gridRow: `span ${rowSpan}`,
            }}
          >
            <div
              className={`stack-gallery-item ${itemClassName}`}
              style={{
                width: '100%',
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

export default StackGallery; 