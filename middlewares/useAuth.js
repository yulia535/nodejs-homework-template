const passport = require('passport')

const useAuth = (req, res, next) => {
  passport.authenticate('jwt', { session: false }, (error, user) => {
    if (error || !user) {
      res.status(401).json({
        status: 'Unauthorized',
        code: 401,
        message: 'Not authorized',
      })
      return
    } req.user = user
    next()
  })(req, res, next)
}

module.exports = useAuth
