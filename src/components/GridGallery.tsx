import React, { useEffect, useMemo, useRef, useState } from 'react';
import { GridGalleryProps, GalleryItem } from '../types';
import { getColumnsCount, getGutter } from '../utils';
import useWindowResize from '../hooks/useWindowResize';

interface GridGalleryItemProps {
  item: GalleryItem;
  index: number;
  itemHeight: number;
  aspectRatio?: number;
  gutterSize: number;
  itemClassName?: string;
  itemWidth: number;
  itemStyle?: React.CSSProperties;
  onItemClick?: (item: GalleryItem, index: number) => void;
  renderItem?: (item: GalleryItem, lazyLoad: boolean, index: number) => React.ReactNode;
  lazyLoad?: boolean;
}

const GridGalleryItem: React.FC<GridGalleryItemProps> = ({
  item,
  index,
  itemHeight,
  aspectRatio,
  gutterSize,
  itemClassName = '',
  itemStyle = {},
  itemWidth,
  onItemClick,
  renderItem,
  lazyLoad = false,
}) => {
  const colSpan = item.colSpan || 1;
  const rowSpan = item.rowSpan || 1;

  const [$itemHeight, setItemHeight] = useState(itemHeight);

  useEffect(() => {
    const effectiveAspectRatio = item.aspectRatio || aspectRatio;
    setItemHeight(effectiveAspectRatio ? itemWidth / effectiveAspectRatio : itemHeight);
  }, [itemHeight, aspectRatio, item.aspectRatio, itemWidth]);

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
      className={`grid-gallery-item ${itemClassName}`}
      style={{
        gridColumn: `span ${colSpan}`,
        gridRow: `span ${rowSpan}`,
        overflow: 'hidden',
        height: $itemHeight * rowSpan + gutterSize * (rowSpan - 1),
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
};

const GridGallery: React.FC<GridGalleryProps> = ({
  items,
  columns = 3,
  gutter = 10,
  itemHeight = 200,
  aspectRatio,
  className = '',
  containerWidth,
  style = {},
  itemClassName = '',
  itemStyle = {},
  lazyLoad = false,
  onItemClick,
  renderItem,
}) => {
  const windowSize = useWindowResize();
  const columnsCount = useMemo(() => getColumnsCount(columns, windowSize), [columns, windowSize]);

  // Calculate the effective gutter value
  const gutterSize = useMemo(() => getGutter(gutter, windowSize), [gutter, windowSize]);
  const itemWidth = useMemo(() => ((containerWidth - gutterSize * (columnsCount - 1))) / columnsCount, [containerWidth, gutterSize, columnsCount]);

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
      {items.map((item, index) => (
        <GridGalleryItem
          key={item.id || `grid-item-${index}`}
          item={item}
          index={index}
          itemWidth={itemWidth}
          itemHeight={itemHeight}
          aspectRatio={aspectRatio}
          gutterSize={gutterSize}
          itemClassName={itemClassName}
          itemStyle={itemStyle}
          onItemClick={onItemClick}
          renderItem={renderItem}
          lazyLoad={lazyLoad}
        />
      ))}
    </div>
  );
};

export default GridGallery; 