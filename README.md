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

## Custom Item Rendering

You can provide a custom renderer for gallery items:

```tsx
const renderItem = (item: GalleryItem, index: number) => (
  <div className="custom-item">
    <img src={item.src} alt={item.alt} />
    <div className="overlay">
      <h3>{item.title}</h3>
      <p>{item.description}</p>
    </div>
  </div>
);

<Gallery
  items={items}
  renderItem={renderItem}
/>
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