const { z } = require('zod')

const authorSchema = z.object({
  name: z.string().trim().min(1).max(120),
  role: z.string().trim().max(120).optional(),
  initials: z.string().trim().max(8).optional(),
})

const coverSchema = z.object({
  emoji: z.string().trim().min(1).max(8),
  class: z.string().trim().max(40).optional(),
})

const bodyBlockSchema = z
  .object({
    type: z.enum(['p', 'h2', 'h3', 'ul', 'ol', 'callout', 'code', 'quote']),
  })
  .passthrough()

const createBlogSchema = z.object({
  slug: z
    .string()
    .trim()
    .min(1)
    .max(200)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Slug must be lowercase letters, numbers, and hyphens'),
  title: z.string().trim().min(1).max(300),
  excerpt: z.string().trim().min(1).max(200),
  category: z.enum(['everyone', 'dev', 'biz']),
  cover: coverSchema.optional(),
  date: z.string().trim().max(40).optional(),
  readTime: z.string().trim().max(40).optional(),
  difficulty: z.enum(['beginner', 'intermediate', 'advanced']).optional(),
  author: authorSchema,
  tags: z.array(z.string().trim().min(1).max(40)).max(20).optional(),
  body: z.array(bodyBlockSchema).min(1),
})

function validateBody(schema) {
  return (req, res, next) => {
    const result = schema.safeParse(req.body)
    if (!result.success) {
      return res.status(400).json({
        success: false,
        code: 400,
        message: 'Validation failed',
        errors: result.error.flatten(),
      })
    }
    req.validatedBody = result.data
    next()
  }
}

module.exports = {
  createBlogSchema,
  validateBody,
}
