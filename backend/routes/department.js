const express = require('express')
const controller = require('../controllers/department')
const passport = require('passport')
const router = express.Router()

router.get('/', controller.getAll)
router.get('/:id', passport.authenticate('jwt', { session: false }), controller.getById)
router.post('/', passport.authenticate('jwt', { session: false }), controller.createDepartment)
router.patch('/',passport.authenticate('jwt', { session: false }), controller.updateDepartment)
router.delete('/:id', passport.authenticate('jwt', { session: false }), controller.removeDepartment)

module.exports = router