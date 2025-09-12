// Centralized asset paths to support the migration to public/images/*
// Update these when you run scripts/images/migrate-images.mjs

export const LOGOS = {
  primary: '/images/hero/logos/atikis-logo-primary.png',
  alt: '/images/hero/logos/atikis-logo-alt.png',
};

export const HERO_IMAGES = [
  // Use only the images you want visible in the hero
  { url: '/images/food/food-carousel-01.jpg', type: 'hospitality' as const, alt: 'Elegant food presentation showcasing premium aviation catering service quality' },
  { url: '/images/aircraft/aircraft-jet-exterior-01.png', type: 'aircraft' as const, alt: 'Luxury private aircraft prepared for premium catering service' },
  { url: '/images/food/food-carousel-03.jpg', type: 'hospitality' as const, alt: 'Beautifully arranged gourmet meal demonstrating attention to detail in aviation dining' },
  { url: '/images/food/food-carousel-06.jpg', type: 'hospitality' as const, alt: 'Professional catering staff preparing exceptional dining experience for aviation clients' },
  { url: '/images/aircraft/aircraft-jet-interior-01.png', type: 'aircraft' as const, alt: 'Premium aircraft interior ready for exceptional catering service' },
  { url: '/images/food/food-carousel-08.jpg', type: 'hospitality' as const, alt: 'Exquisite food styling and presentation showcasing culinary expertise in aviation catering' },
];

export const MENU_FOOD_IMAGES = [
  // Food-only carousel (no 1-5)
  '/images/food/food-carousel-01.jpg',
  '/images/food/food-carousel-02.jpg',
  '/images/food/food-carousel-03.jpg',
  '/images/food/food-carousel-04.jpg',
  '/images/food/food-carousel-05.jpg',
  '/images/food/food-carousel-06.jpg',
  '/images/food/food-carousel-07.jpg',
  '/images/food/food-carousel-08.jpg',
];

export const BACKGROUNDS = {
  testimonials: '/images/backgrounds/bg-wheels-up-02.png',
};

