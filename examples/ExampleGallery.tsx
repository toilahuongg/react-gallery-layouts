import React, { useState } from 'react';
import { Gallery, GalleryItem, GalleryLayout } from '../src';

const exampleItems: GalleryItem[] = [
  {
    id: 1,
    src: 'https://images.unsplash.com/photo-1580927752452-89d86da3fa0a',
    alt: 'Workspace with laptop and coffee',
    width: 1600,
    height: 1067,
    colSpan: 2,
  },
  {
    id: 2,
    src: 'https://images.unsplash.com/photo-1485808191679-5f86510681a2',
    alt: 'Coffee mug and notebook',
    width: 1600,
    height: 2400,
  },
  {
    id: 3,
    src: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd',
    alt: 'Healthy food',
    width: 1600,
    height: 1067,
  },
  {
    id: 4,
    src: 'https://images.unsplash.com/photo-1516616370751-86d6bd8b0651',
    alt: 'Hot air balloons',
    width: 1600,
    height: 2400,
  },
  {
    id: 5,
    src: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e',
    alt: 'Beach with blue water and sky',
    width: 1600,
    height: 1067,
  },
  {
    id: 6,
    src: 'https://images.unsplash.com/photo-1497436072909-60f360e1d4b1',
    alt: 'Mountains',
    width: 1600,
    height: 2000,
  },
  {
    id: 7,
    src: 'https://images.unsplash.com/photo-1500051638674-ff996a0ec29e',
    alt: 'Person using a laptop',
    width: 1600,
    height: 1067,
  },
  {
    id: 8,
    src: 'https://images.unsplash.com/photo-1543269865-cbf427effbad',
    alt: 'Students studying together',
    width: 1600,
    height: 1067,
  },
  {
    id: 10,
    src: 'https://images.unsplash.com/photo-1501854140801-50d01698950b',
    alt: 'Mountain landscape',
    width: 1600,
    height: 1067,
    colSpan: 2,
    rowSpan: 2,
  },
  {
    id: 20,
    src: 'https://images.unsplash.com/photo-1470770903676-69b98201ea1c',
    alt: 'Desert sunset',
    width: 1600,
    height: 2400,
    colSpan: 2,
  },
  {
    id: 30,
    src: 'https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07',
    alt: 'Valley view',
    width: 1600,
    height: 1067,
    rowSpan: 2,
  },
  {
    id: 9,
    src: 'https://images.unsplash.com/photo-1584271854089-9bb3e5168e32',
    alt: 'Coffee and book',
    width: 1600,
    height: 2400,
  },
  {
    id: 11, 
    src: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb',
    alt: 'Mountain lake',
    width: 1600,
    height: 1067,
  },
  {
    id: 12,
    src: 'https://images.unsplash.com/photo-1532274402911-5a369e4c4bb5',
    alt: 'Desert landscape',
    width: 1600,
    height: 2400,
  },
  {
    id: 13,
    src: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05', 
    alt: 'Forest',
    width: 1600,
    height: 1067,
  },
  {
    id: 14,
    src: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e',
    alt: 'Sunlight through trees',
    width: 1600,
    height: 1067,
  },
  {
    id: 15,
    src: 'https://images.unsplash.com/photo-1472214103451-9374bd1c798e',
    alt: 'Autumn forest',
    width: 1600,
    height: 1067,
  },
  {
    id: 16,
    src: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e',
    alt: 'Mountain path',
    width: 1600,
    height: 1067,
  },
  {
    id: 17,
    src: 'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d',
    alt: 'Forest lake',
    width: 1600,
    height: 2400,
  },
  {
    id: 18,
    src: 'https://images.unsplash.com/photo-1433086966358-54859d0ed716',
    alt: 'Waterfall',
    width: 1600,
    height: 2400,
  },
  {
    id: 19,
    src: 'https://images.unsplash.com/photo-1501854140801-50d01698950b',
    alt: 'Mountain range',
    width: 1600,
    height: 1067,
  },
  {
    id: 21,
    src: 'https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07',
    alt: 'Mountain valley',
    width: 1600,
    height: 1067,
  },
  {
    id: 22,
    src: 'https://images.unsplash.com/photo-1472214103451-9374bd1c798e',
    alt: 'Forest path',
    width: 1600,
    height: 2400,
  },
  {
    id: 23,
    src: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b',
    alt: 'Mountain peak',
    width: 1600,
    height: 2400,
  },
  {
    id: 24,
    src: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429',
    alt: 'Desert road',
    width: 1600,
    height: 1067,
  },
  {
    id: 25,
    src: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05',
    alt: 'Foggy forest',
    width: 1600,
    height: 1067,
  },
  {
    id: 26,
    src: 'https://images.unsplash.com/photo-1497436072909-60f360e1d4b1',
    alt: 'Mountain view',
    width: 1600,
    height: 2400,
  },
  {
    id: 27,
    src: 'https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99',
    alt: 'Winter landscape',
    width: 1600,
    height: 2400,
  },
  {
    id: 28,
    src: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef',
    alt: 'Beach sunset',
    width: 1600,
    height: 1067,
  },
  {
    id: 29,
    src: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb',
    alt: 'Mountain reflection',
    width: 1600,
    height: 1067,
  },
  {
    id: 31,
    src: 'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d',
    alt: 'Forest stream',
    width: 1600,
    height: 1067,
  },
  {
    id: 32,
    src: 'https://images.unsplash.com/photo-1433086966358-54859d0ed716',
    alt: 'Cascading waterfall',
    width: 1600,
    height: 2400,
  },
  {
    id: 33,
    src: 'https://images.unsplash.com/photo-1501854140801-50d01698950b',
    alt: 'Mountain sunset',
    width: 1600,
    height: 1067,
  },
  {
    id: 34,
    src: 'https://images.unsplash.com/photo-1470770903676-69b98201ea1c',
    alt: 'Desert sunset',
    width: 1600,
    height: 2400,
  },
  {
    id: 35,
    src: 'https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07',
    alt: 'Valley view',
    width: 1600,
    height: 1067,
  },
  {
    id: 36,
    src: 'https://images.unsplash.com/photo-1472214103451-9374bd1c798e',
    alt: 'Forest canopy',
    width: 1600,
    height: 1067,
  },
  {
    id: 37,
    src: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b',
    alt: 'Mountain vista',
    width: 1600,
    height: 2400,
  },
  {
    id: 38,
    src: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429',
    alt: 'Desert dunes',
    width: 1600,
    height: 1067,
  },
  {
    id: 39,
    src: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05',
    alt: 'Misty forest',
    width: 1600,
    height: 2400,
  },
  {
    id: 40,
    src: 'https://images.unsplash.com/photo-1497436072909-60f360e1d4b1',
    alt: 'Alpine view',
    width: 1600,
    height: 1067,
  },
  {
    id: 41,
    src: 'https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99',
    alt: 'Snowy landscape',
    width: 1600,
    height: 2400,
  },
  {
    id: 42,
    src: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef',
    alt: 'Coastal sunset',
    width: 1600,
    height: 1067,
  },
  {
    id: 43,
    src: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb',
    alt: 'Lake reflection',
    width: 1600,
    height: 2400,
  },
  {
    id: 44,
    src: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e',
    alt: 'Mountain path',
    width: 1600,
    height: 1067,
  },
  {
    id: 45,
    src: 'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d',
    alt: 'Forest creek',
    width: 1600,
    height: 2400,
  },
  {
    id: 46,
    src: 'https://images.unsplash.com/photo-1433086966358-54859d0ed716',
    alt: 'Mountain waterfall',
    width: 1600,
    height: 1067,
  },
  {
    id: 47,
    src: 'https://images.unsplash.com/photo-1501854140801-50d01698950b',
    alt: 'Mountain peaks',
    width: 1600,
    height: 2400,
  },
  {
    id: 48,
    src: 'https://images.unsplash.com/photo-1470770903676-69b98201ea1c',
    alt: 'Desert landscape',
    width: 1600,
    height: 1067,
  },
  {
    id: 49,
    src: 'https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07',
    alt: 'Mountain valley',
    width: 1600,
    height: 2400,
  },
  {
    id: 50,
    src: 'https://images.unsplash.com/photo-1472214103451-9374bd1c798e',
    alt: 'Forest path',
    width: 1600,
    height: 1067,
  },
  {
    id: 51,
    src: 'https://images.unsplash.com/photo-1470770903676-69b98201ea1c', // Using a working image URL
    alt: 'Mountain landscape',
    width: 1600,
    height: 2400,
  },
  {
    id: 52,
    src: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429',
    alt: 'Desert vista',
    width: 1600,
    height: 1067,
  },
  {
    id: 53,
    src: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05',
    alt: 'Forest view',
    width: 1600,
    height: 2400,
  },
  {
    id: 54,
    src: 'https://images.unsplash.com/photo-1497436072909-60f360e1d4b1',
    alt: 'Mountain scene',
    width: 1600,
    height: 1067,
  },
  {
    id: 55,
    src: 'https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99',
    alt: 'Winter scene',
    width: 1600,
    height: 2400,
  },
  {
    id: 56,
    src: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef',
    alt: 'Beach view',
    width: 1600,
    height: 1067,
  },
  {
    id: 57,
    src: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb',
    alt: 'Mountain lake',
    width: 1600,
    height: 2400,
  },
  {
    id: 58,
    src: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e',
    alt: 'Forest trail',
    width: 1600,
    height: 1067,
  },
  {
    id: 59,
    src: 'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d',
    alt: 'Forest stream',
    width: 1600,
    height: 2400,
  }
];

const ExampleGallery: React.FC = () => {
  const [layout, setLayout] = useState<GalleryLayout>('grid');
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);
  const [lazyLoad, setLazyLoad] = useState<boolean>(true);

  const layoutOptions = {
    masonry: {
      columns: {
        768: 2,
        1024: 3,
        default: 1,
      },
      gutter: 16,
    },
    grid: {
      columns: {
        768: 3,
        1024: 4,
        default: 2,
      },
      gutter: 16,
      itemHeight: "100%",
    },
    stack: {
      columns: {
        768: 3,
        1024: 4,
        default: 2,
      },
      gutter: 16,
      maxWidth: '100%',
      // Stack layout is similar to grid but with automatic height that preserves aspect ratio
    },
    justified: {
      targetRowHeight: 200,
      maxRowHeight: 300,
      containerPadding: 16,
      gutter: 16,
    },
  };

  const showSpanExplanation = () => {
    return (
      <div className="span-explanation">
        <p>Notice how some items span multiple columns or rows:</p>
        <ul>
          <li>Items with <strong>colSpan: 2</strong> take up two columns</li>
          <li>Items with <strong>rowSpan: 2</strong> take up two rows</li>
          <li>Items can have both colSpan and rowSpan</li>
        </ul>
      </div>
    );
  };

  return (
    <div className="example-gallery-container">
      <h1>Gallery Layouts Example</h1>
      
      <div className="layout-selector">
        <p>Select a layout:</p>
        <div className="button-group">
          <button 
            onClick={() => setLayout('masonry')}
            className={layout === 'masonry' ? 'active' : ''}
          >
            Masonry
          </button>
          <button 
            onClick={() => setLayout('grid')}
            className={layout === 'grid' ? 'active' : ''}
          >
            Grid
          </button>
          <button 
            onClick={() => setLayout('stack')}
            className={layout === 'stack' ? 'active' : ''}
          >
            Stack
          </button>
          <button 
            onClick={() => setLayout('justified')}
            className={layout === 'justified' ? 'active' : ''}
          >
            Justified
          </button>
        </div>
        
        <div className="options-group" style={{ marginTop: '20px' }}>
          <label>
            <input 
              type="checkbox" 
              checked={lazyLoad} 
              onChange={() => setLazyLoad(!lazyLoad)}
            />
            Enable lazy loading
          </label>
        </div>

        {showSpanExplanation()}
      </div>
      
      <div className="gallery-wrapper">
        <Gallery
          items={exampleItems}
          layout={layout}
          layoutOptions={layoutOptions}
          onItemClick={(item) => setSelectedItem(item)}
          itemClassName="gallery-item"
          lazyLoad={lazyLoad}
        />
      </div>
      
      {selectedItem && (
        <div className="modal" onClick={() => setSelectedItem(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <span className="close" onClick={() => setSelectedItem(null)}>&times;</span>
            <img 
              src={selectedItem.src} 
              alt={selectedItem.alt || 'Gallery image'} 
            />
            <p>{selectedItem.alt}</p>
            {(selectedItem.colSpan || selectedItem.rowSpan) && (
              <p className="span-info">
                {selectedItem.colSpan && `Column Span: ${selectedItem.colSpan}`}
                {selectedItem.colSpan && selectedItem.rowSpan && ' | '}
                {selectedItem.rowSpan && `Row Span: ${selectedItem.rowSpan}`}
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ExampleGallery; 