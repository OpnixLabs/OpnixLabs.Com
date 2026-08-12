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

const getApiBaseUrl = () => {
  const envUrl = (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api').trim().replace(/\/+$/, '');
  return envUrl.endsWith('/api') ? envUrl : `${envUrl}/api`;
};

const API_BASE_URL = getApiBaseUrl();

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
 * Fetch all leads from Go backend & localStorage
 */
export async function getLeads(): Promise<Lead[]> {
  let localLeads: Lead[] = [];
  if (typeof window !== 'undefined') {
    try {
      localLeads = JSON.parse(localStorage.getItem('opnixlabs_leads') || '[]');
    } catch (e) {
      console.warn('Could not read local leads:', e);
    }
  }

  let remoteLeads: Lead[] = [];
  try {
    const res = await fetch(`${API_BASE_URL}/leads`, { cache: 'no-store' });
    if (res.ok) {
      remoteLeads = await res.json();
    }
  } catch (error) {
    console.warn('Backend API unavailable, fetching local leads:', error);
  }

  const combinedMap = new Map<number, Lead>();
  remoteLeads.forEach((l) => combinedMap.set(l.id, l));
  localLeads.forEach((l) => {
    if (!combinedMap.has(l.id)) combinedMap.set(l.id, l);
  });

  const merged = Array.from(combinedMap.values());
  if (merged.length > 0) {
    return merged.sort(
      (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );
  }

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

/**
 * Delete lead by ID
 */
export async function deleteLead(id: number): Promise<void> {
  if (typeof window !== 'undefined') {
    try {
      const existing: Lead[] = JSON.parse(localStorage.getItem('opnixlabs_leads') || '[]');
      const filtered = existing.filter((l) => l.id !== id);
      localStorage.setItem('opnixlabs_leads', JSON.stringify(filtered));
    } catch (e) {
      console.warn('Could not delete from local leads:', e);
    }
  }

  const res = await fetch(`${API_BASE_URL}/leads/${id}`, {
    method: 'DELETE',
  });

  if (!res.ok) {
    const errorText = await res.text().catch(() => '');
    throw new Error(`Backend API error (${res.status} ${res.statusText}): ${errorText || 'Failed to delete lead from backend database'}`);
  }
}

/**
 * Update lead status by ID
 */
export async function updateLeadStatus(id: number, status: string): Promise<void> {
  if (typeof window !== 'undefined') {
    try {
      const existing: Lead[] = JSON.parse(localStorage.getItem('opnixlabs_leads') || '[]');
      const updated = existing.map((l) => (l.id === id ? { ...l, status } : l));
      localStorage.setItem('opnixlabs_leads', JSON.stringify(updated));
    } catch (e) {
      console.warn('Could not update status in local leads:', e);
    }
  }

  const res = await fetch(`${API_BASE_URL}/leads/${id}/status`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ status }),
  });

  if (!res.ok) {
    const errorText = await res.text().catch(() => '');
    throw new Error(`Backend API error (${res.status} ${res.statusText}): ${errorText || 'Failed to update lead status in backend database'}`);
  }
}
