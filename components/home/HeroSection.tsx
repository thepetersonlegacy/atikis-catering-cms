"use client"

import { useEffect, useState, useMemo, useRef, useCallback } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'
import { useI18n } from '@/lib/i18n/i18n-context'
import { useHydration } from '@/lib/hooks/useHydration'
import ClientOnly from '@/components/ClientOnly'
import ResponsiveImage from '@/components/ui/ResponsiveImage'
import { LOGOS } from '@/lib/data/assets'

const heroImages = [
  { url: "/images/food/food-carousel-01.jpg", type: "hospitality", alt: "Elegant food presentation showcasing premium aviation catering service quality", season: "Culinary Excellence" },
  { url: "/images/aircraft/aircraft-jet-exterior-01.png", type: "aircraft", alt: "Luxury private aircraft prepared for premium catering service", season: "Winter Elegance" },
  { url: "/images/food/food-carousel-03.jpg", type: "hospitality", alt: "Beautifully arranged gourmet meal demonstrating attention to detail in aviation dining", season: "Gourmet Artistry" },
  { url: "/images/food/food-carousel-06.jpg", type: "hospitality", alt: "Professional catering staff preparing exceptional dining experience for aviation clients", season: "Hospitality Focus" },
  { url: "/images/aircraft/aircraft-jet-interior-01.png", type: "aircraft", alt: "Premium aircraft interior ready for exceptional catering service", season: "Summer Meadows" },
  { url: "/images/food/food-carousel-08.jpg", type: "hospitality", alt: "Exquisite food styling and presentation showcasing culinary expertise in aviation catering", season: "Culinary Mastery" }
]

const HeroSection = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const { t } = useI18n()
  const isHydrated = useHydration()

  const memoizedHeroImages = useMemo(() => heroImages, [])

  const cleanupTimers = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
      timeoutRef.current = null
    }
  }, [])

  useEffect(() => {
    if (!isHydrated) return
    
    intervalRef.current = setInterval(() => {
      setIsTransitioning(true)
      setCurrentImageIndex((current) => (current + 1) % memoizedHeroImages.length)
      timeoutRef.current = setTimeout(() => setIsTransitioning(false), 700)
    }, 10000)
    
    return cleanupTimers
  }, [isHydrated, memoizedHeroImages.length, cleanupTimers])

  // Static fallback for SSR
  const StaticHero = () => (
    <div className="hero-video-container w-full min-h-screen relative overflow-hidden">
      <div className="absolute inset-0 w-full h-full hero-image-container">
        <Image src={memoizedHeroImages[0].url} alt={memoizedHeroImages[0].alt} fill className="object-cover" priority />
      </div>
      <div className="absolute inset-0 bg-black bg-opacity-40"></div>
      <div className="relative z-10 container mx-auto h-full flex flex-col items-center justify-center text-center px-4 sm:px-6 lg:px-8 pt-24">
        <div className="w-full max-w-[200px] sm:max-w-[250px] mb-12 mt-8 relative">
          <div className="aspect-ratio-container aspect-ratio-16-9">
            <Image
              src={LOGOS.primary}
              alt="Atikis Minnesota Aviation Catering"
              fill
              className="object-contain"
              priority
              sizes="(max-width: 640px) 200px, 250px"
            />
          </div>
        </div>
        <h1 className="font-montserrat text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-6 leading-tight tracking-tight max-w-5xl">
          {t('hero.title')}
        </h1>
        <h2 className="font-montserrat text-xl md:text-2xl text-white mb-8 max-w-3xl mx-auto opacity-90 font-normal">
          {t('hero.subtitle')}
        </h2>
        <Button 
          asChild
          size="lg" 
          className="bg-[#D4AF37] hover:bg-[#B69121] text-white font-semibold px-12 py-7 text-xl rounded-full transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
        >
          <Link href="/menu" className="flex items-center gap-3" aria-label="View our aviation catering menu">
            {t('hero.viewMenu')} <ArrowRight className="h-6 w-6" />
          </Link>
        </Button>
      </div>
    </div>
  )

  return (
    <ClientOnly fallback={<StaticHero />}>
      <div className={`hero-video-container w-full min-h-screen relative overflow-hidden ${isTransitioning ? 'animating' : ''}`}>
        {memoizedHeroImages.map((image, index) => (
          <div
            key={image.url}
            className={`hero-image-container absolute inset-0 w-full h-full transition-opacity duration-1000 ${
              index === currentImageIndex ? 'opacity-100' : 'opacity-0'
            } ${isTransitioning ? 'transitioning' : ''}`}
          >
            <ResponsiveImage
              src={image.url}
              alt={image.alt}
              fill
              priority={index <= 1}
              imageType={image.type === 'hospitality' ? 'food' : 'hero'}
              className="object-cover"
              sizes="100vw"
              disableLoadFade
            />
          </div>
        ))}
        
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        
        <div className="relative z-10 container mx-auto h-full flex flex-col items-center justify-center text-center px-4 sm:px-6 lg:px-8 pt-24">
          <div className="w-full max-w-[200px] sm:max-w-[250px] mb-12 mt-8 relative">
            <div className="aspect-ratio-container aspect-ratio-16-9">
              <Image
                src={LOGOS.primary}
                alt="Atikis Minnesota Aviation Catering"
                fill
                className="object-contain"
                priority
                sizes="(max-width: 640px) 200px, 250px"
              />
            </div>
          </div>
          <h1 className="font-montserrat text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-6 leading-tight tracking-tight max-w-5xl">
            {t('hero.title')}
          </h1>
          <h2 className="font-montserrat text-xl md:text-2xl text-white mb-8 max-w-3xl mx-auto opacity-90 font-normal">
            {t('hero.subtitle')}
          </h2>
          <Button 
            asChild
            size="lg" 
            className="bg-[#D4AF37] hover:bg-[#B69121] text-white font-semibold px-12 py-7 text-xl rounded-full transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            <Link href="/menu" className="flex items-center gap-3" aria-label="View our aviation catering menu">
              {t('hero.viewMenu')} <ArrowRight className="h-6 w-6" />
            </Link>
          </Button>
        </div>
      </div>
    </ClientOnly>
  )
}

export default HeroSection