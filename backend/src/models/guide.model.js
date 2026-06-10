const mongoose = require('mongoose')

const authorSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    role: { type: String, trim: true, default: 'Contributor' },
  },
  { _id: false },
)

const guideSchema = new mongoose.Schema(
  {
    slug: { type: String, required: true, unique: true, trim: true, lowercase: true },
    level: { type: String, required: true, enum: ['beginner', 'intermediate', 'advanced'] },
    icon: { type: String, default: '📘' },
    cover: { type: String, default: 'blue' },
    tag: { type: String, required: true, trim: true },
    tagClass: { type: String, default: '' },
    title: { type: String, required: true, trim: true },
    desc: { type: String, required: true, trim: true },
    meta: { type: String, trim: true },
    readTime: { type: Number, default: 10 },
    publishedAt: { type: String, trim: true },
    author: { type: authorSchema, required: true },
    learnings: { type: [String], default: [] },
    prerequisites: { type: [String], default: [] },
    steps: { type: [mongoose.Schema.Types.Mixed], required: true },
    relatedSlugs: { type: [String], default: [] },
    isUserCreated: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  },
)

guideSchema.index({ level: 1, publishedAt: -1 })
guideSchema.index({ createdAt: -1 })

module.exports = mongoose.model('Guide', guideSchema)
