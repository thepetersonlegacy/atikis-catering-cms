"use client"

import { FeaturedMenuSection } from '@/components/home/FeaturedMenuSection'
import TestimonialPreview from '@/components/home/TestimonialPreview'
import { ContactCTA } from '@/components/home/ContactCTA'

export default function HomeDynamicComponents() {
  return (
    <>
      <FeaturedMenuSection />
      <TestimonialPreview />
      <ContactCTA />
    </>
  )
}