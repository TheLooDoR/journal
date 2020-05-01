const express = require('express')
const controller = require('../controllers/group')
const passport = require('passport')
const router = express.Router()

router.get('/', passport.authenticate('jwt', { session: false }), controller.getAll)
router.get('/by-department', passport.authenticate('jwt', { session: false }), controller.getByDepartment)
router.get('/:id', passport.authenticate('jwt', { session: false }), controller.getById)
router.post('/', passport.authenticate('jwt', { session: false }), controller.createGroup)
router.patch('/',passport.authenticate('jwt', { session: false }), controller.updateGroup)
router.delete('/:id', passport.authenticate('jwt', { session: false }), controller.removeGroup)

module.exports = router