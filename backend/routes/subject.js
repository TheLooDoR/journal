const express = require('express')
const controller = require('../controllers/subject')
const passport = require('passport')
const router = express.Router()

router.get('/', passport.authenticate('jwt', { session: false }), controller.getAll)
router.get('/:id', passport.authenticate('jwt', { session: false }), controller.getById)
router.post('/', passport.authenticate('jwt', { session: false }), controller.createSubject)
router.patch('/',passport.authenticate('jwt', { session: false }), controller.updateSubject)
router.delete('/:id', passport.authenticate('jwt', { session: false }), controller.removeSubject)

module.exports = router