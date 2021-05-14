  
const express = require('express')
const router = express.Router()
const {
  signupUser,
  loginUser,
  logoutUser,
  getCurrentUser,
  updateSubscriptionUser,
  emailVerify,
  repeatEmailVerify
} = require('../../controllers/users')
const {
  validateSignupUser,
  validateLoginUser,
  validateUpdateSubUser
} = require('./validationUsers')
const guard = require('../../helpers/guard')

router.post('/signup', validateSignupUser, signupUser)
router.post('/login', validateLoginUser, loginUser)
router.post('/logout', guard, logoutUser)
router.get('/current', guard, getCurrentUser)
router.patch('/', guard, validateUpdateSubUser, updateSubscriptionUser)


router.get('/verify/:token', emailVerify)
router.post('/verify', repeatEmailVerify)

module.exports = router