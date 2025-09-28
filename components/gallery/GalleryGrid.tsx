"use client"

import { useEffect, useLayoutEffect, useState, useRef } from 'react'


export interface GalleryImage {
  src: string
  alt: string
  caption?: string
  album?: string
}

interface GalleryGridProps {
  images: GalleryImage[]
}

export default function GalleryGrid({ images }: GalleryGridProps) {
  const [loaded, setLoaded] = useState<Record<number, boolean>>({})


  // Series/album filtering
  const [selectedAlbum, setSelectedAlbum] = useState<string | null>(null)
  const albums = Array.from(new Set(images.map(i => i.album).filter(Boolean))) as string[]
  const filteredImages = (selectedAlbum ? images.filter(i => i.album === selectedAlbum) : images)





  const containerRef = useRef<HTMLDivElement | null>(null)




  // Persist last-used album filter (load)
  useEffect(() => {
    if (typeof window === 'undefined') return
    const saved = localStorage.getItem('gallerySelectedAlbum')
    if (saved && albums.includes(saved)) setSelectedAlbum(saved)
  }, [albums])

  // Persist last-used album filter (save)
  useEffect(() => {
    if (typeof window === 'undefined') return
    try {
      if (selectedAlbum) localStorage.setItem('gallerySelectedAlbum', selectedAlbum)
      else localStorage.removeItem('gallerySelectedAlbum')
    } catch {}
  }, [selectedAlbum])

  // True FLIP reflow animation support
  const flipBeforeRef = useRef<Map<string, DOMRect> | null>(null)
  const flipPendingRef = useRef(false)
  const capturePositions = () => {
    const el = containerRef.current
    const map = new Map<string, DOMRect>()
    if (!el) return map
    const nodes = el.querySelectorAll('figure[data-key]')
    nodes.forEach((node) => {
      const key = (node as HTMLElement).dataset.key
      if (key) map.set(key, (node as HTMLElement).getBoundingClientRect())
    })
    return map
  }
  const handleFilterChange = (next: string | null) => {
    flipBeforeRef.current = capturePositions()
    flipPendingRef.current = true
    setSelectedAlbum(next)
  }
  useLayoutEffect(() => {
    if (!flipPendingRef.current) return
    const el = containerRef.current
    if (!el) { flipPendingRef.current = false; return }
    const before = flipBeforeRef.current || new Map<string, DOMRect>()
    const nodes = Array.from(el.querySelectorAll('figure[data-key]')) as HTMLElement[]
    // Apply inverted transforms
    nodes.forEach((node) => {
      const key = node.dataset.key
      if (!key) return
      const b = before.get(key)
      const a = node.getBoundingClientRect()
      if (!b) return
      const dx = b.left - a.left
      const dy = b.top - a.top
      if (dx !== 0 || dy !== 0) {
        node.style.transform = `translate(${dx}px, ${dy}px)`
        node.style.transition = 'transform 0s, opacity 0s'
        node.style.willChange = 'transform'
      }
    })
    // Play
    requestAnimationFrame(() => {
      nodes.forEach((node) => {
        node.style.transition = 'transform 420ms cubic-bezier(0.22, 1, 0.36, 1)'
        node.style.transform = 'translate(0px, 0px)'
      })
      window.setTimeout(() => {
        nodes.forEach((node) => {
          node.style.transition = ''
          node.style.willChange = ''
          node.style.transform = ''
        })
      }, 460)
    })
    flipPendingRef.current = false
  }, [selectedAlbum])












  const containerClass = 'grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-2 lg:gap-6 xl:grid-cols-3 xl:gap-8'

  const sizes = '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 50vw, 33vw'

  const figureClass = 'mb-6 break-inside-avoid group'

  return (
    <div>
      {/* Layout toggle */}
      <div className="mb-4 flex flex-wrap items-center gap-3">




        {/* Filter chips */}
        {albums.length > 0 && (
          <div className="flex items-center gap-2">
            <span className="text-white/70 text-sm">Filter:</span>
            <div className="flex flex-wrap gap-2">
              <button
                className={`px-2.5 py-1.5 rounded-full text-xs border ${!selectedAlbum ? 'bg-[#D4AF37] text-black border-[#D4AF37]' : 'border-[#D4AF37]/70 text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black'}`}
                onClick={() => handleFilterChange(null)}
                aria-pressed={!selectedAlbum}
              >All</button>
              {albums.map(album => (
                <button
                  key={album}
                  className={`px-2.5 py-1.5 rounded-full text-xs border ${selectedAlbum === album ? 'bg-[#D4AF37] text-black border-[#D4AF37]' : 'border-[#D4AF37]/70 text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black'}`}
                  onClick={() => handleFilterChange(album)}
                  aria-pressed={selectedAlbum === album}
                >{album}</button>
              ))}
            </div>
          </div>
        )}


      </div>

      <div className="relative">

        <div
          ref={containerRef}
          className={containerClass}
        >
        {filteredImages.map((img, i) => {
          // Derive optimized responsive variants if available
          const base = img.src.replace(/^\//, '').replace(/\.(jpe?g|png|webp)$/i, '')
          const mobile = `/optimized/${base}_mobile.jpg`
          const tablet = `/optimized/${base}_tablet.jpg`
          const desktop = `/optimized/${base}_desktop.jpg`
          const sizesAttr = sizes

          const imgSrc = mobile
          const srcSet = `${mobile} 640w, ${tablet} 1024w, ${desktop} 1920w`

          const eager = i < 2
          const fetchPriority = eager ? 'high' : 'low'

          const caption = img.caption || img.alt

          return (
            <figure key={img.src} data-key={img.src} className={figureClass}>
              <div className="relative w-full overflow-visible rounded-sm">

                {/* Static image only - no click to enlarge */}
                <div
                  className="relative block w-full overflow-hidden rounded-sm"
                  aria-label={`Image: ${img.alt}`}
                >
                  {/* Matting + image */}
                  <div className="relative rounded-sm bg-black p-1">
                    <div className="relative aspect-[1/1] sm:aspect-[4/3] md:aspect-[3/2] w-full overflow-hidden rounded-[2px]">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      {/* TODO(preflight): add width/height with intrinsic image dimensions to reduce CLS */}
                      <img
                        src={imgSrc}
                        srcSet={srcSet}
                        sizes={sizesAttr}
                        alt={img.alt}
                        onLoad={() => setLoaded(prev => ({ ...prev, [i]: true }))}
                        className={`absolute inset-0 w-full h-full object-cover border-2 border-white/90 rounded-[2px] transition-transform duration-500 ease-out will-change-transform group-hover:scale-[1.02] ${loaded[i] ? 'opacity-100 blur-0' : 'opacity-0 blur-md'}`}
                        loading={eager ? 'eager' : 'lazy'}
                        decoding="async"
                        fetchPriority={fetchPriority as any}
                      />
                      {/* Gold ring on hover + subtle gradient veil */}
                      <div className="pointer-events-none absolute inset-0 ring-1 ring-[#D4AF37]/0 group-hover:ring-[#D4AF37]/60 transition-[box-shadow,opacity]" />
                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent to-black/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </div>

                </div>
              </div>

              {/* Caption */}
              <figcaption className="mt-2 text-[13px] md:text-[14px] leading-relaxed tracking-[0.05em] text-white/90 font-light">
                {caption}
              </figcaption>
            </figure>
          )
        })}
      </div>
        </div>


    </div>
  )
}

