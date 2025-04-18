import React, { useMemo } from 'react';
import { MasonryGalleryProps, GalleryItem } from '../types';
import { normalizeItems, getColumnsCount, getGutter } from '../utils';
import useWindowResize from '../hooks/useWindowResize';

const MasonryGallery: React.FC<MasonryGalleryProps> = ({
  items,
  containerWidth,
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

  const { itemsWithPosition, containerHeight } = useMemo(() => {
    // Khởi tạo mảng theo dõi chiều cao các cột
    const colYs: number[] = Array(columnsCount).fill(0);
    let maxY = 0;

    // Tính toán kích thước cột và gutter
    const availableWidth = containerWidth || windowSize.width;
    const columnWidth = Math.floor((availableWidth - (columnsCount - 1) * gutterSize) / columnsCount);
    const effectiveGutter = gutterSize;

    const itemsWithPosition = normalizedItems.map((item) => {
      // Tính toán số cột mà item sẽ chiếm
      const colSpan = Math.min(item.colSpan || 1, columnsCount);
      
      // Tìm vị trí tốt nhất cho item
      let bestCol = 0;
      let minY = Infinity;

      // Tìm nhóm cột có chiều cao thấp nhất
      for (let col = 0; col <= columnsCount - colSpan; col++) {
        const groupHeight = Math.max(...colYs.slice(col, col + colSpan));
        if (groupHeight < minY) {
          minY = groupHeight;
          bestCol = col;
        }
      }

      // Tính toán chiều cao dựa trên tỷ lệ khung hình
      const aspectRatio = item.height && item.width 
        ? item.height / item.width 
        : 1; // Fallback ratio
      
      const itemWidth = (columnWidth * colSpan) + ((colSpan - 1) * effectiveGutter);
      const height = Math.round(aspectRatio * columnWidth);

      // Cập nhật chiều cao cho các cột bị ảnh hưởng
      for (let col = bestCol; col < bestCol + colSpan; col++) {
        colYs[col] = minY + height + effectiveGutter;
      }

      // Cập nhật maxY
      maxY = Math.max(maxY, minY + height + effectiveGutter);

      // Tính toán vị trí tuyệt đối
      const left = bestCol * (columnWidth + effectiveGutter);
      const top = minY;

      return {
        ...item,
        position: {
          left: `${left}px`,
          top: `${top}px`,
          width: `${itemWidth}px`,
          height: `${height}px`,
        },
      };
    });

    return {
      itemsWithPosition,
      containerHeight: maxY,
    };
  }, [normalizedItems, columnsCount, gutterSize, containerWidth, windowSize.width]);

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
        position: 'relative',
        height: `${containerHeight}px`,
        width: containerWidth ? `${containerWidth}px` : '100%',
        ...style 
      }}
    >
      {itemsWithPosition.map((item, index) => {
        const itemKey = item.id || `item-${index}`;
        
        return (
          <div 
            key={itemKey}
            className={`masonry-gallery-item ${itemClassName}`}
            style={{
              position: 'absolute',
              ...item.position,
              boxSizing: 'border-box',
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