"use client"

import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ChevronRight } from 'lucide-react'
import { useState, useEffect, useMemo, useRef, useCallback } from 'react'
import { useI18n } from '@/lib/i18n/i18n-context'
import { useHydration } from '@/lib/hooks/useHydration'
import ClientOnly from '@/components/ClientOnly'
import ResponsiveImage from '@/components/ui/ResponsiveImage'

const images = [
  "/images/food/food-carousel-01.jpg",
  "/images/food/food-carousel-02.jpg",
  "/images/food/food-carousel-03.jpg",
  "/images/food/food-carousel-04.jpg",
  "/images/food/food-carousel-05.jpg",
  "/images/food/food-carousel-06.jpg",
  "/images/food/food-carousel-07.jpg",
  "/images/food/food-carousel-08.jpg"
]

export const FeaturedMenuSection = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const { t } = useI18n()
  const isHydrated = useHydration()

  const memoizedImages = useMemo(() => images, [])

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
      setCurrentImageIndex((current) => (current + 1) % memoizedImages.length)
      timeoutRef.current = setTimeout(() => setIsTransitioning(false), 1000)
    }, 5000)
    
    return cleanupTimers
  }, [isHydrated, memoizedImages.length, cleanupTimers])

  const StaticCarousel = () => (
    <div className="max-w-[1920px] mx-auto">
      <div className="aspect-ratio-container aspect-ratio-16-9 bg-gray-200 rounded-lg overflow-hidden">
        <Image
          src={memoizedImages[0]}
          alt="Gourmet aviation catering and culinary presentations"
          fill
          className="object-cover"
          sizes="(max-width: 1920px) 100vw, 1920px"
          priority
          quality={90}
        />
      </div>
    </div>
  )

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-montserrat text-3xl md:text-4xl font-bold mb-4">{t('menu.title')}</h2>
          <div className="w-24 h-1 bg-[#D4AF37] mx-auto mb-6"></div>
          
          <ClientOnly fallback={<StaticCarousel />}>
            <div className="max-w-[1920px] mx-auto">
              <div className={`carousel-container relative aspect-[16/9] w-full overflow-hidden rounded-lg ${isTransitioning ? 'transitioning' : ''}`}>
                {memoizedImages.map((image, index) => (
                  <div
                    key={image}
                    className={`carousel-slide absolute inset-0 transition-opacity duration-1000 ${
                      index === currentImageIndex ? 'opacity-100' : 'opacity-0'
                    }`}
                  >
                    <ResponsiveImage
                      src={image}
                      alt="Gourmet aviation catering and culinary presentations"
                      fill
                      imageType="food"
                      sizes="(max-width: 1920px) 100vw, 1920px"
                      priority={index < 3}
                      quality={index < 3 ? 90 : 75}
                      loading={index < 3 ? 'eager' : 'lazy'}
                    />
                  </div>
                ))}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 z-10">
                  {memoizedImages.map((_, index) => (
                    <button
                      key={index}
                      className={`w-2 h-2 rounded-full transition-colors ${
                        index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                      }`}
                      onClick={() => setCurrentImageIndex(index)}
                      aria-label={`Go to slide ${index + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </ClientOnly>
          
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mt-8">{t('menu.subtitle')}</p>
        </div>

        <div className="text-center mt-12 space-y-4">
          <Button 
            asChild
            variant="outline" 
            className="border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-white"
          >
            <a href="mailto:order@atikismn.com">{t('contact.submitInquiry')}</a>
          </Button>
          
          <div>
            <Button 
              asChild
              className="bg-black hover:bg-gray-800 text-white"
            >
              <Link href="/menu" className="inline-flex items-center">
                {t('hero.viewMenu')} <ChevronRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}