const tokenService = require('../services/token.service')

module.exports = (req, res, next) => {
  if (req.method === 'OPTIONS') {
    return next()
  }

  try {
    const token = req.headers.authorization.split(' ')[1]

    if (!token) {
      return res.status(401).json({massage: 'Unauthorized'})
    }

    req.user = tokenService.validateAccess(token)
    next()

  } catch (error) {
    res.status(401).json({massage: 'Unauthorized'})
  }
}