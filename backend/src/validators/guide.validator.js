const { z } = require('zod')

const authorSchema = z.object({
  name: z.string().trim().min(1).max(120),
  role: z.string().trim().max(120).optional(),
})

const stepBlockSchema = z
  .object({
    type: z.enum(['p', 'h', 'ul', 'ol', 'callout', 'code']),
  })
  .passthrough()

const stepSchema = z.object({
  title: z.string().trim().min(1).max(300),
  time: z.string().trim().max(40).optional(),
  blocks: z.array(stepBlockSchema).min(1),
})

const createGuideSchema = z.object({
  slug: z
    .string()
    .trim()
    .min(1)
    .max(200)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Slug must be lowercase letters, numbers, and hyphens'),
  level: z.enum(['beginner', 'intermediate', 'advanced']),
  icon: z.string().trim().min(1).max(8).optional(),
  cover: z.string().trim().min(1).max(40),
  tag: z.string().trim().min(1).max(80),
  tagClass: z.string().trim().max(40).optional(),
  title: z.string().trim().min(1).max(300),
  desc: z.string().trim().min(1).max(500),
  meta: z.string().trim().max(80).optional(),
  readTime: z.coerce.number().int().positive().max(600).optional(),
  publishedAt: z.string().trim().max(40).optional(),
  author: authorSchema,
  learnings: z.array(z.string().trim().min(1).max(300)).min(1),
  prerequisites: z.array(z.string().trim().min(1).max(300)).min(1),
  steps: z.array(stepSchema).min(1),
  relatedSlugs: z.array(z.string().trim().min(1).max(200)).max(10).optional(),
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
  createGuideSchema,
  validateBody,
}
