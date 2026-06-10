const blogService = require('../services/blog.service')

async function createBlog(req, res) {
  try {
    const post = await blogService.createBlog(req.validatedBody)
    return res.status(201).json({
      success: true,
      code: 201,
      message: 'Blog post created',
      data: post,
    })
  } catch (err) {
    const status = err.statusCode || 500
    return res.status(status).json({
      success: false,
      code: status,
      message: err.message || 'Failed to create blog post',
    })
  }
}

async function listBlogs(_req, res) {
  try {
    const posts = await blogService.listBlogs()
    return res.status(200).json({
      success: true,
      code: 200,
      data: posts,
    })
  } catch (err) {
    return res.status(500).json({
      success: false,
      code: 500,
      message: err.message || 'Failed to fetch blog posts',
    })
  }
}

async function getBlogBySlug(req, res) {
  try {
    const post = await blogService.getBlogBySlug(req.params.slug)
    if (!post) {
      return res.status(404).json({
        success: false,
        code: 404,
        message: 'Blog post not found',
      })
    }
    return res.status(200).json({
      success: true,
      code: 200,
      data: post,
    })
  } catch (err) {
    return res.status(500).json({
      success: false,
      code: 500,
      message: err.message || 'Failed to fetch blog post',
    })
  }
}

module.exports = {
  createBlog,
  listBlogs,
  getBlogBySlug,
}
