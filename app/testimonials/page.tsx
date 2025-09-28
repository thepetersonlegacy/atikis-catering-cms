'use client'

import { useEffect, useState } from 'react'
import type { Testimonial } from '@/lib/data/testimonials-data'
import { testimonials as fallbackTestimonials } from '@/lib/data/testimonials-data'
import TestimonialsHero from '@/components/testimonials/TestimonialsHero'
import TestimonialGrid from '@/components/testimonials/TestimonialGrid'
import { useI18n } from '@/lib/i18n/i18n-context'

export default function Testimonials() {

  const [items, setItems] = useState<Testimonial[]>(fallbackTestimonials)

  useEffect(() => {
    let cancelled = false
    const load = async () => {
      try {
        const res = await fetch('/api/testimonials', { cache: 'no-store' })
        if (!res.ok) return
        const data = await res.json()
        if (!cancelled && Array.isArray(data) && data.length) setItems(data)
      } catch {}
    }
    load()
    return () => {
      cancelled = true
    }
  }, [])

  const { t } = useI18n()

  return (
    <>
      <TestimonialsHero />
      <TestimonialGrid testimonials={items} />

      <section className="py-20 bg-white" itemScope itemType="https://schema.org/Organization">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-montserrat text-3xl font-bold mb-6">{t('testimonials.joinClients')}</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
            {t('testimonials.experienceDescription')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:order@atikismn.com"
              className="bg-[#D4AF37] hover:bg-[#B69121] text-white font-bold py-3 px-8 rounded-md transition duration-300"
            >
              {t('nav.contact')}
            </a>
            <a
              href="/menu"
              className="bg-black hover:bg-gray-800 text-white font-bold py-3 px-8 rounded-md transition duration-300"
            >
              {t('hero.viewMenu')}
            </a>
          </div>
        </div>
      </section>
    </>
  )
}