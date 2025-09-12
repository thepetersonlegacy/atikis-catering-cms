"use client"

import { useState, useCallback } from 'react'
import Image from 'next/image'
import { cn } from '@/lib/utils'

interface OptimizedImageProps {
  src: string
  alt: string
  width?: number
  height?: number
  fill?: boolean
  className?: string
  priority?: boolean
  quality?: number
  sizes?: string
  loading?: 'lazy' | 'eager'
  placeholder?: 'blur' | 'empty'
  blurDataURL?: string
  onLoad?: () => void
  onError?: () => void
  responsive?: boolean
  aspectRatio?: 'square' | '16/9' | '4/3' | '3/2' | 'auto'
}

const OptimizedImage = ({
  src,
  alt,
  width,
  height,
  fill = false,
  className,
  priority = false,
  quality = 75,
  sizes,
  loading = 'lazy',
  placeholder = 'empty',
  blurDataURL,
  onLoad,
  onError,
  responsive = true,
  aspectRatio = 'auto',
  ...props
}: OptimizedImageProps) => {
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

  // Generate responsive sizes if not provided
  const responsiveSizes = sizes || (responsive ? 
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
    'transition-opacity duration-300',
    isLoading && 'opacity-0',
    !isLoading && 'opacity-100',
    hasError && 'opacity-50'
  )

  if (hasError) {
    return (
      <div className={cn(containerClasses, 'bg-gray-200 flex items-center justify-center')}>
        <span className="text-gray-500 text-sm">Failed to load image</span>
      </div>
    )
  }

  return (
    <div className={fill ? 'relative' : containerClasses}>
      <Image
        src={src}
        alt={alt}
        width={fill ? undefined : width}
        height={fill ? undefined : height}
        fill={fill}
        className={fill ? cn(imageClasses, className) : imageClasses}
        priority={priority}
        quality={quality}
        sizes={responsiveSizes}
        loading={loading}
        placeholder={placeholder}
        blurDataURL={blurDataURL}
        onLoad={handleLoad}
        onError={handleError}
        {...props}
      />
      {isLoading && (
        <div className={cn(
          'absolute inset-0 bg-gray-200 animate-pulse',
          fill ? '' : 'rounded'
        )} />
      )}
    </div>
  )
}

export default OptimizedImage
