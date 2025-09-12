"use client"

import { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'

import { Search, CheckSquare, Calendar, CheckCircle, Utensils } from 'lucide-react'
import { useI18n } from '@/lib/i18n/i18n-context'
import { useHydration } from '@/lib/hooks/useHydration'
import ClientOnly from '@/components/ClientOnly'

const processSteps = [
  {
    id: 1,
    icon: Search,
    titleKey: 'howItWorks.browse.title',
    descriptionKey: 'howItWorks.browse.description'
  },
  {
    id: 2,
    icon: CheckSquare,
    titleKey: 'howItWorks.select.title',
    descriptionKey: 'howItWorks.select.description'
  },
  {
    id: 3,
    icon: Calendar,
    titleKey: 'howItWorks.schedule.title',
    descriptionKey: 'howItWorks.schedule.description'
  },
  {
    id: 4,
    icon: CheckCircle,
    titleKey: 'howItWorks.confirm.title',
    descriptionKey: 'howItWorks.confirm.description'
  },
  {
    id: 5,
    icon: Utensils,
    titleKey: 'howItWorks.enjoy.title',
    descriptionKey: 'howItWorks.enjoy.description'
  }
]

const HowItWorksSection = () => {
  const [activeStep, setActiveStep] = useState(1)
  const { t, isRTL } = useI18n()
  const isHydrated = useHydration()

  const rotateStep = useCallback(() => {
    setActiveStep((current) => (current % processSteps.length) + 1)
  }, [])

  useEffect(() => {
    if (!isHydrated) return

    const interval = setInterval(rotateStep, 3000)
    return () => clearInterval(interval)
  }, [isHydrated, rotateStep])

  const handleStepClick = useCallback((stepId: number) => {
    setActiveStep(stepId)
  }, [])

  const handleKeyDown = useCallback((event: React.KeyboardEvent, stepId: number) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      setActiveStep(stepId)
    }
  }, [])

  const StaticSteps = () => (
    <div className="text-center">
      <h2 className="font-montserrat text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4">
        {t('howItWorks.title')}
      </h2>
      <div className="w-16 h-1 bg-[#D4AF37] mx-auto mb-4"></div>
      <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto">
        {t('howItWorks.subtitle')}
      </p>
    </div>
  )

  return (
    <section className="w-full py-8 md:py-12 lg:py-16 bg-[#D4AF37]" aria-label="How our aviation catering process works">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="aspect-[16/9] w-full relative overflow-hidden rounded-lg shadow-xl border-4 border-white">
          <Image
            src="/images/backgrounds/how-it-works.jpg"
            alt="How it works background"
            fill
            sizes="100vw"
            className="object-cover object-center"
            priority={false}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/55 to-black/80" />
          <div className="absolute inset-0 backdrop-blur-sm" />

          <div className="relative z-10 h-full flex flex-col justify-center p-6 md:p-8 lg:p-12">
            <div className="text-center mb-8 md:mb-12">
              <h2 className="font-montserrat text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4">
                {t('howItWorks.title')}
              </h2>
              <div className="w-16 h-1 bg-[#D4AF37] mx-auto mb-4"></div>
              <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto">
                {t('howItWorks.subtitle')}
              </p>
            </div>

            <ClientOnly fallback={<StaticSteps />}>
              {/* Desktop Process Steps */}
              <div className="hidden md:flex justify-between items-center max-w-6xl mx-auto w-full">
                {processSteps.map((step, index) => {
                  const Icon = step.icon
                  const isActive = activeStep === step.id
                  const isCompleted = activeStep > step.id

                  return (
                    <div key={step.id} className="flex items-center">
                      <div
                        className="flex flex-col items-center cursor-pointer group"
                        onClick={() => handleStepClick(step.id)}
                        onKeyDown={(e) => handleKeyDown(e, step.id)}
                        tabIndex={0}
                        role="button"
                        aria-label={`Step ${step.id}: ${t(step.titleKey)}`}
                      >
                        <div className={`
                          relative w-16 h-16 lg:w-20 lg:h-20 rounded-full flex items-center justify-center
                          transition-all duration-300 transform group-hover:scale-110
                          ${isActive
                            ? 'bg-[#D4AF37] text-white shadow-lg shadow-[#D4AF37]/30'
                            : isCompleted
                              ? 'bg-green-500 text-white'
                              : 'bg-white/20 text-white border-2 border-white/40'
                          }
                        `}>
                          <Icon className="w-6 h-6 lg:w-8 lg:h-8" />
                          {isCompleted && !isActive && (
                            <div className="absolute inset-0 flex items-center justify-center">
                              <CheckCircle className="w-6 h-6 lg:w-8 lg:h-8" />
                            </div>
                          )}
                        </div>

                        <div className={`
                          mt-2 w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold
                          ${isActive
                            ? 'bg-white text-[#D4AF37]'
                            : 'bg-white/20 text-white'
                          }
                        `}>
                          {step.id}
                        </div>

                        <div className="mt-4 text-center max-w-[140px]">
                          <h3 className={`
                            font-montserrat font-bold text-sm lg:text-base mb-2 transition-colors duration-300
                            ${isActive ? 'text-[#D4AF37]' : 'text-white'}
                          `}>
                            {t(step.titleKey)}
                          </h3>
                          <p className="text-xs lg:text-sm text-white/80 leading-tight">
                            {t(step.descriptionKey)}
                          </p>
                        </div>
                      </div>

                      {index < processSteps.length - 1 && (
                        <div className={`
                          flex-1 h-0.5 mx-4 lg:mx-6 transition-colors duration-300
                          ${activeStep > step.id ? 'bg-green-500' : 'bg-white/30'}
                        `} />
                      )}
                    </div>
                  )
                })}
              </div>

              {/* Mobile Process Steps */}
              <div className="md:hidden">
                <div
                  className={`
                    flex gap-6 overflow-x-auto pb-4 px-2
                    snap-x snap-mandatory scrollbar-hide
                    ${isRTL ? 'flex-row-reverse' : ''}
                  `}
                >
                  {processSteps.map((step) => {
                    const Icon = step.icon
                    const isActive = activeStep === step.id
                    const isCompleted = activeStep > step.id

                    return (
                      <div
                        key={step.id}
                        className="flex-shrink-0 w-48 snap-center"
                        onClick={() => handleStepClick(step.id)}
                        onKeyDown={(e) => handleKeyDown(e, step.id)}
                        tabIndex={0}
                        role="button"
                        aria-label={`Step ${step.id}: ${t(step.titleKey)}`}
                      >
                        <div className="flex flex-col items-center text-center cursor-pointer group">
                          <div className={`
                            relative w-16 h-16 rounded-full flex items-center justify-center
                            transition-all duration-300 transform group-active:scale-95
                            ${isActive
                              ? 'bg-[#D4AF37] text-white shadow-lg shadow-[#D4AF37]/30'
                              : isCompleted
                                ? 'bg-green-500 text-white'
                                : 'bg-white/20 text-white border-2 border-white/40'
                            }
                          `}>
                            <Icon className="w-6 h-6" />
                            {isCompleted && !isActive && (
                              <div className="absolute inset-0 flex items-center justify-center">
                                <CheckCircle className="w-6 h-6" />
                              </div>
                            )}
                          </div>

                          <div className={`
                            mt-2 w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold
                            ${isActive
                              ? 'bg-white text-[#D4AF37]'
                              : 'bg-white/20 text-white'
                            }
                          `}>
                            {step.id}
                          </div>

                          <div className="mt-4">
                            <h3 className={`
                              font-montserrat font-bold text-base mb-2 transition-colors duration-300
                              ${isActive ? 'text-[#D4AF37]' : 'text-white'}
                            `}>
                              {t(step.titleKey)}
                            </h3>
                            <p className="text-sm text-white/80 leading-tight">
                              {t(step.descriptionKey)}
                            </p>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>

                <div className="flex justify-center mt-6 gap-2">
                  {processSteps.map((step) => (
                    <button
                      key={step.id}
                      onClick={() => handleStepClick(step.id)}
                      className={`
                        w-2 h-2 rounded-full transition-all duration-300
                        ${activeStep === step.id
                          ? 'bg-[#D4AF37] w-6'
                          : 'bg-white/40 hover:bg-white/60'
                        }
                      `}
                      aria-label={`Go to step ${step.id}`}
                    />
                  ))}
                </div>
              </div>
            </ClientOnly>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HowItWorksSection