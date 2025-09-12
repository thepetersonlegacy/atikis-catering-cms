"use client"

import { useState, useCallback } from 'react'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import { getColorConsistentFilter } from '@/lib/utils/imageOptimization'

interface ResponsiveImageProps {
  src: string
  alt: string
  width?: number
  height?: number
  fill?: boolean
  className?: string
  priority?: boolean
  loading?: 'lazy' | 'eager'
  aspectRatio?: 'square' | '16/9' | '4/3' | '3/2' | 'auto'
  imageType?: 'hero' | 'food' | 'logo' | 'background'
  quality?: number
  sizes?: string
  onLoad?: () => void
  onError?: () => void
  disableLoadFade?: boolean
}

const ResponsiveImage = ({
  src,
  alt,
  width,
  height,
  fill = false,
  className,
  priority = false,
  loading = 'lazy',
  aspectRatio = 'auto',
  imageType = 'food',
  quality = 75,
  sizes,
  onLoad,
  onError,
  disableLoadFade,
  ...props
}: ResponsiveImageProps) => {
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)

  const handleLoad = useCallback(() => {
    setIsLoading(false)
    onLoad?.()
  }, [onLoad])

  const handleError = useCallback(() => {
    setIsLoading(false)
    setHasError(true)
    onError?.()
  }, [onError])

  // Generate responsive image sources
  const getResponsiveSrc = (baseSrc: string) => {
    // Check if we have optimized versions
    const baseName = baseSrc.replace(/^\//, '').replace(/\.(jpg|jpeg|png)$/i, '')
    
    // For optimized images, use responsive versions
    if (baseName.includes('Plane_') || baseName.match(/^\d+$/) || baseName.includes('Untitled design')) {
      return {
        mobile: `/optimized/${baseName}_mobile.jpg`,
        tablet: `/optimized/${baseName}_tablet.jpg`,
        desktop: `/optimized/${baseName}_desktop.jpg`,
        fallback: baseSrc
      }
    }
    
    return { fallback: baseSrc }
  }

  const responsiveSources = getResponsiveSrc(src)

  // Generate srcSet for responsive images
  const srcSet = responsiveSources.mobile ? 
    `${responsiveSources.mobile} 640w, ${responsiveSources.tablet} 1024w, ${responsiveSources.desktop} 1920w` :
    undefined

  // Generate sizes attribute
  const responsiveSizes = sizes || (srcSet ? 
    "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" : 
    undefined
  )

  // Aspect ratio classes
  const aspectRatioClasses = {
    'square': 'aspect-square',
    '16/9': 'aspect-video',
    '4/3': 'aspect-[4/3]',
    '3/2': 'aspect-[3/2]',
    'auto': ''
  }

  const containerClasses = cn(
    'relative overflow-hidden',
    aspectRatio !== 'auto' && aspectRatioClasses[aspectRatio],
    className
  )

  const imageClasses = cn(
    disableLoadFade ? '' : 'transition-all duration-300',
    disableLoadFade ? '' : (isLoading ? 'opacity-0 scale-105' : 'opacity-100 scale-100'),
    hasError && 'opacity-50'
  )

  // Apply color-consistent filters
  const imageStyle = {
    filter: getColorConsistentFilter(imageType)
  }

  if (hasError) {
    return (
      <div className={cn(containerClasses, 'bg-gray-200 flex items-center justify-center')}>
        <span className="text-gray-500 text-sm">Failed to load image</span>
      </div>
    )
  }

  return (
    <div className={fill ? 'relative w-full h-full' : containerClasses}>
      <Image
        src={responsiveSources.desktop || responsiveSources.fallback}
        alt={alt}
        width={fill ? undefined : width}
        height={fill ? undefined : height}
        fill={fill}
        className={fill ? cn(imageClasses, className) : imageClasses}
        style={imageStyle}
        priority={priority}
        quality={quality}
        sizes={responsiveSizes}
        loading={loading}
        onLoad={handleLoad}
        onError={handleError}
        {...props}
      />
      {!disableLoadFade && isLoading && (
        <div className={cn(
          'absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300 animate-pulse',
          fill ? '' : 'rounded'
        )}>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
        </div>
      )}
    </div>
  )
}

export default ResponsiveImage
