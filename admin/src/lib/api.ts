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

export interface Lead {
  id: number;
  name: string;
  email: string;
  message: string;
  status: string;
  created_at: string;
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api';

/**
 * Fetch all posts from Go backend
 */
export async function getPosts(): Promise<Post[]> {
  try {
    const res = await fetch(`${API_BASE_URL}/posts`, { cache: 'no-store' });
    if (!res.ok) throw new Error(`Failed to fetch posts: ${res.statusText}`);
    return await res.json();
  } catch (error) {
    console.warn('Backend API unavailable, using fallback posts:', error);
    return [
      {
        id: 1,
        title: 'Architecting High-Performance Full-Stack Applications with Go & Next.js',
        slug: 'architecting-high-performance-full-stack-applications-with-go-nextjs-1700000001',
        content_html: '<p>Sample blog post content.</p>',
        created_at: new Date().toISOString(),
      },
    ];
  }
}

/**
 * Submit new post to Go backend
 */
export async function createPost(payload: CreatePostPayload): Promise<Post> {
  const res = await fetch(`${API_BASE_URL}/posts`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(errText || `Server error ${res.status}`);
  }

  return await res.json();
}

/**
 * Trigger Gemini AI Auto-Blogging Cron Job
 */
export async function triggerGeminiCron(): Promise<{ message: string }> {
  const res = await fetch(`${API_BASE_URL}/admin/trigger-cron`, {
    method: 'POST',
  });

  if (!res.ok) {
    throw new Error(`Cron trigger failed: ${res.statusText}`);
  }

  return await res.json();
}

/**
 * Fetch all leads from Go backend
 */
export async function getLeads(): Promise<Lead[]> {
  try {
    const res = await fetch(`${API_BASE_URL}/leads`, { cache: 'no-store' });
    if (!res.ok) throw new Error(`Failed to fetch leads: ${res.statusText}`);
    return await res.json();
  } catch (error) {
    console.warn('Backend API unavailable, returning empty leads array:', error);
    return [
      {
        id: 1,
        name: 'Sarah Connor',
        email: 'sarah@cyberdyne.io',
        message: 'We want to build a Go microservice architecture for our AI engine.',
        status: 'new',
        created_at: new Date().toISOString(),
      },
    ];
  }
}

/**
 * Delete lead by ID
 */
export async function deleteLead(id: number): Promise<void> {
  const res = await fetch(`${API_BASE_URL}/leads/${id}`, {
    method: 'DELETE',
  });

  if (!res.ok) {
    throw new Error(`Failed to delete lead: ${res.statusText}`);
  }
}
