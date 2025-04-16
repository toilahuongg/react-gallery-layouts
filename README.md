# React Gallery Layouts

A flexible and customizable React TypeScript library for displaying images in various gallery layouts, including masonry, grid, stack, and justified views.

## Installation

```bash
npm install react-gallery-layouts
# or
yarn add react-gallery-layouts
```

## Usage

### Basic Usage

```tsx
import React from 'react';
import { Gallery } from 'react-gallery-layouts';

const MyGallery = () => {
  const items = [
    {
      id: 1,
      src: 'https://example.com/image1.jpg',
      alt: 'Image 1',
      width: 800,
      height: 600
    },
    {
      id: 2,
      src: 'https://example.com/image2.jpg',
      alt: 'Image 2',
      width: 600,
      height: 800,
      colSpan: 2 // This item will span 2 columns
    },
    {
      id: 3,
      src: 'https://example.com/image3.jpg',
      alt: 'Image 3',
      width: 1200,
      height: 800,
      rowSpan: 2 // This item will span 2 rows
    },
    // ... more items
  ];

  return (
    <Gallery
      items={items}
      layout="masonry" // 'masonry', 'grid', 'stack', or 'justified'
      layoutOptions={{
        masonry: {
          columns: 3,
          gutter: 10
        }
      }}
      onItemClick={(item, index) => console.log('Clicked item:', item, 'at index:', index)}
      lazyLoad={true} // Enable lazy loading of images
    />
  );
};

export default MyGallery;
```

### Different Layouts

#### Masonry Layout

```tsx
<Gallery
  items={items}
  layout="masonry"
  layoutOptions={{
    masonry: {
      columns: 3, // or responsive: { 768: 2, 1024: 3, default: 1 }
      gutter: 10
    }
  }}
/>
```

#### Grid Layout

```tsx
<Gallery
  items={items}
  layout="grid"
  layoutOptions={{
    grid: {
      columns: 4,
      gutter: 10,
      itemHeight: 200 // Fixed height for all items
    }
  }}
/>
```

#### Stack Layout

The stack layout is similar to the grid layout but with automatic height that preserves the original aspect ratio of each image:

```tsx
<Gallery
  items={items}
  layout="stack"
  layoutOptions={{
    stack: {
      columns: 3, // or responsive: { 768: 2, 1024: 3, default: 1 }
      gutter: 10
    }
  }}
/>
```

#### Justified Layout

```tsx
<Gallery
  items={items}
  layout="justified"
  layoutOptions={{
    justified: {
      targetRowHeight: 200,
      maxRowHeight: 300,
      containerPadding: 10,
      gutter: 10
    }
  }}
/>
```

### Column and Row Spanning

You can make items span multiple columns or rows by adding `colSpan` and `rowSpan` properties to the gallery items:

```tsx
const items = [
  {
    id: 1,
    src: 'image1.jpg',
    alt: 'A normal image',
    width: 800,
    height: 600
  },
  {
    id: 2,
    src: 'image2.jpg',
    alt: 'A wide image',
    width: 1600,
    height: 600,
    colSpan: 2 // This item spans 2 columns
  },
  {
    id: 3,
    src: 'image3.jpg',
    alt: 'A tall image',
    width: 800,
    height: 1200,
    rowSpan: 2 // This item spans 2 rows
  },
  {
    id: 4,
    src: 'image4.jpg',
    alt: 'A large image',
    width: 1600,
    height: 1200,
    colSpan: 2,
    rowSpan: 2 // This item spans 2 columns and 2 rows
  }
];
```

This works in all layout types, though the effect varies:
- In Grid and Stack: Items span the exact number of columns and rows specified
- In Masonry: Items span the specified number of columns horizontally
- In Justified: Items with larger colSpan are treated as wider items during row calculation

### Custom Rendering

You can customize how each item is rendered:

```tsx
<Gallery
  items={items}
  layout="masonry"
  renderItem={(item, index) => (
    <div className="custom-item">
      <img src={item.src} alt={item.alt} />
      <div className="overlay">
        <h3>{item.title}</h3>
        <p>{item.description}</p>
      </div>
    </div>
  )}
/>
```

### Using Individual Layout Components

You can also use each layout component directly:

```tsx
import { MasonryGallery, GridGallery, StackGallery, JustifiedGallery } from 'react-gallery-layouts';

// For a masonry layout:
<MasonryGallery
  items={items}
  columns={3}
  gutter={10}
  lazyLoad={true}
/>

// For a grid layout:
<GridGallery
  items={items}
  columns={4}
  gutter={10}
  itemHeight={200}
  lazyLoad={true}
/>

// For a stack layout:
<StackGallery
  items={items}
  columns={3}
  gutter={10}
  lazyLoad={true}
/>
```

### Image Lazy Loading

All gallery components support lazy loading of images using the native browser `loading="lazy"` attribute:

```tsx
<Gallery
  items={items}
  layout="masonry"
  lazyLoad={true} // Enable lazy loading
/>
```

This helps improve performance by delaying the loading of off-screen images until they are about to become visible in the viewport.

## Props

### Common Props

All gallery components share these props:

| Prop | Type | Description |
|------|------|-------------|
| `items` | `GalleryItem[]` | Array of items to display in the gallery |
| `renderItem` | `(item, index) => ReactNode` | Custom render function for items |
| `className` | `string` | CSS class for the gallery container |
| `style` | `CSSProperties` | Inline styles for the gallery container |
| `itemClassName` | `string` | CSS class for each item |
| `itemStyle` | `CSSProperties` | Inline styles for each item |
| `onItemClick` | `(item, index) => void` | Click handler for items |
| `lazyLoad` | `boolean` | Enable native lazy loading of images |

### Layout-Specific Props

#### MasonryGallery and StackGallery
| Prop | Type | Description |
|------|------|-------------|
| `columns` | `number \| { [key: string]: number }` | Number of columns, or object with breakpoints |
| `gutter` | `number \| { [key: string]: number }` | Gap between items |

#### GridGallery
| Prop | Type | Description |
|------|------|-------------|
| `columns` | `number \| { [key: string]: number }` | Number of columns, or object with breakpoints |
| `gutter` | `number \| { [key: string]: number }` | Gap between items |
| `itemHeight` | `number \| string` | Fixed height for all items |

#### JustifiedGallery
| Prop | Type | Description |
|------|------|-------------|
| `targetRowHeight` | `number` | Target height for rows |
| `maxRowHeight` | `number` | Maximum row height |
| `containerPadding` | `number` | Padding around the container |
| `gutter` | `number` | Gap between items |

### Gallery Item Type

```ts
interface GalleryItem {
  id: string | number;
  src: string;
  alt?: string;
  width?: number;
  height?: number;
  aspectRatio?: number;
  colSpan?: number; // Number of columns this item spans (default: 1)
  rowSpan?: number; // Number of rows this item spans (default: 1)
  [key: string]: any; // Additional custom properties
}
```

## Layout Differences

- **Masonry**: Items are placed in columns with varying heights, creating a staggered effect
- **Grid**: Items are arranged in a grid with equal width and fixed height
- **Stack**: Items are arranged in a grid with equal width but with heights that preserve aspect ratio
- **Justified**: Items are arranged in rows with varying widths but consistent height per row

## Development

This library uses Vite for development and building. To start development:

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build the library
npm run build
```

## License

