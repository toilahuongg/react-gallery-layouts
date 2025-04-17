# Gallery Library

A modern, responsive gallery library built with React and TypeScript.

## Features

- 🎨 Multiple layout types (grid, masonry, etc.)
- 📱 Responsive design
- 🖱️ Touch device support
- 🚀 Lazy loading
- 🛠️ Developer mode for debugging
- 🎯 Customizable item rendering
- 📦 TypeScript support
- 📚 Comprehensive documentation
- 🧪 Example implementation

## Installation

```bash
npm install gallery-library
# or
yarn add gallery-library
```

## Usage

```tsx
import { Gallery } from 'gallery-library';

const MyGallery = () => {
  const items = [
    { id: 1, src: 'image1.jpg', colSpan: 1, rowSpan: 1 },
    { id: 2, src: 'image2.jpg', colSpan: 2, rowSpan: 1 },
    // ... more items
  ];

  return (
    <Gallery
      items={items}
      layout="grid"
      devMode={false}
      lazyLoad={true}
    />
  );
};
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| items | `GalleryItem[]` | `[]` | Array of gallery items |
| layout | `'grid' \| 'masonry'` | `'grid'` | Layout type |
| devMode | `boolean` | `false` | Enable developer mode |
| lazyLoad | `boolean` | `true` | Enable lazy loading |
| onItemClick | `(item: GalleryItem, index: number) => void` | `undefined` | Item click handler |

## Development Mode

Developer mode provides additional features for debugging and testing:

- Visual feedback for item dimensions
- Item span information display
- Interactive debugging tools

To enable dev mode, set the `devMode` prop to `true`:

```tsx
<Gallery
  items={items}
  devMode={true}
/>
```

## Styling

The library uses CSS modules for styling. You can customize the appearance by overriding the default styles:

```css
/* Your custom styles */
.gallery-item {
  /* Override default styles */
}

.gallery-container {
  /* Customize container styles */
}
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

