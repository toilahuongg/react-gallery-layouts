import React, { useMemo } from 'react';
import { StackGalleryProps, GalleryItem } from '../types';
import { getColumnsCount, normalizeItems, getGutter } from '../utils';
import useWindowResize from '../hooks/useWindowResize';

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
  const windowSize = useWindowResize();
  const normalizedItems = useMemo(() => normalizeItems(items), [items]);
  const columnsCount = useMemo(() => getColumnsCount(columns, windowSize), [columns, windowSize]);

  // Calculate the effective gutter value
  const gutterSize = useMemo(() => getGutter(gutter, windowSize), [gutter, windowSize]);

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
            className={`stack-gallery-item ${itemClassName}`}
            style={{
              width: '100%',
              overflow: 'hidden',
              height: rowSpan > 1 ? `calc(100% + ${gutterSize}px * ${rowSpan - 1})` : '100%',
              flexBasis: itemWidth,
              flexGrow: 0,
              flexShrink: 0,
              marginBottom: rowSpan > 1 ? `calc(${gutterSize}px * ${rowSpan - 1})` : 0,
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

export default StackGallery; 