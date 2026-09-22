/**
 * Language-independent facts about the guesthouse: contact details, room
 * inventory and facility images. Copy for these lives in src/i18n/content.ts,
 * keyed by the same `key` field.
 */

import type { PageKey } from '../i18n/config';

export const BUSINESS = {
  name: 'LaDespani Guesthouse',
  alternateName: 'Pensiunea LaDespani',
  telephone: '+40721373747',
  /** Human-readable form of the telephone number, grouped for reading aloud. */
  telephoneDisplay: '+40 721 373 747',
  email: 'anudani241@hotmail.com',
  foundingDate: '2007',
  priceRange: '200-250 RON',
  currency: 'RON',
  streetAddress: 'Mihai Viteazul 128',
  addressLocality: 'Brasov',
  postalCode: '500183',
  addressCountry: 'RO',
  latitude: 45.6579,
  longitude: 25.6012,
  mapUrl: 'https://maps.app.goo.gl/xDLBLkZsb61cQ6eh8',
  facebook: 'https://www.facebook.com/ladespani.guesthouse/',
  instagram: 'https://www.instagram.com/ladespaniguesthouse/',
  languages: ['ro', 'en', 'de', 'it', 'es', 'fr', 'et', 'ru', 'fi'],
} as const;

/**
 * Hero photo per page, relative to /images. Pages without an entry (contact,
 * card) get a plain navy band. The prerenderer preloads this image for each
 * route because it is the largest thing on the first screen.
 */
export const HERO_IMAGES: Partial<Record<PageKey, string>> = {
  home: 'landing1.webp',
  rooms: 'rooms.webp',
  facilities: 'facilities.webp',
  gallery: 'gallery.webp',
  about: 'about.webp',
};

export interface RoomData {
  key: string;
  images: string[];
  price: number;
  facilities: Record<string, boolean>;
}

export const ROOMS: RoomData[] = [
  {
    key: 'budget',
    images: ['room1_0.webp', 'room1_1.webp', 'room1_2.webp'],
    price: 200,
    facilities: {
      privateBathroom: true,
      bathtub: false,
      shower: true,
      balcony: false,
      safeDeposit: true,
      TV: true,
      towels: true,
    },
  },
  {
    key: 'standard1',
    images: ['room2_0.webp', 'room2_1.webp', 'room2_2.webp'],
    price: 250,
    facilities: {
      privateBathroom: true,
      bathtub: true,
      shower: true,
      balcony: false,
      safeDeposit: true,
      TV: true,
      towels: true,
    },
  },
  {
    key: 'standard2',
    images: ['room5_0.webp', 'room5_1.webp', 'room5_2.webp'],
    price: 250,
    facilities: {
      privateBathroom: true,
      bathtub: true,
      shower: true,
      balcony: false,
      safeDeposit: true,
      TV: true,
      towels: true,
    },
  },
  {
    key: 'balcony1',
    images: ['room3_0.webp', 'room3_1.webp', 'room3_2.webp', 'room3_3.webp'],
    price: 250,
    facilities: {
      privateBathroom: true,
      bathtub: true,
      shower: true,
      balcony: true,
      safeDeposit: true,
      TV: true,
      towels: true,
    },
  },
  {
    key: 'balcony2',
    images: ['room4_0.webp', 'room4_1.webp', 'room4_2.webp', 'room4_3.webp'],
    price: 250,
    facilities: {
      privateBathroom: true,
      bathtub: true,
      shower: true,
      balcony: true,
      safeDeposit: true,
      TV: true,
      towels: true,
    },
  },
];

export const FACILITIES: { key: string; image: string }[] = [
  { key: 'parking', image: 'parking.webp' },
  { key: 'pingpong', image: 'pingpong.webp' },
  { key: 'grill', image: 'grill.webp' },
  { key: 'trampoline', image: 'trampoline.webp' },
  { key: 'kitchen', image: 'kitchen.webp' },
  { key: 'laundry', image: 'laundry.webp' },
  { key: 'safe', image: 'safe.webp' },
];

export const TESTIMONIALS = [
  { name: 'Mike', content: 'Awesome people! Awesome place.' },
  { name: 'Magda', content: "LaDespani is a place where you won't feel lonely and you will relax." },
  { name: 'Oren', content: 'Great place, family and friendly atmosphere, clean and comfortable rooms.' },
];

export const GALLERY_IMAGE_COUNT = 51;
