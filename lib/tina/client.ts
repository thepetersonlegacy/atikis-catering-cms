// Tina CMS Client - Optimized implementation with advanced caching
import { client as generatedClient } from '../../tina/__generated__/client'
import { ExperimentalGetTinaClient, queries } from '../../tina/__generated__/types'
import { contentCache, buildCache } from '../cache/content-cache'

const isLocal = process.env.TINA_PUBLIC_IS_LOCAL === "true";
const isBuild = process.env.NODE_ENV === 'production' && process.env.NEXT_PHASE === 'phase-production-build'

// Use the generated Tina client with proper error handling
const baseClient = isLocal ? generatedClient : generatedClient
export const tinaClient = queries(baseClient)

// Choose appropriate cache based on context
const cache = isBuild ? buildCache : contentCache

async function getCachedContent<T>(key: string, fetcher: () => Promise<T>): Promise<T> {
  // Check cache first
  const cached = cache.get<T>(key)
  if (cached !== null) {
    return cached
  }

  try {
    const data = await fetcher()
    cache.set(key, data)
    return data
  } catch (error) {
    console.error(`Error fetching content for key ${key}:`, error)
    throw error
  }
}

// Helper functions for fetching content with caching
export async function getSiteSettings() {
  return getCachedContent('siteSettings', async () => {
    try {
      const response = await tinaClient.siteSettings({
        relativePath: "site.json",
      });
      return response.data.siteSettings;
    } catch (error) {
      console.error("Error fetching site settings:", error);
      return null;
    }
  })
}

export async function getMenuItems() {
  return getCachedContent('menuItems', async () => {
    try {
      const response = await tinaClient.menuItemsConnection();
      return (response.data.menuItemsConnection.edges as any[])?.map((edge: any) => edge?.node) || [];
    } catch (error) {
      console.error("Error fetching menu items:", error);
      return [];
    }
  })
}

export async function getTestimonials() {
  return getCachedContent('testimonials', async () => {
    try {
      const response = await tinaClient.testimonialsConnection();
      return (response.data.testimonialsConnection.edges as any[])?.map((edge: any) => edge?.node) || [];
    } catch (error) {
      console.error("Error fetching testimonials:", error);
      return [];
    }
  })
}

export async function getGalleryImages() {
  return getCachedContent('galleryImages', async () => {
    try {
      const response = await tinaClient.galleryImagesConnection();
      return (response.data.galleryImagesConnection.edges as any[])?.map((edge: any) => edge?.node) || [];
    } catch (error) {
      console.error("Error fetching gallery images:", error);
      return [];
    }
  })
}

export async function getTranslations(language: string = "en") {
  return getCachedContent(`translations-${language}`, async () => {
    try {
      const response = await tinaClient.translations({
        relativePath: `${language}.json`,
      });
      return response.data.translations;
    } catch (error) {
      console.error(`Error fetching translations for ${language}:`, error);
      return null;
    }
  })
}
