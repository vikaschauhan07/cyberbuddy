const express = require('express')
const blogController = require('../../controllers/blog.controller')
const { createBlogSchema, validateBody } = require('../../validators/blog.validator')

const router = express.Router()

router.get('/', blogController.listBlogs)
router.get('/:slug', blogController.getBlogBySlug)
router.post('/', validateBody(createBlogSchema), blogController.createBlog)

module.exports = router
