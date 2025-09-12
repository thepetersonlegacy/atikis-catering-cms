"use client"

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Logo from '@/components/layout/Logo'
import LanguageSelector from '@/lib/i18n/language-selector'
import { useI18n } from '@/lib/i18n/i18n-context'
import { useIsomorphicLayoutEffect } from '@/lib/hooks/useIsomorphicLayoutEffect'

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { t } = useI18n()

  const navigation = [
    { name: t('nav.home'), href: '/' },
    { name: t('nav.menu'), href: '/menu' },
    { name: t('nav.gallery'), href: '/gallery' },
    { name: t('nav.testimonials'), href: '/testimonials' },
    { name: t('nav.contact'), href: '/contact' },
  ]

  const handleScroll = useCallback(() => {
    const scrolled = window.scrollY > 10;
    setIsScrolled(scrolled);
  }, []);

  useIsomorphicLayoutEffect(() => {
    let ticking = false
    
    const throttledHandleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener('scroll', throttledHandleScroll, { passive: true })
    return () => window.removeEventListener('scroll', throttledHandleScroll)
  }, [handleScroll])

  const closeMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(false)
  }, [])

  return (
    <header
      className={cn(
        'fixed w-full z-50 transition-all duration-300',
        isScrolled 
          ? 'bg-black bg-opacity-90 backdrop-blur-sm py-3 shadow-md' 
          : 'bg-transparent py-5'
      )}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Logo />
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          {navigation.map((item) => (
            <Link 
              key={item.name} 
              href={item.href}
              className="font-montserrat text-white hover:text-[#D4AF37] transition-colors"
              prefetch={item.href === '/' ? true : false}
              aria-label={`Navigate to ${item.name} page`}
            >
              {item.name}
            </Link>
          ))}
          <LanguageSelector />
          <Button asChild className="bg-[#D4AF37] hover:bg-[#B69121] text-white" aria-label="Contact us to place an order">
            <a href="mailto:order@atikismn.com">{t('nav.orderNow')}</a>
          </Button>
        </nav>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-white"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-black bg-opacity-95 backdrop-blur-sm">
          <div className="px-4 py-6 space-y-4">
            {navigation.map((item) => (
              <Link 
                key={item.name} 
                href={item.href}
                className="block font-montserrat text-white hover:text-[#D4AF37] transition-colors py-2"
                onClick={closeMobileMenu}
                prefetch={item.href === '/' ? true : false}
              >
                {item.name}
              </Link>
            ))}
            <div className="py-2">
              <LanguageSelector />
            </div>
            <Button 
              asChild
              className="w-full bg-[#D4AF37] hover:bg-[#B69121] text-white mt-4"
              onClick={closeMobileMenu}
            >
              <a href="mailto:order@atikismn.com">{t('nav.orderNow')}</a>
            </Button>
          </div>
        </div>
      )}
    </header>
  )
}

export default Header