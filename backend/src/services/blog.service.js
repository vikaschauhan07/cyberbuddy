const Blog = require('../models/blog.model')

function formatBlogRecord(post) {
  if (!post) return null

  const { _id, __v, ...rest } = post
  const author = rest.author || {}

  return {
    ...rest,
    id: String(_id || rest.id),
    author: {
      name: author.name || 'Anonymous',
      role: author.role || 'Contributor',
      initials: author.initials || 'A',
    },
    cover: rest.cover || { emoji: '📝', class: 'user' },
    tags: rest.tags || [],
    body: rest.body || [],
    createdAt: rest.createdAt?.toISOString?.() || rest.createdAt,
  }
}

function formatBlog(doc) {
  const post = doc.toJSON ? doc.toJSON() : doc
  return formatBlogRecord(post)
}

async function createBlog(data) {
  const existing = await Blog.findOne({ slug: data.slug }).lean()
  if (existing) {
    const err = new Error('A post with this slug already exists')
    err.statusCode = 409
    throw err
  }

  const post = await Blog.create({
    ...data,
    isUserCreated: true,
  })

  return formatBlog(post)
}

async function listBlogs() {
  const posts = await Blog.find().lean()
  const formatted = posts.map(formatBlogRecord).filter(Boolean)

  formatted.sort((a, b) => parseDisplayDate(b.date) - parseDisplayDate(a.date))
  return formatted
}

function parseDisplayDate(value) {
  const time = new Date(value).getTime()
  return Number.isNaN(time) ? 0 : time
}

async function getBlogBySlug(slug) {
  const post = await Blog.findOne({ slug }).lean()
  return formatBlogRecord(post)
}

module.exports = {
  createBlog,
  listBlogs,
  getBlogBySlug,
}
