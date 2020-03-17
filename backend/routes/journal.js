const express = require('express')
const controller = require('../controllers/journal')
const passport = require('passport')
const router = express.Router()

router.post('/', passport.authenticate('jwt', { session: false }), controller.getData)
router.post('/update-student-data', passport.authenticate('jwt', { session: false }), controller.updateStudentData)

module.exports = router