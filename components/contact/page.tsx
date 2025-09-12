import ContactForm from '@/components/contact/ContactForm'
// TODO(DEMO): This duplicate contact page under components/ is not used by Next.js routing.
// Consider deleting it or updating to use /images/backgrounds/bg-wheels-up-03.png like app/contact/page.tsx.

import ContactInfo from '@/components/contact/ContactInfo'

export const metadata = {
  title: 'Contact Us | Atikis Minnesota Aviation Catering',
  description: 'Get in touch with our team to discuss your aviation catering needs or schedule a consultation.',
}

export default function Contact() {
  return (
    <>
      <section className="relative bg-black py-32">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-60"
          style={{
            backgroundImage: "url('/Untitled design (9).png')"
          }}
        ></div>

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