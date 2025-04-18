# Gallery Library

A modern, responsive gallery library built with React and TypeScript, supporting multiple layout types with customizable options.

## Features

- 🎨 Multiple layout types (grid, masonry, stack, justified)
- 📱 Responsive design with automatic container width detection
- 🖱️ Touch device support
- 🚀 Lazy loading support
- 🎯 Customizable item rendering
- 📦 TypeScript support
- 📚 Comprehensive documentation
- 🧪 Example implementation
- 📏 Aspect ratio control

## Installation

```bash
npm install react-gallery-layouts
# or
yarn add react-gallery-layouts
```

## Usage

```tsx
import { Gallery } from 'react-gallery-layouts';

const MyGallery = () => {
  const items = [
    { id: 1, src: 'image1.jpg', alt: 'Image 1' },
    { id: 2, src: 'image2.jpg', alt: 'Image 2' },
    // ... more items
  ];

  return (
    <Gallery
      items={items}
      layout="masonry"
      layoutOptions={{
        masonry: {
          columns: 3,
          gutter: 10
        }
      }}
      lazyLoad={true}
      onItemClick={(item, index) => console.log('Clicked:', item, index)}
    />
  );
};
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| items | `GalleryItem[]` | `[]` | Array of gallery items |
| layout | `'grid' \| 'masonry' \| 'stack' \| 'justified'` | `'masonry'` | Layout type |
| layoutOptions | `LayoutOptions` | `{}` | Options specific to each layout type |
| renderItem | `(item: GalleryItem, index: number) => React.ReactNode` | `undefined` | Custom item renderer |
| className | `string` | `''` | Additional CSS class for the container |
| style | `React.CSSProperties` | `{}` | Additional styles for the container |
| itemClassName | `string` | `''` | Additional CSS class for items |
| itemStyle | `React.CSSProperties` | `{}` | Additional styles for items |
| onItemClick | `(item: GalleryItem, index: number) => void` | `undefined` | Item click handler |
| lazyLoad | `boolean` | `false` | Enable lazy loading |

### Layout Options

#### Grid Layout
The Grid layout arranges items in a fixed-height grid with equal-sized cells. Each item can optionally span multiple columns and rows using `colSpan` and `rowSpan` properties.

Options:
| Option | Type | Default | Description |
|--------|------|---------|-------------|
| columns | `number \| { [breakpoint: number]: number }` | `3` | Number of columns, can be responsive |
| gutter | `number \| { [breakpoint: number]: number }` | `10` | Space between items in pixels |
| itemHeight | `number` | `200` | Fixed height for all items |
| aspectRatio | `number` | `undefined` | Fixed aspect ratio for items (width/height) |

Example:

```tsx
layoutOptions={{
  grid: {
    columns: 3,        // Number of columns
    gutter: 10,        // Space between items
    itemHeight: 200    // Fixed height for items
  }
}}
```

#### Masonry Layout
The Masonry layout arranges items in a grid with variable-sized columns. Each item can optionally span multiple columns using `colSpan` property.

Options:
| Option | Type | Default | Description |
|--------|------|---------|-------------|
| columns | `number \| { [breakpoint: number]: number }` | `3` | Number of columns, can be responsive |
| gutter | `number \| { [breakpoint: number]: number }` | `10` | Space between items in pixels |

Example:

```tsx
layoutOptions={{
  masonry: {
    columns: 3,        // Number of columns
    gutter: 10         // Space between items
  }
}}
```

#### Stack Layout
The Stack layout arranges items in a single column with a maximum width.

Options:
| Option | Type | Default | Description |
|--------|------|---------|-------------|
| columns | `number \| { [breakpoint: number]: number }` | `2` | Number of columns, can be responsive |
| gutter | `number \| { [breakpoint: number]: number }` | `10` | Space between items in pixels |
| maxWidth | `number` | `800` | Maximum width of the container |
| alignment | `'flex-start' \| 'center' \| 'flex-end'` | `'flex-start'` | Alignment of items within the container |

Example:

```tsx
layoutOptions={{
  stack: {
    columns: 2,        // Number of columns
    gutter: 10,        // Space between items
    maxWidth: 800      // Maximum width of the container
  }
}}
```

#### Justified Layout
The Justified layout arranges items in rows with a target height and maximum height.

Options:
| Option | Type | Default | Description |
|--------|------|---------|-------------|
| targetRowHeight | `number` | `200` | Target height for each row |
| maxRowHeight | `number` | `300` | Maximum row height |
| containerPadding | `number` | `10` | Padding around the container |
| gutter | `number` | `10` | Space between items |

Example:

```tsx
layoutOptions={{
  justified: {
    targetRowHeight: 200,  // Target height for rows
    maxRowHeight: 300,     // Maximum row height
    containerPadding: 10,  // Padding around the container
    gutter: 10            // Space between items
  }
}}
```

### Responsive Configuration

Both `columns` and `gutter` support responsive configuration using breakpoints. You can specify different values for different screen sizes:

```tsx
layoutOptions={{
  masonry: {
    // Responsive columns
    columns: {
      default: 2,      // Default: 2 columns (screen < 768px)
      768: 3,         // Tablet: 3 columns (768px <= screen < 1024px)
      1024: 4,        // Desktop: 4 columns (1024px <= screen < 1440px)
      1440: 5         // Large Desktop: 5 columns (screen >= 1440px)
    },
    // Responsive gutter
    gutter: {
      default: 10,    // Default: 10px gap (screen < 768px)
      768: 15,        // Tablet: 15px gap (768px <= screen < 1024px)
      1024: 20,       // Desktop: 20px gap (1024px <= screen < 1440px)
      1440: 25        // Large Desktop: 25px gap (screen >= 1440px)
    }
  }
}}
```

The breakpoints system works as follows:
- Use `default` for the base value (smallest screens)
- Add breakpoint values in pixels for larger screens
- Values are applied when screen width is >= breakpoint
- Breakpoints are automatically sorted in ascending order

Example of how responsive values are applied:

```tsx
// For a screen width of 1200px:

// Simple number
columns={3}  // Always 3 columns

// Responsive object
columns={{
  default: 2,  // < 768px
  768: 3,      // >= 768px
  1024: 4,     // >= 1024px
  1440: 5      // >= 1440px
}}
// Will use 4 columns (matches 1024 breakpoint)

// Same applies for gutter spacing
gutter={{
  default: 10,
  768: 15,
  1024: 20,
  1440: 25
}}
// Will use 20px gutter (matches 1024 breakpoint)
```

This responsive configuration is available for all layout types (Grid, Masonry, Stack, Justified).

## Custom Item Rendering

You can provide a custom renderer for gallery items. The `renderItem` prop receives the item data and index, and should return a React node:

```tsx
interface GalleryItem {
  id?: string | number;
  src: string;
  alt?: string;
  width?: number;
  height?: number;
  colSpan?: number;
  // ... any additional custom properties
}

// Basic example with image only
const defaultRenderItem = (item: GalleryItem, index: number) => (
  <img 
    src={item.src} 
    alt={item.alt || `Gallery item ${index}`}
    loading="lazy"
    style={{ 
      width: '100%', 
      height: '100%',
      objectFit: 'cover',
      display: 'block',
    }} 
  />
);

// Advanced example with overlay and additional content
const renderItem = (item: GalleryItem, index: number) => (
  <div className="custom-item">
    <img 
      src={item.src} 
      alt={item.alt} 
      loading="lazy"
      style={{ 
        width: '100%', 
        height: '100%',
        objectFit: 'cover',
      }}
    />
    <div className="overlay">
      <h3>{item.title}</h3>
      <p>{item.description}</p>
      <div className="actions">
        <button onClick={() => handleLike(item)}>Like</button>
        <button onClick={() => handleShare(item)}>Share</button>
      </div>
    </div>
  </div>
);

// Usage in Gallery component
<Gallery
  items={items}
  renderItem={renderItem}  // Custom renderer
  // or
  renderItem={defaultRenderItem}  // Default renderer
/>
```

The renderItem function has access to:
- All properties of the GalleryItem
- The item's index in the gallery
- The full context of the gallery layout

Best practices for custom rendering:
- Always maintain the aspect ratio of the container
- Use `width: 100%` and `height: 100%` for the main image
- Set `objectFit: 'cover'` for proper image scaling
- Consider using `loading="lazy"` for better performance
- Handle image loading states and errors appropriately

Example with loading and error states:

```tsx
const renderItem = (item: GalleryItem, index: number) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  return (
    <div className="gallery-item">
      {isLoading && <div className="loading-placeholder" />}
      {hasError && <div className="error-placeholder">Failed to load image</div>}
      <img 
        src={item.src} 
        alt={item.alt || `Gallery item ${index}`}
        loading="lazy"
        style={{ 
          width: '100%', 
          height: '100%',
          objectFit: 'cover',
          display: hasError ? 'none' : 'block',
          opacity: isLoading ? 0 : 1,
          transition: 'opacity 0.3s ease-in-out',
        }}
        onLoad={() => setIsLoading(false)}
        onError={() => {
          setIsLoading(false);
          setHasError(true);
        }}
      />
    </div>
  );
};
```

## Styling

The library uses CSS modules for styling. You can customize the appearance by overriding the default styles:

```css
/* Your custom styles */
.gallery-container {
  /* Override container styles */
}

.gallery-item {
  /* Override item styles */
}

.gallery-grid {
  /* Override grid layout styles */
}

.gallery-masonry {
  /* Override masonry layout styles */
}
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

AI generated code.