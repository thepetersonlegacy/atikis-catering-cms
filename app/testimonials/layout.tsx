import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Client Reviews & Testimonials | Aviation Catering Excellence',
  description: 'Read testimonials from satisfied clients about Atikis Minnesota Aviation Catering services. Flight attendants and aviation professionals praise our exceptional in-flight dining.',
  keywords: [
    'aviation catering reviews',
    'private jet catering testimonials',
    'flight attendant reviews',
    'Minnesota aviation catering feedback',
    'in-flight dining testimonials',
    'aviation catering client reviews'
  ],
  openGraph: {
    title: 'Client Reviews & Testimonials | Aviation Catering Excellence',
    description: 'Read testimonials from satisfied clients about our exceptional aviation catering services and in-flight dining experiences.',
    images: ['/images/backgrounds/bg-wheels-up-02.png'],
  },
}

export default function TestimonialsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}