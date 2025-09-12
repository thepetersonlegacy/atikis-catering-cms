"use client"

import Image from 'next/image'
import { useI18n } from '@/lib/i18n/i18n-context'
import { BACKGROUNDS } from '@/lib/data/assets'

const TestimonialsHero = () => {
  const { t } = useI18n()

  return (
    <section className="relative bg-black py-32">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image src={BACKGROUNDS.testimonials} alt="Testimonials background" fill className="object-cover opacity-60" priority />
      </div>

      <div className="relative z-10 container mx-auto px-4 text-center">
        <h1 className="font-montserrat text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
          {t('testimonials.title')}
        </h1>
        <div className="w-24 h-1 bg-[#D4AF37] mx-auto mb-6"></div>
        <p className="text-xl text-white max-w-2xl mx-auto opacity-90">
          {t('testimonials.subtitle')}
        </p>
      </div>
    </section>
  )
}

export default TestimonialsHero