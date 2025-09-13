"use client"

"use client"

import Link from 'next/link'
import { Mail } from 'lucide-react'
import Logo from '@/components/layout/Logo'
import { useI18n } from '@/lib/i18n/i18n-context'

export default function Footer() {
  const { t } = useI18n()

  return (
    <footer className="bg-black text-white pt-16 pb-8" itemScope itemType="https://schema.org/Organization">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Logo />
            <div className="font-open-sans text-gray-300 mt-4">
              <p className="font-semibold mb-2" itemProp="areaServed">{t('footer.airportsServed')}</p>
              <ul className="space-y-1">
                <li>{t('page.airportKMSP')}</li>
                <li>{t('page.airportKSTP')}</li>
                <li>{t('page.airportKFCM')}</li>
                <li>{t('page.airportKANE')}</li>
              </ul>
            </div>
          </div>

          <div>
            <h3 className="font-montserrat text-lg font-semibold mb-4 text-[#D4AF37]">{t('footer.quickLinks')}</h3>
            <ul className="space-y-2">
              {[
                { name: t('nav.home'), href: '/' },
                { name: t('nav.menu'), href: '/menu' },
                { name: t('nav.gallery'), href: '/gallery' },
                { name: t('nav.testimonials'), href: '/testimonials' },
                { name: t('nav.contact'), href: '/contact' }
              ].map((item) => (
                <li key={item.name}>
                  <Link 
                    href={item.href}
                    className="font-open-sans text-gray-300 hover:text-[#D4AF37] transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-montserrat text-lg font-semibold mb-4 text-[#D4AF37]" itemProp="contactPoint">{t('contact.title')}</h3>
            <div className="space-y-6">
              <div className="bg-gray-900/50 rounded-lg p-4 hover:bg-gray-900/70 transition-colors">
                <div className="flex items-center gap-2 mb-2">
                  <Mail className="h-5 w-5 text-[#D4AF37]" />
                  <h4 className="font-semibold text-white">{t('contact.email')}</h4>
                </div>
                <p className="text-gray-400 text-sm mb-2">
                  {t('footer.emailDescription')}
                </p>
                <a 
                  href="mailto:order@atikismn.com" 
                  className="text-[#D4AF37] hover:text-[#B69121] transition-colors inline-block font-medium"
                  itemProp="email"
                >
                  order@atikismn.com
                </a>
                <p className="text-sm text-gray-500 mt-2 border-t border-gray-800 pt-2">
                  {t('contact.fastResponse')}
                </p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-montserrat text-lg font-semibold mb-4 text-[#D4AF37]">{t('footer.legal')}</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/privacy" className="font-open-sans text-gray-300 hover:text-[#D4AF37] transition-colors">
                  {t('footer.privacyPolicy')}
                </Link>
              </li>
              <li>
                <Link href="/terms" className="font-open-sans text-gray-300 hover:text-[#D4AF37] transition-colors">
                  {t('footer.termsOfService')}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8">
          <p className="font-open-sans text-gray-400 text-sm text-center">
            © {new Date().getFullYear()} {t('footer.copyright')}
          </p>
        </div>
      </div>
    </footer>
  )
}