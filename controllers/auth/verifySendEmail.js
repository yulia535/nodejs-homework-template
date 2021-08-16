const { user: service } = require('../../services')
const { sendMail } = require('../../utils/sendMail')

module.exports = async ({ body: { email } }, res, next) => {
  if (!email) {
    return res.status(400).json({
      status: 'Bad Request',
      code: 400,
      message: 'email is required',
    })
  }

  try {
    const user = await service.getOne({ email })
    if (!user) {
      return res.status(404).json({
        status: 'Not Found',
        code: 404,
        message: 'no user found with that email',
      })
    }

    if (user.verify) {
      return res.status(400).json({
        status: 'Bad Request',
        code: 400,
        message: 'verification has already been passed',
      })
    }

    // await service.updateUser(user.id, user.verifyToken)

    await sendMail({
      to: email,
      subject: '✔ Verify your email',
      html: `<span>To complete the registration, click on the link:</span> <a href="http://localhost:3000/api/users/verify/${user.verifyToken}"><b>Verify account</b></a>`,
    })

    return res.json({
      status: 'Success',
      code: 200,
      data: {
        result: {
          id: user._id,
          email: user.email,
          avatarURL: user.avatarURL,
          verifyToken: user.verifyToken,
        },
      },
    })
  } catch (error) {
    next(error)
  }
}
