const express = require('express')
const controller = require('../controllers/statistics')
const passport = require('passport')
const router = express.Router()

router.get('/faculty', passport.authenticate('jwt', { session: false }), controller.facultyStatistic)
router.get('/group/:group_id', passport.authenticate('jwt', { session: false }), controller.groupStatistic)
router.get('/user/:user_id', passport.authenticate('jwt', { session: false }), controller.userStatistics)
router.get('/department/:department_id', passport.authenticate('jwt', { session: false }), controller.departmentStatistic)
router.get('/rating/by-group', passport.authenticate('jwt', { session: false }), controller.ratingByGroup)
router.get('/rating/by-user', passport.authenticate('jwt', { session: false }), controller.ratingByUser)
router.get('/rating/by-department', passport.authenticate('jwt', { session: false }), controller.ratingByDepartment)
router.get('/rating', passport.authenticate('jwt', { session: false }), controller.facultyRating)

module.exports = router