import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { GalleryItem } from '../../src/types';

interface GalleryState {
  items: GalleryItem[];
  setItems: (items: GalleryItem[]) => void;
  updateItemSpan: (id: string | number, changes: { colSpan?: number; rowSpan?: number }) => void;
  isDragging: boolean;
  setIsDragging: (isDragging: boolean) => void;
  activeItemId: string | number | null;
  setActiveItemId: (id: string | number | null) => void;
  getItemById: (id: string | number) => GalleryItem | undefined;
}

export const useGalleryStore = create<GalleryState>()(
  immer((set, get) => ({
    items: [],
    setItems: (items) =>
      set((state) => {
        state.items = items;
      }),
    getItemById: (id) => get().items.find((item: GalleryItem) => item.id === id),
    updateItemSpan: (id, changes) =>
      set((state) => {
        const item = state.items.find((item: GalleryItem) => item.id === id);
        if (item) {
          console.log('changes', changes);
          if (changes.colSpan !== undefined) item.colSpan = changes.colSpan;
          if (changes.rowSpan !== undefined) item.rowSpan = changes.rowSpan;
        }
      }),
    isDragging: false,
    setIsDragging: (isDragging) =>
      set((state) => {
        state.isDragging = isDragging;
      }),
    activeItemId: null,
    setActiveItemId: (id) =>
      set((state) => {
        state.activeItemId = id;
      }),
  }))
); 