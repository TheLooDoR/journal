const Journal = require('../models/Journal')
const Students = require('../models/Students')
const Subject = require('../models/Subject')
const SubjectType = require('../models/SubjectType')
const Date = require('../models/Date')
const { Op } = require("sequelize");

module.exports.getData = async (req, res) => {
    try {
        const errors = {}

        //Students search by broup
        const studentsGroup = await Students.findAll({
            where: {
                group_id: req.body.group_id
            }
        })
        let students_id = []
        for(let i = 0; i < studentsGroup.length; i++) {
            students_id.push(studentsGroup[i].id)
        }

        //Students seatch by journal
        const studentFromJournal = await Journal.findAll({
            attributes: ['student_id'],
            group: ['student_id'],
            where: {
                user_id: req.body.user_id,
                subject_id: req.body.subject_id,
                type_id: req.body.type_id,
                student_id: {
                    [Op.in]: students_id
                }
            }
        })
        let studentsFromJournal_id = []
        for(let i = 0; i < studentFromJournal.length; i++) {
            studentsFromJournal_id.push(studentFromJournal[i].student_id)
        }

        //Dates search by journal
        const datesFromJournal = await Journal.findAll({
            attributes: ['date_id'],
            group: ['date_id'],
            where: {
                user_id: req.body.user_id,
                subject_id: req.body.subject_id,
                type_id: req.body.type_id,
                student_id: {
                    [Op.in]: students_id
                }
            }
        })
        let datesFromJournal_id = []
        for(let i = 0; i < datesFromJournal.length; i++) {
            datesFromJournal_id.push(datesFromJournal[i].date_id)
        }

        const dates = await Date.findAll({
            where: {
                id: {
                    [Op.in]: datesFromJournal_id
                }
            },
            order: [[ 'date', 'ASC' ]]
        })

        //Students
        const students = await Students.findAll({
            where: {
                id: {
                    [Op.in]: studentsFromJournal_id
                }
            }
        })
        const journal = await Journal.findAll({
            where: {
                user_id: req.body.user_id,
                subject_id: req.body.subject_id,
                type_id: req.body.type_id,
                student_id: {
                    [Op.in]: students_id
                }
            },
            include: {
                model: Date,
                required: true
            },
            order: [
                ['dates', 'date', 'ASC']
            ]
        })
        if (Array.isArray(journal) && journal.length === 0) {
            errors.search = 'Журнал не найден'
            return res.status(404).json(errors)
        } else {
            res.status(200).json({
                journal,
                students,
                dates
            })
        }

    } catch (e) {
        console.log(e.message)
    }
}

module.exports.updateStudentData = async (req, res) => {
    try {
        const studentData = await Journal.update({
                present: req.body.present,
                note: req.body.note,
                score: req.body.score,
                valid_miss: req.body.valid_miss
            },
            {
                where : {
                    user_id: req.body.user_id,
                    date_id: req.body.date_id,
                    subject_id: req.body.subject_id,
                    student_id: req.body.student_id,
                    type_id: req.body.type_id
                }
            }
        )
        res.status(200).json({
            studentData
        })
    } catch (e) {
        console.log(e.message)
    }
}
