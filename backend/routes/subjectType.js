const express = require('express')
const controller = require('../controllers/subjectType')
const passport = require('passport')
const router = express.Router()

router.get('/', passport.authenticate('jwt', { session: false }), controller.getAll)
router.get('/:id', passport.authenticate('jwt', { session: false }), controller.getById)
router.post('/', passport.authenticate('jwt', { session: false }), controller.createSubjectType)
router.patch('/',passport.authenticate('jwt', { session: false }), controller.updateSubjectType)
router.delete('/:id', passport.authenticate('jwt', { session: false }), controller.removeSubjectType)

module.exports = router