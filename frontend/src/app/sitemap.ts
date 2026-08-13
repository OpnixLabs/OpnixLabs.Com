import { MetadataRoute } from 'next';
import { getPosts } from '@/lib/api';
import { getAllCaseStudySlugs } from '@/data/caseStudies';
import { popularTechnologies } from '@/data/technologies';

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://opnixlabs.com';

  // Base static routes
  const routes = [
    '',
    '/services',
    '/portfolio',
    '/technologies',
    '/case-studies',
    '/case-studies/blackboard',
    '/about',
    '/blog',
    '/contact',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: (route === '' ? 'daily' : 'weekly') as 'daily' | 'weekly',
    priority: route === '' || route.startsWith('/case-studies') || route === '/technologies' ? 0.9 : 0.8,
  }));

  // Dynamic Case Studies routes
  const caseStudySlugs = getAllCaseStudySlugs();
  const caseStudyRoutes = caseStudySlugs.map((slug) => ({
    url: `${baseUrl}/case-studies/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.85,
  }));

  // Dynamic Technology Landing Page routes for SEO
  const techRoutes = popularTechnologies.map((t) => ({
    url: `${baseUrl}/technologies/${t.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.85,
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
    return [...routes, ...caseStudyRoutes, ...techRoutes, ...blogRoutes];
  } catch (error) {
    console.warn('Failed to fetch blog posts for sitemap generation:', error);
    return [...routes, ...caseStudyRoutes, ...techRoutes];
  }
}
