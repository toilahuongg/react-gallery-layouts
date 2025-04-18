import React, { useMemo } from 'react';
import { JustifiedGalleryProps, GalleryItem } from '../types';
import { normalizeItems, calculateWidth, getGutter } from '../utils';
import useWindowResize from '../hooks/useWindowResize';
import '../styles/gallery.css';

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
  const windowSize = useWindowResize();
  const normalizedItems = useMemo(() => normalizeItems(items), [items]);
  const gutterSize = useMemo(() => getGutter(gutter, windowSize), [gutter, windowSize]);
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
      if (currentRow.length > 0 && currentRowWidth + itemWidth + (gutterSize * currentRow.length) > availableWidth) {
        // Calculate scaling factor to fit items in the row
        const rowWidth = currentRowWidth + (gutterSize * (currentRow.length - 1));
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
      const rowWidth = currentRowWidth + (gutterSize * (currentRow.length - 1));
      
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
    />
  );

  return (
    <div 
      className={`gallery-layout layout-justified ${className}`}
      style={{ 
        padding: containerPadding,
        ...style 
      }}
    >
      {rows.map((row, rowIndex) => (
        <div 
          key={`row-${rowIndex}`}
          className={`gallery-row`}
          style={{ 
            marginBottom: rowIndex < rows.length - 1 ? gutterSize : 0,
          }}
        >
          {row.items.map((item, itemIndex) => {
            const itemKey = item.id || `justified-item-${rowIndex}-${itemIndex}`;
            return (
              <div 
                key={itemKey}
                className={`gallery-item gallery-item-justified ${itemClassName}`}
                style={{
                  width: item.calculatedWidth,
                  height: item.calculatedHeight,
                  marginRight: itemIndex < row.items.length - 1 ? gutterSize : 0,
                  ...itemStyle,
                }}
                onClick={onItemClick ? () => onItemClick(item, itemIndex) : undefined}
              >
                {renderItem 
                  ? renderItem(item, lazyLoad, itemIndex) 
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