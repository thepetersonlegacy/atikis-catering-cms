"use client"

import { Card, CardContent } from '@/components/ui/card'
import { Quote } from 'lucide-react'
import { getTranslatedTestimonial } from '@/lib/data/testimonials-data'
import { useI18n } from '@/lib/i18n/i18n-context'
import type { Testimonial } from '@/lib/data/testimonials-data'

interface TestimonialGridProps {
  testimonials: Testimonial[];
}

const TestimonialGrid = ({ testimonials }: TestimonialGridProps) => {
  const { language } = useI18n()

  return (
    <section className="py-20 bg-white" itemScope itemType="https://schema.org/Review">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => {
            const translatedTestimonial = getTranslatedTestimonial(testimonial, language)
            
            return (
              <Card key={testimonial.id} className="testimonial-card overflow-hidden shadow-lg border-none" itemScope itemType="https://schema.org/Review">
                <CardContent className="p-0">
                  <div className="p-8 flex flex-col h-full">
                    <Quote className="text-[#D4AF37] h-8 w-8 mb-4" />
                    <p className="text-gray-700 mb-6 flex-grow italic" itemProp="reviewBody">
                      {translatedTestimonial.quote}
                    </p>
                    <div className="mt-auto">
                      <h3 className="font-montserrat font-bold text-lg" itemProp="author">{testimonial.name}</h3>
                      <p className="text-gray-500" itemProp="author">{translatedTestimonial.title}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default TestimonialGrid