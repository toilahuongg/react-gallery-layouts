import React, { useMemo } from 'react';
import { GridGalleryProps, GalleryItem } from '../types';
import { getColumnsCount, getGutter } from '../utils';
import useWindowResize from '../hooks/useWindowResize';

const GridGallery: React.FC<GridGalleryProps> = ({
  items,
  columns = 3,
  gutter = 10,
  itemHeight = 200,
  renderItem,
  className = '',
  style = {},
  itemClassName = '',
  itemStyle = {},
  onItemClick,
  lazyLoad = false,
}) => {
  const windowSize = useWindowResize();
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
        height: '100%',
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
            className={`grid-gallery-item ${itemClassName}`}
            style={{
              gridColumn: `span ${colSpan}`,
              gridRow: `span ${rowSpan}`,
              overflow: 'hidden',
              height: itemHeight * rowSpan + gutterSize * (rowSpan - 1),
              ...itemStyle,
            }}
            onClick={onItemClick ? () => onItemClick(item, index) : undefined}
          >
            {renderItem
              ? renderItem(item, index)
              : defaultRenderItem(item, index)
            }
          </div>
        );
      })}
    </div>
  );
};

export default GridGallery; 