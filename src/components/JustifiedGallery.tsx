import React, { useMemo } from 'react';
import { JustifiedGalleryProps, GalleryItem } from '../types';
import { normalizeItems, calculateWidth } from '../utils';

interface RowItem extends GalleryItem {
  calculatedWidth: number;
  calculatedHeight: number;
}

interface Row {
  items: RowItem[];
  width: number;
}

const JustifiedGallery: React.FC<JustifiedGalleryProps> = ({
  items,
  targetRowHeight = 200,
  containerWidth,
  maxRowHeight = 400,
  containerPadding = 0,
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
  
  // Calculate rows - handle colSpan by adjusting aspect ratio
  const rows = useMemo(() => {
    if (!containerWidth) {
      return [];
    }
    
    const availableWidth = containerWidth - (2 * containerPadding);
    const rows: Row[] = [];
    let currentRow: RowItem[] = [];
    let currentRowWidth = 0;
    
    // Process items with colSpan values considered
    normalizedItems.forEach((item) => {
      if (!item.aspectRatio) return;
      
      // Adjust the aspect ratio based on colSpan
      const colSpan = item.colSpan || 1;
      const effectiveAspectRatio = item.aspectRatio * colSpan;
      
      // Calculate item width based on target height and adjusted aspect ratio
      const itemWidth = calculateWidth(targetRowHeight, effectiveAspectRatio);
      
      // Add item to current row if it fits
      const newRowItem: RowItem = {
        ...item,
        calculatedWidth: itemWidth,
        calculatedHeight: targetRowHeight,
      };
      
      // If adding this item would exceed available width, complete the row
      if (currentRow.length > 0 && currentRowWidth + itemWidth + (gutter * currentRow.length) > availableWidth) {
        // Calculate scaling factor to fit items in the row
        const rowWidth = currentRowWidth + (gutter * (currentRow.length - 1));
        const scaleFactor = Math.min(availableWidth / rowWidth, maxRowHeight / targetRowHeight);
        
        // Scale items to fit
        const scaledRow = currentRow.map(rowItem => ({
          ...rowItem,
          calculatedWidth: rowItem.calculatedWidth * scaleFactor,
          calculatedHeight: rowItem.calculatedHeight * scaleFactor,
        }));
        
        rows.push({
          items: scaledRow,
          width: rowWidth * scaleFactor,
        });
        
        // Start a new row with the current item
        currentRow = [newRowItem];
        currentRowWidth = itemWidth;
      } else {
        // Add to current row
        currentRow.push(newRowItem);
        currentRowWidth += itemWidth;
      }
    });
    
    // Handle last row
    if (currentRow.length > 0) {
      const rowWidth = currentRowWidth + (gutter * (currentRow.length - 1));
      
      // For the last row, we can either justify it or left-align it
      // Here we're opting to justify it like other rows for consistency
      const scaleFactor = Math.min(availableWidth / rowWidth, maxRowHeight / targetRowHeight);
      
      const scaledRow = currentRow.map(rowItem => ({
        ...rowItem,
        calculatedWidth: rowItem.calculatedWidth * scaleFactor,
        calculatedHeight: rowItem.calculatedHeight * scaleFactor,
      }));
      
      rows.push({
        items: scaledRow,
        width: rowWidth * scaleFactor,
      });
    }
    
    return rows;
  }, [normalizedItems, containerWidth, targetRowHeight, maxRowHeight, containerPadding, gutter]);
  
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
      className={`justified-gallery ${className}`}
      style={{ 
        padding: containerPadding,
        ...style 
      }}
    >
      {rows.map((row, rowIndex) => (
        <div 
          key={`row-${rowIndex}`}
          style={{ 
            display: 'flex',
            marginBottom: rowIndex < rows.length - 1 ? gutter : 0,
          }}
        >
          {row.items.map((item, itemIndex) => {
            const itemKey = item.id || `justified-item-${rowIndex}-${itemIndex}`;
            return (
              <div 
                key={itemKey}
                className={`justified-gallery-item ${itemClassName}`}
                style={{
                  width: item.calculatedWidth,
                  height: item.calculatedHeight,
                  marginRight: itemIndex < row.items.length - 1 ? gutter : 0,
                  ...itemStyle,
                }}
                onClick={onItemClick ? () => onItemClick(item, itemIndex) : undefined}
              >
                {renderItem 
                  ? renderItem(item, itemIndex) 
                  : defaultRenderItem(item, itemIndex)
                }
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default JustifiedGallery; 