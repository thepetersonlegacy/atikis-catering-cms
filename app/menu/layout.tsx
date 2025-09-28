import type { Metadata } from 'next'

export const metadata = {
  title: 'Gourmet Aviation Menu | In-Flight Dining Options',
  description: 'Explore our extensive aviation catering menu featuring signature breakfast collections, artisan salads, premium entrées, and plant-based selections. Custom menus available for private jets.',
  keywords: [
    'aviation catering menu',
    'private jet dining options',
    'in-flight breakfast menu',
    'gourmet aviation meals',
    'custom flight catering',
    'Minnesota aviation dining'
  ],
  openGraph: {
    title: 'Gourmet Aviation Menu | In-Flight Dining Options',
    description: 'Explore our extensive aviation catering menu featuring signature breakfast collections, artisan salads, premium entrées, and plant-based selections.',
    images: [
      { url: '/images/og/atikis-social-preview.png?v=1', width: 1200, height: 630, alt: 'Atikis Minnesota Aviation Catering — Social Preview' }
    ],
  },
}

export default function MenuLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}