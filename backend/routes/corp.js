const express = require('express')
const controller = require('../controllers/corp')
const passport = require('passport')
const router = express.Router()

router.get('/', passport.authenticate('jwt', { session: false }), controller.getAll)
router.get('/:id', passport.authenticate('jwt', { session: false }), controller.getById)
router.post('/', passport.authenticate('jwt', { session: false }), controller.createCorp)
router.patch('/',passport.authenticate('jwt', { session: false }), controller.updateCorp)
router.delete('/:id', passport.authenticate('jwt', { session: false }), controller.removeCorp)

module.exports = router