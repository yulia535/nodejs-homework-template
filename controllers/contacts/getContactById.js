const { contacts: service } = require('../../services')

module.exports = async ({ params: { contactId } }, res, next) => {
  try {
    const result = await service.getContactById(contactId)

    return result
      ? res.json({
        status: 'Success',
        code: 200,
        data: {
          result,
        },
      })
      : res.status(404).json({
        status: 'Not Found',
        code: 404,
        message: 'contact with such id not found',
      })
  } catch (error) {
    if (error.message.includes('Cast to ObjectId failed')) {
      return res.status(404).json({
        status: 'Not Found',
        code: 404,
        message: 'contact with such id not found',
      })
    }
    next(error)
  }
}
