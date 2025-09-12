import { MetadataRoute } from 'next'
import { getSitemapUrl } from '@/lib/utils/site'


export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/admin/'],
    },
    sitemap: getSitemapUrl(),
  }
}