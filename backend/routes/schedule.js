const express = require('express')
const controller = require('../controllers/schedule')
const passport = require('passport')
const router = express.Router()

router.get('/user-schedule/:user_id', passport.authenticate('jwt', { session: false }), controller.getUserSchedule)
router.get('/', passport.authenticate('jwt', { session: false }), controller.getAll)
router.get('/byId', passport.authenticate('jwt', { session: false }), controller.getById)
router.post('/', passport.authenticate('jwt', { session: false }), controller.createSchedule)
router.patch('/',passport.authenticate('jwt', { session: false }), controller.updateSchedule)
router.delete('/', passport.authenticate('jwt', { session: false }), controller.removeSchedule)

module.exports = router