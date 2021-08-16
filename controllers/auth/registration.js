const { user: service } = require('../../services')
const { v4: uuidv4 } = require('uuid')
const { sendMail } = require('../../utils/sendMail')

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
    const verifyToken = uuidv4()
    console.log(verifyToken)
    // eslint-disable-next-line no-unused-vars
    const newUser = await service.add({ email, password, verifyToken })
    console.log(newUser)
    const emailText = {
      to: email,
      subject: '✔ Verify your email',
      html: `<span>To complete the registration, click on the link:</span> <a href="http://localhost:3000/api/users/verify/${verifyToken}"><b>Verify account</b></a>`,
    }
    await sendMail(emailText)
    res.status(201).json({
      status: 'Created',
      code: 201,
      data: {
        user: {
          email,
          subscription: 'starter'
        },
        message: 'Verification email sent',
      }
    })
  } catch (error) {
    next(error)
  }
}
