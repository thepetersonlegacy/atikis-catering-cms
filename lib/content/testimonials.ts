import fs from 'fs'
import path from 'path'

export interface TinaTestimonialDoc {
  name: string
  company?: string
  content: string
  rating?: number
  avatar?: string
}

export interface Testimonial {
  id: string
  name: string
  title: string
  quote: string
  rating?: number
  avatar?: string
}

export function loadAllTestimonials(): Testimonial[] {
  try {
    const contentDir = path.join(process.cwd(), 'content', 'testimonials')
    const files = fs
      .readdirSync(contentDir)
      .filter((f) => f.endsWith('.json'))
      .sort()

    const toId = (filename: string) => {
      const base = filename.replace(/\.json$/i, '')
      const match = base.match(/(\d+)/)
      return match ? match[1] : base
    }

    const docs: Testimonial[] = files.map((file) => {
      const full = path.join(contentDir, file)
      const raw = fs.readFileSync(full, 'utf-8')
      const data = JSON.parse(raw) as TinaTestimonialDoc
      return {
        id: toId(file),
        name: data.name,
        title: data.company || '',
        quote: data.content,
        rating: typeof data.rating === 'number' ? data.rating : undefined,
        avatar: data.avatar || undefined,
      }
    })

    // Sort numerically by id when possible
    return docs.sort((a, b) => Number(a.id) - Number(b.id))
  } catch (e) {
    return []
  }
}

