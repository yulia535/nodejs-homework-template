const { user: service } = require('../../services')

module.exports = async (req, res, next) => {
  try {
    const id = req.user._id
    await service.updateUser(id, { token: null })
    res.json({
      status: 'saccess',
      code: 200,
      id: id
    })
  } catch (error) {
    next(error)
  }
}
// module.export = logout
