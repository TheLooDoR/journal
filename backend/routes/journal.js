const express = require('express')
const controller = require('../controllers/journal')
const passport = require('passport')
const router = express.Router()

router.get('/latest', passport.authenticate('jwt', { session: false }), controller.getLatestJournals)
router.post('/', passport.authenticate('jwt', { session: false }), controller.getData)
router.post('/by-subject-type', passport.authenticate('jwt', { session: false }), controller.getJournalsByType)
router.post('/by-subject', passport.authenticate('jwt', { session: false }), controller.getJournalsBySubject)
router.post('/by-group', passport.authenticate('jwt', { session: false }), controller.getJournalsByGroup)
router.post('/update-student-data', passport.authenticate('jwt', { session: false }), controller.updateStudentData)
router.post('/create-task-by-date', passport.authenticate('jwt', { session: false }), controller.addTaskByDate)
router.delete('/delete-task-by-date', passport.authenticate('jwt', { session: false }), controller.deleteTaskByDate)

module.exports = router