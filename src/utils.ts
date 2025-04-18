import { GalleryColumns, GalleryGutter, GalleryItem, WindowSize } from './types';
/**
 * Calculate aspect ratio from width and height
 */
export const calculateAspectRatio = (width: number, height: number): number => {
  return width / height;
};

/**
 * Normalize all items to ensure they have aspect ratio
 */
export const normalizeItems = (items: GalleryItem[]): GalleryItem[] => {
  return items.map(item => {
    // If item already has aspectRatio, use it
    if (item.aspectRatio) {
      return item;
    }
    
    // If item has width and height, calculate aspect ratio
    if (item.width && item.height) {
      return {
        ...item,
        aspectRatio: calculateAspectRatio(item.width, item.height)
      };
    }
    
    // Default to square aspect ratio if no dimensions provided
    return {
      ...item,
      aspectRatio: 1
    };
  });
};

/**
 * Calculate width for an item given a target height and aspect ratio
 */
export const calculateWidth = (height: number, aspectRatio: number): number => {
  return height * aspectRatio;
};

/**
 * Calculate height for an item given a target width and aspect ratio
 */
export const calculateHeight = (width: number, aspectRatio: number): number => {
  return width / aspectRatio;
};

/**
 * Determine how many columns to use based on responsive settings
 */
export const getColumnsCount = (columns: GalleryColumns = 3, windowSize: WindowSize): number => {
  if (typeof columns === 'number') {
    return columns;
  }
  
  // For SSR, return a default value
  if (typeof window === 'undefined') {
    return columns.default || 3;
  }
  
  const breakpoints = Object.keys(columns)
    .filter(breakpoint => breakpoint !== 'default')
    .map(Number)
    .sort((a, b) => a - b);
  
  for (let i = breakpoints.length - 1; i >= 0; i--) {
    if (windowSize.width >= breakpoints[i]) {
      return columns[breakpoints[i]];
    }
  }
  
  return columns.default || 3;
}; 

/**
 * Determine how many columns to use based on responsive settings
 */
export const getGutter = (gutter: GalleryGutter = 10, windowSize: WindowSize): number => {
  if (typeof gutter === 'number') {
    return gutter;
  }
  // for SSR, return a default value
  if (typeof window === 'undefined') {
    return gutter.default || 10;
  }

  const breakpoints = Object.keys(gutter)
    .filter(breakpoint => breakpoint !== 'default')
    .map(Number)
    .sort((a, b) => a - b);

  for (let i = breakpoints.length - 1; i >= 0; i--) {
    if (windowSize.width >= breakpoints[i]) {
      return gutter[breakpoints[i]];
    }
  }

  return gutter.default || 10;
};



export const debounce = (func: Function, delay: number) => {
  let timeout: NodeJS.Timeout;
  return (...args: any[]) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), delay);
  };
};