const mongoose = require('mongoose')

const authorSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    role: { type: String, trim: true, default: 'Contributor' },
    initials: { type: String, trim: true },
  },
  { _id: false },
)

const coverSchema = new mongoose.Schema(
  {
    emoji: { type: String, default: '📝' },
    class: { type: String, default: 'user' },
  },
  { _id: false },
)

const blogSchema = new mongoose.Schema(
  {
    slug: { type: String, required: true, unique: true, trim: true, lowercase: true },
    title: { type: String, required: true, trim: true },
    excerpt: { type: String, required: true, trim: true, maxlength: 200 },
    category: { type: String, required: true, enum: ['everyone', 'dev', 'biz'] },
    cover: { type: coverSchema, default: () => ({ emoji: '📝', class: 'user' }) },
    date: { type: String, trim: true },
    readTime: { type: String, trim: true, default: '5 min read' },
    difficulty: { type: String, enum: ['beginner', 'intermediate', 'advanced', null], default: null },
    author: { type: authorSchema, required: true },
    tags: { type: [String], default: [] },
    body: { type: [mongoose.Schema.Types.Mixed], required: true },
    isUserCreated: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  },
)

blogSchema.index({ createdAt: -1 })
blogSchema.index({ category: 1, createdAt: -1 })

blogSchema.set('toJSON', {
  virtuals: true,
  transform(_doc, ret) {
    delete ret.__v
    return ret
  },
})

module.exports = mongoose.model('Blog', blogSchema)
