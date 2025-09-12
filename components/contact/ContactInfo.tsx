"use client"

import { Phone, Mail, MapPin, Clock } from 'lucide-react'
import { useI18n } from '@/lib/i18n/i18n-context'

const ContactInfo = () => {
  const { t } = useI18n()

  const contactDetails = [
    {
      icon: <Phone className="h-6 w-6 text-[#D4AF37]" />,
      title: t('contact.phone'),
      details: [t('contact.phoneMain'), t('contact.phoneDirect')],
    },
    {
      icon: <Mail className="h-6 w-6 text-[#D4AF37]" />,
      title: t('contact.email'),
      details: [t('contact.emailAddress')],
    },
    {
      icon: <MapPin className="h-6 w-6 text-[#D4AF37]" />,
      title: t('contact.address'),
      details: [t('contact.addressLine1'), t('contact.addressLine2'), t('contact.addressCountry')],
    },
    {
      icon: <Clock className="h-6 w-6 text-[#D4AF37]" />,
      title: t('contact.hours'),
      details: [t('contact.hoursText')],
    },
  ];

  return (
    <div>
      <h2 className="font-montserrat text-2xl font-bold mb-6">{t('contact.getInTouch')}</h2>
      <p className="text-gray-600 mb-8">
        {t('contact.description')}
      </p>
      
      <div className="space-y-8">
        {contactDetails.map((item, index) => (
          <div key={index} className="flex">
            <div className="mr-4 mt-1">{item.icon}</div>
            <div>
              <h3 className="font-montserrat font-bold text-lg mb-2">{item.title}</h3>
              {item.details.map((detail, i) => (
                <p key={i} className="text-gray-600">{detail}</p>
              ))}
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-12 p-6 bg-gray-50 rounded-lg">
        <h3 className="font-montserrat font-bold text-lg mb-3">{t('contact.fastResponse')}</h3>
        <p className="text-gray-600">
          {t('contact.fastResponseDescription')}
        </p>
      </div>
    </div>
  )
}

export default ContactInfo