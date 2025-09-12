import dynamic from 'next/dynamic'
import HeroSection from '@/components/home/HeroSection'
import AviationMessage from '@/components/home/AviationMessage'
import HowItWorksSection from '@/components/home/HowItWorksSection'
import AboutSection from '@/components/home/AboutSection'
import MainPageContent from '@/components/home/MainPageContent'
import HomeDynamicComponents from '@/components/home/HomeDynamicComponents'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Premium Aviation Catering Services in Minnesota | Atikis',
  description: 'Atikis Minnesota Aviation Catering provides exceptional in-flight dining for private jets. Serving KMSP, KSTP, KFCM, and KANE airports with gourmet meals crafted for altitude dining.',
  keywords: [
    'aviation catering Minnesota',
    'private jet catering Minneapolis',
    'KMSP catering services',
    'luxury in-flight dining',
    'executive jet meals',
    'Minnesota flight catering'
  ],
  openGraph: {
    title: 'Premium Aviation Catering Services in Minnesota | Atikis',
    description: 'Exceptional in-flight dining for private jets. Serving Minnesota airports with gourmet meals crafted for altitude dining.',
    images: ['/images/backgrounds/bg-wheels-up-04.png'],
  },
}

// Lazy load components that are below the fold
export default function Home() {
  return (
    <>
      <HeroSection />
      <AviationMessage />
      <HowItWorksSection />
      <section className="relative w-full py-24">
        <MainPageContent />
      </section>
      <AboutSection />
      <HomeDynamicComponents />
    </>
  )
}