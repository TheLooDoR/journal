const express = require('express')
const controller = require('../controllers/statistics')
const passport = require('passport')
const router = express.Router()

router.get('/faculty', passport.authenticate('jwt', { session: false }), controller.facultyStatistic)

module.exports = router