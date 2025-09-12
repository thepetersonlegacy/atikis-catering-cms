// Image optimization utilities for responsive images and performance

export interface ImageBreakpoint {
  width: number
  quality?: number
  format?: 'webp' | 'avif' | 'jpg' | 'png'
}

export interface OptimizedImageConfig {
  src: string
  alt: string
  breakpoints?: ImageBreakpoint[]
  aspectRatio?: number
  priority?: boolean
  loading?: 'lazy' | 'eager'
  quality?: number
}

// Standard breakpoints for responsive images
export const STANDARD_BREAKPOINTS: ImageBreakpoint[] = [
  { width: 320, quality: 70 },   // Mobile small
  { width: 640, quality: 75 },   // Mobile large
  { width: 768, quality: 80 },   // Tablet
  { width: 1024, quality: 85 },  // Desktop small
  { width: 1280, quality: 85 },  // Desktop medium
  { width: 1920, quality: 90 },  // Desktop large
]

// Generate srcset string for responsive images
export const generateSrcSet = (src: string, breakpoints: ImageBreakpoint[] = STANDARD_BREAKPOINTS): string => {
  return breakpoints
    .map(bp => `${getOptimizedImageUrl(src, bp.width, bp.quality)} ${bp.width}w`)
    .join(', ')
}

// Generate sizes attribute for responsive images
export const generateSizes = (breakpoints?: { breakpoint: string; size: string }[]): string => {
  if (breakpoints) {
    return breakpoints
      .map(bp => `(${bp.breakpoint}) ${bp.size}`)
      .join(', ')
  }
  
  // Default responsive sizes
  return "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
}

// Get optimized image URL (placeholder for actual optimization service)
export const getOptimizedImageUrl = (
  src: string, 
  width?: number, 
  quality?: number,
  format?: string
): string => {
  // In a real implementation, this would integrate with an image optimization service
  // like Cloudinary, ImageKit, or Next.js Image Optimization API
  
  const params = new URLSearchParams()
  if (width) params.set('w', width.toString())
  if (quality) params.set('q', quality.toString())
  if (format) params.set('f', format)
  
  const queryString = params.toString()
  return queryString ? `${src}?${queryString}` : src
}

// Generate blur placeholder for better loading experience
export const generateBlurDataURL = (width: number = 10, height: number = 10): string => {
  const canvas = typeof window !== 'undefined' ? document.createElement('canvas') : null
  if (!canvas) return ''
  
  canvas.width = width
  canvas.height = height
  const ctx = canvas.getContext('2d')
  if (!ctx) return ''
  
  // Create a simple gradient blur placeholder
  const gradient = ctx.createLinearGradient(0, 0, width, height)
  gradient.addColorStop(0, '#f3f4f6')
  gradient.addColorStop(1, '#e5e7eb')
  
  ctx.fillStyle = gradient
  ctx.fillRect(0, 0, width, height)
  
  return canvas.toDataURL()
}

// Color palette extraction and consistency utilities
export const BRAND_COLORS = {
  primary: '#D4AF37',      // Gold
  primaryDark: '#B69121',  // Dark Gold
  secondary: '#000000',    // Black
  accent: '#FFFFFF',       // White
  neutral: {
    50: '#f9fafb',
    100: '#f3f4f6',
    200: '#e5e7eb',
    300: '#d1d5db',
    400: '#9ca3af',
    500: '#6b7280',
    600: '#4b5563',
    700: '#374151',
    800: '#1f2937',
    900: '#111827',
  }
} as const

// Apply consistent color filters to images
export const getColorConsistentFilter = (imageType: 'hero' | 'food' | 'logo' | 'background'): string => {
  switch (imageType) {
    case 'hero':
      return 'brightness(0.8) contrast(1.1) saturate(1.2)'
    case 'food':
      return 'brightness(1.05) contrast(1.1) saturate(1.3) hue-rotate(-5deg)'
    case 'logo':
      return 'brightness(1) contrast(1) saturate(1)'
    case 'background':
      return 'brightness(0.7) contrast(1.2) saturate(0.9)'
    default:
      return 'none'
  }
}

// Lazy loading intersection observer options
export const LAZY_LOADING_OPTIONS: IntersectionObserverInit = {
  root: null,
  rootMargin: '50px',
  threshold: 0.1
}

// Performance monitoring for images
export const trackImagePerformance = (src: string, loadTime: number) => {
  if (typeof window !== 'undefined' && 'performance' in window) {
    // Track image loading performance
    performance.mark(`image-load-${src}`)
    
    // Log slow loading images
    if (loadTime > 2000) {
      console.warn(`Slow image loading detected: ${src} took ${loadTime}ms`)
    }
  }
}
