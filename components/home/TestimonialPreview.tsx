"use client"

import { useState, useEffect, useMemo, useCallback } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ChevronRight, Quote } from 'lucide-react'
import { testimonials, getTranslatedTestimonial } from '@/lib/data/testimonials-data'
import { useI18n } from '@/lib/i18n/i18n-context'
import { useHydration } from '@/lib/hooks/useHydration'
import ClientOnly from '@/components/ClientOnly'

const TestimonialPreview = () => {
  const [activeIndex, setActiveIndex] = useState(0)
  const { t, language } = useI18n()
  const isHydrated = useHydration()

  const memoizedTestimonials = useMemo(() => testimonials, [])

  const rotateTestimonial = useCallback(() => {
    setActiveIndex((current) => (current + 1) % memoizedTestimonials.length)
  }, [memoizedTestimonials.length])

  useEffect(() => {
    if (!isHydrated) return
    
    const interval = setInterval(rotateTestimonial, 5000)
    return () => clearInterval(interval)
  }, [isHydrated, rotateTestimonial])

  const currentTestimonial = useMemo(() => 
    getTranslatedTestimonial(memoizedTestimonials[activeIndex], language), 
    [memoizedTestimonials, activeIndex, language]
  )

  const StaticTestimonial = () => {
    const staticTestimonial = getTranslatedTestimonial(memoizedTestimonials[0], language)
    return (
      <div className="max-w-4xl mx-auto">
        <div className="testimonial-card bg-gray-900 rounded-xl p-8 md:p-12 shadow-xl relative">
          <Quote className="text-[#D4AF37] h-12 w-12 mb-6" />
          <p className="text-lg text-gray-200 mb-6 italic">
            {staticTestimonial.quote}
          </p>
          <div className="flex flex-col">
            <span className="font-bold text-white text-lg">{staticTestimonial.name}</span>
            <span className="text-gray-400">{staticTestimonial.title}</span>
          </div>
        </div>
      </div>
    )
  }

  return (
    <section className="py-24 bg-black text-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-montserrat text-3xl md:text-4xl font-bold mb-4">{t('testimonials.title')}</h2>
          <div className="w-24 h-1 bg-[#D4AF37] mx-auto mb-6"></div>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">{t('testimonials.subtitle')}</p>
        </div>

        <ClientOnly fallback={<StaticTestimonial />}>
          <div className="max-w-4xl mx-auto">
            <div className="testimonial-card bg-gray-900 rounded-xl p-8 md:p-12 shadow-xl relative">
              <Quote className="text-[#D4AF37] h-12 w-12 mb-6" />
              <p className="text-lg text-gray-200 mb-6 italic">
                {currentTestimonial.quote}
              </p>
              <div className="flex flex-col">
                <span className="font-bold text-white text-lg">{currentTestimonial.name}</span>
                <span className="text-gray-400">{currentTestimonial.title}</span>
              </div>
            </div>

            <div className="flex justify-center mt-8 space-x-2">
              {memoizedTestimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === activeIndex ? 'bg-[#D4AF37]' : 'bg-gray-600'
                  }`}
                  aria-label={`View testimonial ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </ClientOnly>

        <div className="text-center mt-12">
          <Button 
            asChild
            variant="outline" 
            className="border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black"
          >
            <Link href="/testimonials" className="inline-flex items-center">
              {t('testimonials.viewAll')} <ChevronRight className="ml-1 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}

export default TestimonialPreview