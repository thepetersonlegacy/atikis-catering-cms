// Content caching system for Tina CMS
import fs from 'fs'
import path from 'path'

export interface CacheEntry<T = any> {
  data: T
  timestamp: number
  etag?: string
}

export interface CacheConfig {
  ttl: number // Time to live in milliseconds
  maxSize: number // Maximum number of entries
  persistToDisk: boolean // Whether to persist cache to disk
}

const DEFAULT_CONFIG: CacheConfig = {
  ttl: 5 * 60 * 1000, // 5 minutes
  maxSize: 100,
  persistToDisk: true
}

export class ContentCache {
  private cache = new Map<string, CacheEntry>()
  private config: CacheConfig
  private cacheDir: string

  constructor(config: Partial<CacheConfig> = {}) {
    this.config = { ...DEFAULT_CONFIG, ...config }
    this.cacheDir = path.join(process.cwd(), '.cache', 'tina-content')
    
    if (this.config.persistToDisk) {
      this.ensureCacheDir()
      this.loadFromDisk()
    }
  }

  private ensureCacheDir() {
    if (!fs.existsSync(this.cacheDir)) {
      fs.mkdirSync(this.cacheDir, { recursive: true })
    }
  }

  private getCacheFilePath(key: string): string {
    const safeKey = key.replace(/[^a-zA-Z0-9-_]/g, '_')
    return path.join(this.cacheDir, `${safeKey}.json`)
  }

  private loadFromDisk() {
    try {
      if (!fs.existsSync(this.cacheDir)) return

      const files = fs.readdirSync(this.cacheDir)
      for (const file of files) {
        if (!file.endsWith('.json')) continue
        
        const filePath = path.join(this.cacheDir, file)
        const content = fs.readFileSync(filePath, 'utf-8')
        const entry: CacheEntry = JSON.parse(content)
        
        // Check if entry is still valid
        if (this.isValid(entry)) {
          const key = file.replace('.json', '').replace(/_/g, '/')
          this.cache.set(key, entry)
        } else {
          // Remove expired cache file
          fs.unlinkSync(filePath)
        }
      }
    } catch (error) {
      console.warn('Failed to load cache from disk:', error)
    }
  }

  private saveToDisk(key: string, entry: CacheEntry) {
    if (!this.config.persistToDisk) return

    try {
      const filePath = this.getCacheFilePath(key)
      fs.writeFileSync(filePath, JSON.stringify(entry, null, 2))
    } catch (error) {
      console.warn('Failed to save cache to disk:', error)
    }
  }

  private isValid(entry: CacheEntry): boolean {
    const now = Date.now()
    return (now - entry.timestamp) < this.config.ttl
  }

  private evictOldest() {
    if (this.cache.size <= this.config.maxSize) return

    let oldestKey = ''
    let oldestTime = Date.now()

    this.cache.forEach((entry, key) => {
      if (entry.timestamp < oldestTime) {
        oldestTime = entry.timestamp
        oldestKey = key
      }
    })

    if (oldestKey) {
      this.cache.delete(oldestKey)
      if (this.config.persistToDisk) {
        try {
          const filePath = this.getCacheFilePath(oldestKey)
          if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath)
          }
        } catch (error) {
          console.warn('Failed to remove cache file:', error)
        }
      }
    }
  }

  get<T>(key: string): T | null {
    const entry = this.cache.get(key)
    if (!entry) return null

    if (!this.isValid(entry)) {
      this.cache.delete(key)
      return null
    }

    return entry.data as T
  }

  set<T>(key: string, data: T, etag?: string): void {
    const entry: CacheEntry<T> = {
      data,
      timestamp: Date.now(),
      etag
    }

    this.evictOldest()
    this.cache.set(key, entry)
    this.saveToDisk(key, entry)
  }

  has(key: string): boolean {
    const entry = this.cache.get(key)
    return entry ? this.isValid(entry) : false
  }

  delete(key: string): boolean {
    const deleted = this.cache.delete(key)
    
    if (deleted && this.config.persistToDisk) {
      try {
        const filePath = this.getCacheFilePath(key)
        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath)
        }
      } catch (error) {
        console.warn('Failed to remove cache file:', error)
      }
    }

    return deleted
  }

  clear(): void {
    this.cache.clear()
    
    if (this.config.persistToDisk) {
      try {
        if (fs.existsSync(this.cacheDir)) {
          const files = fs.readdirSync(this.cacheDir)
          for (const file of files) {
            fs.unlinkSync(path.join(this.cacheDir, file))
          }
        }
      } catch (error) {
        console.warn('Failed to clear cache directory:', error)
      }
    }
  }

  size(): number {
    return this.cache.size
  }

  // Get cache statistics
  getStats() {
    const now = Date.now()
    let validEntries = 0
    let expiredEntries = 0

    this.cache.forEach((entry) => {
      if (this.isValid(entry)) {
        validEntries++
      } else {
        expiredEntries++
      }
    })

    return {
      totalEntries: this.cache.size,
      validEntries,
      expiredEntries,
      maxSize: this.config.maxSize,
      ttl: this.config.ttl,
      persistToDisk: this.config.persistToDisk
    }
  }
}

// Global cache instance
export const contentCache = new ContentCache({
  ttl: 10 * 60 * 1000, // 10 minutes for production
  maxSize: 200,
  persistToDisk: true
})

// Build-time cache for static generation
export const buildCache = new ContentCache({
  ttl: 24 * 60 * 60 * 1000, // 24 hours for build cache
  maxSize: 500,
  persistToDisk: true
})
