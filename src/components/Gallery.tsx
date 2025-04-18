import React, { useEffect, useRef, useState } from 'react';
import { GalleryProps } from '../types';
import GridGallery from './GridGallery';
import JustifiedGallery from './JustifiedGallery';
import MasonryGallery from './MasonryGallery';
import StackGallery from './StackGallery';



const Gallery: React.FC<GalleryProps> = ({
  items,
  layout = 'masonry',
  layoutOptions = {},
  renderItem,
  className = '',
  style = {},
  itemClassName = '',
  itemStyle = {},
  onItemClick,
  lazyLoad = false,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState<number>(0);

  // Update container width when window resizes
  useEffect(() => {
    const updateContainerWidth = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.clientWidth);
      }
    };

    // Initial measurement
    updateContainerWidth();

    // Add resize listener
    window.addEventListener('resize', updateContainerWidth);

    // Clean up
    return () => {
      window.removeEventListener('resize', updateContainerWidth);
    };
  }, []);

  // Render the appropriate gallery layout
  const renderGallery = () => {
    const commonProps = {
      items,
      renderItem,
      className,
      style,
      itemClassName,
      itemStyle,
      onItemClick,
      lazyLoad,
    };

    switch (layout) {
      case 'masonry':
        return (
          <MasonryGallery
            {...commonProps}
            columns={layoutOptions.masonry?.columns}
            gutter={layoutOptions.masonry?.gutter}
          />
        );
      case 'grid':
        return (
          <GridGallery
            {...commonProps}
            containerWidth={containerWidth}
            columns={layoutOptions.grid?.columns}
            gutter={layoutOptions.grid?.gutter}
            itemHeight={layoutOptions.grid?.itemHeight}
            aspectRatio={layoutOptions.grid?.aspectRatio}
          />
        );
      case 'stack':
        return (
          <StackGallery
            {...commonProps}
            columns={layoutOptions.stack?.columns}
            gutter={layoutOptions.stack?.gutter}
            maxWidth={layoutOptions.stack?.maxWidth}
          />
        );
      case 'justified':
        return (
          <JustifiedGallery
            {...commonProps}
            containerWidth={containerWidth}
            targetRowHeight={layoutOptions.justified?.targetRowHeight}
            maxRowHeight={layoutOptions.justified?.maxRowHeight}
            containerPadding={layoutOptions.justified?.containerPadding}
            gutter={layoutOptions.justified?.gutter}
          />
        );
      default:
        return (
          <MasonryGallery
            {...commonProps}
            columns={layoutOptions.masonry?.columns}
            gutter={layoutOptions.masonry?.gutter}
          />
        );
    }
  };

  return (
    <div
      ref={containerRef}
      className={`gallery-container ${className}`}
      style={{
        width: '100%',
        ...style,
      }}
    >
      {renderGallery()}
    </div>
  );
};

export default Gallery; 