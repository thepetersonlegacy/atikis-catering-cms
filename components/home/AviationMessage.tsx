'use client';

import React from 'react';
import { useI18n } from '@/lib/i18n/i18n-context';

const AviationMessage = () => {
  const { t } = useI18n();

  return (
    <section className="relative py-32">
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ 
          backgroundImage: "url('/Untitled design (10).png')"
        }}
      ></div>
      
      <div className="absolute inset-0 bg-white/70 backdrop-blur-sm"></div>
      
      <div className="relative z-10 container mx-auto px-4 text-center py-8">
        <h2 className="font-montserrat text-4xl md:text-5xl lg:text-6xl font-bold text-[#D4AF37] mb-4" style={{ textShadow: '2px 2px 6px rgba(0, 0, 0, 0.35)' }}>
          {t('aviationMessage.title')}
        </h2>
      </div>
    </section>
  );
};

export default AviationMessage;