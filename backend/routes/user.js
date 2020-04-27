const express = require('express')
const controller = require('../controllers/user')
const passport = require('passport')
const router = express.Router()

router.post('/register', controller.register)
router.get('/register/confirm/:id', controller.confirmEmail)
router.get('/register/repeated-confirm/:email', controller.repeatedConfirm)
router.post('/forgot-password', controller.sendResetMail)
router.get('/reset', controller.checkResetToken)
router.post('/reset', controller.resetPasswordViaEmail)
router.post('/login', controller.login)
router.get('/', passport.authenticate('jwt', { session: false }), controller.getAll)
router.get('/:id', passport.authenticate('jwt', { session: false }), controller.getById)
router.patch('/', passport.authenticate('jwt', { session: false }), controller.updateUser)
router.delete('/:id', passport.authenticate('jwt', { session: false }), controller.removeUser)


module.exports = router