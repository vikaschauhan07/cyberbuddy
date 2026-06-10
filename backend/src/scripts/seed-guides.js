"use strict"

/**
 * Seed catalog guides from frontend/src/data/guides.js into MongoDB.
 * Safe to re-run: upserts by slug (updates existing, inserts missing).
 *
 * Usage: npm run db:seed-guides
 */

require("dotenv").config()

const path = require("path")
const { pathToFileURL } = require("url")
const mongoose = require("mongoose")
const connectDB = require("../config/database/database")
const Guide = require("../models/guide.model")

const FRONTEND_GUIDES = path.resolve(
  __dirname,
  "../../../frontend/src/data/guides.js",
)

async function loadCatalogGuides() {
  const mod = await import(pathToFileURL(FRONTEND_GUIDES).href)
  if (!Array.isArray(mod.GUIDES) || mod.GUIDES.length === 0) {
    throw new Error("No GUIDES found in frontend guides.js")
  }
  return mod.GUIDES
}

async function seedGuides() {
  console.log("▶ Loading catalog guides from frontend…")
  const guides = await loadCatalogGuides()
  console.log(`  Found ${guides.length} guides`)

  console.log("▶ Connecting to MongoDB…")
  await connectDB()

  let inserted = 0
  let updated = 0

  for (const guide of guides) {
    const existing = await Guide.findOne({ slug: guide.slug }).select("_id").lean()
    await Guide.findOneAndUpdate(
      { slug: guide.slug },
      {
        ...guide,
        isUserCreated: false,
      },
      { upsert: true, returnDocument: "after", setDefaultsOnInsert: true },
    )

    if (existing) updated += 1
    else inserted += 1

    console.log(`  ${existing ? "↻" : "+"} ${guide.slug}`)
  }

  console.log(`✅ Guide seed complete — ${inserted} inserted, ${updated} updated`)
}

seedGuides()
  .then(async () => {
    await mongoose.disconnect()
    process.exit(0)
  })
  .catch(async (err) => {
    console.error("❌ Guide seed failed:", err.message)
    try {
      await mongoose.disconnect()
    } catch {
      /* ignore */
    }
    process.exit(1)
  })
