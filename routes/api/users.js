const express = require('express')
// const passport = require('passport')
const router = express.Router()
const { useAuth, multer } = require('../../middlewares')
const { registration, logIn, logout, verify } = require('../../controllers/auth')

const { getProfile, updateAvatar } = require('../../controllers/users')
router.post('/signup', express.json(), registration)
router.post('/logIn', express.json(), logIn)
router.get('/current', useAuth, getProfile)
router.post('/logout', useAuth, logout)
router.patch('/avatars', useAuth, multer, updateAvatar)
router.get('/users/verify/:verificationToken', verify)
module.exports = router
