const express = require('express')
const controller = require('../controllers/statistics')
const passport = require('passport')
const router = express.Router()

router.get('/faculty', passport.authenticate('jwt', { session: false }), controller.facultyStatistic)
router.get('/group/:group_id', passport.authenticate('jwt', { session: false }), controller.groupStatistic)
router.get('/user/:user_id', passport.authenticate('jwt', { session: false }), controller.userStatistics)
router.get('/rating/by-group', passport.authenticate('jwt', { session: false }), controller.ratingByGroup)
router.get('/rating/by-user', passport.authenticate('jwt', { session: false }), controller.ratingByUser)

module.exports = router