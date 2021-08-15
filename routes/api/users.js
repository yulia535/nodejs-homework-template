const express = require('express')
// const passport = require('passport')
const router = express.Router()
const { useAuth } = require('../../middlewares')
const { registration, logIn, logout } = require('../../controllers/auth')

const getProfile = require('../../controllers/users')
router.post('/signup', express.json(), registration)
router.post('/logIn', express.json(), logIn)
router.get('/current', useAuth, getProfile)
router.post('/logout', useAuth, logout)

module.exports = router