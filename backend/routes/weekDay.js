const express = require('express')
const controller = require('../controllers/weekDay')
const passport = require('passport')
const router = express.Router()

router.get('/', passport.authenticate('jwt', { session: false }), controller.getAll)

module.exports = router