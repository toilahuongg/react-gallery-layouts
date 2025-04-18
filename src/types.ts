import { CSSProperties, HTMLAttributes, ReactNode } from 'react';

/**
 * Available gallery layout types
 */
export type GalleryLayout = 'masonry' | 'grid' | 'stack' | 'justified';

/**
 * Represents the number of columns to display in the gallery
 * @default 3 || { default: 3, 768: 2, 1024: 3 }
 */
export type GalleryColumns = number | { [key: string]: number };

/**
 * Represents the gutter between items in the gallery
 * @default 10 || { default: 10, 768: 20, 1024: 30 }
 */
export type GalleryGutter = number | { [key: string]: number };

/**
 * Represents an item in the gallery
 */
export interface GalleryItem {
  /**
   * Unique identifier for the item
   */
  id: string | number;
  
  /**
   * Source URL of the image
   */
  src: string;
  
  /**
   * Alternative text for the image
   * @default "Gallery item"
   */
  alt?: string;
  
  /**
   * Width of the original image in pixels
   * Required for proper layout calculations
   */
  width?: number;
  
  /**
   * Height of the original image in pixels
   * Required for proper layout calculations
   */
  height?: number;
  
  /**
   * The aspect ratio of the item (width/height)
   * If not provided, it will be calculated from the width and height
   * Example: 16/9 = 1.7777777777777777
   */
  aspectRatio?: number;
  
  /**
   * The number of columns the item should span horizontally
   * @default 1
   */
  colSpan?: number;
  
  /**
   * The number of rows the item should span vertically
   * @default 1
   */
  rowSpan?: number;
  
  /**
   * Any additional properties
   */
  [key: string]: any;
}

/**
 * Base properties shared by all gallery components
 */
export interface BaseGalleryProps {
  /**
   * Array of items to display in the gallery
   */
  items: GalleryItem[];
  
  /**
   * Custom render function for each item
   * @param item - The gallery item to render
   * @param index - The index of the item in the array
   * @returns A React node to render
   */
  renderItem?: (item: GalleryItem, index: number) => ReactNode;
  
  /**
   * CSS class for the gallery container
   * @default ""
   */
  className?: string;
  
  /**
   * Inline styles for the gallery container
   * @default {}
   */
  style?: CSSProperties;
  
  /**
   * CSS class for each item in the gallery
   * @default ""
   */
  itemClassName?: string;
  
  /**
   * Inline styles for each item in the gallery
   * @default {}
   */
  itemStyle?: CSSProperties;
  
  /**
   * Function to call when an item is clicked
   * @param item - The clicked gallery item
   * @param index - The index of the clicked item
   */
  onItemClick?: (item: GalleryItem, index: number) => void;
  
  /**
   * Whether to enable native lazy loading for images
   * @default false
   */
  lazyLoad?: boolean;
}

/**
 * Properties for the Masonry Gallery component
 */
export interface MasonryGalleryProps extends BaseGalleryProps {
  /**
   * Number of columns to display
   * Can be a fixed number or an object with breakpoints
   * @example { 768: 2, 1024: 3, default: 1 }
   * @default 3
   */
  columns?: GalleryColumns;
  
  /**
   * Space between items in pixels
   * Can be a fixed number or an object with breakpoints
   * @default 10
   */
  gutter?: GalleryGutter;
}

/**
 * Properties for the Grid Gallery component
 */
export interface GridGalleryProps extends BaseGalleryProps {
  /**
   * Width of the container in pixels
   */
  containerWidth: number;
  /**
   * Number of columns to display
   * Can be a fixed number or an object with breakpoints
   * @example { 768: 2, 1024: 3, default: 1 }
   * @default 3
   */
  columns?: GalleryColumns;
  
  /**
   * Space between items in pixels
   * Can be a fixed number or an object with breakpoints
   * @default 10
   */
  gutter?: GalleryGutter;
  
  /**
   * Fixed height for all items
   * Can be a number (in pixels)
   * @default "200"
   */
  itemHeight?: number;

  /**
   * The aspect ratio of the item (width/height)
   * If not provided, it will be calculated from the width and height
   * Example: 16/9 = 1.7777777777777777
   */
  aspectRatio?: number;
}

/**
 * Properties for the Stack Gallery component
 */
export interface StackGalleryProps extends BaseGalleryProps {
  /**
   * Number of columns to display
   * Can be a fixed number or an object with breakpoints
   * @example { 768: 2, 1024: 3, default: 1 }
   * @default 3
   */
  columns?: GalleryColumns;
  
  /**
   * Space between items in pixels
   * @default 10
   */
  gutter?: GalleryGutter;
  
  /**
   * Maximum width of each column
   * Can be a number (in pixels) or a CSS string value
   * @default "100%"
   */
  maxWidth?: number | string;

  /**
   * Horizontal alignment of items within their columns
   * @default "flex-start"
   */
  alignment?: "flex-start" | "center" | "flex-end";
}

/**
 * Properties for the Justified Gallery component
 */
export interface JustifiedGalleryProps extends BaseGalleryProps {
  /**
   * Target height for each row in pixels
   * @default 200
   */
  targetRowHeight?: number;
  
  /**
   * Width of the container in pixels
   * If not provided, it will use the parent element's width
   */
  containerWidth?: number;
  
  /**
   * Maximum height for each row in pixels
   * @default 400
   */
  maxRowHeight?: number;
  
  /**
   * Padding around the container in pixels
   * @default 0
   */
  containerPadding?: number;
  
  /**
   * Space between items in pixels
   * @default 10
   */
  gutter?: GalleryGutter;
} 

export interface GalleryLayoutOptions {
  /**
   * Options for the Masonry layout
   */
  masonry?: {
    /**
     * The number of columns to display
     * @default 3
     */
    columns?: GalleryColumns;
    /**
     * The space between items in pixels
     * @default 10
     */
    gutter?: GalleryGutter;
    /**
     * The aspect ratio of the item (width/height)
     * If not provided, it will be calculated from the width and height
     * Example: 16/9 = 1.7777777777777777
     */
    aspectRatio?: number;
  };
  /**
   * Options for the Grid layout
   */
  grid?: {
    /**
     * The number of columns to display
     * @default 3
     */
    columns?: GalleryColumns;
    /**
     * The space between items in pixels
     * @default 10
     */
    gutter?: GalleryGutter;
    /**
     * The height of each item in pixels
     * @default 200
     */
    itemHeight?: number;
    /**
     * The aspect ratio of the item (width/height)
     * If not provided, it will be calculated from the width and height
     * Example: 16/9 = 1.7777777777777777
     */
    aspectRatio?: number;
  };
  /**
   * Options for the Stack layout
   */
  stack?: {
    /**
     * The number of columns to display
     * @default 3
     */
    columns?: GalleryColumns;
    /**
     * The space between items in pixels
     * @default 10
     */
    gutter?: GalleryGutter;
    /**
     * The maximum width of each column
     * @default '100%'
     */
    maxWidth?: number | string;
    /**
     * The alignment of the items within their columns
     * @default 'flex-start'
     */
    alignment?: 'flex-start' | 'flex-end' | 'center';
  };
  /**
   * Options for the Justified layout
   */
  justified?: {
    /**
     * The target height for each row in pixels
     * @default 200
     */
    targetRowHeight?: number;
    /**
     * The maximum height for each row in pixels
     * @default 400
     */
    maxRowHeight?: number;
    /**
     * The padding around the container in pixels
     * @default 0
     */
    containerPadding?: number;
    /**
     * The space between items in pixels
     * @default 10
     */
    gutter?: GalleryGutter;
  };
}

export interface GalleryProps extends BaseGalleryProps {
  /**
   * The layout to use for the gallery
   * @default 'masonry'
   */
  layout?: GalleryLayout;
  /**
   * Options for the layout
   */
  layoutOptions?: GalleryLayoutOptions;
}


export interface WindowSize {
  width: number;
  height: number;
}
