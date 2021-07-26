const { contacts: service } = require('../../services')

module.exports = async ({ body, params: { contactId } }, res, next) => {
  try {
    const result = await service.updateContact(contactId, body)

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
    if (error.message.includes('is required')) {
      return res.status(400).json({
        status: 'Bad Request',
        code: 400,
        message: 'missing required field: name',
      })
    }
    next(error)
  }
}
