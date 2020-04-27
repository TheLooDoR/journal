const express = require('express')
const controller = require('../controllers/position')
const router = express.Router()

router.get('/', controller.getAll)

module.exports = router