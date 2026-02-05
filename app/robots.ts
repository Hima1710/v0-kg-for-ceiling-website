import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://kgforceiling.com' // Replace with your actual domain

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/private/', '/admin/'], // Add any paths you want to disallow
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}
