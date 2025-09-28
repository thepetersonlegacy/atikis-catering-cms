import { NextResponse } from 'next/server'
import { loadAllTestimonials } from '@/lib/content/testimonials'

export async function GET() {
  try {
    const data = loadAllTestimonials()
    return NextResponse.json(data, { status: 200 })
  } catch (e) {
    return NextResponse.json({ error: 'Failed to load testimonials' }, { status: 500 })
  }
}

