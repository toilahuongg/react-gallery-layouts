import React, { useCallback, useEffect, useState } from 'react';
import { Gallery, GalleryItem, GalleryLayout, GalleryLayoutOptions } from '../src';
import ResizableItem from './components/ResizableItem-v2';
import { fakeImages } from './fake-data';
import { useGalleryStore } from './store/galleryStore';
import HoverDir from './components/hover-dir';

const ExampleGallery: React.FC = () => {
  const [layout, setLayout] = useState<GalleryLayout>('grid');
  const [lazyLoad, setLazyLoad] = useState<boolean>(true);
  const [devMode, setDevMode] = useState<boolean>(true);
  const { items, setItems } = useGalleryStore();
  // Initialize store with example items
  useEffect(() => {
    setItems(fakeImages);
  }, [setItems]);

  const layoutOptions: GalleryLayoutOptions = {
    masonry: {
      columns: {
        768: 3,
        1024: 4,
        default: 2,
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
      aspectRatio: 16 / 9,
    },
    stack: {
      columns: {
        768: 3,
        1024: 4,
        default: 2,
      },
      gutter: 16,
      maxWidth: '100%',
      alignment: 'flex-end',
    },
    justified: {

      targetRowHeight: 200,
      maxRowHeight: 300,
      containerPadding: 16,
      gutter: 16,
    },
  };

  // Custom render function using our ResizableItem component
  const renderResizableItem = useCallback((item: GalleryItem, lazyLoad: boolean, index: number) => {
    return (
      <HoverDir>
        <ResizableItem
          item={item}
          index={index}
          lazyLoad={lazyLoad}
          devMode={devMode}
          resizeDirectionAllowed={['left', 'right', 'top', 'bottom']}
        />
      </HoverDir>
    );
  }, [lazyLoad, devMode]);

  const showSpanExplanation = () => {
    return (
      <div className="span-explanation">
        <p>Use the corners to resize gallery items:</p>
        <ul>
          <li>Top-left and top-right: Change colSpan</li>
          <li>Bottom-left and bottom-right: Change rowSpan</li>
          <li>Drag any corner to change both dimensions</li>
        </ul>
      </div>
    );
  };

  return (
    <div className="example-gallery-container">
      <h1>Interactive Gallery Layouts</h1>

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
          <label style={{ marginLeft: '20px' }}>
            <input
              type="checkbox"
              checked={devMode}
              onChange={() => setDevMode(!devMode)}
            />
            Developer Mode
          </label>
        </div>

        {devMode && showSpanExplanation()}
      </div>

      <div className="gallery-wrapper">
        <Gallery
          items={items}
          layout={layout}
          layoutOptions={layoutOptions}
          renderItem={layout !== 'justified' ? (item, lazyLoad, index) => renderResizableItem(item, lazyLoad, index) : undefined}
          itemClassName="gallery-item"
          lazyLoad={lazyLoad}
        />
      </div>
      {/*       
      {selectedItem && !isDragging && (
        <div className="modal" onClick={() => setSelectedItem(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <span className="close" onClick={() => setSelectedItem(null)}>&times;</span>
            <img 
              src={selectedItem.src} 
              alt={selectedItem.alt || 'Gallery image'} 
            />
            <p>{selectedItem.alt}</p>
            <p className="span-info">
              Column Span: {selectedItem.colSpan || 1} | 
              Row Span: {selectedItem.rowSpan || 1}
            </p>
          </div>
        </div>
      )} */}

    </div>
  );
};

export default ExampleGallery; 