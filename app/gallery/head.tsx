import fs from 'fs'
import path from 'path'

export default function Head() {
  try {
    const galleryDir = path.join(process.cwd(), 'public', 'images', 'gallery')
    const files = fs.readdirSync(galleryDir)
      .filter(f => ['.jpg', '.jpeg', '.png', '.webp'].includes(path.extname(f).toLowerCase()))
      .sort()
    if (files.length) {
      const file = files[0]
      const base = path.join('images', 'gallery', file).replace(/\.(jpe?g|png|webp)$/i, '')
      const mobile = `/optimized/${base}_mobile.jpg`
      const tablet = `/optimized/${base}_tablet.jpg`
      const desktop = `/optimized/${base}_desktop.jpg`
      const imagesizes = '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw'
      const imagesrcset = `${mobile} 640w, ${tablet} 1024w, ${desktop} 1920w`
      return (
        <>
          <link rel="preload" as="image" href={mobile} imageSrcSet={imagesrcset} imageSizes={imagesizes} />
        </>
      )
    }
  } catch {}
  return null
}

