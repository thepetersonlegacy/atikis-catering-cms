import fs from 'fs'
import path from 'path'
import type { Metadata } from 'next'
import GalleryGrid, { type GalleryImage } from '@/components/gallery/GalleryGrid'
import FadeInOnMount from '@/components/gallery/FadeInOnMount'

export const metadata: Metadata = {
  title: 'Photo Gallery | Atikis Catering',
  description: 'A curated gallery showcasing our premium aviation catering presentation and dishes.'
}

// Curated captions: key = filename without extension, lowercased
const CAPTION_MAP: Record<string, string> = {
  dsc_6236: 'Ahi Tuna Poke bowl',
  dsc_6313: 'Blackened Salmon Caesar',
  dsc_6361: 'Chicken Caesar',
  dsc_6384: 'Mediterranean Chicken Salad',
  dsc_6403: 'Chicken Cobb',
  dsc_6418: 'Butternut Chicken salad',
  "dsc_6462 (1)": 'Arugula Chicken salad',
  dsc_6467: 'Pulled Pork Greenery',
  dsc_6497: 'Smoked salmon arugula',
  dsc_6508: 'Greek salad',
  dsc_6543: 'Ancho Steak salad',
  dsc_6557: 'Peri Peri Chicken salad',
  dsc_6574: 'Steak Gorgonzola',
  dsc_6579: 'Harissa Chicken',
  dsc_6653: 'Wild Rice arugula',
  dsc_6664: 'Asian chicken',
  dsc_6703: 'Nicoise salad',
  "dsc_6722-enhanced-nr (1)": 'Shrimp Cavatappi',
  dsc_7019: 'Buddha Salad',
  dsc_7162: 'Brie chicken with caramelized apples',
  dsc_7918: 'Toasted baguette with herb butter',
  dsc_7971: 'Chocolate-dipped strawberries',
  dsc_7997: 'Mini dessert assortment',
  dsc_8010: 'Fruit tartlets with pastry cream',
  dsc_8030: 'Pistachio mousse cups',
  dsc_8053: 'Macarons assortment',
  dsc_8066: 'Assorted artisan breads',
  dsc_8071: 'Cheesecake bites with berry coulis',
  dsc_8133: 'Grilled vegetable platter',
  "dsc_9115_edited": 'Chef’s tasting plate',
  "dsc_9206_edited": 'Fine dining presentation',
  "how it works_bg": 'Plating & presentation backdrop'
}


function getGalleryImages(): GalleryImage[] {
  try {
    const galleryDir = path.join(process.cwd(), 'public', 'images', 'gallery')
    const files = fs.readdirSync(galleryDir)
    const allowed = new Set(['.jpg', '.jpeg', '.png', '.webp'])
    const images = files
      .filter(f => allowed.has(path.extname(f).toLowerCase()))
      .sort()
      .map(file => {
        const ext = path.extname(file)
        const key = path.basename(file, ext).toLowerCase()
        const name = file.replace(/[-_]/g, ' ').replace(/\.[^.]+$/, '')
        const pretty = name.charAt(0).toUpperCase() + name.slice(1)
        const caption = CAPTION_MAP[key] ?? pretty
        return {
          src: `/images/gallery/${file}`,
          alt: caption,
          caption
        }
      })
    return images
  } catch {
    return []
  }
}

export default function GalleryPage() {
  const allImages = getGalleryImages()
  // Remove items numbered 20–30 (1-based) => indices 19..29
  const images = allImages.filter((_, i) => i < 19 || i > 29)

  return (
    <section className="bg-black">
      <div className="container mx-auto px-4 py-16">
        <header className="mb-8 sm:mb-10">
          <h1 className="text-3xl sm:text-4xl font-montserrat font-semibold text-white">Gallery</h1>
          <div className="w-24 h-1 bg-[#D4AF37] mt-3 mb-4" />
          <p className="text-white/80 max-w-2xl">A curated selection of our presentation and dishes crafted for altitude dining.</p>
        </header>

        <FadeInOnMount>
          {images.length === 0 ? (
            <div className="rounded border border-white/10 bg-white/5 p-6 text-white/80">
              <p className="mb-2">No images found yet.</p>
              <ul className="list-disc list-inside space-y-1">
                <li>Add files to <code className="px-1 rounded bg-black/40">public/images/gallery</code></li>
                <li>Supported types: .jpg, .jpeg, .png, .webp</li>
                <li>Optional: run <code className="px-1 rounded bg-black/40">npm run optimize:images</code> to generate responsive variants</li>
              </ul>
            </div>
          ) : (
            <GalleryGrid images={images} />
          )}
        </FadeInOnMount>
      </div>
    </section>
  )
}

