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
    images: ['/Untitled design (12).png'],
  },
}

export default function MenuLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}