"use client"

import Image from 'next/image'
import { useI18n } from '@/lib/i18n/i18n-context'

const MainPageContent = () => {
  const { t } = useI18n()

  return (
    <>
      <div className="absolute inset-0">
        <Image src="/images/backgrounds/bg-wheels-up-04.png" alt="Wheels up background" fill className="object-cover" priority />
      </div>
      <div className="absolute inset-0 bg-white/70 backdrop-blur-sm" />
      <div className="relative z-10 container mx-auto px-4 flex flex-col items-center justify-center">
        <h2 className="font-montserrat text-4xl md:text-5xl lg:text-6xl font-bold text-[#D4AF37] mb-8 text-center" style={{ textShadow: '2px 2px 8px rgba(0, 0, 0, 0.8)' }}>
          {t('page.wheelsUpMessage')}
        </h2>
        <div className="text-lg md:text-xl text-gray-800 max-w-4xl mx-auto text-center leading-relaxed space-y-6">
          <p>
            {t('page.execsMessage')}
          </p>
          <p>
            {t('page.understandMessage')}
          </p>
          <p>
            {t('page.valuedMessage')}
          </p>
          <div className="mt-8">
            <h3 className="font-montserrat font-semibold text-xl mb-4">{t('page.airportsTitle')}</h3>
            <ul className="space-y-2">
              <li>• {t('page.airportKMSP')}</li>
              <li>• {t('page.airportKSTP')}</li>
              <li>• {t('page.airportKFCM')}</li>
              <li>• {t('page.airportKANE')}</li>
            </ul>
          </div>
          <p className="mt-8 font-semibold text-xl">
            {t('page.takeoffMessage')}
          </p>
        </div>
      </div>
    </>
  )
}

export default MainPageContent