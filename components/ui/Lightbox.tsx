"use client"

import { useEffect, useCallback, useRef, useState } from 'react'
import { cn } from '@/lib/utils'

interface LightboxProps {
  isOpen: boolean
  src: string
  alt: string
  caption?: string
  onClose: () => void
  onPrev?: () => void
  onNext?: () => void
  shareId?: string
  // Filmstrip support (optional)
  items?: { src: string; alt: string }[]
  currentIndex?: number
  onSelectIndex?: (i: number) => void
}

export default function Lightbox({ isOpen, src, alt, caption, onClose, onPrev, onNext, shareId, items = [], currentIndex, onSelectIndex }: LightboxProps) {
  const singleMode = (!onPrev && !onNext && (!items || items.length <= 1))

  const [currentSrc, setCurrentSrc] = useState(src)
  const wrapperRef = useRef<HTMLDivElement | null>(null)
  const [isFs, setIsFs] = useState(false)
  const [showHelp, setShowHelp] = useState(false)
  const [anim, setAnim] = useState(false)
  const [closing, setClosing] = useState(false)
  const [showStrip, setShowStrip] = useState(true)
  const [imgVisible, setImgVisible] = useState(true)
  const [showHint, setShowHint] = useState(false)


  const stripTimerRef = useRef<number | null>(null)
  const captionRef = useRef<HTMLDivElement | null>(null)
  const PHI = 1.61803398875
  const INV_PHI = 1 / PHI

  const [naturalW, setNaturalW] = useState<number | null>(null)
  const [naturalH, setNaturalH] = useState<number | null>(null)
  const triedSrcsRef = useRef<Set<string>>(new Set())


  const [maxW, setMaxW] = useState<number | null>(null)
  const [maxH, setMaxH] = useState<number | null>(null)

  const [padTop, setPadTop] = useState(16)
  const [padRight, setPadRight] = useState(16)
  const [padBottom, setPadBottom] = useState(16)
  const [padLeft, setPadLeft] = useState(16)

  const [ctrlTop, setCtrlTop] = useState(16)
  const [ctrlRight, setCtrlRight] = useState(16)
  const [arrowLeft, setArrowLeft] = useState(16)
  const [arrowRight, setArrowRight] = useState(16)
  const [stripBottom, setStripBottom] = useState(16)

  const [captionOffset, setCaptionOffset] = useState(0)

  // Sound state
  const [soundOn, setSoundOn] = useState(false)
  const [volume, setVolume] = useState(0.3)

  // Get or create ambient audio element
  const getAudioEl = useCallback(() => {
    if (typeof window === 'undefined') return null
    let el = document.getElementById('ambient-audio') as HTMLAudioElement
    if (!el) {
      el = document.createElement('audio')
      el.id = 'ambient-audio'
      el.loop = true
      el.preload = 'auto'
      // Add a subtle ambient sound source - you may want to replace this with your actual audio file
      el.src = '/audio/ambient.mp3' // Make sure this file exists in your public/audio folder
      document.body.appendChild(el)
    }
    return el
  }, [])

  // Golden-ratio layout: compute image max size and modal paddings
  const computeMaxHeight = useCallback(() => {
    if (!isOpen) return
    const vw = typeof window !== 'undefined' ? window.innerWidth : 1280
    const vh = typeof window !== 'undefined' ? window.innerHeight : 800
    const captionH = captionRef.current?.offsetHeight ?? (caption ? 56 : 0)
    const filmstripReserve = items && items.length > 1 ? 88 : 0
    const minPad = 12

    // Effective vertical space for image + golden padding
    const effVh = Math.max(200, vh - filmstripReserve - captionH)

    // Golden ratio constraints relative to viewport
    const Wg = vw / PHI
    const Hg = effVh / PHI

    const r = (naturalW && naturalH && naturalH !== 0) ? (naturalW / naturalH) : (3/2)

    // Candidate 1: width-limited
    let w1 = Math.min(Wg, vw - 2 * minPad)
    let h1 = w1 / r

    // Candidate 2: height-limited
    let h2 = Math.min(Hg, effVh - 2 * minPad)
    let w2 = h2 * r
    if (w2 > vw - 2 * minPad) { w2 = vw - 2 * minPad; h2 = w2 / r }

    // Choose the larger area that fits
    const area1 = Math.max(0, w1) * Math.max(0, h1)
    const area2 = Math.max(0, w2) * Math.max(0, h2)
    let w = w1, h = h1
    if (area2 > area1) { w = w2; h = h2 }

    setMaxW(Math.floor(w))
    setMaxH(Math.floor(h))

    // Golden-ratio padding from remaining space
    const leftoverV = Math.max(0, vh - filmstripReserve - captionH - h)
    const leftoverH = Math.max(0, vw - w)

    const tPad = Math.max(minPad, leftoverV * INV_PHI)
    const bPad = Math.max(minPad, leftoverV - tPad)
    const lPad = Math.max(minPad, leftoverH * INV_PHI)
    const rPad = Math.max(minPad, leftoverH - lPad)

    setPadTop(Math.round(tPad))
    setPadBottom(Math.round(bPad))
    setPadLeft(Math.round(lPad))
    setPadRight(Math.round(rPad))

    // Control offsets using golden spacing relative to viewport edges
    setCtrlTop(Math.round(Math.max(12, tPad * INV_PHI)))
    setCtrlRight(Math.round(Math.max(12, rPad * INV_PHI)))
    setArrowLeft(Math.round(Math.max(16, lPad * INV_PHI)))
    setArrowRight(Math.round(Math.max(16, rPad * INV_PHI)))
    setStripBottom(Math.round(Math.max(12, bPad * INV_PHI)))

    // Center caption influence
    const off = Math.round((captionRef.current?.offsetHeight ?? 0) / 2)
    setCaptionOffset(off)
    setTy(off)
  }, [isOpen, items, caption, naturalW, naturalH])

  useEffect(() => {
    if (!isOpen) return
    computeMaxHeight()
    const onR = () => computeMaxHeight()
    window.addEventListener('resize', onR)
    window.addEventListener('orientationchange', onR)
    return () => {
      window.removeEventListener('resize', onR)
      window.removeEventListener('orientationchange', onR)
    }
  }, [isOpen, computeMaxHeight])
  useEffect(() => {
    if (!isOpen) return
    computeMaxHeight()
  }, [isOpen, currentSrc, imgVisible, computeMaxHeight])


  const stripRef = useRef<HTMLDivElement | null>(null)
  const closeBtnRef = useRef<HTMLButtonElement | null>(null)


  const handlePointerMoveRoot = useCallback(() => {
    setShowStrip(true)
    if (stripTimerRef.current) window.clearTimeout(stripTimerRef.current)
    stripTimerRef.current = window.setTimeout(() => setShowStrip(false), 1600)
  }, [])


  // Zoom / pan state
  const [zoom, setZoom] = useState(1)
  const [tx, setTx] = useState(0)
  const [ty, setTy] = useState(0)
  const draggingRef = useRef(false)
  const startRef = useRef<{x:number,y:number,tx:number,ty:number}>({x:0,y:0,tx:0,ty:0})

  const onKey = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') { e.preventDefault(); handleRequestClose(); return }
    if ((e.key === 'ArrowLeft' || e.key === 'PageUp') && onPrev) { e.preventDefault(); onPrev(); return }
    if ((e.key === 'ArrowRight' || e.key === 'PageDown') && onNext) { e.preventDefault(); onNext(); return }

    if (e.key === '?' || (e.key === '/' && e.shiftKey)) { e.preventDefault(); setShowHelp(v => !v); return }
    if (e.key.toLowerCase() === 'f') { e.preventDefault(); toggleFullscreen(); return }
  }, [onPrev, onNext])

  const scrollYRef = useRef(0)

  useEffect(() => {
    if (!isOpen) return
    document.addEventListener('keydown', onKey)
    // Lock body scroll and preserve current scroll position
    try {
      scrollYRef.current = typeof window !== 'undefined' ? window.scrollY : 0
      const body = document.body
      body.style.overflow = 'hidden'
      body.style.position = 'fixed'
      body.style.width = '100%'
      body.style.top = `-${scrollYRef.current}px`
    } catch {}
    return () => {
      document.removeEventListener('keydown', onKey)
      // Restore scroll
      try {
        const body = document.body
        body.style.overflow = ''
        body.style.position = ''
        body.style.width = ''
        const y = scrollYRef.current
        body.style.top = ''
        if (typeof window !== 'undefined') window.scrollTo(0, y)
      } catch {}
    }
  }, [isOpen, onKey])

  // One-time onboarding hint
  useEffect(() => {
    if (!isOpen) return
    try {
      const seen = typeof window !== 'undefined' ? localStorage.getItem('lightboxOnboarded') === 'true' : true
      if (!seen) {
        setShowHint(true)
        const t = window.setTimeout(() => {
          setShowHint(false)
          try { localStorage.setItem('lightboxOnboarded', 'true') } catch {}
        }, 2600)
        return () => window.clearTimeout(t)
      }
    } catch {}
  }, [isOpen])

  // Animate in/out and fullscreen state
  const handleRequestClose = useCallback(() => {
    try {
      if (document.fullscreenElement) {
        document.exitFullscreen?.()
      }
    } catch {}
    setClosing(true)
    setAnim(false)
    setTimeout(() => {
      setClosing(false)
      onClose()
    }, 180)
  }, [onClose])

  const toggleFullscreen = useCallback(() => {
    const el = wrapperRef.current
    if (!el) return
    if (!document.fullscreenElement) {
      el.requestFullscreen?.()
    } else {
      document.exitFullscreen?.()
    }
  }, [])

  useEffect(() => {
    if (isOpen) {
      // next tick to allow transition
      const t = setTimeout(() => setAnim(true), 0)
      return () => clearTimeout(t)
    }
  }, [isOpen])

  // Keep filmstrip/controls visible for clarity
  useEffect(() => {
    if (!isOpen) return
    setShowStrip(true)
    return () => {
      if (stripTimerRef.current) window.clearTimeout(stripTimerRef.current)
    }
  }, [isOpen])

  // Focus close button on open for accessibility
  useEffect(() => {
    if (!isOpen) return
    const t = setTimeout(() => {
      try {
        // Focus without causing browser to scroll the underlying page
        (closeBtnRef.current as any)?.focus?.({ preventScroll: true })
      } catch {
        closeBtnRef.current?.focus()
      }
    }, 0)
    return () => clearTimeout(t)
  }, [isOpen])

  // Keep active thumbnail in view
  useEffect(() => {
    if (!isOpen) return
    if (!stripRef.current) return
    if (typeof currentIndex !== 'number') return
    const imgs = stripRef.current.querySelectorAll('img')
    const el = imgs[currentIndex] as HTMLElement | undefined
    el?.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' })
  }, [currentIndex, isOpen])

  useEffect(() => {
    const onFs = () => setIsFs(!!document.fullscreenElement)
    document.addEventListener('fullscreenchange', onFs)
    return () => document.removeEventListener('fullscreenchange', onFs)
  }, [])

  // Load persisted sound settings
  useEffect(() => {
    if (!isOpen) return
    if (typeof window === 'undefined') return
    try {
      const savedOn = localStorage.getItem('ambientSoundOn')
      const savedVol = localStorage.getItem('ambientVolume')
      if (savedOn !== null) setSoundOn(savedOn === 'true')
      if (savedVol !== null) {
        const v = Math.max(0, Math.min(1, parseFloat(savedVol)))
        if (!Number.isNaN(v)) setVolume(v)
      }
    } catch {}
  }, [isOpen])

  // Persist on change
  // Reset tried sources whenever the src prop changes
  useEffect(() => {
    triedSrcsRef.current = new Set([src])
  }, [src])

  // Compute successive fallback sources for the image if one fails to load
  const nextFallbackSrc = useCallback((): string | null => {
    const cur = currentSrc
    if (!cur) return null
    const tried = triedSrcsRef.current

    const pushIf = (s?: string | null) => {
      if (!s) return null
      if (tried.has(s)) return null
      tried.add(s)
      return s
    }

    // If optimized desktop fails, try tablet, then mobile
    if (/\/optimized\//.test(cur)) {
      if (/_desktop\.jpg$/i.test(cur)) return pushIf(cur.replace(/_desktop\.jpg$/i, '_tablet.jpg'))
      if (/_tablet\.jpg$/i.test(cur)) return pushIf(cur.replace(/_tablet\.jpg$/i, '_mobile.jpg'))
      // If optimized without suffix, try desktop
      if (!/_mobile|_tablet|_desktop/i.test(cur)) return pushIf(cur.replace(/\.jpg$/i, '_desktop.jpg'))
    }

    // Try deriving from original item path if available
    if (items && typeof currentIndex === 'number' && items[currentIndex]) {
      const orig = items[currentIndex].src
      if (orig) {
        const base = orig.replace(/^\//, '').replace(/\.(jpe?g|png|webp)$/i, '')
        const desk = `/optimized/${base}_desktop.jpg`
        const tab = `/optimized/${base}_tablet.jpg`
        const mob = `/optimized/${base}_mobile.jpg`
        return pushIf(desk) || pushIf(tab) || pushIf(mob)
      }
    }

    // Last resort: legacy gallery path by shareId
    if (shareId) {
      const legacy = `/images/gallery/${shareId}.jpg`
      return pushIf(legacy)
    }

    return null
  }, [currentSrc, items, currentIndex, shareId])

  useEffect(() => {
    if (typeof window === 'undefined') return
    try {
      localStorage.setItem('ambientSoundOn', String(soundOn))
      localStorage.setItem('ambientVolume', String(volume))
    } catch {}
  }, [soundOn, volume])

  // Sync image src with crossfade only when it actually changes; reset zoom/pan
  useEffect(() => {
    if (src === currentSrc) return
    setImgVisible(false)
    const t = setTimeout(() => {
      setCurrentSrc(src)
      setZoom(1); setTx(0); setTy(captionOffset)
      setImgVisible(true)
    }, 0)
    return () => clearTimeout(t)
  }, [src, currentSrc, captionOffset])

  // Smooth crossfade for ambient sound and volume control
  useEffect(() => {
    const el = getAudioEl()
    if (!el) return
    const fadeTo = async (target: number, ms = 400) => {
      const steps = 20
      const start = el.volume
      const delta = target - start
      const stepDur = ms / steps
      for (let i = 1; i <= steps; i++) {
        el.volume = Math.max(0, Math.min(1, start + (delta * i) / steps))
        await new Promise(r => setTimeout(r, stepDur))
      }
    }

    const run = async () => {
      try {
        if (soundOn) {
          // Start quiet then fade up
          el.volume = 0
          await el.play()
          await fadeTo(volume)
        } else {
          // Fade down then pause
          await fadeTo(0)
          el.pause()
        }
      } catch {
        // Ignore autoplay errors
      }
    }

    void run()
  }, [soundOn, volume])

  // Apply volume changes immediately when slider moves (if already playing)
  useEffect(() => {
    const el = getAudioEl()
    if (!el) return
    if (!soundOn) return
    el.volume = volume
  }, [volume, soundOn])

  // Wheel-based zoom centered near cursor
  const clamp = (v: number, min: number, max: number) => Math.max(min, Math.min(max, v))
  const onWheelZoom = (e: React.WheelEvent<HTMLImageElement>) => {
    e.preventDefault()
    const delta = -e.deltaY
    const factor = delta > 0 ? 1.1 : 0.9
    const prevZoom = zoom
    let nextZoom = clamp(prevZoom * factor, 1, 4)
    if (nextZoom === prevZoom) return
    // Adjust translation so the zoom focuses around pointer
    const rect = (e.currentTarget as HTMLImageElement).getBoundingClientRect()
    const cx = e.clientX - rect.left - rect.width / 2
    const cy = e.clientY - rect.top - rect.height / 2
    const scale = nextZoom / prevZoom
    const ntx = cx - (cx - tx) * scale
    const nty = cy - (cy - ty) * scale
    setZoom(nextZoom)
    setTx(clamp(ntx, -2000, 2000))
    setTy(clamp(nty, -2000, 2000))
  }

  const handleShare = useCallback(async () => {
    const base = typeof window !== 'undefined' ? window.location.origin : ''
    const url = base ? `${base}/gallery#${encodeURIComponent(shareId || alt)}` : ''
    try {
      if (url && navigator.clipboard?.writeText) await navigator.clipboard.writeText(url)
    } catch {
      if (url) window.prompt('Copy link to this image', url)
    }
  }, [shareId, alt])

  if (!isOpen) return null

  // Basic swipe gesture support
  let touchStartX = 0
  let touchStartY = 0
  // Double-click / double-tap to toggle zoom
  const toggleZoom = () => {
    if (zoom > 1) {
      setZoom(1); setTx(0); setTy(0)
    } else {
      setZoom(2)
    }
  }
  const onImgPointerDown = (e: React.PointerEvent<HTMLImageElement>) => {
    if (zoom <= 1) return
    draggingRef.current = true
    startRef.current = { x: e.clientX, y: e.clientY, tx, ty }
    ;(e.currentTarget as any).setPointerCapture?.(e.pointerId)
  }
  const onImgPointerMove = (e: React.PointerEvent<HTMLImageElement>) => {
    if (!draggingRef.current) return
    const dx = e.clientX - startRef.current.x
    const dy = e.clientY - startRef.current.y
    setTx(startRef.current.tx + dx)
    setTy(startRef.current.ty + dy)
  }
  const onImgPointerUp = (e: React.PointerEvent<HTMLImageElement>) => {
    draggingRef.current = false
    ;(e.currentTarget as any).releasePointerCapture?.(e.pointerId)
  }

  let touchEndX = 0
  let touchEndY = 0
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX = e.changedTouches[0]?.clientX ?? 0
    touchStartY = e.changedTouches[0]?.clientY ?? 0
  }
  const handleTouchEnd = (e: React.TouchEvent) => {
    touchEndX = e.changedTouches[0]?.clientX ?? 0
    touchEndY = e.changedTouches[0]?.clientY ?? 0
    const dx = touchEndX - touchStartX
    const dy = touchEndY - touchStartY
    const horiz = 40
    const vert = 60
    // Vertical swipe-down to dismiss (with small horizontal movement)
    if (Math.abs(dy) > vert && Math.abs(dx) < 30 && dy > vert) { handleRequestClose(); return }
    if (dx > horiz) { onPrev?.(); return }
    if (dx < -horiz) { onNext?.(); return }
  }


  return (
    <div
      ref={wrapperRef}
      className={cn(
        "fixed inset-0 z-[9999] bg-black/80 transition duration-200",
        anim && !closing ? "opacity-100 scale-100" : "opacity-0 scale-95"
      )}
      aria-modal="true"
      role="dialog"
      onPointerMove={handlePointerMoveRoot}
    >
      <div
        className="relative w-full h-full flex items-center justify-center"
        style={{ paddingTop: padTop, paddingRight: padRight, paddingBottom: padBottom, paddingLeft: padLeft }}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onClick={(e) => { if (e.target === e.currentTarget) handleRequestClose() }}
      >
        {/* Image counter (top-center) */}
        {items && items.length > 1 && typeof currentIndex === 'number' && (
          <div className="absolute left-1/2 -translate-x-1/2 text-white/90 bg-black/40 backdrop-blur-sm rounded px-2 py-1 border border-white/10 text-xs md:text-sm" style={{ top: ctrlTop }}>
            {currentIndex + 1} of {items.length}
          </div>
        )}

        {/* Top-right controls */}
        <div className={cn("absolute z-[101] flex gap-2 transition-opacity duration-300", (singleMode || showStrip) ? "opacity-100" : "opacity-0")} style={{ top: ctrlTop, right: ctrlRight }}>
          <button
            ref={closeBtnRef}
            aria-label="Close (Esc)"
            className="px-3 py-2 rounded bg-[#D4AF37] text-black border border-[#D4AF37] hover:bg-[#c39a2f] focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/70 text-sm md:text-base"
            onClick={handleRequestClose}
            title="Close (Esc)"
          >
            <span className="hidden sm:inline">Close</span>
            <span className="sm:hidden">✕</span>
          </button>
        </div>
        {/* Onboarding hint (fades after first use) */}
        {showHint && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-[103] text-white/95 bg-black/60 backdrop-blur-sm rounded-full px-3 py-1.5 border border-white/20 text-xs md:text-sm shadow-lg">
            <span className="hidden sm:inline">Use ←/→ to navigate · Esc to close</span>
            <span className="sm:hidden">Swipe left/right · Swipe down to close</span>
          </div>
        )}


        {/* Prev/Next controls */}
        {onPrev && (
          <button
            aria-label="Previous image"
            className="absolute top-1/2 -translate-y-1/2 rounded-full bg-black/60 text-white w-12 h-12 md:w-14 md:h-14 flex items-center justify-center hover:bg-black/80 focus:outline-none focus:ring-2 focus:ring-white/60"
            style={{ left: arrowLeft }}
            onClick={onPrev}
            title="Previous (←)"
          >
            <span className="text-2xl md:text-3xl">‹</span>
          </button>
        )}
        {onNext && (
          <button
            aria-label="Next image"
            className="absolute top-1/2 -translate-y-1/2 rounded-full bg-black/60 text-white w-12 h-12 md:w-14 md:h-14 flex items-center justify-center hover:bg-black/80 focus:outline-none focus:ring-2 focus:ring-white/60"
            style={{ right: arrowRight }}
            onClick={onNext}
            title="Next (→)"
          >
            <span className="text-2xl md:text-3xl">›</span>
          </button>
        )}



        {/* Image + optional wall label panel */}
        <figure className="relative max-w-[95vw] max-h-[85vh]">
          {/* TODO(preflight): add width/height with intrinsic image dimensions to reduce CLS */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={currentSrc}
            alt={alt}
            loading="eager"
            decoding="async"
            fetchPriority="high"
            onClick={(e) => { e.stopPropagation(); handleRequestClose() }}
            onTouchEnd={(e) => { e.stopPropagation(); handleRequestClose() }}
            onLoad={(e) => {
              const el = e.currentTarget as HTMLImageElement
              if (el?.naturalWidth && el?.naturalHeight) { setNaturalW(el.naturalWidth); setNaturalH(el.naturalHeight) }
            }}
            onError={() => {
              const next = nextFallbackSrc()
              if (next && next !== currentSrc) {
                setCurrentSrc(next)
              }
            }}
            style={{ transform: `translate(${tx}px, ${ty}px) scale(${zoom})`, cursor: 'auto', maxWidth: maxW ? `${maxW}px` : undefined, maxHeight: maxH ? `${maxH}px` : undefined }}
            className={cn("max-w-full rounded-sm shadow-2xl transition-[opacity,transform] duration-200 will-change-transform", imgVisible ? "opacity-100" : "opacity-0")}
          />
          {caption && (
            <div ref={captionRef} className="mt-4 flex flex-col items-center">
              <div className="w-12 h-px bg-[#D4AF37]/70 mb-2" />
              <figcaption className="text-center text-white/90 text-[13px] leading-snug tracking-wide font-light">
                {caption}
              </figcaption>
            </div>
          )}


        </figure>

        {/* Thumbnail filmstrip */}
        {items && items.length > 1 && typeof currentIndex === 'number' && (
          <div ref={stripRef} className={cn("absolute left-1/2 -translate-x-1/2 z-[102] bg-black/60 backdrop-blur-sm rounded px-3 py-2 border border-white/20 transition-opacity duration-300", showStrip ? "opacity-100" : "opacity-0")} style={{ bottom: stripBottom }}>
            <div className="flex gap-2 overflow-x-auto max-w-[90vw] pr-1">
              {items.map((it, i) => {
                const active = i === currentIndex
                const base = it.src.replace(/^\//, '').replace(/\.(jpe?g|png|webp)$/i, '')
                const thumb = `/optimized/${base}_mobile.jpg`
                return (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    key={i}
                    src={thumb}
                    alt={it.alt || `Thumbnail ${i+1}`}
                    width={80}
                    height={56}
                    loading="lazy"
                    decoding="async"
                    onClick={() => onSelectIndex?.(i)}
                    className={cn(
                      "h-14 w-20 object-cover rounded-sm cursor-pointer transition ring-1",
                      active ? "ring-[#D4AF37]" : "ring-white/10 hover:ring-[#D4AF37]/60"
                    )}
                  />
                )
              })}
            </div>
          </div>
        )}

        {/* Keyboard shortcuts overlay */}
        {showHelp && (
          <div className="absolute inset-0 z-[103] flex items-center justify-center bg-black/70">
            <div className="max-w-md w-[90%] rounded border border-white/15 bg-black/80 p-5 text-white/90">
              <div className="text-sm tracking-wide uppercase text-white/70 mb-3">Keyboard Shortcuts</div>
              <ul className="space-y-2 text-[13px]">
                <li><b>Esc</b> — Close</li>
                <li><b>← / →</b> — Previous / Next</li>


                <li><b>S</b> — Toggle Sound</li>
                <li><b>F</b> — Fullscreen</li>
                <li><b>?</b> — Show this overlay</li>
              </ul>
              <div className="mt-4 text-right">
                <button
                  className="px-3 py-1.5 rounded border border-[#D4AF37]/70 text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black"
                  onClick={() => setShowHelp(false)}
                >Close</button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  )
}


