export function getSiteUrl(): string {
  // Prefer env; fallback to known production URL
  const envUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (envUrl) return envUrl.replace(/\/$/, '');
  return 'https://atkins-catering.netlify.app';
}

export function getSitemapUrl(): string {
  return `${getSiteUrl()}/sitemap.xml`;
}

