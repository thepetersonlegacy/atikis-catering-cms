import { NextResponse } from 'next/server'
import { loadAllTestimonials } from '@/lib/content/testimonials'
import { getTestimonials } from '@/lib/tina/client'

export async function GET() {
  try {
    // Try to get testimonials from Tina CMS first
    const tinaTestimonials = await getTestimonials()

    if (tinaTestimonials && tinaTestimonials.length > 0) {
      // Transform Tina testimonials to match the expected Testimonial interface
      const transformedTestimonials = tinaTestimonials.map((testimonial: any, index: number) => ({
        id: testimonial.id || String(index + 1),
        name: testimonial.name || '',
        title: testimonial.company || '',
        quote: testimonial.content || '', // Map 'content' field to 'quote'
        rating: testimonial.rating,
        avatar: testimonial.avatar
      }))

      return NextResponse.json(transformedTestimonials, {
        status: 200,
        headers: {
          'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600'
        }
      })
    }

    // Fallback to static testimonials
    const data = loadAllTestimonials()
    return NextResponse.json(data, {
      status: 200,
      headers: {
        'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600'
      }
    })
  } catch (e) {
    console.error('Error loading testimonials:', e)
    return NextResponse.json({ error: 'Failed to load testimonials' }, { status: 500 })
  }
}

