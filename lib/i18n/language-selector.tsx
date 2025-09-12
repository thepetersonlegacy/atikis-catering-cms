"use client"

import { useState, useRef, useEffect, useCallback } from 'react';
import { ChevronDown, Globe, Check } from 'lucide-react';
import { useI18n } from '@/lib/i18n/i18n-context';
import { cn } from '@/lib/utils';
import { useHydration } from '@/lib/hooks/useHydration';
import ClientOnly from '@/components/ClientOnly';

const LanguageSelector = () => {
  const { language, setLanguage, availableLanguages, t, isRTL } = useI18n();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const isHydrated = useHydration();

  const currentLanguage = availableLanguages.find(lang => lang.code === language);

  const handleClickOutside = useCallback((event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  }, []);

  const handleEscape = useCallback((event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      setIsOpen(false);
    }
  }, []);

  useEffect(() => {
    if (!isHydrated) return;

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isHydrated, handleClickOutside, handleEscape]);

  const handleLanguageSelect = useCallback((langCode: string) => {
    setLanguage(langCode);
    setIsOpen(false);
  }, [setLanguage]);

  const handleKeyDown = useCallback((event: React.KeyboardEvent, langCode?: string) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      if (langCode) {
        handleLanguageSelect(langCode);
      } else {
        setIsOpen(!isOpen);
      }
    }
  }, [isOpen, handleLanguageSelect]);

  const StaticSelector = () => (
    <div className="flex items-center gap-2 px-3 py-2 rounded-md bg-white/10 text-white border border-white/20">
      <Globe className="h-4 w-4" />
      <span className="text-sm font-medium">
        {currentLanguage?.flag} {currentLanguage?.nativeName}
      </span>
      <ChevronDown className="h-4 w-4" />
    </div>
  );

  return (
    <ClientOnly fallback={<StaticSelector />}>
      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          onKeyDown={(e) => handleKeyDown(e)}
          className={cn(
            "flex items-center gap-2 px-3 py-2 rounded-md transition-all duration-200",
            "bg-white/10 hover:bg-white/20 text-white border border-white/20",
            "focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:ring-offset-2 focus:ring-offset-transparent",
            isRTL && "flex-row-reverse"
          )}
          aria-label={t('common.selectLanguage')}
          aria-expanded={isOpen}
          aria-haspopup="listbox"
        >
          <Globe className="h-4 w-4" />
          <span className="text-sm font-medium">
            {currentLanguage?.flag} {currentLanguage?.nativeName}
          </span>
          <ChevronDown 
            className={cn(
              "h-4 w-4 transition-transform duration-200",
              isOpen && "rotate-180"
            )} 
          />
        </button>

        {isOpen && (
          <div 
            className={cn(
              "absolute top-full mt-2 w-64 bg-white rounded-lg shadow-xl border border-gray-200 z-50",
              "animate-in fade-in-0 zoom-in-95 duration-200",
              isRTL ? "right-0" : "left-0"
            )}
            role="listbox"
            aria-label={t('common.selectLanguage')}
          >
            <div className="py-2">
              {availableLanguages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => handleLanguageSelect(lang.code)}
                  onKeyDown={(e) => handleKeyDown(e, lang.code)}
                  className={cn(
                    "w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors duration-150",
                    "flex items-center justify-between group focus:outline-none focus:bg-gray-50",
                    language === lang.code && "bg-[#D4AF37]/10",
                    isRTL && "text-right flex-row-reverse"
                  )}
                  role="option"
                  aria-selected={language === lang.code}
                >
                  <div className={cn("flex items-center gap-3", isRTL && "flex-row-reverse")}>
                    <span className="text-xl">{lang.flag}</span>
                    <div className={cn(isRTL && "text-right")}>
                      <div className="font-medium text-gray-900">{lang.nativeName}</div>
                      <div className="text-sm text-gray-500">{lang.name}</div>
                    </div>
                  </div>
                  {language === lang.code && (
                    <Check className="h-4 w-4 text-[#D4AF37]" />
                  )}
                </button>
              ))}
            </div>
            
            <div className="border-t border-gray-200 px-4 py-3 bg-gray-50 rounded-b-lg">
              <p className="text-xs text-gray-600 text-center">
                {t('common.selectLanguage')}
              </p>
            </div>
          </div>
        )}
      </div>
    </ClientOnly>
  );
};

export default LanguageSelector;

