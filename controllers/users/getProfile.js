// const jwt = require('jsonwebtoken')
require('dotenv').config()

// const { user: service } = require('../../services/user')

const getProfile = async (req, res, nex) => {
  console.log(req.user)
  const { email, subscription } = req.user
  // const userProfile = { email, subscription }
  res.json({
    status: 'success',
    code: 200,
    date: {
      email: email,
      subscription: subscription
    }
  })
}
module.exports = getProfile
