import React, { useState, useEffect, useRef } from 'react';
import { GalleryLayout, GalleryItem, BaseGalleryProps } from '../types';
import MasonryGallery from './MasonryGallery';
import GridGallery from './GridGallery';
import StackGallery from './StackGallery';
import JustifiedGallery from './JustifiedGallery';

export interface GalleryProps extends BaseGalleryProps {
  layout?: GalleryLayout;
  layoutOptions?: {
    masonry?: {
      columns?: number | { [key: string]: number };
      gutter?: number | { [key: string]: number };
    };
    grid?: {
      columns?: number | { [key: string]: number };
      gutter?: number | { [key: string]: number };
      itemHeight?: number | string;
    };
    stack?: {
      columns?: number | { [key: string]: number };
      gutter?: number;
      maxWidth?: number | string;
    };
    justified?: {
      targetRowHeight?: number;
      maxRowHeight?: number;
      containerPadding?: number;
      gutter?: number;
    };
  };
}

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
            columns={layoutOptions.grid?.columns}
            gutter={layoutOptions.grid?.gutter}
            itemHeight={layoutOptions.grid?.itemHeight}
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