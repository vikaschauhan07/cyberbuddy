const guideService = require('../services/guide.service')

async function createGuide(req, res) {
  try {
    const guide = await guideService.createGuide(req.validatedBody)
    return res.status(201).json({
      success: true,
      code: 201,
      message: 'Guide created',
      data: guide,
    })
  } catch (err) {
    const status = err.statusCode || 500
    return res.status(status).json({
      success: false,
      code: status,
      message: err.message || 'Failed to create guide',
    })
  }
}

async function listGuides(_req, res) {
  try {
    const guides = await guideService.listGuides()
    return res.status(200).json({
      success: true,
      code: 200,
      data: guides,
    })
  } catch (err) {
    return res.status(500).json({
      success: false,
      code: 500,
      message: err.message || 'Failed to fetch guides',
    })
  }
}

async function getGuideBySlug(req, res) {
  try {
    const guide = await guideService.getGuideBySlug(req.params.slug)
    if (!guide) {
      return res.status(404).json({
        success: false,
        code: 404,
        message: 'Guide not found',
      })
    }
    return res.status(200).json({
      success: true,
      code: 200,
      data: guide,
    })
  } catch (err) {
    return res.status(500).json({
      success: false,
      code: 500,
      message: err.message || 'Failed to fetch guide',
    })
  }
}

module.exports = {
  createGuide,
  listGuides,
  getGuideBySlug,
}
