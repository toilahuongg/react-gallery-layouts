import { CSSProperties, ReactNode } from 'react';

export type GalleryLayout = 'masonry' | 'grid' | 'stack' | 'justified';

export interface GalleryItem {
  id: string | number;
  src: string;
  alt?: string;
  width?: number;
  height?: number;
  aspectRatio?: number;
  colSpan?: number;
  rowSpan?: number;
  [key: string]: any;
}

export interface BaseGalleryProps {
  items: GalleryItem[];
  renderItem?: (item: GalleryItem, index: number) => ReactNode;
  className?: string;
  style?: CSSProperties;
  itemClassName?: string;
  itemStyle?: CSSProperties;
  onItemClick?: (item: GalleryItem, index: number) => void;
  lazyLoad?: boolean;
}

export interface MasonryGalleryProps extends BaseGalleryProps {
  columns?: number | { [key: string]: number };
  gutter?: number | { [key: string]: number };
}

export interface GridGalleryProps extends BaseGalleryProps {
  columns?: number | { [key: string]: number };
  gutter?: number | { [key: string]: number };
  itemHeight?: number | string;
}

export interface StackGalleryProps extends BaseGalleryProps {
  columns?: number | { [key: string]: number };
  gutter?: number;
  maxWidth?: number | string;
}

export interface JustifiedGalleryProps extends BaseGalleryProps {
  targetRowHeight?: number;
  containerWidth?: number;
  maxRowHeight?: number;
  containerPadding?: number;
  gutter?: number;
} 