const router = require('express').Router()
const userController = require('../controllers/userController')

router
    .post('/sign-up', userController.signUp)
    .post('/sign-in', userController.signIn)
    .post('/sign-out', userController.signOut)

module.exports = router