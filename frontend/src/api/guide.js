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

export function normalizeGuide(raw) {
  if (!raw) return null

  const author = raw.author || {}
  const readTime = Number(raw.readTime) || 10

  return {
    id: raw.id || raw._id,
    slug: raw.slug,
    level: raw.level,
    icon: raw.icon || '📘',
    cover: raw.cover || 'blue',
    tag: raw.tag,
    tagClass: raw.tagClass || '',
    title: raw.title,
    desc: raw.desc,
    meta: raw.meta || `${readTime} min`,
    readTime,
    publishedAt: raw.publishedAt || raw.createdAt?.slice?.(0, 10),
    author: {
      name: author.name || 'Anonymous',
      role: author.role || 'Contributor',
    },
    learnings: Array.isArray(raw.learnings) ? raw.learnings : [],
    prerequisites: Array.isArray(raw.prerequisites) ? raw.prerequisites : [],
    steps: Array.isArray(raw.steps) ? raw.steps : [],
    relatedSlugs: Array.isArray(raw.relatedSlugs) ? raw.relatedSlugs : [],
    isUserCreated: Boolean(raw.isUserCreated),
    createdAt: raw.createdAt,
  }
}

export async function createGuide(guide) {
  const res = await fetch(`${API_BASE}/guides`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(guide),
  })
  const payload = await parseResponse(res)
  return normalizeGuide(payload.data)
}

export async function fetchGuides() {
  const res = await fetch(`${API_BASE}/guides`)
  const payload = await parseResponse(res)
  const guides = Array.isArray(payload.data) ? payload.data : []
  return guides.map(normalizeGuide).filter(Boolean)
}

export async function fetchGuideBySlug(slug) {
  const res = await fetch(`${API_BASE}/guides/${encodeURIComponent(slug)}`)
  const payload = await parseResponse(res)
  return normalizeGuide(payload.data)
}
