import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getPostBySlug } from '@/lib/api';
import { ArrowLeft, Calendar } from 'lucide-react';
import BlogImage from '@/components/BlogImage';

export const revalidate = 0;

interface PageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: PageProps) {
  const post = await getPostBySlug(params.slug);
  if (!post) {
    return {
      title: 'Article Not Found | OpnixLabs Blog',
      description: 'The requested technical blog post could not be found.',
    };
  }

  const plainExcerpt = post.content_html.replace(/<[^>]+>/g, ' ').substring(0, 155).trim();

  return {
    title: `${post.title} | OpnixLabs`,
    description: plainExcerpt,
    openGraph: {
      title: post.title,
      description: plainExcerpt,
      type: 'article',
      publishedTime: post.created_at,
    },
  };
}

const fallbackTechImages = [
  'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=1200&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1200&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=1200&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=1200&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1200&auto=format&fit=crop&q=80',
];

function processContentHtml(html: string, _postTitle: string): string {
  if (!html) return '';

  let imgIndex = 0;

  return html.replace(/<img\s+([^>]+)>/gi, (match, attributes) => {
    // If src is already present and points to a real URL (Cloudinary, Unsplash, etc.), keep it
    const existingSrcMatch = match.match(/src=["'](https?:\/\/[^"']+)["']/i);
    if (existingSrcMatch && existingSrcMatch[1]) {
      return `<img src="${existingSrcMatch[1]}" class="w-full h-auto rounded-md border border-slate-200 dark:border-slate-800 my-6 shadow-xl object-cover max-h-[500px]" ${attributes} />`;
    }

    // For any image placeholder without a src, use a curated fallback
    const fallbackUrl = fallbackTechImages[imgIndex % fallbackTechImages.length];
    imgIndex++;

    return `<img src="${fallbackUrl}" class="w-full h-auto rounded-md border border-slate-200 dark:border-slate-800 my-6 shadow-xl object-cover max-h-[500px]" ${attributes} />`;
  });
}

export default async function BlogPostDetailPage({ params }: PageProps) {
  const post = await getPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  const dateFormatted = new Date(post.created_at).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const processedHtml = processContentHtml(post.content_html, post.title);

  // Extract first image from HTML if exists, or use curated fallback
  const firstImageMatch = post.content_html.match(/<img[^>]+src=["'](https?:\/\/[^"']+)["']/i);
  const heroImageUrl = firstImageMatch && firstImageMatch[1]
    ? firstImageMatch[1]
    : fallbackTechImages[0];

  return (
    <article className="py-12 md:py-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
      {/* Back Button */}
      <div>
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-md bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-blue-500/40 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white text-xs font-medium transition-all"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Blog
        </Link>
      </div>

      {/* Article Header */}
      <header className="space-y-4 text-center border-b border-slate-200 dark:border-slate-800 pb-8">
        <div className="flex items-center justify-center gap-3">
          <span
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/30"
          >
            Technical Insight
          </span>
          <span className="text-slate-400">•</span>
          <span className="flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400 font-mono">
            <Calendar className="w-3.5 h-3.5" />
            {dateFormatted}
          </span>
        </div>

        <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white leading-tight">
          {post.title}
        </h1>
      </header>

      {/* Featured Header Banner Image with Error Fallback */}
      <div className="rounded-md overflow-hidden border border-slate-200 dark:border-slate-800 shadow-2xl h-64 sm:h-96 relative bg-slate-900">
        <BlogImage
          src={heroImageUrl}
          fallbackSrc={fallbackTechImages[0]}
          alt={post.title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Article Body Content */}
      <div className="glass-panel p-6 sm:p-10 rounded-md border border-slate-200 dark:border-slate-800">
        <div
          className="prose dark:prose-invert max-w-none text-slate-800 dark:text-slate-200"
          dangerouslySetInnerHTML={{ __html: processedHtml }}
        />
      </div>

      {/* Article Footer */}
      <div className="pt-6 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-400">
        <p>Published by OpnixLabs</p>
        <Link
          href="/blog"
          className="inline-flex items-center gap-1 text-blue-600 dark:text-blue-400 hover:underline font-semibold"
        >
          Explore More Tech Insights →
        </Link>
      </div>
    </article>
  );
}

