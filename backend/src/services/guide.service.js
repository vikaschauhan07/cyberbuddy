const Guide = require('../models/guide.model')

const LEVEL_LABELS = {
  beginner: 'Beginner',
  intermediate: 'Intermediate',
  advanced: 'Advanced',
}

function formatGuideRecord(guide) {
  if (!guide) return null

  const { _id, __v, ...rest } = guide
  const author = rest.author || {}
  const readTime = Number(rest.readTime) || 10
  const level = rest.level || 'beginner'

  return {
    ...rest,
    id: String(_id || rest.id),
    readTime,
    author: {
      name: author.name || 'Anonymous',
      role: author.role || 'Contributor',
    },
    learnings: rest.learnings || [],
    prerequisites: rest.prerequisites || [],
    steps: rest.steps || [],
    relatedSlugs: rest.relatedSlugs || [],
    meta: rest.meta || `${readTime} min · ${LEVEL_LABELS[level] || 'Beginner'}`,
    publishedAt: rest.publishedAt || rest.createdAt?.toISOString?.()?.slice(0, 10),
    createdAt: rest.createdAt?.toISOString?.() || rest.createdAt,
  }
}

function formatGuide(doc) {
  const guide = doc.toJSON ? doc.toJSON() : doc
  return formatGuideRecord(guide)
}

async function createGuide(data) {
  const existing = await Guide.findOne({ slug: data.slug }).lean()
  if (existing) {
    const err = new Error('A guide with this slug already exists')
    err.statusCode = 409
    throw err
  }

  const readTime = Number(data.readTime) || 10
  const level = data.level || 'beginner'
  const publishedAt = data.publishedAt || new Date().toISOString().slice(0, 10)

  const guide = await Guide.create({
    ...data,
    readTime,
    publishedAt,
    meta: data.meta || `${readTime} min · ${LEVEL_LABELS[level]}`,
    relatedSlugs: data.relatedSlugs || [],
    isUserCreated: true,
  })

  return formatGuide(guide)
}

async function listGuides() {
  const guides = await Guide.find().lean()
  const formatted = guides.map(formatGuideRecord).filter(Boolean)

  formatted.sort((a, b) => parsePublishedDate(b.publishedAt) - parsePublishedDate(a.publishedAt))
  return formatted
}

function parsePublishedDate(value) {
  const time = new Date(value).getTime()
  return Number.isNaN(time) ? 0 : time
}

async function getGuideBySlug(slug) {
  const guide = await Guide.findOne({ slug }).lean()
  return formatGuideRecord(guide)
}

module.exports = {
  createGuide,
  listGuides,
  getGuideBySlug,
}
