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
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [soundOn, setSoundOn] = useState(false)
  const [canPlay, setCanPlay] = useState(false)
  const [labelOpen, setLabelOpen] = useState(false)
  const [volume, setVolume] = useState(0.25)
  const [currentSrc, setCurrentSrc] = useState(src)
  const wrapperRef = useRef<HTMLDivElement | null>(null)
  const [isFs, setIsFs] = useState(false)
  const [showHelp, setShowHelp] = useState(false)
  const [anim, setAnim] = useState(false)
  const [closing, setClosing] = useState(false)
  const [showStrip, setShowStrip] = useState(true)
  const stripTimerRef = useRef<number | null>(null)

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

  const getAudioEl = (): HTMLAudioElement | null => {
    if (typeof document !== 'undefined') {
      const g = document.getElementById('ambient-audio') as HTMLAudioElement | null
      if (g) return g
    }
    return audioRef.current
  }

  const onKey = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') { e.preventDefault(); handleRequestClose(); return }
    if (e.key === 'ArrowLeft') { e.preventDefault(); onPrev?.(); return }
    if (e.key === 'ArrowRight') { e.preventDefault(); onNext?.(); return }
    if (e.key.toLowerCase() === 'z') { e.preventDefault(); toggleZoom(); return }
    if (e.key.toLowerCase() === 'l') { e.preventDefault(); setLabelOpen(v => !v); return }
    if (e.key.toLowerCase() === 's') { e.preventDefault(); setSoundOn(v => !v); return }
    if (e.key === '?' || (e.key === '/' && e.shiftKey)) { e.preventDefault(); setShowHelp(v => !v); return }
    if (e.key.toLowerCase() === 'f') { e.preventDefault(); toggleFullscreen(); return }
  }, [onPrev, onNext])

  useEffect(() => {
    if (!isOpen) return
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [isOpen, onKey])

  // Animate in/out and fullscreen state
  const handleRequestClose = useCallback(() => {
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

  // Auto-hide filmstrip after inactivity
  useEffect(() => {
    if (!isOpen) return
    setShowStrip(true)
    if (stripTimerRef.current) window.clearTimeout(stripTimerRef.current)
    stripTimerRef.current = window.setTimeout(() => setShowStrip(false), 1600)
    return () => {
      if (stripTimerRef.current) window.clearTimeout(stripTimerRef.current)
    }
  }, [isOpen])

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
  useEffect(() => {
    if (typeof window === 'undefined') return
    try {
      localStorage.setItem('ambientSoundOn', String(soundOn))
      localStorage.setItem('ambientVolume', String(volume))
    } catch {}
  }, [soundOn, volume])

  // Sync image src and add graceful fallback if optimized asset missing
  useEffect(() => {
    setCurrentSrc(src)
  }, [src])

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
        className="relative w-full h-full flex items-center justify-center p-4"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onClick={(e) => { if (e.target === e.currentTarget) handleRequestClose() }}
      >
        {/* Top-right controls */}
        <div className="absolute right-4 top-4 z-[101] flex gap-2">
          <button
            aria-label="Toggle wall label panel"
            className={`px-2.5 py-2 rounded border text-sm focus:outline-none focus:ring-2 ${labelOpen ? 'bg-[#D4AF37] text-black border-[#D4AF37]' : 'border-[#D4AF37]/70 text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black focus:ring-[#D4AF37]/70'}`}
            onClick={() => setLabelOpen(v => !v)}
            aria-pressed={labelOpen}
            title="Wall label"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M4 7h16v10H4z" />
              <path d="M6 9h8v2H6z" className="opacity-70" />
            </svg>
            <span className="sr-only">Wall label</span>
          </button>
          <button
            aria-label="Toggle ambient sound"
            className={`px-2.5 py-2 rounded border text-sm focus:outline-none focus:ring-2 ${soundOn ? 'bg-[#D4AF37] text-black border-[#D4AF37]' : 'border-[#D4AF37]/70 text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black focus:ring-[#D4AF37]/70'}`}
            onClick={() => setSoundOn(v => !v)}
            aria-pressed={soundOn}
            title="Sound"
          >
            {soundOn ? (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M3 10v4h4l5 4V6L7 10H3z" />
                <path d="M16 7a5 5 0 0 1 0 10" className="opacity-80" />
              </svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M3 10v4h4l5 4V6L7 10H3z" />
                <path d="M19 5L5 19" stroke="currentColor" strokeWidth="2" />
              </svg>
            )}
            <span className="sr-only">Sound</span>
          </button>
          <label className="flex items-center gap-2 rounded border border-[#D4AF37]/70 text-[#D4AF37] bg-black/30 px-2 py-1 text-xs">
            <span aria-hidden="true">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M3 10v4h4l5 4V6L7 10H3z"/></svg>
            </span>
            <input
              type="range"
              min={0}
              max={1}
              step={0.01}
              value={volume}
              onChange={(e) => setVolume(parseFloat(e.currentTarget.value))}
              className="w-28 accent-[#D4AF37]"
              aria-label="Ambient volume"
            />
          </label>
          <button
            aria-label="Toggle zoom"
            className={`px-2.5 py-2 rounded border text-sm focus:outline-none focus:ring-2 ${zoom>1 ? 'bg-[#D4AF37] text-black border-[#D4AF37]' : 'border-[#D4AF37]/70 text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black focus:ring-[#D4AF37]/70'}`}
            onClick={toggleZoom}
            title="Zoom"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M10 4a6 6 0 1 1 0 12 6 6 0 0 1 0-12zm0-2a8 8 0 1 0 5.293 14.293l4.707 4.707 1.414-1.414-4.707-4.707A8 8 0 0 0 10 2z"/></svg>
            <span className="sr-only">Zoom</span>
          </button>
          <button
            aria-label="Toggle fullscreen"
            className={`px-2.5 py-2 rounded border text-sm focus:outline-none focus:ring-2 ${isFs ? 'bg-[#D4AF37] text-black border-[#D4AF37]' : 'border-[#D4AF37]/70 text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black focus:ring-[#D4AF37]/70'}`}
            onClick={toggleFullscreen}
            title="Fullscreen"
          >
            {isFs ? (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M9 9H5V5h4V3H3v6h6zM15 3v2h4v4h2V3h-6zM21 15h-2v4h-4v2h6v-6zM3 15v6h6v-2H5v-4H3z"/></svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M9 7H5v4H3V5h6v2zM21 5v6h-2V7h-4V5h6zM3 19v-6h2v4h4v2H3zM15 21v-2h4v-4h2v6h-6z"/></svg>
            )}
            <span className="sr-only">Fullscreen</span>
          </button>
          <button
            aria-label="Keyboard shortcuts"
            className={`px-2.5 py-2 rounded border text-sm focus:outline-none focus:ring-2 ${showHelp ? 'bg-[#D4AF37] text-black border-[#D4AF37]' : 'border-[#D4AF37]/70 text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black focus:ring-[#D4AF37]/70'}`}
            onClick={() => setShowHelp(v => !v)}
            title="Keyboard shortcuts"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><text x="7" y="17" fontSize="14" fontFamily="ui-sans-serif,system-ui">?</text></svg>
            <span className="sr-only">Help</span>
          </button>

          <button
            aria-label="Copy link to this image"
            className="px-2.5 py-2 rounded border border-[#D4AF37]/70 text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/70"
            onClick={handleShare}
            title="Share"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M14 9V5l7 7-7 7v-4H4V9z"/></svg>
            <span className="sr-only">Share</span>
          </button>
          <button
            aria-label="Close image"
            className="px-2.5 py-2 rounded border border-[#D4AF37]/70 text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/70"
            onClick={handleRequestClose}
            title="Close"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2"/></svg>
            <span className="sr-only">Close</span>
          </button>
        </div>

        {/* Prev/Next controls */}
        {onPrev && (
          <button
            aria-label="Previous image"
            className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-black/50 text-white p-3 hover:bg-black/70 focus:outline-none focus:ring-2 focus:ring-white/60"
            onClick={onPrev}
          >
            ‹
          </button>
        )}
        {onNext && (
          <button
            aria-label="Next image"
            className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-black/50 text-white p-3 hover:bg-black/70 focus:outline-none focus:ring-2 focus:ring-white/60"
            onClick={onNext}
          >
            ›
          </button>
        )}

        {/* Ambient audio (off by default) */}
        <audio
          ref={audioRef}
          src="/audio/ambient.mp3"
          loop
          preload="auto"
          onCanPlay={() => setCanPlay(true)}
          className="hidden"
        />

        {/* Image + optional wall label panel */}
        <figure className="relative max-w-[95vw] max-h-[85vh]">
          {/* TODO(preflight): add width/height with intrinsic image dimensions to reduce CLS */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={currentSrc}
            alt={alt}
            onDoubleClick={toggleZoom}
            onPointerDown={onImgPointerDown}
            onPointerMove={onImgPointerMove}
            onPointerUp={onImgPointerUp}
            onError={() => {
              const fallback = shareId ? `/images/gallery/${shareId}.jpg` : undefined
              if (fallback && currentSrc !== fallback) setCurrentSrc(fallback)
            }}
            style={{ transform: `translate(${tx}px, ${ty}px) scale(${zoom})`, cursor: zoom>1 ? 'grab' : 'auto' }}
            className="max-w-full max-h-[75vh] rounded-sm shadow-2xl transition-transform duration-300 will-change-transform"
          />
          {caption && (
            <div className="mt-4 flex flex-col items-center">
              <div className="w-12 h-px bg-[#D4AF37]/70 mb-2" />
              <figcaption className="text-center text-white/90 text-[13px] leading-snug tracking-wide font-light">
                {caption}
              </figcaption>
            </div>
          )}

          {labelOpen && (
            <aside className="hidden md:block absolute top-0 right-[-18rem] w-64 p-4 bg-black/70 text-white/85 rounded-sm border border-white/10">
              <div className="text-[11px] tracking-[0.06em] uppercase text-white/80">Wall Label</div>
              <div className="mt-2 text-sm leading-relaxed text-white/90">{caption || alt}</div>
            </aside>
          )}
        </figure>

        {/* Thumbnail filmstrip */}
        {items && items.length > 1 && typeof currentIndex === 'number' && (
          <div className={cn("absolute bottom-4 left-1/2 -translate-x-1/2 z-[102] bg-black/40 backdrop-blur-sm rounded px-3 py-2 border border-white/10 transition-opacity duration-300", showStrip ? "opacity-100" : "opacity-0")}>
            <div className="flex gap-2 overflow-x-auto max-w-[90vw] pr-1">
              {items.map((it, i) => {
                const active = i === currentIndex
                const base = it.src.replace(/^.*\/([^\/]+)\.(jpg|jpeg|png|webp)$/i, '$1')
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
                <li><b>Z</b> — Zoom</li>
                <li><b>L</b> — Toggle Wall Label</li>
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


