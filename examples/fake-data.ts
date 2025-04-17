import { faker } from '@faker-js/faker';
import { GalleryItem } from '../src/types';

export const generateFakeImages = (count: number = 1000): GalleryItem[] => {
  return Array.from({ length: count }, (_, index) => ({
    id: index + 1,
    src: faker.image.url({ width: 1600, height: faker.number.int({ min: 1067, max: 2400 }) }),
    alt: faker.lorem.sentence(),
    width: 1600,
    height: faker.number.int({ min: 1067, max: 2400 }),
  }));
};

export const fakeImages = generateFakeImages();
