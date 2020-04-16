const express = require('express')
const controller = require('../controllers/schedule')
const passport = require('passport')
const router = express.Router()

router.get('/user-schedule/:user_id', passport.authenticate('jwt', { session: false }), controller.getUserSchedule)

module.exports = router