'use client'

import React from 'react'
import Image from 'next/image'
import { useI18n } from '@/lib/i18n/i18n-context'

const AboutSection = () => {
  const { t } = useI18n()

  return (
    <section className="py-24 bg-gray-50" itemScope itemType="https://schema.org/AboutPage">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <div className="relative h-[500px] w-full rounded-lg overflow-hidden shadow-xl">
              <Image
                src="/images/backgrounds/about-culinary.jpg"
                alt="Luxury aviation catering"
                fill
                style={{objectFit: 'cover'}}
                quality={90}
                priority
              />
            </div>
            <div className="absolute -bottom-6 right-6 bg-white p-4 rounded-lg shadow-lg transform hover:translate-y-[-4px] transition-transform duration-300">
              <div className="w-24 h-24 relative">
                <Image 
                  src="/images/hero/logos/atikis-logo-alt.png"
                  alt="Atikis Minnesota Aviation Catering Logo"
                  fill
                  style={{objectFit: 'contain'}}
                  quality={90}
                />
              </div>
            </div>
          </div>
          
          <div>
            <h2 className="font-montserrat text-3xl md:text-4xl font-bold mb-6" itemProp="name">{t('about.title')}</h2>
            <div className="w-24 h-1 bg-[#D4AF37] mb-8"></div>
            
            <p className="text-lg text-gray-700 mb-6 leading-relaxed" itemProp="description">
              {t('about.description1')}
            </p>
            
            <p className="text-lg text-gray-700 mb-8 leading-relaxed">
              {t('about.description2')}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AboutSection