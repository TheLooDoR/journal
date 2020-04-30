const express = require('express')
const controller = require('../controllers/group')
const passport = require('passport')
const router = express.Router()

router.get('/', passport.authenticate('jwt', { session: false }), controller.getAll)
router.get('/:id', passport.authenticate('jwt', { session: false }), controller.getById)
router.get('/:department_id', passport.authenticate('jwt', { session: false }), controller.getByDepartment)
router.post('/', passport.authenticate('jwt', { session: false }), controller.create)
router.patch('/',passport.authenticate('jwt', { session: false }), controller.updateGroup)
router.delete('/:id', passport.authenticate('jwt', { session: false }), controller.removeGroup)

module.exports = router