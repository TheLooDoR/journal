const express = require('express')
const controller = require('../controllers/student')
const passport = require('passport')
const router = express.Router()

router.get('/', passport.authenticate('jwt', { session: false }), controller.getAll)
router.get('/by-group', passport.authenticate('jwt', { session: false }), controller.getByGroup)
router.get('/:id', passport.authenticate('jwt', { session: false }), controller.getById)
router.post('/', passport.authenticate('jwt', { session: false }), controller.createStudent)
router.patch('/',passport.authenticate('jwt', { session: false }), controller.updateStudent)
router.delete('/:id', passport.authenticate('jwt', { session: false }), controller.removeStudent)

module.exports = router