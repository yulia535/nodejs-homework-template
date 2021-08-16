const { user: service } = require('../../services')

const verify = async (req, res, next) => {
  const verifyToken = req.params
  console.log(verifyToken)
  try {
    const user = await service.getOne(verifyToken)
    if (!user) {
      res.status(404).json({
        status: 'error',
        code: 404,
        message: 'User not found',
      })
    }
    await service.updateUser(user._id, { verifyToken: null, verify: true })
    console.log(user)
    res.status(200).json({
      status: 'success',
      code: 200,
      message: 'Verification successful',
    })
  } catch (error) {
    next(error)
  }
}

module.exports = verify
