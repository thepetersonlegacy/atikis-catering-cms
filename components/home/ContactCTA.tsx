'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { PhoneCall, Mail, Utensils } from 'lucide-react'
import { useI18n } from '@/lib/i18n/i18n-context'

export const ContactCTA = () => {
  const { t } = useI18n()

  return (
    <section className="py-24 bg-gradient-to-r from-gray-900 to-black">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-montserrat text-3xl md:text-4xl font-bold text-white mb-4">{t('contact.formTitle')}</h2>
          <p className="text-xl text-gray-300 mb-8">{t('contact.description')}</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 flex flex-col items-center">
              <PhoneCall className="text-[#D4AF37] h-10 w-10 mb-4" />
              <h3 className="font-montserrat text-white font-bold text-lg mb-2">{t('contact.phone')}</h3>
              <p className="text-gray-300">{t('contact.fastResponseDescription')}</p>
              <a href="tel:6516474940" className="text-[#D4AF37] font-medium mt-3 hover:underline">
                (651) 647-4940
              </a>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 flex flex-col items-center">
              <Utensils className="text-[#D4AF37] h-10 w-10 mb-4" />
              <h3 className="font-montserrat text-white font-bold text-lg mb-2">Menu</h3>
              <p className="text-gray-300">Browse our aviation catering options</p>
              <a href="/menu" className="text-[#D4AF37] font-medium mt-3 hover:underline">
                View Menu
              </a>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 flex flex-col items-center">
              <Mail className="text-[#D4AF37] h-10 w-10 mb-4" />
              <h3 className="font-montserrat text-white font-bold text-lg mb-2">{t('contact.email')}</h3>
              <p className="text-gray-300">{t('footer.emailDescription')}</p>
              <a href="mailto:order@atikismn.com" className="text-[#D4AF37] font-medium mt-3 hover:underline">
                order@atikismn.com
              </a>
            </div>
          </div>
          
          <Button 
            asChild
            size="lg" 
            className="bg-[#D4AF37] hover:bg-[#B69121] text-white font-semibold px-8 py-6 text-lg"
          >
            <a href="mailto:order@atikismn.com">{t('contact.contactNow')}</a>
          </Button>
        </div>
      </div>
    </section>
  )
}