import { MetadataRoute } from 'next';
import { getPosts } from '@/lib/api';

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://opnixlabs.com';

  // Base static routes
  const routes = [
    '',
    '/services',
    '/portfolio',
    '/about',
    '/blog',
    '/contact',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: (route === '' ? 'daily' : 'weekly') as 'daily' | 'weekly',
    priority: route === '' ? 1.0 : 0.8,
  }));

  // Fetch dynamic blog posts
  try {
    const posts = await getPosts({ next: { revalidate: 3600 } });
    const blogRoutes = posts.map((post) => ({
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: new Date(post.created_at),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    }));
    return [...routes, ...blogRoutes];
  } catch (error) {
    console.warn('Failed to fetch blog posts for sitemap generation:', error);
    return routes;
  }
}
