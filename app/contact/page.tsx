import ContactForm from '@/components/contact/ContactForm'
import ContactInfo from '@/components/contact/ContactInfo'
import Image from 'next/image'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact Aviation Catering Services | Get Quote',
  description: 'Contact Atikis Minnesota Aviation Catering for premium in-flight dining services. Call (651) 647-4940 or email order@atikismn.com for quotes and consultations.',
  keywords: [
    'aviation catering contact',
    'private jet catering quote',
    'Minnesota flight catering contact',
    'aviation dining consultation',
    'KMSP catering services',
    'flight catering Minneapolis'
  ],
  openGraph: {
    title: 'Contact Aviation Catering Services | Get Quote',
    description: 'Contact Atikis Minnesota Aviation Catering for premium in-flight dining services. Professional consultation and custom quotes available.',
    images: ['/images/backgrounds/bg-wheels-up-03.png'],
  },
}

export default function Contact() {
  return (
    <>
      <section className="relative bg-black py-32">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image src="/images/backgrounds/bg-wheels-up-03.png" alt="Contact background" fill className="object-cover opacity-60" priority />
        </div>
        
        <div className="relative z-10 container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
            Contact <span className="text-white">Us</span>
          </h1>
          <div className="w-24 h-1 bg-[#D4AF37] mx-auto mb-6"></div>
          <p className="text-xl text-white max-w-2xl mx-auto opacity-90">
            We&apos;re here to help with all your aviation catering needs
          </p>
        </div>
      </section>
      
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <ContactInfo />
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  )
}