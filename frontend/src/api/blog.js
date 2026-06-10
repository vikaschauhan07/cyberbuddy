const API_BASE = import.meta.env.VITE_API_BASE || '/api/v1'

async function parseResponse(res) {
  const payload = await res.json().catch(() => ({}))
  if (!res.ok) {
    const message = payload.message || payload.msg || `Request failed (${res.status})`
    const err = new Error(message)
    err.status = res.status
    err.payload = payload
    throw err
  }
  return payload
}

export function normalizeBlogPost(raw) {
  if (!raw) return null

  const author = raw.author || {}
  const name = author.name || 'Anonymous'
  const initials =
    author.initials ||
    name
      .trim()
      .split(/\s+/)
      .filter(Boolean)
      .map((part) => part[0])
      .join('')
      .slice(0, 2)
      .toUpperCase() ||
    'A'

  return {
    id: raw.id || raw._id,
    slug: raw.slug,
    title: raw.title,
    excerpt: raw.excerpt,
    category: raw.category,
    cover: raw.cover || { emoji: '📝', class: 'user' },
    date: raw.date,
    readTime: raw.readTime || '5 min read',
    difficulty: raw.difficulty || undefined,
    author: {
      name,
      role: author.role || 'Contributor',
      initials,
    },
    tags: Array.isArray(raw.tags) ? raw.tags : [],
    body: Array.isArray(raw.body) ? raw.body : [],
    isUserCreated: Boolean(raw.isUserCreated),
    createdAt: raw.createdAt,
  }
}

export async function createBlogPost(post) {
  const res = await fetch(`${API_BASE}/blogs`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(post),
  })
  const payload = await parseResponse(res)
  return normalizeBlogPost(payload.data)
}

export async function fetchBlogPosts() {
  const res = await fetch(`${API_BASE}/blogs`)
  const payload = await parseResponse(res)
  const posts = Array.isArray(payload.data) ? payload.data : []
  return posts.map(normalizeBlogPost).filter(Boolean)
}

export async function fetchBlogPostBySlug(slug) {
  const res = await fetch(`${API_BASE}/blogs/${encodeURIComponent(slug)}`)
  const payload = await parseResponse(res)
  return normalizeBlogPost(payload.data)
}
