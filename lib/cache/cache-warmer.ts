// Cache warming utility for build-time optimization
import { getSiteSettings, getMenuItems, getTestimonials, getGalleryImages, getTranslations } from '../tina/client'
import { getMenuCategories } from '../content/menu'
import { buildCache } from './content-cache'

export interface WarmupResult {
  success: boolean
  cached: string[]
  errors: string[]
  duration: number
}

export async function warmupCache(): Promise<WarmupResult> {
  const startTime = Date.now()
  const cached: string[] = []
  const errors: string[] = []

  console.log('🔥 Starting cache warmup...')

  // List of content to warm up
  const warmupTasks = [
    {
      key: 'siteSettings',
      fetcher: () => getSiteSettings(),
      description: 'Site Settings'
    },
    {
      key: 'menuCategories',
      fetcher: () => getMenuCategories(),
      description: 'Menu Categories'
    },
    {
      key: 'menuItems',
      fetcher: () => getMenuItems(),
      description: 'Menu Items'
    },
    {
      key: 'testimonials',
      fetcher: () => getTestimonials(),
      description: 'Testimonials'
    },
    {
      key: 'galleryImages',
      fetcher: () => getGalleryImages(),
      description: 'Gallery Images'
    },
    {
      key: 'translations-en',
      fetcher: () => getTranslations('en'),
      description: 'English Translations'
    }
  ]

  // Execute warmup tasks in parallel for better performance
  const results = await Promise.allSettled(
    warmupTasks.map(async (task) => {
      try {
        console.log(`  📦 Warming up ${task.description}...`)
        const data = await task.fetcher()
        
        // Manually cache the data to ensure it's available
        buildCache.set(task.key, data)
        cached.push(task.key)
        
        console.log(`  ✅ ${task.description} cached successfully`)
        return { success: true, key: task.key }
      } catch (error) {
        const errorMsg = `Failed to warm up ${task.description}: ${error}`
        console.error(`  ❌ ${errorMsg}`)
        errors.push(errorMsg)
        return { success: false, key: task.key, error }
      }
    })
  )

  const duration = Date.now() - startTime
  const successCount = results.filter(r => r.status === 'fulfilled' && r.value.success).length
  
  console.log(`🎉 Cache warmup completed in ${duration}ms`)
  console.log(`   ✅ Successfully cached: ${successCount}/${warmupTasks.length} items`)
  
  if (errors.length > 0) {
    console.log(`   ❌ Errors: ${errors.length}`)
    errors.forEach(error => console.log(`      - ${error}`))
  }

  // Log cache statistics
  const stats = buildCache.getStats()
  console.log(`📊 Cache stats: ${stats.validEntries} valid entries, ${stats.expiredEntries} expired`)

  return {
    success: errors.length === 0,
    cached,
    errors,
    duration
  }
}

// Utility to preload critical content for a specific page
export async function preloadPageContent(page: string): Promise<void> {
  console.log(`🚀 Preloading content for page: ${page}`)

  switch (page) {
    case 'home':
      await Promise.all([
        getSiteSettings(),
        getTestimonials(),
        getTranslations('en')
      ])
      break
      
    case 'menu':
      await Promise.all([
        getMenuCategories(),
        getMenuItems(),
        getTranslations('en')
      ])
      break
      
    case 'testimonials':
      await Promise.all([
        getTestimonials(),
        getTranslations('en')
      ])
      break
      
    case 'gallery':
      await Promise.all([
        getGalleryImages(),
        getTranslations('en')
      ])
      break
      
    default:
      await getTranslations('en')
  }
}

// Cache invalidation utility
export function invalidateCache(keys?: string[]): void {
  if (keys) {
    keys.forEach(key => {
      buildCache.delete(key)
      console.log(`🗑️  Invalidated cache for: ${key}`)
    })
  } else {
    buildCache.clear()
    console.log('🗑️  Cleared entire cache')
  }
}

// Cache health check
export function getCacheHealth() {
  const stats = buildCache.getStats()
  const healthScore = stats.validEntries / (stats.validEntries + stats.expiredEntries) * 100
  
  return {
    ...stats,
    healthScore: isNaN(healthScore) ? 100 : Math.round(healthScore),
    status: healthScore > 80 ? 'healthy' : healthScore > 50 ? 'warning' : 'critical'
  }
}

// Export cache instance for direct access if needed
export { buildCache as cache }
