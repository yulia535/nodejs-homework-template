const { user: service } = require('../../services')

module.exports = async (req, res, next) => {
  const { email, password } = req.body
  try {
    const result = await service.getOne({ email })
    if (result) {
      res.status(409).json({
        status: 'Conflict',
        code: 409,
        message: 'Email in use'
      })
      return
    }
    // eslint-disable-next-line no-unused-vars
    const newUser = await service.add({ email, password })
    res.status(201).json({
      status: 'Created',
      code: 201,
      data: {
        user: {
          email,
          subscription: 'starter'
        }
      }
    })
  } catch (error) {
    next(error)
  }
}
