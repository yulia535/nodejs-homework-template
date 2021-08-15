const { User } = require('../models')
const joi = require('../utils/validate/users')

const getById = (id) => User.findById(id)
const getOne = (filter) => {
  return User.findOne(filter)
}

const add = ({ password, email }) => {
  const { error } = joi.addUser.validate({ password, email })
  if (error) {
    throw error
  }
  const newUser = new User({ email })
  newUser.setPassword(password)
  return newUser.save()
}

const updateUser = (userId, body) => {
  return User.findByIdAndUpdate(userId, body)
}

module.exports = {
  getOne,
  add,
  getById,
  updateUser
}
