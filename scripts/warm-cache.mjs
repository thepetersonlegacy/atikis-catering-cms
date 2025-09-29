#!/usr/bin/env node

/**
 * Cache warming script for build-time optimization
 * This script pre-loads and caches all Tina CMS content during the build process
 */

// For now, skip cache warming during build until TypeScript modules are properly configured
console.log('⚠️  Cache warming skipped - will be implemented after TypeScript module resolution is configured')
process.exit(0)

async function main() {
  console.log('🚀 Starting build-time cache warming...')
  
  try {
    // Set environment to indicate this is a build process
    process.env.NODE_ENV = 'production'
    process.env.NEXT_PHASE = 'phase-production-build'
    
    // Warm up the cache
    const result = await warmupCache()
    
    if (result.success) {
      console.log('✅ Cache warming completed successfully!')
      console.log(`   📦 Cached ${result.cached.length} content types`)
      console.log(`   ⏱️  Completed in ${result.duration}ms`)
    } else {
      console.error('❌ Cache warming completed with errors:')
      result.errors.forEach(error => console.error(`   - ${error}`))
      process.exit(1)
    }
    
    // Display cache health
    const health = getCacheHealth()
    console.log(`📊 Cache Health: ${health.status.toUpperCase()} (${health.healthScore}%)`)
    console.log(`   📈 ${health.validEntries} valid entries, ${health.expiredEntries} expired`)
    
  } catch (error) {
    console.error('💥 Cache warming failed:', error)
    process.exit(1)
  }
}

// Run the script
main().catch(error => {
  console.error('💥 Unexpected error:', error)
  process.exit(1)
})
