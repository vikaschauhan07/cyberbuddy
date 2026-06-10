"use strict"

/**
 * Seed catalog blog posts from frontend/src/data/blogPosts.js into MongoDB.
 * Safe to re-run: upserts by slug (updates existing, inserts missing).
 *
 * Usage: npm run db:seed-blogs
 */

require("dotenv").config()

const path = require("path")
const { pathToFileURL } = require("url")
const mongoose = require("mongoose")
const connectDB = require("../config/database/database")
const Blog = require("../models/blog.model")

const FRONTEND_BLOGS = path.resolve(
  __dirname,
  "../../../frontend/src/data/blogPosts.js",
)

async function loadCatalogPosts() {
  const mod = await import(pathToFileURL(FRONTEND_BLOGS).href)
  if (!Array.isArray(mod.BLOG_POSTS) || mod.BLOG_POSTS.length === 0) {
    throw new Error("No BLOG_POSTS found in frontend blogPosts.js")
  }
  return mod.BLOG_POSTS
}

async function seedBlogs() {
  console.log("▶ Loading catalog posts from frontend…")
  const posts = await loadCatalogPosts()
  console.log(`  Found ${posts.length} posts`)

  console.log("▶ Connecting to MongoDB…")
  await connectDB()

  let inserted = 0
  let updated = 0

  for (const post of posts) {
    const existing = await Blog.findOne({ slug: post.slug }).select("_id").lean()
    await Blog.findOneAndUpdate(
      { slug: post.slug },
      {
        ...post,
        isUserCreated: false,
      },
      { upsert: true, returnDocument: 'after', setDefaultsOnInsert: true },
    )

    if (existing) updated += 1
    else inserted += 1

    console.log(`  ${existing ? "↻" : "+"} ${post.slug}`)
  }

  console.log(`✅ Blog seed complete — ${inserted} inserted, ${updated} updated`)
}

seedBlogs()
  .then(async () => {
    await mongoose.disconnect()
    process.exit(0)
  })
  .catch(async (err) => {
    console.error("❌ Blog seed failed:", err.message)
    try {
      await mongoose.disconnect()
    } catch {
      /* ignore */
    }
    process.exit(1)
  })
