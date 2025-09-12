"use client"

import { useEffect, useRef, useState, useCallback } from 'react'

interface UseLazyLoadingOptions {
  threshold?: number
  rootMargin?: string
  triggerOnce?: boolean
}

export const useLazyLoading = (options: UseLazyLoadingOptions = {}) => {
  const {
    threshold = 0.1,
    rootMargin = '50px',
    triggerOnce = true
  } = options

  const [isIntersecting, setIsIntersecting] = useState(false)
  const [hasTriggered, setHasTriggered] = useState(false)
  const elementRef = useRef<HTMLElement | null>(null)

  const setRef = useCallback((element: HTMLElement | null) => {
    elementRef.current = element
  }, [])

  useEffect(() => {
    const element = elementRef.current
    if (!element || (triggerOnce && hasTriggered)) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        const isVisible = entry.isIntersecting
        setIsIntersecting(isVisible)
        
        if (isVisible && triggerOnce) {
          setHasTriggered(true)
        }
      },
      {
        threshold,
        rootMargin,
      }
    )

    observer.observe(element)

    return () => {
      observer.unobserve(element)
    }
  }, [threshold, rootMargin, triggerOnce, hasTriggered])

  return {
    ref: setRef,
    isIntersecting: triggerOnce ? (hasTriggered || isIntersecting) : isIntersecting,
    hasTriggered
  }
}

// Hook for preloading images
export const useImagePreloader = (imageSources: string[]) => {
  const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set())
  const [isLoading, setIsLoading] = useState(false)

  const preloadImages = useCallback(async () => {
    if (imageSources.length === 0) return

    setIsLoading(true)
    const promises = imageSources.map((src) => {
      return new Promise<string>((resolve, reject) => {
        const img = new Image()
        img.onload = () => resolve(src)
        img.onerror = () => reject(src)
        img.src = src
      })
    })

    try {
      const loaded = await Promise.allSettled(promises)
      const successful = loaded
        .filter((result): result is PromiseFulfilledResult<string> => result.status === 'fulfilled')
        .map(result => result.value)
      
      setLoadedImages(new Set(successful))
    } catch (error) {
      console.warn('Some images failed to preload:', error)
    } finally {
      setIsLoading(false)
    }
  }, [imageSources])

  useEffect(() => {
    preloadImages()
  }, [preloadImages])

  return {
    loadedImages,
    isLoading,
    isImageLoaded: (src: string) => loadedImages.has(src)
  }
}

// Hook for progressive image loading
export const useProgressiveImage = (lowQualitySrc: string, highQualitySrc: string) => {
  const [currentSrc, setCurrentSrc] = useState(lowQualitySrc)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const img = new Image()
    img.onload = () => {
      setCurrentSrc(highQualitySrc)
      setIsLoading(false)
    }
    img.onerror = () => {
      setIsLoading(false)
    }
    img.src = highQualitySrc
  }, [highQualitySrc])

  return {
    src: currentSrc,
    isLoading
  }
}
