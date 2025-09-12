import fs from 'fs'
import path from 'path'
import type { Metadata } from 'next'
import GalleryGrid, { type GalleryImage } from '@/components/gallery/GalleryGrid'
import CuratedSeriesGrid from '@/components/gallery/CuratedSeriesGrid'
import FadeInOnMount from '@/components/gallery/FadeInOnMount'

export const metadata: Metadata = {
  title: 'Photo Gallery | Atikis Catering',
  description: 'A curated gallery showcasing our premium aviation catering presentation and dishes.'
}

// Curated captions: key = filename without extension, lowercased
const CAPTION_MAP: Record<string, string> = {
  dsc_6236: 'Smoked salmon canapés with dill crème fraîche',
  dsc_6313: 'Seasonal fruit medley with mint',
  dsc_6361: 'Artisan cheese board with accoutrements',
  dsc_6384: 'Herb-roasted chicken salad crostini',
  dsc_6403: 'Mediterranean mezze selection',
  dsc_6418: 'Mini beef tenderloin sliders',
  "dsc_6462 (1)": 'Chef’s selection plated entrée',
  dsc_6467: 'Lemon tartlets with toasted meringue',
  dsc_6497: 'Caprese skewers with balsamic glaze',
  dsc_6508: 'Chocolate ganache petit fours',
  dsc_6543: 'Shrimp cocktail with house cocktail sauce',
  dsc_6557: 'Vanilla bean panna cotta',
  dsc_6574: 'Herbed chicken breast with seasonal vegetables',
  dsc_6579: 'Mediterranean couscous salad',
  dsc_6653: 'Gourmet cheese & charcuterie board',
  dsc_6664: 'Fresh garden salad with vinaigrette',
  dsc_6703: 'Gourmet charcuterie assortment',
  "dsc_6722-enhanced-nr (1)": 'Chef’s selection plated entrée',
  dsc_7019: 'Salmon en papillote with citrus',
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
  const images = getGalleryImages()

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
            <>
              <CuratedSeriesGrid
                title="Signature Series"
                images={images}
                items={[
                  { shareId: 'dsc_6703', aspect: 'wide' },
                  { shareId: 'dsc_6467', aspect: 'wide' },
                  { shareId: 'dsc_6664', aspect: 'tall' },
                  { shareId: 'dsc_6313', aspect: 'tall' },
                  { shareId: 'dsc_7019', aspect: 'wide' },
                  { shareId: 'dsc_6236', aspect: 'square' },
                  { shareId: 'dsc_7997', aspect: 'square' },
                  { shareId: 'dsc_6574', aspect: 'wide' }
                ]}
              />
              <GalleryGrid images={images} />
            </>
          )}
        </FadeInOnMount>
      </div>
    </section>
  )
}

