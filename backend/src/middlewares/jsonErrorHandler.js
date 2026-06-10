module.exports = (err, req, res, next) => {
    if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
      return res.status(400).json({
        success: false,
        code: 400,
        msg: 'Invalid JSON payload'
      })
    }
    next(err)
}
  