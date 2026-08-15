import { CaseStudyData, caseStudies as fallbackCaseStudies } from '@/data/caseStudies';

export interface Post {
  id: number;
  title: string;
  slug: string;
  content_html: string;
  created_at: string;
}

export interface CreatePostPayload {
  title: string;
  content_html: string;
}

const getApiBaseUrl = () => {
  const envUrl = (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api').trim().replace(/\/+$/, '');
  return envUrl.endsWith('/api') ? envUrl : `${envUrl}/api`;
};

const API_BASE_URL = getApiBaseUrl();

/**
 * Fetch all posts from Go backend with ISR (revalidate: 60s)
 */
export async function getPosts(options?: RequestInit): Promise<Post[]> {
  try {
    const res = await fetch(`${API_BASE_URL}/posts`, {
      next: { revalidate: 60 },
      ...options,
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch posts: ${res.statusText}`);
    }

    return await res.json();
  } catch (error) {
    console.warn('Backend API unavailable, using fallback static data for posts:', error);
    return getFallbackPosts();
  }
}

/**
 * Fetch single post by slug from Go backend with ISR (revalidate: 60s)
 */
export async function getPostBySlug(slug: string, options?: RequestInit): Promise<Post | null> {
  try {
    const res = await fetch(`${API_BASE_URL}/posts/${slug}`, {
      next: { revalidate: 60 },
      ...options,
    });

    if (res.status === 404) {
      return null;
    }

    if (!res.ok) {
      throw new Error(`Failed to fetch post '${slug}': ${res.statusText}`);
    }

    return await res.json();
  } catch (error) {
    console.warn(`Backend API unavailable, using fallback lookup for post '${slug}':`, error);
    const fallback = getFallbackPosts().find((p) => p.slug === slug);
    return fallback || null;
  }
}

/**
 * Submit new post to Go backend
 */
export async function createPost(payload: CreatePostPayload): Promise<Post> {
  const res = await fetch(`${API_BASE_URL}/posts`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(errText || `Server error ${res.status}`);
  }

  return await res.json();
}

/**
 * CASE STUDIES API WITH ISR (Revalidation: 60 seconds)
 */
export async function getCaseStudies(options?: RequestInit): Promise<CaseStudyData[]> {
  try {
    const res = await fetch(`${API_BASE_URL}/case-studies`, {
      next: { revalidate: 60 },
      ...options,
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch case studies: ${res.statusText}`);
    }

    const data: CaseStudyData[] = await res.json();
    if (data && data.length > 0) {
      return data;
    }
    return fallbackCaseStudies;
  } catch (error) {
    console.warn('Backend API unavailable, using fallback static data for case studies:', error);
    return fallbackCaseStudies;
  }
}

export async function getCaseStudyBySlug(slug: string, options?: RequestInit): Promise<CaseStudyData | null> {
  try {
    const res = await fetch(`${API_BASE_URL}/case-studies/${slug}`, {
      next: { revalidate: 60 },
      ...options,
    });

    if (res.status === 404) {
      const fallback = fallbackCaseStudies.find((cs) => cs.slug.toLowerCase() === slug.toLowerCase());
      return fallback || null;
    }

    if (!res.ok) {
      throw new Error(`Failed to fetch case study '${slug}': ${res.statusText}`);
    }

    return await res.json();
  } catch (error) {
    console.warn(`Backend API unavailable, using fallback lookup for case study '${slug}':`, error);
    const fallback = fallbackCaseStudies.find((cs) => cs.slug.toLowerCase() === slug.toLowerCase());
    return fallback || null;
  }
}

export async function createCaseStudy(payload: CaseStudyData): Promise<CaseStudyData> {
  const res = await fetch(`${API_BASE_URL}/case-studies`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(errText || `Server error ${res.status}`);
  }

  return await res.json();
}

export async function updateCaseStudy(id: number, payload: CaseStudyData): Promise<CaseStudyData> {
  const res = await fetch(`${API_BASE_URL}/case-studies/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(errText || `Server error ${res.status}`);
  }

  return await res.json();
}

export async function deleteCaseStudy(id: number): Promise<void> {
  const res = await fetch(`${API_BASE_URL}/case-studies/${id}`, {
    method: 'DELETE',
  });

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(errText || `Server error ${res.status}`);
  }
}

export interface CreateLeadPayload {
  name: string;
  email: string;
  message: string;
  honeypot?: string;
  turnstileToken?: string;
}

export interface Lead {
  id: number;
  name: string;
  email: string;
  message: string;
  status: string;
  created_at: string;
}

/**
 * Submit new contact lead to Go backend & save locally
 */
export async function createLead(payload: CreateLeadPayload): Promise<Lead> {
  const newLead: Lead = {
    id: Date.now(),
    name: payload.name,
    email: payload.email,
    message: payload.message,
    status: 'new',
    created_at: new Date().toISOString(),
  };

  if (typeof window !== 'undefined') {
    try {
      const existing: Lead[] = JSON.parse(localStorage.getItem('opnixlabs_leads') || '[]');
      localStorage.setItem('opnixlabs_leads', JSON.stringify([newLead, ...existing]));
    } catch (err) {
      console.warn('Could not save lead to localStorage:', err);
    }
  }

  // Trigger Resend email delivery (auto-reply to user & notification to admin)
  try {
    await fetch('/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });
  } catch (emailErr) {
    console.warn('Contact email dispatch warning:', emailErr);
  }

  try {
    const res = await fetch(`${API_BASE_URL}/leads`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      return await res.json();
    }
  } catch (error) {
    console.warn('Backend API unavailable, lead saved to local storage:', error);
  }

  return newLead;
}

function getFallbackPosts(): Post[] {
  return [
    {
      id: 1,
      title: 'Architecting High-Performance Full-Stack Applications with Go & Next.js',
      slug: 'architecting-high-performance-full-stack-applications-with-go-nextjs-1700000001',
      content_html: `
        <h2>The Power of Combining Go and Next.js</h2>
        <p>Building modern web applications requires a balance between rapid frontend execution and ultra-fast backend throughput. By pairing <strong>Next.js (App Router)</strong> with a lightweight <strong>Go API microservice</strong>, developers achieve unmatched performance and scalability.</p>
        <h3>Key Architectural Highlights</h3>
        <ul>
          <li><strong>Go Backend:</strong> Sub-millisecond latency for RESTful JSON responses and background scheduled jobs.</li>
          <li><strong>Neon PostgreSQL:</strong> Serverless SQL database scaling compute and storage independently.</li>
          <li><strong>Drizzle ORM:</strong> Type-safe database migrations and queries in TypeScript.</li>
        </ul>
        <p>Stay tuned for deeper technical deep-dives into our automated AI blogging workflows!</p>
      `,
      created_at: new Date().toISOString(),
    },
  ];
}
