const express = require('express')
const controller = require('../controllers/department')
const router = express.Router()

router.get('/', controller.getAll)

module.exports = router