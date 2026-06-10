const express = require('express')
const guideController = require('../../controllers/guide.controller')
const { createGuideSchema, validateBody } = require('../../validators/guide.validator')

const router = express.Router()

router.get('/', guideController.listGuides)
router.get('/:slug', guideController.getGuideBySlug)
router.post('/', validateBody(createGuideSchema), guideController.createGuide)

module.exports = router
