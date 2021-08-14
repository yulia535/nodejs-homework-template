const { user: service } = require('../../services')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const { SECRET_KEY } = process.env

const login = async (req, res, next) => {
  const { password, email } = req.body
  try {
    const user = await service.getOne({ email })
    if (!user || !user.comparePassword(password)) {
      res.status(401).json({
        status: 'error',
        code: 401,
        message: 'Email or password is wrong'
      })
    }
    const payload = {
      id: user._id,
    }
    const token = jwt.sign(payload, SECRET_KEY)
    await service.updateUser(user._id, { token })
    res.json({
      status: 'success',
      code: 200,
      data: {
        resulte: token
      }
    })
  } catch (error) {
    next(error)
  }
}

module.exports = login
