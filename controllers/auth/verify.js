const { user: service } = require('../../services')

const verify = async (req, res, next) => {
  const { verifyCode } = req.params
  try {
    const user = await service.getOne({ verifyCode })
    if (!user) {
      res.status(404).json({
        status: 'error',
        code: 404,
        message: 'User not found',
      })
    }
    await service.updateUser(user._id, { verificationToken: null, verify: true })
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
